"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Star } from "lucide-react"
import { projects } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { TiltCard3D } from "./tilt-card-3d"
import { zoomInUp, staggerContainer, viewportOnce } from "./motion"
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
          title="Projects I've built and shipped"
          description="A selection of coursework and personal projects that show how I approach full-stack web development, mobile apps with Flutter, and database design."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 perspective-1500 max-w-5xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={zoomInUp}
              className="preserve-3d"
            >
              <TiltCard3D
                maxRotation={10}
                hoverScale={1.03}
                glare={false}
                className="group relative glass-card rounded-3xl overflow-hidden flex flex-col h-full"
              >
                {/* Image with zoom-in on hover */}
                <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-3xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-brand-warm text-primary-foreground border-0 gap-1">
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
              </TiltCard3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
