"use client"

import { Navbar } from "@/components/portfolio/navbar"
import { AnimatedBackground } from "@/components/portfolio/animated-background"
import { ParticleNetwork } from "@/components/portfolio/particle-network"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Services } from "@/components/portfolio/services"
import { Projects } from "@/components/portfolio/projects"
import { GitHubStatsWidget } from "@/components/portfolio/github-stats"
import { Testimonials } from "@/components/portfolio/testimonials"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { Chatbot } from "@/components/portfolio/chatbot"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* 3D Interactive Particle Network — colorful particles + neon connections + mouse glow ring */}
      <ParticleNetwork />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        {/* Live GitHub stats — pulled from the public GitHub API */}
        <GitHubStatsWidget username="DiresGobale" />
        {/* Testimonials from professors, teammates, and collaborators */}
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {/* Floating "Ask about Dires" chatbot — appears in bottom-right corner,
          knows the full portfolio, replies in any language */}
      <Chatbot />
    </div>
  )
}
