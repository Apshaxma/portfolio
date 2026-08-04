"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

// Pushes repository contents to GitHub using the GITHUB_TOKEN that the user
// pasted into Freebuff's Keys/API keys tab. Freebuff exposes those keys to
// Convex actions via process.env — they never appear in the terminal or in
// the bundle. One commit is created per call (the Git Data API).

const GH = "https://api.github.com";
const OWNER = "Apshaxma";

type GhFile = { path: string; contentBase64: string };

async function gh(token: string, method: string, url: string, body?: unknown) {
  const res = await fetch(GH + url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-deploy",
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `GitHub ${method} ${url}: ${res.status} ${
        (data as { message?: string }).message ?? JSON.stringify(data).slice(0, 200)
      }`,
    );
  }
  return data as Record<string, unknown>;
}

export const pushRepo = action({
  args: {
    repo: v.string(),
    description: v.optional(v.string()),
    files: v.array(
      v.object({ path: v.string(), contentBase64: v.string() })
    ),
    message: v.optional(v.string()),
    enablePages: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error(
        "GITHUB_TOKEN is not set in the Convex environment. Add it in the Freebuff Keys/API keys tab.",
      );
    }

    // 1) Create the repo if it does not exist yet.
    let repoInfo: Record<string, unknown>;
    try {
      repoInfo = await gh(token, "GET", `/repos/${OWNER}/${args.repo}`);
    } catch {
      repoInfo = await gh(token, "POST", "/user/repos", {
        name: args.repo,
        description: args.description ?? "Deployed from Freebuff",
        private: false,
        auto_init: false,
      });
    }
    const branch = (repoInfo.default_branch as string) ?? "main";

    // 2) Current head (if any) becomes the parent of the new commit.
    let parentSha: string | null = null;
    try {
      const ref = await gh(
        token,
        "GET",
        `/repos/${OWNER}/${args.repo}/git/ref/heads/${branch}`,
      );
      parentSha = (ref.object as { sha: string }).sha;
    } catch {
      /* no commits yet */
    }

    // 3) Create a blob per file, then a tree, then a commit, then update the ref.
    const tree = [];
    for (const f of args.files) {
      const blob = await gh(
        token,
        "POST",
        `/repos/${OWNER}/${args.repo}/git/blobs`,
        { content: f.contentBase64, encoding: "base64" },
      );
      tree.push({
        path: f.path,
        mode: "100644",
        type: "blob",
        sha: (blob as { sha: string }).sha,
      });
    }

    const treeRes = await gh(token, "POST", `/repos/${OWNER}/${args.repo}/git/trees`, {
      base_tree: parentSha ?? undefined,
      tree,
    });

    const commit = await gh(
      token,
      "POST",
      `/repos/${OWNER}/${args.repo}/git/commits`,
      {
        message: args.message ?? `Deploy ${args.repo} (${args.files.length} files)`,
        tree: (treeRes as { sha: string }).sha,
        parents: parentSha ? [parentSha] : [],
      },
    );

    if (parentSha) {
      await gh(token, "PATCH", `/repos/${OWNER}/${args.repo}/git/refs/heads/${branch}`, {
        sha: (commit as { sha: string }).sha,
        force: false,
      });
    } else {
      await gh(token, "POST", `/repos/${OWNER}/${args.repo}/git/refs`, {
        ref: `refs/heads/${branch}`,
        sha: (commit as { sha: string }).sha,
      });
    }

    // 4) Optionally enable GitHub Pages (workflow-based deploys).
    let pages = "not-enabled";
    if (args.enablePages) {
      try {
        await gh(token, "POST", `/repos/${OWNER}/${args.repo}/pages`, {
          build_type: "workflow",
        });
        pages = "enabled";
      } catch (e) {
        pages = `enable-failed: ${(e as Error).message.slice(0, 120)}`;
      }
    }

    return {
      repo: args.repo,
      branch,
      commit: (commit as { sha: string }).sha,
      files: args.files.length,
      parent: parentSha ? "stacked" : "root",
      pages,
    };
  },
});

// Small helper so we can confirm the token is present without pushing anything.
export const tokenStatus = action({
  args: {},
  handler: async () => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return { ok: false, reason: "GITHUB_TOKEN not set in Convex env" };
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-deploy",
      },
    });
    const data = (await res.json()) as { login?: string; message?: string };
    if (!res.ok) {
      return { ok: false, reason: `GitHub says: ${res.status} ${data.message ?? ""}` };
    }
    return { ok: true, login: data.login };
  },
});
