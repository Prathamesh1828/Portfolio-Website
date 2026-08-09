"use client";

import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
} as any;

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
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {areas.map((area, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard 
                className="p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 cursor-default group h-full"
              >
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {area.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
