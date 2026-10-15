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
  title: "Alex Carter — Full-Stack Developer & AI Integration Specialist",
  description:
    "Premium developer portfolio showcasing full-stack web development, AI integrations, and modern UI engineering. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Integration",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Alex Carter" }],
  openGraph: {
    title: "Alex Carter — Full-Stack Developer & AI Integration Specialist",
    description:
      "Premium developer portfolio showcasing full-stack web development, AI integrations, and modern UI engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Carter — Full-Stack Developer",
    description: "Premium developer portfolio showcasing full-stack web development and AI integrations.",
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
