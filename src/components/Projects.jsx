import { motion } from "framer-motion";

const projects = [
  {
    name: "KhataBox",
    tag: "Full-Stack · ML",
    role: "Inventory & B2C Retail Management Platform",
    points: [
      "Designed a full-stack retail workflow spanning 20+ modules, 30+ REST APIs, and JWT-based role authentication.",
      "Added Random Forest demand forecasting to turn sales history into weekly restocking decisions.",
      "Connected QR/barcode scanning, low-stock alerts, PDF invoicing, Redis caching, and responsive dashboards into one platform.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "scikit-learn", "Redis"],
    links: [
      { label: "Website", url: "https://khataboxapp.vercel.app" },
      { label: "GitHub", url: "https://github.com/harkirat2023/KhataBox--Inventory-B2C-Retail-Management-Platform" },
    ],
  },
  {
    name: "Symptom Score AI",
    tag: "GenAI · Healthcare",
    role: "ML-Based Symptom Intelligence System",
    points: [
      "Built a symptom intelligence workflow combining disease prediction, severity analysis, and personalised recommendations.",
      "Used a three-model ensemble with SHAP explanations, reaching approximately 89% prediction accuracy.",
      "Added a LangChain RAG assistant over 12 medical documents alongside authentication, history, dashboards, and PDF/CSV reporting.",
    ],
    stack: ["Next.js", "FastAPI", "MongoDB", "scikit-learn", "LangChain", "ChromaDB"],
    links: [
      { label: "GitHub", url: "https://github.com/harkirat2023/Symptom-Scope-AI" },
      { label: "Website", url: "https://symptom-scope-ai.vercel.app" }
    ],
  },
  {
    name: "IntelliMoney",
    tag: "AI · FinTech",
    role: "AI-Powered Financial Health Scoring Platform",
    points: [
      "Created an expense and budgeting platform that turns spending patterns into a personalised financial health score.",
      "Automated expense categorisation with TF-IDF and Logistic Regression, then surfaced the results through interactive dashboards.",
      "Built secure FastAPI and MongoDB services with JWT authentication for scalable financial data management.",
    ],
    stack: ["Python", "React.js", "FastAPI", "MongoDB", "scikit-learn", "NLP"],
    links: [{ label: "GitHub", url: "https://github.com/harkirat2023/IntelliMoney-AI-Powered-Financial-Health-Scoring-Platform" },
    { label: "Website", url: "https://intellimoney.vercel.app" }
    ],
  },
  {
    name: "Moodify",
    tag: "ML · Python · NLP",
    role: "Mood-Based Music Recommendation System",
    points: [
      "Recommendation engine that maps a listener's mood to fitting songs.",
      "Trains on audio & lyric features to build mood-aware playlists.",
    ],
    stack: ["Python", "React.js", "FastAPI", "TF+IDF", "NLP"],
    links: [{ label: "GitHub", url: "https://github.com/harkirat2023/Mood-Music_Recommendation-System" },
      {label: "Website", url: "https://mood-music-recommendation-system.vercel.app"}
    ],
  },
  {
    name: "VisionMark",
    tag: "OpenCV · Python · ",
    role: "OpenCV Based Smart Attendance Management System",
    points: [
      "Hands-on ML implementations from preprocessing to model evaluation.",
      "Algorithms, notebooks & experiments documented end to end.",
    ],
    stack: [],
    links: [{ label: "GitHub", url: "https://github.com/harkirat2023/UML501-MACHINE_LEARNING-102303854" },
      {label: "Website", url: "https://visionmark-hazel.vercel.app/"}

    ],
  },
];

const reveal = (d) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: d } },
});

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head mb-[clamp(44px,7vw,84px)]">
          <motion.p className="section-label" variants={reveal(0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            <span className="mr-2.5 text-ink-mute">03</span> Selected Work
          </motion.p>
          <motion.h2 className="section-title" variants={reveal(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            Things I've built<span className="title-dot">.</span>
          </motion.h2>
          <motion.p className="section-desc" variants={reveal(0.16)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            Full products, end to end — from ML models and REST backends to pixel-minded frontends and CI/CD.
          </motion.p>
        </div>

        <div className="projects-list flex flex-col gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              className="project group relative grid grid-cols-[84px_1fr] gap-[clamp(20px,3vw,44px)] overflow-hidden rounded-[18px] border border-line bg-paper p-[clamp(28px,4vw,46px)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_30px_60px_-32px_rgba(0,0,0,0.7)]"
              variants={reveal(i * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
            >
              <span className="project-sheen absolute inset-0 -translate-x-[10%] bg-gradient-to-r from-accent-soft to-transparent opacity-0 transition-all duration-[600ms] ease-smooth group-hover:translate-x-0 group-hover:opacity-80" aria-hidden="true" />
              <span className="project-ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="project-num mono relative z-[1] pt-2 text-[0.8rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="project-main relative z-[1]">
                <div className="mb-1.5 flex flex-wrap items-baseline gap-3.5">
                  <h3 className="project-name font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] font-[620] leading-[1.05] -tracking-[0.02em] transition-all duration-[400ms] ease-smooth group-hover:translate-x-1.5 group-hover:text-accent-deep">{p.name}</h3>
                  <span className="project-tag mono rounded-full bg-accent-soft px-3 py-1.5 text-[0.64rem] tracking-[0.1em] text-accent">{p.tag}</span>
                </div>
                <p className="project-role mono mb-[18px] text-[0.72rem] uppercase tracking-[0.1em] text-ink-mute">{p.role}</p>
                <ul className="project-points mb-[22px] flex flex-col gap-3 p-0">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-[0.96rem] leading-[1.5] text-ink-soft">{pt}</li>
                  ))}
                </ul>
                <div className="project-foot flex flex-wrap items-end justify-between gap-[18px] border-t border-dashed border-line pt-[18px]">
                  {p.stack.length > 0 && (
                    <div className="project-stack flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded-md border border-line bg-paper-2 px-3 py-1.5 font-mono text-[0.64rem] tracking-wide text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-paper">{s}</span>
                      ))}
                    </div>
                  )}
                  <div className="project-links flex flex-wrap gap-5">
                    {p.links.map((l) => (
                      <a key={l.label} className="group/l inline-flex items-center gap-2 border-b-[1.5px] border-line pb-1 font-mono text-[0.8rem] uppercase tracking-[0.06em] transition-colors duration-300 hover:border-accent" href={l.url} target="_blank" rel="noopener" data-cursor="hover">
                        {l.label} <span className="text-accent transition-transform duration-300 group-hover/l:translate-x-1 group-hover/l:-translate-y-1">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="projects-foot mt-[44px] flex flex-wrap items-baseline gap-[18px]"
          variants={reveal(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="mono text-ink-mute">More on</p>
          <a href="https://github.com/harkirat2023" target="_blank" rel="noopener" className="text-link" data-cursor="hover">
            github.com/harkirat2023 <span className="text-link-arrow inline-block">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

