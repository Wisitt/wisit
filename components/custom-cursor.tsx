"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue, useAnimate } from "framer-motion"
import { Terminal, Clock, Shield } from "lucide-react"

const CURSOR_SPRING_OPTIONS = {
  stiffness: 500,
  damping: 28,
  mass: 0.5,
}

const TRAIL_SPRING_OPTIONS = {
  stiffness: 300,
  damping: 40,
  mass: 0.8,
}

const PANEL_SPRING_OPTIONS = {
  stiffness: 200,
  damping: 20,
  mass: 1,
}

export default function CustomCursor() {
  // Motion values for smoother animations
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animations for cursor
  const cursorX = useSpring(mouseX, CURSOR_SPRING_OPTIONS)
  const cursorY = useSpring(mouseY, CURSOR_SPRING_OPTIONS)
  
  // Spring animations for trail
  const trailX = useSpring(mouseX, TRAIL_SPRING_OPTIONS)
  const trailY = useSpring(mouseY, TRAIL_SPRING_OPTIONS)
  
  // Spring animations for info panel
  const panelX = useSpring(mouseX, PANEL_SPRING_OPTIONS)
  const panelY = useSpring(mouseY, PANEL_SPRING_OPTIONS)

  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [,setCursorVariant] = useState("default")
  const [currentTime, setCurrentTime] = useState("2025-02-23 00:10:21")
  const [scope, animate] = useAnimate()

  // Optimized cursor update
  const updateCursor = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    // Keep panel within viewport bounds
    const maxX = window.innerWidth - 220 // 200px width + 20px offset
    const maxY = window.innerHeight - 120 // approximate height + offset
    
    mouseX.set(x)
    mouseY.set(y)
    panelX.set(Math.min(maxX, x + 20))
    panelY.set(Math.min(maxY, y + 20))
    
    if (!isVisible) setIsVisible(true)
  }, [mouseX, mouseY, panelX, panelY, isVisible])

  // Handle interactive elements
  const handleInteractive = useCallback((isEntering: boolean) => {
    setCursorVariant(isEntering ? "interactive" : "default")
    animate(scope.current, {
      scale: isEntering ? 1.5 : 1,
      transition: { duration: 0.2 }
    })
  }, [scope, animate])

  useEffect(() => {
    // Time update
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().slice(0, 19).replace('T', ' '))
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Mouse event listeners
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // Interactive elements
    const elements = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input[type="submit"], .interactive-element'
    )

    elements.forEach(element => {
      element.addEventListener("mouseenter", () => handleInteractive(true))
      element.addEventListener("mouseleave", () => handleInteractive(false))
    })

    return () => {
      clearInterval(timeInterval)
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      
      elements.forEach(element => {
        element.removeEventListener("mouseenter", () => handleInteractive(true))
        element.removeEventListener("mouseleave", () => handleInteractive(false))
      })
    }
  }, [updateCursor, handleInteractive])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={scope}
        className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isClicking ? 0.8 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-8 h-8 rounded-full bg-[#00ff9d]" />
          
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#00ff9d]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-[#00ffff] blur-md"
          animate={{
            scale: isClicking ? 1.5 : 1,
            opacity: isVisible ? 0.2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Info panel with improved animations */}
      <motion.div
        className="fixed pointer-events-none z-[997]"
        style={{
          x: panelX,
          y: panelY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="bg-black/80 backdrop-blur-sm border border-[#00ff9d]/20 rounded px-3 py-2 min-w-[200px]"
          initial={false}
          animate={{
            scale: isVisible ? 1 : 0.8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="font-mono text-xs space-y-1">
            <div className="flex items-center gap-2 text-[#00ff9d]">
              <Clock className="w-3 h-3" />
              <span>{currentTime}</span>
            </div>
            <div className="flex items-center gap-2 text-[#00ffff]">
              <Terminal className="w-3 h-3" />
              <span>user@Wisitt</span>
            </div>
            <div className="flex items-center gap-2 text-[#00ff9d]/60">
              <Shield className="w-3 h-3" />
              <span>system: active</span>
            </div>
          </div>

          {/* Decorative border glow */}
          <motion.div
            className="absolute -inset-[1px] rounded pointer-events-none"
            style={{
              background: "linear-gradient(45deg, #00ff9d20, #00ffff20)",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}