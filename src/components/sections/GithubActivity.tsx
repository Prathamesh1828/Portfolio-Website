import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

export default function GithubActivity() {
  // Generate mock contribution data for visual effect
  const weeks = Array.from({ length: 52 }, () => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );

  const getColor = (level: number) => {
    switch(level) {
      case 0: return "bg-white/5";
      case 1: return "bg-emerald-900/40";
      case 2: return "bg-emerald-700/60";
      case 3: return "bg-emerald-500/80";
      case 4: return "bg-emerald-400";
      default: return "bg-white/5";
    }
  };

  return (
    <Section id="github" delay={0.4} className="py-24">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">GitHub Contributions</h2>
        
        <GlassCard className="p-8 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="flex gap-1">
              {weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {week.map((day, j) => (
                    <div 
                      key={`${i}-${j}`} 
                      className={`w-3 h-3 rounded-sm ${getColor(day)}`}
                      title={`${day} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end items-center gap-2 mt-4 text-xs text-zinc-500">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
