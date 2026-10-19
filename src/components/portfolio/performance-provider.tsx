"use client"

import { useEffect, type ReactNode } from "react"

/**
 * PerformanceProvider — aggressive non-invasive performance enhancer.
 *
 * Target: push performance score from ~57 to 90+.
 *
 * This component wraps the entire app and applies ALL of the following
 * WITHOUT modifying any existing component, style, or behavior:
 *
 * 1. **Tab visibility pausing** — pauses all background animations when
 *    the browser tab is hidden. Saves CPU/GPU/battery.
 *
 * 2. **Off-screen decoration pausing** — uses IntersectionObserver to
 *    detect when the background decoration layer scrolls fully out of
 *    view and pauses ALL animations inside it. This is the biggest win
 *    for scroll performance: 25+ 2D decorations + 3D cubes + polyhedrons
 *    + parallax orbs + butterflies all stop animating when off-screen.
 *
 * 3. **will-change management** — adds .is-animating class to visible
 *    decorations (enabling will-change only when needed) and removes
 *    it when they scroll off-screen (freeing GPU layers).
 *
 * 4. **Resource hints** — dns-prefetch + preconnect for Unsplash images
 *    and GitHub API. DNS/TLS handshake happens during idle time.
 *
 * 5. **requestIdleCallback deferral** — defers non-critical work
 *    (like adding resource hints) to browser idle time.
 *
 * Importantly: this component renders nothing visible. It only:
 *   - Adds event listeners
 *   - Toggles attributes/classes on existing elements
 *   - Injects <link> tags into <head>
 *
 * No existing code is modified. No existing behavior changes.
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

    updateVisibility()
    document.addEventListener("visibilitychange", updateVisibility)

    // === 2. Off-screen decoration pausing via IntersectionObserver ===
    // Find the background decoration container and pause its animations
    // when it scrolls fully out of view. This is the biggest scroll
    // performance win — 25+ animated elements stop consuming CPU/GPU.
    let bgObserver: IntersectionObserver | null = null
    let bgContainer: Element | null = null

    const setupBgObserver = () => {
      // The background container is the .fixed.inset-0.-z-10 div
      bgContainer = document.querySelector(".fixed.inset-0.-z-10")
      if (!bgContainer) return

      bgObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              // Background is visible — resume animations
              entry.target.classList.remove("deco-off-screen")
            } else {
              // Background is fully off-screen — pause all animations
              entry.target.classList.add("deco-off-screen")
            }
          }
        },
        { threshold: 0, rootMargin: "0px" }
      )

      bgObserver.observe(bgContainer)
    }

    // === 3. will-change management for decorative elements ===
    // Add .is-animating to visible decorations, remove it when off-screen.
    // This keeps will-change only on elements that need it, freeing GPU
    // layers for elements that are idle.
    let decoObserver: IntersectionObserver | null = null

    const setupDecoObserver = () => {
      const decoElements = document.querySelectorAll(".deco-element, .deco-3d-element")
      if (decoElements.length === 0) return

      decoObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-animating")
            } else {
              entry.target.classList.remove("is-animating")
            }
          }
        },
        { threshold: 0, rootMargin: "100px" }
      )

      decoElements.forEach((el) => decoObserver!.observe(el))
    }

    // === 4. Resource hints (deferred to idle callback) ===
    const addResourceHints = () => {
      const addLink = (rel: string, href: string) => {
        if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return
        const link = document.createElement("link")
        link.rel = rel
        link.href = href
        if (rel === "preconnect") link.crossOrigin = "anonymous"
        document.head.appendChild(link)
      }

      addLink("dns-prefetch", "https://images.unsplash.com")
      addLink("preconnect", "https://images.unsplash.com")
      addLink("dns-prefetch", "https://api.github.com")
      addLink("preconnect", "https://api.github.com")
    }

    // Use requestIdleCallback to defer non-critical setup
    const ric = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 200))
    ric(() => {
      addResourceHints()
      setupBgObserver()
      setupDecoObserver()
    })

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility)
      bgObserver?.disconnect()
      decoObserver?.disconnect()
    }
  }, [])

  return <>{children}</>
}
