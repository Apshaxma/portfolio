import { Briefcase, Rocket } from "lucide-react";
import { EDUCATION, EXPERIENCE, type TimelineItem } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function TimelineEntry({
  item,
  isLast,
  accent,
}: {
  item: TimelineItem;
  isLast: boolean;
  accent: "mint" | "violet";
}) {
  const ring = accent === "mint" ? "text-mint" : "text-violet";
  return (
    <Reveal className="relative pl-14">
      {/* line */}
      {!isLast && (
        <span className="absolute left-[19px] top-12 h-[calc(100%+1rem)] w-px bg-gradient-to-b from-white/15 to-transparent" />
      )}
      {/* dot */}
      <span
        className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0b0b0e] ${ring}`}
      >
        <item.icon className="h-4.5 w-4.5" />
      </span>

      <div className="group rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-mint/25">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {item.role}
          </h3>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-mint">
            {item.period}
          </span>
        </div>
        <p className="mt-1 text-sm text-violet">{item.org}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <ul className="mt-4 space-y-2">
          {item.points.map((point) => (
            <li
              key={point}
              className="flex gap-2.5 text-sm text-muted-foreground"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-mint" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title={
            <>
              Experience &{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                education
              </span>
            </>
          }
          description="The path so far — and the direction it's heading."
        />

        <div className="space-y-8">
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Briefcase className="h-4 w-4 text-mint" />
              Experience
            </p>
            <div className="space-y-8">
              {EXPERIENCE.map((item, i) => (
                <TimelineEntry
                  key={item.role}
                  item={item}
                  isLast={i === EXPERIENCE.length - 1}
                  accent="mint"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Rocket className="h-4 w-4 text-violet" />
              Education
            </p>
            <div className="space-y-8">
              {EDUCATION.map((item, i) => (
                <TimelineEntry
                  key={item.role}
                  item={item}
                  isLast={i === EDUCATION.length - 1}
                  accent="violet"
                />
              ))}
            </div>
          </div>

          {/* next stop */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-mint/20 bg-gradient-to-br from-mint/[0.08] via-transparent to-violet/[0.08] p-7 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Next stop
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                Building agentic systems at a{" "}
                <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                  frontier AI lab
                </span>
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                That&apos;s the vision. If your team is pushing what agents and
                applied LLMs can do, I&apos;d love to talk.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
