// Server Component (no "use client" — let Next.js fully SSR the page tree).
// Heavy/decorative client components are lazy-loaded via the client wrapper
// (ClientDecorations / ClientChatbot / ClientGitHubStats) so they never block
// the first paint (NO_FCP fix). Below-the-fold sections are wrapped in
// <Suspense> so SSR'd content streams in immediately while the client chunks
// hydrate in the background.

import { Suspense } from "react"
import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import {
  ClientDecorations,
  ClientChatbot,
  ClientGitHubStats,
} from "@/components/portfolio/client-decorations"

// === Below-the-fold sections — code-split via React.lazy + Suspense.
//     They are still SSR'd, but their JS chunks load on demand so the initial
//     bundle is much smaller. The Suspense fallback shows during streaming
//     SSR (when chunks are downloading) and on the client (during hydration). ===
import { lazy } from "react"

const About = lazy(() =>
  import("@/components/portfolio/about").then((m) => ({ default: m.About }))
)
const Skills = lazy(() =>
  import("@/components/portfolio/skills").then((m) => ({ default: m.Skills }))
)
const TechProgressSection = lazy(() =>
  import("@/components/portfolio/tech-progress").then((m) => ({
    default: m.TechProgressSection,
  }))
)
const Services = lazy(() =>
  import("@/components/portfolio/services").then((m) => ({ default: m.Services }))
)
const Projects = lazy(() =>
  import("@/components/portfolio/projects").then((m) => ({
    default: m.Projects,
  }))
)
const Testimonials = lazy(() =>
  import("@/components/portfolio/testimonials").then((m) => ({
    default: m.Testimonials,
  }))
)
const Contact = lazy(() =>
  import("@/components/portfolio/contact").then((m) => ({ default: m.Contact }))
)
const Footer = lazy(() =>
  import("@/components/portfolio/footer").then((m) => ({ default: m.Footer }))
)

// Minimal placeholder shown while a below-the-fold section's chunk downloads.
function SectionSkeleton() {
  return (
    <section
      className="relative min-h-[400px] flex items-center justify-center"
      aria-hidden
    >
      <div className="h-1 w-12 rounded-full bg-foreground/10 animate-pulse" />
    </section>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* 3D Interactive Particle Network + Animated Background — client-only,
          never block first paint. They mount after hydration. */}
      <ClientDecorations />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {/* Hero is rendered eagerly — it's above the fold and must paint immediately. */}
        <Hero />
        {/* All below-the-fold sections are code-split with Suspense fallbacks
            so the initial paint only depends on Hero + the page shell. */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TechProgressSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        {/* Live GitHub stats — pulled from the public GitHub API. Client-only
            so it never blocks SSR. */}
        <Suspense fallback={<SectionSkeleton />}>
          <ClientGitHubStats username="DiresGobale" />
        </Suspense>
        {/* Testimonials from professors, teammates, and collaborators */}
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {/* Floating "Ask about Dires" chatbot — appears in bottom-right corner.
          Client-only, lazy-loaded so it doesn't block FCP. */}
      <ClientChatbot />
    </div>
  )
}
