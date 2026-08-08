export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imagePath: string;
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
    id: "stoxiq",
    title: "StoxIQ",
    description: "AI-Powered Market Intelligence Platform leveraging robust data pipelines and AI processing to deliver actionable market insights.",
    techStack: ["Python", "data pipelines", "APIs", "backend architecture", "market intelligence", "AI/data processing"],
    githubLink: "https://github.com/Prathamesh1828",
    imagePath: "/projects/ecommerce-dash.jpg",
  },
  {
    id: "eduable",
    title: "EduAble",
    description: "An AI-powered accessibility-first learning platform providing adaptive workflows, multimodal content, and AI-generated transcripts for inclusive education.",
    techStack: ["React", "AI APIs", "Accessibility Systems"],
    githubLink: "https://github.com/Prathamesh1828",
    imagePath: "/projects/workout-generator.jpg",
  },
  {
    id: "freelance-automations",
    title: "Freelance Automations",
    description: "Workflow automation for medical inventory, gym membership management, and AI voice assistants to streamline clinic inquiries.",
    techStack: ["n8n", "AI Workflows", "Webhooks", "REST APIs"],
    imagePath: "/projects/portfolio.jpg", 
  }
];
