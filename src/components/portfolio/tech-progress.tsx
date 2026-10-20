"use client"

import { motion } from "framer-motion"
import { techProgress } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { staggerContainer, viewportOnce } from "./motion"

export function TechProgressSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Tech Proficiency"
          title="My technical skill levels"
          description="Proficiency levels across my core tech stack — based on real project experience."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 glass-card rounded-3xl p-6 sm:p-8 space-y-5"
        >
          {techProgress.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{tech.name}</span>
                <span className="text-sm font-mono text-muted-foreground">{tech.level}%</span>
              </div>
              <div className="h-3 rounded-full bg-secondary/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.level}%` }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full flex items-center justify-end pr-2"
                  style={{
                    background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})`,
                    boxShadow: `0 0 8px ${tech.color}60`,
                  }}
                >
                  <span className="text-[10px] font-bold text-white opacity-0" style={{ animation: `fadeIn 0.5s 1s forwards` }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
