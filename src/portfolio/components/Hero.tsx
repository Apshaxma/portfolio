import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  FolderGit2,
  Github,
  Linkedin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HERO_STATS, PROFILE, TERMINAL_SCRIPT } from "../data";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

/* ---------------------------------------------------------------------------
 * Typing animation for the role line
 * ------------------------------------------------------------------------- */
function useTypewriter(
  words: readonly string[],
  typeMs = 65,
  deleteMs = 35,
  holdMs = 1700,
) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      setText(words[0] ?? "");
      return;
    }
    const word = words[index % words.length];
    let timer: number;
    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      timer = window.setTimeout(() => {}, 0);
    } else {
      timer = window.setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteMs : typeMs,
      );
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, reduce]);

  return text;
}

/* ---------------------------------------------------------------------------
 * Animated terminal card
 * ------------------------------------------------------------------------- */
function AnimatedTerminal() {
  const reduce = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (reduce) {
      setLineIdx(TERMINAL_SCRIPT.length);
      return;
    }
    if (lineIdx >= TERMINAL_SCRIPT.length) {
      const t = window.setTimeout(() => {
        setLineIdx(0);
        setCharCount(0);
        setShowOut(false);
      }, 5200);
      return () => window.clearTimeout(t);
    }
    const line = TERMINAL_SCRIPT[lineIdx];
    if (!showOut) {
      if (charCount < line.cmd.length) {
        const t = window.setTimeout(
          () => setCharCount((c) => c + 1),
          42 + Math.random() * 38,
        );
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setShowOut(true), 320);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharCount(0);
      setShowOut(false);
    }, 480);
    return () => window.clearTimeout(t);
  }, [lineIdx, charCount, showOut, reduce]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0d]/85 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
          ashutosh@portfolio: ~/ai
        </span>
      </div>
      <div className="min-h-[236px] p-4 font-mono text-[13px] leading-6">
        {TERMINAL_SCRIPT.slice(0, lineIdx).map((line, i) => (
          <div key={i}>
            <p className="text-muted-foreground">
              <span className="text-mint">➜</span> ~{" "}
              <span className="text-violet">$</span> {line.cmd}
            </p>
            <p className="text-muted-foreground/85">{line.out}</p>
          </div>
        ))}
        {lineIdx < TERMINAL_SCRIPT.length && (
          <div>
            <p className="text-muted-foreground">
              <span className="text-mint">➜</span> ~{" "}
              <span className="text-violet">$</span>{" "}
              {TERMINAL_SCRIPT[lineIdx].cmd.slice(0, charCount)}
              <span className="animate-blink text-mint">▊</span>
            </p>
            {showOut && (
              <p className="text-muted-foreground/85">
                {TERMINAL_SCRIPT[lineIdx].out}
              </p>
            )}
          </div>
        )}
        {lineIdx >= TERMINAL_SCRIPT.length && (
          <p className="text-muted-foreground">
            <span className="text-mint">➜</span> ~ <span className="text-violet">$</span>{" "}
            <span className="animate-blink text-mint">▊</span>
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Hero section
 * ------------------------------------------------------------------------- */
export function Hero() {
  const typed = useTypewriter(PROFILE.roles);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left — copy */}
        <div>
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/[0.06] px-3.5 py-1.5 font-mono text-xs text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Open to AI Engineer roles · {PROFILE.location}
            </span>
          </Reveal>

          <h1 className="mt-7 font-display font-bold tracking-tight">
            <Reveal delay={0.1}>
              <span className="block text-5xl leading-[1.08] text-foreground sm:text-6xl lg:text-7xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-mint via-[#7df5e4] to-violet bg-clip-text text-transparent">
                  {PROFILE.firstName}
                </span>
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="mt-3 flex w-full items-center gap-2 overflow-hidden whitespace-nowrap text-3xl sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {typed}
                </span>
                <span className="animate-blink inline-block h-[0.85em] w-[3px] shrink-0 rounded-full bg-mint" />
              </span>
            </Reveal>
          </h1>

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build{" "}
              <span className="text-foreground">
                autonomous AI agents, RAG systems and production-grade ML
                applications
              </span>{" "}
              with LangGraph, LangChain and modern LLM APIs — turning research
              into systems that actually ship.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="group inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-3 text-sm font-semibold text-[#041412] shadow-[0_0_36px_rgba(0,245,212,0.28)] transition-all hover:shadow-[0_0_52px_rgba(0,245,212,0.45)]"
                >
                  <FolderGit2 className="h-4 w-4" />
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={PROFILE.resumePath}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-mint/40 hover:bg-white/[0.07]"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </MagneticButton>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-muted-foreground transition-all hover:border-mint/40 hover:text-mint"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-muted-foreground transition-all hover:border-violet/50 hover:text-violet"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right — terminal */}
        <Reveal delay={0.35} y={40}>
          <div className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-mint/15 via-transparent to-violet/15 blur-2xl" />
            <div className="animate-float-slow relative">
              <AnimatedTerminal />
            </div>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <button
        type="button"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-mint md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
