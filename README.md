# Ashutosh Sharma — AI Engineer Portfolio

A premium, dark-mode personal portfolio for **Ashutosh Sharma** — AI Engineer · Machine Learning Engineer · Generative AI Developer.

Built with **React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons and Convex** (live visitor counter + optional LLM-powered assistant).

![Theme](https://img.shields.io/badge/theme-dark_only-050505) ![Stack](https://img.shields.io/badge/stack-React%20%2B%20TS%20%2B%20Tailwind%20v4-00f5d4) ![Backend](https://img.shields.io/badge/backend-Convex-7b61ff)

---

## ✨ Features

- **Hero** — typing role animation, magnetic CTAs, animated terminal, stats, aurora + particle + grid background
- **About** — professional story, education card, goals & career vision
- **Skills** — tabbed, interactive skill cards with animated proficiency bars
- **Projects** — category filters + live search, gradient covers, tech badges, metrics, GitHub links
- **Experience & Education** — animated vertical timeline + "next stop" vision card
- **Certifications & Testimonials** — placeholder cards ready for real content
- **GitHub section** — live stats via the GitHub API (graceful fallback), decorative contribution heatmap, top languages, top repositories
- **Contact** — glassmorphic form (opens the visitor's email client) + info cards
- **Resume page** (`/resume`) — print-optimized, doubles as a downloadable PDF
- **Command palette** — press `Ctrl/⌘ + K` for navigation, project search and quick actions
- **AI assistant widget** — floating chat; uses an LLM when `OPENAI_API_KEY` is set, otherwise answers from a built-in knowledge base
- **Visitor counter** — persisted in Convex, shown in the footer
- **Micro-interactions everywhere** — cursor glow spotlight, magnetic buttons, scroll progress bar, scroll-spy nav, reduced-motion support

## 🧱 Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide |
| Backend | Convex (realtime queries, mutations, actions) |
| Auth (template) | Convex Auth — email OTP + anonymous |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (mono) |

## 📁 Project Structure

```
src/
├── convex/                  # Convex backend
│   ├── schema.ts            # visitors table
│   └── portfolio.ts         # visitor counter + assistant chat action
├── pages/
│   ├── Landing.tsx          # portfolio landing (all sections)
│   ├── Resume.tsx           # print-ready resume (/resume)
│   ├── Auth.tsx             # template auth
│   └── Dashboard.tsx        # template dashboard
└── portfolio/
    ├── data.ts              # ALL content lives here — edit this to personalize
    └── components/          # one component per section + shared primitives
        ├── Backdrop.tsx     # aurora blobs, grid, particle canvas
        ├── Hero.tsx         # typing + terminal + CTAs
        ├── About.tsx / Skills.tsx / Projects.tsx / Experience.tsx
        ├── Certifications.tsx / GitHub.tsx / Testimonials.tsx
        ├── Contact.tsx / Footer.tsx / Navbar.tsx
        ├── CommandPalette.tsx / Assistant.tsx
        └── Reveal.tsx / MagneticButton.tsx / SectionHeading.tsx / CursorGlow.tsx / ScrollProgress.tsx
```

## 🎨 Theme

- Background `#050505` · Cards `#111111` · Accent `#00F5D4` · Secondary `#7B61FF` · Text `#FFFFFF` · Muted `#9CA3AF`
- Dark-mode-only; tokens live in `src/index.css` (`:root` / `.dark` + `@theme` block)

## ✏️ Customization

1. **Personal details** — open `src/portfolio/data.ts` and update `PROFILE` (email, LinkedIn, GitHub), skills, projects, timeline, certifications and testimonials.
2. **Your real repos** — the GitHub section fetches `Apshaxma` live; change `githubUsername` in `PROFILE`. No GitHub token needed (public API).
3. **Colors/fonts** — edit the CSS variables in `src/index.css`.
4. **Add real testimonials/certs** — replace the placeholder entries in `data.ts`.

## 🤖 Optional: connect a real LLM to the assistant

The chat widget works out of the box with a built-in knowledge base. To let it answer from a real model:

1. Get an OpenAI API key (or any compatible key — swap the endpoint in `src/convex/portfolio.ts`).
2. Add `OPENAI_API_KEY` in the project's **Keys/API keys** tab (never commit it).
3. The widget automatically switches to "Powered by LLM" mode.

## 🚀 Development

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # type-check + production build
```

## ☁️ Deployment

- **Vercel / Netlify**: import the repo, build command `npm run build`, output directory `dist`.
- **Convex**: the backend is already configured via `convex.json`; run `npx convex deploy` to push functions to production.
- Set `VITE_CONVEX_URL` (and any secret env vars) in your host's environment settings.

## ♿ Accessibility & Performance

- Respects `prefers-reduced-motion` (particles, typing and large animations are disabled).
- Semantic HTML, aria labels, keyboard-friendly command palette and nav.
- Route-level code splitting, `content-visibility`-friendly sections, lazy image-free design (CSS/canvas art keeps payload tiny).
