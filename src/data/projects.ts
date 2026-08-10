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
