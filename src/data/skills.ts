export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend Frameworks",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"],
  },
  {
    title: "Backend & Cloud",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "AWS", "Vercel"],
  },
  {
    title: "Databases & ORMs",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Mongoose"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "GitHub Actions", "Jest", "Postman", "Figma"],
  },
];
