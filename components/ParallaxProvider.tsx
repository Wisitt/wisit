// components/ParallaxProvider.tsx
"use client";

import React, { useEffect, useRef } from "react";

/**
 * ParallaxProvider
 * - Single source of truth for parallax CSS vars (--px / --py)
 * - Renders fixed layers (radial, grid, foreground shapes) once
 * - Respects prefers-reduced-motion
 * - Low-cost RAF lerp loop; pointer/touch events drive target values
 *
 * Tweak:
 * - strength: how far shapes move (px multiplier)
 * - seamTop: where the seam overlay sits (e.g. "44vh")
 */
export default function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--px", "0px");
      el.style.setProperty("--py", "0px");
      return;
    }

    const strength = 44; // px scale
    const smoothing = 0.14; // lerp factor

    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      target.current.x = nx * strength;
      target.current.y = ny * strength;
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const nx = (t.clientX / window.innerWidth - 0.5) * 2;
      const ny = (t.clientY / window.innerHeight - 0.5) * 2;
      target.current.x = nx * strength;
      target.current.y = ny * strength;
    };

    const step = () => {
      current.current.x += (target.current.x - current.current.x) * smoothing;
      current.current.y += (target.current.y - current.current.y) * smoothing;
      el.style.setProperty("--px", `${current.current.x.toFixed(2)}px`);
      el.style.setProperty("--py", `${current.current.y.toFixed(2)}px`);
      rafRef.current = requestAnimationFrame(step);
    };

    // passive listeners
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // small constants exposed so you can edit quickly
  const seamTop = "44vh"; // adjust to align seam between sections
  const seamHeight = "18rem";

  return (
    <div ref={rootRef} data-parallax="true" style={{ ["--px" as any]: "0px", ["--py" as any]: "0px", position: "relative" }}>
      {/* depth-0: subtle radial highlights */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 45%)",
          opacity: 0.06,
          transform: "translate3d(calc(var(--px) * 0.06), calc(var(--py) * 0.06), 0) scale(1.02)",
          willChange: "transform, opacity",
        }}
      />

      {/* depth-1: large grid */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          opacity: 0.035,
          transform: "translate3d(calc(var(--px) * 0.15), calc(var(--py) * 0.15), 0) scale(1.01)",
          willChange: "transform, opacity",
        }}
      />

      {/* depth-2: fine grid */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.28) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          opacity: 0.02,
          transform: "translate3d(calc(var(--px) * 0.28), calc(var(--py) * 0.28), 0)",
          willChange: "transform, opacity",
        }}
      />

      {/* depth-3: foreground shapes */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.18,
          transform: "translate3d(calc(var(--px) * 0.6), calc(var(--py) * 0.6), 0)",
          willChange: "transform, opacity",
        }}
      >
        <div style={{ position: "absolute", left: "8%", top: "14%", width: 140, height: 140, borderRadius: "28% 72% 72% 28% / 30% 30% 70% 70%", background: "linear-gradient(135deg, rgba(255,255,255,0.24), transparent)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", right: "14%", bottom: "20%", width: 160, height: 160, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", background: "linear-gradient(225deg, rgba(255,255,255,0.18), transparent)", filter: "blur(2px)" }} />
        <div style={{ position: "absolute", right: "20%", top: "12%", width: 96, height: 96, clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)", background: "linear-gradient(135deg,#fff,#fff7)", boxShadow: "0 0 40px rgba(255,255,255,0.08)" }} />
      </div>

      {/* seam overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: seamTop,
          height: seamHeight,
          pointerEvents: "none",
          zIndex: 5,
          background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(8,10,16,0.10) 18%, rgba(14,16,22,0.28) 46%, rgba(20,22,30,1) 100%)",
          backdropFilter: "blur(6px)",
          transform: "translate3d(calc(var(--px) * -0.03px), calc(var(--py) * -0.02px), 0)",
        }}
      />

      {/* content (on top of layers) */}
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>

      {/* float animation only for devices without pointer (mobile fallback) */}
      <style>{`
        @media (hover: none), (pointer: coarse) {
          @keyframes floatSlow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
        }
      `}</style>
    </div>
  );
}
