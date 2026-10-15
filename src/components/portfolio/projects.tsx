"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Star } from "lucide-react"
import { projects } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { fadeInUp, staggerContainer, viewportOnce } from "./motion"
import { Badge } from "@/components/ui/badge"

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work I'm proud of"
          description="A handful of projects that show how I approach full-stack development, AI integration, and product thinking."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group relative glass-card rounded-3xl overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-brand text-primary-foreground border-0 gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col p-5 sm:p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary/60 px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Hover gradient border */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/30 transition-all duration-500" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
