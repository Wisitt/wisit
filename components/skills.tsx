"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Clock, Shield, Database, Cpu, Code2 } from "lucide-react"
import { IconType } from "react-icons"
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaFigma } from "react-icons/fa"
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiJavascript,
  SiPostgresql,
  SiPrisma,
  SiGraphql,
  SiMongodb,
  SiRedux
} from "react-icons/si"

// Types
interface Skill {
  name: string
  icon: IconType
  color: string
  proficiency: number
  experience: string
  type: "primary" | "secondary"
}

interface SkillCategory {
  category: string
  command: string
  icon: typeof Cpu | typeof Code2
  description: string
  items: Skill[]
}

// Custom hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.1, ...options })

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options])

  return [elementRef, isVisible] as const
}


// Custom hook for updating current time
const useCurrentTime = (initialTime: string) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toISOString().slice(0, 19).replace('T', ' ')
      setTime(formatted)
    }

    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

const SkillCategory = ({ category, categoryIndex }: { category: SkillCategory; categoryIndex: number }) => {
  const [categoryRef, isCategoryVisible] = useIntersectionObserver()

  return (
    <div
      ref={categoryRef}
      className={`
        space-y-8 transition-all duration-500
        ${isCategoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
      style={{ transitionDelay: `${categoryIndex * 200}ms` }}
    >
      <div className="text-center space-y-4">
        <div className="inline-block">
          <span className="text-[#00ff9d]/60 font-mono text-sm px-3 py-1 rounded-full border border-[#00ff9d]/20">
            $ {category.command}
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <category.icon className="w-6 h-6 text-[#00ffff]" />
          <h3 className="text-2xl font-semibold text-[#00ffff] font-mono">
            {category.category}
          </h3>
        </div>
        
        <p className="text-[#00ff9d]/60 font-mono text-sm">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {category.items.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  )
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [ref, isVisible] = useIntersectionObserver()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-500 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card 
        className={`
          relative group transition-all duration-300 
          backdrop-blur-sm bg-black/50 border-[#00ff9d]/10
          hover:border-[#00ff9d]/50
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Icon Container */}
            <div className={`
              relative transition-transform duration-300
              ${isHovered ? 'scale-110' : ''}
            `}>
              <skill.icon 
                className={`
                  w-8 h-8 md:w-10 md:h-10 relative z-10
                  transition-transform duration-300
                  ${isHovered ? 'animate-spin-slow' : ''}
                `}
                style={{ color: skill.color }} 
              />
              <div
                className={`
                  absolute inset-0 rounded-full blur-xl -z-10
                  transition-all duration-300
                  ${isHovered ? 'animate-pulse' : ''}
                `}
                style={{ 
                  backgroundColor: skill.color,
                  opacity: isHovered ? 0.4 : 0.2 
                }}
              />
            </div>

            {/* Skill Info */}
            <div className="text-center space-y-1">
              <span className="text-sm font-mono text-[#00ffff]">
                {skill.name}
              </span>
              
              {/* Proficiency Bar */}
              <div className="h-1 w-full bg-[#00ff9d]/10 rounded-full overflow-hidden">
                <div
                  className={`
                    h-full bg-gradient-to-r from-[#00ff9d] to-[#00ffff]
                    transition-all duration-1000 ease-out
                  `}
                  style={{ 
                    width: isVisible ? `${skill.proficiency}%` : '0%'
                  }}
                />
              </div>

              <span className="text-xs text-[#00ff9d]/60 font-mono">
                {skill.experience}
              </span>
            </div>
          </div>

          {/* Hover Info */}
          <div
            className={`
              absolute inset-0 bg-black/90 flex items-center justify-center p-4
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            <div className="text-center space-y-2">
              <span className="text-[#00ffff] font-mono text-sm">
                Proficiency: {skill.proficiency}%
              </span>
              <div className="text-xs text-[#00ff9d]/60 font-mono">
                Type: {skill.type}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface Skill {
  name: string
  icon: IconType
  color: string
  proficiency: number
  experience: string
  type: "primary" | "secondary"
}

interface SkillCategory {
  category: string
  command: string
  icon: typeof Cpu | typeof Code2
  description: string
  items: Skill[]
}

const skills: SkillCategory[] = [
  {
    category: "Frontend Systems",
    command: "scan_frontend_matrix",
    icon: Code2,
    description: "Advanced UI/UX technologies and frameworks",
    items: [
      { name: "React", icon: FaReact, color: "#00ff9d", proficiency: 95, experience: "4 years", type: "primary" },
      { name: "Next.js", icon: SiNextdotjs, color: "#00ffff", proficiency: 90, experience: "3 years", type: "primary" },
      { name: "TypeScript", icon: SiTypescript, color: "#00ff9d", proficiency: 92, experience: "3 years", type: "primary" },
      { name: "JavaScript", icon: SiJavascript, color: "#00ffff", proficiency: 95, experience: "4 years", type: "primary" },
      { name: "Redux", icon: SiRedux, color: "#00ff9d", proficiency: 88, experience: "3 years", type: "secondary" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#00ffff", proficiency: 94, experience: "2 years", type: "primary" },
      { name: "Framer", icon: SiFramer, color: "#00ff9d", proficiency: 85, experience: "2 years", type: "secondary" },
      { name: "Figma", icon: FaFigma, color: "#00ffff", proficiency: 88, experience: "2 years", type: "secondary" },
    ]
  },
  {
    category: "Backend Matrix",
    command: "analyze_backend_core",
    icon: Cpu,
    description: "Server-side technologies and database systems",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#00ff9d", proficiency: 92, experience: "4 years", type: "primary" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#00ffff", proficiency: 88, experience: "3 years", type: "primary" },
      { name: "Prisma", icon: SiPrisma, color: "#00ff9d", proficiency: 90, experience: "2 years", type: "primary" },
      { name: "GraphQL", icon: SiGraphql, color: "#00ffff", proficiency: 85, experience: "2 years", type: "secondary" },
      { name: "MongoDB", icon: SiMongodb, color: "#00ff9d", proficiency: 87, experience: "3 years", type: "primary" },
      { name: "Docker", icon: FaDocker, color: "#00ffff", proficiency: 86, experience: "2 years", type: "secondary" },
      { name: "Git", icon: FaGitAlt, color: "#00ff9d", proficiency: 93, experience: "4 years", type: "primary" }
    ]
  }
]

export default function Skills() {
  const currentTime = useCurrentTime("2025-02-22 00:59:31")
  const [headerRef, isHeaderVisible] = useIntersectionObserver()
  const [gridRef, isGridVisible] = useIntersectionObserver()

  return (
    <section className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      {/* Cyberpunk Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.15]">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`
                border-[0.5px] border-[#00ff9d]/20
                transition-opacity duration-300
                ${isGridVisible ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ transitionDelay: `${i * 5}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div 
        className={`
          fixed top-0 left-0 right-0 z-50 
          bg-black/80 backdrop-blur-sm border-b border-[#00ff9d]/10
          transition-transform duration-500
          ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center font-mono text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-[#00ff9d]" />
                <span className="text-[#00ff9d]">system.status: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-[#00ffff]" />
                <span className="text-[#00ffff]">user: {process.env.NEXT_PUBLIC_USERNAME || 'Wisitt'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-[#00ff9d]" />
              <span className="text-[#00ff9d]">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div ref={headerRef} className="space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div
              className={`
                inline-block transition-all duration-500
                ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
            >
              {/* Command Line Interface */}
              <div className="px-4 py-2 bg-black/50 border border-[#00ff9d]/20 rounded-lg font-mono text-sm mb-4">
                <span className="text-[#00ff9d]">$</span>{" "}
                <span className="text-[#00ffff]">initialize</span>{" "}
                <span className="text-[#00ff9d]">skill_matrix</span>{" "}
                <span className="text-[#00ffff]">--scan-depth=100</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-mono">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                  Tech.Matrix.analyze()
                </span>
              </h2>

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-[#00ff9d]/60 font-mono text-sm">
                  <Database className="w-4 h-4" />
                  <span>Skills: {skills.reduce((acc, cat) => acc + cat.items.length, 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-[#00ffff]/60 font-mono text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Matrix: Stable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Categories */}
          {skills.map((category, index) => (
            <SkillCategory 
              key={category.category} 
              category={category} 
              categoryIndex={index} 
            />
          ))}

          {/* Terminal Footer */}
          <div
            className={`
              text-center font-mono space-y-2 transition-all duration-500
              ${isHeaderVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="text-[#00ff9d]/60">
              <p>Analysis completed successfully</p>
              <p className="text-xs">Matrix stability: 100%</p>
            </div>
            <div className="text-[#00ffff]/40 text-xs">
              @{process.env.NEXT_PUBLIC_USERNAME || 'Wisitt'} ~ {currentTime}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}