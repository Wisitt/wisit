"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Terminal, Clock, Shield } from "lucide-react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [currentTime, setCurrentTime] = useState("2025-02-21 18:04:30")
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().slice(0, 19).replace('T', ' '))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
      setIsVisible(true)
    }

    const mouseLeave = () => setIsVisible(false)
    const mouseEnter = () => setIsVisible(true)
    const mouseDown = () => setIsClicking(true)
    const mouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseleave", mouseLeave)
    window.addEventListener("mouseenter", mouseEnter)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    return () => {
      clearInterval(interval)
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseleave", mouseLeave)
      window.removeEventListener("mouseenter", mouseEnter)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
    }
  }, [])

  useEffect(() => {
    const handleElementStates = () => {
      const elements = document.querySelectorAll(
        'a, button, [role="button"], input[type="submit"], .interactive-element'
      )

      const mouseEnter = () => {
        setCursorVariant("interactive")
        controls.start("interactive")
      }
      
      const mouseLeave = () => {
        setCursorVariant("default")
        controls.start("default")
      }

      elements.forEach((element) => {
        element.addEventListener("mouseenter", mouseEnter)
        element.addEventListener("mouseleave", mouseLeave)
      })

      return () => {
        elements.forEach((element) => {
          element.removeEventListener("mouseenter", mouseEnter)
          element.removeEventListener("mouseleave", mouseLeave)
        })
      }
    }

    return handleElementStates()
  }, [controls])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: isClicking ? 0.8 : 1,
    },
    interactive: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: isClicking ? 1.2 : 1.5,
    },
  }

  const cursorInfoVariants = {
    default: {
      opacity: 0,
      x: mousePosition.x + 20,
      y: mousePosition.y + 20,
    },
    visible: {
      opacity: 1,
      x: mousePosition.x + 20,
      y: mousePosition.y + 20,
    },
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isClicking ? 0.8 : 1,
          }}
        >
          <div className="w-8 h-8 rounded-full bg-[#00ff9d]" />
          
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#00ff9d]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 200,
          mass: 0.8,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-[#00ffff] blur-md"
          animate={{
            opacity: isVisible ? 0.2 : 0,
            scale: isClicking ? 1.5 : 1,
          }}
        />
      </motion.div>

      {/* Cursor info panel */}
      <motion.div
        className="fixed pointer-events-none z-[997] bg-black/80 backdrop-blur-sm border border-[#00ff9d]/20 rounded px-3 py-2 min-w-[200px]"
        variants={cursorInfoVariants}
        animate={isVisible ? "visible" : "default"}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
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
      </motion.div>
    </>
  )
}