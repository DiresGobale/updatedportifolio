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
        // Removed filter: blur(2px) — the radial-gradient already fades to
        // transparent at 80%, so the edges are soft without an expensive
        // per-frame blur filter. Saves a filter rasterization per orb.
        boxShadow: "0 0 20px currentColor",
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
// Reduced from 3 to 1 for performance: each cube = 6 preserve-3d faces,
// 3 cubes = 18 GPU layers. 1 cube keeps the visual interest at 1/3 cost.
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
]

// === Wireframe polyhedrons — colorful, rotating in 3D ===
// Reduced from 3 to 1 for performance: each polyhedron = 3 preserve-3d rings,
// 3 polyhedrons = 9 GPU layers. 1 polyhedron keeps the look at 1/3 cost.
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
]

// === Floating gradient orbs at different Z depths (parallax) ===
// Reduced from 3 to 2 for performance: orbs use blur(2px) and animate
// opacity/scale, which is moderately expensive. 2 orbs cover the visual
// need without tripling the cost.
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
]

// === 3D floating symbols ===
// REMOVED for performance: 4 small symbols each used preserve-3d + multi-axis
// rotation animations. The visual benefit was minimal (they're tiny) but the
// GPU layer cost was real. The existing 2D floating symbols in
// AnimatedDecorations cover this aesthetic already.
const symbols3D: never[] = []

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

      {/* === 3D floating symbols removed for performance ===
          The empty symbols3D array means this renders nothing,
          but we keep the map for easy re-enablement if needed. */}
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
