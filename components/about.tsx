"use client"

import { useEffect, useState, useRef, memo, useMemo } from "react"
import { Card } from "@/components/ui/card"

import { LazyMotion, m, domAnimation } from "framer-motion"
import { ChevronRight, Code, Terminal } from "lucide-react"

interface Milestone {
  year: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tech: string[]
  achievement: string
  codeSnippet: string
}

const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.1, ...options })
  
    const element = elementRef.current
    if (element) observer.observe(element)
    return () => { if (element) observer.unobserve(element) }
  }, [options])
  

  return [elementRef, isVisible] as const
}

// Memoized milestones data
const useMilestones = () => useMemo(() => [
  { 
    year: "2020 - 2024",
    title: "Front-End Developer (Contract) - Unigainfo Tech",
    description: "Developed and maintained Health Benefit Consultant Systems using Angular.",
    icon: Code,
    tech: ["Angular", "NgRx", "Cypress", "GitHub Actions", "REST API"],
    achievement: "Implemented key UI components and optimized system performance.",
    codeSnippet: ""
  },
  {
    year: "2017 - 2020",
    title: "Front-End Developer (Intern) - Unigainfo Tech",
    description: "Contributed to Angular-based projects and gained experience in Agile development.",
    icon: Code,
    tech: ["Angular", "Cypress", "State Management", "Agile"],
    achievement: "Performed system-wide testing and collaborated with cross-functional teams.",
    codeSnippet: ""
  }
], []);

const TechBadge = memo(({ tech, index }: { tech: string, index: number }) => (
  <m.span
    key={tech}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="
      px-4 py-1.5 text-sm rounded-full
      bg-gradient-to-r from-[#00ff9d]/10 to-[#00ffff]/10
      hover:from-[#00ff9d]/20 hover:to-[#00ffff]/20
      text-[#00ff9d] font-mono
      border border-[#00ff9d]/20
      transform hover:scale-105 transition-all duration-300
    "
  >
    {tech}
  </m.span>
));

const MilestoneCard = memo(({ milestone, index }: { 
  milestone: Milestone
  index: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="
        shadow-[0_0_50px_rgba(0,255,157,0.15)]
        group relative overflow-hidden
        bg-gradient-to-br from-black/80 to-black/40
        backdrop-blur-xl border-0
        hover:shadow-[0_0_50px_rgba(0,255,157,0.15)]
        transition-all duration-500
      ">
        {/* Simplified background gradient - more performant */}
        <div className="
          absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 via-transparent to-[#00ffff]/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-700
        " />
        
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <m.div
                whileHover={{ scale: 1.1 }} // Removed rotate for better performance
                transition={{ type: "spring", stiffness: 300 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-[#00ff9d]/20 to-[#00ffff]/20"
              >
                <milestone.icon className="w-8 h-8 text-[#00ff9d]" />
              </m.div>
              <div>
                <div className="overflow-hidden">
                  <span className="text-[#00ff9d] font-mono text-sm tracking-wider">
                    {milestone.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
                  {milestone.title}
                </h3>
              </div>
            </div>
            
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 transition-colors"
            >
              <ChevronRight 
                className={`w-5 h-5 text-[#00ff9d] transition-transform duration-300 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
            </m.button>
          </div>

          <m.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pb-4">
              <p className="text-gray-300 leading-relaxed">
                {milestone.description}
              </p>

              {/* Tech Stack - optimized using memoized component */}
              <div className="flex flex-wrap gap-2">
                {milestone.tech.map((tech, i) => (
                  <TechBadge key={tech} tech={tech} index={i} />
                ))}
              </div>

              {/* Code Snippet */}
              <div className="
                relative group/code
                font-mono text-sm
                p-4 rounded-xl
                bg-black/50
                border border-[#00ff9d]/10
                overflow-hidden
              ">
                <div className="
                  absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 to-transparent
                  group-hover/code:opacity-100 opacity-0 transition-opacity duration-300
                " />
              </div>

              {/* Achievement */}
              <div className="
                relative overflow-hidden
                p-4 rounded-xl
                bg-gradient-to-r from-[#00ff9d]/5 to-[#00ffff]/5
                border border-[#00ff9d]/10
              ">
                <div className="
                  absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 to-[#00ffff]/5
                " />
                <p className="relative text-[#00ff9d] italic">
                  {milestone.achievement}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </Card>
    </m.div>
  )
});

// Optimized Grid Background component
const CyberpunkGrid = memo(() => {
  // Only render a reasonable number of grid cells instead of 200
  const gridCells = useMemo(() => Array(50).fill(0).map((_, i) => (
    <div
      key={i}
      className="border-[0.5px] border-[#00ff9d]/20"
      style={{
        opacity: Math.random() * 0.5,
        gridColumn: `span ${Math.floor(Math.random() * 2) + 1}`,
        gridRow: `span ${Math.floor(Math.random() * 2) + 1}`,
      }}
    />
  )), []);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] grid-rows-[repeat(auto-fill,minmax(80px,1fr))] opacity-[0.15]">
        {gridCells}
      </div>
    </div>
  );
});

export default function About() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver()
  const milestones = useMilestones();

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen bg-[#030303] py-20 overflow-hidden">
        {/* Optimized Cyberpunk Grid Background */}
        <CyberpunkGrid />
        
        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <m.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHeaderVisible ? 1 : 0, y: isHeaderVisible ? 0 : 20 }}
            className="text-center mb-20"
          >
            <div className="inline-block">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 text-[#00ff9d]/80 mb-4"
              >
                <Terminal className="w-5 h-5" />
                <span className="font-mono text-sm">~/portfolio » career.view()</span>
              </m.div>
              
              <m.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl font-bold"
              >
                <span className="
                  bg-clip-text text-transparent
                  bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]
                ">
                  Career Journey
                </span>
              </m.h2>
            </div>
          </m.div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.year}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}

TechBadge.displayName = "TechBadge";
MilestoneCard.displayName = "MilestoneCard";
CyberpunkGrid.displayName = "CyberpunkGrid";
