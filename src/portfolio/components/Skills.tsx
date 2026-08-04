import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SKILL_GROUPS } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  const [active, setActive] = useState<string>("all");
  const reduce = useReducedMotion();

  const visible =
    active === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === active);

  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <>
              A stack built for{" "}
              <span className="bg-gradient-to-r from-mint to-violet bg-clip-text text-transparent">
                the agent era
              </span>
            </>
          }
          description="The languages, frameworks and mental models I reach for when building AI systems."
        />

        {/* filter tabs */}
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {[{ id: "all", label: "All" }, ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.label }))].map(
            (tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === tab.id
                    ? "text-[#041412]"
                    : "border border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-mint shadow-[0_0_24px_rgba(0,245,212,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ),
          )}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {visible.map((group) => (
              <div
                key={group.id}
                className="rounded-3xl border border-whit

[FILE_TOO_LARGE]: The combined read_files output exceeded the 100,000 character hard limit. This file was truncated after 2,662 characters. Read it separately or use code_search for the relevant section.