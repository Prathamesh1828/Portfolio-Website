import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

export function About() {
  return (
    <Section id="about">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        
        <GlassCard className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p>
              I'm a passionate Full Stack Developer with over 5 years of experience building 
              scalable web applications. My journey started with a curiosity about how things 
              work on the internet, which quickly evolved into a dedicated career in software engineering.
            </p>
            <p>
              I love the entire process of bringing an idea to life, from architecture design to 
              deployment. Recently, I've been heavily focused on integrating Artificial Intelligence 
              into modern web applications to create smarter, more intuitive user experiences.
            </p>
          </div>
          <div className="space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p>
              My expertise spans across the JavaScript/TypeScript ecosystem, with a deep focus on 
              React, Next.js, and Node.js. When it comes to databases, I comfortably work with both 
              SQL (PostgreSQL) and NoSQL (MongoDB) solutions.
            </p>
            <p>
              When I'm not coding, you can find me reading about new technologies, contributing to 
              open-source projects, or exploring the outdoors.
            </p>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
