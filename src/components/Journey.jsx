import { motion } from "framer-motion";

const items = [
  {
    tag: "Internship",
    date: "June 2025 — July 2025",
    title: "Summer Project Intern",
    org: "Experiential Learning Centre, TIET",
    bullets: [
      "Built a passive, continuous authentication system for mobile banking using behavioral biometrics.",
      "Implemented a Split Federated Learning architecture processing activations locally to keep raw sensor data on-device.",
      "Processed multi-modal sensor streams — Accelerometer, Gyroscope, Keystroke dynamics and Touch heatmaps — to analyse user interaction patterns.",
    ],
  },
  {
    tag: "Education",
    date: "2023 — 2027",
    title: "Bachelor of Engineering — Computer Engineering",
    org: "Thapar Institute of Engineering and Technology, Patiala",
    note: "Coursework deep in ML, data systems and software engineering — culminating in the UML501 machine learning lab and multiple shipped products.",
  },
  {
    tag: "Recognition",
    date: "Ongoing",
    title: "Certifications & Achievements",
    bullets: [
      <>Certificates in Web Development, Software Engineering and Robotics — <a className="border-b border-accent text-accent-soft transition-colors hover:text-accent" href="https://drive.google.com/drive/folders/1rBvGQ5CklMAx5yPydaYREQilWWyWwwNP" target="_blank" rel="noopener">view all</a>.</>,
      "Solved 250+ DSA problems on LeetCode and GeeksforGeeks.",
      "Organized and executed events for 450+ participants, leading a team of 27 members.",
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export default function Journey() {
  return (
    <section className="section bg-ink text-paper" id="experience">
      <div className="container">
        <div className="section-head mb-[clamp(44px,7vw,84px)]">
          <motion.p className="section-label" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            <span className="mr-2.5 text-paper/40">04</span> Journey
          </motion.p>
          <motion.h2 className="section-title text-paper" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
            Experience &amp; education<span className="title-dot">.</span>
          </motion.h2>
        </div>

        <div className="journey-list">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              className="journey-item grid grid-cols-[40px_1fr] gap-6"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="journey-rail flex flex-col items-center">
                <span className="journey-dot relative mt-2.5 size-3.5 shrink-0 rounded-full border-[3px] border-accent bg-ink" />
                {i < items.length - 1 && (
                  <span className="journey-line my-1.5 min-h-[40px] w-[1.5px] flex-1 bg-gradient-to-b from-accent/40 to-paper/10" />
                )}
              </div>
              <div className={`journey-content ${i < items.length - 1 ? "pb-[clamp(40px,6vw,70px)]" : ""}`}>
                <div className="journey-meta mono mb-2.5 flex flex-wrap items-center gap-3.5">
                  <span className="rounded-full bg-accent px-3 py-1 text-[0.66rem] tracking-[0.1em] text-ink">{it.tag}</span>
                  <span className="text-paper/50">{it.date}</span>
                </div>
                <h3 className="journey-title mb-1 font-serif text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">{it.title}</h3>
                <p className="journey-org mb-[14px] font-medium text-accent-soft">{it.org}</p>
                {it.bullets && (
                  <ul className="journey-bullets flex list-none flex-col gap-2.5 p-0">
                    {it.bullets.map((b, bi) => (
                      <li key={bi} className="text-[0.95rem] leading-[1.55] text-paper/75">{b}</li>
                    ))}
                  </ul>
                )}
                {it.note && <p className="journey-note max-w-[56ch] text-[0.95rem] text-paper/60">{it.note}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

