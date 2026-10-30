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

  return <>
    <SiteHeader/>
    <main id="content" className="container case-wrap">
      <Link className="mono accent" href="/#work"><ArrowLeft size={14} aria-hidden="true"/> all work</Link>
      <p className="mono">case study · {project.index} / 05{project.status ? ` · ${project.status}` : ""}</p>
      <h1>{project.title}</h1>
      <p className="intro">{project.thesis}</p>
      <div className="chips case-stack">{project.stack.map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div>
      <p className="mono case-links">
        {project.links?.live && <a href={project.links.live} target="_blank" rel="noreferrer">Project <ArrowUpRight size={14} aria-hidden="true"/></a>}
        {project.links?.github && <a href={project.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true"/></a>}
        {!project.links?.live && !project.links?.github && <span>Project links not provided</span>}
      </p>
      <section className="case-section">
        <p className="mono">Selected facts</p>
        <div className="metric-row">{project.outcomes.map((item) => <span className="metric" key={item.label}><b>{item.value}</b><small>{item.label}</small></span>)}</div>
      </section>
      <section className="case-section">
        <p className="mono">Overview</p>
        {project.problem.map((paragraph) => <p className="intro" key={paragraph}>{paragraph}</p>)}
      </section>
      <section className="case-section">
        <p className="mono">Technologies and components</p>
        <figure>
          <div className="architecture">{project.architecture.layers.map((layer) => <div className="architecture-layer" key={layer.name}>
            <p className="mono">{layer.name}</p>
            {layer.nodes.map((node) => <div className="arch-node" key={node.id} tabIndex={0} title={node.note} aria-label={`${node.label}: ${node.note}`}><b>{node.label}</b><span>{node.note}</span></div>)}
          </div>)}</div>
          <figcaption className="mono case-caption">Technologies and methods listed in the résumé; the diagram groups them for readability.</figcaption>
        </figure>
      </section>
      <section className="case-section">
        <p className="mono">What I built</p>
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
