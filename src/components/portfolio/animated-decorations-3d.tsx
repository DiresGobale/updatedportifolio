"use client"

/**
 * AnimatedDecorations3D — a colorful, attractive 3D motion layer for the
 * background. Sits in front of the existing 2D decorations and the floating
 * gradient orbs, but still behind all main content (pointer-events: none,
 * z-index 0 inside the fixed background layer).
 *
 * Contents:
 *   • Small 3D CSS cubes with 6 colorful gradient faces, tumbling in 3D
 *   • Wireframe-style 3D polyhedrons (rotating on multiple axes)
 *   • Colorful gradient orbs floating at different Z depths (parallax)
 *   • 3D floating code symbols at varying depths
 *
 * Design ethos:
 *   • COLORFUL — every face uses a brand-color gradient
 *   • ATTRACTIVE — visible motion (3D rotation, parallax drift) but still
 *     subtle enough not to distract from main content
 *   • SMALL & NEAT — cubes are 24–40px, orbs are 80–140px (blurred)
 *   • PERFORMANCE — GPU-friendly CSS animations (transform + opacity only),
 *     will-change hints, no JS per-frame work, hidden on mobile to save battery
 *
 * The whole layer is wrapped in a `deco-3d-stage` perspective container so
 * all children get proper 3D depth.
 */

// === Brand color gradients (used on cube faces) ===
const GRAD = {
  cyanToAmber: "linear-gradient(135deg, oklch(0.78 0.13 200), oklch(0.82 0.14 75))",
  violetToPink: "linear-gradient(135deg, oklch(0.72 0.16 280), oklch(0.72 0.16 330))",
  tealToCyan: "linear-gradient(135deg, oklch(0.7 0.14 165), oklch(0.78 0.13 200))",
  amberToPink: "linear-gradient(135deg, oklch(0.82 0.14 75), oklch(0.72 0.16 330))",
  cyanToViolet: "linear-gradient(135deg, oklch(0.78 0.13 200), oklch(0.72 0.16 280))",
  pinkToAmber: "linear-gradient(135deg, oklch(0.72 0.16 330), oklch(0.82 0.14 75))",
}

