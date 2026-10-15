/**
 * Centralized portfolio data — easy to customize with your own info.
 * Update the fields below to personalize the portfolio.
 */

export interface SocialLink {
  label: string
  href: string
  icon: "github" | "linkedin" | "twitter" | "mail" | "instagram" | "dribbble"
}

export interface SkillCategory {
  title: string
  icon: string
  description: string
  skills: { name: string; description: string }[]
}

export interface Service {
  title: string
  description: string
  features: string[]
  icon: "code" | "server" | "sparkles" | "database" | "layout" | "globe"
}

export interface Project {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  github: string
  demo: string
  featured?: boolean
}

export interface Stat {
  label: string
  value: number
  suffix: string
  icon: string
}

export interface ExperienceItem {
  period: string
  role: string
  organization: string
  description: string
}

export const profile = {
  name: "Dires",
  firstName: "Dires",
  lastName: "",
  // Rotating titles for the typewriter effect in the hero
  roles: [
    "Full-Stack Developer",
    "AI Integration Specialist",
    "React & Node.js Engineer",
    "UI/UX Enthusiast",
  ],
  tagline:
    "I craft modern, performant web applications with thoughtful UX, robust back-ends, and intelligent AI integrations that ship.",
  introduction:
    "I'm Dires — a full-stack developer who loves turning ideas into polished, production-ready products. I specialize in React, Node.js, and weaving LLM-powered features into real user workflows that genuinely move the needle.",
  photo:
    "https://images.unsplash.com/photo-1633332755192-727a05c01931?auto=format&fit=crop&w=600&q=80",
  photoAlt: "Portrait of Dires",
  location: "Addis Ababa, Ethiopia — Remote-friendly",
  email: "hello@dires.dev",
  phone: "+251 9XX XXX XXX",
  available: true,
  resumeUrl: "#",
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Email", href: "mailto:hello@dires.dev", icon: "mail" },
]

export const stats: Stat[] = [
  { label: "Projects Completed", value: 48, suffix: "+", icon: "rocket" },
  { label: "Technologies Mastered", value: 25, suffix: "+", icon: "cpu" },
  { label: "Years of Experience", value: 6, suffix: "+", icon: "calendar" },
  { label: "Happy Clients", value: 32, suffix: "+", icon: "smile" },
]

