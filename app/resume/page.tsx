"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "react-icons/fa";

/* (DATA and Tag component unchanged — copy from your original file) */
const DATA = {
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
    // timeline: [
    //   { when: "Mar 2023 – Oct 2023", role: "Frontend Developer (Internship)" },
    //   { when: "Nov 2023 – Apr 2024", role: "Frontend Developer" },
    // ],
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
      bullets: [
        "Assisted in building Angular-based web applications using RxJS for routing, state handling, and API connectivity.",
        "Participated actively in daily stand-ups, sprint retrospectives, and cross-functional collaboration.",
        "Authored unit and E2E tests to ensure system reliability and front-end consistency.",
      ],
    },
    uniga_full: {
      title: "Frontend Developer — Uniga Infotech – Health Benefit Systems",
      when: "Nov 2023 – Apr 2024",
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
    timeline: [
      { when: "มี.ค. 2023 – ต.ค. 2023", role: "Frontend Developer (ฝึกงาน)" },
      { when: "พ.ย. 2023 – เม.ย. 2024", role: "Frontend Developer" },
    ],
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
      title: "Frontend Developer (ฝึกงาน) — Uniga Infotech – Health Benefit Systems",
      when: "มี.ค. 2023 – ต.ค. 2023",
      bullets: [
        "ช่วยพัฒนาเว็บแอปด้วย Angular โดยใช้ RxJS สำหรับ routing, การจัดการ state และการเชื่อมต่อ API",
        "เข้าร่วมประชุม daily stand-ups, sprint retrospectives และทำงานข้ามทีมอย่างสม่ำเสมอ",
        "เขียน unit tests และ E2E tests เพื่อรักษาความเสถียรของระบบและความสอดคล้องของ frontend",
      ],
    },
    uniga_full: {
      title: "Frontend Developer — Uniga Infotech – Health Benefit Systems",
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
        desc: "ระบบ OCR ใบเสร็จและแดชบอร์ดวิเคราะห์; เปิดใช้งานบน Vercel/Render",
      },
      {
        title: "Salmon Reservation System",
        when: "ธ.ค. 2024",
        stack: "Next.js · Prisma · Tailwind · Render",
        desc: "ระบบจองพร้อมแผงผู้ดูแล และ availability แบบเรียลไทม์",
      },
      {
        title: "UniRoom",
        when: "ธ.ค. 2023 – ก.พ. 2024",
        stack: "React (TS) · Vite · Tailwind · Docker",
        desc: "ระบบจองห้องเรียนพร้อมการแจ้งเตือนและตรวจจับการจองซ้ำ",
      },
    ],
    education: [
      {
        school: "Rajamangala University of Technology Phra Nakhon",
        when: "Jul 2020 – Feb 2024",
        degree: "ป.ตรี วิทยาการคอมพิวเตอร์ — GPA 3.54",
      },
      {
        school: "Nakhonsawan Vocational College",
        when: "May 2017 – Feb 2020",
        degree: "ประกาศนียบัตรวิชาชีพ — Business Computer — GPA 3.33",
      },
    ],
    footerNote: "พร้อมเข้ารับการสัมภาษณ์และทดสอบทางเทคนิค",
  },
};

/* For brevity in this snippet: reuse your original DATA object */
const DATA_PLACEHOLDER = DATA as any;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-medium px-2 py-1 border rounded-md bg-white text-slate-800">
      {children}
    </span>
  );
}

