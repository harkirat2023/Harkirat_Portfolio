import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letters = [
  { ch: "H", d: 0.05 },
  { ch: "A", d: 0.1 },
  { ch: "R", d: 0.15 },
  { ch: "K", d: 0.2 },
  { ch: "I", d: 0.25 },
  { ch: "R", d: 0.3 },
  { ch: "A", d: 0.35 },
  { ch: "T", d: 0.4, last: true },
];

const EASE = [0.16, 1, 0.3, 1];

export default function Intro({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1300;
    const start = performance.now();
    const delay = 480;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 500);
    };
    const t = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <motion.div
      className="intro"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
      aria-hidden="true"
    >
      <motion.div
        className="intro-panel intro-panel--top"
        exit={{ y: "-101%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
      />
      <motion.div
        className="intro-panel intro-panel--bottom"
        exit={{ y: "101%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
      />
      <motion.div
        className="intro-content"
        exit={{ opacity: 0, y: -24, transition: { duration: 0.45, ease: EASE } }}
      >
        <motion.p
          className="intro-kicker mono mb-6 text-[0.7rem] tracking-[0.28em] text-accent-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          Portfolio — 2026
        </motion.p>
        <div className="intro-name font-serif font-[620] text-[clamp(2.4rem,9vw,6rem)] leading-none tracking-[-0.02em] text-paper">
          {letters.map((l) => (
            <span key={l.ch} className="intro-letter inline-block overflow-hidden">
              <motion.i
                className={`not-italic ${l.last ? "text-accent" : ""}`}
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: l.d }}
              >
                {l.ch}
              </motion.i>
            </span>
          ))}
        </div>
        <motion.div
          className="intro-meta mt-[26px] flex items-center justify-center gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
        >
          <span className="intro-count font-serif italic text-[1.6rem] text-paper">
            {String(count).padStart(3, "0")}
          </span>
          <span className="intro-bar">
            <motion.i
              className="block h-full w-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.48 }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

