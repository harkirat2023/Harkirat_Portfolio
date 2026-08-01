import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const skillGroups = [
  {
    cat: "Languages",
    tagline: "The fundamentals I think in.",
    tags: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    cat: "Frontend & Backend",
    tagline: "The product layer, end to end.",
    tags: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets", "JWT · OAuth"],
  },
  {
    cat: "Databases & Caching",
    tagline: "Where the data lives.",
    tags: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ChromaDB"],
  },
  {
    cat: "AI & Machine Learning",
    tagline: "Intelligence baked into products.",
    tags: ["Scikit-learn", "NLP", "LangChain", "RAG", "Prompt Engineering", "Vector Databases", "SHAP"],
  },
  {
    cat: "Core Computer Science",
    tagline: "The theory behind the builds.",
    tags: ["Data Structures & Algorithms", "OOPS", "DBMS", "Operating Systems", "Computer Networks"],
  },
  {
    cat: "Tools & Platforms",
    tagline: "The daily drivers.",
    tags: ["Git", "GitHub Actions", "Docker", "Vercel", "Railway", "Postman", "Linux"],
  },
];

const reveal = (d) => ({
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: d } },
});

function Wave() {
  return (
    <div className="skill-wave shrink-0" aria-hidden="true">
      <span /><span /><span /><span /><span />
    </div>
  );
}

function SkillCard({ group, index }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(mx, { stiffness: 200, damping: 18 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0 → 1
    const py = (e.clientY - r.top) / r.height; // 0 → 1
    mx.set((px - 0.5) * 12);
    my.set((0.5 - py) * 10);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      className="skill-card group relative z-[1] overflow-hidden rounded-[18px] border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_26px_54px_-30px_rgba(25,22,19,0.5)]"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      variants={reveal(index * 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      <span className="absolute inset-x-0 top-0 h-[2.5px] origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-soft transition-transform duration-[600ms] ease-smooth group-hover:scale-x-100" />
      <div className="mb-[18px] flex items-start justify-between gap-4" style={{ transform: "translateZ(20px)" }}>
        <div>
          <p className="skill-cat mono mb-1 text-[0.74rem] tracking-[0.16em] text-accent">{group.cat}</p>
          <p className="font-serif text-[0.8rem] italic text-ink-mute">{group.tagline}</p>
        </div>
        <Wave />
      </div>
      <div className="tag-cloud flex flex-wrap gap-2.5">
        {group.tags.map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const boardRef = useRef(null);
  const glowRef = useRef(null);

  const onBoardMouseMove = (e) => {
    const board = boardRef.current;
    const glow = glowRef.current;
    if (!board || !glow) return;
    const r = board.getBoundingClientRect();
    glow.style.left = e.clientX - r.left + "px";
    glow.style.top = e.clientY - r.top + "px";
    glow.style.opacity = "1";
  };
  const onBoardMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <section className="section bg-paper-2" id="skills">
      <div className="container">
        <div className="skills-layout grid grid-cols-1 items-start gap-[clamp(40px,6vw,90px)] lg:grid-cols-[0.85fr_1.5fr]">
          <div className="skills-intro lg:sticky lg:top-[120px]">
            <motion.p
              className="section-label"
              variants={reveal(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              <span className="mr-2.5 text-ink-mute">02</span> Skill Set
            </motion.p>
            <motion.h2
              className="section-title"
              variants={reveal(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              A stack that ships<span className="title-dot">.</span>
            </motion.h2>
            <motion.p
              className="section-desc mb-[34px]"
              variants={reveal(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              Six core clusters, twenty-five-plus technologies — the toolkit I use to go from idea to deployed product.
            </motion.p>
            <div className="skills-intro-foot flex flex-col gap-[26px]">
              <motion.div
                className="skill-kicker flex items-center gap-3 max-w-[300px]"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
              >
                <span className="kicker-pulse relative size-2.5 shrink-0 rounded-full bg-accent">
                  <span className="absolute -inset-[5px] animate-pulse-ring rounded-full border-[1.5px] border-accent" />
                </span>
                <span className="mono leading-[1.7] text-ink-mute">Always learning — currently: GenAI &amp; distributed systems</span>
              </motion.div>
              <motion.div
                className="skills-total flex flex-wrap gap-[26px]"
                variants={reveal(0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
              >
                <span className="mono text-ink-mute"><b className="font-medium text-accent">6</b> clusters</span>
                <span className="mono text-ink-mute"><b className="font-medium text-accent">25+</b> technologies</span>
              </motion.div>
            </div>
          </div>

          <div className="skills-board relative grid grid-cols-1 gap-[18px] md:grid-cols-2" ref={boardRef} onMouseMove={onBoardMouseMove} onMouseLeave={onBoardMouseLeave}>
            <div
              className="skills-glow pointer-events-none absolute size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,77,28,0.14),transparent_65%)] blur-[30px]"
              ref={glowRef}
              aria-hidden="true"
            />
            {skillGroups.map((g, i) => (
              <SkillCard key={g.cat} group={g} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

