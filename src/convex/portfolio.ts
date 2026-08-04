import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Portfolio backend — visitor counter + optional LLM-powered assistant.
 *
 * The assistant chat action is fully optional: if OPENAI_API_KEY is not set
 * in the project's Keys/API keys tab, the action returns `usedLLM: false`
 * and the client-side widget falls back to its built-in knowledge base.
 */

export const getVisitorCount = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db.query("visitors").first();
    return doc?.count ?? 0;
  },
});

export const incrementVisitors = mutation({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db.query("visitors").first();
    if (!doc) {
      await ctx.db.insert("visitors", { count: 1 });
    } else {
      await ctx.db.patch(doc._id, { count: doc.count + 1 });
    }
  },
});

const SYSTEM_PROMPT = `You are "Ashutosh AI", the interactive assistant on the personal portfolio of Ashutosh Sharma, an AI Engineer. Be warm, concise and enthusiastic. Answer strictly from the facts below — if asked something not covered, politely say you don't have that info and suggest emailing him.

ABOUT: Ashutosh Sharma is an AI Engineer, Machine Learning Engineer and Generative AI Developer based in Mumbai, India. He studies B.Sc. Artificial Intelligence & Machine Learning at Tata Institute of Social Sciences (TISS), Mumbai.

SKILLS: Python, SQL, Git, Linux, Docker, FastAPI, Streamlit, REST APIs. Machine Learning: Deep Learning, NLP, Computer Vision. Generative AI: Prompt Engineering, Agentic AI, LangChain, LangGraph, RAG, Vector Databases (FAISS), LLMs, Google Gemini API, OpenAI API.

FEATURED PROJECTS:
1) Deep Research AI — multi-agent research assistant built with LangGraph (multi-agent architecture, web search via Tavily, research planning, long-form report generation) deployed on Streamlit.
2) TripMind AI — AI travel planner with weather tool (OpenWeather), budget planner, travel recommendations, destination search, multi-agent workflow and memory, built with LangGraph + FastAPI + Gemini + Tavily.
3) RAG CSV Chatbot — upload a CSV and chat with it, using FAISS embeddings + semantic search, built with Python + Streamlit.
4) AQI Prediction — machine learning project predicting the Air Quality Index.

EXPERIENCE: AI/ML Internship working on LLMs, automation, Python and AI applications.

GITHUB: github.com/Apshaxma

CONTACT: reach him through the contact form on this site, email, LinkedIn or GitHub.`;

export const assistantChat = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      }),
    ),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { usedLLM: false, reply: null as string | null };
    }
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...args.messages.slice(-10),
          ],
          max_tokens: 320,
          temperature: 0.7,
        }),
      });
      if (!res.ok) {
        return { usedLLM: false, reply: null as string | null };
      }
      const data = (await res.json()) as {
        choices?: { message?: { content?: string | null } }[];
      };
      const reply = data.choices?.[0]?.message?.content ?? null;
      return { usedLLM: Boolean(reply), reply };
    } catch {
      return { usedLLM: false, reply: null as string | null };
    }
  },
});
