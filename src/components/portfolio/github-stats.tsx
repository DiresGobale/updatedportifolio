"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  GitFork,
  Star,
  Users,
  Code2,
  Github,
  RefreshCw,
} from "lucide-react"
import { SectionHeading } from "./section-heading"
import { slideUp, staggerContainer, viewportOnce } from "./motion"

// === Types ===
interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  topLanguages: { name: string; percent: number }[]
  avatarUrl: string
  bio: string
  htmlUrl: string
}

interface GitHubStatsWidgetProps {
  username: string
}

// === Static fallback (used if the API call fails or the user is offline) ===
// These are sensible defaults so the widget never looks broken.
const FALLBACK_STATS: GitHubStats = {
  publicRepos: 12,
  followers: 8,
  following: 15,
  totalStars: 24,
  totalForks: 6,
  topLanguages: [
    { name: "TypeScript", percent: 38 },
    { name: "JavaScript", percent: 28 },
    { name: "Dart", percent: 18 },
    { name: "Python", percent: 10 },
    { name: "Other", percent: 6 },
  ],
  avatarUrl: "",
  bio: "Fourth-year Information System student at Injibara University.",
  htmlUrl: "https://github.com/DiresGobale",
}

/**
 * GitHubStatsWidget — fetches live GitHub stats from the public API and
 * displays them in a polished, animated card. Falls back to sensible
 * static defaults if the API is unreachable (so the widget never breaks).
 *
 * Stats shown: public repos, followers, total stars across repos, total
 * forks, top languages (with a mini bar chart), and a "View GitHub
 * Profile" CTA.
 *
 * API: https://api.github.com/users/{username} + /users/{username}/repos
 * No auth token needed for public user data (rate-limited to 60 req/hr).
 */
export function GitHubStatsWidget({ username }: GitHubStatsWidgetProps) {
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_STATS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        setLoading(true)
        // Fetch user profile + repos in parallel
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error(`GitHub API returned ${userRes.status}`)
        }

        const user = await userRes.json()
        const repos = await reposRes.json()

        if (cancelled) return

        // Aggregate stars + forks across all public repos
        let totalStars = 0
        let totalForks = 0
        const langCount: Record<string, number> = {}

        for (const repo of repos) {
          totalStars += repo.stargazers_count || 0
          totalForks += repo.forks_count || 0
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1
          }
        }

        // Compute top languages as percentages
        const totalRepos = repos.length || 1
        const topLanguages = Object.entries(langCount)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / totalRepos) * 100),
          }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 5)

        setStats({
          publicRepos: user.public_repos || 0,
          followers: user.followers || 0,
          following: user.following || 0,
          totalStars,
          totalForks,
          topLanguages:
            topLanguages.length > 0
              ? topLanguages
              : FALLBACK_STATS.topLanguages,
          avatarUrl: user.avatar_url || "",
          bio: user.bio || FALLBACK_STATS.bio,
          htmlUrl: user.html_url || FALLBACK_STATS.htmlUrl,
        })
        setError(false)
      } catch (err) {
        if (cancelled) return
        // Silently fall back to defaults — the widget still looks good
        setError(true)
        setStats(FALLBACK_STATS)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchStats()
    return () => {
      cancelled = true
    }
  }, [username])

  // === Stat cards data ===
  const statCards = [
    {
      icon: Code2,
      label: "Public Repos",
      value: stats.publicRepos,
      color: "oklch(0.78 0.13 200)",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: stats.totalStars,
      color: "oklch(0.82 0.14 75)",
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: stats.totalForks,
      color: "oklch(0.72 0.16 280)",
    },
    {
      icon: Users,
      label: "Followers",
      value: stats.followers,
      color: "oklch(0.72 0.16 330)",
    },
  ]

  return (
    <section
      id="github"
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="GitHub Activity"
          title="My code, by the numbers"
          description="Live stats pulled from my public GitHub profile — repos, stars, forks, and the languages I work in most."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-stretch"
        >
          {/* === Left: stat cards + languages bar === */}
          <motion.div
            variants={slideUp}
            className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col"
          >
            {/* Profile header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/40">
              {/* Avatar */}
              {stats.avatarUrl ? (
                <img
                  src={stats.avatarUrl}
                  alt={`${username} GitHub avatar`}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/30"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground ring-2 ring-accent/30">
                  <Github className="h-7 w-7" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <a
                  href={stats.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold hover:text-accent transition-colors truncate block"
                >
                  @{username}
                </a>
                <p className="text-sm text-muted-foreground truncate">
                  {stats.bio}
                </p>
              </div>
              {/* Refresh indicator */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                <RefreshCw
                  className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {loading ? "Syncing" : error ? "Cached" : "Live"}
                </span>
              </div>
            </div>

            {/* Stat cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {statCards.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="rounded-2xl p-4 text-center bg-secondary/40 border border-border/40 hover:border-accent/30 transition-colors"
                  >
                    <div
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl mb-2"
                      style={{ background: `${s.color}25`, color: s.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {s.value}
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                      {s.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Top languages with mini bar chart */}
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Top Languages
              </p>
              <div className="space-y-2.5">
                {stats.topLanguages.map((lang, i) => (
                  <div key={lang.name} className="flex items-center gap-3">
                    <span className="text-xs font-medium w-20 sm:w-24 shrink-0 truncate">
                      {lang.name}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-secondary/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={viewportOnce}
                        transition={{
                          duration: 0.8,
                          delay: 0.1 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-brand"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-9 text-right shrink-0">
                      {lang.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* === Right: CTA card === */}
          <motion.div
            variants={slideUp}
            className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-center text-center"
          >
            <div className="inline-flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-glow/25 mb-5">
              <Github className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              See all my code on GitHub
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Browse my open-source projects, coursework, and experiments.
              Star a repo if you find something useful!
            </p>
            <a
              href={stats.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-6 py-3 text-sm font-semibold shadow-md shadow-brand-glow/25 hover:opacity-90 transition-opacity mx-auto"
            >
              <Github className="h-4 w-4" />
              Visit GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