// === A single small 3D cube with 6 colorful gradient faces ===
// `size` is in px; the cube uses translateZ(size/2) on each face.
function ColorCube({
  size,
  faces,
}: {
  size: number
  faces: [string, string, string, string, string, string] // 6 gradients
}) {
  const half = size / 2
  // Common face style — semi-transparent so the cube feels light and airy
  const faceBase: React.CSSProperties = {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    border: "1px solid oklch(1 0 0 / 0.18)",
    backfaceVisibility: "hidden",
    boxShadow: "0 0 12px oklch(0.78 0.13 200 / 0.25)",
  }

  return (
    <div
      className="deco-3d-element"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front */}
      <div style={{ ...faceBase, background: faces[0], transform: `translateZ(${half}px)` }} />
      {/* Back */}
      <div style={{ ...faceBase, background: faces[1], transform: `rotateY(180deg) translateZ(${half}px)` }} />
      {/* Right */}
      <div style={{ ...faceBase, background: faces[2], transform: `rotateY(90deg) translateZ(${half}px)` }} />
      {/* Left */}
      <div style={{ ...faceBase, background: faces[3], transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      {/* Top */}
      <div style={{ ...faceBase, background: faces[4], transform: `rotateX(90deg) translateZ(${half}px)` }} />
      {/* Bottom */}
      <div style={{ ...faceBase, background: faces[5], transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </div>
  )
}

// === A wireframe 3D shape — just 3 intersecting rotated squares ===
function WirePolyhedron({ size, color }: { size: number; color: string }) {
  const half = size / 2
  const ringStyle: React.CSSProperties = {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    border: `1.5px solid ${color}`,
    borderRadius: "4px",
    boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
    backfaceVisibility: "visible",
  }

  return (
    <div
      className="deco-3d-element"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ ...ringStyle, transform: `rotateY(0deg) translateZ(${half}px)` }} />
      <div style={{ ...ringStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div style={{ ...ringStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
    </div>
  )
}

// === A colorful floating orb (radial gradient) — flat disc that we treat
//     as a "glowing planet" floating in 3D space ===
function FloatingOrb({
  size,
  colors,
}: {
  size: number
  colors: string // CSS background value (radial-gradient)
}) {
  return (
    <div
      className="deco-3d-element"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        background: colors,
        filter: "blur(2px)",
        boxShadow: "0 0 30px currentColor",
      }}
    />
  )
}

// === A 3D floating code symbol (just text, but with 3D transforms) ===
function FloatingSymbol3D({
  char,
  color,
  size,
  weight,
}: {
  char: string
  color: string
  size: number
  weight: number
}) {
  return (
    <div
      className="deco-3d-element"
      style={{
        fontSize: `${size}px`,
        fontWeight: weight,
        fontFamily: "var(--font-geist-mono), monospace",
        color,
        textShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
        lineHeight: 1,
        transformStyle: "preserve-3d",
      }}
    >
      {char}
    </div>
  )
}

// === Cubes — small (24–36px), colorful, tumbling in 3D ===
const cubes = [
  {
    size: 32,
    left: "12%",
    top: "18%",
    animation: "deco-3d-tumble",
    duration: "18s",
    delay: "0s",
    opacity: 0.55,
    hideOnMobile: true,
    faces: [
      GRAD.cyanToAmber,
      GRAD.violetToPink,
      GRAD.tealToCyan,
      GRAD.amberToPink,
      GRAD.cyanToViolet,
      GRAD.pinkToAmber,
    ] as [string, string, string, string, string, string],
  },
  {
    size: 26,
    left: "82%",
    top: "28%",
    animation: "deco-3d-tumble",
    duration: "22s",
    delay: "5s",
    opacity: 0.5,
    hideOnMobile: true,
    faces: [
      GRAD.violetToPink,
      GRAD.cyanToAmber,
      GRAD.amberToPink,
      GRAD.tealToCyan,
      GRAD.pinkToAmber,
      GRAD.cyanToViolet,
    ] as [string, string, string, string, string, string],
  },
  {
    size: 36,
    left: "70%",
    top: "70%",
    animation: "deco-3d-tumble",
    duration: "26s",
    delay: "10s",
    opacity: 0.5,
    hideOnMobile: true,
    faces: [
      GRAD.tealToCyan,
      GRAD.amberToPink,
      GRAD.cyanToViolet,
      GRAD.violetToPink,
      GRAD.cyanToAmber,
      GRAD.pinkToAmber,
    ] as [string, string, string, string, string, string],
  },
]

// === Wireframe polyhedrons — colorful, rotating in 3D ===
const polyhedrons = [
  {
    size: 40,
    left: "25%",
    top: "75%",
    color: "oklch(0.82 0.14 75)",
    animation: "deco-3d-rotate",
    duration: "24s",
    delay: "2s",
    opacity: 0.45,
    hideOnMobile: true,
  },
  {
    size: 32,
    left: "55%",
    top: "12%",
    color: "oklch(0.78 0.13 200)",
    animation: "deco-3d-rotate",
    duration: "20s",
    delay: "8s",
    opacity: 0.5,
    hideOnMobile: true,
  },
  {
    size: 36,
    left: "90%",
    top: "60%",
    color: "oklch(0.72 0.16 330)",
    animation: "deco-3d-rotate",
    duration: "28s",
    delay: "14s",
    opacity: 0.4,
    hideOnMobile: true,
  },
]

// === Floating gradient orbs at different Z depths (parallax) ===
const orbs = [
  {
    size: 100,
    left: "15%",
    top: "55%",
    colors:
      "radial-gradient(circle at 30% 30%, oklch(0.78 0.13 200 / 0.6), oklch(0.72 0.16 280 / 0.3) 60%, transparent 80%)",
    animation: "deco-3d-parallax",
    duration: "16s",
    delay: "1s",
    opacity: 0.6,
    hideOnMobile: true,
  },
  {
    size: 130,
    left: "78%",
    top: "40%",
    colors:
      "radial-gradient(circle at 30% 30%, oklch(0.82 0.14 75 / 0.55), oklch(0.72 0.16 330 / 0.3) 60%, transparent 80%)",
    animation: "deco-3d-parallax",
    duration: "20s",
    delay: "6s",
    opacity: 0.55,
    hideOnMobile: true,
  },
  {
    size: 90,
    left: "45%",
    top: "85%",
    colors:
      "radial-gradient(circle at 30% 30%, oklch(0.7 0.14 165 / 0.55), oklch(0.78 0.13 200 / 0.3) 60%, transparent 80%)",
    animation: "deco-3d-parallax",
    duration: "18s",
    delay: "11s",
    opacity: 0.5,
    hideOnMobile: true,
  },
]

// === 3D floating symbols (small, code-themed, colorful) ===
const symbols3D = [
  { char: "{", color: "oklch(0.78 0.13 200)", size: 22, weight: 300, left: "30%", top: "30%", animation: "deco-3d-float-1", duration: "14s", delay: "0s", opacity: 0.45, hideOnMobile: true },
  { char: "}", color: "oklch(0.82 0.14 75)", size: 24, weight: 300, left: "65%", top: "65%", animation: "deco-3d-float-2", duration: "16s", delay: "3s", opacity: 0.45, hideOnMobile: true },
  { char: "</>", color: "oklch(0.72 0.16 280)", size: 18, weight: 500, left: "20%", top: "85%", animation: "deco-3d-float-3", duration: "18s", delay: "5s", opacity: 0.4, hideOnMobile: true },
  { char: "=>", color: "oklch(0.72 0.16 330)", size: 18, weight: 500, left: "85%", top: "15%", animation: "deco-3d-float-1", duration: "15s", delay: "8s", opacity: 0.42, hideOnMobile: true },
]

export function AnimatedDecorations3D() {
  return (
    // The stage wraps everything in a perspective container so the children
    // get proper 3D depth. The stage itself fills the parent (the fixed
    // background layer) and is pointer-events: none.
    <div
      aria-hidden
      className="deco-3d-stage absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* === Floating gradient orbs (parallax depth) === */}
      {orbs.map((o, i) => (
        <div
          key={`orb3d-${i}`}
          className={`deco-3d-element ${o.hideOnMobile ? "deco-3d-hide-mobile" : ""}`}
          style={{
            left: o.left,
            top: o.top,
            opacity: o.opacity,
            animation: `${o.animation} ${o.duration} ease-in-out ${o.delay} infinite`,
          }}
        >
          <FloatingOrb size={o.size} colors={o.colors} />
        </div>
      ))}

      {/* === 3D wireframe polyhedrons === */}
      {polyhedrons.map((p, i) => (
        <div
          key={`poly-${i}`}
          className={`deco-3d-element ${p.hideOnMobile ? "deco-3d-hide-mobile" : ""}`}
          style={{
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            animation: `${p.animation} ${p.duration} linear ${p.delay} infinite`,
          }}
        >
          <WirePolyhedron size={p.size} color={p.color} />
        </div>
      ))}

      {/* === Colorful 3D cubes === */}
      {cubes.map((c, i) => (
        <div
          key={`cube-${i}`}
          className={`deco-3d-element ${c.hideOnMobile ? "deco-3d-hide-mobile" : ""}`}
          style={{
            left: c.left,
            top: c.top,
            opacity: c.opacity,
            animation: `${c.animation} ${c.duration} linear ${c.delay} infinite`,
          }}
        >
          <ColorCube size={c.size} faces={c.faces} />
        </div>
      ))}

      {/* === 3D floating code symbols === */}
      {symbols3D.map((s, i) => (
        <div
          key={`sym3d-${i}`}
          className={`deco-3d-element ${s.hideOnMobile ? "deco-3d-hide-mobile" : ""}`}
          style={{
            left: s.left,
            top: s.top,
            opacity: s.opacity,
            animation: `${s.animation} ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        >
          <FloatingSymbol3D
            char={s.char}
            color={s.color}
            size={s.size}
            weight={s.weight}
          />
        </div>
      ))}
    </div>
  )
}
