"use client"

/**
 * AnimatedDecorations — a layer of subtle, decorative background elements.
 *
 * Contents:
 *   • 2 butterflies flying diagonally across the screen (SVG, wing-flap)
 *   • Floating numbers (0, 1, 42, 7, etc.) drifting upward
 *   • Coding symbols — `{ }`, `[ ]`, `( )`, `;`, `,`, `=>`, `fn`, `< />`
 *   • Arrows moving in different directions (`→`, `↗`, `↘`)
 *   • A few gently rotating symbols
 *
 * Design principles:
 *   • All elements use the brand palette (cyan, amber, violet, pink, teal)
 *   • Semi-transparent (0.25–0.45 opacity) — subtle, not distracting
 *   • Soft glow via drop-shadow filter
 *   • GPU-friendly animations (transform + opacity only)
 *   • CSS animations only (no JS per-frame work) for performance
 *   • Honors prefers-reduced-motion (animations disabled)
 *   • Some elements hidden on small screens for battery/CPU savings
 *   • pointer-events: none so they never block clicks
 *   • z-index: 0 inside the fixed background layer (behind main content)
 */

// === Brand colors (oklch) ===
const COLORS = {
  cyan: "oklch(0.78 0.13 200)",
  amber: "oklch(0.82 0.14 75)",
  violet: "oklch(0.72 0.16 280)",
  pink: "oklch(0.72 0.16 330)",
  teal: "oklch(0.7 0.14 165)",
}

// === Types of decorative elements ===
type SymbolElement = {
  char: string
  color: keyof typeof COLORS
  size: number
  left: string
  top: string
  animation: string
  duration: string
  delay: string
  opacity?: number
  rotate?: number
  driftX?: number
  hideOnMobile?: boolean
  fontWeight?: number
}

// === Floating coding symbols ===
const symbols: SymbolElement[] = [
  // Curly braces
  { char: "{", color: "cyan", size: 48, left: "8%", top: "20%", animation: "deco-sway", duration: "14s", delay: "0s", opacity: 0.22, fontWeight: 300, hideOnMobile: false },
  { char: "}", color: "amber", size: 56, left: "85%", top: "35%", animation: "deco-sway", duration: "16s", delay: "3s", opacity: 0.22, fontWeight: 300, hideOnMobile: true },
  { char: "{}", color: "violet", size: 32, left: "20%", top: "70%", animation: "deco-bob", duration: "8s", delay: "1s", opacity: 0.2, fontWeight: 500, hideOnMobile: true },
  { char: "{ }", color: "pink", size: 38, left: "75%", top: "78%", animation: "deco-sway", duration: "18s", delay: "5s", opacity: 0.22, fontWeight: 400, hideOnMobile: true },

  // Brackets and parens
  { char: "[ ]", color: "teal", size: 36, left: "92%", top: "55%", animation: "deco-sway", duration: "15s", delay: "2s", opacity: 0.22, fontWeight: 400, hideOnMobile: true },
  { char: "( )", color: "cyan", size: 30, left: "5%", top: "60%", animation: "deco-bob", duration: "10s", delay: "4s", opacity: 0.2, fontWeight: 400, hideOnMobile: true },

  // Semicolons and commas
  { char: ";", color: "amber", size: 64, left: "15%", top: "45%", animation: "deco-bob", duration: "7s", delay: "2.5s", opacity: 0.25, fontWeight: 600, hideOnMobile: false },
  { char: ",", color: "violet", size: 48, left: "88%", top: "82%", animation: "deco-bob", duration: "9s", delay: "0.5s", opacity: 0.22, fontWeight: 600, hideOnMobile: true },

  // Function-related symbols
  { char: "=>", color: "pink", size: 42, left: "30%", top: "15%", animation: "deco-sway", duration: "12s", delay: "1s", opacity: 0.28, fontWeight: 600, hideOnMobile: true },
  { char: "fn", color: "cyan", size: 32, left: "60%", top: "8%", animation: "deco-bob", duration: "11s", delay: "3.5s", opacity: 0.25, fontWeight: 700, hideOnMobile: true },
  { char: "</>", color: "amber", size: 30, left: "40%", top: "88%", animation: "deco-sway", duration: "17s", delay: "6s", opacity: 0.22, fontWeight: 500, hideOnMobile: true },
  { char: "()", color: "teal", size: 36, left: "82%", top: "12%", animation: "deco-bob", duration: "13s", delay: "7s", opacity: 0.22, fontWeight: 600, hideOnMobile: true },
]

// === Floating numbers ===
const numbers: SymbolElement[] = [
  { char: "0", color: "cyan", size: 40, left: "12%", top: "85%", animation: "deco-drift-up", duration: "22s", delay: "0s", opacity: 0.22, driftX: 40, rotate: 360, hideOnMobile: true, fontWeight: 700 },
  { char: "1", color: "amber", size: 52, left: "70%", top: "92%", animation: "deco-drift-up", duration: "26s", delay: "4s", opacity: 0.22, driftX: -50, rotate: 360, hideOnMobile: false, fontWeight: 700 },
  { char: "01", color: "violet", size: 28, left: "25%", top: "30%", animation: "deco-bob", duration: "9s", delay: "1.5s", opacity: 0.2, hideOnMobile: true, fontWeight: 600 },
  { char: "42", color: "pink", size: 36, left: "85%", top: "25%", animation: "deco-drift-up", duration: "24s", delay: "8s", opacity: 0.22, driftX: 30, rotate: 180, hideOnMobile: true, fontWeight: 700 },
  { char: "7", color: "teal", size: 44, left: "55%", top: "75%", animation: "deco-drift-up", duration: "28s", delay: "12s", opacity: 0.2, driftX: -40, rotate: 360, hideOnMobile: true, fontWeight: 700 },
  { char: "101", color: "cyan", size: 24, left: "38%", top: "55%", animation: "deco-sway", duration: "14s", delay: "2s", opacity: 0.18, hideOnMobile: true, fontWeight: 600 },
]

