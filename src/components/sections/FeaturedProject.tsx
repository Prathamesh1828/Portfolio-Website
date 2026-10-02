"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/data/projects";
import { ExternalLink, Play } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Image from "next/image";
import { VideoModal } from "@/components/ui/VideoModal";

export function FeaturedProject() {
  const featuredProjects = projects.slice(0, 2);
  
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = featuredProjects.find(p => p.id === activeProjectId);

  if (!featuredProjects.length) return null;

  return (
    <>
    <Section id="featured-project" delay={0.2}>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        
        <div className="flex flex-col gap-12">
          {featuredProjects.map((featured) => (
            <GlassCard key={featured.id} className="group flex flex-col md:flex-row gap-8 overflow-hidden p-0 border-white/5">
              {/* Default Project Media (Left Side) */}
              <div 
                className="md:w-1/2 relative min-h-[300px] overflow-hidden bg-zinc-900 border-r border-white/10 flex-shrink-0 cursor-pointer"
                onClick={() => setActiveProjectId(featured.id)}
              >
                {featured.imagePath ? (
                  <>
                    <Image 
                      src={featured.imagePath}
                      alt={featured.title}
                      fill
                      unoptimized
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {featured.videoPath && (
                      <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/20">
                        <div className="w-[72px] h-[72px] rounded-full border-4 border-white/80 bg-transparent flex items-center justify-center text-white/90 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] group-hover:border-white group-hover:text-white backdrop-blur-sm">
                          <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Fallback
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-50 p-6 text-center">
                      <span className="text-3xl md:text-4xl font-black tracking-widest uppercase text-white/20 select-none transform -rotate-12 break-words">
                        {featured.title}
                      </span>
                    </div>
                  </>
                )}
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
                  {featured.githubLink && featured.liveLink && (
                    <div className="w-[1px] h-4 bg-white/20 mx-1" />
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
          ))}
        </div>
      </div>
    </Section>

      {/* Interactive Media Modal — rendered via Portal to prevent layout breakage */}
      <VideoModal
        isOpen={!!activeProjectId}
        onClose={() => setActiveProjectId(null)}
        videoPath={activeProject?.videoPath}
        imagePath={activeProject?.imagePath}
        title={activeProject?.title || ""}
      />
    </>
  );
}
