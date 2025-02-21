/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { GithubIcon, LinkedinIcon, TwitterIcon, Terminal, Code2, Braces } from "lucide-react"

const socials = [
  { 
    name: 'GitHub',
    icon: GithubIcon,
    url: 'https://github.com/Wisitt',
    color: '#333'
  },
  { 
    name: 'LinkedIn',
    icon: LinkedinIcon,
    url: 'https://linkedin.com/in/Wisitt',
    color: '#0077b5'
  },
  { 
    name: 'Twitter',
    icon: TwitterIcon,
    url: 'https://twitter.com/Wisitt',
    color: '#1DA1F2'
  }
]

const scrambleText = "!@#$%^&*()_+{}|:<>?~"

export default function Hero() {
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const [scrambledText, setScrambledText] = useState("Wisitt")
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
    
    // Text scramble effect
    let iteration = 0
    const maxIterations = 10
    const interval = setInterval(() => {
      if (iteration >= maxIterations) {
        clearInterval(interval)
        setScrambledText("Wisitt")
        return
      }
      
      setScrambledText(
        "Wisitt".split("")
          .map((letter, index) => {
            if (index < iteration) return "Wisitt"[index]
            return scrambleText[Math.floor(Math.random() * scrambleText.length)]
          })
          .join("")
      )
      iteration += 1/3
    }, 50)

    return () => clearInterval(interval)
  }, [controls])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.15]">
        {[...Array(200)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-primary/20" />
        ))}
      </div>

      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
        
        {/* Code rain effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/30 text-xs"
              initial={{
                x: Math.random() * 100 + "vw",
                y: -20,
              }}
              animate={{
                y: "100vh",
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(Math.floor(Math.random() * 20) + 10)].map((_, j) => (
                <div key={j}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
        style={{ y: textY }}
        animate={controls}
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Terminal-like header */}
          <motion.div
            className="relative mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-block">
              <motion.div
                className="flex items-center gap-2 text-primary/80 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Terminal className="w-4 h-4" />
                <span className="text-sm">~/portfolio » initializing_system</span>
              </motion.div>
              
              <motion.pre
                className="text-7xl md:text-9xl font-bold tracking-tighter"
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative inline-block">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                    {scrambledText}
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d] blur-2xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {scrambledText}
                  </motion.span>
                </span>
              </motion.pre>
            </div>
          </motion.div>

          {/* Role description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 text-primary/80 font-mono">
              <Code2 className="w-5 h-5" />
              <h2 className="text-2xl md:text-3xl">
                <span className="text-[#00ff9d]">function</span>{" "}
                <span className="text-[#00ffff]">createDigitalExperience</span>() {"{"}
              </h2>
            </div>
            <p className="text-lg text-primary/60 font-mono max-w-2xl mx-auto pl-8">
              return (
              <span className="text-[#00ff9d]">
                "Frontend Developer + Full stack Developer"
              </span>
              );
            </p>
            <div className="flex justify-center">
              <span className="text-primary/80 font-mono">{"}"}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 w-52 overflow-hidden rounded-md bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/50 font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Braces className="w-4 h-4" />
                <span>view_projects</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-[#00ff9d]/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative px-8 py-4 w-52 overflow-hidden rounded-md bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/50 font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>init_contact</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-[#00ffff]/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-8 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-[#00ff9d] transition-all duration-300"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6" />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
