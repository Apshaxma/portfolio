import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Braces,
  Brain,
  Code2,
  Container,
  Database,
  Eye,
  FileSearch,
  FileText,
  GitBranch,
  Handshake,
  Layers,
  LineChart,
  Link2,
  MessageSquareText,
  MonitorPlay,
  Network,
  PenTool,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  TrendingUp,
  Video,
  Workflow,
  Zap,
} from "lucide-react";

/* ============================================================================
 * PROFILE — edit these values to personalize the portfolio
 * ========================================================================== */
export const PROFILE = {
  name: "Ashutosh Sharma",
  firstName: "Ashutosh",
  initials: "AS",
  roles: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Generative AI Developer",
  ],
  location: "Mumbai, India",
  tagline:
    "I build autonomous AI agents, RAG systems and production-grade ML applications — turning research into systems that actually ship.",
  email: "imashutosh156@gmail.com",
  github: "https://github.com/Apshaxma",
  linkedin: "https://www.linkedin.com/in/ashutosh-sharma-339074368/",
  resumePath: "/resume",
  githubUsername: "Apshaxma",
  education: {
    degree: "B.Sc. Artificial Intelligence & Machine Learning",
    school: "Tata Institute of Social Sciences (TISS)",
    city: "Mumbai, India",
    years: "2022 — 2026",
  },
} as const;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export const HERO_STATS = [
  { value: "10+", label: "AI projects shipped" },
  { value: "15+", label: "LLM tools mastered" },
  { value: "100%", label: "Powered by curiosity" },
] as const;

/* ============================================================================
 * SKILLS
 * ========================================================================== */
