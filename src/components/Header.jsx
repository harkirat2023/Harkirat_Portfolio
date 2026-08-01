import { motion } from "framer-motion";

const links = [
  { href: "#about", num: "01", label: "About" },
  { href: "#skills", num: "02", label: "Skills" },
  { href: "#projects", num: "03", label: "Projects" },
  { href: "#experience", num: "04", label: "Journey" },
  { href: "#contact", num: "05", label: "Contact" },
];

const navItem = {
  hidden: { opacity: 0, y: -12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.06 },
  }),
};

export default function Header({ scrolled, onOpenMenu }) {
  const active = () => {
    const id =
      typeof document !== "undefined"
        ? [...document.querySelectorAll("section[id]")]
            .filter((s) => s.getBoundingClientRect().top <= window.innerHeight * 0.35)
            .pop()?.id
        : "";
    return id ? "#" + id : "";
  };

  return (
    <motion.header
      className={`header fixed inset-x-0 top-0 z-[900] flex items-center justify-between px-[clamp(20px,4vw,48px)] py-5 transition-all duration-300 ${
        scrolled ? "scrolled border-b border-line bg-paper/85 py-3.5 backdrop-blur-md" : "border-b border-transparent"
      }`}
      id="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <a href="#home" className="group flex items-center gap-2.5 font-serif text-[1.45rem] font-bold tracking-tight">
        <motion.span
          className="grid size-9 place-items-center rounded-full bg-ink text-paper text-lg transition-all duration-500 group-hover:-rotate-[20deg] group-hover:scale-105 group-hover:bg-accent group-hover:text-ink"
          whileHover={{ rotate: -20, scale: 1.05 }}
        >
          H
        </motion.span>
        <span>arkirat<span className="text-accent">.</span></span>
      </a>
      <nav className="hidden gap-[clamp(16px,2.6vw,36px)] lg:flex" aria-label="Primary">
        {links.map((l, i) => (
          <motion.a
            key={l.href}
            href={l.href}
            className={`nav-link relative py-1.5 text-[0.82rem] font-medium tracking-wide text-ink-soft transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 ${
              active() === l.href ? "active text-ink after:origin-left after:scale-x-100" : ""
            }`}
            variants={navItem}
            custom={i}
            initial="hidden"
            animate="show"
          >
            <span className="mr-1 align-[2px] font-mono text-[0.6rem] text-accent">{l.num}</span>
            {l.label}
          </motion.a>
        ))}
      </nav>
      <div className="flex items-center gap-3.5">
        <motion.a
          className="btn btn-ghost btn-sm hidden rounded-[10px] sm:inline-flex"
          href="/assets/Resume_Harkirat.pdf"
          download="Harkirat_Singh_Resume.pdf"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="btn-label">Download CV</span>
          <svg className="btn-icon size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </motion.a>
        <button
          className="menu-toggle flex size-10 flex-col justify-center gap-[5px] p-2.5 lg:hidden"
          id="menuToggle"
          onClick={onOpenMenu}
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <span /><span />
        </button>
      </div>
    </motion.header>
  );
}

