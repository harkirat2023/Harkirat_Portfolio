import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { target: 250, suffix: "+", label: "DSA problems solved" },
  { target: 31, suffix: "+", label: "REST APIs shipped" },
  { target: 5, suffix: "+", label: "Projects shipped" },
];

function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span className="stat-num font-serif text-3xl font-[650] leading-none" ref={ref}>
      {val}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

const reveal = (d) => ({
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: d } },
});

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head mb-[clamp(44px,7vw,84px)]">
          <motion.p
            className="section-label"
            variants={reveal(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            <span className="mr-2.5 text-ink-mute">01</span> About
          </motion.p>
          <motion.h2
            className="section-title"
            variants={reveal(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            Engineer by training.<br />Builder by habit.
          </motion.h2>
        </div>

        <div className="about-grid grid grid-cols-1 items-start gap-[clamp(40px,6vw,90px)] lg:grid-cols-[1fr_1.25fr]">
          <div className="about-visual lg:sticky lg:top-[110px]">
            <motion.div
              className="relative aspect-square w-[min(340px,100%)] overflow-hidden rounded-full bg-paper-2"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/assets/closeup.jpg" alt="Harkirat Singh" className="size-full object-cover" />
              <span className="animate-spin-slow absolute -inset-[14px] rounded-full border-[1.5px] border-dashed border-accent" />
            </motion.div>
            <div className="about-card-stats mt-[34px] grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="stat rounded-[18px] border border-line bg-paper p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  <Counter target={s.target} suffix={s.suffix} />
                  <p className="mt-2 text-[0.72rem] leading-[1.35] text-ink-mute">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="about-copy">
            <motion.p
              className="about-lead mb-6 font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.3] -tracking-[0.01em]"
              variants={reveal(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              I am a computer engineering student who likes taking an idea from a messy problem statement to a <strong className="font-[620]">working, intelligent product</strong>.
            </motion.p>
            <motion.p
              className="mb-[30px] max-w-[560px] text-[1.02rem] text-ink-soft"
              variants={reveal(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              My strongest work sits at the intersection of <strong className="font-semibold text-ink">machine learning and software engineering</strong>: FastAPI services, Next.js interfaces, secure REST APIs, and data systems backed by PostgreSQL or MongoDB. I enjoy the product details too, from explainable predictions and RAG assistants to dashboards that make a decision easier to act on.
            </motion.p>
            <div className="about-points mb-[34px] flex flex-col gap-[18px]">
              {[
                { idx: "A", title: "Build with purpose", text: "from inventory forecasting to financial health scoring, I turn models into features with a clear user benefit." },
                { idx: "B", title: "Lead with intent", text: "organised events for 450+ participants and led a 27-member team as Joint Secretary of IETE." },
                { idx: "C", title: "Keep learning", text: "250+ DSA problems, hands-on ML work, and a habit of learning by shipping." },
              ].map((p, i) => (
                <motion.div
                  key={p.idx}
                  className="point grid grid-cols-[44px_1fr] items-start gap-4 rounded-[18px] border border-line bg-paper p-[18px_20px] transition-all duration-[400ms] hover:translate-x-2 hover:border-accent hover:shadow-[8px_8px_0_-2px_rgba(59,130,246,0.35)]"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  <span className="point-idx grid size-11 place-items-center rounded-full border-[1.5px] border-ink font-serif font-semibold italic">{p.idx}</span>
                  <p className="m-0 text-[0.95rem] leading-[1.55] text-ink-soft">
                    <strong className="font-semibold text-ink">{p.title}</strong> — {p.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.a
              href="mailto:hkkirat25@gmail.com"
              className="text-link"
              variants={reveal(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              Let's talk <span className="text-link-arrow inline-block transition-transform duration-300 group-hover:-translate-y-1">↗</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

