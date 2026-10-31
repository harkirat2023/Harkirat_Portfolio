import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  return project ? {
    title: project.title,
    description: project.thesis,
    openGraph: {
      title: project.title,
      description: project.thesis,
      images: [`/api/og?title=${encodeURIComponent(project.title)}&stack=${encodeURIComponent(project.stack.slice(0, 3).join(" · "))}`],
    },
  } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const watermark = project.category.split(" · ")[0];

  return <>
    <SiteHeader/>
    <main id="content" className="container case-wrap">
      <span className="case-watermark" aria-hidden="true">{watermark}</span>
      <svg className="case-sweep" viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-80 245 C180 120 320 390 540 265 S910 145 1280 300 M-60 700 C190 580 360 810 630 670 S1000 560 1280 710" pathLength="1"/></svg>
      <Link className="mono accent case-back" href="/#work"><ArrowLeft size={14} aria-hidden="true"/> all work</Link>
      <header className={`case-hero case-hero-${project.glyph}`}>
        <span className="case-hero-index mono">{project.index} / 05 · {project.status ?? "PROJECT STUDY"}</span>
        <span className="case-hero-category mono">{project.category}</span>
        <h1>{project.title}</h1>
        <p>{project.thesis}</p>
        <svg className="case-hero-wave" viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100 C120 35 180 145 300 90 S480 32 590 91 S770 145 1000 55" pathLength="1"/></svg>
      </header>
      <div className="case-overview">
        <div className="chips case-stack">{project.stack.map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div>
        <p className="mono case-links">
          {project.links?.live && <a href={project.links.live} target="_blank" rel="noreferrer">Project <ArrowUpRight size={14} aria-hidden="true"/></a>}
          {project.links?.github && <a href={project.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true"/></a>}
          {!project.links?.live && !project.links?.github && <span>Project links not provided</span>}
        </p>
      </div>
      <section className="case-section">
        <h2 className="case-section-title">Selected facts</h2>
        <div className="metric-row">{project.outcomes.map((item) => <span className="metric" key={item.label}><b>{item.value}</b><small>{item.label}</small></span>)}</div>
      </section>
      <section className="case-section">
        <h2 className="case-section-title">Overview</h2>
        {project.problem.map((paragraph) => <p className="case-description" key={paragraph}>{paragraph}</p>)}
      </section>
      <section className="case-section">
        <h2 className="case-section-title">Technologies and components</h2>
        <figure>
          <div className="architecture">{project.architecture.layers.map((layer) => <div className="architecture-layer" key={layer.name}>
            <p className="mono">{layer.name}</p>
            {layer.nodes.map((node) => <div className="arch-node" key={node.id} tabIndex={0} title={node.note} aria-label={`${node.label}: ${node.note}`}><b>{node.label}</b><span>{node.note}</span></div>)}
          </div>)}</div>
          <figcaption className="mono case-caption">Technologies and methods listed in the résumé; the diagram groups them for readability.</figcaption>
        </figure>
      </section>
      <section className="case-section">
        <h2 className="case-section-title">What I built</h2>
        <ul className="case-results">{project.result.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <nav className="case-section case-nav" aria-label="Case studies">
        <Link href={`/work/${previous.slug}`}><span className="mono">previous</span><b>← {previous.title}</b></Link>
        <Link href={`/work/${next.slug}`}><span className="mono">next</span><b>{next.title} →</b></Link>
        <Link className="back-to-work" href="/#work">Back to all work</Link>
      </nav>
    </main>
    <footer className="container footer"><span>© 2026 Harkirat Singh</span><Link href="/resume">Résumé ↗</Link><Link href="/#top">back to top ↑</Link></footer>
  </>;
}
