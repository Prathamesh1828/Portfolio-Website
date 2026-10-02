export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imagePath?: string;
  videoPath?: string;
}

export const projects: Project[] = [
  {
    id: "inboxpilot",
    title: "InboxPilot",
    description: "An AI agent that turns an inbox into an automated workflow. It reads emails, figures out the intent, and extracts structured data to take action. The core focus is safety—it handles low-risk tasks like archiving in the background, but pauses high-risk actions (like sending replies). For risky tasks, it pings you via Telegram so you can quickly review and approve the AI's plan on the Next.js dashboard.",
    techStack: ["FastAPI", "Next.js", "Groq/Gemini", "Celery", "PostgreSQL", "Redis", "Tailwind CSS"],
    githubLink: "https://github.com/Prathamesh1828/InboxPilot",
    liveLink: "https://inboxpilotai.vercel.app/",
    imagePath: "/projects/inboxpilot_logo.png",
  },
  {
    id: "replylink",
    title: "ReplyLink",
    description: "AI-powered Instagram automation platform for creators and businesses, automating comments, DMs, and story interactions while using AI to handle conversations, answer FAQs, and turn engagement into customers.",
    techStack: ["Python", "FastAPI", "Supabase", "Instagram Graph API", "Webhooks", "RAG", "LLMs", "AI automation"],
    githubLink: "https://github.com/Prathamesh1828/ReplyLink",
    liveLink: "https://replylink.vercel.app/",
    imagePath: "/projects/ReplyLink_ss.png",
    videoPath: "/projects/ReplyLink_Merge.mp4",
  },
  {
    id: "secure-ai-support-orchestrator",
    title: "Secure AI Customer Support Orchestrator",
    description: "A highly secure, production-grade Tier-1 support agent built for an e-commerce brand. Features a custom-built orchestrator engineered in pure Python for absolute control over LLM execution boundaries. Implements zero-leak data privacy, anti-hallucination conflict resolution, prompt injection defense, and lightweight TF-IDF retrieval.",
    techStack: ["Python", "Groq API", "scikit-learn", "Regex", "Markdown", "JSON"],
    githubLink: "https://github.com/Prathamesh1828/ai-agent-intern-test",
    videoPath: "/projects/RAG demo video.mp4",
    imagePath: "/projects/chatbot_video_thumbnail.avif",
  },
  {
    id: "nutrisnap",
    title: "NutriSnap",
    description: "AI-powered fitness and nutrition platform that uses Gemini to analyze meals, deliver nutritional insights, track fitness progress in real time, and provide personalized coaching experiences.",
    techStack: ["Next.js", "Gemini AI", "MongoDB", "Socket.io", "Razorpay"],
    githubLink: "https://github.com/Prathamesh1828",
    liveLink: "https://nutrisnap-eight.vercel.app/",
    imagePath: "/projects/Nutrisnap_ss.png",
  },
  {
    id: "careerpath-ai",
    title: "CareerPath-AI",
    description: "AI-powered career recommendation platform that analyzes skills, academic performance, and interests to provide personalized career paths, identify skill gaps, and recommend relevant learning resources.",
    techStack: ["React", "Node.js", "MongoDB", "Python", "Gemini AI"],
    githubLink: "https://github.com/Prathamesh1828/CareerPath-AI",
  }
];
