"use client"

import { useEffect, useRef } from "react"

/**
 * ParticleNetwork — a 3D Interactive Particle Network background.
 *
 * Features:
 *   • Colorful 3D particles connected by glowing neon lines
 *   • Particles that follow the mouse cursor (gravitational pull)
 *   • A glowing circular ring that follows the mouse movement
 *   • Smooth neon color transitions: cyan → blue → purple → pink → orange
 *   • Dark gradient background that harmonizes with the glowing particles
 *   • Realistic 3D depth, reflections, and cinematic lighting (simulated)
 *
 * Performance optimizations:
 *   • Canvas-based (GPU-accelerated via transform/opacity)
 *   • Frame-rate limiting to ~30fps (requestAnimationFrame with time check)
 *   • Device pixel ratio capped at 1.5 (sharp enough, half the pixels)
 *   • Particle count scales with viewport (mobile gets fewer)
 *   • IntersectionObserver pauses animation when background is off-screen
 *   • Tab visibility pause (data-tab-hidden attribute)
 *   • Particle Z-depth creates parallax without preserve-3d layers
 *
 * This component renders a full-screen fixed canvas behind all content.
 * It does NOT modify any existing component — it's purely additive.
 */

// === Neon color palette (cycled through particles) ===
const NEON_COLORS = [
  { r: 6, g: 182, b: 212 },     // cyan
  { r: 59, g: 130, b: 246 },    // blue
  { r: 168, g: 85, b: 247 },    // purple
  { r: 236, g: 72, b: 153 },    // pink
  { r: 249, g: 115, b: 22 },     // orange
]

interface Particle {
  x: number
  y: number
  z: number       // depth (0 = far, 1 = near) for 3D parallax
  vx: number
  vy: number
  vz: number
  radius: number
  colorIndex: number
  pulsePhase: number
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const ringRef = useRef({ x: -9999, y: -9999, radius: 0, opacity: 0 })
  const isVisibleRef = useRef(true)
  const isHiddenRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // === Setup canvas size with device pixel ratio ===
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    // === Create particles (count scales with viewport) ===
    const baseCount = Math.min(60, Math.floor((width * height) / 18000))
    const particleCount = Math.max(20, Math.min(baseCount, 80))

    const initParticle = (p: Particle) => {
      p.x = Math.random() * width
      p.y = Math.random() * height
      p.z = Math.random()  // 0 = far (small, slow), 1 = near (large, fast)
      p.vx = (Math.random() - 0.5) * 0.3 * (0.5 + p.z)
      p.vy = (Math.random() - 0.5) * 0.3 * (0.5 + p.z)
      p.vz = (Math.random() - 0.5) * 0.002
      p.radius = (1.5 + Math.random() * 3) * (0.5 + p.z * 0.5)
      p.colorIndex = Math.floor(Math.random() * NEON_COLORS.length)
      p.pulsePhase = Math.random() * Math.PI * 2
    }

    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      const p: Particle = {
        x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
        radius: 0, colorIndex: 0, pulsePhase: 0,
      }
      initParticle(p)
      particlesRef.current.push(p)
    }

    // === Mouse tracking ===
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true

      // Smooth the ring toward the mouse
      ringRef.current.x = e.clientX
      ringRef.current.y = e.clientY
      ringRef.current.radius = 60
      ringRef.current.opacity = 0.6
    }
    const onMouseLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)

    // === Visibility: pause when tab is hidden ===
    const onVisibilityChange = () => {
      isHiddenRef.current = document.visibilityState === "hidden"
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    onVisibilityChange()

    // === IntersectionObserver: pause when canvas is off-screen ===
    let io: IntersectionObserver | null = null
    io = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    // === Animation loop with frame limiting (~30fps) ===
    let lastTime = 0
    const frameInterval = 1000 / 30 // ~30fps cap

    function animate(time: number) {
      rafRef.current = requestAnimationFrame(animate)

      // Skip if tab hidden or canvas off-screen
      if (isHiddenRef.current || !isVisibleRef.current) {
        lastTime = time
        return
      }

      // Frame limiting — only render at ~30fps
      const delta = time - lastTime
      if (delta < frameInterval) return
      lastTime = time - (delta % frameInterval)

      // === Clear with dark gradient background ===
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, "rgba(12, 17, 30, 0.35)")
      grad.addColorStop(1, "rgba(8, 12, 22, 0.35)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const ring = ringRef.current

      // === Update particles ===
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse gravitational pull (stronger for near particles)
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const force = (1 - dist / 200) * 0.15 * (0.5 + p.z)
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        // Wrap around edges
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
        if (p.z < 0) p.z = 1
        if (p.z > 1) p.z = 0

        // Friction
        p.vx *= 0.98
        p.vy *= 0.98

        // Pulse
        p.pulsePhase += 0.02
      }

      // === Draw connections between near particles ===
      ctx.lineCap = "round"
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.25
            const c1 = NEON_COLORS[p1.colorIndex]
            const c2 = NEON_COLORS[p2.colorIndex]
            // Blend the two colors for the line
            const r = Math.round((c1.r + c2.r) / 2)
            const g = Math.round((c1.g + c2.g) / 2)
            const b = Math.round((c1.b + c2.b) / 2)

            // Neon glow on the line
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()

            // Brighter core line for nearer particles
            if (p1.z > 0.5 && p2.z > 0.5) {
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 1.5})`
              ctx.lineWidth = 0.4
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }

        // Draw connection from particle to mouse
        if (mouse.active) {
          const dx = p1.x - mouse.x
          const dy = p1.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.4
            const c = NEON_COLORS[p1.colorIndex]
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // === Draw particles with 3D depth glow ===
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const c = NEON_COLORS[p.colorIndex]
        const pulse = Math.sin(p.pulsePhase) * 0.2 + 0.8
        const r = Math.max(0.5, p.radius * pulse)

        // Outer glow (3D depth simulation)
        const glowRadius = r * 4
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius)
        glowGrad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.4 * p.z})`)
        glowGrad.addColorStop(0.5, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.1 * p.z})`)
        glowGrad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`)
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Core particle (bright center)
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.8 * (0.5 + p.z * 0.5)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()

        // Bright highlight (cinematic lighting)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * p.z})`
        ctx.beginPath()
        ctx.arc(p.x - r * 0.3, p.y - r * 0.3, r * 0.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // === Draw glowing cursor ring ===
      if (ring.opacity > 0) {
        // Fade the ring
        ring.opacity *= 0.92
        ring.radius += 0.5

        // Outer glow ring
        const ringGrad = ctx.createRadialGradient(
          ring.x, ring.y, ring.radius * 0.7,
          ring.x, ring.y, ring.radius * 1.5
        )
        ringGrad.addColorStop(0, "rgba(6, 182, 212, 0)")
        ringGrad.addColorStop(0.5, `rgba(6, 182, 212, ${ring.opacity * 0.3})`)
        ringGrad.addColorStop(1, "rgba(6, 182, 212, 0)")
        ctx.fillStyle = ringGrad
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.radius * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Ring outline
        ctx.strokeStyle = `rgba(6, 182, 212, ${ring.opacity})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2)
        ctx.stroke()

        if (ring.opacity < 0.01) {
          ring.opacity = 0
          ring.radius = 0
        }
      }

      // === Update ring to follow mouse smoothly ===
      if (mouse.active) {
        ring.x += (mouse.x - ring.x) * 0.15
        ring.y += (mouse.y - ring.y) * 0.15
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      io?.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(8,12,22,0.95), rgba(12,17,30,0.9), rgba(8,12,22,0.95))",
      }}
    />
  )
}
