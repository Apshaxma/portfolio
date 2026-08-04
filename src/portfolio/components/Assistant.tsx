import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ASSISTANT_FALLBACK, ASSISTANT_KB } from "../data";

type Message = { role: "user" | "assistant"; content: string };

const QUICK_PROMPTS = [
  "What projects have you built?",
  "What's your tech stack?",
  "How can I contact you?",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm Ashutosh AI 👋 — the assistant on Ashutosh's portfolio. Ask me about his projects, skills, experience or how to reach him.",
};

function localReply(text: string): string {
  const t = text.toLowerCase();
  for (const rule of ASSISTANT_KB) {
    if (rule.keywords.some((k) => t.includes(k))) return rule.reply;
  }
  return ASSISTANT_FALLBACK;
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const [llmMode, setLlmMode] = useState(false);
  const runChat = useAction(api.portfolio.assistantChat);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const history: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(history);
    setInput("");
    setTyping(true);
    try {
      const llmMessages = history
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await Promise.race([
        runChat({ messages: llmMessages }),
        new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 9000)),
      ]);
      if (res && res.usedLLM && res.reply) {
        setLlmMode(true);
        setMessages((h) => [...h, { role: "assistant", content: res.reply as string }]);
      } else {
        setMessages((h) => [...h, { role: "assistant", content: localReply(trimmed) }]);
      }
    } catch {
      setMessages((h) => [...h, { role: "assistant", content: localReply(trimmed) }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* launcher */}
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-violet text-[#041412] shadow-[0_8px_40px_-6px_rgba(0,245,212,0.5)] transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#050505] bg-mint" />
          </span>
        )}
      </motion.button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(70vh,540px)] w-[min(92vw,390px)] flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0b0b0e]/95 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-r from-mint/[0.1] to-violet/[0.1] px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-violet text-[#041412]">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-foreground">
                  Ashutosh AI
                </p>
                <p className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  {llmMode ? "Powered by LLM" : "Portfolio knowledge base"}
                </p>
              </div>
              <Zap className="h-4 w-4 text-mint" />
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-mint text-[#041412]"
                        : "rounded-bl-md border border-white/[0.07] bg-white/[0.04] text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-mint"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.18,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* quick prompts */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => send(prompt)}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-mint/40 hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/[0.07] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-[#041412] transition-all disabled:opacity-40 hover:shadow-[0_0_20px_rgba(0,245,212,0.4)]"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
