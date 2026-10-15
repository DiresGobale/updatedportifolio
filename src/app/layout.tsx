import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
