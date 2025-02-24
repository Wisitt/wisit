/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Terminal,Cpu,ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

// Types
interface Milestone {
  year: string
  title: string
  description: string
  icon: any
  tech: string[]
  achievement: string
  codeSnippet: string
}

const useIntersectionObserver = (options = {}) => {
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

const milestones = [
  { 
    year: "2025",
    title: "AI Integration Specialist",
    description: "Leading AI-driven development and implementation of cutting-edge solutions",
    icon: Cpu,
    tech: ["TensorFlow", "PyTorch", "OpenAI API"],
    achievement: "Successfully deployed 5 major AI-powered features",
    codeSnippet: "async function enhanceAI() {"
  },
  // ... other milestones
]

const MilestoneCard = ({ milestone, index }: { 
  milestone: Milestone
  index: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="
        shadow-[0_0_50px_rgba(0,255,157,0.15)]
        group relative overflow-hidden
        bg-gradient-to-br from-black/80 to-black/40
        backdrop-blur-xl border-0
        hover:shadow-[0_0_50px_rgba(0,255,157,0.15)]
        transition-all duration-500
      ">
        {/* Animated background gradient */}
        <div className="
          absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 via-transparent to-[#00ffff]/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-700
        " />
        
        {/* Glass overlay */}
        <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-[#00ff9d]/20 to-[#00ffff]/20"
              >
                <milestone.icon className="w-8 h-8 text-[#00ff9d]" />
              </motion.div>
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  className="overflow-hidden"
                >
                  <span className="text-[#00ff9d] font-mono text-sm tracking-wider">
                    {milestone.year}
                  </span>
                </motion.div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
                  {milestone.title}
                </h3>
              </div>
            </div>
            
            <motion.button
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
            </motion.button>
          </div>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pb-4">
              <p className="text-gray-300 leading-relaxed">
                {milestone.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {milestone.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
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
                  </motion.span>
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
                <code className="text-[#00ffff]">{milestone.codeSnippet}</code>
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
                  animate-pulse
                " />
                <p className="relative text-[#00ff9d] italic">
                  {milestone.achievement}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function About() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver()

  return (
    <section className="relative min-h-screen bg-[#030303] py-20 overflow-hidden">
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
      
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}

              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHeaderVisible ? 1 : 0, y: isHeaderVisible ? 0 : 20 }}
          className="text-center mb-20"
        >
          <div className="inline-block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-[#00ff9d]/80 mb-4"
            >
              <Terminal className="w-5 h-5" />
              <span className="font-mono text-sm">~/portfolio » career.view()</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold"
            >
              <span className="
                bg-clip-text text-transparent
                bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]
                animate-gradient
              ">
                Career Journey
              </span>
            </motion.h2>
          </div>
        </motion.div>

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
  )
}