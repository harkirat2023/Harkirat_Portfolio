"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowUpRight, ArrowRight, Check, Copy, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { certifications, education, experience, featuredSkills, leadership, profile, projects, skills, siteCopy, stats } from "@/content/site";

function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return <div className="section-head reveal rv-up"><div className="section-index mono"><span className="accent">{index}</span><span aria-hidden="true"> / </span>{kicker}</div><h2 className="section-heading">{title}</h2></div>;
}

function HeadlineDropIn() {
  const first = siteCopy.hero.headline[0];
  const second = siteCopy.hero.headline[1];
  const [typedLength, setTypedLength] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTypedLength(second.length); return; }
    let index = 0;
    let timer = 0;
    const typeNext = () => {
      index += 1;
      setTypedLength(index);
      if (index < second.length) timer = window.setTimeout(typeNext, 68);
    };
    timer = window.setTimeout(typeNext, 540);
    return () => window.clearTimeout(timer);
  }, [second]);
  const line = (value: string) => <span className="headline-line" aria-hidden="true">{Array.from(value).map((letter, index) => <span key={`${letter}-${index}`} style={{ "--letter-delay": `${180 + index * 45}ms` } as React.CSSProperties}>{letter === " " ? "\u00a0" : letter}</span>)}</span>;
  return <h1 aria-label={`${first} ${second}`}>{line(first)}<br/><em><span className={`typed-phrase${typedLength < second.length ? " is-typing" : ""}`} aria-hidden="true">{second.slice(0, typedLength)}</span></em></h1>;
}

function SignalLoader() {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(false); return; }
    const started = performance.now();
    let frame = 0;
    let closeTimer = 0;
    const tick = (now: number) => {
      const next = Math.min(100, ((now - started) / 850) * 100);
      setProgress(next);
      if (next < 100) frame = window.requestAnimationFrame(tick);
      else closeTimer = window.setTimeout(() => { setClosing(true); closeTimer = window.setTimeout(() => setVisible(false), 760); }, 120);
    };
    frame = window.requestAnimationFrame(tick);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(closeTimer); };
  }, []);
  if (!visible) return null;
  return <div className={`signal-loader${closing ? " is-closing" : ""}`} aria-hidden="true"><div className="signal-loader-box"><span className="signal-loader-mark">HS</span><span className="signal-loader-name mono">HARKIRAT SINGH · SIGNAL PORTFOLIO</span><span className="mono">loading signal…</span><div className="signal-loader-meter"><i style={{ width: `${progress}%` }}/></div></div></div>;
}

function Oscilloscope() {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    let frame = 0;
    let time = 0;
    const draw = () => {
      time += .04;
      let pathData = "M0 45";
      for (let x = 0; x <= 600; x += 6) {
        const y = 45 + Math.sin(x * .03 + time) * 18 * Math.sin(time * .5 + x * .004) + Math.sin(x * .11 + time * 2) * 6;
        pathData += `L${x} ${y.toFixed(1)}`;
      }
      path.setAttribute("d", pathData);
      frame = window.requestAnimationFrame(draw);
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) path.setAttribute("d", "M0 45 C60 40 80 50 120 45 S180 40 240 45 S300 50 360 45 S420 40 480 45 S540 50 600 45");
    else frame = window.requestAnimationFrame(draw);
    return () => { if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return <div className="oscilloscope" aria-hidden="true"><svg viewBox="0 0 600 90" preserveAspectRatio="none"><path ref={pathRef} d="M0 45 C60 40 80 50 120 45 S180 40 240 45 S300 50 360 45 S420 40 480 45 S540 50 600 45"/></svg></div>;
}

function LCDStat({ value, label, order }: { value: string; label: string; order: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const end = Number(match[1]);
    const suffix = match[2];
    const finalValue = (number: number) => `${String(number).padStart(match[1].length, "0")}${suffix}`;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !ref.current || !("IntersectionObserver" in window)) { setDisplay(value); return; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 1500);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(finalValue(Math.round(end * eased)));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: .35 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); if (frame) window.cancelAnimationFrame(frame); };
  }, [value]);
  return <div ref={ref} className="stat lcd reveal" style={{ "--reveal-order": order } as React.CSSProperties}><strong>{display}</strong><span className="mono">{label}</span></div>;
}

