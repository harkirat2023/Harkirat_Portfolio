"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Command } from "cmdk";
import { profile, projects } from "@/content/site";

const links = [{ href: "#top", label: "home" }, { href: "#work", label: "work" }, { href: "#about", label: "about me" }, { href: "#experience", label: "experience" }];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false); const [activeSection, setActiveSection] = useState("top"); const [menu, setMenu] = useState(false); const [palette, setPalette] = useState(false); const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "light";
  const toggleTheme = () => setTheme(activeTheme === "dark" ? "light" : "dark");
  const menuRef = useRef<HTMLDivElement>(null); const menuTriggerRef = useRef<HTMLButtonElement>(null); const menuWasOpen = useRef(false);
  useEffect(() => {
    const ids = ["top", "work", "about", "capabilities", "experience", "recognition", "contact"];
    const update = () => {
      setScrolled(window.scrollY > 40);
      let current = "top";
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * .34) current = id;
      }
      setActiveSection(current === "capabilities" || current === "recognition" ? "about" : current);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" || event.key === "/" && !(event.target instanceof HTMLInputElement)) { event.preventDefault(); setPalette((open) => !open); } if (event.key === "Escape") { setMenu(false); setPalette(false); } }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);
  useEffect(() => { document.body.style.overflow = menu || palette ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menu, palette]);
  useEffect(() => { if (menu) { menuWasOpen.current = true; menuRef.current?.querySelector<HTMLElement>("a, button")?.focus(); } else if (menuWasOpen.current) { menuWasOpen.current = false; menuTriggerRef.current?.focus(); } }, [menu]);
  const trapMenuFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !menuRef.current) return;
    const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    const first = items[0]; const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  const go = (href: string) => { setMenu(false); setPalette(false); if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); else window.location.href = href; };
  return <>
    <header className={`site-header${scrolled ? " scrolled" : ""}`}><div className="container header-inner"><Link className="wordmark" href="/" aria-label="Harkirat Singh home"><span className="brand-badge">HS<span>✳</span></span><span className="brand-name">{profile.name}</span></Link><nav className="nav" aria-label="Primary">{links.map((item) => <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}>{item.label}</a>)}</nav><div className="header-actions"><button className="palette-trigger" onClick={() => setPalette(true)} aria-label="Open command palette">⌘K</button><button className="icon-button" onClick={toggleTheme} aria-pressed={activeTheme === "dark"} aria-label={activeTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>{activeTheme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button><a className="button button-primary header-resume" href="#contact">Contact me</a><button ref={menuTriggerRef} className="menu-button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></div></header>
    <div className="scroll-progress" aria-hidden="true" style={{ transform: "scaleX(var(--scroll-progress, 0))" }} />
    {menu && <div ref={menuRef} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Main menu" onKeyDown={trapMenuFocus}><button className="menu-button" onClick={() => setMenu(false)} aria-label="Close menu"><X/></button><nav>{[...links, { href: "#contact", label: "contact" }].map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenu(false)}><span className="mono">0{index + 1}　</span>{item.label}</a>)}<Link className="button button-primary" href="/resume" onClick={() => setMenu(false)}>Résumé ↗</Link></nav><p className="mono">{"hkkirat25@gmail.com"}</p></div>}
    <Command.Dialog open={palette} onOpenChange={setPalette} label="Command palette" overlayClassName="dialog-backdrop" contentClassName="palette"><Command.Input autoFocus placeholder="Search sections, projects, and actions…"/><Command.List className="palette-list"><Command.Empty className="mono muted">no match — try “khata” or “rag”.</Command.Empty><Command.Group heading="Navigate">{[...links, { href: "#work", label: "selected projects" }, { href: "#contact", label: "contact" }].map((item) => <Command.Item key={item.href} value={item.label} onSelect={() => go(item.href)}>{item.label}<span className="muted">↗</span></Command.Item>)}</Command.Group><Command.Group heading="Work">{projects.map((project) => <Command.Item key={project.slug} value={`${project.title} ${project.stack.join(" ")}`} onSelect={() => go(`/work/${project.slug}`)}>{project.title}<span className="muted">{project.stack.slice(0,2).join(" · ")}</span></Command.Item>)}</Command.Group><Command.Group heading="Elsewhere">{[{ label: "GitHub", href: profile.github }, { label: "LinkedIn", href: profile.linkedin }, { label: "Résumé", href: "/resume" }].map((item) => <Command.Item key={item.label} value={item.label} onSelect={() => item.href.startsWith("/") ? go(item.href) : window.open(item.href, "_blank", "noopener,noreferrer")}>{item.label}</Command.Item>)}<Command.Item value={`email ${profile.email}`} onSelect={async () => { try { await navigator.clipboard.writeText(profile.email); } catch { window.location.href = `mailto:${profile.email}`; } setPalette(false); }}>Copy email</Command.Item></Command.Group><Command.Group heading="Actions"><Command.Item value="toggle theme paper dark" onSelect={toggleTheme}>Toggle theme</Command.Item><Command.Item value="download cv resume" onSelect={() => go("/resume")}>Download CV</Command.Item></Command.Group></Command.List><p className="mono muted">↑↓ navigate · enter open · esc close</p></Command.Dialog>
  </>;
}
