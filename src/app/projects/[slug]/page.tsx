"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Check, Star, Code2 } from "lucide-react"
import { projects, profile } from "@/lib/portfolio-data"
import { Navbar } from "@/components/portfolio/navbar"
import { AnimatedBackground } from "@/components/portfolio/animated-background"
import { Footer } from "@/components/portfolio/footer"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer, slideUp, viewportOnce } from "@/components/portfolio/motion"

export default function ProjectDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {/* === Hero section with project image === */}
        <section className="relative pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {/* Back link */}
            <motion.a
              href="/#projects"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </motion.a>

            {/* Featured badge */}
            {project.featured && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <Badge className="bg-gradient-brand-warm text-primary-foreground border-0 gap-1">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Featured Project
                </Badge>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            >
              {project.title}
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Project image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/9] rounded-3xl overflow-hidden glass-card ring-1 ring-accent/20"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* === Details section === */}
        <section className="relative py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
              {/* Left: Description + Features */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-accent" />
                  About this project
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.longDescription}
                </p>

                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="space-y-2.5"
                >
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      variants={slideUp}
                      className="flex items-start gap-3"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Right: Links card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="glass-card rounded-3xl p-6 h-fit sticky top-24"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Project Links
                </h3>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl p-3 hover:bg-accent/10 transition-colors group mb-2"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 group-hover:bg-accent/15 transition-colors">
                    <Github className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">View Source Code</p>
                    <p className="text-xs text-muted-foreground">GitHub Repository</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-accent transition-colors" />
                </a>

                <div className="border-t border-border/40 my-4" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-border/40 my-4" />

                <a
                  href={`mailto:${profile.email}`}
                  className="block text-center text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  Questions about this project? Email {profile.email}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === Demo preview section === */}
        <section className="relative py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center"
            >
              <h2 className="text-xl font-semibold mb-2">Live Demo Preview</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                This is a showcase page for the {project.title}. The full source code is
                available on GitHub — clone the repo and run it locally for the complete
                interactive experience.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-6 py-3 text-sm font-semibold shadow-md shadow-brand-glow/25 hover:opacity-90 transition-opacity"
                >
                  <Github className="h-4 w-4" />
                  Clone on GitHub
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent hover:border-accent/80 hover:bg-accent/20 transition-all"
                >
                  Contact Dires
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
