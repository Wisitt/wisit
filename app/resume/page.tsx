"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCopy,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLanguage,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

type LangKey = "en" | "th" | "zh";

interface Contact {
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  location: string;
}

interface SkillGroup {
  title: string;
  items: string;
}

interface ExperienceBlock {
  role: string;
  company: string;
  when: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM, omit for current role
  location: string;
  bullets: string[];
  tech: string;
}

interface Project {
  title: string;
  when: string;
  stack: string;
  desc: string;
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
  profilePills: string[];
  coreCapabilities: string[];
  skills: SkillGroup[];
  highlights: string[];
  experiences: ExperienceBlock[];
  projects: Project[];
  education: Education[];
  footerNote: string;
  labels: {
    back: string;
    savePdf: string;
    copySummary: string;
    copied: string;
    copyFailed: string;
    clipboardUnavailable: string;
    linkedinSummary: string;
    professionalSummary: string;
    profileSnapshot: string;
    coreCapabilities: string;
    technicalStack: string;
    selectedHighlights: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
    openToWork: string;
    printTip: string;
  };
}

const DATA: Record<LangKey, DataLang> = {
  en: {
    fullName: "WISIT MOONDET",
    headline: "Full-stack Engineer (Backend-Focused)",
    sub: "Financial Services Platforms · Secure APIs · Third-party & Payment Integrations",
    contact: {
      email: "wisitmoondet@gmail.com",
      phone: "+66 95 652 9419",
      website: "wisit.is-a.dev",
      github: "github.com/Wisitt",
      linkedin: "linkedin.com/in/wisit-m",
      location: "Bangkok, Thailand",
    },
    linkedinSummary:
      "Backend-focused Full-stack Engineer with production experience in financial services. I build secure, maintainable APIs and integrate third-party platforms (including ATS QR payments), delivering reliably across SIT/UAT/Staging/Production.",
    professionalSummary:
      "I deliver end-to-end, from architecture and implementation to release and production support. I work closely with product teams and clients, translating business requirements into practical technical scope and stable releases.",
    profilePills: [
      "End-to-End Delivery",
      "Financial Platforms",
      "Secure API Design",
      "Third-party Integrations",
      "Production Operations",
    ],
    coreCapabilities: [
      "Design and deliver maintainable REST APIs with Node.js, TypeScript, and Express using clear controller/service boundaries.",
      "Implement secure authentication and e-KYC flows with Okta, Azure AD (OAuth2 + PKCE), JWT (RS256), OTP/PIN, and one-time tokens.",
      "Integrate third-party financial APIs (Banking, PAM, IFA MF) and ATS QR payment flows to support subscription, redemption, switching, payment handling, and portfolio synchronization.",
      "Implement API security controls with CSRF protection, rate limiting (memory/Redis), request validation, digital signatures, and secrets management.",
      "Lead client-facing technical discussions and translate business requirements into implementation scope, priorities, and release plans.",
      "Design PostgreSQL schemas and transaction logic using Drizzle ORM and Prisma, including reporting and audit logging.",
      "Build document workflows with AWS S3 presigned upload/download, file validation, and Excel import pipelines.",
      "Apply modern engineering standards: API versioning, CI/CD, observability, structured logging, and test automation.",
      "Adapt quickly to new role scope and domain context while maintaining delivery quality within sprint timelines.",
    ],
    skills: [
      {
        title: "Backend",
        items:
          "Node.js, TypeScript, Express, REST API Design, Drizzle ORM, Prisma, PostgreSQL, Redis, Payment Integration (ATS QR), API Versioning, Caching",
      },
      {
        title: "Frontend",
        items:
          "React, Next.js, Angular, Tailwind CSS, SCSS, Ant Design, State Management, Accessibility",
      },
      {
        title: "Security & Auth",
        items:
          "Okta, Azure AD, OAuth2 + PKCE, JWT (RS256), OTP/PIN, CSRF, Rate Limiting, RBAC, OWASP-aware Practices",
      },
      {
        title: "Cloud & Operations",
        items:
          "AWS EC2, Lambda, S3, Secrets Manager, Docker, PM2, IIS Reverse Proxy, CI/CD, Monitoring",
      },
      {
        title: "AI & Data",
        items:
          "OpenAI, Anthropic, Google, Groq, Hugging Face, RAG Workflow, pgvector, Data Ingestion",
      },
      {
        title: "Engineering Practices",
        items:
          "System Design, Agile/Scrum, Technical Documentation, Root Cause Analysis, Incident Support, Rapid Upskilling",
      },
    ],
    highlights: [
      "Delivered production APIs and third-party integrations for Principal Thailand's TH-IFA customer and advisor financial workflows, including ATS QR payment flows.",
      "Led client-facing technical consultations, translating business needs into implementation scope and release priorities.",
      "Built TenantBot, a multi-tenant AI support platform with Playbook management, embeddable widget integration, and admin human-takeover workflows.",
      "Improved operational reliability and reduced intermittent 5xx issues by centralizing token handling, validation, and structured logging.",
      "Developed admin web modules for users, documents, workflows, campaigns, and platform configuration.",
      "Proven ability to upskill quickly and deliver in unfamiliar domains.",
    ],
    experiences: [
      {
        role: "Full-stack Developer",
        company: "Nilecon",
        when: "May 2025 - Present",
        startDate: "2025-05",
        location: "Bangkok, Thailand (Hybrid)",
        bullets: [
          "Designed and developed secure REST APIs using Node.js, TypeScript, and Express for onboarding and financial operations.",
          "Integrated third-party financial APIs (Banking, PAM, IFA MF) and ATS QR payment flows for subscription, redemption, switching, payment handling, and portfolio synchronization.",
          "Implemented authentication and e-KYC workflows with Okta, Azure AD (OAuth2 + PKCE), JWT (RS256), and NDID.",
          "Acted as a client-facing solution consultant, translating business requirements into technical scope, priorities, and release plans.",
          "Improved production reliability and reduced intermittent 5xx issues by centralizing token handling, validation, and structured logging.",
          "Developed admin modules with Next.js, React, and Tailwind CSS for user, document, workflow, and campaign management.",
          "Implemented document pipelines with AWS S3 (presigned upload/download), file validation, and Excel import workflows.",
          "Built logging, audit trails, and notification pipelines (Firebase FCM, email) for production support.",
          "Deployed and operated services with Docker, PM2, AWS EC2, AWS Lambda, and IIS reverse proxy.",
          "Worked in Agile/Scrum and managed delivery across SIT, UAT, Staging, and Production.",
        ],
        tech: "Node.js · TypeScript · Express · Next.js · PostgreSQL · Drizzle ORM · AWS · Redis · Docker",
      },
      {
        role: "Front-end Developer (Contract)",
        company: "Uniga Infotech",
        when: "Nov 2023 - Apr 2024",
        startDate: "2023-11",
        endDate: "2024-04",
        location: "Nonthaburi, Thailand (Hybrid)",
        bullets: [
          "Developed and maintained production-ready Angular applications for health-benefit consultant systems.",
          "Built reusable UI components and feature modules using Angular, TypeScript, and SCSS.",
          "Integrated REST APIs and optimized client-side data flow and synchronization.",
          "Managed global application state with NgRx to improve data consistency and maintainability.",
          "Implemented end-to-end testing with Cypress to improve release confidence.",
          "Collaborated with backend and QA teams to resolve issues across SIT and UAT.",
        ],
        tech: "Angular · TypeScript · SCSS · NgRx · REST API · Cypress",
      },
      {
        role: "Front-end Developer (Internship)",
        company: "Uniga Infotech",
        when: "Mar 2023 - Oct 2023",
        startDate: "2023-03",
        endDate: "2023-10",
        location: "Nonthaburi, Thailand",
        bullets: [
          "Assisted in developing enterprise frontend features using Angular and TypeScript.",
          "Implemented UI components from design specifications and improved usability.",
          "Integrated REST APIs and handled basic frontend data transformation.",
          "Applied foundational state management concepts with NgRx.",
          "Supported testing and bug fixing under senior developer guidance.",
        ],
        tech: "Angular · TypeScript · SCSS · REST API",
      },
    ],
    projects: [
      {
        title: "Principal TH-IFA Platform",
        when: "May 2025 - Present",
        stack:
          "Node.js · TypeScript · Express · AWS Lambda · React · Vite · PostgreSQL · Okta · NDID · PAM",
        desc: "Contributed to production delivery of Principal's TH-IFA platform across admin portal and customer web sources, including third-party integrations for onboarding/e-KYC, fund transaction workflows (subscription/redemption/switching), ATS QR payment handling, and operations modules for campaigns, news, notifications, and document management.",
      },
      {
        title: "TenantBot",
        when: "Jan 2026 - Feb 2026",
        stack:
          "Node.js · Express · Next.js · Vite Widget · Prisma · PostgreSQL/pgvector · JWT · PM2 · Docker · AWS",
        desc: "Built a multi-tenant AI customer support platform with Playbook Studio (forms/intents/persona/knowledge), external embeddable widget, RAG ingestion pipelines, and admin takeover workflows.",
      },
      {
        title: "FinTrack",
        when: "Mar 2025",
        stack: "Next.js · NestJS · Prisma · Supabase · Google Vision API",
        desc: "Built an expense management platform with OCR receipt processing and analytics dashboard.",
      },
      {
        title: "Classroom Booking System",
        when: "Dec 2023 - Feb 2024",
        stack: "React (TypeScript) · Vite · Tailwind · Docker",
        desc: "Developed a classroom reservation system with conflict detection and notifications.",
      },
    ],
    education: [
      {
        school: "Rajamangala University of Technology Phra Nakhon",
        when: "Jul 2020 - Feb 2024",
        degree: "BSc, Computer Science",
        gpa: "3.54",
      },
      {
        school: "Nakhonsawan Vocational College",
        when: "May 2017 - Feb 2020",
        degree: "Vocational Certificate, Business Computer",
        gpa: "3.33",
      },
    ],
    footerNote:
      "Available for interviews and technical assessments. Open to role-specific upskilling, with references available upon request.",
    labels: {
      back: "Back",
      savePdf: "Save PDF",
      copySummary: "Copy Summary",
      copied: "LinkedIn summary copied.",
      copyFailed: "Copy failed.",
      clipboardUnavailable: "Clipboard is unavailable in this browser.",
      linkedinSummary: "LinkedIn Summary",
      professionalSummary: "Professional Summary",
      profileSnapshot: "Profile Snapshot",
      coreCapabilities: "Core Capabilities",
      technicalStack: "Technical Stack",
      selectedHighlights: "Selected Highlights",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
      openToWork: "Open to Work",
      printTip: "Optimized for PDF export and ATS parsing.",
    },
  },
  th: {
    fullName: "WISIT MOONDET",
    headline: "วิศวกร Full-stack / Backend",
    sub: "ระบบการเงินระดับโปรดักชัน · ความปลอดภัยของ API · แพลตฟอร์มแบบหลายผู้เช่า",
    contact: {
      email: "wisitmoondet@gmail.com",
      phone: "+66 95 652 9419",
      website: "wisit.is-a.dev",
      github: "github.com/Wisitt",
      linkedin: "linkedin.com/in/wisit-m",
      location: "กรุงเทพฯ, ประเทศไทย",
    },
    linkedinSummary:
      "ผมเป็นวิศวกร Full-stack ที่ถนัดงาน Backend และชอบแปลงความต้องการทางธุรกิจที่ซับซ้อนให้เป็นระบบที่เสถียรและใช้งานได้จริงในโปรดักชัน มีประสบการณ์ด้านระบบการเงิน การออกแบบ API ที่ปลอดภัย การเชื่อมต่อ third-party และระบบชำระเงิน ATS QR ครอบคลุมตั้งแต่พัฒนา ทดสอบ ไปจนถึงดูแลระบบใน SIT/UAT/Staging/Production.",
    professionalSummary:
      "สไตล์การทำงานของผมคือรับผิดชอบงานแบบ end-to-end ใส่ใจรายละเอียด และสื่อสารกับทีมอย่างชัดเจน สามารถส่งมอบได้ตั้งแต่วางสถาปัตยกรรมจนถึง production support และพร้อมเรียนรู้เทคโนโลยีหรือโดเมนใหม่ให้สอดคล้องกับขอบเขตงาน.",
    profilePills: [
      "API ระดับโปรดักชัน",
      "ระบบงานการเงิน",
      "ออกแบบความปลอดภัยตั้งแต่ต้น",
      "การปฏิบัติการบนคลาวด์",
      "เรียนรู้เร็ว",
    ],
    coreCapabilities: [
      "ออกแบบและพัฒนา REST API ด้วย Node.js, TypeScript และ Express โดยใช้สถาปัตยกรรม controller/service ที่ดูแลง่ายในระยะยาว.",
      "ออกแบบระบบยืนยันตัวตนและ e-KYC ด้วย Okta, Azure AD (OAuth2 + PKCE), JWT (RS256), OTP/PIN และ one-time token.",
      "เชื่อมต่อ third-party financial API (Banking, PAM, IFA MF) และระบบชำระเงิน ATS QR เพื่อรองรับธุรกรรม subscription, redemption, switching และการซิงก์พอร์ตลงทุน.",
      "เสริมความปลอดภัย API ด้วย CSRF, rate limiting (memory/Redis), request validation, digital signature และ secrets management.",
      "ออกแบบ schema และ transaction บน PostgreSQL ด้วย Drizzle ORM และ Prisma รวมถึงงานรายงานและ audit logging.",
      "พัฒนา workflow เอกสารด้วย AWS S3 (presigned upload/download), การตรวจสอบไฟล์ และการนำเข้าข้อมูล Excel.",
      "ยึดมาตรฐานวิศวกรรมสมัยใหม่ เช่น API versioning, CI/CD, observability, structured logging และ test automation.",
      "เรียนรู้และปรับตัวตามขอบเขตงานได้รวดเร็ว พร้อมส่งมอบงานที่ใช้งานจริงได้ในแต่ละ sprint.",
    ],
    skills: [
      {
        title: "แบ็กเอนด์",
        items:
          "Node.js, TypeScript, Express, REST API Design, Drizzle ORM, Prisma, PostgreSQL, Redis, API Versioning, Caching",
      },
      {
        title: "ฟรอนต์เอนด์",
        items:
          "React, Next.js, Angular, Tailwind CSS, SCSS, Ant Design, State Management, Accessibility",
      },
      {
        title: "ความปลอดภัยและการยืนยันตัวตน",
        items:
          "Okta, Azure AD, OAuth2 + PKCE, JWT (RS256), OTP/PIN, CSRF, Rate Limiting, RBAC, OWASP Best Practices",
      },
      {
        title: "คลาวด์และปฏิบัติการ",
        items:
          "AWS EC2, Lambda, S3, Secrets Manager, Docker, PM2, IIS Reverse Proxy, CI/CD, Monitoring",
      },
      {
        title: "AI และข้อมูล",
        items:
          "OpenAI, Anthropic, Google, Groq, Hugging Face, RAG Workflow, pgvector, Data Ingestion",
      },
      {
        title: "แนวปฏิบัติวิศวกรรม",
        items:
          "System Design, Agile/Scrum, Technical Documentation, Root Cause Analysis, Incident Support, Rapid Upskilling",
      },
    ],
    highlights: [
      "ส่งมอบ API และ third-party integration ระดับโปรดักชันสำหรับแพลตฟอร์ม TH-IFA ของ Principal ทั้งฝั่งลูกค้าและที่ปรึกษา รวมถึง ATS QR Payment.",
      "พัฒนา TenantBot แพลตฟอร์ม AI Support แบบหลายผู้เช่า พร้อมระบบ Playbook, widget ฝังเว็บภายนอก และ workflow ให้แอดมิน takeover บทสนทนา.",
      "ออกแบบและดูแลระบบยืนยันตัวตนและสิทธิ์การใช้งานที่ปลอดภัย รองรับหลาย identity provider.",
      "ยกระดับเสถียรภาพระบบด้วย structured logging, audit trail และ monitoring ที่ใช้งานจริง.",
      "พัฒนาโมดูลแอดมินสำหรับผู้ใช้ เอกสาร เวิร์กโฟลว์ แคมเปญ และการตั้งค่าระบบ.",
      "ปรับตัวกับโดเมนใหม่ได้เร็ว และยังคงคุณภาพการส่งมอบในระดับโปรดักชัน.",
    ],
    experiences: [
      {
        role: "วิศวกร Full-stack",
        company: "Nilecon",
        when: "พ.ค. 2025 - ปัจจุบัน",
        startDate: "2025-05",
        location: "กรุงเทพฯ, ประเทศไทย (ไฮบริด)",
        bullets: [
          "ออกแบบและพัฒนา REST API ที่ปลอดภัยด้วย Node.js, TypeScript และ Express สำหรับ onboarding และกระบวนการทางการเงิน.",
          "พัฒนา authentication และ e-KYC ด้วย Okta, Azure AD (OAuth2 + PKCE), JWT (RS256) และ NDID.",
          "เชื่อมต่อ third-party API ด้านการเงิน (Banking, PAM, IFA MF) และ ATS QR Payment เพื่อรองรับ subscription, redemption, switching และการซิงก์พอร์ตลงทุน.",
          "พัฒนาโมดูลแอดมินด้วย Next.js, React และ Tailwind CSS สำหรับจัดการผู้ใช้ เอกสาร workflow และแคมเปญ.",
          "พัฒนา document pipeline ด้วย AWS S3 (presigned upload/download), ตรวจสอบไฟล์ และนำเข้าข้อมูลจาก Excel.",
          "สร้างระบบ logging, audit trail และ notification pipeline (Firebase FCM, email) เพื่อรองรับ production support.",
          "ทำหน้าที่เป็นที่ปรึกษาเชิงเทคนิคในการคุยกับลูกค้าโดยตรง แปลง requirement ธุรกิจเป็นขอบเขตงาน ลำดับความสำคัญ และแผน release ให้ทีมพัฒนา.",
          "ดูแลการ deploy และ operation ด้วย Docker, PM2, AWS EC2, AWS Lambda และ IIS reverse proxy.",
          "ทำงานแบบ Agile/Scrum และดูแลการส่งมอบงานใน SIT, UAT, Staging และ Production.",
        ],
        tech: "Node.js · TypeScript · Express · Next.js · PostgreSQL · Drizzle ORM · AWS · Redis · Docker",
      },
      {
        role: "วิศวกร Front-end (สัญญาจ้าง)",
        company: "Uniga Infotech",
        when: "พ.ย. 2023 - เม.ย. 2024",
        startDate: "2023-11",
        endDate: "2024-04",
        location: "นนทบุรี, ประเทศไทย (ไฮบริด)",
        bullets: [
          "พัฒนาและดูแล Angular application ระดับโปรดักชันสำหรับระบบที่ปรึกษาสวัสดิการสุขภาพ.",
          "สร้าง UI component และ feature module ที่นำกลับมาใช้ซ้ำได้ด้วย Angular, TypeScript และ SCSS.",
          "เชื่อมต่อ REST API และปรับปรุงการไหลของข้อมูลฝั่ง client.",
          "จัดการ global state ด้วย NgRx เพื่อเพิ่มความถูกต้องของข้อมูลและการดูแลรักษาระบบ.",
          "พัฒนา end-to-end test ด้วย Cypress เพื่อเพิ่มความมั่นใจก่อน release.",
          "ทำงานร่วมกับ backend และ QA เพื่อแก้ปัญหาใน SIT และ UAT.",
        ],
        tech: "Angular · TypeScript · SCSS · NgRx · REST API · Cypress",
      },
      {
        role: "วิศวกร Front-end (ฝึกงาน)",
        company: "Uniga Infotech",
        when: "มี.ค. 2023 - ต.ค. 2023",
        startDate: "2023-03",
        endDate: "2023-10",
        location: "นนทบุรี, ประเทศไทย",
        bullets: [
          "สนับสนุนการพัฒนา frontend feature สำหรับระบบองค์กรด้วย Angular และ TypeScript.",
          "พัฒนา UI component ตาม design specification และปรับปรุงการใช้งาน.",
          "เชื่อมต่อ REST API และจัดการแปลงข้อมูลพื้นฐานฝั่ง frontend.",
          "เรียนรู้และนำแนวคิด state management ด้วย NgRx ไปใช้ในงานจริง.",
          "สนับสนุนงานทดสอบและแก้ไขบั๊กภายใต้การดูแลของ senior developer.",
        ],
        tech: "Angular · TypeScript · SCSS · REST API",
      },
    ],
    projects: [
      {
        title: "Principal TH-IFA Platform",
        when: "พ.ค. 2025 - ปัจจุบัน",
        stack:
          "Node.js · TypeScript · Express · AWS Lambda · React · Vite · PostgreSQL · Okta · NDID · PAM",
        desc: "มีส่วนร่วมในการส่งมอบระบบ Principal TH-IFA ขึ้นโปรดักชัน ทั้งฝั่ง Admin Portal และ Customer Web ครอบคลุม third-party integration สำหรับ onboarding/e-KYC, workflow ธุรกรรมกองทุน (subscription/redemption/switching), การชำระเงินผ่าน ATS QR และโมดูลปฏิบัติการด้านแคมเปญ ข่าวสาร การแจ้งเตือน และการจัดการเอกสาร.",
      },
      {
        title: "TenantBot",
        when: "ม.ค. 2026 - ก.พ. 2026",
        stack:
          "Node.js · Express · Next.js · Vite Widget · Prisma · PostgreSQL/pgvector · JWT · PM2 · Docker · AWS",
        desc: "พัฒนาแพลตฟอร์ม AI Customer Support แบบหลายผู้เช่า พร้อม Playbook Studio (forms/intents/persona/knowledge), widget สำหรับฝังเว็บภายนอก, pipeline ingest ข้อมูลสำหรับ RAG และ workflow ให้แอดมิน takeover บทสนทนา.",
      },
      {
        title: "FinTrack",
        when: "มี.ค. 2025",
        stack: "Next.js · NestJS · Prisma · Supabase · Google Vision API",
        desc: "พัฒนาระบบจัดการรายจ่าย พร้อม OCR ใบเสร็จและแดชบอร์ดวิเคราะห์ข้อมูล.",
      },
      {
        title: "ระบบจองห้องเรียน",
        when: "ธ.ค. 2023 - ก.พ. 2024",
        stack: "React (TypeScript) · Vite · Tailwind · Docker",
        desc: "ระบบจองห้องเรียนพร้อมตรวจสอบการชนของเวลาและระบบแจ้งเตือน.",
      },
    ],
    education: [
      {
        school: "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร",
        when: "ก.ค. 2020 - ก.พ. 2024",
        degree: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
        gpa: "3.54",
      },
      {
        school: "วิทยาลัยอาชีวศึกษานครสวรรค์",
        when: "พ.ค. 2017 - ก.พ. 2020",
        degree: "ประกาศนียบัตรวิชาชีพ สาขาคอมพิวเตอร์ธุรกิจ",
        gpa: "3.33",
      },
    ],
    footerNote:
      "พร้อมสำหรับการสัมภาษณ์และการทดสอบทางเทคนิค สามารถอัปสกิลให้สอดคล้องกับบทบาทงาน และให้ข้อมูลอ้างอิงเพิ่มเติมได้เมื่อร้องขอ",
    labels: {
      back: "กลับหน้าแรก",
      savePdf: "บันทึก PDF",
      copySummary: "คัดลอกข้อความสรุป",
      copied: "คัดลอกสรุปสำหรับ LinkedIn แล้ว",
      copyFailed: "คัดลอกไม่สำเร็จ",
      clipboardUnavailable: "เบราว์เซอร์นี้ไม่รองรับการใช้งานคลิปบอร์ด",
      linkedinSummary: "สรุปสำหรับ LinkedIn",
      professionalSummary: "สรุปวิชาชีพ",
      profileSnapshot: "สรุปโปรไฟล์",
      coreCapabilities: "ความสามารถหลัก",
      technicalStack: "เทคโนโลยีที่ใช้งาน",
      selectedHighlights: "ผลงานสำคัญ",
      experience: "ประสบการณ์ทำงาน",
      projects: "โครงการ",
      education: "การศึกษา",
      contact: "ข้อมูลติดต่อ",
      openToWork: "พร้อมเริ่มงาน",
      printTip: "จัดรูปแบบให้เหมาะสำหรับการส่ง PDF และรองรับการอ่านของ ATS",
    },
  },
  zh: {
    fullName: "WISIT MOONDET",
    headline: "全栈/后端工程师",
    sub: "生产级金融系统 · API 安全 · 多租户平台",
    contact: {
      email: "wisitmoondet@gmail.com",
      phone: "+66 95 652 9419",
      website: "wisit.is-a.dev",
      github: "github.com/Wisitt",
      linkedin: "linkedin.com/in/wisit-m",
      location: "泰国 曼谷",
    },
    linkedinSummary:
      "我是一名以后端为核心的全栈工程师，擅长将复杂业务需求落地为稳定、可维护的生产系统。具备金融系统实战经验，熟悉安全 API 设计、第三方平台集成与 ATS QR 支付流程，可覆盖 SIT/UAT/Staging/Production 全流程交付。",
    professionalSummary:
      "我的工作方式强调端到端负责、细节质量与高效协作。可从架构设计、开发实现到生产支持持续交付，并能根据岗位要求快速补齐新领域与新技术。",
    profilePills: [
      "生产级 API",
      "金融业务系统",
      "安全优先设计",
      "云端运维",
      "学习适应快",
    ],
    coreCapabilities: [
      "基于 Node.js、TypeScript、Express 设计并实现可维护的 REST API（controller/service 分层）。",
      "构建认证与 e-KYC 流程：Okta、Azure AD（OAuth2 + PKCE）、JWT（RS256）、OTP/PIN、一次性令牌。",
      "集成第三方金融 API（Banking、PAM、IFA MF）及 ATS QR 支付流程，支持申购、赎回、转换与投资组合数据同步。",
      "落地 API 安全机制：CSRF、防刷限流（memory/Redis）、请求校验、数字签名与密钥管理。",
      "使用 Drizzle ORM 与 Prisma 设计 PostgreSQL 数据模型和事务逻辑，支持报表与审计日志。",
      "搭建文档处理流程：AWS S3 预签名上传/下载、文件校验、Excel 导入。",
      "实践现代工程规范：API 版本治理、CI/CD、可观测性、结构化日志与自动化测试。",
      "可根据岗位范围快速补齐能力，并在 sprint 节奏下稳定交付可上线成果。",
    ],
    skills: [
      {
        title: "后端工程",
        items:
          "Node.js, TypeScript, Express, REST API 设计, Drizzle ORM, Prisma, PostgreSQL, Redis, API 版本治理, 缓存",
      },
      {
        title: "前端工程",
        items:
          "React, Next.js, Angular, Tailwind CSS, SCSS, Ant Design, 状态管理, 可访问性",
      },
      {
        title: "安全与身份认证",
        items:
          "Okta, Azure AD, OAuth2 + PKCE, JWT (RS256), OTP/PIN, CSRF, 速率限制, RBAC, OWASP 最佳实践",
      },
      {
        title: "云平台与运维",
        items:
          "AWS EC2, Lambda, S3, Secrets Manager, Docker, PM2, IIS Reverse Proxy, CI/CD, 可观测性与监控",
      },
      {
        title: "AI 与数据",
        items:
          "OpenAI, Anthropic, Google, Groq, Hugging Face, RAG 工作流, pgvector, 数据摄取",
      },
      {
        title: "工程实践",
        items:
          "系统设计, Agile/Scrum, 技术文档, 根因分析, 线上故障支持, 快速补齐能力",
      },
    ],
    highlights: [
      "交付了 Principal TH-IFA 平台面向客户端与顾问端金融流程的生产级 API 与第三方系统集成（含 ATS QR 支付）。",
      "构建 TenantBot 多租户 AI 客服平台，覆盖 Playbook 管理、外部可嵌入组件和管理员接管流程。",
      "建立并维护多身份提供方场景下的安全认证与权限模型。",
      "通过结构化日志、审计追踪和监控体系持续提升系统稳定性。",
      "开发用户、文档、流程、活动与平台配置等管理后台模块。",
      "能快速适应新项目范围与业务领域，并保持稳定交付。",
    ],
    experiences: [
      {
        role: "全栈开发工程师",
        company: "Nilecon",
        when: "2025年5月 - 至今",
        startDate: "2025-05",
        location: "泰国·曼谷（混合办公）",
        bullets: [
          "使用 Node.js、TypeScript、Express 设计并开发安全 REST API，支持开户与金融业务流程。",
          "实现认证与 e-KYC：Okta、Azure AD（OAuth2 + PKCE）、JWT（RS256）、NDID。",
          "集成第三方金融 API（Banking、PAM、IFA MF）及 ATS QR 支付流程，支持申购、赎回、转换与投资组合同步。",
          "使用 Next.js、React、Tailwind CSS 开发后台模块，覆盖用户、文档、流程与活动管理。",
          "构建 AWS S3 文档流程（预签名上传/下载）、文件校验与 Excel 导入。",
          "实现日志、审计追踪与通知链路（Firebase FCM、邮件），支撑生产运维。",
          "在与客户直接沟通中承担方案咨询角色，将业务需求转化为技术范围、优先级与发布计划，协同团队交付。",
          "通过 Docker、PM2、AWS EC2、AWS Lambda、IIS 反向代理完成部署与运维。",
          "在 Agile/Scrum 模式下推进 SIT、UAT、Staging、Production 的交付。",
        ],
        tech: "Node.js · TypeScript · Express · Next.js · PostgreSQL · Drizzle ORM · AWS · Redis · Docker",
      },
      {
        role: "前端工程师（合同）",
        company: "Uniga Infotech",
        when: "2023年11月 - 2024年4月",
        startDate: "2023-11",
        endDate: "2024-04",
        location: "泰国·暖武里（混合办公）",
        bullets: [
          "开发并维护面向健康福利顾问系统的生产级 Angular 应用。",
          "使用 Angular、TypeScript、SCSS 构建可复用 UI 组件与功能模块。",
          "集成 REST API 并优化前端数据流与同步。",
          "使用 NgRx 管理全局状态，提升数据一致性与可维护性。",
          "使用 Cypress 实现端到端测试，提升发布稳定性。",
          "与后端和 QA 团队协作，解决 SIT 与 UAT 阶段问题。",
        ],
        tech: "Angular · TypeScript · SCSS · NgRx · REST API · Cypress",
      },
      {
        role: "前端工程师（实习）",
        company: "Uniga Infotech",
        when: "2023年3月 - 2023年10月",
        startDate: "2023-03",
        endDate: "2023-10",
        location: "泰国·暖武里",
        bullets: [
          "参与企业级前端功能开发，技术栈为 Angular 与 TypeScript。",
          "按设计规范实现 UI 组件并优化可用性。",
          "集成 REST API 并完成基础前端数据转换。",
          "在实际开发中应用 NgRx 状态管理基础能力。",
          "在资深工程师指导下支持测试与缺陷修复。",
        ],
        tech: "Angular · TypeScript · SCSS · REST API",
      },
    ],
    projects: [
      {
        title: "Principal TH-IFA 平台",
        when: "2025年5月 - 至今",
        stack:
          "Node.js · TypeScript · Express · AWS Lambda · React · Vite · PostgreSQL · Okta · NDID · PAM",
        desc: "参与 Principal TH-IFA 平台生产环境交付，覆盖管理后台与客户端站点，包括第三方系统对接下的开户/e-KYC、基金交易流程（申购/赎回/转换）、ATS QR 支付处理，以及活动、资讯、通知与文档管理等运营模块。",
      },
      {
        title: "TenantBot",
        when: "2026年1月 - 2026年2月",
        stack:
          "Node.js · Express · Next.js · Vite Widget · Prisma · PostgreSQL/pgvector · JWT · PM2 · Docker · AWS",
        desc: "构建多租户 AI 客服平台，包含 Playbook Studio（表单/意图/人设/知识库）、外部可嵌入聊天组件、RAG 数据摄取流程与管理员人工接管工作流。",
      },
      {
        title: "FinTrack",
        when: "2025年3月",
        stack: "Next.js · NestJS · Prisma · Supabase · Google Vision API",
        desc: "费用管理平台，支持票据 OCR 与数据分析看板。",
      },
      {
        title: "教室预约系统",
        when: "2023年12月 - 2024年2月",
        stack: "React (TypeScript) · Vite · Tailwind · Docker",
        desc: "教室预约系统，支持冲突检测与通知功能。",
      },
    ],
    education: [
      {
        school: "Rajamangala University of Technology Phra Nakhon",
        when: "2020年7月 - 2024年2月",
        degree: "计算机科学 学士",
        gpa: "3.54",
      },
      {
        school: "Nakhonsawan Vocational College",
        when: "2017年5月 - 2020年2月",
        degree: "商业计算机 职业证书",
        gpa: "3.33",
      },
    ],
    footerNote: "可安排面试与技术评估；可根据岗位要求快速补齐相关能力，推荐人信息可按需提供。",
    labels: {
      back: "返回",
      savePdf: "导出 PDF",
      copySummary: "复制摘要",
      copied: "已复制 LinkedIn 摘要。",
      copyFailed: "复制失败。",
      clipboardUnavailable: "当前浏览器不支持剪贴板。",
      linkedinSummary: "LinkedIn 摘要",
      professionalSummary: "职业简介",
      profileSnapshot: "个人概览",
      coreCapabilities: "核心能力",
      technicalStack: "技术栈",
      selectedHighlights: "重点亮点",
      experience: "工作经历",
      projects: "项目经验",
      education: "教育背景",
      contact: "联系信息",
      openToWork: "开放新机会",
      printTip: "页面已针对 PDF 导出与 ATS 解析优化。",
    },
  },
};

