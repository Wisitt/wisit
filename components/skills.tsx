"use client";

import React, { useRef, useState, useEffect } from "react";
import { Code2, Laptop, Cpu, Network, ShieldCheck } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaFigma, FaAws, FaCss3Alt, FaHtml5, FaSass } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiPostgresql,
  SiPrisma,
  SiRedux,
  SiAngular,
  SiExpress,
  SiMysql,
  SiRailway,
  SiRender,
  SiGithubactions,
  SiGitlab,
  SiCypress,
  SiBootstrap,
  SiMui,
  SiAntdesign,
  SiShadcnui,
  SiNestjs,
  SiSupabase,
} from "react-icons/si";

/* ---------- hooks ---------- */
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

function useParallaxContainer() {
  const containerRef = useRef<HTMLElement | null>(null);
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

const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.14, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible] as const;
};

/* ---------- helpers ---------- */
function normalizeHex(hex: string) {
  let h = (hex || "#000000").replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return "000000";
  return h;
}
function hexToRgba(hex: string, alpha = 1) {
  const cleaned = normalizeHex(hex);
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function isDarkHex(hex: string) {
  const cleaned = normalizeHex(hex);
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.45;
}

/* ---------- Skill chip ---------- */
const ExperienceChip: React.FC<{ text: string; color?: string }> = ({ text, color = "#9CA3AF" }) => {
  const dark = isDarkHex(color);
  const chipBg = dark ? "rgba(255,255,255,0.03)" : hexToRgba(color, 0.08);
  const chipBorder = dark ? "rgba(255,255,255,0.06)" : hexToRgba(color, 0.16);
  const chipText = dark ? "rgba(230,238,248,0.9)" : color;

  return (
    <span
      style={{
        background: chipBg,
        border: `1px solid ${chipBorder}`,
        color: chipText,
        letterSpacing: "0.08em",
        transition: "opacity .25s",
        opacity: 0.78,
      }}
      className="inline-block px-3 py-1 text-xs font-mono rounded-full"
    >
      {text}
    </span>
  );
};

/* ---------- SkillCard ---------- */
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const SkillCard: React.FC<{
  name: string;
  icon: IconComponent;
  color?: string;
  experience?: string;
  note?: string;
  proficiency?: number;
  index?: number;
}> = ({ name, icon: Icon, color = "#9CA3AF", experience = "", note = "", proficiency, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isEven = index % 2 === 0;
  const xMul = isEven ? 0.6 : -0.6;
  const yMul = isEven ? 0.8 : -0.8;

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

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iconColor = color;

  return (
    <div
      ref={cardRef}
      className="group relative will-change-transform"
      style={{
        animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.08}s both` : "none",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="relative p-6 sm:p-8 border-2 border-white/20 bg-black/40 backdrop-blur-md skill-card rounded-2xl">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/20 bg-white/5"
              >
                <Icon
                  className="w-6 h-6"
                  aria-hidden
                  style={{ color: iconColor, fill: iconColor, stroke: iconColor }}
                />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold font-mono leading-tight mb-1">
                  {name.toUpperCase()}
                </h3>
                {note && (
                  <p className="text-xs font-mono text-white/60 truncate" style={{ maxWidth: 320 }}>{note}</p>
                )}
              </div>
            </div>

            {experience && (
              <div className="flex-shrink-0 ml-4">
                <ExperienceChip text={experience} color={color} />
              </div>
            )}
          </div>

          {proficiency && (
            <div className="mt-4 pt-4 border-t-2 border-white/20">
              <div className="flex items-center justify-between text-xs font-mono text-white/60">
                <span>PROFICIENCY</span>
                <span>LEVEL {Math.round(proficiency / 10)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Category data ---------- */
interface SkillItem {
  name: string;
  icon: IconComponent;
  color?: string;
  proficiency?: number;
  experience?: string;
  note?: string;
}
interface SkillCategoryData {
  category: string;
  icon: IconComponent;
  description: string;
  items: SkillItem[];
}

const skills: SkillCategoryData[] = [
  {
    category: "Frontend",
    icon: Code2,
    description: "Modern UI frameworks and libraries",
    items: [
      { name: "React", icon: FaReact, color: "#61DAFB", proficiency: 90, experience: "≈1.5 years", note: "SPA, hooks, context, SSR" },
      { name: "Next.js", icon: SiNextdotjs, color: "#111827", proficiency: 90, experience: "≈1.5 years", note: "App Router & Pages" },
      { name: "Angular", icon: SiAngular, color: "#DD0031", proficiency: 100, experience: "2+ years", note: "Enterprise apps & NgRx" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", proficiency: 90, experience: "2+ years", note: "Typed codebases" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 90, experience: "2+ years", note: "ESNext, DOM" },
      { name: "Redux", icon: SiRedux, color: "#764ABC", proficiency: 80, experience: "≈1 year", note: "State management" },
      { name: "HTML5", icon: FaHtml5, color: "#E34F26", proficiency: 95, experience: "3+ years", note: "Semantics & Accessibility" },
      { name: "Framer", icon: SiFramer, color: "#0055FF", proficiency: 80, experience: "≈1 year", note: "Animations & Prototyping" },
    ],
  },
  {
    category: "Styling",
    icon: Laptop,
    description: "Design systems and CSS frameworks",
    items: [
      { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8", proficiency: 100, experience: "2.5+ years", note: "Design tokens & utilities" },
      { name: "CSS3", icon: FaCss3Alt, color: "#264DE4", proficiency: 95, experience: "3+ years", note: "Layout & animations" },
      { name: "SCSS", icon: FaSass, color: "#CC6699", proficiency: 90, experience: "2.5+ years", note: "Organized stylesheets" },
      { name: "MUI", icon: SiMui, color: "#007FFF", proficiency: 85, experience: "≈1.5 years", note: "Component libraries" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", proficiency: 90, experience: "2.5+ years", note: "Rapid prototyping" },
      { name: "Shadcn UI", icon: SiShadcnui, color: "#9CA3AF", proficiency: 85, experience: "≈1.5 year", note: "Design systems" },
      { name: "Ant Design", icon: SiAntdesign, color: "#0170FE", proficiency: 80, experience: "≈1 year", note: "Enterprise components" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E", proficiency: 100, experience: "≈2 years", note: "Design-to-dev handoff" },
    ],
  },
  {
    category: "Backend",
    icon: Cpu,
    description: "Server-side and database technologies",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933", proficiency: 80, experience: "≈1.5 years", note: "API & workers" },
      { name: "Express", icon: SiExpress, color: "#111827", proficiency: 80, experience: "≈1 year", note: "REST services" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", proficiency: 70, experience: "≈1.5 years", note: "Relational data" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", proficiency: 70, experience: "≈2 years", note: "Relational DB" },
      { name: "Prisma", icon: SiPrisma, color: "#5A67D8", proficiency: 90, experience: "≈1 year", note: "Type-safe ORM" },
      { name: "AWS", icon: FaAws, color: "#FF9900", proficiency: 65, experience: "≈1 year", note: "S3, Lambda, IAM" },
      { name: "Railway", icon: SiRailway, color: "#9CA3AF", proficiency: 70, experience: "≈1 year", note: "Deployments" },
      { name: "Render", icon: SiRender, color: "#46E3B7", proficiency: 70, experience: "≈1 year", note: "Hosting" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E", proficiency: 85, experience: "≈0.5 year", note: "Modular servers" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", proficiency: 80, experience: "≈0.5 year", note: "Realtime DB & Auth" },
    ],
  },
  {
    category: "DevOps",
    icon: Network,
    description: "Deployment and version control",
    items: [
      { name: "Git", icon: FaGitAlt, color: "#F05032", proficiency: 100, experience: "2+ years", note: "Branching & CI" },
      { name: "Docker", icon: FaDocker, color: "#2496ED", proficiency: 70, experience: "≈1 year", note: "Containerization" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF", proficiency: 75, experience: "≈1.5 year", note: "CI/CD pipelines" },
      { name: "GitLab CI", icon: SiGitlab, color: "#FC6D26", proficiency: 65, experience: "≈1.5 year", note: "CI/CD" },
    ],
  },
  {
    category: "Testing",
    icon: ShieldCheck,
    description: "Quality assurance tools",
    items: [{ name: "Cypress", icon: SiCypress, color: "#5A7184", proficiency: 80, experience: "≈1.5 years", note: "E2E testing" }],
  },
];

/* ---------- SkillsSection ---------- */
export default function SkillsSection() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver();
  const containerRef = useParallaxContainer();

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-seam relative min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white py-20 overflow-hidden font-mono"
      data-parallax="true"
      aria-label="Skills and technology stack"
    >
      <style>{`
        .section-seam { position: relative; z-index: 0; }
        .section-seam::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -10rem;
          height: 10rem;
          pointer-events: none;
          z-index: 60;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.22) 25%,
            rgba(17,24,39,0.75) 60%,
            rgba(17,24,39,1) 100%
          );
          backdrop-filter: blur(4px);
          transform: translate3d(calc(var(--px) * -0.03px), calc(var(--py) * -0.02px), 0);
        }

        #skills { padding-top: 2rem; margin-top: -3rem; }

        .skill-grid { display: grid; grid-template-columns: repeat(1, minmax(0,1fr)); gap: 1rem; }
        @media (min-width: 768px) { .skill-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (min-width: 1280px) { .skill-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }

        .career-bg-layer { position: absolute; inset: 0; pointer-events: none; will-change: transform, opacity; }

        .skill-card { transition: box-shadow .35s, background-color .35s, border-color .35s; }
        .skill-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 18px 36px rgba(0,0,0,0.6); }

        @keyframes floatSlow { 0% { transform: translateY(0) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0) } }
        @keyframes floatTiny { 0% { transform: translateY(0) } 50% { transform: translateY(-6px) } 100% { transform: translateY(0) } }

        @media (prefers-reduced-motion: reduce) { .skill-grid, .section-seam, .skill-card { transition: none !important; } }
      `}</style>

      <div
        className="career-bg-layer depth-1"
        aria-hidden="true"
        style={{
          transform: "translate3d(calc(var(--px) * -0.12px), calc(var(--py) * -0.12px), 0) scale(1.03)",
          opacity: 0.03,
          backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          animation: "floatTiny 9s ease-in-out infinite",
        }}
      />
      <div
        className="career-bg-layer depth-2"
        aria-hidden="true"
        style={{
          transform: "translate3d(calc(var(--px) * 0.18px), calc(var(--py) * 0.18px), 0)",
          opacity: 0.02,
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "floatSlow 12s ease-in-out infinite",
        }}
      />

      <div className="container mx-auto px-8 sm:px-12 lg:px-16 relative max-w-6xl">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 space-y-4 transition-all duration-1000 ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 opacity-60 mb-4 text-xs tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>TECH STACK</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">SKILLS</h2>

          <p className="text-sm opacity-60 max-w-2xl mx-auto tracking-wide">Technologies, tools and experience — compact & readable with color accents.</p>
        </div>

        <div className="space-y-12">
          {skills.map((category, cIdx) => (
            <section key={category.category} className="space-y-6">
              <div className="flex items-center gap-3 opacity-80 mb-6">
                <category.icon className="w-5 h-5 opacity-60" />
                <h3 className="text-xl sm:text-2xl font-bold font-mono tracking-wider">{category.category.toUpperCase()}</h3>
                <p className="text-xs opacity-60 ml-4 hidden md:inline">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.items.map((skill, idx) => (
                  <article key={`${category.category}-${skill.name}-${idx}`} className="p-1">
                    <SkillCard
                      name={skill.name}
                      icon={skill.icon}
                      color={skill.color}
                      experience={skill.experience}
                      note={skill.note}
                      index={idx + cIdx * 10}
                    />
                  </article>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-20 pt-12 border-t-2 border-white/12 text-center">
            <p className="text-sm opacity-60 tracking-wider">READY FOR YOUR NEXT PROJECT</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-6 px-8 py-4 border-2 border-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-200 shadow-lg backdrop-blur-sm bg-white/5 rounded"
            >
              LET&apos;S WORK TOGETHER
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
