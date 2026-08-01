import { motion } from "framer-motion";

const roles = [
  {
    num: "01",
    title: "Joint Secretary",
    org: "IETE Students Forum, TIET",
    date: "May 2025 — May 2026",
    desc: "Coordinated 10+ tech events and workshops, growing club membership by 40%.",
    link: "https://www.linkedin.com/posts/harkiratse_leadership-studentlife-campusinvolvement-share-7327374129072930818-bD6r/",
    linkLabel: "Read story",
  },
  {
    num: "02",
    title: "Student Ambassador",
    org: "LetsUpgrade EdTech Pvt. Ltd.",
    date: "August 2024",
    desc: "Led social outreach boosting referrals by 20%, onboarded 45+ students, drove 300+ campus web visits.",
  },
  {
    num: "03",
    title: "Creative Content Head",
    org: "Vyom Hostel, TIET",
    date: "Jan 2026 — May 2026",
    desc: "Led content strategy and digital campaigns, growing student engagement through data-driven social planning.",
  },
];

const reveal = (i) => ({
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 } },
});

export default function Roles() {
  return (
    <section className="section" id="roles">
      <div className="container">
        <div className="section-head mb-[clamp(44px,7vw,84px)]">
          <motion.p className="section-label" variants={reveal(0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            <span className="mr-2.5 text-ink-mute">05</span> Leadership
          </motion.p>
          <motion.h2 className="section-title" variants={reveal(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            Beyond the code<span className="title-dot">.</span>
          </motion.h2>
        </div>

        <div className="roles-grid grid grid-cols-1 gap-[18px] lg:grid-cols-3">
          {roles.map((r, i) => (
            <motion.article
              key={r.num}
              className="role-card group relative flex flex-col gap-1.5 overflow-hidden rounded-[18px] border border-line bg-paper p-[26px_30px] transition-all duration-[450ms] hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_28px_54px_-30px_rgba(0,0,0,0.7)]"
              variants={reveal(i)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-smooth group-hover:scale-x-100" />
              <span className="role-num mono mb-2.5 text-[0.78rem] text-accent">{r.num}</span>
              <h3 className="role-title font-serif text-[1.5rem] font-[620]">{r.title}</h3>
              <p className="role-org text-[0.95rem] font-medium text-ink-soft">{r.org}</p>
              <p className="role-date mono mb-2.5 text-ink-mute">{r.date}</p>
              <p className="role-desc mb-4 text-[0.92rem] text-ink-soft">{r.desc}</p>
              {r.link && (
                <a className="group/l inline-flex items-center gap-2 self-start border-b-[1.5px] border-line pb-1 font-mono text-[0.8rem] uppercase tracking-[0.06em] transition-colors hover:border-accent" href={r.link} target="_blank" rel="noopener" data-cursor="hover">
                  {r.linkLabel} <span className="text-accent transition-transform duration-300 group-hover/l:translate-x-1 group-hover/l:-translate-y-1">↗</span>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

