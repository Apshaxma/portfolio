# Apshaxma · Portfolio

Personal portfolio and résumé site — AI engineer portfolio with projects,
experience, and an assistant.

Built with **React + TypeScript + Vite + Tailwind CSS + Convex**.

## Live site

https://apshaxma.github.io

## Development

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` automatically builds and deploys via GitHub Actions
(see `.github/workflows/deploy.yml`). No manual steps required.

The production bundle reads `VITE_CONVEX_URL` at build time (baked into the
workflow); the Convex backend keeps the visitor counter and assistant running.

## Tests

```bash
npm test
```

Runs `scripts/verify-projects.mjs` — a data-integrity check that every
portfolio project card links to a real, declared repository.
