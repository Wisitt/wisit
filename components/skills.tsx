"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { Braces, Cloud, Code2, Cpu, Database, KeyRound, Network, ShieldCheck, TestTube2, Wrench } from "lucide-react";
import { FaAws, FaDocker, FaFigma, FaGitAlt, FaNodeJs, FaPython, FaReact, FaSass } from "react-icons/fa";
import { SiAngular, SiExpress, SiFramer, SiGithubactions, SiGitlab, SiMongodb, SiMui, SiMysql, SiNestjs, SiNextdotjs, SiPostgresql, SiPrisma, SiSupabase, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Skill = { name: string; icon: Icon; color?: string };
type Group = { title: string; description: string; experience: string; icon: Icon; skills: Skill[] };
const generic = (name: string, icon: Icon = Wrench): Skill => ({ name, icon });

const groups: Group[] = [
  { title: "Frontend", description: "Interfaces, state, styling, and motion", experience: "PRODUCTION", icon: Code2, skills: [
    { name: "React", icon: FaReact, color: "#61dafb" }, { name: "Next.js", icon: SiNextdotjs }, { name: "Angular", icon: SiAngular, color: "#dd0031" },
    { name: "Vite", icon: SiVite, color: "#a78bfa" }, { name: "SCSS", icon: FaSass, color: "#cc6699" }, { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
    { name: "MUI", icon: SiMui, color: "#2196f3" }, { name: "Framer Motion", icon: SiFramer }, generic("RxJS", Braces), generic("NgRx", Braces),
  ]},
  { title: "Backend", description: "Services, APIs, real-time systems, and data access", experience: "PRODUCTION", icon: Cpu, skills: [
    { name: "Node.js", icon: FaNodeJs, color: "#68a063" }, { name: "TypeScript", icon: SiTypescript, color: "#3178c6" }, { name: "Express", icon: SiExpress },
    { name: "NestJS", icon: SiNestjs, color: "#e0234e" }, generic("Drizzle ORM", Database), { name: "Prisma", icon: SiPrisma },
    { name: "Python", icon: FaPython, color: "#f7c447" }, generic("REST APIs", Network), generic("WebSockets", Network), generic("WebRTC", Network),
  ]},
  { title: "Databases & Storage", description: "Relational, document, cloud, and object storage", experience: "DELIVERY", icon: Database, skills: [
    { name: "PostgreSQL", icon: SiPostgresql, color: "#5b9bd5" }, { name: "MySQL", icon: SiMysql, color: "#4f9db8" }, { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
    generic("Firebase", Database), { name: "Amazon S3", icon: FaAws, color: "#ff9900" }, { name: "MongoDB", icon: SiMongodb, color: "#47a248" }, generic("Azure Blob Storage", Cloud),
  ]},
  { title: "Cloud & DevOps", description: "Cloud platforms, containers, and delivery pipelines", experience: "MULTI-ENV", icon: Cloud, skills: [
    { name: "AWS", icon: FaAws, color: "#ff9900" }, generic("Microsoft Azure", Cloud), generic("Microsoft 365", Cloud), { name: "Docker", icon: FaDocker, color: "#2496ed" },
    generic("Vercel", Cloud), { name: "GitHub Actions", icon: SiGithubactions, color: "#58a6ff" }, { name: "GitLab CI/CD", icon: SiGitlab, color: "#fc6d26" },
  ]},
  { title: "FinOps Toolkit (R&D)", description: "Self-directed multi-cloud cost-management practice", experience: "R&D", icon: Cloud, skills: [
    generic("Terraform", Cloud), generic("Infracost", Cloud), { name: "AWS Cost Explorer", icon: FaAws, color: "#ff9900" }, { name: "AWS Compute Optimizer", icon: FaAws, color: "#ff9900" },
    { name: "AWS Budgets", icon: FaAws, color: "#ff9900" }, { name: "AWS Cost Anomaly Detection", icon: FaAws, color: "#ff9900" }, { name: "AWS Trusted Advisor", icon: FaAws, color: "#ff9900" },
    generic("Azure Cost Management", Cloud), { name: "boto3", icon: FaPython, color: "#f7c447" }, { name: "pandas", icon: FaPython, color: "#f7c447" }, generic("Grafana", Cloud), { name: "CloudWatch", icon: FaAws, color: "#ff9900" },
  ]},
  { title: "Security & Auth", description: "Authentication, authorization, and application security", experience: "PRODUCTION", icon: ShieldCheck, skills: [
    generic("Okta", KeyRound), generic("JWT", KeyRound), generic("RBAC", ShieldCheck), generic("Zod schema validation", ShieldCheck), generic("OWASP / pentest remediation", ShieldCheck),
  ]},
  { title: "Testing & Tooling", description: "Quality, diagnostics, and collaboration", experience: "DELIVERY", icon: TestTube2, skills: [
    generic("Cypress (E2E)", TestTube2), generic("Jest", TestTube2), { name: "Figma", icon: FaFigma, color: "#f24e1e" }, { name: "Git", icon: FaGitAlt, color: "#f05032" },
    { name: "GitHub", icon: SiGithubactions }, generic("Kibana", Wrench), generic("SonarQube", ShieldCheck), generic("Bruno", Wrench), generic("Postman", Wrench),
  ]},
  { title: "Methodologies", description: "Delivery practices and environments", experience: "WORKFLOW", icon: Network, skills: [
    generic("Agile", Network), generic("Scrum", Network), generic("Code Review", Code2), generic("SIT / UAT / Staging / Production", Network),
  ]},
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const element = sectionRef.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 }); observer.observe(element); return () => observer.disconnect(); }, []);

  return <section ref={sectionRef} id="skills" className="section-seam relative bg-gradient-to-br from-black via-neutral-900 to-black text-white py-24 overflow-hidden font-mono" aria-labelledby="skills-heading">
    <div className="absolute inset-0 opacity-[0.025]" aria-hidden style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
    <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative max-w-6xl">
      <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <div className="inline-flex items-center gap-2 opacity-60 mb-4 text-xs tracking-wider"><Code2 className="w-4 h-4" /><span>TECH STACK</span></div>
        <h2 id="skills-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">SKILLS</h2>
        <p className="text-sm text-white/60 max-w-2xl mx-auto mt-5 leading-relaxed">Technologies and tools used across frontend, backend, cloud, security, testing, and FinOps R&amp;D.</p>
      </div>
      <div className="space-y-10">{groups.map((group) => <section key={group.title} aria-label={group.title}>
        <div className="flex items-center gap-3 mb-5"><group.icon className="w-5 h-5 text-white/55" /><h3 className="text-lg sm:text-xl font-bold tracking-wider">{group.title.toUpperCase()}</h3><span className="hidden md:block text-xs text-white/40">{group.description}</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{group.skills.map((skill) => <article key={skill.name} className="group flex items-center gap-4 p-5 border-2 border-white/15 bg-black/40 backdrop-blur-md rounded-xl hover:border-white/35 hover:-translate-y-1 transition-all duration-300">
          <span className="w-11 h-11 rounded-full border border-white/15 bg-white/5 inline-flex items-center justify-center shrink-0"><skill.icon className="w-5 h-5" style={{ color: skill.color }} aria-hidden="true" /></span>
          <span className="min-w-0 flex-1"><span className="block text-sm font-bold tracking-wide break-words">{skill.name}</span><span className="inline-flex mt-2 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-[10px] text-white/55 tracking-[0.12em]">{group.experience}</span></span>
        </article>)}</div>
      </section>)}</div>
    </div>
  </section>;
}