export type Skill = {
  name: string;
  level: number;
  icon: LucideIcon;
  blurb: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "programming",
    label: "Programming & Systems",
    icon: Code2,
    skills: [
      { name: "Python", level: 95, icon: Code2, blurb: "Primary language — data, AI & backend" },
      { name: "C++", level: 88, icon: Braces, blurb: "Systems programming & performance" },
      { name: "C", level: 85, icon: Braces, blurb: "Core language fundamentals" },
      { name: "SQL", level: 82, icon: Database, blurb: "Querying & data pipelines" },
      { name: "Git", level: 90, icon: GitBranch, blurb: "Version control & collaboration" },
      { name: "Linux", level: 86, icon: Terminal, blurb: "Daily driver — shell & tooling" },
      { name: "Docker", level: 80, icon: Container, blurb: "Containerized AI services" },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: Brain,
    skills: [
      { name: "Deep Learning", level: 85, icon: Brain, blurb: "NNs, transformers, training" },
      { name: "NLP", level: 88, icon: MessageSquareText, blurb: "Text processing & understanding" },
      { name: "Computer Vision", level: 75, icon: Eye, blurb: "Image models & pipelines" },
    ],
  },
  {
    id: "genai",
    label: "Generative AI & Agents",
    icon: Sparkles,
    skills: [
      { name: "LangGraph", level: 90, icon: Workflow, blurb: "Stateful multi-agent graphs" },
      { name: "LangChain", level: 92, icon: Link2, blurb: "LLM application framework" },
      { name: "RAG", level: 90, icon: FileSearch, blurb: "Retrieval-augmented generation" },
      { name: "Vector Databases", level: 88, icon: Layers, blurb: "FAISS & semantic search" },
      { name: "LLMs", level: 92, icon: Sparkles, blurb: "Gemini, OpenAI & open models" },
      { name: "Prompt Engineering", level: 95, icon: PenTool, blurb: "Systems-level prompt design" },
      { name: "Agentic AI", level: 90, icon: Bot, blurb: "Tool use, planning & memory" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering & Deployment",
    icon: Rocket,
    skills: [
      { name: "FastAPI", level: 88, icon: Zap, blurb: "High-performance API services" },
      { name: "Streamlit", level: 92, icon: MonitorPlay, blurb: "Rapid AI app frontends" },
      { name: "REST APIs", level: 90, icon: Server, blurb: "Designing & consuming APIs" },
      { name: "Deployment", level: 82, icon: Rocket, blurb: "Shipping ML to production" },
    ],
  },
];

/* ============================================================================
 * PROJECTS
 * ========================================================================== */
export type ProjectCategory = "agents" | "rag" | "ml";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  categoryLabel: string;
  stack: string[];
  github?: string;
  demo?: string;
  metrics: { label: string; value: string }[];
  gradient: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const PROJECT_CATEGORIES: { id: ProjectCategory | "all"; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "agents", label: "AI Agents" },
    { id: "rag", label: "RAG & Search" },
    { id: "ml", label: "ML & Analytics" },
  ];

export const PROJECTS: Project[] = [
  {
    id: "deep-research-ai",
    title: "Deep Research AI",
    tagline: "Multi-agent deep research assistant",
    description:
      "An autonomous dual-agent research system built with LangGraph that searches the live web via Tavily and drafts structured, citation-ready reports with Gemini. Deployed on Streamlit.",
    category: "agents",
    categoryLabel: "AI Agents",
    stack: ["LangGraph", "LangChain", "Gemini", "Tavily", "Python", "Streamlit"],
    github: "https://github.com/Apshaxma/deep_research_ai",
    demo: "https://deepresearchai-01.streamlit.app/",
    metrics: [
      { label: "Agents", value: "2+" },
      { label: "Sources", value: "Live web" },
      { label: "Deploy", value: "Streamlit" },
    ],
    gradient: "from-[#00f5d4]/25 via-[#4f6bff]/15 to-transparent",
    icon: Bot,
    featured: true,
  },
  {
    id: "tripmind-ai",
    title: "TripMind AI",
    tagline: "Agentic AI travel planner",
    description:
      "A multi-tool LangGraph travel agent that routes between weather, live destination search, itinerary planning and budget estimation — with persistent session memory.",
    category: "agents",
    categoryLabel: "AI Agents",
    stack: ["LangGraph", "FastAPI", "Gemini", "OpenWeather", "Tavily"],
    github: "https://github.com/Apshaxma/tripmind_ai",
    metrics: [
      { label: "Tools", value: "4" },
      { label: "Workflow", value: "Multi-agent" },
      { label: "Memory", value: "Yes" },
    ],
    gradient: "from-[#7b61ff]/25 via-[#00f5d4]/10 to-transparent",
    icon: Workflow,
    featured: true,
  },
  {
    id: "agentic-ai-system",
    title: "Agentic AI System",
    tagline: "Production agent orchestration engine",
    description:
      "A production-ready agentic AI system built with FastAPI and AsyncIO that manually orchestrates specialized agents — decomposing complex tasks, running dependency-aware pipelines, streaming real-time progress and recovering from failures without black-box agent frameworks.",
    category: "agents",
    categoryLabel: "AI Agents",
    stack: ["FastAPI", "AsyncIO", "Python", "Multi-Agent", "Ollama"],
    github: "https://github.com/Apshaxma/agentic-ai-system",
    metrics: [
      { label: "Orchestration", value: "Manual" },
      { label: "Progress", value: "Real-time" },
      { label: "Failures", value: "Self-recovering" },
    ],
    gradient: "from-[#22d3ee]/20 via-[#4f6bff]/12 to-transparent",
    icon: Network,
  },
  {
    id: "negotioai",
    title: "NegotiAI",
    tagline: "AI-powered negotiation training",
    description:
      "An AI-powered negotiation training system that runs practice scenarios and delivers personalized, actionable feedback on each exchange — helping users sharpen real-world negotiation skills.",
    category: "agents",
    categoryLabel: "AI Agents",
    stack: ["Python", "LLM", "FastAPI", "Prompt Engineering"],
    github: "https://github.com/Apshaxma/negotioai",
    metrics: [
      { label: "Mode", value: "Practice" },
      { label: "Feedback", value: "Personalized" },
      { label: "Stack", value: "LLM-powered" },
    ],
    gradient: "from-[#fb923c]/20 via-[#f43f5e]/10 to-transparent",
    icon: Handshake,
  },
  {
    id: "rag-csv-chatbot",
    title: "RAG CSV Chatbot",
    tagline: "Chat with your CSV files",
    description:
      "Upload a CSV and ask questions in plain English. Uses FAISS embeddings and semantic search over chunked rows to return grounded, source-aware answers. Built for a client.",
    category: "rag",
    categoryLabel: "RAG & Search",
    stack: ["FAISS", "Embeddings", "Python", "Streamlit", "RAG"],
    github: "https://github.com/Apshaxma/rag-chatbot-for--csv",
    metrics: [
      { label: "Retrieval", value: "FAISS" },
      { label: "Search", value: "Semantic" },
      { label: "UI", value: "Streamlit" },
    ],
    gradient: "from-[#f0abfc]/20 via-[#7b61ff]/15 to-transparent",
    icon: FileSearch,
  },
  {
    id: "pdf-rag-assistant",
    title: "RAG QA System",
    tagline: "Document-grounded question answering",
    description:
      "A RAG question-answering system that grounds every answer in your own documents — retrieval over embedded chunks with source-backed responses. The foundation for document chat.",
    category: "rag",
    categoryLabel: "RAG & Search",
    stack: ["FAISS", "LangChain", "Gemini", "Python", "RAG"],
    github: "https://github.com/Apshaxma/rag-qa-system",
    metrics: [
      { label: "Chunking", value: "Smart" },
      { label: "Search", value: "Semantic" },
      { label: "Answers", value: "Grounded" },
    ],
    gradient: "from-[#38bdf8]/20 via-[#4f6bff]/12 to-transparent",
    icon: FileText,
  },
  {
    id: "videoiq-summarizer",
    title: "VideoIQ Summarizer",
    tagline: "Long videos → instant summaries",
    description:
      "Transcribes long-form videos with Whisper and distills them into structured summaries, timestamped takeaways and key quotes — plus grounded Q&A over the transcript using chunked retrieval.",
    category: "rag",
    categoryLabel: "RAG & Search",
    stack: ["Whisper", "Gemini", "Embeddings", "RAG", "Streamlit"],
    github: "https://github.com/Apshaxma/videoiq-summarizer",
    metrics: [
      { label: "Input", value: "1hr+ video" },
      { label: "Output", value: "2-min brief" },
      { label: "Extras", value: "Timestamps + Q&A" },
    ],
    gradient: "from-[#a78bfa]/25 via-[#7b61ff]/12 to-transparent",
    icon: Video,
  },
  {
    id: "image-caption-studio",
    title: "Image Caption Studio",
    tagline: "Multimodal image understanding",
    description:
      "A multimodal pipeline that generates rich captions, detects scenes and extracts structured details from images using Gemini Vision — with Tesseract-assisted OCR for on-image text.",
    category: "ml",
    categoryLabel: "ML & Analytics",
    stack: ["Python", "Gemini Vision", "Tesseract OCR", "Streamlit"],
    github: "https://github.com/Apshaxma/image-caption-studio",
    metrics: [
      { label: "Models", value: "2+ vision" },
      { label: "Tasks", value: "Caption + OCR" },
      { label: "Latency", value: "< 2s" },
    ],
    gradient: "from-[#34d399]/20 via-[#00f5d4]/10 to-transparent",
    icon: Eye,
  },
  {
    id: "stockpulse-ai",
    title: "StockPulse AI",
    tagline: "Automated trading & trend analytics",
    description:
      "An automated trading bot that analyzes market data and executes trades programmatically — with trend forecasting, signal generation and backtesting built in.",
    category: "ml",
    categoryLabel: "ML & Analytics",
    stack: ["Python", "Pandas", "TensorFlow", "yfinance", "Streamlit"],
    github: "https://github.com/Apshaxma/trading_bot",
    metrics: [
      { label: "Trading", value: "Automated" },
      { label: "Forecast", value: "Trend ML" },
      { label: "Validation", value: "Backtested" },
    ],
    gradient: "from-[#f59e0b]/20 via-[#fbbf24]/10 to-transparent",
    icon: TrendingUp,
  },
  {
    id: "aqi-prediction",
    title: "AQI Prediction",
    tagline: "Machine learning for air quality",
    description:
      "A machine learning application that predicts the Air Quality Index from environmental features — feature engineering, model training and evaluation end to end.",
    category: "ml",
    categoryLabel: "ML & Analytics",
    stack: ["Python", "Pandas", "Scikit-learn", "ML"],
    github: "https://github.com/Apshaxma/AQI_PREDICTION_app",
    metrics: [
      { label: "Type", value: "Regression" },
      { label: "Target", value: "AQI" },
      { label: "Pipeline", value: "End-to-end" },
    ],
    gradient: "from-[#fbbf24]/20 via-[#f0abfc]/10 to-transparent",
    icon: LineChart,
  },
];

/* ============================================================================
 * EXPERIENCE & EDUCATION
 * ========================================================================== */
export type TimelineItem = {
  period: string;
  role: string;
  org: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

export const EXPERIENCE: TimelineItem[] = [
  {
    period: "2025 — Present",
    role: "AI/ML Intern",
    org: "Applied AI · Internship",
    description:
      "Working hands-on with LLMs, automation and Python to build AI applications that solve real problems.",
    points: [
      "Built LLM-powered automation workflows that cut repetitive manual work",
      "Developed AI applications with Python, LangChain and REST APIs",
      "Designed and evaluated prompts, optimizing quality and cost",
      "Contributed to agentic AI experiments end to end",
    ],
    icon: Bot,
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    period: "2022 — 2026",
    role: "B.Sc. Artificial Intelligence & Machine Learning",
    org: "Tata Institute of Social Sciences (TISS), Mumbai",
    description:
      "Focused on machine learning, deep learning, NLP and the engineering behind intelligent systems.",
    points: [
      "Core coursework in ML, deep learning, NLP and statistics",
      "Applied projects spanning RAG, agents, forecasting and more",
      "Built a production-minded portfolio of AI applications",
    ],
    icon: Brain,
  },
];

/* ============================================================================
 * CERTIFICATIONS (placeholders — replace with your real ones)
 * ========================================================================== */
export const CERTIFICATIONS = [
  {
    title: "Machine Learning Specialization",
    issuer: "Placeholder — add your certification",
    icon: Brain,
  },
  {
    title: "Deep Learning Specialization",
    issuer: "Placeholder — add your certification",
    icon: LineChart,
  },
  {
    title: "LangChain for LLM App Development",
    issuer: "Placeholder — add your certification",
    icon: Link2,
  },
];

/* ============================================================================
 * TESTIMONIALS (placeholders — replace with real quotes)
 * ========================================================================== */
export const TESTIMONIALS = [
  {
    quote:
      "Placeholder quote — “Ashutosh turned a vague idea into a working multi-agent system faster than we expected. Sharp, curious, ships.”",
    name: "Your Name",
    role: "Hiring Manager · AI Startup",
  },
  {
    quote:
      "Placeholder quote — “Rare combination of research intuition and engineering discipline. His RAG work was production-ready.”",
    name: "Your Name",
    role: "Tech Lead · AI Company",
  },
  {
    quote:
      "Placeholder quote — “Ashutosh is the kind of engineer every AI team wants — fluent in LangGraph, FastAPI and shipping.”",
    name: "Your Name",
    role: "Recruiter · Frontier AI Lab",
  },
];

/* ============================================================================
 * ANIMATED TERMINAL SCRIPT
 * ========================================================================== */
export const TERMINAL_SCRIPT = [
  { cmd: "whoami", out: "ashutosh — AI Engineer · Mumbai, IN" },
  { cmd: "ls ./skills", out: "langchain/  langgraph/  rag/  llms/  fastapi/  streamlit/" },
  { cmd: "cat education.txt", out: "B.Sc. AI & ML — TISS Mumbai" },
  { cmd: "python run_agent.py --task deep-research", out: "✓ 2 agents orchestrated · report ready" },
  { cmd: "git push origin main", out: "→ github.com/Apshaxma" },
];

/* ============================================================================
 * ASSISTANT KNOWLEDGE BASE (fallback when no LLM key is configured)
 * ========================================================================== */
export type KnowledgeRule = { keywords: string[]; reply: string };

export const ASSISTANT_KB: KnowledgeRule[] = [
  {
    keywords: ["hello", "hi", "hey", "namaste"],
    reply:
      "Hey there! 👋 I'm Ashutosh AI — the assistant on Ashutosh's portfolio. Ask me about his projects, skills, experience, or how to reach him!",
  },
  {
    keywords: ["who", "about", "yourself", "ashutosh"],
    reply:
      "Ashutosh Sharma is an AI Engineer, ML Engineer and Generative AI Developer based in Mumbai, India. He's studying B.Sc. AI & ML at TISS Mumbai and builds agentic AI systems with LangGraph, LangChain and modern LLM APIs.",
  },
  {
    keywords: ["project", "built", "work"],
    reply:
      "He's shipped 10+ projects. Highlights: 1) Deep Research AI — multi-agent research with a live demo (LangGraph, Gemini, Tavily). 2) TripMind AI — agentic travel planner with memory. 3) Agentic AI System — production FastAPI + AsyncIO orchestration engine. 4) NegotiAI — AI negotiation training with feedback. 5) RAG CSV Chatbot & RAG QA System — chat with data and documents. 6) VideoIQ Summarizer — long videos → timestamped summaries with grounded Q&A. 7) Image Caption Studio — multimodal captions, scenes and OCR. 8) StockPulse AI — automated trading & trend ML. Plus AQI Prediction and more. All in the Projects section — every card links straight to its GitHub repo!",
  },
  {
    keywords: ["stack", "tech", "skill", "tools", "language"],
    reply:
      "Core languages: Python, C and C++. AI stack: FastAPI, LangChain, LangGraph, Google Gemini & OpenAI APIs, FAISS, vector databases, RAG, Streamlit, Docker, Git, Linux. Plus deep learning, NLP and computer vision. The Skills section has the full breakdown!",
  },
  {
    keywords: ["experience", "intern", "internship", "job"],
    reply:
      "Ashutosh is currently an AI/ML intern working on LLMs, automation and AI applications — building workflows with Python, LangChain and REST APIs. He's open to AI Engineer / ML Engineer / Generative AI roles.",
  },
  {
    keywords: ["education", "college", "degree", "study", "tiss"],
    reply:
      "He's pursuing a B.Sc. in Artificial Intelligence & Machine Learning at the Tata Institute of Social Sciences (TISS), Mumbai — with a focus on ML, deep learning, NLP and building production AI systems.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "recruit"],
    reply:
      "You can reach Ashutosh at imashutosh156@gmail.com, through the contact form below, or on GitHub (github.com/Apshaxma) and LinkedIn. He's open to AI roles and interesting collaborations!",
  },
  {
    keywords: ["github", "code", "repo"],
    reply:
      "His GitHub is github.com/Apshaxma — where Deep Research AI, TripMind AI, the Agentic AI System, NegotiAI, the RAG systems, VideoIQ Summarizer and Image Caption Studio all live. The GitHub section on this page shows live stats!",
  },
  {
    keywords: ["resume", "cv"],
    reply:
      "You can view or download his resume on the /resume page — there's a Resume button in the navbar and hero.",
  },
  {
    keywords: ["thanks", "thank"],
    reply: "You're welcome! 😄 Anything else about Ashutosh's work you'd like to know?",
  },
];

export const ASSISTANT_FALLBACK =
  "I don't have an answer for that one yet — but Ashutosh would! Drop him a message via the contact form or on LinkedIn.";
