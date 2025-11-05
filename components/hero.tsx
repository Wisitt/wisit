// components/Hero.tsx (or app/hero.tsx)
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, DownloadCloud } from "lucide-react";

function useMouseParallax(containerRef: React.RefObject<HTMLElement | null>, opts?: { strength?: number; smoothing?: number }) {
  const strength = opts?.strength ?? 36;
  const smoothing = opts?.smoothing ?? 0.14;
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.style.setProperty("--px", "0px");
      node.style.setProperty("--py", "0px");
      return;
    }
    node.style.setProperty("--px", "0px");
    node.style.setProperty("--py", "0px");

    const onPointerMove = (e: PointerEvent) => {
      try {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        targetRef.current.x = nx * strength;
        targetRef.current.y = ny * strength;
      } catch (err) {
        console.warn("onPointerMove failed", err);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      try {
        const t = e.touches[0];
        if (!t) return;
        const nx = (t.clientX / window.innerWidth - 0.5) * 2;
        const ny = (t.clientY / window.innerHeight - 0.5) * 2;
        targetRef.current.x = nx * strength;
        targetRef.current.y = ny * strength;
      } catch {}
    };

    const step = () => {
      try {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothing;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothing;
        node.style.setProperty("--px", `${currentRef.current.x.toFixed(2)}px`);
        node.style.setProperty("--py", `${currentRef.current.y.toFixed(2)}px`);
      } catch {}
      rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [containerRef, strength, smoothing]);
}

function scrollToWork() {
  if (typeof window === "undefined") return;
  try {
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (window.location.pathname !== "/") {
      // navigate to root hash (safe)
      window.location.href = "/#work";
    } else {
      window.location.hash = "#work";
    }
  } catch (err) {
    console.warn("scrollToWork failed", err);
  }
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useMouseParallax(rootRef, { strength: 36, smoothing: 0.14 });

  return (
    <header
      ref={rootRef}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden"
      style={{ ["--px" as string]: "0px", ["--py" as string]: "0px" }}
      aria-label="Hero"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        <nav className="flex items-center justify-between py-6">
          <div className={`text-sm font-semibold tracking-widest ${mounted ? "opacity-100" : "opacity-0"}`}>WISIT MOONDET</div>
          <div className={`flex items-center gap-4 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToWork(); }} className="text-sm hover:opacity-80">WORK</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); const el = typeof document !== "undefined" ? document.getElementById("contact") : null; if (el) el.scrollIntoView({ behavior: "smooth" }); else window.location.hash = "#contact"; }} className="text-sm hover:opacity-80">CONTACT</a>

            <div className="flex items-center gap-2">
              <Link href="/resume" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-white/95 to-white/75 text-black shadow-sm hover:scale-105 transform transition">
                <DownloadCloud className="w-4 h-4" />
                <span>Resume</span>
                <span className="ml-1 text-xs bg-black/10 px-2 py-0.5 rounded-full text-black/70 font-medium">PDF</span>
              </Link>

              <Link href="/resume" className="inline-flex sm:hidden items-center justify-center w-10 h-10 rounded-full bg-white/12 border border-white/10 hover:bg-white/20 transition transform hover:scale-105" title="Resume">
                <DownloadCloud className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 py-10">
          <div className="flex-1 ">
            <div className={`mb-4 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/3 border border-white/10 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-wider">Open to work</span>
            </div>

            <h1 className={`hero-title font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] mb-6 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Wisit Moondet
              <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">Software Engineer</span>
            </h1>

            <p className={`max-w-xl text-sm sm:text-base opacity-80 mb-6 ${mounted ? "opacity-100" : "opacity-0"}`}>
              I build reliable, maintainable web platforms — frontend interfaces and backend services — that scale and ship value quickly.
            </p>

            <div className={`flex flex-wrap gap-3 items-center ${mounted ? "opacity-100" : "opacity-0"}`}>
              <button onClick={() => scrollToWork()} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded shadow-md">
                View Work <ArrowRight className="w-4 h-4" />
              </button>

              <a href="#contact" onClick={(e) => { e.preventDefault(); const el = typeof document !== "undefined" ? document.getElementById("contact") : null; if (el) el.scrollIntoView({ behavior: "smooth" }); else window.location.hash = "#contact"; }} className="px-5 py-3 border border-white/20 rounded font-medium bg-white/5">Get in touch</a>
            </div>

            <div className={`mt-6 text-xs opacity-60 ${mounted ? "opacity-100" : "opacity-0"}`}>
              Preferred locations: Bangkok — Remote. Available for full-time or contract.
            </div>

            <div className={`mt-6 flex items-center gap-3 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <a href="https://github.com/Wisitt" aria-label="Github" className="p-2 border rounded bg-white/3"><Github className="w-4 h-4" /></a>
              <a href="https://linkedin.com/in/wisit-m" aria-label="LinkedIn" className="p-2 border rounded bg-white/3"><Linkedin className="w-4 h-4" /></a>
              <a href="mailto:wisitmoondet@gmail.com" aria-label="Email" className="p-2 border rounded bg-white/3"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
        </main>
      </div>
    </header>
  );
}
