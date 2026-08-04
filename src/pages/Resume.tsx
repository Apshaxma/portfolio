import { ArrowLeft, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import {
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from "@/portfolio/data";

export default function Resume() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background print:bg-white">
      <style>{`
        @media print {
          body { background: #ffffff !important; }
          .no-print { display: none !important; }
          .resume-paper { box-shadow: none !important; border-radius: 0 !important; margin: 0 auto !important; max-width: 100% !important; padding: 0 !important; }
          @page { margin: 14mm; }
          section { break-inside: avoid; }
        }
      `}</style>

      {/* toolbar */}
      <div className="no-print sticky top-0 z-10 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-sm text-foreground transition-colors hover:border-mint/40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:block">
              Tip: use “Save as PDF” in the print dialog
            </span>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-[#041412] transition-shadow hover:shadow-[0_0_24px_rgba(0,245,212,0.35)]"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* paper */}
      <div className="resume-paper mx-auto my-8 max-w-3xl rounded-2xl bg-white px-8 py-12 text-neutral-900 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:px-12">
        {/* header */}
        <header>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            {PROFILE.name}
          </h1>
          <p className="mt-1.5 text-lg font-medium text-neutral-600">
            AI Engineer · Machine Learning Engineer · Generative AI Developer
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {PROFILE.location}
            </span>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 hover:text-neutral-900">
              <Mail className="h-4 w-4" />
              {PROFILE.email}
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-neutral-900">
              <Github className="h-4 w-4" />
              github.com/Apshaxma
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-neutral-900">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </header>

        {/* summary */}
        <section className="mt-9">
          <h2 className="border-b-2 border-neutral-900 pb-1 font-display text-sm font-bold uppercase tracking-[0.18em]">
            Summary
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
            {PROFILE.tagline} Experienced with multi-agent architectures
            (LangGraph), retrieval-augmented generation over vector databases
            (FAISS), and shipping AI applications with FastAPI and Streamlit —
            currently applied through an AI/ML internship and a B.Sc. in
            Artificial Intelligence & Machine Learning at TISS Mumbai.
          </p>
        </section>

        {/* experience */}
        <section className="mt-9">
          <h2 className="border-b-2 border-neutral-900 pb-1 font-display text-sm font-bold uppercase tracking-[0.18em]">
            Experience
          </h2>
          {EXPERIENCE.map((item) => (
            <div key={item.role} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <h3 className="text-base font-semibold">{item.role}</h3>
                <span className="font-mono text-sm text-neutral-500">{item.period}</span>
              </div>
              <p className="text-sm font-medium text-neutral-600">{item.org}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{item.description}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-neutral-700">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* education */}
        <section className="mt-9">
          <h2 className="border-b-2 border-neutral-900 pb-1 font-display text-sm font-bold uppercase tracking-[0.18em]">
            Education
          </h2>
          {EDUCATION.map((item) => (
            <div key={item.role} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <h3 className="text-base font-semibold">{item.role}</h3>
                <span className="font-mono text-sm text-neutral-500">{item.period}</span>
              </div>
              <p className="text-sm font-medium text-neutral-600">{item.org}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-neutral-700">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* projects */}
        <section className="mt-9">
          <h2 className="border-b-2 border-neutral-900 pb-1 font-display text-sm font-bold uppercase tracking-[0.18em]">
            Featured Projects
          </h2>
          <div className="mt-4 space-y-4">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="text-base font-semibold">{project.title}</h3>
                  <span className="font-mono text-xs text-neutral-500">{project.tagline}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-700">{project.description}</p>
                <p className="mt-1.5 font-mono text-xs text-neutral-600">
                  {project.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="mt-9">
          <h2 className="border-b-2 border-neutral-900 pb-1 font-display text-sm font-bold uppercase tracking-[0.18em]">
            Skills
          </h2>
          <div className="mt-4 space-y-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="text-sm">
                <span className="font-semibold">{group.label}: </span>
                <span className="text-neutral-700">
                  {group.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-neutral-200 pt-4 text-center text-xs text-neutral-500">
          References available upon request · Portfolio: ashutosh-sharma.dev
        </footer>
      </div>
    </div>
  );
}
