import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./performance.css";
import { Toaster } from "@/components/ui/toaster";
import { PerformanceProvider } from "@/components/portfolio/performance-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dires — Information System Student & Full-Stack Developer",
  description:
    "Fourth-year Information System student at Injibara University. Full-stack web developer (React, Next.js, Node.js, Express, PostgreSQL), Flutter mobile developer, and UI/UX designer in Figma.",
  keywords: [
    "Information System Student",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Flutter",
    "Figma",
    "UI/UX Design",
    "Dires",
    "Injibara University",
    "Portfolio",
  ],
  authors: [{ name: "Dires" }],
  openGraph: {
    title: "Dires — Information System Student & Full-Stack Developer",
    description:
      "Fourth-year IS student at Injibara University. Building web apps with React/Next.js/Node.js, mobile apps with Flutter, and designing in Figma.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dires — Information System Student & Developer",
    description:
      "Full-stack web (React/Next.js/Node.js) + Flutter mobile + Figma UI/UX. Fourth-year IS student at Injibara University.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c111e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to remote image host — Unsplash hosts the hero + project images.
            Established in parallel with HTML download, saving 100-300ms on FCP. */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preconnect to GitHub API for the stats widget (loads after FCP) */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <PerformanceProvider>
          {children}
        </PerformanceProvider>
        <Toaster />
      </body>
    </html>
  );
}
