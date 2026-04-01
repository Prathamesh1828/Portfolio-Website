import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export function FeaturedProject() {
  const featured = projects[0];

  if (!featured) return null;

  return (
    <Section id="featured-project" delay={0.2}>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Featured Project</h2>
        
        <GlassCard className="group flex flex-col md:flex-row gap-8 overflow-hidden p-0 border-white/5">
          <div className="md:w-1/2 relative min-h-[300px] overflow-hidden bg-zinc-900 border-r border-white/10 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center opacity-50 p-6 text-center">
              <span className="text-3xl md:text-4xl font-black tracking-widest uppercase text-white/20 select-none transform -rotate-12 break-words">
                {featured.title}
              </span>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 flex flex-col justify-center gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {featured.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {featured.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              {featured.githubLink && (
                <a 
                  href={featured.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  Code
                </a>
              )}
              {featured.liveLink && (
                <a 
                  href={featured.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
