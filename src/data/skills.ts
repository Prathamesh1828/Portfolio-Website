export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    title: "AI & Generative AI",
    skills: ["LLMs", "RAG", "AI Agents", "LangChain", "LangGraph", "Embeddings", "Vector Search", "Prompt Engineering"],
  },
  {
    title: "Backend Engineering",
    skills: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "Supabase", "Redis", "Webhooks", "Authentication"],
  },
  {
    title: "AI Infrastructure & Tools",
    skills: ["Docker", "Git", "Vector Databases", "API Integrations", "AI APIs"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  }
];
