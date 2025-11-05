// ./app/resume/page.tsx
"use client";

import React, { JSX, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaDownload,
  FaCopy,
  FaArrowLeft,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
} from "react-icons/fa";

/* ---- Types ---- */
type LangKey = "en" | "th";

interface Contact {
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  location: string;
}

interface ExperienceBlock {
  title: string;
  company?: string;
  when?: string;
  location?: string;
  bullets: string[];
}

interface Project {
  title: string;
  when: string;
  stack: string;
  desc: string;
  link?: string;
}

interface Education {
  school: string;
  when: string;
  degree: string;
  gpa?: string;
}

interface DataLang {
  fullName: string;
  headline: string;
  sub: string;
  contact: Contact;
  linkedinSummary: string;
  professionalSummary: string;
  highlights: string[];
  technical: {
    frontend: string;
    backend: string;
    db: string;
    cloud: string;
    testing: string;
    tools: string;
    langs: string;
  };
  nilecon: ExperienceBlock;
  uniga_internship: ExperienceBlock;
  uniga_full: ExperienceBlock;
  projects: Project[];
  education: Education[];
  footerNote: string;
}

/* ---- Data ---- */
const DATA: Record<LangKey, DataLang> = {
  en: {
    fullName: "WISIT MOONDET",
    headline: "Full-stack Developer",
    sub: "React · Next.js · Angular · TypeScript",
    contact: {
      email: "wisitmoondet@gmail.com",
      phone: "+66 95 652 9419",
      website: "wisit.is-a.dev",
      github: "github.com/Wisitt",
      linkedin: "linkedin.com/in/wisit-m",
      location: "Bangkok, Thailand",
    },
    linkedinSummary:
      "Full-stack developer with a frontend background, building scalable web platforms using React/Next.js and Node.js. Experienced with secure third-party integrations (PAM, NDID, IFA MF), AWS S3 file workflows, and type-safe validation (Zod). Strong collaborator focused on reliability and clear documentation.",
    professionalSummary:
      "Dedicated and detail-oriented Software Engineer experienced in web application development with modern JavaScript frameworks and cloud platforms. Proven at delivering scalable, maintainable, and high-performance solutions while collaborating effectively within Agile teams.",
    highlights: [
      "Developed a comprehensive web application using Angular with modular routing, dynamic forms, and lazy loading.",
      "Implemented NgRx for state management, integrated RESTful APIs, conducted code reviews, and authored Cypress E2E tests.",
      "Collaborated within Agile/Scrum teams to build reusable UI components and service pipelines to improve maintainability and scalability.",
    ],
    technical: {
      frontend:
        "React, Next.js, Angular, SCSS, Tailwind, Bootstrap, MUI, Framer Motion",
      backend: "Node.js, Express, NestJS, Drizzle ORM, Prisma, RESTful APIs",
      db: "PostgreSQL, MySQL, Supabase, Firebase",
      cloud: "AWS (EC2, RDS, S3), Vercel, Render, Docker, GitHub Actions, GitLab CI/CD",
      testing: "Cypress (E2E), Unit testing",
      tools: "Figma, Git, GitHub, Okta",
      langs: "JavaScript, TypeScript, Python, PHP, C#, HTML/CSS",
    },
    nilecon: {
      title: "Full-stack Developer — Nilecon (Thailand) Co., Ltd.",
      when: "May 2025 — Present · Bangkok (Hybrid)",
      location: "Bangkok (Hybrid)",
      bullets: [
        "Designed and shipped robust backend APIs and services (Node.js, Express, Drizzle ORM) with observability and error-handling best practices.",
        "Integrated secure third-party platforms (PAM, NDID, IFA/MF) and implemented centralized token proxy, automatic refresh and resilient retry logic.",
        "Implemented Okta JWT authentication and role-based access for admin and agent APIs.",
        "Built dashboard/reporting services (commission & tax reports, team summaries) and resolved intermittent 5xx issues by centralizing token handling, validation, and logging.",
        "Created shared file utilities (presigned S3 uploads, normalize/preview helpers) used across multiple modules.",
        "Applied Zod schema validation integrated with DB-safe patterns to prevent invalid writes.",
        "Participated in pentest remediation and authored runbooks for token refresh and environment promotion.",
      ],
    },
    uniga_internship: {
      title: "Frontend Developer (Internship) — Uniga Infotech – Health Benefit Systems",
      when: "Mar 2023 – Oct 2023",
      location: "Nonthaburi",
      bullets: [
        "Assisted in building Angular-based web applications using RxJS for routing, state handling, and API connectivity.",
        "Participated actively in daily stand-ups, sprint retrospectives, and cross-functional collaboration.",
        "Authored unit and E2E tests to ensure system reliability and front-end consistency.",
      ],
    },
    uniga_full: {
      title: "Frontend Developer — Uniga Infotech – Health Benefit Systems",
      when: "Nov 2023 – Apr 2024",
      location: "Nonthaburi",
      bullets: [
        "Developed a comprehensive web application using Angular with modular routing, dynamic forms, and lazy loading.",
        "Implemented NgRx for state management, integrated RESTful APIs, conducted code reviews, and authored Cypress E2E tests.",
        "Collaborated within an Agile/Scrum environment to develop reusable UI components and service pipelines to enhance scalability and maintainability.",
      ],
    },
    projects: [
      {
        title: "FinTrack",
        when: "Mar 2025",
        stack: "Next.js · NestJS · Tailwind · Prisma · Supabase · Google Vision API",
        desc: "Developed a full-stack expense tracking system featuring OCR-based receipt recognition and analytics dashboard; deployed to Vercel/Render.",
      },
      {
        title: "Salmon Reservation System",
        when: "Dec 2024",
        stack: "Next.js · Prisma · Tailwind · Render",
        desc: "Created booking platform with admin panel, dynamic pricing and real-time availability checks.",
      },
      {
        title: "UniRoom",
        when: "Dec 2023 – Feb 2024",
        stack: "React (TS) · Vite · Tailwind · Docker",
        desc: "Designed classroom reservation system with conflict detection and notification workflows.",
      },
      {
        title: "AI Perfume Recommendation Platform",
        when: "",
        stack: "Python · Tkinter",
        desc: "Built ML-based recommendation tool with an interactive desktop UI.",
      },
      {
        title: "Book Rental / Selling Systems",
        when: "",
        stack: "C# / PHP / MySQL",
        desc: "Built digital library management and e-commerce site with admin dashboards and CRUD features.",
      },
      {
        title: "2D Platformer Game",
        when: "",
        stack: "Construct · Firebase",
        desc: "Built a side-scrolling game integrated with Firebase for real-time score tracking.",
      },
    ],
    education: [
      {
        school: "Rajamangala University of Technology Phra Nakhon",
        when: "Jul 2020 – Feb 2024",
        degree: "BSc Computer Science — GPA 3.54",
      },
      {
        school: "Nakhonsawan Vocational College",
        when: "May 2017 – Feb 2020",
        degree: "Vocational Certificate in Business Computer — GPA 3.33",
      },
    ],
    footerNote: "Available for interviews and technical screenings. References upon request.",
  },
  th: {
    fullName: "WISIT MOONDET",
    headline: "นักพัฒนา Frontend → Full-stack",
    sub: "React · Next.js · Angular · TypeScript",
    contact: {
      email: "wisitmoondet@gmail.com",
      phone: "+66 95 652 9419",
      website: "wisit.is-a.dev",
      github: "github.com/Wisitt",
      linkedin: "linkedin.com/in/wisit-m",
      location: "กรุงเทพฯ, ประเทศไทย",
    },
    linkedinSummary:
      "นักพัฒนาระดับ Full-stack ที่มีพื้นฐาน frontend แข็งแรง พัฒนา platform ด้วย React/Next.js และ Node.js เชี่ยวชาญการเชื่อมต่อระบบภายนอกอย่างปลอดภัย (PAM, NDID, IFA MF) และ workflow ไฟล์บน AWS S3 พร้อม Zod validation",
    professionalSummary:
      "นักพัฒนาซอฟต์แวร์ที่ใส่ใจรายละเอียด มีประสบการณ์พัฒนาเว็บแอปด้วย JavaScript frameworks สมัยใหม่และเทคโนโลยีคลาวด์ สามารถส่งมอบระบบที่ขยายได้ ดูแลรักษาได้ และมีประสิทธิภาพ",
    highlights: [
      "พัฒนาเว็บแอปด้วย Angular (modular routing, dynamic forms, lazy loading)",
      "นำ NgRx มาใช้สำหรับจัดการ state, เขียน E2E tests ด้วย Cypress และทำ code review",
      "ออกแบบ presigned S3 upload/download flow และ utilities สำหรับจัดการไฟล์ร่วมกัน",
    ],
    technical: {
      frontend:
        "React, Next.js, Angular, SCSS, Tailwind, Bootstrap, MUI, Framer Motion",
      backend: "Node.js, Express, NestJS, Drizzle ORM, Prisma, RESTful APIs",
      db: "PostgreSQL, MySQL, Supabase, Firebase",
      cloud: "AWS (EC2, RDS, S3), Vercel, Render, Docker, GitHub Actions, GitLab CI/CD",
      testing: "Cypress (E2E), Unit testing",
      tools: "Figma, Git, GitHub, Okta",
      langs: "JavaScript, TypeScript, Python, PHP, C#, HTML/CSS",
    },
    nilecon: {
      title: "Full-stack Developer — Nilecon (Thailand) Co., Ltd.",
      when: "พ.ค. 2025 — ปัจจุบัน · กรุงเทพ (Hybrid)",
      location: "กรุงเทพฯ (Hybrid)",
      bullets: [
        "ออกแบบบริการ backend (Node.js, Express, Drizzle ORM) พร้อม logging และแนวทางการจัดการข้อผิดพลาด",
        "เชื่อมต่อ PAM, NDID, IFA/MF; ใช้ token proxy, refresh อัตโนมัติ และ retry logic เพื่อความเสถียร",
        "นำ Okta JWT มาใช้สำหรับ auth และตรวจสอบสิทธิ์ตาม role สำหรับ API ของ admin/agent",
        "พัฒนาบริการ dashboard/รายงาน (ค่าคอมมิชชั่น, ภาษี, สรุปทีม) และแก้ปัญหา 5xx โดยการรวม token handling และปรับปรุง logging",
        "พัฒนา utilities สำหรับไฟล์ (presigned S3, normalize, preview) ให้ใช้ร่วมกันได้",
        "ใช้ Zod ร่วมกับ pattern ปลอดภัยต่อฐานข้อมูลเพื่อลดการเขียนข้อมูลผิดพลาด",
        "เข้าร่วมแก้ไขผล penetration test และจัดทำ runbook สำหรับ token refresh และ promotion ของ environment",
      ],
    },
    uniga_internship: {
      title: "นักพัฒนา Frontend (ฝึกงาน) — Uniga Infotech – Health Benefit Systems",
      when: "มี.ค. 2023 – ต.ค. 2023",
      location: "นนทบุรี",
      bullets: [
        "ช่วยพัฒนาเว็บแอปด้วย Angular โดยใช้ RxJS สำหรับ routing, การจัดการ state และการเชื่อมต่อ API",
        "เข้าร่วมประชุม daily stand-ups, sprint retrospectives และทำงานข้ามทีมอย่างสม่ำเสมอ",
        "เขียน unit tests และ E2E tests เพื่อรักษาความเสถียรของระบบและความสอดคล้องของ frontend",
      ],
    },
    uniga_full: {
      title: "นักพัฒนา Frontend — Uniga Infotech – Health Benefit Systems",
      when: "พ.ย. 2023 – เม.ย. 2024",
      bullets: [
        "พัฒนาเว็บแอปขนาดใหญ่ด้วย Angular (modular routing, dynamic forms, lazy loading)",
        "ใช้งาน NgRx สำหรับจัดการ state, รวม RESTful APIs, ทำ code review และเขียน Cypress E2E tests",
        "ร่วมงานใน Agile/Scrum เพื่อพัฒนา reusable UI components และ service pipelines",
      ],
    },
    projects: [
      {
        title: "FinTrack",
        when: "มี.ค. 2025",
        stack: "Next.js · NestJS · Tailwind · Prisma · Supabase · Google Vision API",
        desc: "ระบบติดตามค่าใช้จ่ายพร้อม OCR และ dashboard วิเคราะห์",
      },
      {
        title: "Salmon Reservation System",
        when: "ธ.ค. 2024",
        stack: "Next.js · Prisma · Tailwind · Render",
        desc: "ระบบจองพร้อมแผงผู้ดูแลและการตรวจสอบความพร้อมแบบเรียลไทม์",
      },
      {
        title: "UniRoom",
        when: "ธ.ค. 2023 – ก.พ. 2024",
        stack: "React (TypeScript) · Vite · Tailwind · Docker",
        desc: "ระบบจองห้องเรียนพร้อมตรวจจับความขัดแย้งและการแจ้งเตือน",
      },
    ],
    education: [
      {
        school: "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร",
        when: "2020 – 2024",
        degree: "วิทยาศาสตรบัณฑิต วิทยาการคอมพิวเตอร์",
        gpa: "3.54",
      },
      {
        school: "วิทยาลัยอาชีวศึกษานครสวรรค์",
        when: "2017 – 2020",
        degree: "ประกาศนียบัตรวิชาชีพ คอมพิวเตอร์ธุรกิจ",
        gpa: "3.33",
      },
    ],
    footerNote:
      "พร้อมเข้ารับการสัมภาษณ์และทดสอบทางเทคนิค · สามารถขอ reference ได้",
  },
};


