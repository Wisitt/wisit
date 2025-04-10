/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import emailjs from 'emailjs-com';
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  Terminal, 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook,
  Clock,
  User,
  Mail,
  MessageSquare,
  ChevronRight,
  Shield,
  Lock,
  Signal,
  Zap,
  Download,
  CheckCircle2,
  AlertCircle,
  Check
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SocialLink {
  icon: any
  href: string
  label: string
  color: string
  description: string
}

const socialLinks: SocialLink[] = [
  { 
    icon: Github, 
    href: "https://github.com/Wisitt", 
    label: "GitHub",
    color: "#00ff9d",
    description: "View source protocols"
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/wisit-m/", 
    label: "LinkedIn",
    color: "#00ffff",
    description: "Professional network"
  },
  // { 
  //   icon: Twitter, 
  //   href: "https://twitter.com/Wisitt", 
  //   label: "Twitter",
  //   color: "#00ff9d",
  //   description: "Real-time updates"
  // },
  // { 
  //   icon: Facebook, 
  //   href: "https://facebook.com/Wisitt", 
  //   label: "Facebook",
  //   color: "#00ffff",
  //   description: "Social interface"
  // },
]

function FormField({ 
  id, 
  label, 
  icon: Icon, 
  type = "text", 
  value, 
  onChange, 
  placeholder,
  animate = true
}: {
  id: string
  label: string
  icon: any
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  animate?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const fieldRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.5, // 50% ขององค์ประกอบต้องเข้าในมุมมองเพื่อให้ trigger
      }
    )

    const currentFieldRef = fieldRef.current;
    if (currentFieldRef) {
      observer.observe(currentFieldRef);
    }

    return () => {
      if (currentFieldRef) {
        observer.unobserve(currentFieldRef);
      }
    }
  }, [])
  return (
    <motion.div
      ref={fieldRef}
      className="space-y-2 relative"
    >
      <label 
        htmlFor={id} 
        className="text-[#00ff9d] font-mono flex items-center gap-2"
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className="w-full bg-black/30 border-2 border-[#00ff9d]/30 p-3 text-[#00ffff] font-mono focus:border-[#00ff9d] outline-none transition-all duration-300 resize-none rounded-lg"
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-black/30 border-2 border-[#00ff9d]/30 p-3 text-[#00ffff] font-mono focus:border-[#00ff9d] outline-none transition-all duration-300 rounded-lg"
          placeholder={placeholder}
          required
        />
      )}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-[#00ff9d]/5 blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SecurityIndicator() {
  return (
    <motion.div 
      className="absolute -top-3 left-4 px-3 py-1 bg-black/80 border border-[#00ff9d]/30 rounded-full font-mono text-xs flex items-center gap-2"
    >
      <Lock className="w-3 h-3 text-[#00ff9d]" />
      <span className="text-[#00ff9d]">QUANTUM ENCRYPTED</span>
    </motion.div>
  )
}

