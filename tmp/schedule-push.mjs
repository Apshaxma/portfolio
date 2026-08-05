// Schedule a GitHub push through the deployed `github:schedulePush` Convex
// action. The heavy GitHub API work runs on the Convex scheduler, so the
// browser tab can close without cancelling the push.
//
// Usage:
//   node /tmp/schedule-push.mjs <repoName> <dir> "<description>" [pages]

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const URL = "https://majestic-wildcat-199.convex.cloud";
const ENDPOINT = URL + "/api/action";
const MAX_BATCH_BYTES = 120_000;
const STAGGER_MS = 20_000; // between chunks of the same repo

async function runAction(path, args, timeoutMs = 30_000) {
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
      throw new Error(`action ${path} HTTP ${res.status}: ${text.slice(0, 400)}`);
    }
    return JSON.parse(text);
  } finally {
    clearTimeout(timer);
  }
}

// The HTTP action endpoint wraps results as { status, value }.
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
  console.error("usage: node schedule-push.mjs <repo> <dir> [desc] [pages]");
  process.exit(1);
}

const status = unwrap(await runAction("github:tokenStatus", {}));
console.log("tokenStatus:", JSON.stringify(status));
if (!status?.ok) {
  console.error("token not available in Convex runtime — aborting.");
  process.exit(1);
}

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
  `scheduling ${files.length} files (${batches.length} chunk${batches.length === 1 ? "" : "s"}) to ${repo} ...`,
);

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  const isLast = i === batches.length - 1;
  const delayMs = i * STAGGER_MS;
  console.log(
    `  chunk ${i + 1}/${batches.length}: ${batch.length} files (~${Math.round(batch.reduce((s, f) => s + f.contentBase64.length, 0) / 1024)}KB) +${delayMs / 1000}s`,
  );
  const res = unwrap(
    await runAction("github:schedulePush", {
      repo,
      description: description ?? "Deployed from Freebuff",
      files: batch,
      enablePages: enablePages && isLast,
      delayMs,
      message:
        batches.length === 1
          ? `Deploy ${repo} (${batch.length} files)`
          : `Deploy ${repo} (${i + 1}/${batches.length}, ${batch.length} files)`,
    }),
  );
  console.log("  ->", JSON.stringify(res));
}

console.log("ALL SCHEDULED — pushes run server-side. Verify via GitHub API in a minute.");
