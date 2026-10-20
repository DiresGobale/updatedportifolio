"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Check, Star, Code2, MonitorPlay } from "lucide-react"
import { projects, profile } from "@/lib/portfolio-data"
import { Navbar } from "@/components/portfolio/navbar"
import { AnimatedBackground } from "@/components/portfolio/animated-background"
import { ParticleNetwork } from "@/components/portfolio/particle-network"
import { Footer } from "@/components/portfolio/footer"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer, slideUp, viewportOnce } from "@/components/portfolio/motion"
import {
  AIRecommendationDemo,
  ExpenseTrackerDemo,
  ProductDeliveryDemo,
  CourseRegistrationDemo,
  EvaluationDemo,
  LibraryDemo,
} from "@/components/portfolio/project-demos"

// Map project slugs to their interactive demo components
const demoMap: Record<string, React.ComponentType> = {
  "ai-employee-recommendation": AIRecommendationDemo,
  "expense-tracker": ExpenseTrackerDemo,
  "product-delivery-system": ProductDeliveryDemo,
  "course-registration-system": CourseRegistrationDemo,
  "evaluation-management": EvaluationDemo,
  "library-management": LibraryDemo,
}

export default function ProjectDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const DemoComponent = demoMap[slug]

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <ParticleNetwork />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {/* === Header === */}
        <section className="relative pt-28 sm:pt-32 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.a
              href="/#projects"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </motion.a>

            {project.featured && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-3"
              >
                <Badge className="bg-gradient-brand-warm text-primary-foreground border-0 gap-1">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Featured Project
                </Badge>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === Interactive Live Demo === */}
        {DemoComponent && (
          <section className="relative py-4 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MonitorPlay className="h-6 w-6 text-accent" />
                  <h2 className="text-xl font-semibold">Interactive Live Demo</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Try it right now — this is a working interactive demo of the {project.title}.
                  Click, type, and explore the features below.
                </p>
              </motion.div>

              {/* The actual interactive demo */}
              <div className="glass-card rounded-3xl p-5 sm:p-8">
                <DemoComponent />
              </div>
            </div>
          </section>
        )}

        {/* === Project Details === */}
        <section className="relative py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-accent" />
                  About this project
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.longDescription}
                </p>

                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="space-y-2.5"
                >
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      variants={slideUp}
                      className="flex items-start gap-3"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="glass-card rounded-3xl p-6 h-fit lg:sticky lg:top-24"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Project Links
                </h3>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl p-3 hover:bg-accent/10 transition-colors group mb-2"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 group-hover:bg-accent/15 transition-colors">
                    <Github className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">View Source Code</p>
                    <p className="text-xs text-muted-foreground">GitHub Repository</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-accent transition-colors" />
                </a>

                <div className="border-t border-border/40 my-4" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-border/40 my-4" />

                <a
                  href={`mailto:${profile.email}`}
                  className="block text-center text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  Questions about this project? Email {profile.email}
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
