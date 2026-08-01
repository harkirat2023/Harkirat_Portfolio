import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "./components/Intro.jsx";
import Cursor from "./components/Cursor.jsx";
import Header from "./components/Header.jsx";
import MobileMenu from "./components/MobileMenu.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Journey from "./components/Journey.jsx";
import Roles from "./components/Roles.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = p + "%";
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>{!introDone && <Intro onDone={() => setIntroDone(true)} />}</AnimatePresence>

      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress fixed left-0 top-0 z-[1200] h-[3px] w-0 bg-accent" ref={progressRef} aria-hidden="true" />
      <Cursor />

      <Header scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Roles />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

