"use client"

import { motion } from "framer-motion"
import {
  Layout,
  Server,
  Database,
  Sparkles,
  Wrench,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import { skillCategories } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { slideUp, staggerContainer, viewportOnce } from "./motion"

const categoryIcons: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  database: Database,
  sparkles: Sparkles,
  wrench: Wrench,
  smartphone: Smartphone,
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with every day"
          description="A curated toolkit refined through coursework and personal projects. I prefer depth over breadth — these are the tools I reach for confidently."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.icon] ?? Layout
            return (
              <motion.div
                key={category.title}
                variants={slideUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group glass-card rounded-3xl p-6 sm:p-7 relative overflow-hidden"
              >
                {/* Subtle gradient accent on hover (2D only) */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-md shadow-brand-glow/30 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {category.skills.map((skill, i) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportOnce}
                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                        className="group/skill flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-accent/10 transition-colors cursor-default"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-brand group-hover/skill:scale-150 transition-transform" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{skill.name}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {skill.description}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
