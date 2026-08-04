import { BadgeCheck, Award } from "lucide-react";
import { CERTIFICATIONS } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="05"
          eyebrow="Certifications"
          title={
            <>
              Verified{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                learning
              </span>
            </>
          }
          description="Credentials being added as they're earned — slots below are placeholders waiting for real ones."
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-dashed border-white/[0.12] bg-white/[0.015] p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-mint/30">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-muted-foreground transition-colors group-hover:text-mint">
                    <cert.icon className="h-5 w-5" />
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-mint/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mint">
                    <BadgeCheck className="h-3 w-3" />
                    Soon
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                  {cert.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <a
              href="#contact"
              className="group flex h-full min-h-[180px] flex-col items-center justify-center gap-3 rounded-3xl border border-mint/20 bg-gradient-to-br from-mint/[0.07] to-violet/[0.07] p-7 text-center transition-all hover:-translate-y-1 hover:border-mint/40"
            >
              <Award className="h-8 w-8 text-mint transition-transform group-hover:scale-110" />
              <p className="text-sm text-muted-foreground">
                Earning my next one right now —
                <span className="text-foreground"> ask me about it!</span>
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
