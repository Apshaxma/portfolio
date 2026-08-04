// Pushes local repo folders to GitHub by invoking the deployed
// `github:pushRepo` Convex action (which uses the GITHUB_TOKEN stored in the
// Freebuff Keys tab, inside the Convex runtime).
//
// Usage:
//   node /tmp/push-repos.mjs <repoName> <dir> "<description>" [pages]
//
//   pages — also enable GitHub Pages (workflow build) on the repo.
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { ConvexHttpClient } from "/project/node_modules/convex/dist/esm/browser/index.js";

const URL = "https://majestic-wildcat-199.convex.cloud";
const client = new ConvexHttpClient(URL);

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
  console.error("usage: node push-repos.mjs <repo> <dir> [desc] [pages]");
  process.exit(1);
}

// sanity check: token is live before we do anything
const status = await client.action("github:tokenStatus", {});
console.log("tokenStatus:", JSON.stringify(status));
if (!status?.ok) process.exit(1);

// Apshaxma.github.io (portfolio root) — never ship secrets, deps, or the
// sibling scaffold repos.
const IGNORE =
  repo === "Apshaxma.github.io"
    ? ["node_modules", "dist", ".git", ".env", ".env.local", ".env.development", ".env.production.local", ".env.local.development", "videoiq-summarizer", "image-caption-studio", ".DS_Store", "*.tsbuildinfo"]
    : [];

const files = walk(dir, IGNORE);
console.log(`pushing ${files.length} files to ${repo} ...`);

try {
  const res = await client.action("github:pushRepo", {
    repo,
    description: description ?? "Deployed from Freebuff",
    files,
    enablePages,
    message: `Deploy ${repo} (${files.length} files)`,
  });
  console.log(JSON.stringify(res, null, 2));
} catch (e) {
  console.error("PUSH_FAILED:", e.message ?? String(e));
  process.exit(1);
}