// === Arrows ===
const arrows: SymbolElement[] = [
  { char: "→", color: "amber", size: 36, left: "18%", top: "50%", animation: "deco-bob", duration: "8s", delay: "0s", opacity: 0.25, hideOnMobile: false, fontWeight: 400 },
  { char: "↗", color: "pink", size: 30, left: "65%", top: "65%", animation: "deco-bob", duration: "10s", delay: "3s", opacity: 0.22, hideOnMobile: true, fontWeight: 400 },
  { char: "↘", color: "violet", size: 32, left: "35%", top: "22%", animation: "deco-sway", duration: "13s", delay: "5s", opacity: 0.22, hideOnMobile: true, fontWeight: 400 },
  { char: "⇄", color: "teal", size: 28, left: "78%", top: "45%", animation: "deco-rotate", duration: "30s", delay: "1s", opacity: 0.2, hideOnMobile: true, fontWeight: 400 },
]

// === Butterflies (SVG) ===
const butterflies = [
  { color: COLORS.cyan, animation: "butterfly-fly-1", duration: "32s", delay: "0s", opacity: 0.32, hideOnMobile: true },
  { color: COLORS.amber, animation: "butterfly-fly-2", duration: "38s", delay: "10s", opacity: 0.3, hideOnMobile: false },
  { color: COLORS.violet, animation: "butterfly-fly-1", duration: "42s", delay: "20s", opacity: 0.25, hideOnMobile: true },
]

// === Butterfly SVG component ===
function ButterflySVG({ color }: { color: string }) {
  return (
    <svg
      width="48"
      height="36"
      viewBox="0 0 48 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Left wing */}
      <g
        style={{
          transformOrigin: "24px 18px",
          animation: "butterfly-flap 0.4s ease-in-out infinite",
        }}
      >
        <path
          d="M24 18 C 18 4, 6 4, 4 12 C 2 18, 8 22, 14 20 C 18 19, 22 18, 24 18 Z"
          fill={color}
          fillOpacity="0.65"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.8"
        />
        <path
          d="M24 18 C 20 22, 14 28, 10 30 C 6 32, 4 28, 6 24 C 9 20, 16 18, 24 18 Z"
          fill={color}
          fillOpacity="0.55"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      </g>
      {/* Right wing (mirrored, also flaps) */}
      <g
        style={{
          transformOrigin: "24px 18px",
          animation: "butterfly-flap 0.4s ease-in-out infinite",
        }}
      >
        <path
          d="M24 18 C 30 4, 42 4, 44 12 C 46 18, 40 22, 34 20 C 30 19, 26 18, 24 18 Z"
          fill={color}
          fillOpacity="0.65"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.8"
        />
        <path
          d="M24 18 C 28 22, 34 28, 38 30 C 42 32, 44 28, 42 24 C 39 20, 32 18, 24 18 Z"
          fill={color}
          fillOpacity="0.55"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      </g>
      {/* Body */}
      <ellipse cx="24" cy="18" rx="1.2" ry="8" fill={color} fillOpacity="0.9" />
      {/* Antennae */}
      <path
        d="M24 10 Q 22 6, 20 5"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M24 10 Q 26 6, 28 5"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

// === Render one floating symbol ===
function FloatingSymbol({ el }: { el: SymbolElement }) {
  const color = COLORS[el.color]
  const cssVars = {
    "--deco-opacity": String(el.opacity ?? 0.3),
    "--deco-drift-x": `${el.driftX ?? 0}px`,
    "--deco-rotate": `${el.rotate ?? 0}deg`,
  } as React.CSSProperties

  return (
    <span
      aria-hidden
      className={`deco-element ${el.hideOnMobile ? "deco-hide-mobile" : ""}`}
      style={{
        left: el.left,
        top: el.top,
        fontSize: `${el.size}px`,
        fontWeight: el.fontWeight ?? 400,
        fontFamily: "var(--font-geist-mono), monospace",
        color,
        animation: `${el.animation} ${el.duration} ease-in-out ${el.delay} infinite`,
        textShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
        ...cssVars,
      }}
    >
      {el.char}
    </span>
  )
}

export function AnimatedDecorations() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* === Butterflies === */}
      {butterflies.map((b, i) => (
        <div
          key={`butterfly-${i}`}
          className={`deco-element ${b.hideOnMobile ? "deco-hide-mobile" : ""}`}
          style={
            {
              left: 0,
              top: 0,
              animation: `${b.animation} ${b.duration} linear ${b.delay} infinite`,
              "--deco-opacity": String(b.opacity),
            } as React.CSSProperties
          }
        >
          <ButterflySVG color={b.color} />
        </div>
      ))}

      {/* === Floating symbols === */}
      {symbols.map((el, i) => (
        <FloatingSymbol key={`symbol-${i}`} el={el} />
      ))}

      {/* === Floating numbers === */}
      {numbers.map((el, i) => (
        <FloatingSymbol key={`number-${i}`} el={el} />
      ))}

      {/* === Arrows === */}
      {arrows.map((el, i) => (
        <FloatingSymbol key={`arrow-${i}`} el={el} />
      ))}
    </div>
  )
}
