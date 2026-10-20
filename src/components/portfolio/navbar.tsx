"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code2, Download, Shield } from "lucide-react"
import { navLinks, profile } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    // Capture whether the mobile menu was open before we close it.
    // On mobile, the menu's height close-animation (250ms) interferes with
    // smooth scrollIntoView — the layout shift cancels the smooth scroll.
    // So we delay the scroll until after the animation finishes.
    const wasMobileMenuOpen = mobileOpen
    setMobileOpen(false)

    const scrollToSection = () => {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    if (wasMobileMenuOpen) {
      // Wait for the menu close animation (250ms) + small buffer
      setTimeout(scrollToSection, 280)
    } else {
      // Desktop — no menu animation, scroll immediately
      scrollToSection()
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="group flex items-center gap-2 text-lg font-semibold tracking-tight"
            aria-label="Go to home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-md shadow-brand-glow/30 transition-transform group-hover:scale-110">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="font-mono text-sm sm:text-base">
              {profile.firstName.toLowerCase()}
              <span className="text-gradient">.dev</span>
            </span>
          </button>

          {/* Desktop nav — with animated yellow underline on hover (pure CSS) */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "nav-underline-trigger relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}

                    {/* === Yellow underline on hover (grows from center) ===
                        Pure CSS :hover approach for reliable real-mouse
                        interaction. See `.nav-underline` in globals.css. */}
                    <span aria-hidden className="nav-underline" />

                    {/* === Persistent underline for the active section === */}
                    {isActive && (
                      <span aria-hidden className="nav-underline-active" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* CTA on desktop — Admin link + Download CV button (right side of navbar) */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/admin"
              aria-label="Admin Panel"
              className="inline-flex items-center justify-center rounded-full border border-border/40 p-2 text-muted-foreground hover:text-accent hover:border-accent/40 transition-all"
              title="Admin Panel"
            >
              <Shield className="h-4 w-4" />
            </a>
            <a
              href={profile.resumeUrl}
              download="Dires-Gobale-CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-4 py-2 text-xs font-semibold shadow-md shadow-brand-glow/20 hover:opacity-90 transition-opacity group"
            >
              <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>
          </div>

          {/* Mobile toggle + Admin + Download CV — visible on small screens only */}
          <div className="flex md:hidden items-center gap-2">
            {/* Admin icon */}
            <a
              href="/admin"
              aria-label="Admin Panel"
              className="inline-flex items-center justify-center rounded-full border border-border/40 p-2 text-muted-foreground hover:text-accent hover:border-accent/40 transition-all"
            >
              <Shield className="h-4 w-4" />
            </a>
            {/* Download CV — compact icon-only button on mobile */}
            <a
              href={profile.resumeUrl}
              download="Dires-Gobale-CV.pdf"
              aria-label="Download CV"
              className="inline-flex items-center justify-center rounded-full bg-gradient-brand text-primary-foreground p-2 shadow-md shadow-brand-glow/20 hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
            </a>
            <button
              className="p-2 rounded-lg text-foreground hover:bg-secondary/60 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "")
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "nav-underline-trigger relative w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          isActive
                            ? "text-foreground bg-accent/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        )}
                      >
                        {link.label}

                        {/* Yellow underline on hover — grows from left on mobile */}
                        <span aria-hidden className="nav-underline-mobile" />

                        {/* Persistent underline for active section on mobile */}
                        {isActive && (
                          <span aria-hidden className="nav-underline-active-mobile" />
                        )}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
