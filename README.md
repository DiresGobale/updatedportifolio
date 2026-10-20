# Dires — Developer Portfolio

A modern, animated developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion**, and **Prisma**.

## Features

- Hero section with animated gradient text + typewriter effect
- About, Skills, Services, Projects sections
- Project detail pages (`/projects/[slug]`)
- Admin dashboard with Prisma (auth at `/admin`)
- Animated particle network background (canvas)
- 3D decorative background layer
- Live GitHub stats widget (fetches from GitHub API)
- Floating chatbot — "Ask about Dires" — replies in any language (uses Z.AI SDK)
- Responsive, dark-themed, fully mobile-friendly
- Optimized for Lighthouse 90+ (SSR + lazy loading)

---

## Quick Start (Run in VS Code)

### 1. Extract the zip
```bash
unzip dires-portfolio-source.zip
cd dires-portfolio
```

### 2. Open in VS Code
```bash
code .
```
(Or open VS Code → File → Open Folder → select the `dires-portfolio` folder)

### 3. Install dependencies
You can use either **npm** (no extra install needed) or **bun** (faster):

```bash
# Option A: npm (Node.js 18+ required)
npm install

# Option B: bun (recommended — install from https://bun.sh)
bun install
```

### 4. Set up environment variables
A starter `.env` file is included with a relative SQLite path that works wherever you extract the project:

```env
DATABASE_URL="file:./db/custom.db"
```

> For the chatbot, create a `.z-ai-config` file in the project root:
> ```json
> {
>   "baseUrl": "https://internal-api.z.ai/v1",
>   "apiKey": "YOUR_ZAI_API_KEY",
>   "chatId": "",
>   "token": "",
>   "userId": ""
> }
> ```
> Get an API key from https://z.ai. **Without this, the chatbot will return errors — but the rest of the portfolio works perfectly.**

### 5. Initialize the database
```bash
# Generate Prisma client
npm run db:generate

# Create the SQLite database + tables
npm run db:push
```

### 6. Start the dev server
```bash
npm run dev
```

Open **http://localhost:3000** in your browser — you should see the portfolio.

---

## Prerequisites

Make sure you have installed:

- **Node.js 18+** (https://nodejs.org) — required for npm
- **VS Code** (https://code.visualstudio.com)
- **(Optional) Bun** (https://bun.sh) — faster alternative to npm
- **(Optional) Git** (https://git-scm.com) — if you want to push to your own GitHub

### Recommended VS Code Extensions
Install these from the Extensions panel (`Ctrl+Shift+X`):

- **ES7+ React/Redux/React-Native snippets** — `dsznajder.es7-react-js-snippets`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **TypeScript Vue Plugin (Volar)** — or built-in TS support
- **Prisma** — `Prisma.prisma`
- **Prettier - Code formatter** — `esbenp.prettier-vscode`
- **PostCSS Language Support** — `csstools.postcss`

---

## Project Structure

```
dires-portfolio/
├── prisma/
│   └── schema.prisma          # Database schema (User, Post models)
├── public/
│   ├── profile.jpg             # Hero photo
│   ├── profile-about.jpg       # About-section photo
│   └── resume.pdf              # Downloadable resume
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, providers)
│   │   ├── page.tsx            # Home page (Server Component)
│   │   ├── globals.css         # Tailwind theme + brand colors
│   │   ├── performance.css     # Performance optimizations
│   │   ├── admin/              # Admin login + dashboard
│   │   ├── projects/[slug]/    # Project detail pages
│   │   └── api/                # API routes (chat, admin auth)
│   ├── components/
│   │   ├── portfolio/          # All portfolio sections (Hero, About, etc.)
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── portfolio-data.ts   # ⭐ All content lives here — edit this!
│   │   ├── db.ts               # Prisma client
│   │   └── utils.ts            # Helpers
│   └── hooks/                  # React hooks
├── mini-services/
│   └── contact-service/        # Optional: email service for the contact form
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                 # Vercel deployment config
```

---

## How to Customize

### Edit your info
Open **`src/lib/portfolio-data.ts`** — this is the single source of truth for:
- Your name, photo, tagline, bio
- Social links
- Skills
- Services
- Projects (with images, tags, GitHub/demo links)
- Testimonials
- Experience timeline

### Replace the photos
Replace these files in `public/`:
- `profile.jpg` — hero photo
- `profile-about.jpg` — about section photo
- `resume.pdf` — your downloadable resume

### Update colors
Open **`src/app/globals.css`** and edit the CSS variables in `:root` and `.dark`:
```css
--brand-accent: oklch(0.78 0.13 200);   /* Primary cyan */
--brand-secondary: oklch(0.82 0.14 75); /* Warm amber */
```

### Update admin credentials
Open **`src/app/api/admin/auth/route.ts`** and change:
```ts
const ADMIN_EMAIL = "dires7481@gmail.com"
const ADMIN_PASSWORD = "dg1234"
```

---

## Available Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Create/update the database schema |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:migrate` | Create a database migration |

---

## Deploying to Vercel

### Option 1 — Dashboard (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com → New Project → Import your repo
3. Set Build Command to: `bun run vercel-build`
4. Add Environment Variables:
   - `ZAI_API_KEY` — your Z.AI key (for the chatbot)
   - `DATABASE_URL` — a Postgres URL (Vercel Postgres, Neon, or Supabase — **SQLite won't work on Vercel**)
5. Click Deploy

### Option 2 — CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

> ⚠️ **SQLite + Vercel note**: Vercel's serverless filesystem is read-only, so SQLite writes will fail. The **portfolio page works fine** without a database. The **admin dashboard** requires Postgres.

---

## Troubleshooting

### "Module not found" errors
Run `npm install` again to make sure all dependencies are installed.

### Chatbot returns an error
Make sure `.z-ai-config` exists in the project root with a valid `apiKey`.

### Database errors
Run `npm run db:push` to create the SQLite database file.

### Port 3000 already in use
Change the port in `package.json`:
```json
"dev": "next dev -p 3001 2>&1 | tee dev.log"
```

### Build fails with TypeScript errors
The project is configured to ignore TS errors during build (`typescript.ignoreBuildErrors: true` in `next.config.ts`). If you want strict checks, change that to `false`.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + tw-animate-css
- **UI**: shadcn/ui (Radix primitives)
- **Animation**: Framer Motion 12
- **Database**: Prisma 6 (SQLite locally, Postgres in production)
- **AI**: z-ai-web-dev-sdk (chatbot)
- **Icons**: lucide-react
- **Fonts**: Geist Sans + Geist Mono

---

## License

MIT — free to use, modify, and distribute.

---

## Author

**Dires** — [dires7481@gmail.com](mailto:dires7481@gmail.com) — Information System student at Injibara University.
