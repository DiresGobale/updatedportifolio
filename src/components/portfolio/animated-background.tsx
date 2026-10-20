"use client"

import { motion } from "framer-motion"
import { AnimatedDecorations } from "./animated-decorations"
import { AnimatedDecorations3D } from "./animated-decorations-3d"

/**
 * Decorative animated background:
 * - Subtle grid pattern (static)
 * - Three floating gradient orbs with gentle 2D drift + subtle scale
 * - A layer of small 2D decorations: butterflies, numbers, coding symbols, arrows
 * - A colorful 3D motion layer: rotating cubes, wireframe polyhedrons,
 *   parallax orbs at different Z depths, 3D floating symbols
 * - A subtle vignette around the edges (static)
 *
 * All decoration layers use pointer-events: none so they never block clicks.
 * Honors prefers-reduced-motion (animations disabled).
 * Mobile hides most 3D elements to save CPU/battery.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(60rem_60rem_at_50%_30%,black,transparent)]" />

      {/* Floating orbs — 2D drift + opacity pulse only.
          PERFORMANCE: reduced to 2 orbs (from 3), smaller sizes,
          slower animation, lower opacity — minimal GPU cost. */}
      <motion.div
        className="floating-orb bg-[oklch(0.78_0.13_200)] h-[16rem] w-[16rem] -top-20 -left-20"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.82_0.14_75)] h-[18rem] w-[18rem] top-1/3 -right-24"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Colorful 3D motion layer — cubes, polyhedrons, parallax orbs, 3D symbols */}
      <AnimatedDecorations3D />

      {/* Decorative 2D floating elements — butterflies, numbers, symbols, arrows */}
      <AnimatedDecorations />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.12_0.018_250/0.6)_100%)]" />
    </div>
  )
}
