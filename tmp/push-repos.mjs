// Push local repo folders to GitHub by invoking the deployed `github:pushRepo`
// Convex action (the GITHUB_TOKEN lives in the Convex runtime, set via the
// Freebuff Keys/API keys tab). Uses raw fetch against the action HTTP endpoint,
// because ConvexHttpClient hangs in this browser container.
//
// Usage:
//   node /tmp/push-repos.mjs <repoName> <dir> "<description>" [pages]

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const URL = "https://majestic-wildcat-199.convex.cloud";
const ENDPOINT = URL + "/api/action";

async function runAction(path, args) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args, format: "json" }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`action ${path} HTTP ${res.status}: ${text.slice(0, 400)}`);
  }
  return JSON.parse(text);
}

function walk(root, ignoreNames = []) {
  const ignore = new Set(ignoreNames);
  const files = [];
  const rec = (dir) => {
    for (const name of readdirSync(dir)) {
      if (ignore.has(name)) continue;
      const full = join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        rec(full);
      } else {
        const rel = full.slice(root.length + 1);
        files.push({
          path: rel,
          contentBase64: readFileSync(full).toString("base64"),
        });
      }
    }
  };
  rec(root);
  return files;
}

const [, , repo, dir, description, pagesFlag] = process.argv;
const enablePages = pagesFlag === "pages";

if (!repo || !dir) {
  console.error("usage: node push-repos.mjs <repo> <dir> [desc] [pages]");
  process.exit(1);
}

// sanity check: token is live before we do anything
const status = await runAction("github:tokenStatus", {});
console.log("tokenStatus:", JSON.stringify(status));
if (!status?.ok) {
  console.error("token not available in Convex runtime — aborting.");
  process.exit(1);
}

// Apshaxma.github.io (portfolio root) — never ship secrets, deps, or the
// sibling scaffold repos.
const IGNORE =
  repo === "Apshaxma.github.io"
    ? [
        "node_modules",
        "dist",
        ".git",
        ".env",
        ".env.local",
        ".env.development",
        ".env.production.local",
        ".env.local.development",
        "videoiq-summarizer",
        "image-caption-studio",
        ".DS_Store",
        "*.tsbuildinfo",
      ]
    : [];

const files = walk(dir, IGNORE);
console.log(`pushing ${files.length} files to ${repo} ...`);

const res = await runAction("github:pushRepo", {
  repo,
  description: description ?? "Deployed from Freebuff",
  files,
  enablePages,
  message: `Deploy ${repo} (${files.length} files)`,
});
console.log(JSON.stringify(res, null, 2));
