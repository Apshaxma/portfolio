import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { ArrowUp, Eye, Github, Linkedin, Mail } from "lucide-react";
import { useEffect } from "react";
import { NAV_LINKS, PROFILE } from "../data";

function VisitorCount() {
  const count = useQuery(api.portfolio.getVisitorCount);
  const increment = useMutation(api.portfolio.incrementVisitors);

  useEffect(() => {
    if (sessionStorage.getItem("vly-portfolio-counted")) return;
    sessionStorage.setItem("vly-portfolio-counted", "1");
    increment().catch(() => {});
  }, [increment]);

  return (
    <span className="inline-flex items-center gap-1.5">
      <Eye className="h-3.5 w-3.5" />
      {count === undefined ? "—" : count.toLocaleString()} visits
    </span>
  );
}

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030303]/60 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-violet font-display text-sm font-bold text-[#041412]">
                {PROFILE.initials}
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold text-foreground">
                  {PROFILE.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  AI Engineer
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building agentic AI systems, RAG pipelines and ML applications
              from Mumbai, India.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: Github, href: PROFILE.github, label: "GitHub" },
                { icon: Linkedin, href: PROFILE.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-all hover:border-mint/40 hover:text-mint"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted-foreground transition-colors hover:text-mint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* stack */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Built with
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>React 19 + TypeScript</li>
              <li>Tailwind CSS v4</li>
              <li>Framer Motion</li>
              <li>Convex (backend)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs text-muted-foreground">
              <VisitorCount />
            </span>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-all hover:border-mint/40 hover:text-mint"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
