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
 * Key behaviors:
 * - The photo is COMPLETELY STATIC (no rotation, no tilt, no zoom).
 * - Only the colorful gradient ring rotates around it.
 * - A soft radial glow pulses gently behind (scale only, no rotation).
 * - Two floating badges drift slowly up and down (2D only, no tilt).
 *
 * Honors prefers-reduced-motion: rotations and float are disabled.
 *
 * Layering (back to front, via z-index):
 *   0 — pulsing radial glow (slightly larger than the ring)
 *   1 — colorful conic-gradient ring (rotates; visible ring shape only)
 *   2 — dashed accent ring (counter-rotates)
 *   3 — static photo on top (centered, opaque, sits inside the ring)
 *   4 — orbiting decorative dots (rotate around the photo)
 *   5 — floating badges (2D bob, never rotate)
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

      {/* === Layer 1: Colorful rotating ring ===
          -inset-2 = ring is 8px larger than the photo on every side
          The radial-gradient mask carves a hole in the middle so the ring is a thin band,
          leaving the photo (on top, layer 3) fully visible in the center. */}
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
          // Carve out a circle in the middle, leaving a ~10% wide ring band.
          // The hole is sized relative to the ring's own bounding box.
          // Use closest-side to make the inner hole slightly smaller than the photo,
          // so the ring shows as a band around the photo and the photo fully covers the hole.
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
          // No animation, no transform — completely static
        />
        {/* Soft inner gradient for depth (static) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* === Layer 4: Decorative orbiting dots ===
          These orbit the photo (rotate), but the photo itself never moves. */}
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
      <motion.div
        aria-hidden
        animate={isReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
        style={{ zIndex: 5 }}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold">Open to work</span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={isReducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
        style={{ zIndex: 5 }}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs sm:text-sm text-accent font-semibold">
            4th yr
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">IS student</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
