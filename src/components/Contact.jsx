import { motion } from "framer-motion";

const socials = [
  { num: "01", name: "LinkedIn", url: "https://www.linkedin.com/in/harkiratse/" },
  { num: "02", name: "GitHub", url: "https://github.com/harkirat2023" },
  { num: "03", name: "LeetCode", url: "https://leetcode.com/u/Hkkirat_25/" },
];

const reveal = (d) => ({
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: d } },
});

export default function Contact() {
  return (
    <section className="section bg-paper-2 text-center" id="contact">
      <div className="container">
        <motion.p className="section-label justify-center" variants={reveal(0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
          <span className="mr-2.5 text-ink-mute">06</span> Contact
        </motion.p>
        <motion.h2
          className="contact-title mb-[22px] font-serif text-[clamp(3rem,9vw,7rem)] font-[620] leading-[1.02] -tracking-[0.03em]"
          variants={reveal(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          Have an idea?<br /><span className="contact-title-em italic text-accent">Let's build it.</span>
        </motion.h2>
        <motion.p
          className="contact-sub mx-auto mb-10 max-w-[480px] text-[1.05rem] text-ink-soft"
          variants={reveal(0.16)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          I'm currently open to internships and new opportunities. If you have a project, a role, or just want to talk engineering — my inbox is always open.
        </motion.p>

        <motion.div
          className="contact-actions mb-14 flex flex-wrap justify-center gap-4"
          variants={reveal(0.24)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          <a className="btn btn-solid btn-lg group" href="mailto:hkkirat25@gmail.com" data-cursor="hover">
            <span className="btn-label">hkkirat25@gmail.com</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a className="btn btn-ghost btn-lg" href="/assets/Resume_Harkirat.pdf" download="Harkirat_Singh_Resume.pdf" data-cursor="hover">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span className="btn-label">Download Resume</span>
          </a>
        </motion.div>

        <div className="contact-socials mx-auto max-w-[720px] border-t border-line">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              className="contact-social group grid grid-cols-[50px_1fr_40px] items-center gap-4 border-b border-line px-1.5 py-[22px] transition-all duration-[400ms] hover:bg-paper hover:pl-[22px]"
              href={s.url}
              target="_blank"
              rel="noopener"
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <span className="cs-idx font-mono text-[0.72rem] text-ink-mute transition-colors group-hover:text-accent">{s.num}</span>
              <span className="cs-name text-left font-serif text-[clamp(1.3rem,2.6vw,1.8rem)] font-[580] -tracking-[0.01em]">{s.name}</span>
              <span className="cs-arrow text-[1.3rem] text-accent transition-transform duration-[350ms] ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

