// Directly call `github:pushRepo` through the raw HTTP action endpoint so we
// get the FULL response (or error) in the terminal. One call per repo; the
// action runs server-side on Convex where GITHUB_TOKEN lives.
//
// Usage:
//   node /project/tmp/push-direct.mjs <repoName> <dir> "<description>" [pages]

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const URL = "https://majestic-wildcat-199.convex.cloud";
const ENDPOINT = URL + "/api/action";

async function runAction(path, args, timeoutMs = 120_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, args, format: "json" }),
      signal: controller.signal,
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`action ${path} HTTP ${res.status}: ${text.slice(0, 800)}`);
    }
    return JSON.parse(text);
  } finally {
    clearTimeout(timer);
  }
}

function unwrap(res) {
  return res && res.value !== undefined ? res.value : res;
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
        files.push({ path: rel, contentBase64: readFileSync(full).toString("base64") });
      }
    }
  };
  rec(root);
  return files;
}

const [, , repo, dir, description, pagesFlag] = process.argv;
const enablePages = pagesFlag === "pages";

if (!repo || !dir) {
  console.error("usage: node push-direct.mjs <repo> <dir> [desc] [pages]");
  process.exit(1);
}

const status = unwrap(await runAction("github:tokenStatus", {}, 30_000));
console.log("tokenStatus:", JSON.stringify(status));
if (!status?.ok) process.exit(1);

const IGNORE =
  repo === "Apshaxma.github.io"
    ? ["node_modules", "dist", ".git", ".env", ".env.local", ".env.development",
       ".env.production.local", ".env.local.development", "videoiq-summarizer",
       "image-caption-studio", ".DS_Store", "tmp", "main.ts", "integrations.md", "*.tsbuildinfo"]
    : [];

const files = walk(dir, IGNORE);
const total = files.reduce((s, f) => s + f.contentBase64.length, 0);
console.log(`pushing ${files.length} files (~${Math.round(total / 1024)}KB) to ${repo} ...`);

const res = unwrap(
  await runAction("github:pushRepo", {
    repo,
    description: description ?? "Deployed from Freebuff",
    files,
    enablePages,
    message: `Deploy ${repo} (${files.length} files)`,
  }),
);
console.log("RESULT:", JSON.stringify(res));
