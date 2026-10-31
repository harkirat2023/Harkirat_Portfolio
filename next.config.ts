import type { NextConfig } from "next";
const nextConfig: NextConfig = { distDir: ".next-build", poweredByHeader: false, experimental: { optimizePackageImports: ["lucide-react"] } };
export default nextConfig;
