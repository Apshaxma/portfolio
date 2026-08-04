import {
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Rocket,
  Target,
} from "lucide-react";
import { PROFILE } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Learn",
    text: "Relentlessly studying how frontier models think, plan and reason.",
  },
  {
    icon: Rocket,
    title: "Build",
    text: "Shipping real systems — agents, RAG pipelines and ML apps that work.",
  },
  {
    icon: HeartHandshake,
    title: "Share",
    text: "Documenting, teaching and pushing the craft of applied AI forward.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Turning{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                data into intelligence
              </span>
            </>
          }
          description="A short story about who I am, where I'm headed, and why I build."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* narrative */}
          <Reveal>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-4">
                <span className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mint to-violet opacity-90 blur-[6px]" />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-[#0a0a0d] font-display text-xl font-bold text-mint">
                    {PROFILE.initials}
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {PROFILE.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-mint" />
                    {PROFILE.location}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m an AI engineer who believes the most exciting part of
                  AI isn&apos;t the model — it&apos;s the{" "}
                  <span className="text-foreground">system</span>. My work
                  centers on agentic architectures, retrieval-augmented
                  generation and the plumbing that makes LLMs reliable in
                  production: tools, memory, evaluation and clean APIs.
                </p>
                <p>
                  I design multi-agent workflows in LangGraph, build RAG
                  pipelines over vector databases like FAISS, and ship the
                  whole thing with FastAPI and Streamlit. Every project starts
                  with a hard problem and ends with something a user can
                  actually run.
                </p>
                <p>
                  Currently I&apos;m applying these skills in an AI/ML
                  internship and pushing toward my goal:{" "}
                  <span className="text-foreground">
                    building agentic systems that reason, plan and act
                    responsibly at scale
                  </span>{" "}
                  — and one day contributing to a frontier AI lab.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:-translate-y-1 hover:border-mint/30"
                  >
                    <pillar.icon className="h-5 w-5 text-mint transition-transform group-hover:scale-110" />
                    <h4 className="mt-3 font-display text-sm font-semibold text-foreground">
                      {pillar.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* right column */}
          <div className="space-y-6">
            {/* education card */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/15 text-violet">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      Education
                    </p>
                    <p className="font-display text-sm font-semibold text-foreground">
                      {PROFILE.education.years}
                    </p>
                  </div>
                </div>
                <h4 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {PROFILE.education.degree}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {PROFILE.education.school}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-mint" />
                  {PROFILE.education.city}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["ML", "Deep Learning", "NLP", "Statistics", "AI Systems"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </Reveal>

            {/* vision card */}
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-3xl border border-mint/20 bg-gradient-to-br from-mint/[0.08] via-transparent to-violet/[0.08] p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/15 text-mint">
                    <Target className="h-5 w-5" />
                  </span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Goals & Vision
                  </p>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <Compass className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    Build agentic systems that reliably plan, use tools and
                    self-correct.
                  </li>
                  <li className="flex gap-3">
                    <Compass className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                    Deepen expertise in reasoning, evaluation and
                    safety-critical LLM deployment.
                  </li>
                  <li className="flex gap-3">
                    <Compass className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    Land an AI/ML engineering role at a frontier lab and
                    contribute to systems used by millions.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
