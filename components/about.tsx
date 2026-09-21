"use client";

import React, { useEffect, useRef, memo, useCallback, useState, useMemo } from "react";
import { ChevronRight, Code } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  tech: string[];
  achievement: string;
}

function usePrefersReducedMotion() {
  const ref = useRef<boolean>(false);
  useEffect(() => {
    try {
      ref.current =
        !!window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      ref.current = false;
    }
  }, []);
  return ref;
}

function useParallaxContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced.current) return;
    const el = containerRef.current;
    if (!el) return;
    let ticking = false;

    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 100;
      const ny = (e.clientY / window.innerHeight - 0.5) * 100;
      target.current.x = nx;
      target.current.y = ny;

      if (!ticking) {
        ticking = true;
        rafRef.current = window.requestAnimationFrame(() => {
          last.current.x += (target.current.x - last.current.x) * 0.12;
          last.current.y += (target.current.y - last.current.y) * 0.12;
          el.style.setProperty("--px", String(last.current.x));
          el.style.setProperty("--py", String(last.current.y));
          ticking = false;
        });
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return containerRef;
}

const TechBadge = memo(function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="px-3 py-1 text-xs border border-white/20 bg-white/5 backdrop-blur-sm font-mono hover:bg-white/10 hover:border-white/30 transition-all duration-200">
      {tech}
    </span>
  );
});
TechBadge.displayName = "TechBadge";

