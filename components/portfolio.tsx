"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Terminal,
  ExternalLink,
  Github,
  ArrowRight,
  Code2,
  Clock,
  Shield,
  Zap,
  FileDown,
  X,
  FileBadge,
  Download,
  Maximize2,
  MinusSquare,
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
  };
  status: string;
  year: string;
  metrics: {
    performance: number;
    users?: string;
    uptime?: string;
    impact?: string;
  };
  details: {
    features: string[];
    impact: string;
  };
}

const projects: Project[] = [
  {
    title: "Finsight",
    description:
      "Personal finance tracking system with OCR receipt scanning for expense categorization",
    image: "/projects/finance.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel","Render","Nest.js","Docker","Google Vision Api"],
    links: {
      github: "https://github.com/Wisitt/finance-scan",
      live: "https://finance-scan.vercel.app/"
    },
    status: "LATEST",
    year: "2025",
    metrics: {
      performance: 95,
      users: "N/A",
      uptime: "N/A"
    },
    details: {
      features: [
        "OCR receipt scanning for automated expense entry",
        "Categorized spending visualization",
        "Budget planning and tracking",
        "Financial insights and reports"
      ],
      impact: "Simplified expense tracking by 70%"
    }
  },
  {
    title: "2D Platformer Game",
    description: "Developed a 2D side-scrolling platformer game",
    image: "/projects/jumphell.jpg",
    technologies: ["Construct", "Firebase"],
    links: {
      // github: "https://github.com/Wisitt/platformer-game",
      live:"https://game-for-fun-by-wisit.web.app/"
    },
    status: "STUDY",
    year: "2019",
    metrics: {
      performance: 75,
      users: "Game dev learning",
      impact: "Game development skills"
    },
    details: {
      features: [
        "Side-scrolling mechanics",
        "Character progression system",
        "Level design and obstacles",
        "Score tracking with leaderboard"
      ],
      impact: "Introduction to game development fundamentals"
    }
  },
  {
    title: "Salmon Reservation",
    description:
      "Online salmon booking and pricing system for sales representatives",
    image: "/projects/blank.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Prisma",
      "Render",
      "Vercel"
    ],
    links: {
      github: "https://github.com/Wisitt/fish-booking-simiran",
      live: "https://salmon-reservation.vercel.app"
    },
    status: "",
    year: "2024",
    metrics: {
      performance: 92,
      users: "N/A",
      uptime: "N/A"
    },
    details: {
      features: [
        "Dynamic pricing system based on inventory",
        "Reservation management for sales representatives",
        "Real-time availability updates",
        "Sales analytics dashboard"
      ],
      impact: "Increased booking efficiency by 45%"
    }
  },
  {
    title: "UniRoom",
    description:
      "Classroom reservation system for instructors and staff to prevent double bookings",
    image: "/projects/blank.jpg",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Docker", "Nginx"],
    links: {
      github: "https://github.com/Wisitt/rv-project",
      // live: "https://uniroom-app.com"
    },
    status: "",
    year: "2024",
    metrics: {
      performance: 90,
      users: "N/A",
      uptime: "99.5%"
    },
    details: {
      features: [
        "Interactive calendar for room scheduling",
        "Conflict detection and prevention",
        "Resource management for classrooms",
        "Notification system for booking updates"
      ],
      impact: "Reduced scheduling conflicts by 90%"
    }
  },
  {
    title: "Facebook Clone",
    description:
      "Facebook clone developed using Angular to study social media platform functionalities",
    image: "/projects/blank.jpg",
    technologies: ["Angular", "TypeScript", "SCSS", "Firebase"],
    links: {
      github: "https://github.com/Wisitt/facebook-clone-wisit"
    },
    status: "STUDY",
    year: "2023",
    metrics: {
      performance: 88,
      impact: "Enhanced Angular skills"
    },
    details: {
      features: [
        "News feed with dynamic content loading",
        "User profiles and authentication",
        "Post creation and interaction",
        "Social features like friend requests"
      ],
      impact: "Developed strong understanding of complex UI systems"
    }
  },
  {
    title: "Perfume Prediction",
    description:
      "AI-driven perfume recommendation system based on lifestyle and age groups",
    image: "/projects/blank.jpg",
    technologies: ["Python", "Tkinter", "ML Libraries"],
    links: {
      github: "https://github.com/Wisitt/perfume-prediction"
    },
    status: "STUDY",
    year: "2023",
    metrics: {
      performance: 85,
      users: "",
      impact: "85% match accuracy"
    },
    details: {
      features: [
        "Lifestyle-based recommendation engine",
        "Age group customization",
        "Machine learning prediction model",
        "User-friendly GUI interface"
      ],
      impact: "Achieved 85% recommendation accuracy rate"
    }
  },
];

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // Define a fallback image path
  const fallbackImage = "/projects/blank.jpg";

  return (
    <motion.div
      className="flex-shrink-0 w-full md:w-full lg:w-full p-3 h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="bg-black/50 border border-[#00ff9d]/10 p-6 rounded-lg relative overflow-hidden h-full flex flex-col"
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
            src={project.image || fallbackImage}
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
          <motion.div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.links.github && (
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
            )}
            {project.links.live && (
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
            )}
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
                  <div className="text-[#00ffff]/60">{project.year}</div>
                  <div className="px-2 py-1 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20">
                    {project.status}
                  </div>
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
                  <h4 className="text-[#00ffff] font-mono text-sm">
                    Key Features:
                  </h4>
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
  );
}

