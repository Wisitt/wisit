"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Terminal, Quote, Clock, Shield } from "lucide-react"

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Neural Systems Architect",
    content:
      "Wisitt's code optimization skills are exceptional. Implemented quantum-grade solutions that boosted our AI processing speed by 300%.",
    avatar: "/images/avatars/alice.jpg", // Replace with actual image
    rating: 98,
    project: "Neural Network Infrastructure",
    verified: true
  },
  {
    name: "Bob Smith",
    role: "Cyber Security Director",
    content:
      "A true master of digital architecture. Developed cutting-edge security protocols that revolutionized our system's defensive capabilities.",
    avatar: "/images/avatars/bob.jpg", // Replace with actual image
    rating: 95,
    project: "Quantum Encryption System",
    verified: true
  },
  {
    name: "Carol Williams",
    role: "AI Integration Lead",
    content:
      "Remarkable ability to merge human-centric design with advanced AI systems. Created intuitive interfaces for complex neural networks.",
    avatar: "/images/avatars/carol.jpg", // Replace with actual image
    rating: 97,
    project: "AI Interface Enhancement",
    verified: true
  },
]

export default function Testimonials() {
  const controls = useAnimation()
  const [currentTime, setCurrentTime] = useState("")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }

    // Update time
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().replace('T', ' ').substr(0, 19))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.15]">
        {[...Array(200)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-[#00ff9d]/20" />
        ))}
      </div>

      <div className="container mx-auto px-4">
        {/* Terminal-style header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block">
            <motion.div
              className="flex items-center justify-center gap-2 text-[#00ff9d]/80 mb-4 font-mono"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Terminal className="w-4 h-4" />
              <span className="text-sm">~/feedback » loading_testimonials</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold font-mono"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                Client.feedback();
              </span>
            </motion.h2>
            <motion.div 
              className="text-[#00ffff]/60 mt-4 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{currentTime} UTC</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-black/50 backdrop-blur-sm border border-[#00ff9d]/10 p-8 rounded-lg relative group hover:border-[#00ff9d]/30 transition-colors duration-300"
            >
              {/* Glowing corner accent */}
              <motion.div
                className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ff9d] rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px #00ff9d",
                    "0 0 40px #00ff9d",
                    "0 0 20px #00ff9d"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />

              {/* Rating */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  {testimonial.verified && (
                    <Shield className="w-4 h-4 text-[#00ff9d]" />
                  )}
                  <span className="text-[#00ffff] font-mono">
                    Rating: {testimonial.rating}%
                  </span>
                </div>
                <Quote className="w-6 h-6 text-[#00ff9d] opacity-50" />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-[#00ffff]/80 font-mono leading-relaxed">
                  {testimonial.content}
                </p>

                <div className="pt-6 border-t border-[#00ff9d]/10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-[#00ff9d]/20 flex items-center justify-center">
                        <span className="text-[#00ff9d] font-mono text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 0px #00ff9d20",
                            "0 0 20px #00ff9d20",
                            "0 0 0px #00ff9d20"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#00ff9d] font-mono">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[#00ffff]/60 font-mono">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-[#00ff9d]/40 font-mono mt-1">
                        Project: {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}