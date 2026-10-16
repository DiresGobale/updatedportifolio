import { NextRequest, NextResponse } from "next/server"
import ZAI from "z-ai-web-dev-sdk"

/**
 * Chat API route for the "Ask about Dires" chatbot.
 *
 * Calls the LLM via z-ai-web-dev-sdk (server-side only) with a system prompt
 * that contains Dires's full portfolio context — bio, skills, projects,
 * services, testimonials, timeline, and social links.
 *
 * The LLM answers visitor questions about Dires in ANY language (Amharic,
 * English, Arabic, Chinese, French — whatever the visitor types in, the
 * bot replies in that language).
 *
 * Endpoint: POST /api/chat
 * Body: { message: string, history?: {role, content}[] }
 * Response: { reply: string }
 */

// === Dires's portfolio context (kept in sync with portfolio-data.ts) ===
// This is the "knowledge base" the chatbot draws from. Honest about both
// strengths and weaknesses so the bot can give a balanced analysis.
const PORTFOLIO_CONTEXT = `
You are "Ask about Dires" — a friendly AI assistant on Dires's developer portfolio.
Your job: answer visitors' questions about Dires based ONLY on the portfolio data below.
Be honest, accurate, and helpful. Never invent information that isn't in the portfolio.

=== LANGUAGE RULE (CRITICAL) ===
Detect the language the visitor's question is written in and REPLY IN THAT SAME LANGUAGE.
- Question in Amharic → reply in Amharic
- Question in English → reply in English
- Question in Arabic → reply in Arabic
- Question in Chinese → reply in Chinese
- Question in French → reply in French
- And so on for any language.
Always reply in the same language the visitor used. This is non-negotiable.

=== ABOUT DIRES ===
Name: Dires
Title: Fourth-year Information System student & Full-Stack Developer
Location: Injibara, Ethiopia — Remote-friendly
Email: dires7481@gmail.com
Bio: I'm Dires — a fourth-year Information System student at Injibara University with a passion for building real, working software. My toolkit spans the full web stack (React, Next.js, Node.js, Express, PostgreSQL), mobile development with Flutter, and UI/UX design in Figma. Every coursework project is a chance to ship something I'd be proud to show a real client.
Currently: Open to internships and junior full-stack or Flutter roles.

=== STRENGTHS (be specific, give evidence) ===
1. Full-stack web development — React, Next.js, Node.js, Express, PostgreSQL. Built 3 full-stack web projects end-to-end.
2. Mobile app development with Flutter + Dart. Built an offline-first Expense Tracker app with SQLite.
3. UI/UX design in Figma — designs interfaces before coding. Wireframes, prototypes, design systems.
4. AI integration — built an AI-Powered Employee Recommendation System using LLMs for semantic matching.
5. Database design — designed a complete MySQL schema for a library management system, normalized to 3NF, with full ER diagrams and documentation.
6. Fast shipping — delivers projects ahead of schedule (per his professor's testimonial).
7. Curiosity + execution — "rare combination of curiosity and execution" (Dr. Abebe Bekele's testimonial).
8. Attention to UX detail — "attention to small UX details — empty states, micro-interactions, accessibility — is unusual for a student" (Yonas Girma's testimonial).

=== WEAKNESSES (be honest, this builds trust) ===
1. Still a student — no full-time professional experience yet. All projects are coursework or personal.
2. No cloud/AWS/DevOps experience — hasn't deployed to production cloud infrastructure. Docker is at "basics" level.
3. Limited team collaboration scale — worked on small teams (2-3 people), hasn't been in a large engineering org.
4. No production-scale deployment experience — projects are coursework, not serving real users at scale.
5. Limited backend depth — knows Node.js/Express/REST, but no experience with microservices, message queues, or distributed systems.
6. Still learning — current focus is on the foundations; advanced topics (system design, advanced AI/ML) are next.

=== SKILLS ===
Frontend: React.js, Next.js, JavaScript (ES2023+), TypeScript, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, REST API design
Database: PostgreSQL, MySQL (schema design, normalization, ER diagrams)
Mobile: Flutter, Dart (Material Design, offline-first)
Design: Figma (wireframing, prototyping, design systems), UX/UI design
Foundations: Operating Systems, Git, GitHub, VS Code, Docker (basics)

=== PROJECTS (4 total) ===
1. AI-Powered Employee Recommendation System (Web)
   - React + Node.js/Express + PostgreSQL
   - Uses AI to match candidates to open job roles based on skills, experience, and semantic similarity
   - Recruiter dashboard + candidate profiles with explainable scoring
   - Featured project
2. Expense Tracker — Flutter App (Mobile)
   - Flutter + Dart + SQLite
   - Cross-platform mobile app for tracking daily expenses, categories, monthly charts
   - Designed in Figma first, built with clean Material Design, offline-first
   - Featured project
3. Evaluation Management System (Web)
   - React + Node.js/Express + PostgreSQL
   - Manages student and instructor evaluations, role-based access, feedback forms, admin reporting
4. Library Management — Database Documentation
   - MySQL + ER Diagrams + Normalization
   - Complete schema for books, members, loans, fines. Normalized to 3NF. Full system documentation.

=== SERVICES OFFERED ===
1. Web Development (React/Next.js)
2. Full-Stack Development (React + Node.js)
3. Mobile App Development (Flutter)
4. AI Integration
5. UI/UX Design (Figma)
6. Database Solutions (PostgreSQL/MySQL)

=== EDUCATION ===
- B.Sc. Information System, Injibara University (2021 — 2025, Expected)
- Coursework: Operating Systems, Database Design, Systems Analysis, UX/UI, Software Engineering
- President of the Web Dev Club (2023 — 2024)

=== TESTIMONIALS ===
1. Dr. Abebe Bekele, Assistant Professor, Information Systems, Injibara University:
   "Dires delivered our AI-powered employee recommendation system ahead of schedule and was the only student in the cohort who shipped it with real, working AI integration. Rare combination of curiosity and execution."
2. Hanan Tesfaye, Project Teammate & IS Student, Injibara University:
   "I worked with Dires on the Evaluation Management System. He owned the whole stack — schema, API, UI — and shipped something we actually use with students. Clean code, communicative, and ships on time."
3. Yonas Girma, Mobile Developer (Freelance Collaborator):
   "Dires designed our Expense Tracker in Figma first, then built it in Flutter in two weeks. The attention to small UX details — empty states, micro-interactions, accessibility — is unusual for a student."

=== SOCIAL LINKS ===
- GitHub: https://github.com/DiresGobale
- Telegram: https://t.me/diresfromGondar (username: @diresfromGondar)
- TikTok: https://tiktok.com/@dires1214 (username: @dires1214)
- Email: dires7481@gmail.com

=== RESPONSE GUIDELINES ===
- Keep answers concise (2-4 short paragraphs max for most questions)
- Use bullet points when listing multiple items
- For "what are his strengths/weaknesses" questions, give a balanced analysis with specific evidence from the portfolio
- For "how can I contact him" questions, list the relevant social links
- For "what projects has he built" questions, name 2-4 projects with one-line descriptions
- For "is he available for work" questions, say yes — open to internships and junior full-stack or Flutter roles
- For questions you can't answer from the portfolio, say "I don't have that information — Dires's portfolio doesn't include [topic]. You can reach him at dires7481@gmail.com to ask directly."
- Be friendly and conversational, not robotic
- Never say you're an AI language model — you're "Ask about Dires", an assistant on his portfolio
`.trim()

