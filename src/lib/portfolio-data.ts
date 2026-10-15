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
  icon: "code" | "server" | "sparkles" | "database" | "layout" | "globe" | "smartphone"
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
    "Information System Student",
    "Full-Stack Developer",
    "Flutter Mobile Developer",
    "UI/UX Designer (Figma)",
  ],
  tagline:
    "Fourth-year Information System student at Injibara University. I build web apps with React, Next.js & Node.js, and mobile apps with Flutter — designed in Figma.",
  introduction:
    "I'm Dires — a fourth-year Information System student at Injibara University with a passion for building real, working software. My toolkit spans the full web stack (React, Next.js, Node.js, Express, PostgreSQL), mobile development with Flutter, and UI/UX design in Figma. Every coursework project is a chance to ship something I'd be proud to show a real client.",
  photo:
    "https://images.unsplash.com/photo-1633332755192-727a05c01931?auto=format&fit=crop&w=600&q=80",
  photoAlt: "Portrait of Dires",
  location: "Injibara, Ethiopia — Remote-friendly",
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
  { label: "Projects Built", value: 4, suffix: "+", icon: "rocket" },
  { label: "Technologies", value: 12, suffix: "+", icon: "cpu" },
  { label: "Years of Study", value: 4, suffix: "", icon: "calendar" },
  { label: "Coursework Done", value: 20, suffix: "+", icon: "smile" },
]

export const aboutContent = {
  heading: "Turning ideas into working software, one project at a time",
  paragraphs: [
    "I'm Dires, a fourth-year Information System student at Injibara University. I got into software because I love the moment when an idea on a whiteboard becomes something you can actually click, type into, and use. My focus is the full web stack — React and Next.js on the front-end, Node.js with Express on the back-end, and PostgreSQL or MySQL for the data layer — plus mobile development with Flutter when the project needs to live in someone's pocket.",
    "I treat every coursework project like a real product. That means sketching the UX in Figma first, modeling the database carefully, writing clean and well-named code, and shipping something I'd be comfortable demoing to a senior engineer. I'm currently in my final year, open to internships and junior full-stack or Flutter roles, and always looking for the next problem worth solving.",
  ],
  philosophy: [
    {
      title: "Learn by building",
      description:
        "Every concept becomes clearer when you build something real with it. That's why I treat every coursework project as a chance to ship a small but complete product.",
    },
    {
      title: "Solid foundations",
      description:
        "I invest time in understanding how things work under the hood — operating systems, databases, networks — so I can debug confidently when something breaks.",
    },
    {
      title: "Design before code",
      description:
        "I sketch flows in Figma before writing a single line of code. A 30-minute wireframe has saved me many hours of refactoring more than once.",
    },
  ],
  experience: [
    {
      period: "2024 — Present",
      role: "4th-Year Information System Student",
      organization: "Injibara University",
      description:
        "Currently in my final year, focusing on full-stack web development with React/Next.js/Node.js and mobile development with Flutter. Coursework spans operating systems, database design, systems analysis, and UX/UI.",
    },
    {
      period: "2024",
      role: "AI-Powered Employee Recommendation System",
      organization: "Web project",
      description:
        "Built a full-stack web app that uses AI to match candidates to open roles based on skills and semantic similarity. React front-end, Node.js/Express API, PostgreSQL back-end.",
    },
    {
      period: "2023 — 2024",
      role: "Expense Tracker Mobile App",
      organization: "Flutter project",
      description:
        "Built a cross-platform mobile app for tracking daily expenses, with categories, charts, and local storage. Designed in Figma, implemented with Flutter and Dart.",
    },
    {
      period: "2023",
      role: "Evaluation Management System",
      organization: "Web project",
      description:
        "Built a system for managing student and instructor evaluations, with role-based access, feedback forms, and admin reporting. React + Node.js + PostgreSQL.",
    },
    {
      period: "2022 — 2023",
      role: "Library Management Documentation",
      organization: "Database design project",
      description:
        "Designed the full MySQL schema for a library management system — books, members, loans, and fines. Produced ER diagrams, normalized to 3NF, and complete system documentation.",
    },
  ] as ExperienceItem[],
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "layout",
    description: "Pixel-perfect, responsive web interfaces.",
    skills: [
      { name: "React.js", description: "Component architecture, hooks, state management" },
      { name: "Next.js", description: "App Router, server components, API routes" },
      { name: "JavaScript", description: "ES2023+, modern patterns, async/await" },
      { name: "HTML5", description: "Semantic markup, accessibility, SEO structure" },
      { name: "CSS3", description: "Grid, flexbox, custom properties, animations" },
      { name: "Tailwind CSS", description: "Utility-first styling, responsive design" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    description: "Reliable APIs and service-oriented architecture.",
    skills: [
      { name: "Node.js", description: "Event-loop, streams, async programming" },
      { name: "Express.js", description: "Middleware design, REST contracts, error handling" },
      { name: "REST API", description: "Endpoints, request validation, status codes" },
    ],
  },
  {
    title: "Database",
    icon: "database",
    description: "Data modeling, schema design, and queries.",
    skills: [
      { name: "PostgreSQL", description: "Relational design, joins, CTEs, JSONB" },
      { name: "MySQL", description: "Schema design, normalization, ER diagrams" },
    ],
  },
  {
    title: "Mobile",
    icon: "smartphone",
    description: "Cross-platform mobile apps from a single codebase.",
    skills: [
      { name: "Flutter", description: "Widgets, state management, Material Design" },
      { name: "Dart", description: "Async programming, null safety, strong typing" },
    ],
  },
  {
    title: "Design & UX/UI",
    icon: "sparkles",
    description: "Designing flows and interfaces before coding.",
    skills: [
      { name: "Figma", description: "Wireframes, prototypes, design systems" },
      { name: "UX/UI Design", description: "User flows, accessibility, visual hierarchy" },
    ],
  },
  {
    title: "Foundations & Tools",
    icon: "wrench",
    description: "The computer science base and daily toolkit.",
    skills: [
      { name: "Operating Systems", description: "Processes, memory, file systems, concurrency" },
      { name: "Git", description: "Branching, commits, collaboration workflows" },
      { name: "GitHub", description: "Pull requests, issues, project boards" },
      { name: "VS Code", description: "Extensions, debugger, integrated terminal" },
    ],
  },
]

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Responsive, accessible web apps built with React and Next.js. Clean components, fast load times, and a mobile-first approach from day one.",
    features: ["React / Next.js", "Responsive design", "Accessibility", "SEO-ready"],
    icon: "code",
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end apps — from database schema to polished UI. React/Next.js on the front, Node.js/Express on the back, wired together with a type-safe API.",
    features: ["React + Node.js", "REST API design", "Auth & RBAC", "PostgreSQL / MySQL"],
    icon: "server",
  },
  {
    title: "Mobile App Development (Flutter)",
    description:
      "Cross-platform mobile apps for Android and iOS from a single Flutter codebase. Local storage, charts, offline-first, and Material Design.",
    features: ["Flutter + Dart", "Android & iOS", "Local storage", "Material Design"],
    icon: "smartphone",
  },
  {
    title: "AI Integration",
    description:
      "Add real AI value to your product — recommendation systems, semantic search, and LLM-powered features. Built practically, not as a gimmick.",
    features: ["Recommendation systems", "Semantic search", "LLM pipelines", "RAG basics"],
    icon: "sparkles",
  },
  {
    title: "UI/UX Design (Figma)",
    description:
      "Wireframes, prototypes, and design systems in Figma before a single line of code. Catch UX issues early when they're cheap to fix.",
    features: ["Wireframing", "Prototyping", "Design systems", "User flows"],
    icon: "layout",
  },
  {
    title: "Database Solutions",
    description:
      "Schema design, ER diagrams, normalization, and SQL queries for PostgreSQL and MySQL. Documented and ready for the next developer to pick up.",
    features: ["Schema design", "ER diagrams", "Normalization", "SQL queries"],
    icon: "database",
  },
]

