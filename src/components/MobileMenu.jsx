import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#about", num: "01", label: "About" },
  { href: "#skills", num: "02", label: "Skills" },
  { href: "#projects", num: "03", label: "Projects" },
  { href: "#experience", num: "04", label: "Journey" },
  { href: "#contact", num: "05", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu fixed inset-0 z-[920] flex flex-col justify-center bg-ink px-[8vw] py-20 text-paper"
          id="mobileMenu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.nav
            className="flex flex-col gap-1"
            aria-label="Mobile"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
          >
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="m-link"
                onClick={onClose}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <span>{l.num}</span>
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
          <motion.div
            className="mt-9 flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          >
            <a className="btn btn-solid" href="/assets/Resume_Harkirat.pdf" download="Harkirat_Singh_Resume.pdf">
              <span className="btn-label">Download CV</span>
            </a>
            <div className="flex gap-[22px]">
              <a className="font-mono text-[0.78rem] text-ink-mute transition-colors hover:text-accent-soft" href="https://www.linkedin.com/in/harkiratse/" target="_blank" rel="noopener">LinkedIn</a>
              <a className="font-mono text-[0.78rem] text-ink-mute transition-colors hover:text-accent-soft" href="https://github.com/harkirat2023" target="_blank" rel="noopener">GitHub</a>
              <a className="font-mono text-[0.78rem] text-ink-mute transition-colors hover:text-accent-soft" href="https://leetcode.com/u/Hkkirat_25/" target="_blank" rel="noopener">LeetCode</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

