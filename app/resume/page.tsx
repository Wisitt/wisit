"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { contact, education, experiences, finops, languages, skillGroups, summary } from "@/lib/resume-data";

export default function ResumePage() {
  return <main className="resume-page">
    <div className="resume-toolbar"><Link href="/"><ArrowLeft size={16} />Portfolio</Link><button onClick={() => window.print()}><Printer size={16} />Print / Save PDF</button></div>
    <article className="resume-sheet">
      <header className="resume-header"><div><h1>WISIT MOONDET</h1><h2>Full-Stack Engineer (Backend-Focused)</h2></div><address className="resume-contact"><span>{contact.location}</span><a href={`mailto:${contact.email}`}>{contact.email}</a><a href="tel:+66956529419">{contact.phone}</a><a href={`https://${contact.website}`}>{contact.website}</a><a href={`https://${contact.github}`}>{contact.github}</a><a href={`https://${contact.linkedin}`}>{contact.linkedin}</a></address></header>
      <section className="resume-section"><h2 className="resume-section-title">SUMMARY</h2><p className="resume-summary">{summary}</p></section>
      <section className="resume-section"><h2 className="resume-section-title">WORK EXPERIENCE</h2>{experiences.map((item) => <article className="resume-job" key={item.company}><div className="resume-job-head"><div><h3>{item.role} - <span className="company-name">{item.company}</span></h3><p className="experience-meta">{item.meta}</p></div><time>{item.period}</time></div><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</section>
      <section className="resume-section"><h2 className="resume-section-title">FINOPS R&D (SELF-DIRECTED)</h2><ul className="resume-rd">{finops.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="resume-section"><h2 className="resume-section-title">SKILLS</h2><div className="resume-skills">{skillGroups.map((group) => <div key={group.title}><strong>{group.title}:</strong> {group.items}</div>)}</div></section>
      <section className="resume-section"><h2 className="resume-section-title">EDUCATION</h2>{education.map((item) => <div className="resume-edu" key={item.school}><div><h3>{item.school}</h3><p>{item.detail}</p></div><time>{item.period}</time></div>)}</section>
      <section className="resume-section"><h2 className="resume-section-title">LANGUAGES</h2><p className="resume-summary">{languages}</p></section>
    </article>
  </main>;
}