function ConnectionStatus() {
  const [connectionStrength, setConnectionStrength] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStrength(prev => (prev + 1) % 5)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-[#00ff9d]/60">
      <Signal className="w-4 h-4" />
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-full transition-colors duration-300 ${
              i <= connectionStrength ? "bg-[#00ff9d]" : "bg-[#00ff9d]/20"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Custom toast component to match the theme
function CyberToast({ 
  title, 
  message, 
  type = "success" 
}: { 
  title: string; 
  message: string; 
  type?: "success" | "error"; 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-24 right-4 z-50 w-80 max-w-[90vw] font-mono backdrop-blur-md rounded-lg overflow-hidden
        ${type === "success" ? "bg-black/80 border-2 border-[#00ff9d]/50" : "bg-black/80 border-2 border-[#ff0055]/50"}`}
    >
      <div className={`px-1 py-0.5 ${type === "success" ? "bg-[#00ff9d]/20" : "bg-[#ff0055]/20"} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {type === "success" ? (
            <Check className="w-3 h-3 text-[#00ff9d]" />
          ) : (
            <AlertCircle className="w-3 h-3 text-[#ff0055]" />
          )}
          <span className={`text-xs ${type === "success" ? "text-[#00ff9d]" : "text-[#ff0055]"}`}>
            {title}
          </span>
        </div>
        <span className={`text-xs ${type === "success" ? "text-[#00ff9d]/60" : "text-[#ff0055]/60"}`}>
          {new Date().toISOString().substring(11, 19)}
        </span>
      </div>
      
      <div className="p-3">
        <p className={`text-sm mb-2 ${type === "success" ? "text-[#00ffff]" : "text-[#ff9999]"}`}>
          {message}
        </p>
        
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <Shield className={`w-3 h-3 ${type === "success" ? "text-[#00ff9d]/60" : "text-[#ff0055]/60"}`} />
            <span className={type === "success" ? "text-[#00ff9d]/60" : "text-[#ff0055]/60"}>
              STATUS: {type === "success" ? "CONFIRMED" : "FAILED"}
            </span>
          </div>
          
          <motion.div 
            animate={{ 
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`h-1.5 w-1.5 rounded-full ${type === "success" ? "bg-[#00ff9d]" : "bg-[#ff0055]"}`} 
          />
        </div>
      </div>
      
      <motion.div 
        className="h-1 w-full bg-black/50"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3 }}
      >
        <motion.div 
          className={`h-full ${type === "success" ? "bg-[#00ff9d]" : "bg-[#ff0055]"}`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("2025-03-19 16:01:23")
  const [currentUser] = useState("Wisitt")
  const [showCustomToast, setShowCustomToast] = useState(false)
  const [toastData, setToastData] = useState({
    title: "",
    message: "",
    type: "success" as "success" | "error"
  })
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(formRef, { once: false })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format in Thai timezone (UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      
      // Format using Intl API to get Thai timezone
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      
      // Build the formatted date string in YYYY-MM-DD HH:MM:SS format
      const formattedDate = {
        year: '', month: '', day: '', 
        hour: '', minute: '', second: ''
      };
      
      parts.forEach(part => {
        if (part.type === 'year' || part.type === 'month' || part.type === 'day' || 
            part.type === 'hour' || part.type === 'minute' || part.type === 'second') {
          formattedDate[part.type] = part.value;
        }
      });
      
      // Create the Thai time in the required format
      const thaiTimeString = 
        `${formattedDate.year}-${formattedDate.month}-${formattedDate.day} ` +
        `${formattedDate.hour}:${formattedDate.minute}:${formattedDate.second}`;
      
      setCurrentTime(thaiTimeString);
    }
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitProgress(0);
  
    const progressInterval = setInterval(() => {
      setSubmitProgress(prev => Math.min(prev + 10, 100));
    }, 200);
  
    try {
      // Use EmailJS to send the email
      const response = await emailjs.send(
        'service_fj0x6s6', // Replace with your EmailJS service ID
        'template_rpd1olo', // Replace with your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'XfMuvnU5hwjG4UnrT' // Replace with your EmailJS user ID
      );
  
      if (response.status === 200) {
        // Display custom themed toast
        setToastData({
          title: "[ TRANSMISSION SUCCESSFUL ]",
          message: "Quantum encryption secured. Message delivered to neural network. Awaiting response...",
          type: "success"
        });
        setShowCustomToast(true);
        setTimeout(() => setShowCustomToast(false), 4000);
        
        // Still use the built-in toast for accessibility
        toast({
          title: "[ SUCCESS ] Message transmitted",
          description: "Quantum encryption secured. Awaiting response...",
        });
      } else {
        throw new Error('Failed to send email');
      }
  
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Display custom themed toast for error
      setToastData({
        title: "[ TRANSMISSION ERROR ]",
        message: "Neural network connection interrupted. Security protocols engaged. Retry sequence initiated.",
        type: "error"
      });
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 4000);
      
      // Still use the built-in toast for accessibility
      toast({
        title: "[ ERROR ] Transmission failed",
        description: "Neural network connection interrupted. Retry sequence initiated.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setSubmitProgress(100);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitProgress(0);
      }, 500);
    }
  };

  return (
    <section className="py-10 md:py-20 relative overflow-hidden bg-[#0a0a0a]" id="contact">
      {/* Animated Grid Background */}
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
      >
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="flex justify-between items-center font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-[#00ff9d]" />
                <span className="text-[#00ff9d]">system.status: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-[#00ffff]" />
                <span className="text-[#00ffff]">user: {currentUser}</span>
              </div>
              <ConnectionStatus  />
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Clock className="w-3 h-3 text-[#00ff9d]" />
              <span className="text-[#00ff9d]">{currentTime} UTC</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {showCustomToast && (
          <CyberToast 
            title={toastData.title} 
            message={toastData.message} 
            type={toastData.type} 
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          className="max-w-4xl mx-auto"
        >
          {/* Terminal Header */}
          <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="inline-block">
              <div className="px-4 py-2 bg-black/50 border border-[#00ff9d]/20 rounded-lg font-mono text-sm mb-2 md:mb-4">
                <span className="text-[#00ff9d]">$</span>{" "}
                <span className="text-[#00ffff]">initialize</span>{" "}
                <span className="text-[#00ff9d]">quantum_transmission</span>{" "}
                <span className="text-[#00ffff]">--secure</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold font-mono">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
                  Connect.establish();
                </span>
              </h2>
              
              <motion.div 
                className="flex items-center justify-center gap-4 mt-2 md:mt-4"
              >
                <div className="px-3 py-1 bg-[#00ff9d]/10 rounded-full border border-[#00ff9d]/20">
                  <div className="flex items-center gap-2 text-[#00ff9d] font-mono text-sm">
                    <Shield className="w-4 h-4" />
                    <span>SECURE CHANNEL ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative space-y-6 md:space-y-8 bg-black/50 backdrop-blur-sm border border-[#00ff9d]/10 p-4 md:p-8 rounded-lg z-10"
          >
            <SecurityIndicator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <FormField
                id="name"
                label="Full Name"
                icon={User}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <FormField
                id="email"
                label="Email Address"
                icon={Mail}
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </div>

            <FormField
              id="message"
              label="Your Message"
              icon={MessageSquare}
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can I assist you?"
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full bg-[#00ff9d]/10 border border-[#00ff9d]/50 text-[#00ff9d] font-mono py-3 rounded-lg hover:bg-[#00ff9d]/20 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,255,157,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-[#00ff9d]/20"
                  initial={{ width: "0%" }}
                  animate={{ width: `${submitProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="relative flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Download className="w-5 h-5 animate-pulse" />
                    <span>Sending... {submitProgress}%</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>

            {/* Form Status */}
            <div className="pt-4 border-t border-[#00ff9d]/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-xs gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#00ff9d]/60">
                    <Shield className="w-3 h-3" />
                    <span>ENCRYPTION: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00ffff]/60">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>CHANNEL: SECURE</span>
                  </div>
                </div>
                <span className="text-[#00ff9d]/40">
                  {`[${currentTime}]`}
                </span>
              </div>
            </div>
          </motion.form>

          {/* Social Links */}
          <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
            <div className="text-center">
              <motion.div
                className="inline-block px-4 py-2 bg-black/50 border border-[#00ff9d]/20 rounded-lg font-mono text-sm"
              >
                <span className="text-[#00ff9d]">$</span>{" "}
                <span className="text-[#00ffff]">load</span>{" "}
                <span className="text-[#00ff9d]">network_protocols</span>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-black/30 backdrop-blur-sm border border-[#00ff9d]/10 rounded-lg hover:border-[#00ff9d]/30 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <social.icon 
                        className="w-8 h-8" 
                        style={{ color: social.color }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full blur-xl z-10"
                        animate={{
                          backgroundColor: social.color,
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>
                    <div className="space-y-1 text-center">
                      <h3 className="text-[#00ffff] font-mono text-sm">
                        {social.label}
                      </h3>
                      <p className="text-[#00ff9d]/60 font-mono text-xs">
                        {social.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${social.color}10 0%, transparent 70%)`
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Terminal Footer */}
          <motion.div
            className="mt-8 md:mt-12 text-center font-mono space-y-2"
          >
            <div className="text-[#00ff9d]/60 space-y-1">
              <p>// Connection status: optimal</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs">
                <span>Encryption: enabled</span>
                <span>Protocol: quantum_secure_v2.5</span>
              </div>
            </div>
            <div className="text-[#00ffff]/40 text-xs">
              <span className="mr-2">@{currentUser}</span>
              <span>{currentTime} UTC</span>
            </div>
          </motion.div>
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
    </section>
  )
}