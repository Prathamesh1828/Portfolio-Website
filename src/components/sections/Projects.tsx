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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {otherProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <GlassCard hoverEffect className="flex flex-col h-full gap-5">
                <div className="flex justify-between items-start">
                  <FolderGit2 className="w-10 h-10 text-zinc-500" />
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
                  <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-x-3 gap-y-2 mt-auto pt-4 text-xs font-mono text-zinc-500">
                  {project.techStack.map(tech => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
