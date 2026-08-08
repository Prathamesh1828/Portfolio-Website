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
              I'm an AI Engineer & Backend Developer currently pursuing a Bachelor of Engineering in Computer Science 
              at Universal College of Engineering (2023–2027).
            </p>
            <p>
              I enjoy building systems where AI meets real-world applications — from intelligent agents and RAG pipelines 
              to automation platforms and scalable backend services.
            </p>
            <p>
              My focus is on turning AI capabilities into useful, production-oriented software rather than building 
              AI demos that exist only as experiments.
            </p>
          </div>
          <div className="space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p>
              I primarily work with Python, FastAPI, LLMs, REST APIs, databases, and modern AI frameworks. 
              My work involves building AI agents, integrating LLMs into applications, designing backend architectures, 
              and automating real-world workflows.
            </p>
            <p>
              I'm particularly interested in Generative AI, AI Agents, RAG, backend engineering, and intelligent automation.
            </p>
            <p>
              Outside of building projects, I participate in hackathons, continuously explore emerging AI technologies, 
              and enjoy turning ideas into working products.
            </p>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
