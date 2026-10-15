"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HeroPhotoProps {
  src: string
  alt: string
  className?: string
}

/**
 * Hero photo with a colorful animated ring around it.
 *
 * Responsive design:
 * - The outer wrapper has horizontal padding so negative-offset badges
 *   never cause horizontal page scroll.
 * - The photo size uses `min(...)` via the className prop so it scales
 *   down on small screens instead of overflowing.
 * - Badges are positioned at the corners but the wrapper's `px` ensures
 *   they always sit inside the viewport.
 *
 * Key behaviors:
 * - The photo is COMPLETELY STATIC (no rotation, no tilt, no zoom).
 * - Only the colorful gradient ring rotates around it.
 * - A soft radial glow pulses gently behind (scale only, no rotation).
 * - Two floating badges drift slowly up and down (2D only, no tilt).
 *
 * Honors prefers-reduced-motion: rotations and float are disabled.
 */
export function HeroPhoto({ src, alt, className }: HeroPhotoProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    }
  }, [])

  return (
    // Outer wrapper — adds horizontal padding so the negative-offset
    // badges (which sit outside the photo container) never push past
    // the viewport edge on small screens. overflow-visible ensures
    // the badges show, but the parent grid column constrains the width.
    <div className="relative w-full flex justify-center px-6 sm:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`relative ${className ?? ""}`}
      >
        {/* === Layer 0: Soft pulsing radial glow (BEHIND everything) === */}
        <motion.div
          aria-hidden
          className="absolute -inset-8 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.78 0.13 200 / 0.35), oklch(0.82 0.14 75 / 0.18) 40%, transparent 70%)",
            zIndex: 0,
          }}
          animate={
            isReducedMotion
              ? {}
              : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === Layer 1: Colorful rotating ring === */}
        <motion.div
          aria-hidden
          className="absolute -inset-2 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, " +
              "oklch(0.78 0.13 200), " +
              "oklch(0.82 0.14 75), " +
              "oklch(0.72 0.16 280), " +
              "oklch(0.72 0.16 330), " +
              "oklch(0.7 0.14 165), " +
              "oklch(0.78 0.13 200))",
            maskImage:
              "radial-gradient(circle closest-side, transparent 78%, black 82%)",
            WebkitMaskImage:
              "radial-gradient(circle closest-side, transparent 78%, black 82%)",
            zIndex: 1,
          }}
          animate={isReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />

        {/* === Layer 2: Dashed accent ring (counter-rotates) === */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed"
          style={{
            borderColor: "oklch(0.82 0.14 75 / 0.5)",
            zIndex: 2,
          }}
          animate={isReducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {/* === Layer 3: STATIC photo (sits on top of the ring) === */}
        <div
          className="relative h-full w-full rounded-full overflow-hidden glass-card glow-ring"
          style={{ zIndex: 3 }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* === Layer 4: Decorative orbiting dots === */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4 }}
          animate={isReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent shadow-md shadow-accent/50" />
          <span
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full"
            style={{ background: "oklch(0.82 0.14 75)" }}
          />
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full"
            style={{ background: "oklch(0.72 0.16 280)" }}
          />
          <span
            className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full"
            style={{ background: "oklch(0.72 0.16 330)" }}
          />
        </motion.div>

        {/* === Layer 5: Floating badges (2D only — gentle vertical bob) === */}
        {/* On mobile, badges sit just inside the photo's outer edge (not outside)
            so they never cause horizontal scroll. On >=sm screens, they pop
            outside the ring for a more dynamic look. */}
        <motion.div
          aria-hidden
          animate={isReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-2 right-2 sm:top-0 sm:right-0 md:-top-4 md:-right-4 glass-card rounded-2xl px-2.5 py-1.5 sm:px-4 sm:py-3 shadow-lg"
          style={{ zIndex: 5 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-sm font-semibold whitespace-nowrap">Open to work</span>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          animate={isReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-2 left-2 sm:bottom-0 sm:left-0 md:-bottom-4 md:-left-4 glass-card rounded-2xl px-2.5 py-1.5 sm:px-4 sm:py-3 shadow-lg"
          style={{ zIndex: 5 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[10px] sm:text-sm text-accent font-semibold whitespace-nowrap">
              4th yr
            </span>
            <span className="text-[10px] sm:text-sm text-muted-foreground whitespace-nowrap">IS student</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
