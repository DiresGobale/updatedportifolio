"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MapPin, Sparkles } from "lucide-react"
import { profile } from "@/lib/portfolio-data"

/**
 * Stylish portrait photo placeholder for the About section.
 *
 * Responsive design:
 * - The outer wrapper has horizontal padding so the gradient frame
 *   (-inset-2) and floating badges (-top-3 -right-3 etc.) never
 *   cause horizontal page scroll on small screens.
 * - The portrait uses a max-width and centers itself on mobile.
 * - Badges sit just inside the frame on mobile (no negative offset)
 *   and pop slightly outside on sm+ for a more dynamic look.
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
      // px-5 sm:px-6 absorbs the negative-offset badges so they never
      // push past the viewport edge on small screens.
      className="relative mx-auto max-w-sm lg:max-w-none px-5 sm:px-6"
    >
      <motion.div
        animate={isReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Gradient frame behind the photo (now inside the padding zone) */}
        <div
          aria-hidden
          className="absolute -inset-2 rounded-3xl bg-gradient-brand opacity-60 blur-md"
        />

        {/* Photo container — square aspect ratio so the tighter crop shows properly */}
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-card glow-ring">
          <img
            src="/profile-about.jpg"
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

        {/* Floating location badge — inside the frame on mobile, outside on sm+ */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-2 right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 glass-card rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-lg flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1rem)] sm:max-w-none"
        >
          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent shrink-0" />
          <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">Injibara, Ethiopia</span>
        </motion.div>

        {/* Floating status badge — inside the frame on mobile, outside on sm+ */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-2 left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 glass-card rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-lg flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1rem)] sm:max-w-none"
        >
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent shrink-0" />
          <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">Available for internships</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
