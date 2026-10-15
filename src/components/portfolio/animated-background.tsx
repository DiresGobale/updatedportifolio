"use client"

import { motion } from "framer-motion"

/**
 * Decorative animated background:
 * - Subtle grid pattern
 * - Three floating gradient orbs that drift + zoom in/out slowly
 * - A subtle vignette around the edges
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(60rem_60rem_at_50%_30%,black,transparent)]" />

      {/* Floating + zooming orbs */}
      <motion.div
        className="floating-orb bg-[oklch(0.78_0.13_200)] h-[28rem] w-[28rem] -top-32 -left-32"
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.82_0.14_75)] h-[32rem] w-[32rem] top-1/3 -right-40"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.7_0.14_230)] h-[26rem] w-[26rem] bottom-0 left-1/3"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.12_0.018_250/0.6)_100%)]" />
    </div>
  )
}
