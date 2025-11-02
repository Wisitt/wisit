"use client"

import React, { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, ArrowRight, DownloadCloud } from "lucide-react"

/* ---- same parallax hook approach (keeps your implementation) ---- */
function useMouseParallax(containerRef: React.RefObject<HTMLElement | null>, opts?: { strength?: number; smoothing?: number }) {
  const strength = opts?.strength ?? 44
  const smoothing = opts?.smoothing ?? 0.12
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      node.style.setProperty("--px", "0px")
      node.style.setProperty("--py", "0px")
      return
    }
    node.style.setProperty("--px", "0px")
    node.style.setProperty("--py", "0px")

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      targetRef.current.x = nx * strength
      targetRef.current.y = ny * strength
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const nx = (t.clientX / window.innerWidth - 0.5) * 2
      const ny = (t.clientY / window.innerHeight - 0.5) * 2
      targetRef.current.x = nx * strength
      targetRef.current.y = ny * strength
    }

    const step = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothing
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothing
      node.style.setProperty("--px", `${currentRef.current.x.toFixed(2)}px`)
      node.style.setProperty("--py", `${currentRef.current.y.toFixed(2)}px`)
      rafRef.current = requestAnimationFrame(step)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [containerRef, strength, smoothing])
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  useMouseParallax(rootRef, { strength: 36, smoothing: 0.14 })

  const primaryTitle = "Software Engineer"

  return (
    <header
      ref={rootRef}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden"
      style={{ ["--px" as any]: "0px", ["--py" as any]: "0px" }}
      aria-label="Hero"
    >
      <style>{`
        .depth-back { transform: translate3d(calc(var(--px) * 0.04), calc(var(--py) * 0.04), 0); opacity: .06 }
        .depth-mid { transform: translate3d(calc(var(--px) * 0.12), calc(var(--py) * 0.12), 0); opacity: .04 }
        .depth-front { transform: translate3d(calc(var(--px) * 0.32), calc(var(--py) * 0.32), 0); opacity: .12 }
        .hero-title { line-height: 0.96; }
        @media (max-width: 640px) { .hero-title { font-size: 2.1rem; } }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 depth-back" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.06), transparent 35%)" }} />
        <div className="absolute inset-0 depth-mid" aria-hidden style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute inset-0 depth-front" aria-hidden />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        <nav className="flex items-center justify-between py-6">
          <div className={`text-sm font-semibold tracking-widest ${mounted ? "opacity-100" : "opacity-0"}`}>WISIT MOONDET</div>
          <div className={`flex items-center gap-4 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <a href="#work" className="text-sm hover:opacity-80">WORK</a>
            <a href="#contact" className="text-sm hover:opacity-80">CONTACT</a>

            {/* Improved Resume button: full label on sm+ and icon-only on xs */}
            <div className="flex items-center gap-2">
              {/* full button for sm+ */}
              <a
                href="/resume"
                aria-label="Open resume (new page)"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-white/95 to-white/75 text-black shadow-[0_6px_18px_rgba(255,255,255,0.06)] hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Resume</span>
                <span className="ml-1 text-xs bg-black/10 px-2 py-0.5 rounded-full text-black/70 font-medium">PDF</span>
              </a>

              {/* small circular icon for xs */}
              <a
                href="/resume"
                aria-label="Open resume"
                className="inline-flex sm:hidden items-center justify-center w-10 h-10 rounded-full bg-white/12 border border-white/10 hover:bg-white/20 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
                title="Resume"
              >
                <DownloadCloud className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>

        <main className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 py-10">
          <div className="flex-1">
            <div className={`mb-4 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/3 border border-white/10 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-wider">Open to work</span>
            </div>

            <h1 className={`hero-title font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] mb-6 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Wisit Moondet
              <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">{primaryTitle}</span>
            </h1>

            <p className={`max-w-xl text-sm sm:text-base opacity-80 mb-6 ${mounted ? "opacity-100" : "opacity-0"}`}>
              I build reliable, maintainable web platforms — frontend interfaces and backend services — that scale and ship value quickly. Currently seeking roles across frontend, backend and full-stack teams.
            </p>

            <div className={`flex flex-wrap gap-3 items-center ${mounted ? "opacity-100" : "opacity-0"}`}>
              <a href="#work" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded shadow-md">
                View Work <ArrowRight className="w-4 h-4" />
              </a>

              <a href="#contact" className="px-5 py-3 border border-white/20 rounded font-medium bg-white/5">Get in touch</a>
            </div>

            <div className={`mt-6 text-xs opacity-60 ${mounted ? "opacity-100" : "opacity-0"}`}>
              Preferred locations: Bangkok — Remote. Available for full-time or contract.
            </div>

            <div className={`mt-6 flex items-center gap-3 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <a href="https://github.com/Wisitt" aria-label="Github" className="p-2 border rounded bg-white/3"><Github className="w-4 h-4" /></a>
              <a href="https://linkedin.com/in/wisit-m" aria-label="LinkedIn" className="p-2 border rounded bg-white/3"><Linkedin className="w-4 h-4" /></a>
              <a href="mailto:contact@wisitt.com" aria-label="Email" className="p-2 border rounded bg-white/3"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
{/* 
          <div className="w-full lg:w-1/3 flex justify-center items-center">
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-white/8 bg-gradient-to-br from-white/3 to-transparent flex items-center justify-center">
              <div className="text-xs text-white/80 text-center px-6">
                <div className="font-semibold mb-1">Hi — I’m Wisit</div>
                <div className="text-[13px] opacity-70">Developer available for frontend / backend / full-stack roles</div>
              </div>
            </div>
          </div> */}
        </main>

        {/* <footer className={`pt-8 pb-12 border-t border-white/10 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="flex justify-between items-center text-xs opacity-70">
            <div>© {new Date().getFullYear()} Wisit Moondet</div>
            <div>Software Engineer — Open to work</div>
          </div>
        </footer> */}
      </div>
    </header>
  )
}
