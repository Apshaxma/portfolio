import {
  ExternalLink,
  GitFork,
  Github,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PROFILE } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/* ---------------------------------------------------------------------------
 * Data fetching (graceful fallback if the GitHub API is unavailable)
 * ------------------------------------------------------------------------- */
type GhRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

type GhUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
};

const FALLBACK_REPOS: GhRepo[] = [
  { id: 1, name: "deep-research-ai", description: "Multi-agent research assistant built with LangGraph", html_url: PROFILE.github, language: "Python", stargazers_count: 0, forks_count: 0 },
  { id: 2, name: "tripmind-ai", description: "Agentic AI travel planner with weather, budget & memory", html_url: PROFILE.github, language: "Python", stargazers_count: 0, forks_count: 0 },
  { id: 3, name: "rag-csv-chatbot", description: "Upload a CSV and chat with it — FAISS + embeddings", html_url: PROFILE.github, language: "Python", stargazers_count: 0, forks_count: 0 },
  { id: 4, name: "aqi-prediction", description: "ML project predicting the Air Quality Index", html_url: PROFILE.github, language: "Python", stargazers_count: 0, forks_count: 0 },
];

type GithubState = {
  user: GhUser | null;
  repos: GhRepo[];
  loading: boolean;
  live: boolean;
};

function useGithubData(username: string): GithubState {
  const [state, setState] = useState<GithubState>({
    user: null,
    repos: FALLBACK_REPOS,
    loading: true,
    live: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
          }),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
        const [user, repos] = (await Promise.all([
          userRes.json(),
          reposRes.json(),
        ])) as [GhUser, GhRepo[]];
        if (cancelled) return;
        setState({
          user,
          repos: repos.length > 0 ? repos : FALLBACK_REPOS,
          loading: false,
          live: true,
        });
      } catch {
        if (cancelled) return;
        setState({ user: null, repos: FALLBACK_REPOS, loading: false, live: false });
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username]);

  return state;
}

/* ---------------------------------------------------------------------------
 * Deterministic pseudo-random generator for the decorative heatmap
 * ------------------------------------------------------------------------- */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEVEL_CLASSES = [
  "bg-white/[0.06]",
  "bg-mint/25",
  "bg-mint/45",
  "bg-mint/70",
  "bg-mint",
];

function ContributionHeatmap() {
  const weeks = useMemo(() => {
    const today = new Date();
    const offset = ((today.getDay() + 1) % 7) + 1;
    const end = new Date(today);
    end.setDate(today.getDate() - offset);
    const year = today.getFullYear();
    const grid: { date: Date; level: number }[][] = [];
    for (let w = 51; w >= 0; w--) {
      const weekStart = new Date(end);
      weekStart.setDate(end.getDate() - w * 7);
      const week: { date: Date; level: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + d);
        const rnd = mulberry32(w * 131 + d * 17 + year)();
        const level =
          rnd < 0.4 ? 0 : rnd < 0.62 ? 1 : rnd < 0.78 ? 2 : rnd < 0.9 ? 3 : 4;
        week.push({ date, level });
      }
      grid.push(week);
    }
    return grid;
  }, []);

  const monthLabels = useMemo(() => {
    const labels: { idx: number; label: string }[] = [];
    weeks.forEach((week, idx) => {
      const first = week[0].date;
      if (first.getDate() <= 7) {
        labels.push({
          idx,
          label: first.toLocaleString("en-US", { month: "short" }),
        });
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="mb-1.5 ml-10 flex gap-2">
          {monthLabels.map((m) => (
            <span key={m.idx} className="font-mono text-[10px] text-muted-foreground">
              {m.label}
            </span>
          ))}
        </div>
        <div className="flex gap-[3px]">
          <div className="mr-1 flex flex-col justify-between py-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <span key={d} className="font-mono text-[9px] text-muted-foreground/70">
                {d}
              </span>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((cell, di) => (
                <div
                  key={di}
                  title={`${cell.date.toISOString().slice(0, 10)} — ${cell.level} contribution${cell.level === 1 ? "" : "s"}`}
                  className={`h-[11px] w-[11px] rounded-[3px] transition-colors ${LEVEL_CLASSES[cell.level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Section
 * ------------------------------------------------------------------------- */
export function GitHub() {
  const { user, repos, loading, live } = useGithubData(PROFILE.githubUsername);

  const sorted = useMemo(
    () => [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6),
    [repos],
  );

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));
  }, [repos]);

  const totalStars = useMemo(
    () => repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    [repos],
  );

  const stats = [
    { label: "Public repos", value: user ? String(user.public_repos) : "10+" },
    { label: "Followers", value: user ? String(user.followers) : "—" },
    { label: "Stars earned", value: user ? String(totalStars) : "—" },
    { label: "Languages", value: String(languages.length) },
  ];

  return (
    <section id="github" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="05"
          eyebrow="GitHub"
          title={
            <>
              Open source,{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                in public
              </span>
            </>
          }
          description="Live stats, activity and repositories pulled straight from GitHub."
        />

        <div className="space-y-6">
          {/* stats */}
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 text-center backdrop-blur-sm transition-colors hover:border-mint/25"
                >
                  <p className="font-display text-3xl font-bold text-foreground">
                    {loading ? (
                      <span className="inline-block h-8 w-16 animate-pulse rounded bg-white/[0.06]" />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* heatmap */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                  <Github className="h-4 w-4 text-mint" />
                  @{PROFILE.githubUsername}
                </h3>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {live ? "● Live via GitHub API" : "○ Simulated activity preview"}
                </span>
              </div>
              <ContributionHeatmap />
              <div className="mt-4 flex items-center justify-end gap-1.5">
                <span className="mr-1 font-mono text-[10px] text-muted-foreground">Less</span>
                {LEVEL_CLASSES.map((cls, i) => (
                  <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${cls}`} />
                ))}
                <span className="ml-1 font-mono text-[10px] text-muted-foreground">More</span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* top languages */}
            <Reveal delay={0.12}>
              <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-sm">
                <h3 className="font-display text-base font-semibold text-foreground">
                  Top languages
                </h3>
                <div className="mt-6 space-y-5">
                  {languages.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No language data yet — push some code! 🚀
                    </p>
                  )}
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-foreground">{lang.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {lang.pct}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-mint to-violet"
                          style={{ width: `${lang.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-mint transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                  View full profile on GitHub
                </a>
              </div>
            </Reveal>

            {/* pinned repos */}
            <Reveal delay={0.16}>
              <div className="grid gap-4 sm:grid-cols-2">
                {sorted.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-mint/30"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-mint" />
                      <h4 className="truncate font-mono text-sm font-semibold text-foreground">
                        {repo.name}
                      </h4>
                    </div>
                    <p className="mt-2.5 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-muted-foreground">
                      {repo.description ?? "No description provided."}
                    </p>
                    <div className="mt-3.5 flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-violet" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
