"use client"

import { useEffect, useState, useRef, memo, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { LazyMotion, m, domAnimation } from "framer-motion"
import { ChevronRight, Code, Terminal } from "lucide-react"

// Improved TypeScript interface with required ID for better keying
interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tech: string[];
  achievement: string;
  codeSnippet?: string;
}

// Custom hook with proper cleanup
function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    
    if (!currentElement) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: "0px", ...options }
    );
    
    observer.observe(currentElement);
    
    return () => {
      observer.unobserve(currentElement);
    };
  }, [options]);

  return [elementRef, isVisible] as const;
}

// Memoized TechBadge component
const TechBadge = memo(function TechBadge({ tech, index }: { tech: string, index: number }) {
  return (
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
  );
});

// Memoized MilestoneCard component with improved accessibility
const MilestoneCard = memo(function MilestoneCard({ 
  milestone, 
  index 
}: { 
  milestone: Milestone;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  
  const { year, title, description, icon: Icon, tech, achievement } = milestone;
  
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
        {/* Simplified background gradient */}
        <div className="
          absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 via-transparent to-[#00ffff]/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-700
        " 
          aria-hidden="true"
        />
        
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <m.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-[#00ff9d]/20 to-[#00ffff]/20"
                aria-hidden="true"
              >
                <Icon className="w-8 h-8 text-[#00ff9d]" />
              </m.div>
              <div>
                <div className="overflow-hidden">
                  <span className="text-[#00ff9d] font-mono text-sm tracking-wider">
                    {year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
                  {title}
                </h3>
              </div>
            </div>
            
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpanded}
              aria-expanded={isExpanded}
              aria-controls={`content-${milestone.id}`}
              className="p-2 rounded-full bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 transition-colors"
            >
              <ChevronRight 
                className={`w-5 h-5 text-[#00ff9d] transition-transform duration-300 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
              <span className="sr-only">
                {isExpanded ? "Collapse details" : "Expand details"}
              </span>
            </m.button>
          </div>

          <m.div
            id={`content-${milestone.id}`}
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pb-4">
              <p className="text-gray-300 leading-relaxed">
                {description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {tech.map((technology, i) => (
                  <TechBadge key={`${milestone.id}-tech-${i}`} tech={technology} index={i} />
                ))}
              </div>

              {/* Achievement */}
              <div className="
                relative overflow-hidden
                p-4 rounded-xl
                bg-gradient-to-r from-[#00ff9d]/5 to-[#00ffff]/5
                border border-[#00ff9d]/10
              ">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 to-[#00ffff]/5"
                  aria-hidden="true"
                />
                <p className="relative text-[#00ff9d] italic">
                  {achievement}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </Card>
    </m.div>
  );
});

// Optimized Grid Background
const CyberpunkGrid = memo(function CyberpunkGrid() {
  // Reduced number of grid cells for better performance
  const gridCells = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="border-[0.5px] border-[#00ff9d]/20"
        style={{
          opacity: Math.random() * 0.5,
          gridColumn: `span ${Math.floor(Math.random() * 2) + 1}`,
          gridRow: `span ${Math.floor(Math.random() * 2) + 1}`,
        }}
        aria-hidden="true"
      />
    )), 
  []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] grid-rows-[repeat(auto-fill,minmax(80px,1fr))] opacity-[0.15]"
        aria-hidden="true"
      >
        {gridCells}
      </div>
    </div>
  );
});

export default function About() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver();
  
  // Milestone data with added IDs
  const milestones = useMemo<Milestone[]>(() => [
    { 
      id: "uniga-contract",
      year: "Nov 2023 - Apr 2024",
      title: "Front-End Developer (Contract) - Uniga Infotech",
      description: "Worked on Health Benefit Consultant Systems with a strong focus on building reusable Angular components, performance optimization, and scalable front-end architecture.",
      icon: Code,
      tech: [
        "Angular", "NgRx", "TypeScript", "SCSS", 
        "REST API", "Cypress", "Component Design", "Git"
      ],
      achievement: "Delivered key modules and end-to-end features using Angular & NgRx while ensuring high-quality standards through Cypress testing.",
      codeSnippet: ""
    },
    {
      id: "uniga-intern",
      year: "Mar 2023 - Oct 2023",
      title: "Front-End Developer (Internship) - Uniga Infotech",
      description: "Assisted in front-end development for internal enterprise systems, contributed to component development, and performed integration testing in an Agile environment.",
      icon: Code,
      tech: [
        "Angular", "NgRx", "TypeScript", "SCSS", 
        "REST API", "Cypress", "Component Design", "Git"
      ],
      achievement: "Improved performance and reliability of key user flows by optimizing data fetching and modularizing code.",
      codeSnippet: ""
    }
  ], []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen bg-[#030303] py-20 overflow-hidden">
        {/* Background Grid */}
        <CyberpunkGrid />
        
        <div className="container mx-auto px-4 relative">
          {/* Header with Animation */}
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
              
              <m.h1
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
              </m.h1>
            </div>
          </m.div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.id}
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