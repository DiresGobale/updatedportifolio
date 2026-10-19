"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { testimonials } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { slideUp, staggerContainer, viewportOnce } from "./motion"

// Map accent colors to actual oklch values used for the avatar circle + quote icon.
const ACCENT: Record<string, { bg: string; text: string; ring: string }> = {
  cyan: {
    bg: "oklch(0.78 0.13 200 / 0.18)",
    text: "oklch(0.78 0.13 200)",
    ring: "oklch(0.78 0.13 200 / 0.35)",
  },
  amber: {
    bg: "oklch(0.82 0.14 75 / 0.18)",
    text: "oklch(0.82 0.14 75)",
    ring: "oklch(0.82 0.14 75 / 0.35)",
  },
  violet: {
    bg: "oklch(0.72 0.16 280 / 0.18)",
    text: "oklch(0.72 0.16 280)",
    ring: "oklch(0.72 0.16 280 / 0.35)",
  },
  pink: {
    bg: "oklch(0.72 0.16 330 / 0.18)",
    text: "oklch(0.72 0.16 330)",
    ring: "oklch(0.72 0.16 330 / 0.35)",
  },
  teal: {
    bg: "oklch(0.7 0.14 165 / 0.18)",
    text: "oklch(0.7 0.14 165)",
    ring: "oklch(0.7 0.14 165 / 0.35)",
  },
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say about working with me"
          description="Professors, teammates, and collaborators I've shipped real projects with."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonials.map((t, i) => {
            const accent = ACCENT[t.accentColor] ?? ACCENT.cyan
            return (
              <motion.article
                key={t.name}
                variants={slideUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative glass-card rounded-3xl p-6 sm:p-7 flex flex-col h-full"
              >
                {/* Decorative quote icon in the top-right (accent-colored) */}
                <Quote
                  className="absolute top-5 right-5 h-10 w-10 opacity-15 group-hover:opacity-30 transition-opacity"
                  style={{ color: accent.text }}
                  aria-hidden
                />

                {/* 5-star rating */}
                <div className="flex gap-0.5 mb-4 relative" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-current"
                      style={{ color: accent.text }}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 flex-1 relative">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Footer: avatar + name + role */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/40 relative">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold text-sm"
                    style={{
                      background: accent.bg,
                      color: accent.text,
                      boxShadow: `0 0 0 1px ${accent.ring}`,
                    }}
                    aria-hidden
                  >
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.title}
                    </p>
                    <p className="text-xs text-muted-foreground/70 truncate">
                      {t.organization}
                    </p>
                  </div>
                </div>

                {/* Hover gradient ring */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/30 transition-all duration-500"
                  aria-hidden
                />
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
