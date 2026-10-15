"use client"

import { Navbar } from "@/components/portfolio/navbar"
import { AnimatedBackground } from "@/components/portfolio/animated-background"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Services } from "@/components/portfolio/services"
import { Projects } from "@/components/portfolio/projects"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
