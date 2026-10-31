"use client";

import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { certifications, education, experience, featuredSkills, leadership, profile, projects, skills, siteCopy, stats } from "@/content/site";

function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return <div className="section-head reveal"><div className="section-index mono"><span className="accent">{index}</span><span aria-hidden="true"> / </span>{kicker}</div><h2 className="section-heading">{title}</h2></div>;
}

function CopyAction({ value, children }: { value: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(value); }
    catch {
      const area = document.createElement("textarea"); area.value = value; area.setAttribute("readonly", "");
      area.style.position = "fixed"; area.style.opacity = "0"; document.body.append(area); area.select();
      document.execCommand("copy"); area.remove();
    }
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  }
  return <button className="copy-action" onClick={copy} aria-label={`Copy ${children}`}><span aria-live="polite">{copied ? "Copied" : children}</span>{copied ? <Check size={16} aria-hidden="true"/> : <Copy size={16} aria-hidden="true"/>}</button>;
}

function PointerFollower() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const motionAllowed = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!motionAllowed.matches) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;
    let hovering = false;
    let lastCard: HTMLElement | null = null;
    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    root.classList.add("has-motion-pointer");

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.17;
      ringY += (targetY - ringY) * 0.17;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${hovering ? 1.45 : 1})`;
      if (Math.abs(targetX - ringX) > 0.2 || Math.abs(targetY - ringY) > 0.2) frame = window.requestAnimationFrame(animateRing);
      else frame = 0;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      const nextHovering = event.target instanceof Element && Boolean(event.target.closest("a, button, summary, [role='button'], .project-card"));
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>(".project-card") : null;
      if (lastCard && lastCard !== card) {
        lastCard.classList.remove("is-tilting");
        lastCard.style.removeProperty("--tilt-x");
        lastCard.style.removeProperty("--tilt-y");
      }
      if (card) {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--tilt-x", `${(x * 2.6).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(-y * 2.2).toFixed(2)}deg`);
        card.classList.add("is-tilting");
      }
      lastCard = card;
      if (nextHovering !== hovering) {
        hovering = nextHovering;
        dot.classList.toggle("is-hovering", hovering);
        ring.classList.toggle("is-hovering", hovering);
      }
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
      if (!frame) frame = window.requestAnimationFrame(animateRing);
    };
    const hide = () => {
      dot.classList.remove("is-visible"); ring.classList.remove("is-visible");
      lastCard?.classList.remove("is-tilting");
      lastCard?.style.removeProperty("--tilt-x");
      lastCard?.style.removeProperty("--tilt-y");
      lastCard = null;
    };
    const press = () => { dot.classList.add("is-pressed"); ring.classList.add("is-pressed"); };
    const release = () => { dot.classList.remove("is-pressed"); ring.classList.remove("is-pressed"); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      hide();
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("has-motion-pointer");
    };
  }, []);

  return <><span className="motion-pointer-dot" ref={dotRef} aria-hidden="true"/><span className="motion-pointer-ring" ref={ringRef} aria-hidden="true"/></>;
}

const glyphLabels: Record<string, [string, string, string, string]> = {
  symptomscope: ["symptoms", "models", "RAG", "guidance"],
  khatabox: ["stock", "retail", "updates", "stores"],
  intellimoney: ["receipt", "categorise", "copilot", "insight"],
  supplychain: ["orders", "KPIs", "regions", "dashboard"],
  churnsight: ["records", "XGBoost", "SHAP", "risk"],
};

function ProjectGlyph({ kind }: { kind: string }) {
  const labels = glyphLabels[kind] ?? glyphLabels.symptomscope;
  return <svg className="glyph" viewBox="0 0 430 250" role="img" aria-label={`${labels.join(" to ")} system diagram`}>
    <path className="glyph-track" d="M50 122H145L215 65H300L375 122M215 65V180H300L375 122"/>
    <path className="glyph-signal" d="M50 122H145L215 65H300L375 122"/>
    {[50, 145, 215, 300, 375].map((x, i) => <g key={x}><circle cx={x} cy={i === 2 ? 65 : 122} r="7"/><text x={x} y={i === 2 ? 43 : 151} textAnchor="middle">{labels[Math.min(i, 3)]}</text></g>)}
    <circle className="glyph-pulse" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M50 122H145L215 65H300L375 122"/></circle>
  </svg>;
}

export function SiteHome() {
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState("");
  const [skillFocus, setSkillFocus] = useState("");
  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    const updateProgress = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? window.scrollY / max : 0));
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let observer: IntersectionObserver | undefined;
    if (!reduceMotion.matches && "IntersectionObserver" in window) {
      document.documentElement.classList.add("reveal-ready");
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      }, { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 });
      nodes.forEach((node) => observer?.observe(node));
    }
    updateTime(); updateProgress();
    const timer = window.setInterval(updateTime, 30_000);
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => { window.clearInterval(timer); window.removeEventListener("scroll", updateProgress); observer?.disconnect(); document.documentElement.classList.remove("reveal-ready"); };
  }, []);

  const visibleProjects = useMemo(() => filter
    ? projects.filter((project) => project.stack.some((tech) => tech.toLowerCase() === filter.toLowerCase()))
    : projects, [filter]);
  const evidenceProjects = projects.filter((project) => project.stack.some((tech) => tech.toLowerCase() === skillFocus.toLowerCase()));
  const goToWork = () => document.querySelector("#work")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });

  return <>
    <PointerFollower />
    <main id="content">
      <section className="container hero" id="top">
        <div className="hero-copy-wrap">
          <div className="hero-copy-block">
            <p className="eyebrow">{`// ${profile.role} · class of 2027 · ${profile.location}`}</p>
            <h1>{siteCopy.hero.headline[0]}<br/><em>{siteCopy.hero.headline[1]}</em></h1>
            <p className="hero-copy">{siteCopy.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore the work <ArrowDownRight size={17} aria-hidden="true"/></a>
              <Link className="button button-ghost" href="/resume">Résumé <ArrowUpRight size={16} aria-hidden="true"/></Link>
            </div>
          </div>
          <figure className="hero-portrait" aria-label="Portrait of Harkirat Singh">
            <div className="portrait-paper" />
            <Image src="/portrait.jpg" alt="Harkirat Singh outdoors in a white shirt" width={264} height={400} priority />
            <span className="portrait-caption mono">Harkirat Singh · Patiala</span>
            <svg className="portrait-doodle" viewBox="0 0 260 450" aria-hidden="true"><path d="M18 400C80 340 4 300 58 258s145 50 157-25-105-69-78-131 98-51 100-86"/><path d="m215 14 22 2-7 20"/></svg>
            <span className="portrait-square" aria-hidden="true" />
          </figure>
        </div>
        <div className="hero-stats" aria-label="Selected résumé facts">{stats.map((item) => <div className="stat reveal" key={item.label}><strong>{item.value}</strong><span className="mono">{item.label}</span></div>)}</div>
        <a className="scroll-cue mono" href="#about"><ArrowDown size={15} aria-hidden="true"/> scroll to explore</a>
      </section>

      <section className="section" id="about"><div className="container">
        <SectionHeading {...siteCopy.sections.about}/>
        <div className="bento">
          <article className="panel thesis reveal"><span className="mono accent">the through-line</span><h3>Notice the signal. Represent it clearly. Make the next decision inspectable.</h3><p>That pattern connects my work in proctoring, mobile-banking authentication, health guidance, retail operations, and customer analytics. I’m studying Computer Engineering at TIET while building across software, AI, and data.</p></article>
          <article className="panel now reveal"><span className="mono">recent experience</span><h3>{experience[0].role}, {experience[0].org}</h3><p>One month in August 2026, working on exam proctoring and abnormal-activity detection.</p></article>
          <article className="panel study reveal"><span className="mono">studying</span><h3>{education.degree}</h3><p>{education.institution} · {education.years}</p><p className="accent">CGPA {education.cgpa}</p><div className="meter" role="img" aria-label="CGPA 7.23 out of 10"><i/></div></article>
          <article className="panel toolbelt reveal"><span className="mono">toolbelt</span><div className="chips">{featuredSkills.map((skill) => <span key={skill} className="chip">{skill}</span>)}</div></article>
          <article className="panel leadership reveal"><span className="mono">outside the coursework</span><h3>{leadership[0].role} · {leadership[0].org}</h3><p>{leadership[0].description}</p><h3 className="leadership-secondary">{leadership[1].role} · {leadership[1].org}</h3><p>{leadership[1].description}</p></article>
        </div>
      </div></section>

      <section className="section" id="capabilities"><div className="container">
        <SectionHeading {...siteCopy.sections.capabilities}/>
        <p className="intro">Select a technology to find projects that list it in their stack. The full skill list comes from both résumés.</p>
        <div className="cluster-grid">{skills.map((cluster, groupIndex) => <article className={`panel cluster reveal${skillFocus && cluster.items.includes(skillFocus) ? " cluster-active" : ""}`} key={cluster.name} style={{ "--reveal-order": groupIndex } as React.CSSProperties}>
          <h3>{cluster.name}<span className="mono">{String(cluster.items.length).padStart(2, "0")}</span></h3>
          <div className="chips">{cluster.items.map((skill) => <button key={skill} className="skill-button" aria-pressed={filter === skill} aria-describedby={skillFocus === skill ? "skill-evidence" : undefined} onMouseEnter={() => setSkillFocus(skill)} onMouseLeave={() => setSkillFocus("")} onFocus={() => setSkillFocus(skill)} onBlur={() => setSkillFocus("")} onClick={() => { setFilter(filter === skill ? "" : skill); goToWork(); }}>{skill}</button>)}</div>
        </article>)}</div>
        {skillFocus && <p className="panel skill-evidence reveal is-visible" id="skill-evidence"><span className="mono">{skillFocus} · projects</span><br/>{evidenceProjects.length ? evidenceProjects.map((project) => project.title).join(" · ") : "Listed as a skill in the résumé."}</p>}
        <ul className="sr-only">{skills.flatMap((cluster) => cluster.items.map((skill) => <li key={skill}>{cluster.name}: {skill}</li>))}</ul>
      </div></section>

      <section className="section" id="experience"><div className="container">
        <SectionHeading {...siteCopy.sections.experience}/>
        <div className="timeline">{experience.map((item, i) => <details className="timeline-item reveal" key={item.role} open={i === 0}>
          <summary><span className="mono timeline-date">{item.date}</span><span><h3>{item.role} <span className="accent">— {item.org}</span></h3><span className="summary-copy">{item.summary}</span></span><span className="timeline-plus" aria-hidden="true">+</span></summary>
          <div className="timeline-body"><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="chips">{item.stack.map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div></div>
        </details>)}</div>
      </div></section>

      <section className="section" id="work"><div className="container">
        <SectionHeading {...siteCopy.sections.work}/>
        {filter && <p className="filter-status mono">Showing projects with {filter}<button className="text-button" onClick={() => setFilter("")}>clear filter ×</button></p>}
        <div className="project-list">{visibleProjects.map((project, i) => <article className={`panel project-card reveal project-${project.glyph}`} key={project.slug} style={{ "--reveal-order": i } as React.CSSProperties}>
          <div className="project-copy"><span className="mono project-index">{project.index} <span aria-hidden="true">/</span> {project.status ?? "project"}</span><h3>{project.title}</h3><p>{project.thesis}</p>
            <div className="metric-row">{project.outcomes.map((item) => <span className="metric" key={item.label}><b>{item.value}</b><small>{item.label}</small></span>)}</div>
            <div className="chips">{project.stack.slice(0, 6).map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div>
            <p className="project-cta"><Link href={`/work/${project.slug}`}>Read the case <ArrowUpRight size={16} aria-hidden="true"/></Link></p>
          </div><div className="project-visual"><ProjectGlyph kind={project.glyph}/></div>
        </article>)}</div>
        {filter && visibleProjects.length === 0 && <p className="panel empty-state">No project lists this exact stack item. <button className="text-button" onClick={() => setFilter("")}>Clear the filter</button></p>}
      </div></section>

      <section className="section" id="recognition"><div className="container">
        <SectionHeading {...siteCopy.sections.recognition}/>
        <div className="recognition-grid">
          <div className="recognition-column"><p className="mono">certifications</p><ul className="recognition-list">{certifications.map((item) => <li className="reveal" key={item}><span>{item}</span><ArrowUpRight size={16} aria-hidden="true"/></li>)}</ul></div>
          <div className="recognition-column"><p className="mono">education</p><ul className="recognition-list"><li className="reveal"><span><b>{education.institution}</b><br/>{education.degree} · {education.years}<br/>CGPA {education.cgpa}</span><span className="mono">TIET</span></li></ul><details className="secondary-education"><summary className="mono">Secondary education <span aria-hidden="true">＋</span></summary><ul className="recognition-list">{education.secondary.map((item) => <li key={item}>{item}</li>)}</ul></details></div>
        </div>
      </div></section>

      <section className="section contact-section" id="contact"><div className="container">
        <p className="mono accent contact-kicker">06 / contact</p><h2 className="contact-title">{siteCopy.contact.headline}</h2><p className="intro">{siteCopy.contact.description}</p>
        <div className="contact-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><CopyAction value={profile.email}>Copy email</CopyAction></div>
        <div className="contact-row"><a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a><CopyAction value={profile.phone}>Copy number</CopyAction></div>
        <div className="contact-row social-row"><span><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={15} aria-hidden="true"/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={15} aria-hidden="true"/></a></span><span className="mono">Patiala · {time || "--:--"} IST</span></div>
        <div className="contact-row"><Link href="/resume">Résumé options <ArrowUpRight size={16} aria-hidden="true"/></Link><a href={`mailto:${profile.email}`}>Write an email <ArrowUpRight size={16} aria-hidden="true"/></a></div>
      </div></section>
    </main>
    <footer className="container footer"><span>© 2026 Harkirat Singh</span><span className="footer-note">Built with Next.js · designed with intention</span><a href="#top">back to top ↑</a></footer>
  </>;
}
