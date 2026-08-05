import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PROFILE } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Apshaxma",
    href: PROFILE.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: PROFILE.linkedin,
  },
  {
    icon: MapPin,
    label: "Location",
    value: PROFILE.location,
    href: undefined,
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio message from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build the future of{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                intelligence
              </span>{" "}
              together
            </>
          }
          description="Open to AI/ML roles, research collaborations and interesting problems. My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* info cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {INFO_CARDS.map((card, i) => {
              const inner = (
                <div className="flex h-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-mint/30">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-mint/15 to-violet/15 text-mint">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="truncate text-sm font-medium text-foreground">
                      {card.value}
                    </p>
                  </div>
                </div>
              );
              return (
                <Reveal key={card.label} delay={i * 0.06}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="block h-full"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.28}>
              <div className="rounded-2xl border border-mint/20 bg-gradient-to-br from-mint/[0.08] to-violet/[0.08] p-5">
                <p className="flex items-center gap-2 text-sm text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                  </span>
                  Currently available for AI Engineer roles
                </p>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint/40 focus:outline-none focus:ring-2 focus:ring-mint/10"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint/40 focus:outline-none focus:ring-2 focus:ring-mint/10"
                  />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell me about the role, project or idea…"
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint/40 focus:outline-none focus:ring-2 focus:ring-mint/10"
                />
              </label>
              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-6 py-3.5 text-sm font-semibold text-[#041412] shadow-[0_0_32px_rgba(0,245,212,0.25)] transition-all hover:shadow-[0_0_48px_rgba(0,245,212,0.4)] sm:w-auto"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
