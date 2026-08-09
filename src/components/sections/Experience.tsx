"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { DocumentModal } from "@/components/ui/DocumentModal";
import { FileText, ExternalLink } from "lucide-react";

export function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section id="experience" delay={0.1}>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>

        <GlassCard className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Automation Engineer Intern
              </h3>
              <p className="text-lg font-medium text-zinc-300">
                Dhwaj Platform Pvt. Ltd. <span className="text-zinc-500 font-normal ml-2">| SalesPal</span>
              </p>
            </div>
            <div className="text-sm font-medium text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
              Jul 2025 – Mar 2026
            </div>
          </div>

          <div className="text-zinc-400 leading-relaxed text-base md:text-lg">
            Contributed to SalesPal, an AI-powered sales and automation platform, working across workflow automation, backend integrations, and AI-driven communication systems.
          </div>

          <ul className="flex flex-col gap-3 text-zinc-400">
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-1.5 flex-shrink-0">•</span>
              <span>Built and maintained automation workflows using n8n, APIs, and webhooks for sales and lead-management processes.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-1.5 flex-shrink-0">•</span>
              <span>Contributed to AI voice-calling systems using LiveKit, integrating Speech-to-Text (STT), LLMs, and Text-to-Speech (TTS) for real-time conversational interactions.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-1.5 flex-shrink-0">•</span>
              <span>Worked on backend processes, lead management, system alerts, and workflow integrations.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-1.5 flex-shrink-0">•</span>
              <span>Collaborated with product/frontend teams and troubleshot workflows to improve reliability and efficiency.</span>
            </li>
          </ul>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["n8n", "LiveKit", "LLMs", "STT", "TTS", "REST APIs", "Webhooks", "Python"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 text-sm font-medium transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              View Offer Letter
            </button>
            <a
              href="https://salespal.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              SalesPal
            </a>
          </div>
        </GlassCard>
      </div>

      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fileUrl="/projects/prathmesh j offer letter.pdf"
        title="Offer Letter"
      />
    </Section>
  );
}