export const projects: Project[] = [
  {
    title: "AI-Powered Employee Recommendation System",
    description:
      "A full-stack web platform that uses AI to match candidates to open job roles based on skills, experience, and semantic similarity.",
    longDescription:
      "Built with React + Node.js/Express + PostgreSQL. The AI pipeline parses resumes, extracts structured skills, and ranks candidates against job descriptions with explainable scoring. Includes a recruiter dashboard and candidate profile pages.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "AI"],
    github: "https://github.com/dires/ai-employee-recommendation",
    demo: "https://demo.dires.dev/ai-recruit",
    featured: true,
  },
  {
    title: "Expense Tracker — Flutter App",
    description:
      "A cross-platform mobile app for tracking daily expenses, with categories, monthly charts, and local offline storage.",
    longDescription:
      "Built with Flutter and Dart. Uses local SQLite storage so it works fully offline, with charts for visualizing spending by category and month. Designed in Figma first, then implemented with clean Material Design.",
    image:
      "https://images.unsplash.com/photo-1554224155-672a4f8b1bba?auto=format&fit=crop&w=1200&q=80",
    tags: ["Flutter", "Dart", "SQLite", "Mobile"],
    github: "https://github.com/dires/expense-tracker-flutter",
    demo: "https://demo.dires.dev/expense-tracker",
    featured: true,
  },
  {
    title: "Evaluation Management System",
    description:
      "A web app for managing student and instructor evaluations, with role-based access, feedback forms, and admin reporting.",
    longDescription:
      "Built with React + Node.js/Express + PostgreSQL. Features include student feedback forms, instructor dashboards, admin reporting, and role-based access control. Designed to handle academic evaluation workflows end-to-end.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/dires/evaluation-management",
    demo: "https://demo.dires.dev/evaluation",
  },
  {
    title: "Library Management — Database Documentation",
    description:
      "Complete database design and documentation for a library management system, including ER diagrams and a fully normalized MySQL schema.",
    longDescription:
      "Designed a complete MySQL schema for a library management system covering books, members, loans, fines, and staff. Produced ER diagrams, normalized tables to 3NF, wrote sample queries, and delivered full system documentation that another developer could implement from scratch.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    tags: ["MySQL", "ER Diagrams", "Normalization", "Documentation"],
    github: "https://github.com/dires/library-management-docs",
    demo: "https://demo.dires.dev/library-docs",
  },
]

export const contactInfo = {
  email: "hello@dires.dev",
  phone: "+251 9XX XXX XXX",
  location: "Injibara, Ethiopia — Remote-friendly",
  socials: socialLinks,
}

/** Contact API endpoint. Uses Caddy gateway with XTransformPort to reach the Express mini-service. */
export const CONTACT_API_ENDPOINT = "/api/contact?XTransformPort=3001"
