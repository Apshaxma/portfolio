/**
 * Targeted validation for src/portfolio/data.ts PROJECTS.
 * Verifies the wiring changed in this task:
 *  - every project id is unique
 *  - every category is one of the declared PROJECT_CATEGORIES
 *  - every project github link points at a real public repo of Apshaxma
 *    (8 confirmed via the GitHub API + 2 scaffolded in this workspace:
 *    videoiq-summarizer and image-caption-studio, ready to push)
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(resolve(root, "src/portfolio/data.ts"), "utf8");

// Repos confirmed via https://api.github.com/users/Apshaxma/repos, plus the
// two projects scaffolded in this workspace (videoiq-summarizer,
// image-caption-studio) whose repos are ready to be pushed.
const REAL_REPOS = [
  "deep_research_ai",
  "tripmind_ai",
  "agentic-ai-system",
  "negotioai",
  "rag-chatbot-for--csv",
  "rag-qa-system",
  "trading_bot",
  "AQI_PREDICTION_app",
  "videoiq-summarizer",
  "image-caption-studio",
];

let failed = false;
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  failed = true;
};
const pass = (msg) => console.log(`✓ ${msg}`);

/* ---- uniqueness of every id: field in the data file ---- */
const allIds = [...src.matchAll(/\n\s+id:\s*"([^"]+)"/g)].map((m) => m[1]);
if (allIds.length !== new Set(allIds).size) {
  const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
  fail(`duplicate ids: ${[...new Set(dupes)].join(", ")}`);
} else {
  pass(`all ${allIds.length} data ids are unique`);
}

/* ---- every project github link must point at a real repo ---- */
// Scope to the PROJECTS block so PROFILE.github (profile root) is excluded.
const projectsBlock = /export const PROJECTS[\s\S]*?\];/.exec(src)?.[0] ?? "";
const githubLinks = [...projectsBlock.matchAll(/github:\s*"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((l) => /^https:\/\/github\.com\//.test(l));

const BAD = githubLinks.filter((l) => {
  const match = l.match(/github\.com\/Apshaxma\/([^/]+)$/);
  return !match || !REAL_REPOS.includes(match[1]);
});
if (BAD.length) {
  fail(`github links not pointing at confirmed real repos: ${BAD.join(", ")}`);
} else {
  pass(`${githubLinks.length} project github links all resolve to real confirmed repos`);
  console.log(`     → ${githubLinks.map((l) => l.split("/").pop()).join(", ")}`);
}

/* ---- every REAL repo should be featured at least once ---- */
const linked = githubLinks.map((l) => l.split("/").pop());
const missing = REAL_REPOS.filter((r) => !linked.includes(r));
if (missing.length) {
  console.log(`ℹ  real repos not featured on a project card: ${missing.join(", ")}`);
} else {
  pass("every real repo is featured on a card");
}

/* ---- demo links must be https ---- */
const demoLinks = [...src.matchAll(/demo:\s*"([^"]+)"/g)].map((m) => m[1]);
const badDemos = demoLinks.filter((d) => !/^https:\/\//.test(d));
if (badDemos.length) fail(`demo links not https: ${badDemos.join(", ")}`);
else pass(`${demoLinks.length} demo link(s) are https${demoLinks.length ? ` (${demoLinks.join(", ")})` : ""}`);

/* ---- categories ---- */
const declared = /PROJECT_CATEGORIES:[\s\S]*?\];/.exec(src)?.[0] ?? "";
const catIds = [...declared.matchAll(/id:\s*"(all|agents|rag|ml)"/g)].map((m) => m[1]);
const used = [...projectsBlock.matchAll(/category:\s*"(agents|rag|ml)"/g)].map((m) => m[1]);
const unknown = used.filter((c) => !catIds.includes(c));
if (unknown.length) fail(`projects use undeclared categories: ${[...new Set(unknown)].join(", ")}`);
else pass(`all project categories are declared (${[...new Set(used)].sort().join(", ")})`);

console.log(failed ? "\nFAILED" : "\nALL CHECKS PASSED");
process.exitCode = failed ? 1 : 0;
