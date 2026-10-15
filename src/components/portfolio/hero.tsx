"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import { profile, socialLinks } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { SocialIcon } from "./social-icon"
import { TypewriterEffect } from "./typewriter-effect"
import { Photo3D } from "./photo-3d"
import { fadeInUp, fadeInDown, scaleIn } from "./motion"

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
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight min-h-[2.4em] sm:min-h-[2em] lg:min-h-[1.6em]"
            >
              <span className="block">Hi, I am</span>
              <span className="block text-gradient text-5xl sm:text-6xl lg:text-7xl xl:text-8xl my-1">
                {profile.firstName}
              </span>
              <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 text-foreground/85">
                <TypewriterEffect words={profile.roles} />
              </span>
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

          {/* Right: 3D profile photo with zoom breathing + tilt */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto lg:mr-0 perspective-1500"
          >
            <Photo3D
              src={profile.photo}
              alt={profile.photoAlt}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            />
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
