
import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geist = localFont({ src: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", variable: "--font-sans", display: "swap", weight: "100 900", preload: true });
const mono = localFont({ src: "../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2", variable: "--font-mono", display: "swap", weight: "100 900", preload: false });

function getMetadataBase() {
  const deploymentUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (!deploymentUrl) return new URL("http://localhost:3000");

  try {
    return new URL(deploymentUrl.includes("://") ? deploymentUrl : `https://${deploymentUrl}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  metadataBase,
  title: { default: "Harkirat Singh ", template: "%s — Harkirat Singh" },
  description: "Computer Engineering student building full-stack software, AI systems, and analytics projects.",
  openGraph: { title: "Harkirat Singh", description: "Full-stack software, AI systems, and analytics.", type: "website", images: ["/api/og"] },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <a className="skip-link" href="#content">Skip to content</a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
