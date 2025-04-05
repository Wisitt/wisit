"use client";

import { useRef, useState, useEffect } from "react";
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
    title: "FinTrack",
    description:
      "Personal finance tracking system with OCR receipt scanning for expense categorization",
    image: "/projects/blank.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"],
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
  // {
  //   title: "Book Selling Website",
  //   description: "Online book store with CRUD functionality using PDO",
  //   image: "/projects/blank.jpg",
  //   technologies: ["PHP", "Bootstrap", "MySQL"],
  //   links: {
  //     github: "https://github.com/Wisitt/bookstore"
  //   },
  //   status: "ARCHIVED",
  //   year: "2022",
  //   metrics: {
  //     performance: 80,
  //     users: "Educational",
  //     impact: "Core web dev skills"
  //   },
  //   details: {
  //     features: [
  //       "Book catalog with search and filter",
  //       "User authentication system",
  //       "Shopping cart functionality",
  //       "Order processing and tracking"
  //     ],
  //     impact: "Fundamental learning of database CRUD operations"
  //   }
  // },
  // {
  //   title: "Book Rental System",
  //   description: "Library management system for renting and borrowing books",
  //   image: "/projects/blank.jpg",
  //   technologies: ["C#", "SQL Server"],
  //   links: {
  //     github: "https://github.com/Wisitt/book-rental-system"
  //   },
  //   status: "EDUCATIONAL",
  //   year: "2022",
  //   metrics: {
  //     performance: 78,
  //     users: "College project",
  //     impact: "Desktop app development"
  //   },
  //   details: {
  //     features: [
  //       "Book inventory management",
  //       "Member registration system",
  //       "Rental tracking and late fees",
  //       "Reporting and statistics"
  //     ],
  //     impact: "First complete C# application with database integration"
  //   }
  // },
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
  }
];

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentUser] = useState("Wisitt");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselPosition] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(0, 19).replace("T", " "));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <section className="py-16 bg-[#0a0a0a] overflow-hidden relative">
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
    </section>
  );
}