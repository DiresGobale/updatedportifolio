"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  Cpu,
  Rocket,
  Smile,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Heart,
} from "lucide-react"
import { aboutContent, profile, stats } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { AnimatedCounter } from "./animated-counter"
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer, viewportOnce } from "./motion"

const statIcons: Record<string, typeof Rocket> = {
  rocket: Rocket,
  cpu: Cpu,
  calendar: Calendar,
  smile: Smile,
}

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About me"
          title={aboutContent.heading}
          description="A quick intro to who I am, what I care about, and how I work."
        />

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat) => {
            const Icon = statIcons[stat.icon] ?? Rocket
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-5 sm:p-6 text-center group"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent mb-4 group-hover:bg-accent/25 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bio + philosophy */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <div>
              <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3">
                <Heart className="h-5 w-5 text-accent" />
                Professional biography
              </h3>
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-sm font-medium">{profile.location}</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-sm font-medium truncate">{profile.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Philosophy cards */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4"
          >
            <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3">
              <Lightbulb className="h-5 w-5 text-accent" />
              Development philosophy
            </h3>
            {aboutContent.philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 6 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Career / education timeline */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-center">
            Career &amp; Education
          </h3>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/40 to-transparent" />

            <div className="space-y-8">
              {aboutContent.experience.map((item, i) => {
                const isLeft = i % 2 === 0
                const Icon = item.role.toLowerCase().includes("developer") ||
                  item.role.toLowerCase().includes("engineer")
                  ? Briefcase
                  : GraduationCap

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex sm:items-center ${
                      isLeft ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-glow/30 ring-4 ring-background">
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Spacer for two-column layout on desktop */}
                    <div className="hidden sm:block sm:w-1/2" />

                    {/* Content card */}
                    <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="glass-card rounded-2xl p-5"
                      >
                        <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent mb-2">
                          {item.period}
                        </span>
                        <h4 className="text-base font-semibold">{item.role}</h4>
                        <p className="text-sm text-accent-foreground/80 mb-2">
                          {item.organization}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
