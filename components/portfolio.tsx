"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Github, ExternalLink, Code2, ChevronRight, ChevronLeft } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  links: { github?: string; live?: string };
  status: string;
  year: string;
  features: string[];
  impact: string;
}

const projects: Project[] = [
  {
    title: "AIS MyChannel Change Owner Portal",
    description: "Enterprise mobile ownership-transfer workflows supporting residential and corporate customers.",
    technologies: ["Angular", "TypeScript", "RxJS", "SCSS", "Jest", "Kibana", "SonarQube"], links: {}, status: "ENTERPRISE", year: "2026",
    features: ["Account-aware catalog loading and dynamic package shelves", "Package-eligibility filtering", "Qualification and order-request mappings", "DEV and PVT investigation using request IDs and browser DevTools"],
    impact: "Behavior-preserving refactoring, automated tests, and CI/CD verification for enterprise delivery.",
  },
  {
    title: "Financial Services Platform",
    description: "Backend APIs and services with secure third-party integrations, observability, and production-grade error handling.",
    technologies: ["Node.js", "Express", "NestJS", "Drizzle ORM", "Okta", "AWS S3", "Zod"], links: {}, status: "PRODUCTION", year: "2025–2026",
    features: ["PAM, NDID, and IFA/MF integrations", "Centralized token proxy and resilient retry logic", "Okta JWT authentication and RBAC", "Commission, tax, and team reporting services"],
    impact: "Delivered financial workflows across SIT, UAT, Staging, and Production.",
  },
  {
    title: "Digital Service Management Platform",
    description: "Responsive interfaces and backend services for core digital service workflows.",
    technologies: ["Next.js", "React", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "WebSocket", "WebRTC"], links: {}, status: "TEAM DELIVERY", year: "2024–2025",
    features: ["Authentication and user management", "Transactions and real-time features", "Chat and file uploads", "Payment, wallet, integration testing, and UAT debugging"],
    impact: "Delivered by a four-person team from architecture and API scope through integration testing.",
  },
  {
    title: "FinOps Automation Toolkit",
    description: "A 4-week self-directed toolkit for multi-cloud cost-management practice exercises.",
    technologies: ["Terraform", "AWS Lambda", "EventBridge", "Infracost", "GitHub Actions", "pandas", "boto3", "Grafana"], links: {}, status: "R&D", year: "2026",
    features: ["Terraform tag enforcement", "AWS Lambda and EventBridge auto-shutdown", "Infracost CI cost gates", "Chargeback reports and Grafana cost dashboard"],
    impact: "Applied Inform, Optimize, and Operate concepts to a FinOps engagement playbook and checklist.",
  },
];

/* ---------- hooks: reduced motion + parallax ---------- */
function usePrefersReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    try {
      ref.current = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      ref.current = false;
    }
  }, []);
  return ref;
}

/** small parallax for section root (keeps tiny vars --px / --py) */
function useParallax(containerRef: React.RefObject<HTMLElement | null>, strength = 36) {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced.current) return;
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = ((e.clientX / window.innerWidth) - 0.5) * strength;
      ty = ((e.clientY / window.innerHeight) - 0.5) * strength;
    };
    const step = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--px", `${cx}`);
      el.style.setProperty("--py", `${cy}`);
      raf = requestAnimationFrame(step);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [containerRef, reduced, strength]);
}

/* ---------- intersection hook ---------- */
function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setIsVisible(Boolean(entries[0]?.isIntersecting)),
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return [ref, isVisible] as const;
}

