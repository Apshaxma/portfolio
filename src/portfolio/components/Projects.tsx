import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PROJECT_CATEGORIES, PROJECTS, type Project } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_24px_70px_-24px_rgba(0,245,212,0.25)]"
    >
      {/* cover */}
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <project.icon className="h-16 w-16 text-white/25 transition-all duration-500 group-hover:scale-125 group-hover:text-white/40" />
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#050505]/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mint backdrop-blur">
          <Sparkles className="h-3 w-3" />
          {project.categoryLabel}
        </div>
        {project.featured && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 font-mono text-[10px] text-mint backdrop-blur">
            <Star className="h-3 w-3 fill-mint" />
            Featured
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0b0e] to-transparent" />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mt-0.5 text-sm text-mint/90">{project.tagline}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-sm font-semibold text-foreground">
                {m.value}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:border-mint/40 hover:text-mint"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-mint px-3.5 py-2 text-xs font-semibold text-[#041412] transition-all hover:shadow-[0_0_24px_rgba(0,245,212,0.35)]"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/[0.12] px-3.5 py-2 text-xs text-muted-foreground">
              Demo coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [category, setCategory] = useState<"all" | string>("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      const inQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [category, query]);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title={
            <>
              Systems I&apos;ve{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                shipped
              </span>
            </>
          }
          description="From multi-agent research systems to RAG pipelines and ML models — each one built end to end."
        />

        {/* controls */}
        <Reveal className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  category === cat.id
                    ? "text-[#041412]"
                    : "border border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-foreground"
                }`}
              >
                {category === cat.id && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-0 rounded-full bg-mint shadow-[0_0_24px_rgba(0,245,212,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{cat.label}</span>
              </button>
            ))}
          </div>
          <label className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint/40 focus:outline-none"
            />
          </label>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No projects match “{query}”. Try another search.
          </p>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 ${reduce ? "" : ""} md:grid-cols-2`}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
