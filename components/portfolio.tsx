"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  Terminal, 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Code2,
  Clock,
  Shield,
  Activity,
  Users,
  Server,
  Zap
} from "lucide-react"

const projects = [
  {
    title: "Neural Network Dashboard",
    description: "AI-powered analytics platform with real-time data processing",
    image: "/test.jpg",
    technologies: ["React", "TensorFlow.js", "WebGL", "Node.js"],
    links: {
      github: "https://github.com/Wisitt/neural-dashboard",
      live: "https://neural-dashboard.demo",
    },
    status: "ONLINE",
    year: "2025",
    metrics: {
      performance: 98,
      users: "10k+",
      uptime: "99.9%"
    },
    details: {
      features: [
        "Real-time neural network visualization",
        "Advanced data processing algorithms",
        "Multi-layer network architecture",
      ],
      impact: "Reduced processing time by 60%"
    }
  },
  {
    title: "Quantum E-commerce",
    description: "Next-gen shopping experience with AI recommendations",
    image: "/test.jpg",
    technologies: ["Next.js", "GraphQL", "AWS", "Prisma"],
    links: {
      github: "https://github.com/Wisitt/quantum-shop",
      live: "https://quantum-shop.demo",
    },
    status: "STABLE",
    year: "2024",
    metrics: {
      performance: 95,
      users: "50k+",
      uptime: "99.8%"
    },
    details: {
      features: [
        "AI-powered product recommendations",
        "Real-time inventory management",
        "Quantum-inspired search algorithm",
      ],
      impact: "Increased sales conversion by 45%"
    }
  },
  {
    title: "CyberChat AI",
    description: "Advanced chatbot with natural language understanding",
    image: "/test.jpg",
    technologies: ["Python", "PyTorch", "FastAPI", "React"],
    links: {
      github: "https://github.com/Wisitt/cyber-chat",
      live: "https://cyber-chat.demo",
    },
    status: "LEARNING",
    year: "2024",
    metrics: {
      performance: 92,
      users: "25k+",
      uptime: "99.5%"
    },
    details: {
      features: [
        "Natural language processing",
        "Contextual understanding",
        "Multi-language support",
      ],
      impact: "Automated 70% of customer inquiries"
    }
  },
  {
    title: "Neural Analytics Hub",
    description: "Real-time data visualization and predictive analytics",
    image: "/test.jpg",
    technologies: ["D3.js", "WebAssembly", "Rust", "React"],
    links: {
      github: "https://github.com/Wisitt/neural-hub",
      live: "https://neural-hub.demo",
    },
    status: "ACTIVE",
    year: "2023",
    metrics: {
      performance: 94,
      users: "15k+",
      uptime: "99.7%"
    },
    details: {
      features: [
        "3D data visualization",
        "Predictive modeling",
        "Real-time analytics",
      ],
      impact: "Improved decision accuracy by 35%"
    }
  }
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 w-full md:w-2/3 lg:w-1/2 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <motion.div 
        className="bg-black/50 backdrop-blur-sm border border-[#00ff9d]/10 p-6 rounded-lg h-full relative overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 0 30px rgba(0,255,157,0.2)"
        }}
        transition={{ type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Project Image with Hover Effects */}
        <motion.div
          className="relative w-full h-64 mb-6 rounded-lg overflow-hidden group"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
          
          {/* Project Links */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/30 transition-colors border border-[#00ff9d]/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#00ffff]/20 text-[#00ffff] hover:bg-[#00ffff]/30 transition-colors border border-[#00ffff]/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Project Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-[#00ff9d] font-mono">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#00ffff]/60">{project.year}</span>
                <span className="px-2 py-1 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20">
                  {project.status}
                </span>
              </div>
            </div>
            <motion.button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 rounded-lg bg-[#00ff9d]/10 text-[#00ff9d] hover:bg-[#00ff9d]/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-5 h-5" />
            </motion.button>
          </div>

          <p className="text-[#00ffff]/80 font-mono text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20 hover:bg-[#00ff9d]/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics with Icons */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#00ff9d]/10">
            <MetricItem
              icon={Activity}
              value={`${project.metrics.performance}%`}
              label="Performance"
            />
            <MetricItem
              icon={Users}
              value={project.metrics.users}
              label="Active Users"
            />
            <MetricItem
              icon={Server}
              value={project.metrics.uptime}
              label="Uptime"
            />
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-4 border-t border-[#00ff9d]/10"
              >
                <div className="space-y-3">
                  <h4 className="text-[#00ffff] font-mono text-sm">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.details.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-xs text-[#00ff9d]/80 font-mono"
                      >
                        <Zap className="w-3 h-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="text-xs text-[#00ffff]/60 font-mono">
                    Impact: {project.details.impact}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#00ff9d]/10 transform rotate-45 translate-x-8 -translate-y-8" />
        </div>
      </motion.div>
    </motion.div>
  )
}

import { LucideIcon } from "lucide-react";

function MetricItem({ icon: Icon, value, label }: { icon: LucideIcon, value: string, label: string }) {
  return (
    <div className="text-center group">
      <div className="relative">
        <Icon className="w-4 h-4 text-[#00ff9d] mx-auto mb-1 group-hover:scale-110 transition-transform" />
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            backgroundColor: "#00ff9d",
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="text-[#00ffff] text-lg font-mono group-hover:text-[#00ffff] transition-colors">
        {value}
      </div>
      <div className="text-xs text-[#00ff9d]/60 font-mono group-hover:text-[#00ff9d] transition-colors">
        {label}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState("")
  const { scrollXProgress } = useScroll({ 
    container: containerRef,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-75%"])

  useEffect(() => {
    setCurrentTime("2025-02-21 18:36:09")
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().slice(0, 19).replace('T', ' '))
    }
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])
  
  if (!currentTime) return null


  return (
    <section className="py-20 bg-[#0a0a0a] overflow-hidden relative">
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
              <span className="text-[#00ff9d]">{currentTime} UTC</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block">
            <div className="px-4 py-2 bg-black/50 border border-[#00ff9d]/20 rounded-lg font-mono text-sm mb-4">
              <span className="text-[#00ff9d]">$</span>{" "}
              <span className="text-[#00ffff]">load</span>{" "}
              <span className="text-[#00ff9d]">project_matrix</span>{" "}
              <span className="text-[#00ffff]">--showcase</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold font-mono">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                Projects.showcase();
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Projects Slider */}
        <div 
          ref={containerRef} 
          className="flex overflow-x-scroll pb-10 cyberpunk-scrollbar"
        >
          <motion.div className="flex" style={{ x }}>
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex items-center justify-center gap-2 mt-8 text-[#00ff9d]/60 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Code2 className="w-4 h-4" />
          <span className="text-sm">Navigate matrix for more projects</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>

        {/* Terminal Footer */}
        <motion.div
          className="mt-12 text-center font-mono space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="text-[#00ff9d]/60 space-y-1">
            <p>{/* Matrix scan completed successfully */}</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span>Projects loaded: {projects.length}</span>
              <span>System integrity: 100%</span>
            </div>
          </div>
          <div className="text-[#00ffff]/40 text-xs">
            <span className="mr-2">@{process.env.NEXT_PUBLIC_USERNAME || 'Wisitt'}</span>
            <span>{currentTime} UTC</span>
          </div>
        </motion.div>
      </div>

      {/* Data Stream Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff9d]/10 text-xs font-mono"
            initial={{
              top: -20,
              left: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              top: "100%",
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
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

      {/* Fixed Project Count Indicator */}
      <motion.div
        className="fixed bottom-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm border border-[#00ff9d]/20 rounded-lg font-mono text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[#00ff9d]">
            <Code2 className="w-3 h-3" />
            <span>Projects:</span>
          </div>
          <span className="text-[#00ffff]">{projects.length}</span>
        </div>
      </motion.div>
    </section>
  )
}