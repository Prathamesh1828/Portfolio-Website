export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imagePath: string;
}

export const projects: Project[] = [
  {
    id: "ai-workout-generator",
    title: "AI Workout Plan Generator",
    description: "An intelligent platform that generates personalized workout routines based on user goals, equipment availability, and fitness levels using LLMs.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Prisma", "PostgreSQL"],
    githubLink: "https://github.com/yourusername/ai-workout",
    liveLink: "https://ai-workout-demo.com",
    imagePath: "/projects/workout-generator.jpg", // Placeholder image path
  },
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Analytics Dashboard",
    description: "A comprehensive real-time dashboard for e-commerce businesses to track sales, inventory, and customer behavior with interactive charts.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Recharts", "Socket.io"],
    githubLink: "https://github.com/yourusername/ecommerce-dash",
    imagePath: "/projects/ecommerce-dash.jpg", // Placeholder image path
  },
  {
    id: "smart-task-manager",
    title: "Smart Task Manager",
    description: "A productivity app that automatically categorizes and prioritizes tasks using natural language processing.",
    techStack: ["React Native", "Firebase", "Google Cloud NLP", "Redux"],
    githubLink: "https://github.com/yourusername/smart-tasks",
    liveLink: "https://smarttask.app",
    imagePath: "/projects/smart-tasks.jpg", // Placeholder image path
  },
  {
    id: "developer-portfolio",
    title: "Minimalist Developer Portfolio",
    description: "A highly optimized, accessible, and elegant personal portfolio built to showcase projects and technical skills.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    githubLink: "https://github.com/yourusername/portfolio",
    liveLink: "https://yourportfolio.com",
    imagePath: "/projects/portfolio.jpg", // Placeholder image path
  }
];