export const aboutContent = {
  heading: "Turning ideas into polished, production-ready products",
  paragraphs: [
    "I'm Dires, a full-stack developer who loves the entire lifecycle of a product — from a blank Figma board and a half-formed idea, to a shipped, monitored, and iterated application. My sweet spot is the boundary between a clean React front-end and a well-architected Node.js/Express API, with a deep interest in weaving LLM-powered features into real user workflows.",
    "I believe great software is built on three pillars: empathy for the user, respect for the craft, and a healthy paranoia about edge cases. Whether I'm designing a REST API, optimizing a React render tree, or wiring up an AI prompt pipeline, I focus on long-term maintainability, clear communication, and shipping something I'd be proud to demo to a senior engineer six months from now.",
  ],
  philosophy: [
    {
      title: "User-first engineering",
      description:
        "Every technical decision starts from the user's perspective. If a feature makes the experience slower or more confusing, it doesn't ship.",
    },
    {
      title: "Boring technology, exciting products",
      description:
        "I prefer proven, well-documented tools (React, Node, PostgreSQL) so the team can move fast without fighting the framework.",
    },
    {
      title: "AI as a multiplier, not a gimmick",
      description:
        "I integrate LLMs where they genuinely improve outcomes — summarization, classification, content generation — never as a checkbox feature.",
    },
  ],
  experience: [
    {
      period: "2023 — Present",
      role: "Senior Full-Stack Engineer",
      organization: "Northwind Labs",
      description:
        "Lead the front-end architecture for a B2B analytics platform. Built a TypeScript monorepo, design system, and AI-assisted content workflow used by 4k+ daily users.",
    },
    {
      period: "2021 — 2023",
      role: "Full-Stack Developer",
      organization: "Helix Studio",
      description:
        "Shipped 14 client projects across SaaS, e-commerce, and internal tooling. Owned everything from schema design in PostgreSQL to React UI and CI/CD.",
    },
    {
      period: "2019 — 2021",
      role: "Front-End Developer",
      organization: "Brightwave Agency",
      description:
        "Specialized in converting Figma designs into pixel-perfect, accessible React components. Helped establish the team's testing and accessibility standards.",
    },
    {
      period: "2015 — 2019",
      role: "B.Sc. Computer Science",
      organization: "Addis Ababa University",
      description:
        "Graduated with honors. Focused on distributed systems and human-computer interaction. President of the Web Dev Club.",
    },
  ] as ExperienceItem[],
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "layout",
    description: "Pixel-perfect, accessible, performant interfaces.",
    skills: [
      { name: "React", description: "Component architecture, hooks, suspense, server components" },
      { name: "JavaScript", description: "ES2023+, modern patterns, performance tuning" },
      { name: "TypeScript", description: "Strict types, generics, type-safe API contracts" },
      { name: "HTML5", description: "Semantic markup, accessibility, SEO-ready structure" },
      { name: "CSS3", description: "Grid, flexbox, custom properties, container queries" },
      { name: "Tailwind CSS", description: "Design tokens, theming, responsive utilities" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    description: "Reliable APIs and service-oriented architecture.",
    skills: [
      { name: "Node.js", description: "Event-loop, streams, worker threads, performance" },
      { name: "Express.js", description: "Middleware design, REST contracts, error handling" },
      { name: "REST API", description: "OpenAPI specs, versioning, idempotency, rate limiting" },
    ],
  },
  {
    title: "Database",
    icon: "database",
    description: "Data modeling, indexing, and query optimization.",
    skills: [
      { name: "PostgreSQL", description: "Relational design, CTEs, JSONB, full-text search" },
      { name: "MongoDB", description: "Document modeling, aggregations, change streams" },
      { name: "MySQL", description: "Transactions, replication, query tuning" },
    ],
  },
  {
    title: "AI",
    icon: "sparkles",
    description: "Practical LLM and AI integrations that ship.",
    skills: [
      { name: "Gemini API", description: "Multimodal generation, function calling, embeddings" },
      { name: "OpenAI API", description: "Chat completions, assistants, fine-tuning, RAG" },
      { name: "AI Integration", description: "Streaming, guardrails, cost control, observability" },
      { name: "Prompt Engineering", description: "Few-shot, chain-of-thought, structured output" },
    ],
  },
  {
    title: "Tools",
    icon: "wrench",
    description: "The day-to-day toolkit for shipping.",
    skills: [
      { name: "Git", description: "Branching strategies, rebase workflows, code review" },
      { name: "GitHub", description: "Actions, projects, issues, releases, codeowners" },
      { name: "Docker", description: "Multi-stage builds, compose, dev containers" },
      { name: "VS Code", description: "Snippets, debug profiles, remote dev, extensions" },
    ],
  },
]

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "End-to-end web app development with modern frameworks. Clean architecture, responsive UI, accessibility baked in from day one.",
    features: ["React / Next.js", "Responsive design", "Accessibility audit", "Core Web Vitals"],
    icon: "code",
  },
  {
    title: "Full-Stack Development",
    description:
      "From database schema to polished UI — I own the whole stack and make sure every layer talks to the next one cleanly.",
    features: ["Type-safe APIs", "Monorepo setup", "CI/CD pipelines", "End-to-end tests"],
    icon: "server",
  },
  {
    title: "AI Integration",
    description:
      "Bring real AI value to your product with RAG pipelines, agent workflows, and LLM-powered features that users actually love.",
    features: ["LLM pipelines", "RAG & embeddings", "Streaming responses", "Cost control"],
    icon: "sparkles",
  },
  {
    title: "REST API Development",
    description:
      "Well-documented, versioned, and reliable REST APIs with OpenAPI specs, authentication, and rate limiting baked in.",
    features: ["OpenAPI specs", "Auth & RBAC", "Rate limiting", "Versioned routes"],
    icon: "globe",
  },
  {
    title: "UI/UX Implementation",
    description:
      "Turn Figma designs into pixel-perfect, accessible React components. Design systems that scale across teams.",
    features: ["Design systems", "Component libraries", "Figma → React", "Motion & micro-UX"],
    icon: "layout",
  },
  {
    title: "Database Solutions",
    description:
      "Schema design, migrations, indexing strategy, and query optimization for PostgreSQL, MongoDB, and MySQL.",
    features: ["Schema design", "Query tuning", "Migrations", "Replication setup"],
    icon: "database",
  },
]

