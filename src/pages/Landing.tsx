import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { About } from "@/portfolio/components/About";
import { Assistant } from "@/portfolio/components/Assistant";
import { Backdrop } from "@/portfolio/components/Backdrop";
import { Contact } from "@/portfolio/components/Contact";
import { CursorGlow } from "@/portfolio/components/CursorGlow";
import { Experience } from "@/portfolio/components/Experience";
import { Footer } from "@/portfolio/components/Footer";
import { GitHub } from "@/portfolio/components/GitHub";
import { Hero } from "@/portfolio/components/Hero";
import { Navbar } from "@/portfolio/components/Navbar";
import { Projects } from "@/portfolio/components/Projects";
import { ScrollProgress } from "@/portfolio/components/ScrollProgress";
import { Skills } from "@/portfolio/components/Skills";
import { CommandPalette } from "@/portfolio/components/CommandPalette";

export default function Landing() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Ctrl/Cmd + K opens the command palette
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // deep-link to a section on load
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 120);
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-x-clip"
    >
      <Backdrop />
      <ScrollProgress />
      <CursorGlow />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHub />
        <Contact />
      </main>

      <Footer />

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Assistant />
    </motion.div>
  );
}
