"use client"

/**
 * AnimatedDecorations — a layer of small, neat, aesthetically-pleasing
 * decorative background elements.
 *
 * Design ethos (refined):
 *   • SMALL — every element is 14–22px (previously 24–64px).
 *   • NEAT — uniform sizing within each category, consistent spacing.
 *   • DELICATE — thin font weights (300–500), soft subtle glow.
 *   • AESTHETIC — muted opacity (0.18–0.28), restrained color use.
 *
 * Contents:
 *   • Small butterflies with delicate wing-flap (24×18 SVG)
 *   • Small floating numbers (14–18px)
 *   • Small coding symbols — { } [ ] ( ) ; , => fn </> (16–22px)
 *   • Small arrows → ↗ ↘ ⇄ (16–20px)
 *
 * Performance & UX preserved:
 *   • GPU-friendly CSS animations (transform + opacity only)
 *   • Honors prefers-reduced-motion
 *   • Reduced set on mobile (battery/CPU friendly)
 *   • pointer-events: none — never blocks clicks
 *   • z-index: 0 in fixed background layer (behind main content)
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

// === Floating coding symbols (small, neat 16–22px) ===
const symbols: SymbolElement[] = [
  // Curly braces — thin weight for elegance
  { char: "{", color: "cyan", size: 20, left: "8%", top: "20%", animation: "deco-sway", duration: "14s", delay: "0s", opacity: 0.22, fontWeight: 300, hideOnMobile: false },
  { char: "}", color: "amber", size: 22, left: "85%", top: "35%", animation: "deco-sway", duration: "16s", delay: "3s", opacity: 0.22, fontWeight: 300, hideOnMobile: true },
  { char: "{}", color: "violet", size: 16, left: "20%", top: "70%", animation: "deco-bob", duration: "8s", delay: "1s", opacity: 0.2, fontWeight: 400, hideOnMobile: true },
  { char: "{ }", color: "pink", size: 18, left: "75%", top: "78%", animation: "deco-sway", duration: "18s", delay: "5s", opacity: 0.22, fontWeight: 400, hideOnMobile: true },

  // Brackets and parens — small and neat
  { char: "[ ]", color: "teal", size: 18, left: "92%", top: "55%", animation: "deco-sway", duration: "15s", delay: "2s", opacity: 0.22, fontWeight: 400, hideOnMobile: true },
  { char: "( )", color: "cyan", size: 16, left: "5%", top: "60%", animation: "deco-bob", duration: "10s", delay: "4s", opacity: 0.2, fontWeight: 400, hideOnMobile: true },

  // Semicolons and commas — small punctuation marks
  { char: ";", color: "amber", size: 22, left: "15%", top: "45%", animation: "deco-bob", duration: "7s", delay: "2.5s", opacity: 0.25, fontWeight: 500, hideOnMobile: false },
  { char: ",", color: "violet", size: 20, left: "88%", top: "82%", animation: "deco-bob", duration: "9s", delay: "0.5s", opacity: 0.22, fontWeight: 500, hideOnMobile: true },

  // Function-related symbols — small and refined
  { char: "=>", color: "pink", size: 18, left: "30%", top: "15%", animation: "deco-sway", duration: "12s", delay: "1s", opacity: 0.28, fontWeight: 500, hideOnMobile: true },
  { char: "fn", color: "cyan", size: 16, left: "60%", top: "8%", animation: "deco-bob", duration: "11s", delay: "3.5s", opacity: 0.25, fontWeight: 600, hideOnMobile: true },
  { char: "</>", color: "amber", size: 16, left: "40%", top: "88%", animation: "deco-sway", duration: "17s", delay: "6s", opacity: 0.22, fontWeight: 500, hideOnMobile: true },
  { char: "()", color: "teal", size: 18, left: "82%", top: "12%", animation: "deco-bob", duration: "13s", delay: "7s", opacity: 0.22, fontWeight: 500, hideOnMobile: true },
]

// === Floating numbers (small 14–18px) ===
const numbers: SymbolElement[] = [
  { char: "0", color: "cyan", size: 18, left: "12%", top: "85%", animation: "deco-drift-up", duration: "22s", delay: "0s", opacity: 0.22, driftX: 40, rotate: 360, hideOnMobile: true, fontWeight: 600 },
  { char: "1", color: "amber", size: 20, left: "70%", top: "92%", animation: "deco-drift-up", duration: "26s", delay: "4s", opacity: 0.22, driftX: -50, rotate: 360, hideOnMobile: false, fontWeight: 600 },
  { char: "01", color: "violet", size: 14, left: "25%", top: "30%", animation: "deco-bob", duration: "9s", delay: "1.5s", opacity: 0.2, hideOnMobile: true, fontWeight: 500 },
  { char: "42", color: "pink", size: 16, left: "85%", top: "25%", animation: "deco-drift-up", duration: "24s", delay: "8s", opacity: 0.22, driftX: 30, rotate: 180, hideOnMobile: true, fontWeight: 600 },
  { char: "7", color: "teal", size: 18, left: "55%", top: "75%", animation: "deco-drift-up", duration: "28s", delay: "12s", opacity: 0.2, driftX: -40, rotate: 360, hideOnMobile: true, fontWeight: 600 },
  { char: "101", color: "cyan", size: 14, left: "38%", top: "55%", animation: "deco-sway", duration: "14s", delay: "2s", opacity: 0.18, hideOnMobile: true, fontWeight: 500 },
]

// === Arrows (small 16–20px) ===
const arrows: SymbolElement[] = [
  { char: "→", color: "amber", size: 20, left: "18%", top: "50%", animation: "deco-bob", duration: "8s", delay: "0s", opacity: 0.25, hideOnMobile: false, fontWeight: 400 },
  { char: "↗", color: "pink", size: 18, left: "65%", top: "65%", animation: "deco-bob", duration: "10s", delay: "3s", opacity: 0.22, hideOnMobile: true, fontWeight: 400 },
  { char: "↘", color: "violet", size: 18, left: "35%", top: "22%", animation: "deco-sway", duration: "13s", delay: "5s", opacity: 0.22, hideOnMobile: true, fontWeight: 400 },
  { char: "⇄", color: "teal", size: 16, left: "78%", top: "45%", animation: "deco-rotate", duration: "30s", delay: "1s", opacity: 0.2, hideOnMobile: true, fontWeight: 400 },
]

// === Butterflies (small 24×18 SVG, delicate) ===
const butterflies = [
  { color: COLORS.cyan, animation: "butterfly-fly-1", duration: "32s", delay: "0s", opacity: 0.32, hideOnMobile: true },
  { color: COLORS.amber, animation: "butterfly-fly-2", duration: "38s", delay: "10s", opacity: 0.3, hideOnMobile: false },
  { color: COLORS.violet, animation: "butterfly-fly-1", duration: "42s", delay: "20s", opacity: 0.25, hideOnMobile: true },
]

// === Butterfly SVG — smaller and more delicate (24×18, was 48×36) ===
function ButterflySVG({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="18"
      viewBox="0 0 48 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Left wing — flaps */}
      <g
        style={{
          transformOrigin: "24px 18px",
          animation: "butterfly-flap 0.4s ease-in-out infinite",
        }}
      >
        <path
          d="M24 18 C 18 4, 6 4, 4 12 C 2 18, 8 22, 14 20 C 18 19, 22 18, 24 18 Z"
          fill={color}
          fillOpacity="0.55"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.7"
        />
        <path
          d="M24 18 C 20 22, 14 28, 10 30 C 6 32, 4 28, 6 24 C 9 20, 16 18, 24 18 Z"
          fill={color}
          fillOpacity="0.45"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
      </g>
      {/* Right wing — flaps (mirrored) */}
      <g
        style={{
          transformOrigin: "24px 18px",
          animation: "butterfly-flap 0.4s ease-in-out infinite",
        }}
      >
        <path
          d="M24 18 C 30 4, 42 4, 44 12 C 46 18, 40 22, 34 20 C 30 19, 26 18, 24 18 Z"
          fill={color}
          fillOpacity="0.55"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.7"
        />
        <path
          d="M24 18 C 28 22, 34 28, 38 30 C 42 32, 44 28, 42 24 C 39 20, 32 18, 24 18 Z"
          fill={color}
          fillOpacity="0.45"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
      </g>
      {/* Body */}
      <ellipse cx="24" cy="18" rx="1" ry="7" fill={color} fillOpacity="0.8" />
      {/* Antennae */}
      <path
        d="M24 11 Q 22 7, 20 6"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M24 11 Q 26 7, 28 6"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

// === Render one floating symbol — small, neat, with subtle glow ===
function FloatingSymbol({ el }: { el: SymbolElement }) {
  const color = COLORS[el.color]
  const cssVars = {
    "--deco-opacity": String(el.opacity ?? 0.2),
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
        // Subtle, neat glow — smaller blur radius for a refined look
        textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
        lineHeight: 1,
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
