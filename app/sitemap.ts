import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://harkirat.dev"; return [{ url: base }, { url: `${base}/resume` }, ...projects.map(({ slug }) => ({ url: `${base}/work/${slug}` }))]; }
