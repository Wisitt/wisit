"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Code2, Cpu, Server, FileCode2 } from "lucide-react"

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
  { 
    year: "2024",
    title: "Senior Full Stack Developer",
    description: "Architecting scalable solutions and mentoring development teams",
    icon: Server,
    tech: ["Next.js", "TypeScript", "AWS"],
    achievement: "Led team of 8 developers across 3 major projects",
    codeSnippet: "class ArchitecturePattern {"
  },
  { 
    year: "2023",
    title: "Frontend Architecture Lead",
    description: "Established frontend best practices and performance optimization",
    icon: Code2,
    tech: ["React", "Redux", "GraphQL"],
    achievement: "Improved app performance by 40%",
    codeSnippet: "const optimizePerformance ="
  },
  { 
    year: "2022",
    title: "Full Stack Developer",
    description: "Mastered modern web development stack and best practices",
    icon: FileCode2,
    tech: ["Node.js", "Express", "MongoDB"],
    achievement: "Delivered 12 successful projects",
    codeSnippet: "function developSolution() {"
  }
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  return (
    <section 
      ref={containerRef} 
      className="py-20 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.15]">
        {/* Reduce excessive divs by utilizing CSS Grid instead */}
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          style={{ opacity, y, scale }} 
          className="space-y-16"
        >
          <div className="text-center space-y-6">
            <div className="inline-block">
              <motion.div
                className="flex items-center justify-center gap-2 text-[#00ff9d]/80 mb-4 font-mono"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Terminal className="w-4 h-4" />
                <span className="text-sm">~/career » loading_timeline</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold font-mono"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                  Career.timeline();
                </span>
              </motion.h2>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full"
              style={{
                width: '2px',
                background: 'linear-gradient(to bottom, #00ff9d, transparent)'
              }}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Timeline items */}
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center justify-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <Card className="w-full md:w-[calc(50%-2rem)] group hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] transition-all duration-500 bg-black/50 backdrop-blur-sm border-[#00ff9d]/10">
                    <CardContent className="p-8">
                      <motion.div 
                        className="space-y-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-start gap-6">
                          <div className="relative">
                            <div className="p-3 rounded-xl bg-[#00ff9d]/10 group-hover:bg-[#00ff9d]/20 transition-colors duration-300">
                              <milestone.icon className="w-8 h-8 text-[#00ff9d]" />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-3xl font-bold mb-2 font-mono text-[#00ff9d]">
                                {milestone.year}
                              </h3>
                              <h4 className="text-xl font-semibold text-[#00ffff]">
                                {milestone.title}
                              </h4>
                            </div>
                            
                            <p className="text-gray-400 leading-relaxed">
                              {milestone.description}
                            </p>
                            
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                {milestone.tech.map((tech) => (
                                  <span 
                                    key={tech}
                                    className="px-3 py-1 text-sm rounded-full bg-[#00ff9d]/10 text-[#00ff9d] font-mono"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="font-mono text-sm text-[#00ffff]/80">
                                <span className="text-[#00ff9d]"></span> {milestone.codeSnippet}
                              </div>
                              <p className="text-sm text-[#00ff9d]/80 italic">
                                {milestone.achievement}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>

                  {/* Timeline marker */}
                  <div className="relative">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-[#00ff9d] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div
                      className="w-10 h-10 rounded-full border-2 border-[#00ff9d]/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
