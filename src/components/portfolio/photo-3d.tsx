"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Photo3DProps {
  src: string
  alt: string
  className?: string
}

/**
 * A 3D-tilted profile photo that:
 * - Tilts smoothly based on mouse position over the parent area
 * - Has a continuous "breathing" zoom (scale up/down) on the inner image
 * - Has rotating glow rings around it
 * - Floats up and down gently
 */
export function Photo3D({ src, alt, className }: Photo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
  }, [])

  // Mouse-driven tilt (relative to viewport center for a subtle parallax effect)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })

  useEffect(() => {
    if (isReducedMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // Only respond when the cursor is reasonably close to the photo area
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      // Clamp
      mx.set(Math.max(-0.5, Math.min(0.5, dx * 1.5)))
      my.set(Math.max(-0.5, Math.min(0.5, dy * 1.5)))
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mx, my])

  return (
    <motion.div
      ref={containerRef}
      animate={isReducedMotion ? {} : { y: [0, -18, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={`relative ${className ?? ""}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Outer rotating glow ring */}
        <motion.div
          className="absolute -inset-8 rounded-full border border-accent/20"
          animate={{ rotate: isReducedMotion ? 0 : -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Inner rotating glow ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border border-accent/40"
          animate={{ rotate: isReducedMotion ? 0 : 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transform: "translateZ(-10px)" }}
        />

        {/* Glow halo behind the photo */}
        <motion.div
          className="absolute -inset-4 rounded-full bg-gradient-brand opacity-30 blur-2xl"
          animate={
            isReducedMotion
              ? {}
              : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(-30px)" }}
        />

        {/* Photo with breathing zoom */}
        <div
          className="relative h-full w-full rounded-full overflow-hidden glass-card glow-ring"
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        >
          <motion.img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            animate={isReducedMotion ? {} : { scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>

        {/* Floating badge — top right */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex items-center gap-2">
            <Sparkle />
            <span className="text-xs sm:text-sm font-semibold">AI-Ready</span>
          </div>
        </motion.div>

        {/* Floating badge — bottom left */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm text-accent font-semibold">6+ yrs</span>
            <span className="text-xs sm:text-sm text-muted-foreground">experience</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function Sparkle() {
  return (
    <svg
      className="h-4 w-4 text-accent"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4L12 2z" />
    </svg>
  )
}
