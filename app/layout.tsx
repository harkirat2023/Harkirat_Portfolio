import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geist = localFont({ src: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", variable: "--font-sans", display: "swap", weight: "100 900", preload: true });
const mono = localFont({ src: "../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2", variable: "--font-mono", display: "swap", weight: "100 900", preload: false });
const instrument = localFont({ src: [{ path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" }, { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" }], variable: "--font-display", display: "swap", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL("https://harkirat.dev"),
  title: { default: "Harkirat Singh — Perception-to-decision systems", template: "%s — Harkirat Singh" },
  description: "Computer Engineering student building full-stack products and AI systems that turn noisy input into decisions people can audit.",
  openGraph: { title: "Harkirat Singh", description: "I build systems that notice things.", type: "website", images: ["/api/og"] },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${geist.variable} ${mono.variable} ${instrument.variable}`}><body><ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange><a className="skip-link" href="#content">Skip to content</a><div className="atmosphere" aria-hidden="true"><div className="wash"/><div className="grid"/><div className="grain"/></div>{children}</ThemeProvider></body></html>;
}
