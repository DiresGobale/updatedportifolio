"use client"

/**
 * ClientDecorations — a client wrapper that mounts the purely decorative
 * background layers (ParticleNetwork + AnimatedBackground) ONLY on the
 * client. They never render on the server, so they don't block SSR or FCP.
 *
 * Why a separate client wrapper? In Next.js App Router, `next/dynamic` with
 * `ssr: false` is not allowed in Server Components. So we wrap them in a
 * tiny client component that uses dynamic + ssr:false internally.
 *
 * Visual impact: zero — both layers are full-screen `position: fixed` with
 * negative z-index, so they sit behind all content. They fade in after
 * hydration, completely transparent to the user.
 */

import dynamic from "next/dynamic"

const ParticleNetwork = dynamic(
  () =>
    import("@/components/portfolio/particle-network").then(
      (m) => m.ParticleNetwork
    ),
  { ssr: false, loading: () => null }
)

const AnimatedBackground = dynamic(
  () =>
    import("@/components/portfolio/animated-background").then(
      (m) => m.AnimatedBackground
    ),
  { ssr: false, loading: () => null }
)

const Chatbot = dynamic(
  () => import("@/components/portfolio/chatbot").then((m) => m.Chatbot),
  { ssr: false, loading: () => null }
)

const GitHubStatsWidget = dynamic(
  () =>
    import("@/components/portfolio/github-stats").then(
      (m) => m.GitHubStatsWidget
    ),
  {
    ssr: false,
    loading: () => (
      <section
        className="relative min-h-[300px] flex items-center justify-center"
        aria-hidden
      >
        <div className="h-1 w-12 rounded-full bg-foreground/10 animate-pulse" />
      </section>
    ),
  }
)

export function ClientDecorations() {
  return (
    <>
      <ParticleNetwork />
      <AnimatedBackground />
    </>
  )
}

export function ClientChatbot() {
  return <Chatbot />
}

export function ClientGitHubStats({ username }: { username: string }) {
  return <GitHubStatsWidget username={username} />
}
