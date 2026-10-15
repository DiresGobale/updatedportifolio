"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import { profile, socialLinks } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { SocialIcon } from "./social-icon"
import { TypewriterEffect } from "./typewriter-effect"
import { HeroPhoto } from "./hero-photo"
import { fadeInUp, fadeInDown, scaleIn } from "./motion"

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-20 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Grid: single column on mobile (text first, photo second),
            two columns on md+ (tablet & desktop) with text on left, photo right.
            Mobile gap is 24px (gap-6) for tighter, balanced spacing — the
            previous 40px gap created an awkward disconnect between text
            and photo. Tablet/desktop keep larger gaps for breathing room. */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-center">
          {/* === Text content === */}
          <div className="text-center md:text-left order-1">
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-accent-foreground"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.available ? "Available for new projects" : "Currently booked"}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
            >
              <span className="block">Hi, I am</span>
              <span className="block text-gradient text-5xl sm:text-6xl lg:text-7xl xl:text-8xl my-1 leading-tight">
                {profile.firstName}
              </span>
              <span className="block text-lg sm:text-2xl lg:text-3xl xl:text-4xl mt-2 text-foreground/85 min-h-[1.5em] sm:min-h-[1.4em]">
                <TypewriterEffect words={profile.roles} />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3"
            >
              <Button
                onClick={() => scrollTo("#projects")}
                size="lg"
                className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-brand-glow/25 border-0 group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => scrollTo("#contact")}
                size="lg"
                variant="outline"
                className="border-accent/40 hover:border-accent/80 hover:bg-accent/10 group"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </motion.div>

            {/* Social icons — reduced top margin on mobile for tighter rhythm */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-6 sm:mt-10 flex items-center justify-center md:justify-start gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass-card text-muted-foreground hover:text-accent transition-colors"
                >
                  <SocialIcon name={social.icon} className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* === Photo (rotating ring + static photo) ===
              On mobile: 224px centered; sm: 288px; md: 320px; lg: 384px.
              Removed mt-4 on mobile — the grid gap handles spacing.
              The HeroPhoto component centers itself and constrains badges. */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.7 }}
            className="order-2 flex justify-center md:mt-0"
          >
            <HeroPhoto
              src={profile.photo}
              alt={profile.photoAlt}
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
            />
          </motion.div>
        </div>

        {/* Scroll cue (desktop only) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden lg:flex flex-col items-center justify-center mt-16 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1"
          >
            <span className="h-2 w-1 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
