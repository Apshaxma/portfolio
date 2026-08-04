import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="07"
          eyebrow="Testimonials"
          title={
            <>
              Kind words from{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                people I&apos;ve worked with
              </span>
            </>
          }
          description="Placeholders for now — real quotes landing here soon."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="group flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-mint/25">
                <Quote className="h-6 w-6 text-mint/60 transition-colors group-hover:text-mint" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-mint/25 to-violet/25 font-display text-sm font-bold text-foreground">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
