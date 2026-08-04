# Deploying the portfolio to GitHub Pages (free domain)

This portfolio is a static React app, so it can be hosted for free on
**GitHub Pages** at `https://apshaxma.github.io/`.

## One-time setup

### 1. Create the repo

Go to **github.com/new** and create a **public** repository named:

```
Apshaxma.github.io
```

> ⚠️ The name must match your username exactly — that's what gives you the
> `https://apshaxma.github.io` domain. Don't initialize it with a README.

### 2. Push the code

```bash
# from the folder containing this project
git init
git add .
git commit -m "Add AI engineer portfolio"
git branch -M main
git remote add origin https://github.com/Apshaxma/Apshaxma.github.io.git
git push -u origin main
```

### 3. Add the Convex endpoint secret

The deployed site talks to the Convex backend (visitors counter, AI assistant).
In your repo go to **Settings → Secrets and variables → Actions** and add a
repository secret:

| Name | Value |
|---|---|
| `VITE_CONVEX_URL` | your Convex deployment URL (e.g. `https://majestic-wildcat-199.convex.cloud`) |

### 4. Enable GitHub Pages

**Settings → Pages** and set **Source** to **GitHub Actions**.

### 5. Done 🎉

On every push to `main`, the workflow in `.github/workflows/deploy.yml`
builds the app and deploys it. Live at:

```
https://apshaxma.github.io/
```

## Notes

- **Deep links work** — `/resume` etc. are handled by `public/404.html`
  (SPA fallback) + a restore hook in `src/main.tsx`.
- **Secrets are safe** — `.env.local` (with `CONVEX_DEPLOY_KEY`) is
  gitignored and never pushed. Only the public Convex URL is used in CI.
- **Sign-in (auth)** — the `/dashboard` route requires Convex Auth; its
  callback URL is tied to the Convex deployment. The public portfolio
  (landing, projects, resume, contact) works fully without signing in.
- **Alternative repo name** — if you name the repo something else
  (e.g. `portfolio`), the site lives at `https://apshaxma.github.io/portfolio/`
  and the build config needs `base: "/portfolio/"` added to
  `vite.gh.config.ts`.
- **Manual build** — `npm run build:gh` produces the static site in `dist/`
  using `vite.gh.config.ts` (same as the real config, minus the platform's
  `vlyPlugin`, which isn't needed for a standalone deployment).