const MilestoneCard = memo(function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentInnerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const isEven = index % 2 === 0;
  const xMul = isEven ? 0.5 : -0.5;
  const yMul = isEven ? 0.6 : -0.6;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let lastX = 0;
    let lastY = 0;

    const update = () => {
      const container = el.closest<HTMLElement>("[data-parallax=true]");
      const px = container ? Number(getComputedStyle(container).getPropertyValue("--px") || "0") : 0;
      const py = container ? Number(getComputedStyle(container).getPropertyValue("--py") || "0") : 0;

      const targetX = px * xMul;
      const targetY = py * yMul;

      lastX += (targetX - lastX) * 0.16;
      lastY += (targetY - lastY) * 0.16;

      el.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [xMul, yMul]);

  const toggleExpand = useCallback(() => setIsExpanded((s) => !s), []);
  const onKeyToggle: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleExpand();
    }
  };

  // compute measured height directly (avoids unnecessary hook deps)
  const measuredMaxHeight = contentInnerRef.current ? contentInnerRef.current.scrollHeight : 0;

  return (
    <div
      ref={cardRef}
      className="group relative will-change-transform"
      style={{ animation: `fadeInUp 0.56s ease-out ${index * 0.08}s both` }}
    >
      <div
        className="relative p-6 sm:p-8 border-2 border-white/20 bg-black/40 backdrop-blur-md milestone-card rounded-2xl"
        data-expanded={String(isExpanded)}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="min-w-0">
              <div className="mb-2">
                <span
                  className="inline-block text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(230,238,248,0.9)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {milestone.year}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-md border border-white/20 bg-white/5 inline-flex items-center justify-center text-xs font-bold" aria-hidden="true">{/* Neutral company icon placeholder; replace with an approved official logo later. */}{milestone.title.split("—")[1]?.trim().charAt(0) || "W"}</span>
                <h3 className="text-base sm:text-lg font-bold font-mono leading-tight">{milestone.title}</h3>
              </div>
            </div>

            <button
              onClick={toggleExpand}
              onKeyDown={onKeyToggle}
              aria-expanded={isExpanded}
              aria-controls={`${milestone.id}-details`}
              className="p-2 border-2 border-white hover:bg-white hover:text-black transition-all duration-200 flex-shrink-0 shadow-sm rounded"
              title={isExpanded ? "Collapse details" : "Expand details"}
            >
              <ChevronRight
                className="w-4 h-4 transition-transform duration-300"
                style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>

          <div
            id={`${milestone.id}-details`}
            className="overflow-hidden transition-[max-height,opacity] duration-400 ease-out"
            style={{ maxHeight: isExpanded ? `${measuredMaxHeight + 28}px` : 0, opacity: isExpanded ? 1 : 0 }}
          >
            <div ref={contentInnerRef} className="space-y-4 pt-4 border-t-2 border-white/12">
              <p className="text-sm font-mono text-white/80 leading-relaxed">
                {milestone.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {milestone.tech.map((technology, i) => (
                  <TechBadge key={`${milestone.id}-${i}`} tech={technology} />
                ))}
              </div>

              <div className="p-4 border-2 border-white/12 bg-white/4 rounded">
                <p className="text-xs font-mono text-white/60 tracking-wide">{milestone.achievement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
MilestoneCard.displayName = "MilestoneCard";

export default function CareerSection() {
  const milestones: Milestone[] = useMemo(
    () => [
      {
        id: "aware-fullstack", year: "Jul 2026 - Present", title: "Full-Stack Developer — Aware Technology Solutions",
        description: "Develop and maintain enterprise mobile ownership-transfer workflows for residential and corporate customers. Integrate legacy promotion sources, account-aware catalog loading, dynamic package shelves, eligibility filtering, and qualification and order-request mappings.",
        tech: ["Angular", "TypeScript", "RxJS", "SCSS", "Jest", "Kibana", "SonarQube", "Bruno", "Postman"],
        achievement: "Client: AIS — MyChannel Change Owner Portal · DEV and PVT delivery with QA, backend, product, and downstream teams.",
      },
      {
        id: "nilecon-fullstack", year: "May 2025 - Jul 2026", title: "Full-Stack Developer — Nilecon (Thailand) Co., Ltd.",
        description: "Designed and shipped backend APIs and services with production-grade error handling, secure PAM, NDID, and IFA/MF integrations, Okta JWT authentication, RBAC, reporting services, shared S3 utilities, and Zod validation.",
        tech: ["Node.js", "Express", "NestJS", "TypeScript", "Drizzle ORM", "Okta", "AWS S3", "Zod"],
        achievement: "Delivered financial workflows across SIT, UAT, Staging, and Production and supported client-facing solution consultation.",
      },
      {
        id: "freelance-fullstack", year: "May 2024 - Apr 2025", title: "Full-Stack Developer — Freelance",
        description: "Planned frontend architecture, REST API scope, and relational database design for a digital service management platform. Built responsive interfaces, NestJS services, authentication, real-time features, chat, file uploads, payment, and wallet flows.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "Prisma", "PostgreSQL", "WebSocket", "WebRTC", "Jest"],
        achievement: "Four-person delivery team · Supported integration testing and UAT debugging.",
      },
      {
        id: "uniga-frontend", year: "Mar 2023 - Apr 2024", title: "Frontend Developer — Uniga Infotech",
        description: "Developed production-ready Angular applications for health-benefit consultant systems, reusable UI components, NgRx state management, REST API integrations, optimized client-side data flow, and Cypress end-to-end tests.",
        tech: ["Angular", "TypeScript", "SCSS", "NgRx", "REST API", "Cypress", "Git"],
        achievement: "Promoted from Frontend Developer Intern (Mar–Oct 2023) to full-time Frontend Developer.",
      },
    ],
    []
  );

  const containerRef = useParallaxContainer();

  return (
    <section id="about" className="relative bg-gradient-to-bl from-black via-neutral-900 to-black text-white py-20 overflow-hidden font-mono" aria-label="Experience">
      <style>{`
        .career-parallax { position: relative; overflow: hidden; }
        .career-bg-layer { position: absolute; inset: 0; pointer-events: none; will-change: transform, opacity; }
        .career-bg-layer.depth-1 {
          opacity: 0.03;
          transform: scale(1.02);
          animation: floatTiny 9s ease-in-out infinite;
          background-image:
            radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.04) 0%, transparent 50%);
        }
        .career-bg-layer.depth-2 {
          opacity: 0.02;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: floatSlow 12s ease-in-out infinite;
          transform: translateZ(0);
        }
        @keyframes floatSlow {
          0% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
          100% { transform: translateY(0) }
        }
        @keyframes floatTiny {
          0% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
          100% { transform: translateY(0) }
        }
        [data-parallax="true"] { --px: 0; --py: 0; }
        .milestone-card { transition: box-shadow .35s, background-color .35s, border-color .35s; }
        .milestone-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        @media (max-width: 640px) {
          .milestones-grid { gap: 12px; }
          .career-bg-layer.depth-2 { background-size: 36px 36px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .career-bg-layer, .milestone-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>

      <div className="career-parallax" data-parallax="true" ref={containerRef}>
        <div className="career-bg-layer depth-1" aria-hidden style={{ transform: `translate3d(calc(var(--px) * -0.12px), calc(var(--py) * -0.12px), 0) scale(1.03)` }} />
        <div className="career-bg-layer depth-2" aria-hidden style={{ transform: `translate3d(calc(var(--px) * 0.18px), calc(var(--py) * 0.18px), 0)` }} />

        <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 opacity-60 mb-4 text-xs tracking-wider">
              <Code className="w-4 h-4" />
              <span>CAREER JOURNEY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Experience</h2>
            <p className="text-sm opacity-70 mt-3 max-w-2xl mx-auto">Selected roles and contributions — focused on reliable systems, secure auth, and production delivery.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 milestones-grid">
            {milestones.map((m, idx) => (
              <article key={m.id} className="p-1">
                <MilestoneCard milestone={m} index={idx} />
              </article>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t-2 border-white/12 text-center">
            <p className="text-sm opacity-60 tracking-wider">READY FOR YOUR NEXT PROJECT</p>
            <a href="#contact" className="inline-flex items-center gap-2 mt-6 px-8 py-3 border-2 border-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-200 shadow-lg backdrop-blur-sm bg-white/5 rounded">
              LET&apos;S WORK TOGETHER
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
