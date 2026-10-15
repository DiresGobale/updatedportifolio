"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import { profile, socialLinks } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { SocialIcon } from "./social-icon"
import { fadeInUp, fadeInDown, viewportOnce } from "./motion"

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground"
            >
              <span className="relative flex h-2 w-2">
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
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
            >
              Hi, I&apos;m <span className="text-gradient">{profile.firstName}</span>.
              <br />
              <span className="text-foreground/90">{profile.title}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
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

            {/* Social icons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-3"
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

          {/* Right: Profile photo with floating + glow animation */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="relative mx-auto lg:mr-0"
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Glow rings */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-brand opacity-30 blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-2 rounded-full border border-accent/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-accent/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />

              {/* Photo */}
              <div className="relative h-full w-full rounded-full overflow-hidden glass-card glow-ring">
                <img
                  src={profile.photo}
                  alt={profile.photoAlt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-xs sm:text-sm font-semibold">AI-Ready</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm text-accent font-semibold">
                    6+ yrs
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">experience</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
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