const LANGUAGE_OPTIONS: { key: LangKey; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "th", label: "TH" },
  { key: "zh", label: "中文" },
];

function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
    >
      {children}
    </button>
  );
}

function LanguageSwitcher({
  current,
  onChange,
}: {
  current: LangKey;
  onChange: (lang: LangKey) => void;
}) {
  return (
    <div className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white p-1 sm:w-auto">
      {LANGUAGE_OPTIONS.map((option) => {
        const active = option.key === current;
        return (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-bold transition sm:flex-none ${
              active
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}


export default function ResumePage() {
  const [lang, setLang] = useState<LangKey>("en");
  const d = DATA[lang];
  const conciseCoreCapabilities = d.coreCapabilities.slice(0, 5);
  const conciseHighlights = d.highlights.slice(0, 4);
  const conciseProjects = d.projects.slice(0, 4);
  const conciseSkills = d.skills.slice(0, 5);
  const conciseExperiences: ExperienceBlock[] = d.experiences.map((exp, idx) => ({
    ...exp,
    bullets: exp.bullets.slice(0, idx === 0 ? 5 : 4),
  }));

  function getDurationInMonths(startDate: string, endDate?: string): number {
    const [startYear, startMonth] = startDate.split("-").map(Number);
    const endBase = endDate
      ? endDate
      : `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    const [endYear, endMonth] = endBase.split("-").map(Number);
    return Math.max((endYear - startYear) * 12 + (endMonth - startMonth) + 1, 1);
  }

  function formatDuration(months: number): string {
    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    if (lang === "th") {
      if (years > 0 && remMonths > 0) return `${years} ปี ${remMonths} เดือน`;
      if (years > 0) return `${years} ปี`;
      return `${remMonths} เดือน`;
    }

    if (lang === "zh") {
      if (years > 0 && remMonths > 0) return `${years}年${remMonths}个月`;
      if (years > 0) return `${years}年`;
      return `${remMonths}个月`;
    }

    if (years > 0 && remMonths > 0) return `${years} yr${years > 1 ? "s" : ""} ${remMonths} mo${remMonths > 1 ? "s" : ""}`;
    if (years > 0) return `${years} yr${years > 1 ? "s" : ""}`;
    return `${remMonths} mo${remMonths > 1 ? "s" : ""}`;
  }

  function getExperienceDuration(exp: ExperienceBlock): string {
    return formatDuration(getDurationInMonths(exp.startDate, exp.endDate));
  }

  function copyLinkedInSummary() {
    const text = d.linkedinSummary;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert(d.labels.copied))
        .catch(() => alert(d.labels.copyFailed));
      return;
    }
    alert(d.labels.clipboardUnavailable);
  }

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");

        :root {
          --ink: #0b1220;
          --muted: #475569;
          --paper: #ffffff;
          --edge: #d7dee8;
          --accent: #0f4c81;
          --accent-soft: #e0ecf8;
        }

        * {
          font-family: "Plus Jakarta Sans", "Noto Sans Thai", "Noto Sans SC",
            -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body {
          color: var(--ink);
        }

        .resume-sheet {
          border: 1px solid var(--edge);
          border-radius: 20px;
          background: var(--paper);
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
        }

        .section-card {
          border: 1px solid var(--edge);
          border-radius: 16px;
          background: var(--paper);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #475569;
        }

        .section-title::before {
          content: "";
          width: 0.35rem;
          height: 0.95rem;
          border-radius: 999px;
          background: var(--accent);
        }

        @media print {
          @page {
            margin: 12mm;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: #fff !important;
          }

          main {
            background: #fff !important;
            padding: 0 !important;
          }

          .resume-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }

          .section-card {
            border-color: #d1d5db !important;
          }

          .no-print {
            display: none !important;
          }

          .print-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <main className="min-h-screen bg-slate-100 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="no-print sticky top-3 z-20 mb-5 flex flex-col items-stretch gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <Link
              href="/"
              aria-label={d.labels.back}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
            >
              <FaArrowLeft />
              {d.labels.back}
            </Link>

            <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700">
                <FaLanguage />
                <span className="hidden sm:inline">{d.labels.profileSnapshot}</span>
                <span className="sm:hidden">Language</span>
              </span>
              <LanguageSwitcher current={lang} onChange={setLang} />
              <ActionButton onClick={() => window.print()}>
                <FaDownload />
                {d.labels.savePdf}
              </ActionButton>
              <ActionButton onClick={copyLinkedInSummary}>
                <FaCopy />
                {d.labels.copySummary}
              </ActionButton>
            </div>
          </div>

          <section className="resume-sheet p-4 sm:p-5">
            <header className="print-break-inside-avoid relative mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-sky-100/70 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-slate-200/60 blur-2xl" />

              <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="relative">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      {d.labels.openToWork}
                    </span>
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[2.45rem]">
                    {d.fullName}
                  </h1>
                  <p className="mt-2 text-lg font-bold text-slate-800 sm:text-xl">{d.headline}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
                    {d.sub}
                  </p>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 px-4 py-3">
                    <p className="text-sm leading-7 text-slate-700">{d.professionalSummary}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {d.profilePills.map((pill, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-xs font-medium text-slate-500">{d.labels.printTip}</p>
                </div>

                <div className="section-card relative grid gap-2 p-4 text-sm text-slate-700">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    {d.labels.contact}
                  </h2>
                  <a
                    href={`mailto:${d.contact.email}`}
                    className="inline-flex min-w-0 items-center gap-2 break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-white"
                  >
                    <FaEnvelope className="text-slate-500" />
                    {d.contact.email}
                  </a>
                  <a
                    href={`tel:${d.contact.phone}`}
                    className="inline-flex min-w-0 items-center gap-2 break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-white"
                  >
                    <FaPhone className="text-slate-500" />
                    {d.contact.phone}
                  </a>
                  <a
                    href={`https://${d.contact.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 items-center gap-2 break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-white"
                  >
                    <FaGlobe className="text-slate-500" />
                    {d.contact.website}
                  </a>
                  <a
                    href={`https://${d.contact.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 items-center gap-2 break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-white"
                  >
                    <FaGithub className="text-slate-500" />
                    {d.contact.github}
                  </a>
                  <a
                    href={`https://${d.contact.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 items-center gap-2 break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-white"
                  >
                    <FaLinkedin className="text-slate-500" />
                    {d.contact.linkedin}
                  </a>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <FaMapMarkerAlt className="text-slate-500" />
                    {d.contact.location}
                  </div>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
                <section className="section-card print-break-inside-avoid p-5">
                  <h2 className="section-title mb-3">{d.labels.profileSnapshot}</h2>
                  <p className="text-[15px] leading-7 text-slate-700">{d.linkedinSummary}</p>
                </section>

                <section className="section-card print-break-inside-avoid p-5">
                  <h2 className="section-title mb-3">{d.labels.coreCapabilities}</h2>
                  <ul className="space-y-2.5">
                    {conciseCoreCapabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm leading-7 text-slate-700">
                        <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[11px] font-bold text-[var(--accent)]">
                          {idx + 1}
                        </span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="section-card print-break-inside-avoid p-5">
                  <h2 className="section-title mb-3">{d.labels.technicalStack}</h2>
                  <div className="space-y-3">
                    {conciseSkills.map((group, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                        <p className="text-xs font-extrabold uppercase tracking-wide text-slate-600">
                          {group.title}
                        </p>
                        <p className="mt-1 break-words text-sm leading-7 text-slate-700">{group.items}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>

              <section className="space-y-4">
                <section className="section-card print-break-inside-avoid p-5 sm:p-6">
                  <h2 className="section-title mb-4">{d.labels.experience}</h2>
                  <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-slate-200">
                    {conciseExperiences.map((exp, idx) => (
                      <li key={idx} className="relative pl-6 sm:pl-8">
                        <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-sky-700 bg-white" />
                        <article className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="text-lg font-bold tracking-tight text-slate-900">{exp.role}</h3>
                              <p className="text-sm font-semibold text-slate-600">{exp.company}</p>
                            </div>
                            <div className="text-sm text-slate-600 sm:text-right">
                              <p>
                                {exp.when} · {getExperienceDuration(exp)}
                              </p>
                              <p>{exp.location}</p>
                            </div>
                          </div>

                          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                            {exp.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="flex items-start gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-500" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="mt-3 inline-flex break-words rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            Tech: {exp.tech}
                          </p>
                        </article>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="section-card print-break-inside-avoid p-5 sm:p-6">
                  <h2 className="section-title mb-4">{d.labels.selectedHighlights}</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {conciseHighlights.map((highlight, idx) => (
                      <article
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <p className="text-sm leading-7 text-slate-700">{highlight}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="section-card print-break-inside-avoid p-5 sm:p-6">
                  <h2 className="section-title mb-4">{d.labels.projects}</h2>
                  <div className="grid gap-3">
                    {conciseProjects.map((project, idx) => (
                      <article
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5"
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="text-sm font-bold text-slate-900 sm:text-base">{project.title}</h3>
                          <p className="text-xs font-semibold text-slate-500">{project.when}</p>
                        </div>
                        <p className="mt-2 break-words text-xs font-semibold text-slate-600">{project.stack}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{project.desc}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="section-card print-break-inside-avoid p-5 sm:p-6">
                  <h2 className="section-title mb-4">{d.labels.education}</h2>
                  <div className="grid gap-3">
                    {d.education.map((item, idx) => (
                      <article key={idx} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-bold text-slate-900 sm:text-base">{item.school}</h3>
                          <p className="text-xs font-semibold text-slate-500">{item.when}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">
                          {item.degree}
                          {item.gpa ? ` · GPA ${item.gpa}` : ""}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                <footer className="section-card p-5 text-sm text-slate-700">
                  <p className="leading-7">{d.footerNote}</p>
                </footer>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
