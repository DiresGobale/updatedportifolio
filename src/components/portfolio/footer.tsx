"use client"

import { motion } from "framer-motion"
import { Code2, ArrowUp, Shield } from "lucide-react"
import { navLinks, profile, socialLinks } from "@/lib/portfolio-data"
import { SocialIcon } from "./social-icon"

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-md shadow-brand-glow/30">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="font-mono text-base font-semibold">
                {profile.firstName.toLowerCase()}
                <span className="text-gradient">.dev</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Fourth-year Information System student at Injibara University. Building web apps with React/Next.js/Node.js and mobile apps with Flutter.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Quick links</h4>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <Shield className="h-3.5 w-3.5" />
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass-card text-muted-foreground hover:text-accent transition-colors"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript,
            Tailwind CSS, and Framer Motion.
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("#home")}
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full glass-card">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
