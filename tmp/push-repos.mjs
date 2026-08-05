// Push local repo folders to GitHub by invoking the deployed `github:pushRepo`
// Convex action (the GITHUB_TOKEN lives in the Convex runtime, set via the
// Freebuff Keys/API keys tab). Uses raw fetch against the action HTTP endpoint,
// because ConvexHttpClient hangs in this browser container.
//
// Files are sent in SMALL stacked batches (one commit per batch) so each action
// call stays well under payload/time limits and the browser tab doesn't die
// mid-run. Batches stack on the previous commit, so the final repo contains
// every file.
//
// Usage:
//   node /tmp/push-repos.mjs <repoName> <dir> "<description>" [pages]

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const URL = "https://majestic-wildcat-199.convex.cloud";
const ENDPOINT = URL + "/api/action";

const MAX_BATCH_BYTES = 120_000; // ~120KB of base64 per action call

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

function chunk(files, maxBytes) {
  const chunks = [];
  let current = [];
  let size = 0;
  for (const f of files) {
    if (current.length > 0 && size + f.contentBase64.length > maxBytes) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(f);
    size += f.contentBase64.length;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
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
// sibling scaffold repos; skip platform/tooling files that don't belong.
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
        "tmp",
        "main.ts",
        "integrations.md",
        "*.tsbuildinfo",
      ]
    : [];

const files = walk(dir, IGNORE);
const batches = chunk(files, MAX_BATCH_BYTES);
console.log(
  `pushing ${files.length} files (${batches.length} batch${batches.length === 1 ? "" : "es"}) to ${repo} ...`,
);

let last = null;
for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  const isLast = i === batches.length - 1;
  console.log(
    `  batch ${i + 1}/${batches.length}: ${batch.length} files (~${Math.round(batch.reduce((s, f) => s + f.contentBase64.length, 0) / 1024)}KB)`,
  );
  last = await runAction("github:pushRepo", {
    repo,
    description: description ?? "Deployed from Freebuff",
    files: batch,
    enablePages: enablePages && isLast,
    message:
      batches.length === 1
        ? `Deploy ${repo} (${batch.length} files)`
        : `Deploy ${repo} (${i + 1}/${batches.length}, ${batch.length} files)`,
  });
  console.log(`  -> commit ${last.commit} (${last.files} files, ${last.parent})`);
}

console.log(JSON.stringify(last, null, 2));
