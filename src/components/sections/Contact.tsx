"use client";

import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Send } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" delay={0.6} className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight flex flex-col gap-2">
          <span className="text-white">Let&apos;s build</span>
          <span className="text-zinc-400">something</span>
          <span className="text-zinc-600">intelligent.</span>
        </h2>
        
        <p className="text-zinc-400 leading-relaxed text-lg max-w-xl mx-auto">
          Have an AI, backend, or automation project in mind? Let's connect and discuss how we can bring it to life.
        </p>
        
        <div className="pt-8">
          <a 
            href="mailto:prathameshcodes18@gmail.com" 
            className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="p-2 bg-white/10 rounded-full text-zinc-300 group-hover:text-white group-hover:bg-white/20 transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xl font-medium text-zinc-300 group-hover:text-white transition-colors">
              prathameshcodes18@gmail.com
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
