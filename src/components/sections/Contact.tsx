"use client";

import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Send } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" delay={0.6} className="min-h-[80vh] flex items-center">
      <div className="w-full flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight flex flex-col gap-1 md:gap-2">
            <span className="text-white">Let&apos;s build</span>
            <span className="text-zinc-400">something</span>
            <span className="text-zinc-600">intelligent.</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-md text-lg">
            Have an AI, backend, or automation project in mind? Let's connect.
          </p>
          
          <div className="pt-4 flex flex-col gap-4">
            <a 
              href="mailto:prathameshcodes18@gmail.com" 
              className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
            >
              <div className="p-3 bg-white/5 rounded-full border border-white/10">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">prathameshcodes18@gmail.com</span>
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <GlassCard className="p-8">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                  placeholder="Prathamesh Jaiswar"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                  placeholder="prathamesh@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                  Message
                </label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none font-sans"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-200 transition-colors mt-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
