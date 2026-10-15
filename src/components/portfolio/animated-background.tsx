"use client"

import { motion } from "framer-motion"

/**
 * Decorative animated background:
 * - Subtle grid pattern
 * - Three floating gradient orbs that drift slowly
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(60rem_60rem_at_50%_30%,black,transparent)]" />

      {/* Floating orbs */}
      <motion.div
        className="floating-orb bg-[oklch(0.7_0.13_195)] h-[28rem] w-[28rem] -top-32 -left-32"
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.78_0.15_165)] h-[32rem] w-[32rem] top-1/3 -right-40"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="floating-orb bg-[oklch(0.72_0.18_280)] h-[26rem] w-[26rem] bottom-0 left-1/3"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  )
}
