"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="relative group hover:border-[#00ff9d]/50 transition-all duration-300 backdrop-blur-sm bg-black/50 border-[#00ff9d]/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-3"
            whileHover={{ y: -2 }}
          >
            {/* Icon Container */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              animate={isHovered ? { rotate: 360 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <skill.icon 
                className="w-8 h-8 md:w-10 md:h-10 relative z-10" 
                style={{ color: skill.color }} 
              />
              <motion.div
                className="absolute inset-0 rounded-full blur-xl -z-10"
                animate={{
                  backgroundColor: skill.color,
                  scale: isHovered ? [1, 1.5, 1] : 1,
                  opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Skill Info */}
            <div className="text-center space-y-1">
              <span className="text-sm font-mono text-[#00ffff]">
                {skill.name}
              </span>
              
              {/* Proficiency Bar */}
              <motion.div 
                className="h-1 w-full bg-[#00ff9d]/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00ffff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </motion.div>

              {/* Experience */}
              <span className="text-xs text-[#00ff9d]/60 font-mono">
                {skill.experience}
              </span>
            </div>
          </motion.div>

          {/* Hover Info */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center space-y-2">
                <span className="text-[#00ffff] font-mono text-sm">
                  Proficiency: {skill.proficiency}%
                </span>
                <div className="text-xs text-[#00ff9d]/60 font-mono">
                  Type: {skill.type}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState("2025-02-21 18:21:54")
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toISOString().replace('T', ' ').substr(0, 19))
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.15]">
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={i}
              className="border-[0.5px] border-[#00ff9d]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.005 }}
            />
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#00ff9d]/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
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
                <span className="text-[#00ffff]">user: Wisitt</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-[#00ff9d]" />
              <span className="text-[#00ff9d]">{currentTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div style={{ opacity }} className="space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
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
            </motion.div>
          </div>

          {/* Skills Categories */}
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="space-y-8"
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
            </motion.div>
          ))}

          {/* Terminal Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center font-mono space-y-2"
          >
            <div className="text-[#00ff9d]/60">
              <p>Analysis completed successfully</p>
              <p className="text-xs">Matrix stability: 100%</p>
            </div>
            <div className="text-[#00ffff]/40 text-xs">
              @{process.env.NEXT_PUBLIC_USERNAME || 'Wisitt'} ~ {currentTime}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}