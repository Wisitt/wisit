import './globals.css'
import { ThemeToggle } from "@/components/theme-toggle";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Portfolio from "@/components/portfolio";
// import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <nav className="fixed top-0 right-0 m-4 z-50">
        <ThemeToggle />
      </nav>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      {/* <Testimonials /> */}
      <Contact />
    </main>
  );
}