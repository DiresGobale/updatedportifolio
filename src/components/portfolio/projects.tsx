"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Star, ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { slideUp, staggerContainer, viewportOnce } from "./motion"
import { Badge } from "@/components/ui/badge"

export function Projects() {
  // Split into featured (first 2) and the rest
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Decorative gradient glow behind the section */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.13 200 / 0.3), oklch(0.82 0.14 75 / 0.15) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Projects I've built and shipped"
          description="A selection of coursework and personal projects — full-stack web apps, Flutter mobile, and database design. The main highlight of my portfolio."
        />

        {/* === Featured projects (large, 2-column) === */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
        >
          {featured.map((project) => (
            <motion.article
              key={project.title}
              variants={slideUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative glass-card rounded-3xl overflow-hidden flex flex-col h-full ring-1 ring-accent/20 hover:ring-accent/50 transition-all duration-500"
            >
              {/* Image — taller for featured, with enhanced zoom + gradient overlay */}
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Featured badge — larger and more prominent */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-brand-warm text-primary-foreground border-0 gap-1 shadow-lg shadow-amber-500/30">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Featured
                  </Badge>
                </div>

                {/* Hover arrow indicator */}
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full glass-card opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags — with accent dot prefix */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links — with hover highlight */}
                <div className="mt-auto flex items-center gap-4 pt-2 border-t border-border/40">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors group/link"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <Github className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors group/link"
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* === Other projects (3-column, compact) === */}
        {rest.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto"
          >
            {rest.map((project) => (
              <motion.article
                key={project.title}
                variants={slideUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative glass-card rounded-2xl overflow-hidden flex flex-col h-full"
              >
                {/* Image — shorter for compact cards */}
                <div className="relative h-36 overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>

                {/* Body — more compact */}
                <div className="flex-1 flex flex-col p-4 sm:p-5">
                  <h3 className="text-base font-semibold mb-1.5 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags — compact pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links — compact */}
                  <div className="mt-auto flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-accent transition-colors"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-accent transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  </div>
                </div>

                {/* Hover ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/25 transition-all duration-500" />
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