/* ---- Resume component ---- */
export default function ResumePage(): JSX.Element {
  const [lang, setLang] = useState<LangKey>("en");
  const d = DATA[lang];

  function copyLinkedInSummary(): void {
    const text = d.linkedinSummary;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert(lang === "en" ? "LinkedIn summary copied!" : "คัดลอกสรุป LinkedIn สำเร็จ"))
        .catch(() => alert(lang === "en" ? "Copy failed" : "คัดลอกไม่สำเร็จ"));
    } else {
      alert(lang === "en" ? "Clipboard not available" : "ไม่สามารถเข้าถึงคลิปบอร์ด");
    }
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; letter-spacing: -0.011em; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          main { background: white !important; padding: 0 !important; margin: 0 !important; }
          .no-print { display: none !important; }
          .print-break-inside-avoid { break-inside: avoid; }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Back Button */}
          <div className="mb-6 no-print">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-neutral-200 text-neutral-700 hover:text-neutral-900 font-medium"
            >
              <FaArrowLeft className="text-sm" />
              <span>{lang === "en" ? "Back" : "กลับ"}</span>
            </button>
          </div>

          {/* Header */}
          <header className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white rounded-2xl shadow-2xl p-8 sm:p-10 mb-8 print-break-inside-avoid">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-neutral-200 flex items-center justify-center text-neutral-900 text-xl font-bold shadow-lg">
                    {d.fullName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium tracking-wide uppercase">Open to work</span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">{d.fullName}</h1>
                <p className="text-xl sm:text-2xl text-neutral-300 font-medium mb-3">{d.headline}</p>
                <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">{d.sub}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium border border-white/10">💼 Hybrid / Remote</span>
                  <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium border border-white/10">📍 {d.contact.location}</span>
                </div>
              </div>

              {/* Contact & Actions */}
              <div className="flex flex-col gap-3 lg:items-end">
                <div className="flex flex-col gap-2">
                  <a href={`mailto:${d.contact.email}`} className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white transition-colors group">
                    <FaEnvelope className="text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="font-medium">{d.contact.email}</span>
                  </a>
                  <a href={`tel:${d.contact.phone}`} className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white transition-colors group">
                    <FaPhone className="text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="font-medium">{d.contact.phone}</span>
                  </a>
                </div>

                <div className="flex gap-2">
                  <a href={`https://${d.contact.website}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10">
                    <FaGlobe className="text-base" />
                  </a>
                  <a href={`https://${d.contact.github}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10">
                    <FaGithub className="text-base" />
                  </a>
                  <a href={`https://${d.contact.linkedin}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10">
                    <FaLinkedin className="text-base" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 no-print mt-2">
                  <button
                    onClick={() => setLang(lang === "en" ? "th" : "en")}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
                  >
                    {lang === "en" ? "🇹🇭 ไทย" : "🇬🇧 EN"}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <FaDownload />
                    {lang === "en" ? "Save PDF" : "บันทึก PDF"}
                  </button>

                  <button
                    onClick={copyLinkedInSummary}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/20"
                  >
                    <FaCopy />
                    <span className="hidden sm:inline">{lang === "en" ? "Copy Summary" : "คัดลอก"}</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* The rest of the layout uses the same structure you provided and will render using typed data (d.*) */}
          {/* Projects, Experience and Education sections map using typed arrays (no any). */}

          {/* Experience / Projects / Education / Footer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left */}
            <aside className="lg:col-span-4 space-y-6">
              <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 print-break-inside-avoid">
                <h2 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b-2 border-neutral-900 uppercase tracking-wide">{lang === "en" ? "About" : "เกี่ยวกับ"}</h2>
                <p className="text-sm text-neutral-700 leading-relaxed mb-4">{d.professionalSummary}</p>

                <h3 className="text-sm font-semibold text-neutral-800 mb-3 mt-5">{lang === "en" ? "Key Highlights" : "ผลงานเด่น"}</h3>
                <ul className="space-y-2.5">
                  {d.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-neutral-700 pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-neutral-900 before:font-bold">
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 print-break-inside-avoid">
                <h2 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b-2 border-neutral-900 uppercase tracking-wide">{lang === "en" ? "Technical Skills" : "ทักษะทางเทคนิค"}</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1.5">Frontend</span>
                    <p className="text-neutral-600 leading-relaxed">{d.technical.frontend}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1.5">Backend</span>
                    <p className="text-neutral-600 leading-relaxed">{d.technical.backend}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1.5">Databases</span>
                    <p className="text-neutral-600 leading-relaxed">{d.technical.db}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1.5">Cloud & DevOps</span>
                    <p className="text-neutral-600 leading-relaxed">{d.technical.cloud}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1.5">Testing & Tools</span>
                    <p className="text-neutral-600 leading-relaxed">{d.technical.testing} · {d.technical.tools}</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 print-break-inside-avoid">
                <h2 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b-2 border-neutral-900 uppercase tracking-wide">{lang === "en" ? "Languages" : "ภาษา"}</h2>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>Thai — Native</li>
                  <li>English — Intermediate</li>
                  <li>Japanese — Beginner</li>
                </ul>
              </section>
            </aside>

            {/* Right content */}
            <div className="lg:col-span-8 space-y-6">
              <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-neutral-900">
                  <FaBriefcase className="text-xl text-neutral-900" />
                  <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">{lang === "en" ? "Experience" : "ประสบการณ์"}</h2>
                </div>

                <article className="mb-8 pb-8 border-b border-neutral-200 last:border-0 print-break-inside-avoid">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-1">{d.nilecon.title}</h3>
                      {d.nilecon.company ? <p className="text-base text-neutral-600 font-medium mb-2">{d.nilecon.company}</p> : null}
                    </div>
                    <div className="text-right text-sm flex-shrink-0">
                      <p className="text-neutral-600 font-medium mb-1">{d.nilecon.when}</p>
                      <p className="text-neutral-500 flex items-center gap-1.5 justify-end"><FaMapMarkerAlt className="text-xs" />{d.nilecon.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {d.nilecon.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-neutral-700 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-900 before:font-bold before:text-lg leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </article>

                <article className="mb-8 pb-8 border-b border-neutral-200 last:border-0 print-break-inside-avoid">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-1">{d.uniga_full.title}</h3>
                      <p className="text-base text-neutral-600 font-medium mb-2">{d.uniga_full.company}</p>
                    </div>
                    <div className="text-right text-sm flex-shrink-0">
                      <p className="text-neutral-600 font-medium mb-1">{d.uniga_full.when}</p>
                      <p className="text-neutral-500 flex items-center gap-1.5 justify-end"><FaMapMarkerAlt className="text-xs" />{d.uniga_full.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {d.uniga_full.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-neutral-700 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-900 before:font-bold before:text-lg leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </article>

                <article className="mb-8 pb-8 border-b border-neutral-200 last:border-0 print-break-inside-avoid">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-1">{d.uniga_internship.title}</h3>
                      <p className="text-base text-neutral-600 font-medium mb-2">{d.uniga_internship.company}</p>
                    </div>
                    <div className="text-right text-sm flex-shrink-0">
                      <p className="text-neutral-600 font-medium mb-1">{d.uniga_internship.when}</p>
                      <p className="text-neutral-500 flex items-center gap-1.5 justify-end"><FaMapMarkerAlt className="text-xs" />{d.uniga_internship.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {d.uniga_internship.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-neutral-700 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-900 before:font-bold before:text-lg leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-neutral-900">
                  <FaCode className="text-xl text-neutral-900" />
                  <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">{lang === "en" ? "Projects" : "โครงการ"}</h2>
                </div>

                <div className="grid gap-4">
                  {d.projects.map((p, i) => (
                    <div key={i} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="font-semibold text-neutral-900">{p.title}</div>
                          <div className="text-xs text-neutral-600">{p.when} · <span className="italic">{p.stack}</span></div>
                        </div>
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-neutral-700 hover:underline">View</a>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-neutral-700">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-neutral-900">
                  <FaGraduationCap className="text-xl text-neutral-900" />
                  <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">{lang === "en" ? "Education" : "การศึกษา"}</h2>
                </div>

                <div className="space-y-4">
                  {d.education.map((e, i) => (
                    <div key={i} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="font-semibold text-neutral-900">{e.school}</div>
                      <div className="text-sm text-neutral-600">{e.when} · {e.degree} {e.gpa ? `· GPA ${e.gpa}` : ""}</div>
                    </div>
                  ))}
                </div>
              </section>

              <footer className="text-sm text-neutral-700">
                <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 mt-6">
                  <div>
                    <div className="font-semibold">{lang === "en" ? "Contact" : "ติดต่อ"}</div>
                    <div className="mt-1">{d.contact.email} • {d.contact.phone}</div>
                  </div>

                  <div className="text-neutral-700">
                    <div className="flex items-center gap-3"><FaGithub /> <a className="text-neutral-800 hover:underline" href={`https://${d.contact.github}`} target="_blank" rel="noreferrer">{d.contact.github}</a></div>
                    <div className="flex items-center gap-3"><FaGlobe /> <a className="text-neutral-800 hover:underline" href={`https://${d.contact.website}`} target="_blank" rel="noreferrer">{d.contact.website}</a></div>
                    <div className="flex items-center gap-3"><FaMapMarkerAlt /> <span>{d.contact.location}</span></div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-neutral-500">{d.footerNote}</div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
