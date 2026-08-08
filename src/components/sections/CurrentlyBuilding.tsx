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
        
        <GlassCard className="border-l-4 border-l-emerald-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">AI-Powered Revenue Automation</h3>
              <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
                I'm currently architecting Kalash Platform, an AI-powered revenue automation platform 
                automating marketing campaigns, sales pipelines, and customer lifecycle workflows.
              </p>
            </div>
            
            <a 
              href="https://github.com/Prathamesh1828" 
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
