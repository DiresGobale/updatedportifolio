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
          PERFORMANCE: removed `scale` from the animation because scaling a
          blurred element forces the browser to re-rasterize the blur every
          frame. Animating only x/y + opacity keeps the blur cached on the
          GPU. Also reduced orb sizes from 28-32rem to 18-24rem to cut the
          blur computation area by ~40%. */}
      <motion.div
        className="floating-orb bg-[oklch(0.78_0.13_200)] h-[20rem] w-[20rem] -top-24 -left-24"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.82_0.14_75)] h-[24rem] w-[24rem] top-1/3 -right-32"
        animate={{
          x: [0, -40, 0],
          y: [0, 25, 0],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.7_0.14_230)] h-[18rem] w-[18rem] bottom-0 left-1/3"
        animate={{
          x: [0, 25, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
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
