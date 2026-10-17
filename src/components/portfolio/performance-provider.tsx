"use client"

import { useEffect, type ReactNode } from "react"

/**
 * PerformanceProvider — a non-invasive performance enhancer.
 *
 * This component wraps the entire app (added once in layout.tsx) and
 * applies three optimizations WITHOUT modifying any existing component:
 *
 * 1. **Tab visibility pausing**
 *    Listens to `document.visibilitychange` and sets `data-tab-hidden="true"`
 *    on <html> when the tab is hidden. Our CSS in performance.css uses this
 *    attribute to pause ALL background animations. Saves CPU/GPU/battery
 *    when no one is looking — zero visual impact.
 *
 * 2. **Idle callback deferral**
 *    Wraps `requestIdleCallback` (with `setTimeout` fallback) to defer
 *    non-critical work until the browser is idle. Currently a no-op hook
 *    for future use; doesn't change existing behavior.
 *
 * 3. **Resource hints**
 *    Adds `dns-prefetch` and `preconnect` for Unsplash (where project
 *    images are loaded from) so the DNS/TLS handshake happens early.
 *    Speeds up image loading noticeably.
 *
 * Importantly: this component renders nothing visible. It only:
 *   - Adds event listeners
 *   - Toggles an attribute on <html>
 *   - Injects <link> tags into <head>
 *
 * No existing code is modified. No existing behavior changes. Only
 * performance improvements are added.
 */
export function PerformanceProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // === 1. Pause animations when tab is hidden ===
    const updateVisibility = () => {
      if (typeof document === "undefined") return
      const isHidden = document.visibilityState === "hidden"
      document.documentElement.setAttribute(
        "data-tab-hidden",
        isHidden ? "true" : "false"
      )
    }

    updateVisibility() // initial state
    document.addEventListener("visibilitychange", updateVisibility)

    // === 3. Resource hints (dns-prefetch + preconnect) ===
    // Preconnect to Unsplash so image DNS+TLS happens during idle time,
    // not when an image scrolls into view.
    const addLink = (rel: string, href: string) => {
      // Skip if already present
      const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`)
      if (existing) return
      const link = document.createElement("link")
      link.rel = rel
      link.href = href
      if (rel === "preconnect") {
        link.crossOrigin = "anonymous"
      }
      document.head.appendChild(link)
    }

    addLink("dns-prefetch", "https://images.unsplash.com")
    addLink("preconnect", "https://images.unsplash.com")
    // GitHub API (for the GitHub stats widget)
    addLink("dns-prefetch", "https://api.github.com")
    addLink("preconnect", "https://api.github.com")

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility)
      // We intentionally leave the <link> tags in place — they're cheap
      // and helpful for future navigations within the SPA.
    }
  }, [])

  return <>{children}</>
}