function ToastNotice() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    let timer = 0;
    const onToast = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(""), 1900);
    };
    window.addEventListener("portfolio:toast", onToast);
    return () => { window.removeEventListener("portfolio:toast", onToast); window.clearTimeout(timer); };
  }, []);
  return <div className={`portfolio-toast${message ? " is-visible" : ""}`} role="status" aria-live="polite">{message}</div>;
}

function CopyAction({ value, children }: { value: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    let success = false;
    try { await navigator.clipboard.writeText(value); success = true; }
    catch {
      const area = document.createElement("textarea");
      area.value = value; area.setAttribute("readonly", "");
      area.style.position = "fixed"; area.style.opacity = "0"; document.body.append(area);
      try { area.select(); success = document.execCommand("copy"); }
      catch { success = false; }
      finally { area.remove(); }
    }
    setCopied(success); window.dispatchEvent(new CustomEvent("portfolio:toast", { detail: success ? "Copied to clipboard ✓" : "Copy failed — select the text instead" }));
    window.setTimeout(() => setCopied(false), 1600);
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
      const nextHovering = event.target instanceof Element && Boolean(event.target.closest("a, button, summary, [role='button'], .project-card, .panel"));
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>(".panel:not(.skill-evidence)") : null;
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

const projectCoverTitles: Record<string, [string, string]> = {
  symptomscope: ["SYMPTOM", "SCOPE AI"],
  khatabox: ["KHATA", "BOX"],
  intellimoney: ["INTELLI", "MONEY"],
  supplychain: ["SUPPLY CHAIN", "CONTROL TOWER"],
  churnsight: ["CHURN", "SIGHT"],
};

export function SiteHome() {
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState("");
  const [skillFocus, setSkillFocus] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredHasChanged = useRef(false);
  const featuredProject = projects[featuredIndex] ?? projects[0];
  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    let progressFrame = 0;
    const updateProgress = () => {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(() => {
      progressFrame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? window.scrollY / max : 0));
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        for (const node of document.querySelectorAll<HTMLElement>("[data-parallax]")) {
          const speed = Number(node.dataset.parallax ?? 0);
          node.style.setProperty("--parallax-y", `${-window.scrollY * speed}px`);
        }
      }
      const timeline = document.querySelector<HTMLElement>(".timeline");
      if (timeline) {
        const bounds = timeline.getBoundingClientRect();
        const fill = Math.max(0, Math.min(bounds.height, window.innerHeight * .78 - bounds.top));
        timeline.style.setProperty("--timeline-fill", `${fill}px`);
      }
      });
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
    return () => { window.clearInterval(timer); window.removeEventListener("scroll", updateProgress); if (progressFrame) window.cancelAnimationFrame(progressFrame); observer?.disconnect(); document.documentElement.classList.remove("reveal-ready"); };
  }, []);

  useEffect(() => {
    if (featuredIndex === 0 && !featuredHasChanged.current) return;
    featuredHasChanged.current = true;
    document.querySelectorAll<HTMLElement>(".featured-section .feature-cover, .featured-section .featured-copy").forEach((node) => node.classList.add("is-visible"));
  }, [featuredIndex]);

  const evidenceProjects = projects.filter((project) => project.stack.some((tech) => tech.toLowerCase() === skillFocus.toLowerCase()));
  const goToWork = () => document.querySelector("#work")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  const chooseProjectSkill = (skill: string) => {
    const nextFilter = filter === skill ? "" : skill;
    if (nextFilter) {
      const matchingProject = projects.findIndex((project) => project.stack.some((tech) => tech.toLowerCase() === nextFilter.toLowerCase()));
      if (matchingProject < 0) { setFilter(""); goToWork(); return; }
      setFeaturedIndex(matchingProject);
    }
    setFilter(nextFilter);
    goToWork();
  };

  return <>
    <SignalLoader />
    <PointerFollower />
    <ToastNotice />
    <main id="content" className="portfolio-main">
      <svg className="continuity-thread" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M865 0 C845 32 920 48 855 76 C790 104 720 78 710 116 C700 154 800 170 760 205 C720 240 530 180 510 231 C490 282 680 304 645 352 C610 400 360 340 395 416 C430 492 690 490 655 550 C620 610 350 588 385 657 C420 726 735 708 700 778 C665 848 450 817 475 884 C500 951 670 942 630 1000"/></svg>
      <section className="container hero" id="top">
        <p className="eyebrow hero-eyebrow">{`// ${profile.role} · class of 2027 · ${profile.location}`}</p>
        <div className="hero-copy-wrap">
          <div className="hero-copy-block">
            <HeadlineDropIn />
            <p className="hero-highlight"><span>{siteCopy.hero.highlight}</span></p>
            <p className="hero-copy">{siteCopy.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore the work <ArrowDownRight size={17} aria-hidden="true"/></a>
              <Link className="button button-ghost" href="/resume">Résumé <ArrowUpRight size={16} aria-hidden="true"/></Link>
            </div>
            <Oscilloscope />
          </div>
          <figure className="hero-portrait" data-parallax="0.04" aria-label="Portrait of Harkirat Singh">
            <div className="portrait-paper" />
            <Image src="/assets/closeup.jpg" alt="Harkirat Singh standing outdoors in a white shirt" width={267} height={320} priority unoptimized />
            <span className="portrait-caption mono">Harkirat Singh · Patiala</span>
            <svg className="portrait-doodle" viewBox="0 0 260 450" aria-hidden="true"><path d="M18 400C80 340 4 300 58 258s145 50 157-25-105-69-78-131 98-51 100-86"/><path d="m215 14 22 2-7 20"/></svg>
            <span className="portrait-square" aria-hidden="true" />
          </figure>
        </div>
        <div className="hero-stats" aria-label="Selected résumé facts">{stats.map((item, index) => <LCDStat key={item.label} value={item.value} label={item.label} order={index}/>)}</div>
        <a className="scroll-cue mono" href="#work"><span className="scroll-cue-square"><ArrowDown size={18} aria-hidden="true"/></span> scroll down</a>
      </section>

      <div className="ticker-belt" aria-hidden="true"><div>{[0, 1].map((copy) => <div className="ticker-group" key={copy}><span>BUILD WHAT MATTERS</span><span>READ THE SIGNAL</span><span>MAKE IT USEFUL</span></div>)}</div></div>

      <section className="section featured-section" id="work"><div className="container">
        <div className="feature-watermark" aria-hidden="true">{featuredProject.title}</div>
        <button className="feature-carousel-arrow feature-carousel-previous" type="button" aria-label={`Previous project, ${featuredProject.title}`} aria-controls="featured-project" onClick={() => setFeaturedIndex((index) => (index - 1 + projects.length) % projects.length)}><ArrowLeft size={22} aria-hidden="true"/></button>
        <button className="feature-carousel-arrow feature-carousel-next" type="button" aria-label={`Next project, ${featuredProject.title}`} aria-controls="featured-project" onClick={() => setFeaturedIndex((index) => (index + 1) % projects.length)}><ArrowRight size={22} aria-hidden="true"/></button>
        <div className="featured-layout">
          <div className={`feature-cover feature-cover-${featuredProject.slug} reveal`} key={`cover-${featuredProject.slug}`} aria-hidden="true">
            <span className="feature-cover-top mono">HARKIRAT SINGH · SELECTED WORK</span>
            <div className="feature-cover-mark" data-parallax="0.075" aria-hidden="true">{featuredProject.index}<span>✳</span></div>
            <div className="feature-cover-core">
              <span className="mono">{featuredProject.category}</span>
              <strong><span>{projectCoverTitles[featuredProject.glyph][0]}</span><span>{projectCoverTitles[featuredProject.glyph][1]}</span></strong>
              <div className="feature-models">{featuredProject.outcomes.slice(0, 3).map((item) => <span key={item.label}>{item.value}</span>)}</div>
            </div>
            <svg className="cover-scribble" viewBox="0 0 500 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 140C90 20 135 185 215 95S325 30 360 110s90 20 140-50"/></svg>
            <span className="feature-cover-bottom mono">{featuredProject.index} / 05 · {featuredProject.status ?? "PROJECT STUDY"}</span>
          </div>
          <div className="featured-copy reveal" id="featured-project" key={`copy-${featuredProject.slug}`}>
            <span className="sr-only" aria-live="polite">Featured project: {featuredProject.title}</span>
            <span className="mono accent">{featuredProject.index} / 05 · {featuredProject.status ?? "FEATURED PROJECT"}</span>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.thesis}</p>
            <p className="featured-note">{featuredProject.result[0]}</p>
            <div className="metric-row featured-metrics">{featuredProject.outcomes.map((item) => <span className="metric" key={item.label}><b>{item.value}</b><small>{item.label}</small></span>)}</div>
            <div className="chips">{featuredProject.stack.slice(0, 5).map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div>
            <Link className="button button-primary feature-action" href={`/work/${featuredProject.slug}`}>{siteCopy.featured.action}<ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
        </div>
      </div></section>

      <section className="section" id="about"><div className="container">
        <SectionHeading {...siteCopy.sections.about}/>
        <div className="bento">
          <article className="panel thesis reveal" style={{ "--reveal-order": 0 } as React.CSSProperties}><span className="mono accent">the through-line</span><h3>Notice the signal. Represent it clearly. Make the next decision inspectable.</h3><p>It started with a simple habit: whenever a system gave an answer, I wanted to know why. That curiosity took me from exam proctoring and mobile-banking authentication to health guidance, retail systems, and analytics. Different problems, the same question: how can a complex input become a next step someone can trust?</p></article>
          <article className="panel now reveal rv-right" style={{ "--reveal-order": 1 } as React.CSSProperties}><span className="mono">recent experience</span><h3>{experience[0].role}, {experience[0].org}</h3><p>One month in August 2026, working on exam proctoring and abnormal-activity detection.</p></article>
          <article className="panel study reveal rv-flip" style={{ "--reveal-order": 2 } as React.CSSProperties}><span className="mono">studying</span><h3>{education.degree}</h3><p>{education.institution} · {education.years}</p><p className="accent">CGPA {education.cgpa}</p><div className="meter" role="img" aria-label="CGPA 7.23 out of 10"><i/></div></article>
          <article className="panel toolbelt reveal rv-left" style={{ "--reveal-order": 3 } as React.CSSProperties}><span className="mono">toolbelt</span><div className="chips">{featuredSkills.map((skill) => <span key={skill} className="chip">{skill}</span>)}</div></article>
          <article className="panel leadership reveal rv-right" style={{ "--reveal-order": 4 } as React.CSSProperties}><span className="mono">outside the coursework</span><h3>{leadership[0].role} · {leadership[0].org}</h3><p>{leadership[0].description}</p><h3 className="leadership-secondary">{leadership[1].role} · {leadership[1].org}</h3><p>{leadership[1].description}</p></article>
        </div>
      </div></section>

      <section className="section" id="capabilities"><div className="container">
        <SectionHeading {...siteCopy.sections.capabilities}/>
        <p className="intro">Explore the tools and strengths I bring to the work. Select a technology to find related projects.</p>
        <div className="cluster-grid">{skills.map((cluster, groupIndex) => <article className={`panel cluster reveal rv-flip${cluster.name === "Professional" ? " cluster-professional" : ""}${skillFocus && cluster.items.includes(skillFocus) ? " cluster-active" : ""}`} key={cluster.name} style={{ "--reveal-order": groupIndex } as React.CSSProperties}>
          <h3>{cluster.name}<span className="mono">{String(cluster.items.length).padStart(2, "0")}</span></h3>
          <div className="chips">{cluster.items.map((skill) => <button key={skill} className={`skill-button${cluster.name === "Professional" && ["Analytical problem solving", "Communication", "Adaptability"].includes(skill) ? " skill-button-strength" : ""}`} aria-pressed={filter === skill} aria-describedby={skillFocus === skill && evidenceProjects.length > 0 ? "skill-evidence" : undefined} onMouseEnter={() => setSkillFocus(skill)} onMouseLeave={() => setSkillFocus("")} onFocus={() => setSkillFocus(skill)} onBlur={() => setSkillFocus("")} onClick={() => chooseProjectSkill(skill)}>{skill}</button>)}</div>
        </article>)}</div>
        {skillFocus && evidenceProjects.length > 0 && <p className="panel skill-evidence reveal is-visible" id="skill-evidence"><span className="mono">{skillFocus} · projects</span><br/>{evidenceProjects.map((project) => project.title).join(" · ")}</p>}
        <ul className="sr-only">{skills.flatMap((cluster) => cluster.items.map((skill) => <li key={skill}>{cluster.name}: {skill}</li>))}</ul>
      </div></section>

      <section className="section" id="experience"><div className="container">
        <SectionHeading {...siteCopy.sections.experience}/>
        <div className="timeline">{experience.map((item, i) => <details className="timeline-item reveal rv-left" key={item.role} open={i === 0} style={{ "--reveal-order": i } as React.CSSProperties}>
          <summary><span className="mono timeline-date">{item.date}</span><span><h3>{item.role} <span className="accent">— {item.org}</span></h3><span className="summary-copy">{item.summary}</span></span><span className="timeline-plus" aria-hidden="true">+</span></summary>
          <div className="timeline-unfold"><div className="timeline-body"><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="chips">{item.stack.map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div></div></div>
        </details>)}</div>
      </div></section>

      <section className="section" id="recognition"><div className="container">
        <SectionHeading {...siteCopy.sections.recognition}/>
        <div className="recognition-grid">
          <article className="recognition-column panel reveal rv-left" style={{ "--reveal-order": 0 } as React.CSSProperties}><p className="mono">certifications</p><ul className="recognition-list">{certifications.map((item) => <li className="reveal" key={item}><span>{item}</span><ArrowUpRight size={16} aria-hidden="true"/></li>)}</ul></article>
          <article className="recognition-column panel reveal rv-right" style={{ "--reveal-order": 1 } as React.CSSProperties}><p className="mono">education</p><ul className="recognition-list"><li className="reveal"><span><b>{education.institution}</b><br/>{education.degree} · {education.years}<br/>CGPA {education.cgpa}</span><span className="mono">TIET</span></li></ul><details className="secondary-education"><summary className="mono">Secondary education <span aria-hidden="true">＋</span></summary><div className="education-unfold"><ul className="recognition-list">{education.secondary.map((item) => <li key={item}>{item}</li>)}</ul></div></details></article>
        </div>
      </div></section>

      <section className="section contact-section" id="contact"><span className="contact-watermark" data-parallax="0.08" aria-hidden="true">HS</span><div className="container">
        <p className="mono accent contact-kicker">07 / contact</p><h2 className="contact-title">{siteCopy.contact.headline}</h2><p className="intro">{siteCopy.contact.description}</p>
        <div className="contact-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><CopyAction value={profile.email}>Copy email</CopyAction></div>
        <div className="contact-row"><a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a><CopyAction value={profile.phone}>Copy number</CopyAction></div>
        <div className="contact-row social-row"><span className="social-chips"><a className="social-chip" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} aria-hidden="true"/><span>LinkedIn</span><ExternalLink size={13} aria-hidden="true"/></a><a className="social-chip" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} aria-hidden="true"/><span>GitHub</span><ExternalLink size={13} aria-hidden="true"/></a><a className="social-chip" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} aria-hidden="true"/><span>Email</span><ArrowUpRight size={13} aria-hidden="true"/></a></span><span className="mono">Patiala · {time || "--:--"} IST</span></div>
        <div className="contact-row"><Link href="/resume">Résumé options <ArrowUpRight size={16} aria-hidden="true"/></Link><a href={`mailto:${profile.email}`}>Write an email <ArrowUpRight size={16} aria-hidden="true"/></a></div>
      </div></section>
    </main>
    <footer className="container footer"><span>© 2026 Harkirat Singh</span><nav className="footer-nav" aria-label="Footer"><a href="#top">Home</a><a href="#work">Selected work</a><a href="#about">About me</a><a href="#contact">Contact me</a></nav><span className="footer-note">Built with Next.js · designed with intention</span><span className="footer-clock"><i className="clock-led" aria-hidden="true"/>Patiala · {time || "--:--"} IST</span><a href="#top">back to top ↑</a></footer>
  </>;
}
