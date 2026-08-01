import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "intelligent systems",
  "AI products",
  "retail platforms",
  "real-time analytics",
  "financial intelligence",
];

const EASE = [0.16, 1, 0.3, 1];

const reveal = (d) => ({
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: d } },
});

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timer;

    if (!deleting) {
      // typing forward
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 45);
      } else {
        // hold at full word, then start deleting
        timer = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      // deleting backward
      if (typed.length > 0) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 30);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [typed, deleting, wordIndex]);

  return (
    <section className="hero section relative flex min-h-svh flex-col justify-between overflow-hidden pb-[60px] pt-[130px]" id="home">
      <motion.span
        className="hero-bg-sq sq-1 animate-float absolute right-[6%] top-[18%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      />
      <motion.span
        className="hero-bg-sq sq-2 animate-float absolute bottom-[26%] left-[4%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ animationDelay: "-4s" }}
      />
      <motion.span
        className="hero-bg-sq sq-3 animate-float absolute right-[16%] top-[60%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ animationDelay: "-8s" }}
      />
      <span className="absolute left-1/2 top-[20%] h-[60vh] w-px rotate-[24deg] bg-gradient-to-b from-line to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <motion.p
          className="hero-eyebrow mono mb-[18px] text-[0.74rem] tracking-[0.16em] text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
        >
          — Based in Patiala, Punjab · Open to internships
        </motion.p>

        <h1 className="hero-title font-serif font-[620] text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.98] -tracking-[0.03em]">
          {["Harkirat Singh", "builds"].map((line, i) => (
  <span key={line} className="line -mb-[0.06em] block overflow-hidden pb-[0.06em]">
    <span className={`line-inner block ${i === 0 ? "italic text-accent" : ""}`}>
      {line.split("").map((char, charIndex) => (
        <motion.span
          key={charIndex}
          className="inline-block whitespace-pre"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ 
            duration: 1.1, 
            ease: EASE, 
            // delay: Base delay per line + staggering effect per character
            delay: 0.4 + (i * 0.12) + (charIndex * 0.03) 
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  </span>
))}

          <span className="line line--swap -mb-[0.06em] block overflow-hidden pb-[0.06em]">
            <motion.span
              className="line-inner block"
              id="swapLine"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.76 }}
            >
              <span className="inline-block whitespace-pre">
                {typed}
                <span className="caret" aria-hidden="true">|</span>
              </span>
            </motion.span>
          </span>
        </h1>

        <div className="hero-bottom mt-[clamp(30px,5vw,60px)] flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <motion.p
            className="hero-sub font-serif text-[clamp(1.1rem,2.2vw,1.5rem)] leading-[1.45] text-ink-soft"
            variants={reveal(0.78)}
            initial="hidden"
            animate="show"
          >
            An aspiring software engineer building <em className="italic text-ink">AI-powered platforms</em> and <em className="italic text-ink">real-time analytics systems</em> at the intersection of intelligence and impact.
          </motion.p>
          <motion.div
            className="hero-meta space-y-1 text-left lg:text-right"
            variants={reveal(0.9)}
            initial="hidden"
            animate="show"
          >
            <p className="mono text-ink-mute">BE Computer Engineering · TIET</p>
            <p className="mono text-ink-mute">2023 — 2027</p>
          </motion.div>
        </div>

        <motion.div
          className="hero-cta mt-[34px] flex flex-wrap gap-4"
          variants={reveal(1)}
          initial="hidden"
          animate="show"
        >
          <a className="btn btn-solid btn-lg group" href="#projects">
            <span className="btn-label">See my work</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a className="btn btn-ghost btn-lg" href="mailto:hkkirat25@gmail.com"><span className="btn-label">hkkirat25@gmail.com</span></a>
        </motion.div>
      </div>

      <div className="hero-socials absolute right-[clamp(18px,3vw,48px)] top-1/2 z-5 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <a className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-mute transition-colors hover:text-accent [writing-mode:vertical-rl]" href="https://www.linkedin.com/in/harkiratse/" target="_blank" rel="noopener">LinkedIn</a>
        <a className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-mute transition-colors hover:text-accent [writing-mode:vertical-rl]" href="https://github.com/harkirat2023" target="_blank" rel="noopener">GitHub</a>
        <a className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-mute transition-colors hover:text-accent [writing-mode:vertical-rl]" href="https://leetcode.com/u/Hkkirat_25/" target="_blank" rel="noopener">LeetCode</a>
        <span className="hero-socials-line h-[70px] w-px bg-ink-mute"><i className="bg-accent" /></span>
      </div>

      <motion.a
        href="#about"
        className="scroll-cue absolute bottom-6 left-1/2 z-5 flex -translate-x-1/2 flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="mono text-ink-mute">Scroll</span>
        <span className="scroll-cue-line h-[46px] w-px bg-line"><i className="bg-accent" /></span>
      </motion.a>
    </section>
  );
}

