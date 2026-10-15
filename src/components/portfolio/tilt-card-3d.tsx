"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TiltCard3DProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees */
  maxRotation?: number
  /** Scale on hover (zoom) */
  hoverScale?: number
  /** Spring transition config */
  springConfig?: { stiffness: number; damping: number; mass: number }
  /** Glare effect on hover */
  glare?: boolean
}

/**
 * A 3D tilt card that rotates based on the mouse position over it.
 * Uses Framer Motion's useMotionValue + useSpring for smooth, performant 3D transforms.
 *
 * Wrap any card content with this to add the 3D tilt effect with a zoom-on-hover and
 * an optional radial glare that follows the cursor.
 */
export function TiltCard3D({
  children,
  className,
  maxRotation = 12,
  hoverScale = 1.04,
  springConfig = { stiffness: 200, damping: 18, mass: 0.4 },
  glare = true,
}: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
  }, [])

  // Raw mouse position (-0.5 to 0.5 from center)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Smoothed (spring) rotation values
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [maxRotation, -maxRotation]), springConfig)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxRotation, maxRotation]), springConfig)

  // Glare position (for the radial highlight that follows the cursor)
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"])
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, oklch(0.78 0.13 200 / 0.18), transparent 60%)`
  )
  const glareOpacity = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Normalize to -0.5 .. 0.5
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
    glareOpacity.set(1)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      whileHover={{ scale: isReducedMotion ? 1 : hoverScale }}
      className={cn("relative will-change-transform", className)}
    >
      {/* Glare overlay */}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: glareBg,
            opacity: glareOpacity,
          }}
        />
      )}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  )
}