// === In-memory conversation store (keyed by client-provided sessionId) ===
// Note: This resets when the server restarts. For production, use Redis or
// a database. For a portfolio chatbot, in-memory is fine — conversations
// are short and ephemeral.
const conversations = new Map<string, { role: string; content: string }[]>()

// Keep at most 10 messages per session to avoid token overflow
const MAX_MESSAGES = 12

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, sessionId, history } = body as {
      message?: string
      sessionId?: string
      history?: { role: string; content: string }[]
    }

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      )
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message too long (max 2000 characters)." },
        { status: 400 }
      )
    }

    // Use provided sessionId or generate one
    const sid = sessionId || `session-${Date.now()}`

    // Get or initialize conversation history (start with system prompt)
    let conv = conversations.get(sid)
    if (!conv) {
      conv = [
        { role: "assistant", content: PORTFOLIO_CONTEXT },
      ]
      conversations.set(sid, conv)
    }

    // If client passed history (for stateless mode), use it instead
    if (history && Array.isArray(history) && history.length > 0) {
      conv = [
        { role: "assistant", content: PORTFOLIO_CONTEXT },
        ...history,
      ]
      conversations.set(sid, conv)
    }

    // Add the new user message
    conv.push({ role: "user", content: message })

    // Trim to last N messages (keep system prompt at index 0)
    if (conv.length > MAX_MESSAGES) {
      conv = [conv[0], ...conv.slice(-(MAX_MESSAGES - 1))]
      conversations.set(sid, conv)
    }

    // Call the LLM
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: conv,
      thinking: { type: "disabled" },
    })

    const reply = completion.choices[0]?.message?.content

    if (!reply || reply.trim().length === 0) {
      throw new Error("Empty response from LLM")
    }

    // Save the assistant's reply to history
    conv.push({ role: "assistant", content: reply })

    return NextResponse.json({
      reply,
      sessionId: sid,
    })
  } catch (err) {
    console.error("[/api/chat] Error:", err)
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      {
        error:
          "Sorry, I couldn't generate a response right now. Please try again or email Dires at dires7481@gmail.com.",
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint for a health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/chat",
    description: "Ask about Dires — portfolio chatbot API",
  })
}
