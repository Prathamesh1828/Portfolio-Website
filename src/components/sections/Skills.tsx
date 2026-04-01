import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" delay={0.3} className="py-24">
      <div className="flex flex-col gap-8">
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
      </div>
    </Section>
  );
}
