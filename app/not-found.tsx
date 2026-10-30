import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
export default function NotFound() { return <><SiteHeader/><main id="content" className="container case-wrap"><p className="mono accent">404 · signal lost</p><h1 className="display">Signal lost.</h1><p className="intro">this route doesn’t exist. try ⌘K.</p><Link className="button button-primary" href="/">Back home</Link></main></>; }
