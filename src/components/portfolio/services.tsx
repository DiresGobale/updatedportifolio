"use client"

import { motion } from "framer-motion"
import {
  Code2,
  Server,
  Sparkles,
  Database,
  Layout,
  Globe,
  Check,
  type LucideIcon,
} from "lucide-react"
import { services } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { TiltCard3D } from "./tilt-card-3d"
import { zoomInUp, staggerContainer, viewportOnce } from "./motion"

const serviceIcons: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  sparkles: Sparkles,
  database: Database,
  layout: Layout,
  globe: Globe,
}

export function Services() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="What I can help you build"
          description="From a single component to a full product launch — here's how I typically partner with clients and teams."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 perspective-1500"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] ?? Code2
            return (
              <motion.div
                key={service.title}
                variants={zoomInUp}
                className="preserve-3d"
              >
                <TiltCard3D
                  maxRotation={12}
                  hoverScale={1.05}
                  className="group relative glass-card rounded-3xl p-6 sm:p-7 overflow-hidden flex flex-col h-full"
                >
                  {/* Decorative gradient orb */}
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 pointer-events-none" />

                  <div className="relative flex-1">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-glow/25 mb-5 group-hover:rotate-6 transition-transform duration-300">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard3D>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
