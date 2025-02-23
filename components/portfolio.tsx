"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  links: {
    github: string
    live: string
  }
  status: string
  year: string
  metrics: {
    performance: number
    users: string
    uptime: string
  }
  details: {
    features: string[]
    impact: string
  }
}

const projects: Project[] = [
  {
    title: "Neural Network Dashboard",
    description: "AI-powered analytics platform with real-time data processing",
    image: "/test.jpg",
    technologies: ["React", "TensorFlow.js", "WebGL", "Node.js"],
    links: {
      github: "https://github.com/Wisitt/neural-dashboard",
      live: "https://neural-dashboard.demo"
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
        "Multi-layer network architecture"
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
      live: "https://quantum-shop.demo"
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
        "Quantum-inspired search algorithm"
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
      live: "https://cyber-chat.demo"
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
        "Multi-language support"
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
      live: "https://neural-hub.demo"
    },
    status: "ACTIVE",
    year: "2023",
    metrics: {
      performance: 94,
      users: "15k+",
      uptime: "99.7%"
    },
    details: {
      features: ["3D data visualization", "Predictive modeling", "Real-time analytics"],
      impact: "Improved decision accuracy by 35%"
    }
  }
]

import { LucideIcon } from "lucide-react"

function MetricItem({
  icon: Icon,
  value,
  label
}: {
  icon: LucideIcon
  value: string
  label: string
}) {
  return (
    <div className="text-center group">
      <div className="relative">
        {/* Slightly reduce animation complexity for faster rendering */}
        <Icon className="w-4 h-4 text-[#00ff9d] mx-auto mb-1 group-hover:scale-110 transition-transform" />
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

function ProjectCard({
  project,
  index
}: {
  project: Project
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      className="w-full md:w-1/2 lg:w-1/3 p-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="bg-black/50 backdrop-blur-sm border border-[#00ff9d]/10 p-6 rounded-lg relative overflow-hidden h-full flex flex-col"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 20px rgba(0,255,157,0.2)"
        }}
        transition={{ type: "spring", stiffness: 200 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div className="relative h-48 mb-4 rounded-lg overflow-hidden group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
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

        <div className="flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-[#00ff9d] font-mono">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono mt-1">
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
            <p className="text-[#00ffff]/80 font-mono text-sm mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-1 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20 hover:bg-[#00ff9d]/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-[#00ff9d]/10 pt-2">
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
          </div>
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-2 mt-3 border-t border-[#00ff9d]/10"
              >
                <div className="space-y-3">
                  <h4 className="text-[#00ffff] font-mono text-sm">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.details.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
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
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("")
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().slice(0, 19).replace("T", " "))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-[#0a0a0a] overflow-hidden relative">
      {/* Simplified background grid for faster rendering */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.08]">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="border-[0.5px] border-[#00ff9d]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.003 }}
            />
          ))}
        </div>
      </div>

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

      <div className="container mx-auto px-4 mt-12">
        <motion.div
          className="text-center space-y-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block">
            <div className="px-4 py-2 bg-black/50 border border-[#00ff9d]/20 rounded-lg font-mono text-sm mb-4">
              <span className="text-[#00ff9d]">$</span>{" "}
              <span className="text-[#00ffff]">load</span>{" "}
              <span className="text-[#00ff9d]">project_matrix</span>{" "}
              <span className="text-[#00ffff]">--showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                Projects.showcase();
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Responsive grid to replace horizontal scroll */}
        <div className="flex flex-wrap">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="flex items-center justify-center gap-2 mt-8 text-[#00ff9d]/60 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Code2 className="w-4 h-4" />
          <span className="text-sm">Hover over projects for more details</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>

        <motion.div
          className="mt-10 text-center font-mono space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-[#00ff9d]/60 space-y-1 text-xs">
            <div className="flex items-center justify-center gap-4">
              <span>Projects loaded: {projects.length}</span>
              <span>System integrity: 100%</span>
            </div>
          </div>
          <div className="text-[#00ffff]/40 text-xs">
            <span className="mr-2">@{process.env.NEXT_PUBLIC_USERNAME || "Wisitt"}</span>
            <span>{currentTime} UTC</span>
          </div>
        </motion.div>
      </div>

      {/* Reduced data stream effect for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff9d]/10 text-xs font-mono"
            initial={{ top: -20, left: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          >
            {[...Array(Math.floor(Math.random() * 15) + 5)].map((_, j) => (
              <div key={j}>{String.fromCharCode(0x30a0 + Math.random() * 96)}</div>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="fixed bottom-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm border border-[#00ff9d]/20 rounded-lg font-mono text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
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