export const projects: Project[] = [
  {
    title: "AI Employee Recommendation System",
    description:
      "A full-stack platform that matches candidates to open roles using LLM-powered semantic search over resumes and job descriptions.",
    longDescription:
      "Combines a React + TypeScript front-end with a Node.js/Express API backed by PostgreSQL and a vector store. The LLM pipeline parses resumes, extracts structured skills, and ranks candidates against job descriptions with explainable scoring.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "PostgreSQL", "OpenAI", "Vector DB"],
    github: "https://github.com/dires/ai-employee-recommendation",
    demo: "https://demo.dires.dev/ai-recruit",
    featured: true,
  },
  {
    title: "Pulse — Real-time Analytics Dashboard",
    description:
      "A B2B SaaS analytics dashboard with live WebSocket updates, customizable widgets, and AI-generated weekly insights.",
    longDescription:
      "Built with Next.js, Express, and PostgreSQL. Features include a drag-and-drop widget grid, role-based access control, and a scheduled AI summary that emails stakeholders every Monday morning.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "TypeScript", "WebSocket", "Tailwind", "Gemini"],
    github: "https://github.com/dires/pulse-analytics",
    demo: "https://pulse.dires.dev",
    featured: true,
  },
  {
    title: "Inkwell — AI Writing Assistant",
    description:
      "A long-form writing tool with inline AI suggestions, tone controls, and a split-pane editor powered by streaming LLM responses.",
    longDescription:
      "A focused writing experience built with React + Node.js. The AI pipeline uses prompt chaining and structured outputs to suggest edits without rewriting the author's voice. Saves everything locally first, syncs when online.",
    image:
      "https://images.unsplash.com/photo-1455390582262-04428dead604?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "OpenAI", "Tailwind", "IndexedDB"],
    github: "https://github.com/dires/inkwell",
    demo: "https://inkwell.dires.dev",
  },
  {
    title: "Atlas — Internal Knowledge Base",
    description:
      "A Notion-style internal wiki with full-text search, AI Q&A over company docs, and granular permissions.",
    longDescription:
      "Markdown-based wiki with PostgreSQL full-text search and a RAG pipeline that answers natural-language questions from internal docs. Includes SSO, audit logs, and an admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "PostgreSQL", "RAG", "Auth", "Markdown"],
    github: "https://github.com/dires/atlas-kb",
    demo: "https://atlas.dires.dev",
  },
  {
    title: "Cartflow — Headless E-commerce",
    description:
      "A headless storefront with Stripe checkout, inventory sync, and a custom admin panel for product management.",
    longDescription:
      "Next.js storefront + Express admin API. Uses PostgreSQL for inventory and order data, Redis for cart sessions, and Stripe for payments. Ships with a custom CMS for non-technical store managers.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Express"],
    github: "https://github.com/dires/cartflow",
    demo: "https://cartflow.dires.dev",
  },
  {
    title: "Trailhead — DevOps Dashboard",
    description:
      "A unified dashboard for monitoring Docker containers, CI/CD pipelines, and deployment health across environments.",
    longDescription:
      "Real-time view of service health using Docker API + GitHub Actions webhooks. Sends smart alerts to Slack when deployments fail. Built with React, Node.js, and Socket.io.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Docker", "Socket.io", "Node.js", "GitHub API"],
    github: "https://github.com/dires/trailhead",
    demo: "https://trailhead.dires.dev",
  },
]

export const contactInfo = {
  email: "hello@dires.dev",
  phone: "+251 9XX XXX XXX",
  location: "Addis Ababa, Ethiopia — Remote-friendly",
  socials: socialLinks,
}

/** Contact API endpoint. Uses Caddy gateway with XTransformPort to reach the Express mini-service. */
export const CONTACT_API_ENDPOINT = "/api/contact?XTransformPort=3001"
