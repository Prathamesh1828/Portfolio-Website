import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { skills } from "@/data/skills";
import LogoLoop from "@/components/ui/LogoLoop";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiPython, SiFastapi, SiPostgresql, SiSupabase, 
  SiRedis, SiDocker, SiGit
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiPython />, title: "Python" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiRedis />, title: "Redis" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGit />, title: "Git" },
];

export function Skills() {
  return (
    <Section id="skills" delay={0.3}>
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl font-bold tracking-tight">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => (
            <GlassCard key={category.title} className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-zinc-100 border-b border-white/10 pb-2">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li 
                    key={skill}
                    className="px-3 py-1 text-sm font-medium text-zinc-300 bg-white/5 rounded-md border border-white/5"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Animated Logo Loop */}
        <div className="w-full relative h-[60px] mt-6">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={40}
            gap={60}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="#020617"
            ariaLabel="Technology stack"
          />
        </div>
      </div>
    </Section>
  );
}
