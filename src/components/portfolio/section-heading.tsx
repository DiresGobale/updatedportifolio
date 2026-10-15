"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { viewportOnce } from "./motion"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

/**
 * SectionHeading with word-by-word animated reveal.
 *
 * The title is split into individual words, each fading + sliding up with a
 * staggered delay. A gradient sweep effect is applied via background-clip
 * so the words also have a subtle color shift as they reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  // Split the title into words for the staggered reveal.
  // Multi-word titles animate word-by-word; single-word titles animate as one.
  const words = title.split(" ")

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {/* Eyebrow badge — subtle scale + fade */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12, scale: 0.96 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="inline-flex"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-1 w-1 rounded-full bg-accent" />
          {eyebrow}
        </span>
      </motion.div>

      {/* Title — word-by-word reveal with gradient sweep */}
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
          variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.55,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="inline-block mr-[0.25em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Description — fades in after the words */}
      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.55,
                delay: 0.1 + words.length * 0.08 + 0.05,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
