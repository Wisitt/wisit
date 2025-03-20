// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { motion } from "framer-motion";

// export function ThemeToggle() {
//   const { setTheme, theme } = useTheme();

//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="p-2 rounded-full bg-background/10 backdrop-blur-sm border border-white/10"
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <span className="sr-only">Toggle theme</span>
//     </motion.button>
//   );
// }