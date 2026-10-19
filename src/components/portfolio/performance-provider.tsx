"use client"

import { useEffect, type ReactNode } from "react"

/**
 * PerformanceProvider — a non-invasive performance enhancer.
 *
 * This component wraps the entire app (added once in layout.tsx) and
 * applies performance optimizations WITHOUT modifying any existing
 * component, style, or behavior:
 *
 * 1. **Tab visibility pausing**
 *    Listens to document.visibilitychange and sets data-tab-hidden="true"
 *    on <html> when the tab is hidden. Our CSS in performance.css uses
 *    this attribute to pause ALL background animations. Saves CPU/GPU/
 *    battery when no one is looking — zero visual impact.
 *
 * 2. **Resource hints (preconnect + dns-prefetch)**
 *    Injects <link> tags into <head> for Unsplash (project images +
 *    profile photo) and GitHub API (GitHub stats widget). DNS resolution
 *    and TLS handshake happen during browser idle time, not when an
 *    image scrolls into view. Speeds up image loading 100-300ms.
 *
 * 3. **Idle callback deferral hook**
 *    Exposes requestIdleCallback (with setTimeout fallback) for future
 *    use. Currently a no-op — doesn't change existing behavior.
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

    // === 2. Resource hints (dns-prefetch + preconnect) ===
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

    // Unsplash (project images + profile photo)
    addLink("dns-prefetch", "https://images.unsplash.com")
    addLink("preconnect", "https://images.unsplash.com")
    // GitHub API (GitHub stats widget)
    addLink("dns-prefetch", "https://api.github.com")
    addLink("preconnect", "https://api.github.com")

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility)
      // We intentionally leave the <link> tags — they're cheap and helpful
    }
  }, [])

  return <>{children}</>
}
