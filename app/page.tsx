"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  return (
    <main
      className={`min-h-screen px-6 py-16 transition duration-500 ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-xl font-semibold tracking-wide">
            Ashutosh.ai <span className="text-sm text-gray-400">⚡ GenAI Engineer</span>
          </h1>

          <div className="flex gap-3 items-center">
            {/* KUBERNS BADGE */}
            <span className="px-3 py-1 rounded-full text-xs border bg-gray-100 text-black">
              Deployed with Kuberns AI ✅
            </span>

            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-xl border hover:scale-105 transition"
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-6xl font-bold tracking-tight">
            AI Engineer.
            <span className="block text-gray-400">
              GenAI • RAG • Agentic Systems
            </span>
          </h2>

          <p className="mt-6 text-xl max-w-2xl text-gray-500">
            AI Engineer with hands-on experience building production-grade ML +
            GenAI solutions. Reduced HR support tickets by 60% using RAG systems.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <a
              href="#projects"
              className="px-7 py-3 rounded-2xl bg-blue-600 text-white shadow-md hover:scale-105 transition"
            >
              View Projects
            </a>

            {/* RESUME DOWNLOAD */}
            <a
              href="/Ashutosh_Resume.pdf"
              download
              className="px-7 py-3 rounded-2xl border hover:shadow-md transition"
            >
              Download Resume
            </a>

            {/* AI ASSISTANT */}
            <button
              onClick={() => setOpenAI(true)}
              className="px-7 py-3 rounded-2xl border hover:shadow-md transition"
            >
              Ask My AI Assistant
            </button>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <section id="projects" className="mt-28">
          <h3 className="text-3xl font-semibold">Hackathon Projects</h3>
          <p className="mt-2 text-gray-500">
            Live demos + real business impact projects.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <ProjectCard
              title="RAG-Based HR Chatbot"
              desc="Reduced HR tickets by ~60% with LangChain + Vector Search."
              tag="GenAI • RAG"
              link="https://github.com/Apshaxma/rag-chatbot"
            />

            <ProjectCard
              title="Deep Research Agent"
              desc="Dual-agent Tavily + LangGraph automated research engine."
              tag="Agentic AI"
              link="https://deepresearchai-01.streamlit.app/"
            />

            <ProjectCard
              title="AQI Prediction System"
              desc="Forecasting air quality using pollutant + ML forecasting."
              tag="ML Forecast"
              link="https://aqipredictionapp.streamlit.app/"
            />

            <ProjectCard
              title="AI Trading Bot"
              desc="Automated trading bot with strategies + execution pipeline."
              tag="Finance AI"
              link="https://github.com/Apshaxma/trading_bot"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-28 pb-24">
          <h3 className="text-3xl font-semibold">Let’s Connect</h3>
          <p className="mt-4 text-gray-500">
            Open for internships, collaborations, and AI product building.
          </p>

          <div className="mt-6 space-y-2 text-gray-600">
            <p>Email: imashutosh156@gmail.com</p>
            <p>GitHub: https://github.com/Apshaxma</p>
            <p>LinkedIn: linkedin.com/in/ashutosh-sharma-339074368</p>
          </div>
        </section>

        <footer className="border-t pt-6 text-sm text-gray-500">
          Built with Next.js • Tailwind • Framer Motion • Deployed on Kuberns AI
        </footer>

        {/* AI Assistant Popup */}
        {openAI && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white text-black p-8 rounded-3xl max-w-md shadow-xl">
              <h4 className="text-2xl font-semibold">AI Assistant 🤖</h4>
              <p className="mt-3 text-gray-600">
                Hi! I’m Ashutosh’s AI assistant.  
                Ask about projects, skills, or hiring.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                (Hackathon Demo UI — can connect to real GPT API later.)
              </p>

              <button
                className="mt-6 px-6 py-2 rounded-xl bg-black text-white"
                onClick={() => setOpenAI(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function ProjectCard({
  title,
  desc,
  tag,
  link,
}: {
  title: string;
  desc: string;
  tag: string;
  link: string;
}) {
  return (
    <motion.a
      href={link}
      target="_blank"
      whileHover={{ scale: 1.05 }}
      className="block p-10 rounded-3xl border shadow-sm hover:shadow-xl transition"
    >
      <p className="text-sm text-gray-400 uppercase">{tag}</p>
      <h4 className="text-2xl font-semibold mt-2">{title}</h4>
      <p className="mt-3 text-gray-600 leading-relaxed">{desc}</p>
      <p className="mt-5 text-blue-600 font-medium">→ Open Link</p>
    </motion.a>
  );
}