export default function ResumePage() {
  const [lang, setLang] = useState<"en" | "th">("en");
  const d = DATA_PLACEHOLDER[lang];

  function copyLinkedInSummary() {
    const text = d.linkedinSummary;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert(lang === "en" ? "LinkedIn summary copied" : "คัดลอกสรุป LinkedIn สำเร็จ"))
        .catch(() => alert(lang === "en" ? "Copy failed" : "คัดลอกไม่สำเร็จ"));
    } else {
      alert(lang === "en" ? "Clipboard not available" : "ไม่สามารถเข้าถึงคลิปบอร์ด");
    }
  }

  return (
    <main className="min-h-screen bg-white py-10 px-6 text-slate-900">
      <div className="max-w-6xl mx-auto">
         <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          aria-label={lang === "en" ? "Back to home" : "กลับไปหน้าหลัก"}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 border border-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <FaArrowLeft /> <span className="hidden sm:inline">{lang === "en" ? "Back" : "หน้าหลัก"}</span>
        </Link>
      </div>
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start gap-4 bg-white rounded-lg shadow p-6 border">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border flex items-center justify-center text-2xl font-bold text-slate-900 bg-white">
              WM
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-semibold leading-tight mt-3">{d.fullName}</h1>
              <div className="text-sm text-slate-700 mt-1">
                {d.headline} <span className="text-xs text-slate-500">· {d.sub}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Tag>{lang === "en" ? "Hybrid / Remote" : "Hybrid / Remote"}</Tag>
                <Tag>{d.contact.location || (lang === "en" ? "Bangkok, Thailand" : "กรุงเทพฯ")}</Tag>
              </div>
            </div>
          </div>

          {/* Right-side controls: added Back button here */}
          <div className="ml-auto flex flex-col items-end gap-3">
            <div className="flex gap-2">
              <a className="flex items-center gap-2 text-sm text-slate-700 px-3 py-2 rounded hover:bg-slate-50" href={`mailto:${d.contact.email}`}>
                <FaEnvelope /> {d.contact.email}
              </a>
              <a className="flex items-center gap-2 text-sm text-slate-700 px-3 py-2 rounded hover:bg-slate-50" href={`tel:${d.contact.phone}`}>
                <FaPhone /> {d.contact.phone}
              </a>
            </div>

            <div className="flex gap-3 text-xs text-slate-600">
              <a className="flex items-center gap-2" href={`https://${d.contact.website}`} target="_blank" rel="noreferrer"><FaGlobe /> {d.contact.website}</a>
              <a className="flex items-center gap-2" href={`https://${d.contact.github}`} target="_blank" rel="noreferrer"><FaGithub /> {d.contact.github}</a>
              <a className="flex items-center gap-2" href={`https://${d.contact.linkedin}`} target="_blank" rel="noreferrer"><FaLinkedin /> {d.contact.linkedin}</a>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => setLang(lang === "en" ? "th" : "en")} className="px-3 py-1 text-xs border rounded bg-white hover:bg-slate-50">
                {lang === "en" ? "ไทย" : "EN"}
              </button>

              <button onClick={() => window.print()} className="px-3 py-1 text-xs rounded bg-slate-800 text-white flex items-center gap-2">
                <FaDownload /> {lang === "en" ? "Print / Save PDF" : "พิมพ์ / บันทึก PDF"}
              </button>

              <button onClick={copyLinkedInSummary} className="px-3 py-1 text-xs rounded border bg-white hover:bg-slate-50 flex items-center gap-2">
                <FaCopy /> {lang === "en" ? "Copy LinkedIn summary" : "คัดลอกสรุป LinkedIn"}
              </button>

            </div>
          </div>
        </header>

        {/* Main body (unchanged) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Professional summary, technical, skills, languages */}
            <section className="bg-white p-5 rounded-lg border shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">{lang === "en" ? "Professional summary" : "สรุปประวัติการทำงาน"}</h3>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{d.professionalSummary}</p>

              <h4 className="text-xs font-semibold text-slate-600 mt-4">{lang === "en" ? "Highlights" : "ผลงานเด่น"}</h4>
              <ul className="list-disc list-inside text-sm text-slate-700 mt-2 space-y-1">
                {d.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
              </ul>
            </section>

            <section className="bg-white p-5 rounded-lg border shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">{lang === "en" ? "Technical expertise" : "ความเชี่ยวชาญทางเทคนิค"}</h3>
              <div className="mt-3 text-sm text-slate-700 space-y-2">
                <div><span className="font-medium text-xs text-slate-600">Frontend: </span> {d.technical.frontend}</div>
                <div><span className="font-medium text-xs text-slate-600">Backend: </span> {d.technical.backend}</div>
                <div><span className="font-medium text-xs text-slate-600">Databases: </span> {d.technical.db}</div>
                <div><span className="font-medium text-xs text-slate-600">Cloud & DevOps: </span> {d.technical.cloud}</div>
                <div><span className="font-medium text-xs text-slate-600">Testing / Tools: </span> {d.technical.testing} · {d.technical.tools}</div>
                <div><span className="font-medium text-xs text-slate-600">Languages: </span> {d.technical.langs}</div>
              </div>
            </section>

            <section className="bg-white p-5 rounded-lg border shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">{lang === "en" ? "Skills & Tools" : "ทักษะ / เครื่องมือ"}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Angular",
                  "Node.js",
                  "Prisma",
                  "Drizzle ORM",
                  "AWS S3",
                  "Docker",
                  "Cypress",
                  "Okta",
                  "Figma",
                ].map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
            </section>

            <section className="bg-white p-5 rounded-lg border shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">{lang === "en" ? "Languages" : "ภาษา"}</h3>
              <ul className="mt-3 text-sm text-slate-700 space-y-1">
                <li>Thai — Native</li>
                <li>English — Intermediate</li>
                <li>Japanese — Beginner</li>
              </ul>
            </section>
          </aside>

          {/* Right */}
          <div className="lg:col-span-8 space-y-6">
            {/* Experience cards */}
            <section className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">{lang === "en" ? "Professional Experience" : "ประสบการณ์การทำงาน"}</h3>

              {/* Nilecon */}
              <article className="mt-4 border-l-2 border-slate-100 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-600">{d.nilecon.when}</div>
                    <h4 className="font-semibold text-slate-800 mt-1">{d.nilecon.title}</h4>
                  </div>
                  <div className="text-sm text-slate-500">{lang === "en" ? "Bangkok" : "กรุงเทพฯ"}</div>
                </div>

                <ul className="mt-3 list-disc list-inside text-slate-700 space-y-2">
                  {d.nilecon.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
              </article>

              {/* Uniga Internship */}
              <article className="mt-6 border-l-2 border-slate-100 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-600">{d.uniga_internship.when}</div>
                    <h4 className="font-semibold text-slate-800 mt-1">{d.uniga_internship.title}</h4>
                  </div>
                  <div className="text-sm text-slate-500">{lang === "en" ? "Nonthaburi" : "นนทบุรี"}</div>
                </div>

                <ul className="mt-3 list-disc list-inside text-slate-700 space-y-2">
                  {d.uniga_internship.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
              </article>

              {/* Uniga Full */}
              <article className="mt-6 border-l-2 border-slate-100 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-600">{d.uniga_full.when}</div>
                    <h4 className="font-semibold text-slate-800 mt-1">{d.uniga_full.title}</h4>
                  </div>
                  <div className="text-sm text-slate-500">{lang === "en" ? "Nonthaburi" : "นนทบุรี"}</div>
                </div>

                <ul className="mt-3 list-disc list-inside text-slate-700 space-y-2">
                  {d.uniga_full.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
              </article>
            </section>

            {/* Projects */}
            <section className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">{lang === "en" ? "Projects & Extracurriculars" : "โครงการ / ผลงาน"}</h3>

              <div className="mt-3 grid gap-3">
                {d.projects.map((p: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-50 border rounded-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-xs text-slate-600">{p.when} · <span className="italic">{p.stack}</span></div>
                      </div>
                      <div className="text-xs text-slate-500">Role: Developer</div>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">{lang === "en" ? "Education" : "การศึกษา"}</h3>
              <div className="mt-3 space-y-3">
                {d.education.map((e: any, i: number) => (
                  <div key={i} className="p-3 rounded-md border bg-slate-50">
                    <div className="font-semibold">{e.school}</div>
                    <div className="text-sm text-slate-600">{e.when} · {e.degree}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="text-sm text-slate-700">
              <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                <div>
                  <div className="font-semibold">{lang === "en" ? "Contact" : "ติดต่อ"}</div>
                  <div className="mt-1">{d.contact.email} • {d.contact.phone}</div>
                </div>

                <div className="text-slate-700">
                  <div className="flex items-center gap-3"><FaGithub /> <a className="text-slate-800 hover:underline" href={`https://${d.contact.github}`} target="_blank" rel="noreferrer">{d.contact.github}</a></div>
                  <div className="flex items-center gap-3"><FaGlobe /> <a className="text-slate-800 hover:underline" href={`https://${d.contact.website}`} target="_blank" rel="noreferrer">{d.contact.website}</a></div>
                  <div className="flex items-center gap-3"><FaMapMarkerAlt /> <span>{d.contact.location || (lang === "en" ? "Bangkok, Thailand" : "กรุงเทพฯ")}</span></div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-500">{d.footerNote}</div>
            </footer>
          </div>
        </div>

        <style jsx>{`
          @media print {
            body { -webkit-print-color-adjust: exact; }
            main { background: white !important; padding: 0 !important; }
            .rounded-lg, .shadow, .shadow-sm { box-shadow: none !important; border-radius: 0 !important; border: none !important; }
          }
        `}</style>
      </div>
    </main>
  );
}
