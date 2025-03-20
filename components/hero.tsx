"use client"

import { useEffect, useState, useRef, memo, useMemo } from "react"
import { LazyMotion, m, domAnimation } from "framer-motion"
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

// Static characters for scramble effect
const scrambleText = "!@#$%^&*()_+{}|:<>?~";

// Static grid component to avoid unnecessary re-renders
const GridBackground = memo(({ cellCount = 50 }: { cellCount?: number }) => (
  <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] grid-rows-[repeat(auto-fill,minmax(80px,1fr))] opacity-[0.15]">
    {Array(cellCount).fill(0).map((_, i) => (
      <div key={i} className="border-[0.5px] border-primary/20" />
    ))}
  </div>
));

// Optimized matrix rain that only renders on high-performance devices
const OptimizedMatrixRain = memo(({ count = 5 }: { count?: number }) => {
  // Pre-compute the rain elements for better performance
  const rainElements = useMemo(() => 
    Array(count).fill(0).map((_, i) => {
      const charCount = 5 + Math.floor(Math.random() * 5);
      const xPos = Math.random() * 100;
      const duration = 5 + Math.random() * 5;
      
      return (
        <m.div
          key={i}
          className="absolute text-primary/30 text-xs pointer-events-none"
          initial={{
            x: `${xPos}vw`,
            y: -20,
          }}
          animate={{
            y: "100vh",
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: Math.random() * 5,
          }}
          style={{ willChange: "transform" }}
        >
          {Array(charCount).fill(0).map((_, j) => (
            <div key={j}>
              {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
            </div>
          ))}
        </m.div>
      );
    }), [count]);
    
  return <div className="absolute inset-0">{rainElements}</div>;
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


// Social icon component
const SocialIcon = memo(({ social, index }: { 
  social: typeof socials[0], 
  index: number 
}) => (
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
    <div 
      className={`absolute inset-0 bg-[${color}]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300`}
    />
  </m.a>
));

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

      {/* Grid background - reduced number of cells */}
      <GridBackground cellCount={isHighPerformance ? 50 : 25} />

      {/* Animated background - only for high performance devices */}
      {isHighPerformance && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 relative"
          style={{ transform: `translateY(${backgroundYValue})` }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
          
          {/* Code rain effect - reduced count */}
          <OptimizedMatrixRain count={5} />
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
                "Frontend Developer + Full stack Developer"
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
    </div>
  );
}

// Main component with LazyMotionProvider
export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <HeroContent />
    </LazyMotion>
  );
}