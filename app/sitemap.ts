import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const projectHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (!projectHost) return [];
  const base = `https://${projectHost}`;
  return [{ url: base }, { url: `${base}/resume` }, ...projects.map(({ slug }) => ({ url: `${base}/work/${slug}` }))];
}
