"use client";

import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";

interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/Wisitt", label: "GITHUB" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/wisit-m/", label: "LINKEDIN" },
  { icon: Mail, href: "mailto:wisitmoondet@gmail.com", label: "EMAIL" },
];

function usePrefersReducedMotion() {
  const ref = useRef<boolean>(false);
  useEffect(() => {
    try {
      ref.current =
        typeof window !== "undefined" &&
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

export default function Contact(): React.ReactElement  {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useParallaxContainer();

  useEffect(() => {
    const t = window.setTimeout(() => setIsMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const validate = (): boolean => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("กรุณากรอกชื่อ อีเมล และข้อความให้ครบ");
      return false;
    }
    const simpleEmailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!simpleEmailRe.test(formData.email)) {
      alert("กรุณากรอกอีเมลให้ถูกต้อง");
      return false;
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const subject = `Contact from ${formData.name}`;
      const body = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        "",
        "Message:",
        formData.message,
        "",
        "---",
        "Sent from: portfolio site",
      ].join("\n");

      const mailto = `mailto:wisitmoondet@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Try to open mail client
      window.location.href = mailto;

      // optimistic success (navigation to mail client is external)
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      window.setTimeout(() => setShowSuccess(false), 6000);
    } catch (error) {
      // Log the error and fallback to copying the email to clipboard
      console.error("Failed to open mailto:", error);
      try {
        await navigator.clipboard.writeText("wisitmoondet@gmail.com");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 4000);
        alert("ไม่สามารถเปิดโปรแกรมอีเมลบนเครื่องนี้ — อีเมลถูกคัดลอกลงคลิปบอร์ด: wisitmoondet@gmail.com");
      } catch {
        alert("ไม่สามารถส่งอีเมลได้ตอนนี้ — โปรดติดต่อทาง wisitmoondet@gmail.com โดยตรง");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="section-seam relative min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white py-20 overflow-hidden font-mono"
      data-parallax="true"
      aria-label="Contact"
    >
      <style>{`
        .section-seam { position: relative; z-index: 0; }
        .section-seam::before { content: ""; position: absolute; left: 0; right: 0; top: -12rem; height: 12rem; pointer-events: none; z-index: 60; background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 30%, rgba(17,24,39,0.85) 80%, rgba(17,24,39,1) 100%); backdrop-filter: blur(4px); transform: translate3d(calc(var(--px) * -0.03px), calc(var(--py) * -0.02px), 0); }
        .career-parallax { position: relative; overflow: hidden; }
        .career-bg-layer { position: absolute; inset: 0; pointer-events: none; will-change: transform, opacity; }
        .career-bg-layer.depth-1 { opacity: 0.03; transform: scale(1.02); animation: floatTiny 9s ease-in-out infinite; background-image: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.04) 0%, transparent 50%); }
        .career-bg-layer.depth-2 { opacity: 0.02; background-image: linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px); background-size: 48px 48px; animation: floatSlow 12s ease-in-out infinite; transform: translateZ(0); }
        @keyframes floatSlow { 0% { transform: translateY(0) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0) } }
        @keyframes floatTiny { 0% { transform: translateY(0) } 50% { transform: translateY(-6px) } 100% { transform: translateY(0) } }
      `}</style>

      <div className="career-parallax" data-parallax="true">
        <div className="career-bg-layer depth-1" aria-hidden style={{ transform: `translate3d(calc(var(--px) * -0.12px), calc(var(--py) * -0.12px), 0) scale(1.03)` }} />
        <div className="career-bg-layer depth-2" aria-hidden style={{ transform: `translate3d(calc(var(--px) * 0.18px), calc(var(--py) * 0.18px), 0)` }} />

        <div className="container mx-auto px-8 sm:px-12 lg:px-16 relative max-w-6xl">
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ease-out ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 opacity-60 mb-6 text-xs tracking-wider"><Mail className="w-4 h-4" /><span>GET IN TOUCH</span></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">CONTACT</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`transition-all duration-700 delay-200 ease-out ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="p-6 sm:p-8 border-2 border-white/20 bg-black/40 backdrop-blur-md rounded-2xl">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs mb-2 tracking-wider opacity-60">NAME</label>
                    <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="YOUR NAME" className="w-full bg-black/50 border-2 border-white/30 px-4 py-3 text-white font-mono focus:outline-none focus:border-white transition-all rounded-md" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs mb-2 tracking-wider opacity-60">EMAIL</label>
                    <input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="YOUR@EMAIL.COM" className="w-full bg-black/50 border-2 border-white/30 px-4 py-3 text-white font-mono focus:outline-none focus:border-white transition-all rounded-md" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs mb-2 tracking-wider opacity-60">MESSAGE</label>
                    <textarea id="message" rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="TELL ME ABOUT YOUR PROJECT" className="w-full bg-black/50 border-2 border-white/30 px-4 py-3 text-white font-mono focus:outline-none focus:border-white transition-all rounded-md resize-none" />
                  </div>

                  <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-white text-black py-4 font-bold tracking-wider hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-md">
                    <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  {showSuccess && (
                    <div className="p-4 border-2 border-white/20 bg-white/5 flex items-start gap-3 rounded">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold mb-1">MESSAGE ACTIONED</p>
                        <p className="text-xs opacity-60">Your email client should open — if not, wisitmoondet@gmail.com has been copied to clipboard.</p>
                      </div>
                    </div>
                  )}

                  {copied && (
                    <div className="p-3 border-2 border-white/12 bg-white/4 rounded text-xs">Email copied to clipboard: wisitmoondet@gmail.com</div>
                  )}
                </div>
              </div>
            </div>

            <div className={`space-y-6 transition-all duration-700 delay-300 ease-out ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="p-6 sm:p-8 border-2 border-white/20 bg-black/40 backdrop-blur-md rounded-2xl">
                <h3 className="text-sm font-bold mb-4 tracking-wider opacity-60">CONNECT</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 border-2 border-white/20 bg-black/30 hover:bg-white hover:text-black transition-all rounded-md">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-wider">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 sm:p-8 border-2 border-white/20 bg-black/40 backdrop-blur-md space-y-6 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold mb-3 tracking-wider opacity-60">AVAILABILITY</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-white/20 bg-white/5 rounded-full">
                    <span className="w-2 h-2 bg-white animate-pulse rounded-full" />
                    <span className="text-xs tracking-wider">AVAILABLE FOR WORK</span>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-white/20">
                  <h3 className="text-sm font-bold mb-3 tracking-wider opacity-60">LOCATION</h3>
                  <p className="text-sm font-mono text-white/80 leading-relaxed">BANGKOK, THAILAND<br />WORKING WORLDWIDE</p>
                </div>

                <div className="pt-6 border-t-2 border-white/20">
                  <h3 className="text-sm font-bold mb-3 tracking-wider opacity-60">RESPONSE TIME</h3>
                  <p className="text-sm font-mono text-white/80 leading-relaxed">24-48 HOURS<br />DURING BUSINESS DAYS</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-20 pt-12 border-t-2 border-white/12 text-center transition-all duration-700 delay-400 ease-out ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs opacity-60 tracking-widest mb-4">© {new Date().getFullYear()} WISITT — ALL RIGHTS RESERVED</p>
            <p className="text-xs opacity-40 tracking-wider">BUILT WITH NEXT.JS, TYPESCRIPT & TAILWIND CSS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
