import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

const areas = [
  {
    title: "Agentic AI",
    description: "Intelligent systems that reason, use tools, retrieve information, maintain context, and execute multi-step workflows.",
  },
  {
    title: "Generative AI",
    description: "LLM-powered applications using RAG, embeddings, structured outputs, and AI integrations.",
  },
  {
    title: "Intelligent Automation",
    description: "AI-powered workflows connecting APIs, applications, databases, and real-world business processes.",
  },
  {
    title: "Backend Systems",
    description: "Scalable APIs and backend services designed to power AI applications and real-world workloads.",
  }
];

export function WhatIBuild() {
  return (
    <Section id="what-i-build">
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold tracking-tight">What I Build</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {areas.map((area, index) => (
            <GlassCard 
              key={index} 
              className="p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 cursor-default group"
            >
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                {area.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {area.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
