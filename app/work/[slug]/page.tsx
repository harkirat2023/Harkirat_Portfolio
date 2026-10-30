import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const project = projects.find((entry) => entry.slug === slug); return project ? { title: project.title, description: project.thesis, openGraph: { title: project.title, description: project.thesis, images: [`/api/og?title=${encodeURIComponent(project.title)}&stack=${encodeURIComponent(project.stack.slice(0,3).join(" · "))}`] } } : {}; }

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params; const index = projects.findIndex((project) => project.slug === slug); const project = projects[index]; if (!project) notFound();
  const previous = projects[(index + projects.length - 1) % projects.length]; const next = projects[(index + 1) % projects.length];
  return <><SiteHeader/><main id="content" className="container case-wrap"><Link className="mono accent" href="/#work">← all work</Link><p className="mono" style={{ marginTop: "var(--space-8)" }}>case study · {project.index} / 05</p><h1 className="display">{project.title}</h1><p className="intro">{project.thesis}</p><div className="chips" style={{ marginTop: "var(--space-6)" }}>{project.stack.map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div><p className="mono muted" style={{ marginTop: "var(--space-4)" }}>{project.links?.live ? <a href={project.links.live} target="_blank" rel="noreferrer">Live project ↗</a> : <span>private repo</span>}　{project.links?.github ? <a href={project.links.github} target="_blank" rel="noreferrer">GitHub ↗</a> : <span>private repo</span>}</p>
    <section className="case-section"><p className="mono accent">outcomes</p><div className="metric-row">{project.outcomes.map((item) => <span className="metric" key={item.label}><b className="accent">{item.value}</b> {item.label}</span>)}</div></section>
    <section className="case-section"><p className="mono accent">problem</p>{project.problem.map((paragraph) => <p className="intro" key={paragraph}>{paragraph}</p>)}</section>
    <section className="case-section"><p className="mono accent">architecture</p><figure><div className="architecture">{project.architecture.layers.flatMap((layer) => layer.nodes.map((node) => <div className="arch-node" key={node.id} tabIndex={0} title={node.note} aria-label={`${node.label}: ${node.note}`}><span className="mono">{layer.name}</span><br/>{node.label}</div>))}</div><figcaption className="mono muted" style={{ marginTop: "var(--space-4)" }}>System path from input through representation to an inspectable result.</figcaption></figure></section>
    <section className="case-section"><p className="mono accent">decisions · why · trade-offs</p>{project.decisions.map((decision) => <article className="decision" key={decision.decision}><h2>{decision.decision}</h2><div><p>{decision.why}</p><p className="muted"><b>Trade-off accepted:</b> {decision.tradeoff}</p></div></article>)}</section>
    <section className="case-section"><p className="mono accent">result</p><ul>{project.result.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="case-section"><p className="mono accent">if I kept going…</p><ul>{project.next.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <nav className="case-section" aria-label="Case studies"><Link href={`/work/${previous.slug}`}>← {previous.title}</Link><Link style={{ float: "right" }} href={`/work/${next.slug}`}>{next.title} →</Link><p><Link className="accent" href="/#work">Back to all work</Link></p></nav></main><footer className="container footer"><span>© 2026 Harkirat Singh</span><Link href="/resume">Résumé ↗</Link><Link href="/#top">back to top ↑</Link></footer></>;
}
