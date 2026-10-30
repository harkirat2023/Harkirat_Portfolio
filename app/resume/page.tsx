import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import { certifications, education, experience, leadership, profile, projects, skills } from "@/content/site";

export const metadata: Metadata = { title: "Résumé", robots: { index: true, follow: true } };

export default function ResumePage() {
  return <main id="content" className="resume">
    <Link className="mono accent" href="/">← harkirat.singh</Link>
    <h1>{profile.name}</h1>
    <p>{profile.role} · {profile.location}</p>
    <p><a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a></p>
    <p><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a> · <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></p>
    <div className="resume-downloads">{profile.resumeLinks.map((item) => <a key={item.href} href={item.href} download><ArrowDownToLine size={16} aria-hidden="true"/>{item.label}</a>)}</div>

    <h2>Experience</h2>
    {experience.map((item) => <section key={item.role}><h3>{item.role} · {item.org}</h3><p>{item.date}</p><p>{item.summary}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><p>{item.stack.join(" · ")}</p></section>)}

    <h2>Selected projects</h2>
    {projects.map((project) => <section key={project.slug}><h3>{project.title}{project.status ? ` · ${project.status}` : ""}</h3><p>{project.thesis}</p><p>{project.stack.join(" · ")}</p><ul>{project.result.map((item) => <li key={item}>{item}</li>)}</ul></section>)}

    <h2>Skills</h2>
    {skills.map((cluster) => <p key={cluster.name}><b>{cluster.name}:</b> {cluster.items.join(", ")}</p>)}

    <h2>Leadership</h2>
    {leadership.map((item) => <section key={item.role}><h3>{item.role} · {item.org}</h3><p>{item.date}</p><p>{item.description}</p></section>)}

    <h2>Education</h2>
    <p>{education.institution} · {education.degree} · {education.years} · CGPA {education.cgpa}</p>
    <ul>{education.secondary.map((item) => <li key={item}>{item}</li>)}</ul>

    <h2>Certifications</h2>
    <ul>{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
  </main>;
}
