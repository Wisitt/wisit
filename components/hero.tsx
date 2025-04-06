"use client"

import { useEffect, useState, useRef, memo, useMemo } from "react"
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion"
import { GithubIcon, LinkedinIcon, TwitterIcon, Terminal, Code2, Braces } from "lucide-react";
// Import icons individually to reduce bundle size

// Performance detection context
const usePerformanceProfile = () => {
  const [profile, setProfile] = useState({
    isHighPerformance: true,
    prefersReducedMotion: false,
    devicePixelRatio: 1,
  });
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Detect performance capabilities
    const isHighPerformance = 
      (navigator.hardwareConcurrency || 0) >= 4 && 
      !prefersReducedMotion && 
      window.devicePixelRatio >= 1;
      
    setProfile({
      isHighPerformance,
      prefersReducedMotion,
      devicePixelRatio: window.devicePixelRatio || 1
    });
  }, []);
  
  return profile;
};

// Memoized social data to prevent re-renders
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
];

const scrambleText = "!@#$%^&*()_+{}|:<>?~";

// Enhanced matrix characters
const matrixChars = Array.from({ length: 96 }, (_, i) => String.fromCharCode(0x30A0 + i));

const GridBackground = memo(({ cellCount = 50, animate = false }: { cellCount?: number, animate?: boolean }) => {
  if (!animate) {
    return (
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] grid-rows-[repeat(auto-fill,minmax(80px,1fr))] opacity-[0.15]">
        {Array(cellCount).fill(0).map((_, i) => (
          <div key={i} className="border-[0.5px] border-primary/20" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] opacity-[0.15]">
      {Array(cellCount).fill(0).map((_, i) => (
        <m.div
          key={i}
          className="border-[0.5px] border-[#00ff9d]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.005 }}
        />
      ))}
    </div>
  );
});

// Enhanced matrix rain with more visual appeal
const EnhancedMatrixRain = memo(({ count = 15 }: { count?: number }) => {
  // Pre-compute the rain elements for better performance
  const rainElements = useMemo(() => 
    Array(count).fill(0).map((_, i) => {
      const charCount = 5 + Math.floor(Math.random() * 10);
      const xPos = Math.random() * 100;
      const duration = 5 + Math.random() * 10;
      const size = Math.random() < 0.3 ? 'text-sm' : 'text-xs';
      const opacity = 0.1 + Math.random() * 0.3;
      
      return (
        <m.div
          key={i}
          className={`absolute ${size} font-mono pointer-events-none`}
          style={{ 
            color: `rgba(0, 255, ${Math.random() < 0.5 ? '157' : '255'}, ${opacity})`,
            willChange: "transform"
          }}
          initial={{
            x: `${xPos}vw`,
            y: -100,
          }}
          animate={{
            y: "100vh",
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: Math.random() * 2,
          }}
        >
          {Array(charCount).fill(0).map((_, j) => (
            <m.div 
              key={j}
              animate={{
                opacity: j === 0 ? [0.7, 1, 0.7] : [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </m.div>
          ))}
        </m.div>
      );
    }), [count]);
    
  return <div className="absolute inset-0 overflow-hidden">{rainElements}</div>;
});

// Glitch effect for background elements
const GlitchElement = memo(({ delay = 0 }: { delay?: number }) => {
  const size = 10 + Math.random() * 40;
  const xPos = Math.random() * 100;
  const yPos = Math.random() * 100;
  
  return (
    <m.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${xPos}%`,
        top: `${yPos}%`,
        background: `radial-gradient(circle, rgba(0,255,${Math.random() < 0.5 ? '157' : '255'},0.3) 0%, transparent 70%)`,
        filter: 'blur(8px)',
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        delay: delay,
      }}
    />
  );
});

// Optimized scramble text effect
const ScrambleText = memo(() => {
  const [text, setText] = useState("Wisitt");
  
  useEffect(() => {
    let iteration = 0;
    const maxIterations = 10;
    let timeoutId: NodeJS.Timeout;
    
    const scramble = () => {
      if (iteration >= maxIterations) {
        setText("Wisitt");
        return;
      }
      
      setText(
        "Wisitt".split("").map((letter, index) => {
          if (index < iteration) return "Wisitt"[index];
          return scrambleText[Math.floor(Math.random() * scrambleText.length)];
        }).join("")
      );
      
      iteration += 1/3;
      timeoutId = setTimeout(scramble, 50);
    };
    
    scramble();
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <span className="relative inline-block">
      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d]">
        {text}
      </span>
      <span
        className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00ffff] to-[#00ff9d] blur-2xl opacity-30"
      >
        {text}
      </span>
    </span>
  );
});

// Animated background layer with pulses and patterns
const AnimatedBackgroundLayer = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Glowing elements in the background */}
      {Array(8).fill(0).map((_, i) => (
        <GlitchElement key={i} delay={i * 0.7} />
      ))}
      
      {/* Animated grid lines */}
      <m.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      
      {/* Pulsing center glow */}
      <m.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,157,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

// Social icon component
const SocialIcon = memo(({ social, index }: { social: typeof socials[0], index: number }) => 
 (
  <m.a
    key={social.name}
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary/60 hover:text-[#00ff9d] transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <social.icon className="w-6 h-6" />
    <span className="sr-only">{social.name}</span>
  </m.a>
));

// Main button component
const ActionButton = memo(({ 
  href, 
  color, 
  children, 
  icon: Icon, 
  delay 
}: { 
  href: string; 
  color: string; 
  children: React.ReactNode; 
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) => (
  <m.a
    href={href}
    className={`group relative px-8 py-4 w-52 overflow-hidden rounded-md bg-[${color}]/10 text-[${color}] border border-[${color}]/50 font-mono`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </span>
    <m.div 
      className={`absolute inset-0 bg-[${color}]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300`}
    />
    <AnimatePresence>
      <m.span
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <m.div 
          className="absolute inset-0" 
          style={{ background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)` }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </m.span>
    </AnimatePresence>
  </m.a>
));

// Animated Binary/Hex Code Strip
const CodeStrip = memo(({ position, delay }: { position: string, delay: number }) => {
  const chars = "01001010101010010101001010ABCDEF0123456789";
  const [text, setText] = useState(() => {
    return Array(20).fill(0).map(() => 
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => {
        const newText = prev.split('');
        const changeIndex = Math.floor(Math.random() * newText.length);
        newText[changeIndex] = chars.charAt(Math.floor(Math.random() * chars.length));
        return newText.join('');
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <m.div
      className="absolute text-[0.65rem] font-mono text-[#00ff9d]/30 whitespace-nowrap"
      style={{ [position]: '5%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text}
    </m.div>
  );
});

function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isHighPerformance, prefersReducedMotion } = usePerformanceProfile();
  
  // Only animate based on scroll for high-performance devices
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    if (prefersReducedMotion || !isHighPerformance) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHighPerformance, prefersReducedMotion]);
  
  // Calculate parallax effect manually instead of using useTransform
  const backgroundYValue = useMemo(() => {
    if (containerRef.current) {
      const scrollProgress = Math.min(scrollY / (containerRef.current.offsetHeight || 1), 1);
      return `${scrollProgress * 30}%`;
    }
    return "0%";
  }, [scrollY]);
  
  const textYValue = useMemo(() => {
    if (containerRef.current) {
      const scrollProgress = Math.min(scrollY / (containerRef.current.offsetHeight || 1), 1);
      return `${scrollProgress * 60}%`;
    }
    return "0%";
  }, [scrollY]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Enhanced Grid background with animation */}
      <GridBackground 
        cellCount={isHighPerformance ? 100 : 25} 
        animate={isHighPerformance && !prefersReducedMotion} 
      />

      {/* Animated background - only for high performance devices */}
      {isHighPerformance && !prefersReducedMotion && (
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${backgroundYValue})` }}
        >
          {/* Enhanced background animations */}
          <AnimatedBackgroundLayer />
          
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
          
          {/* Enhanced Matrix rain effect */}
          <EnhancedMatrixRain count={isHighPerformance ? 15 : 5} />
          
          {/* Code strips around edges */}
          <CodeStrip position="top" delay={0.2} />
          <CodeStrip position="bottom" delay={0.5} />
          <CodeStrip position="left" delay={0.8} />
          <CodeStrip position="right" delay={1.1} />
        </div>
      )}

      {/* Main content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={isHighPerformance && !prefersReducedMotion ? { transform: `translateY(${textYValue})` } : undefined}
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Terminal-like header */}
          <m.div
            className="relative mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block">
              <m.div
                className="flex items-center gap-2 text-primary/80 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Terminal className="w-4 h-4" />
                <m.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <m.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    className="inline-block w-2 h-4 bg-[#00ff9d] ml-1"
                  />
                </m.span>
              </m.div>
              
              <m.pre
                className="text-7xl md:text-9xl font-bold tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <ScrambleText />
              </m.pre>
            </div>
          </m.div>

          {/* Role description */}
          <m.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3 text-primary/80 font-mono">
              <Code2 className="w-5 h-5" />
              <h2 className="text-xl md:text-2xl">
                <span className="text-[#00ff9d]">function</span>{" "}
                <span className="text-[#00ffff]">createDigitalExperience</span>() {"{"}
              </h2>
            </div>
            <p className="text-base md:text-lg text-primary/60 font-mono max-w-2xl mx-auto pl-8">
              return (
              <span className="text-[#00ff9d]">
                &quot;Frontend Developer + Full stack Developer&quot;
              </span>
              );
            </p>
            <div className="flex justify-center">
              <span className="text-primary/80 font-mono">{"}"}</span>
            </div>
          </m.div>

          {/* CTA Buttons - using memo component */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <ActionButton 
              href="#projects" 
              color="#00ff9d" 
              icon={Braces}
              delay={0.4}
            >
              view_projects
            </ActionButton>

            <ActionButton 
              href="#contact" 
              color="#00ffff" 
              icon={Terminal}
              delay={0.5}
            >
              init_contact
            </ActionButton>
          </div>

          {/* Social Links */}
          <div className="flex gap-8 justify-center">
            {socials.map((social, index) => (
              <SocialIcon key={social.name} social={social} index={index} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Animated foreground elements - only with high performance */}
      {isHighPerformance && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Random floating particles */}
          {Array(5).fill(0).map((_, i) => (
            <m.div
              key={`particle-${i}`}
              className="absolute rounded-full w-1 h-1 bg-[#00ff9d]"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <HeroContent />
    </LazyMotion>
  );
}

GridBackground.displayName = "GridBackground";
EnhancedMatrixRain.displayName = "EnhancedMatrixRain";
GlitchElement.displayName = "GlitchElement";
ScrambleText.displayName = "ScrambleText";
AnimatedBackgroundLayer.displayName = "AnimatedBackgroundLayer";
SocialIcon.displayName = "SocialIcon";
ActionButton.displayName = "ActionButton";
CodeStrip.displayName = "CodeStrip";