/* ---------- ProjectCard (improved) ---------- */
function ProjectCard({ project, isActive }: { project: Project; isActive: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const measured = useRef(0);

  useEffect(() => {
    if (innerRef.current) measured.current = innerRef.current.scrollHeight;
  }, [innerRef, expanded]);

  return (
    <article
      className="w-full flex flex-col gap-4 px-2 snap-center"
      aria-roledescription="slide"
      aria-label={`${project.title} — ${project.year}`}
    >
      <div className={`relative overflow-hidden rounded-2xl border-2 transition-shadow duration-250 ${isActive ? "border-white/30 shadow-2xl" : "border-white/12 bg-black/40"}`}>
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="mb-3">
                <span className="inline-block text-xs font-mono px-3 py-1 rounded-full" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(230,238,248,0.95)" }}>
                  {project.year} · {project.status}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono leading-tight mb-2 truncate">{project.title}</h3>
              <p className="text-sm text-white/80 font-mono mb-3 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded border border-white/10 bg-white/3 text-xs font-mono" title={t}>{t}</span>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap p-4">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded border-2 border-white/10 hover:bg-white hover:text-black transition">
                    <Github className="w-4 h-4" /> <span>Code</span>
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded border-2 border-white/10 hover:bg-white hover:text-black transition">
                    <ExternalLink className="w-4 h-4" /> <span>Demo</span>
                  </a>
                )}
                <button
                  onClick={() => setExpanded((s) => !s)}
                  aria-expanded={expanded}
                  aria-controls={`${project.title.replace(/\s+/g, "-")}-details`}
                  className="ml-auto inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded border-2 border-white/10 hover:bg-white hover:text-black transition"
                >
                  <span>{expanded ? "Hide" : "Details"}</span>
                  <ChevronRight className={`w-4 h-4 transform transition-transform ${expanded ? "rotate-90" : "rotate-0"}`} />
                </button>
              </div>
            </div>
          </div>

          <div
            id={`${project.title.replace(/\s+/g, "-")}-details`}
            ref={innerRef}
            className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
            style={{ maxHeight: expanded ? measured.current || 800 : 0, opacity: expanded ? 1 : 0 }}
            aria-hidden={!expanded}
          >
            <div className="pt-4 border-t border-white/12 space-y-3">
              <div>
                <div className="text-xs font-bold font-mono mb-2 tracking-wider">FEATURES</div>
                <ul className="list-inside space-y-2 text-xs text-white/80">
                  {project.features.map((f, idx) => (
                    <li key={idx} className="pl-4 relative before:absolute before:left-0 before:text-white/60 before:content-['→']">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded border border-white/12 bg-white/4">
                <div className="text-xs font-bold font-mono mb-1 tracking-wider">IMPACT</div>
                <p className="text-xs text-white/70">{project.impact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Portfolio (main) ---------- */
export default function Portfolio() {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const rootRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  useParallax(rootRef, 36);

  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState("");
  const resizeObserver = useRef<ResizeObserver | null>(null);

  /* center active slide */
  const centerActive = useCallback((idx = index) => {
    const el = carouselRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[idx] as HTMLElement | undefined;
    if (!target) return;
    const offset = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
    setAnnounce(`${idx + 1} of ${projects.length}: ${projects[idx].title}`);
  }, [index]);

  useEffect(() => {
    centerActive(index);
  }, [index, centerActive]);

  /* responsive: re-center on resize */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    resizeObserver.current = new ResizeObserver(() => centerActive());
    resizeObserver.current.observe(el);
    return () => resizeObserver.current?.disconnect();
  }, [centerActive]);

  /* pointer drag with snap to closest on end */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let pointerDown = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      pointerDown = true;
      el.classList.add("pointer-grabbed");
      startX = e.pageX;
      startScroll = el.scrollLeft;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      const dx = e.pageX - startX;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      if (!pointerDown) return;
      pointerDown = false;
      el.classList.remove("pointer-grabbed");
      // snap: find nearest child center
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0; let best = Infinity;
      children.forEach((c, i) => {
        const cc = c.offsetLeft + c.clientWidth / 2;
        const diff = Math.abs(cc - center);
        if (diff < best) { best = diff; closest = i; }
      });
      setIndex(closest);
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((s) => Math.max(0, s - 1));
      if (e.key === "ArrowRight") setIndex((s) => Math.min(projects.length - 1, s + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* update announcement for screen readers */
  useEffect(() => {
    if (!announce) return;
    const t = setTimeout(() => setAnnounce(""), 1800);
    return () => clearTimeout(t);
  }, [announce]);

  const next = () => setIndex((s) => (s + 1) % projects.length);
  const prev = () => setIndex((s) => (s - 1 + projects.length) % projects.length);

  return (
        <section id="work" className="section-seam relative min-h-screen bg-gradient-to-tr from-black via-neutral-900 to-black text-white py-20 overflow-hidden font-mono" data-parallax="true">

      <style>{`
        /* decorative subtle background layers (keeps dark tone) */
        .bg-layer { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .bg-grid { background-image: linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px); background-size: 48px 48px; opacity: 0.02; transform: translate3d(calc(var(--px) * 0.18px), calc(var(--py) * 0.18px), 0); }
        .bg-radial { background-image: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 46%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.04) 0%, transparent 48%); opacity: 0.035; transform: translate3d(calc(var(--px) * -0.12px), calc(var(--py) * -0.12px), 0) scale(1.03); }
        @media (max-width: 980px) { .bg-layer { display: none; } }

        /* pointer grab style when dragging */
        .pointer-grabbed { cursor: grabbing !important; user-select: none; }

        /* small visual helpers */
        .carousel { display: flex; gap: 16px; padding: 6px 10px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
        .carousel > * { scroll-snap-align: center; flex: 0 0 auto; width: min(84vw, 720px); } /* responsive card width */
        @media (min-width: 1024px) { .carousel > * { width: min(60vw, 720px); } }
        @media (min-width: 1280px) { .carousel > * { width: min(48vw, 720px); } }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .carousel, .carousel > *, .transition-[max-height,opacity] { scroll-behavior: auto; transition: none !important; }
        }
      `}</style>

      {/* subtle background */}
      <div className="bg-layer bg-radial" aria-hidden />
      <div className="bg-layer bg-grid" aria-hidden />

      <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10 max-w-7xl">
        <div ref={headerRef} className={`text-center mb-8 sm:mb-14 transition-all duration-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 opacity-60 mb-3 text-xs tracking-wider"><Code2 className="w-4 h-4" /><span>SELECTED WORKS</span></div>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">PROJECTS</h2>
        </div>

        {/* carousel + nav */}
        <div className="relative mb-6">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-md bg-black/50 border border-white/10 text-white hidden sm:inline-flex hover:bg-white hover:text-black transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next project"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-md bg-black/50 border border-white/10 text-white hidden sm:inline-flex hover:bg-white hover:text-black transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={carouselRef}
            className="carousel"
            role="region"
            aria-label="Projects carousel"
            tabIndex={0}
          >
            {projects.map((p, i) => (
              <div key={p.title}>
                <ProjectCard project={p} isActive={i === index} />
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "bg-white w-8" : "bg-white/30 w-3 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>

     
      </div>

      {/* polite SR live region for slide announcements */}
      <div aria-live="polite" className="sr-only" role="status">{announce}</div>
    </section>
  );
}
