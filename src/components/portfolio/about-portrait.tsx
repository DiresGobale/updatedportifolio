"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MapPin, Sparkles } from "lucide-react"
import { profile } from "@/lib/portfolio-data"

/**
 * Stylish portrait photo placeholder for the About section.
 *
 * Design:
 * - Rounded-rectangle portrait (not circular — different from hero)
 * - Subtle gradient frame that catches light
 * - Two floating accent badges (location + status) overlapping the frame
 * - Gentle 2D float on the whole thing (no 3D, no rotation)
 */
export function AboutPortrait() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-sm lg:max-w-none"
    >
      <motion.div
        animate={isReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Gradient frame behind the photo */}
        <div
          aria-hidden
          className="absolute -inset-2 rounded-3xl bg-gradient-brand opacity-60 blur-md"
        />

        {/* Photo container */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card glow-ring">
          <img
            src={profile.photo}
            alt={profile.photoAlt}
            className="h-full w-full object-cover"
          />
          {/* Subtle bottom gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />

          {/* Name overlay at bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Information System
            </p>
            <p className="text-xl font-bold text-foreground">{profile.name}</p>
          </div>
        </div>

        {/* Floating location badge */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass-card rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2"
        >
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium">Injibara, Ethiopia</span>
        </motion.div>

        {/* Floating status badge */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass-card rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium">Available for internships</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