// Resume Modal Component with Native PDF Viewer
function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const resumeFileName = "wisit-moondet.pdf";
  const resumeLocalPath = "/projects/wisit-moondet.pdf";

  const handleDownloadResume = () => {
    setDownloadStarted(true);

    const link = document.createElement("a");
    link.href = resumeLocalPath;
    link.setAttribute("download", resumeFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStarted(false);
    }, 3000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle PDF load state
  useEffect(() => {
    if (isOpen) {
      setPdfLoaded(false);
      const timer = setTimeout(() => {
        setPdfLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container - This ensures the modal stays centered */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            {/* Actual Modal */}
            <motion.div
              className={`bg-black/90 border border-[#00ff9d]/20 rounded-lg overflow-hidden flex flex-col pointer-events-auto ${
                isFullscreen
                  ? "fixed inset-4 md:inset-8"
                  : "w-[90%] max-w-4xl h-[80vh] max-h-[90vh]"
                }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-center p-4 border-b border-[#00ff9d]/20">
                <div className="flex items-center gap-3">
                  <FileBadge className="w-5 h-5 text-[#00ff9d]" />
                  <h3 className="text-[#00ff9d] font-mono font-bold">{resumeFileName}</h3>
                  <span className="text-[#00ffff]/60 font-mono text-xs">
                    Last updated: 2025-04-14
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    className="p-2 rounded-lg bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff]"
                    onClick={toggleFullscreen}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isFullscreen ? (
                      <MinusSquare className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </motion.button>
                  <motion.button
                    className={`flex items-center gap-1 px-3 py-1 rounded-md border font-mono text-xs transition-colors ${
                      downloadStarted
                        ? "bg-[#00ff9d]/20 text-[#00ff9d] border-[#00ff9d]/30"
                        : "bg-[#00ffff]/10 text-[#00ffff] border-[#00ffff]/20 hover:bg-[#00ffff]/20"
                    }`}
                    onClick={handleDownloadResume}
                    whileHover={!downloadStarted ? { scale: 1.05 } : {}}
                    whileTap={!downloadStarted ? { scale: 0.95 } : {}}
                    disabled={downloadStarted}
                  >
                    <Download className="w-3 h-3" />
                    {downloadStarted ? "Downloaded" : "Download"}
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 text-[#00ff9d]"
                    onClick={onClose}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 157, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="flex-grow bg-[#111] overflow-hidden relative">
                {/* Loading state */}
                {!pdfLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-[#00ff9d] font-mono text-sm flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#00ff9d] border-t-transparent rounded-full animate-spin"></div>
                      <div>Loading resume...</div>
                    </div>
                  </div>
                )}
                
                {/* Native PDF preview using <object> */}
                <object
                  data={resumeLocalPath}
                  type="application/pdf"
                  className="w-full h-full"
                  onLoad={() => setPdfLoaded(true)}
                >
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <p className="text-[#00ff9d] font-mono mb-4">
                      Cannot preview PDF in this browser.
                    </p>
                    <motion.a
                      href={resumeLocalPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md font-mono text-sm hover:bg-[#00ff9d]/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Open PDF in new tab
                    </motion.a>
                  </div>
                </object>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}


export default function Portfolio() {
  // Use exact time format provided by the user
  const [currentTime, setCurrentTime] = useState("2025-04-14 15:44:08");
  const [currentUser] = useState("Wisitt");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      
      setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-[#0a0a0a] overflow-hidden relative" id="projects">
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-[#00ff9d]/10"
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
                <span className="text-[#00ffff]">user: {currentUser}</span>
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

        <Carousel>
          <CarouselPrevious className="bg-black/50 border border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/10" />
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <ProjectCard key={project.title} project={project} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="bg-black/50 border border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/10" />
        </Carousel>

        <motion.div
          className="flex items-center justify-center gap-2 mt-8 text-[#00ff9d]/60 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Code2 className="w-4 h-4" />
          <div className="text-sm">Drag freely to explore projects</div>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

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
              <div key={j}>
                {String.fromCharCode(0x30a0 + Math.random() * 96)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />


      {/* Projects counter at bottom right */}
      <motion.div
        className="fixed bottom-4 right-4 px-4 py-2 bg-black/80 border border-[#00ff9d]/20 rounded-lg font-mono text-xs"
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

      {/* Resume view button at bottom left */}
      <motion.div
        className="fixed bottom-4 left-4 px-4 py-2 bg-black/80 border border-[#00ff9d]/20 rounded-lg font-mono text-xs cursor-pointer hover:bg-[#00ff9d]/10 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={() => setIsResumeModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[#00ff9d]">
            <FileDown className="w-3 h-3" />
            <span>Resume</span>
          </div>
          <span className="text-[#00ffff]">.pdf</span>
        </div>
      </motion.div>
    </section>
  );
}