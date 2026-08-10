"use client";

import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/data/projects";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as any;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
} as any;

export function Projects() {
  const otherProjects = projects.slice(1);

  if (!otherProjects.length) return null;

  return (
    <Section id="projects" delay={0.2}>
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold tracking-tight">Other Noteworthy Projects</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {otherProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <GlassCard hoverEffect className="group relative flex flex-col h-full overflow-hidden border-white/5">
                {/* Background Image with Dark Overlay */}
                {project.imagePath && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${project.imagePath})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/85 via-[#020617]/70 to-[#020617]/50 group-hover:from-[#020617]/75 group-hover:via-[#020617]/60 group-hover:to-[#020617]/40 transition-colors duration-500" />
                  </>
                )}
                
                {/* Content Container (z-10 to stay above background) */}
                <div className="relative z-10 flex flex-col h-full gap-5 p-2">
                  <div className="flex justify-between items-start">
                    <FolderGit2 className="w-10 h-10 text-zinc-500 group-hover:text-cyan-500/70 transition-colors duration-500" />
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <FiGithub className="w-5 h-5" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span className="sr-only">Live Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-3">
                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-3 gap-y-2 mt-auto pt-4 border-t border-white/5 text-xs font-medium text-zinc-500">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:text-zinc-300 transition-all duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
