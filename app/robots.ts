import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const projectHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(projectHost ? { sitemap: `https://${projectHost}/sitemap.xml` } : {}),
  };
}
