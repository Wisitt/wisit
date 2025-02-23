"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Clock, User } from "lucide-react"

interface CyberScrollbarProps {
  children: React.ReactNode
  showInfo?: boolean
  className?: string
}

export default function CyberScrollbar({ 
  children, 
  showInfo = true,
  className = "" 
}: CyberScrollbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().slice(0, 19).replace('T', ' '))
    }
    
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      const scrolled = target.scrollTop
      const maxScroll = target.scrollHeight - target.clientHeight
      const progress = (scrolled / maxScroll) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    document.addEventListener("scroll", handleScroll, true)

    return () => {
      clearInterval(timeInterval)
      document.removeEventListener("scroll", handleScroll, true)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      {/* Info Bar */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#00ff9d]/10 px-4 py-2 relative"
        >
          <div className="container mx-auto flex justify-between items-center font-mono text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#00ff9d]">
                <Terminal className="w-4 h-4" />
                <span>system.status: ONLINE</span>
              </div>
              <div className="flex items-center gap-2 text-[#00ffff]">
                <User className="w-4 h-4" />
                <span>user: {process.env.NEXT_PUBLIC_USERNAME || 'Wisitt'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#00ff9d]">
              <Clock className="w-4 h-4" />
              <span>{currentTime} UTC</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Custom Scrollbar */}
      <div className={`cyberpunk-scrollbar relative ${className}`}>
        {children}

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-20 h-1 bg-[#0a0a0a] rounded-full border border-[#00ff9d]/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00ff9d] to-[#00ffff]"
              style={{ width: `${scrollProgress}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <span className="text-[#00ff9d] font-mono text-xs">
            {Math.round(scrollProgress)}% viewed
          </span>
        </motion.div>

        {/* Scroll Guide */}
        <motion.div
          className="fixed left-4 bottom-4 font-mono text-xs text-[#00ff9d]/60 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ⌄
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}