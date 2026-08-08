import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Hammer } from "lucide-react";

export function CurrentlyBuilding() {
  return (
    <Section id="currently-building" delay={0.5}>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Hammer className="w-8 h-8 text-zinc-500" />
          Currently Building
        </h2>
        
        <GlassCard>
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400" />
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="space-y-3 max-w-3xl">
              <h3 className="text-xl font-bold text-white">InboxPilot</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Developing a production-inspired AI agent that transforms an inbox into an autonomous workflow system. The agent intelligently classifies emails, plans multi-step actions, invokes external tools, and automates low-risk tasks while routing irreversible actions through a human approval workflow. Users receive real-time approval requests and notifications via Telegram and WhatsApp, enabling secure, on-the-go decision making. Built with a safety-first architecture featuring confidence thresholding, audit trails, asynchronous processing, and seamless integrations with Gmail and Google Calendar.
              </p>
            </div>
            
            <a 
              href="#" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium whitespace-nowrap"
            >
              Follow Progress
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
