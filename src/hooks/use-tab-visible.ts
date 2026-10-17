"use client"

import { useEffect, useState } from "react"

/**
 * useTabVisible — a tiny hook that tracks whether the page's tab is visible.
 *
 * Uses the Page Visibility API (`document.visibilityState`). When the user
 * switches to another tab or minimizes the browser, this returns `false`.
 * When they come back, it returns `true`.
 *
 * The PerformanceProvider uses this to toggle a `data-tab-hidden` attribute
 * on <html>, which our CSS rules use to pause all background animations.
 *
 * Why this matters: the portfolio has 25+ animated background elements
 * (butterflies, code symbols, 3D cubes, polyhedrons, parallax orbs) that
 * keep running even when no one is looking at the page. Pausing them when
 * the tab is hidden saves real CPU/GPU cycles and battery on laptops and
 * mobile devices — with zero visual impact (no one sees them anyway).
 *
 * Usage:
 *   const isVisible = useTabVisible()
 *   if (!isVisible) { skip non-critical work }
 */
export function useTabVisible(): boolean {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // SSR guard
    if (typeof document === "undefined") return

    const update = () => {
      setVisible(document.visibilityState === "visible")
    }

    // Initial state
    update()

    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  return visible
}
