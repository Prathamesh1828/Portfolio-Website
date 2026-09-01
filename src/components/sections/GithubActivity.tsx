import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

async function getContributions() {
  const GITHUB_USERNAME = "Prathamesh1828";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return null;
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: "no-store" // Opt out of caching to ensure data is always fresh
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data?.user?.contributionsCollection?.contributionCalendar;
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return null;
  }
}

export default async function GithubActivity() {
  const calendar = await getContributions();

  const weeks = calendar?.weeks || [];
  const totalContributions = calendar?.totalContributions || 0;

  // Find max contributions to scale the colors dynamically
  let maxCount = 0;
  if (weeks.length > 0) {
    weeks.forEach((week: Week) => {
      week.contributionDays.forEach(day => {
        if (day.contributionCount > maxCount) {
          maxCount = day.contributionCount;
        }
      });
    });
  }

  const monthLabels: { label: string; colIndex: number }[] = [];
  let currentMonth = -1;
  weeks.forEach((week: Week, i: number) => {
    if (week.contributionDays.length > 0) {
      const date = new Date(week.contributionDays[0].date);
      const month = date.getMonth();
      if (month !== currentMonth) {
        monthLabels.push({
          label: date.toLocaleString('en-US', { month: 'short' }),
          colIndex: i
        });
        currentMonth = month;
      }
    }
  });

  const getColor = (count: number) => {
    if (count === 0) return "bg-white/5";
    if (maxCount === 0) return "bg-white/5";
    
    // Scale intensity (1-4) based on max contributions
    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-green-900/40";
    if (ratio <= 0.5) return "bg-green-700/60";
    if (ratio <= 0.75) return "bg-green-500/80";
    return "bg-green-400";
  };

  return (
    <Section id="github" delay={0.4}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            GitHub Contributions
          </h2>
        </div>
        
        <GlassCard className="p-5 md:p-8 overflow-x-auto overflow-y-hidden touch-pan-x relative min-h-[200px] w-full max-w-full">
          {!calendar ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
               <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
               <span className="text-sm text-zinc-500">Unable to load contribution data. Ensure GITHUB_TOKEN is set.</span>
            </div>
          ) : (
            <div className="min-w-[700px] flex flex-col gap-4">
              <div className="text-sm text-zinc-400">
                <span className="font-semibold text-zinc-200">{totalContributions.toLocaleString()}</span> contributions in the last year
              </div>
              
              <div className="p-6 rounded-2xl bg-black/20 border border-white/5 shadow-inner backdrop-blur-sm relative group/container">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover/container:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="flex relative z-10">
                  <div className="flex flex-col gap-1 pr-3 pt-[1.5rem] text-[10px] text-zinc-500 font-medium">
                    <span className="h-3 flex items-center justify-end"></span>
                    <span className="h-3 flex items-center justify-end">Mon</span>
                    <span className="h-3 flex items-center justify-end"></span>
                    <span className="h-3 flex items-center justify-end">Wed</span>
                    <span className="h-3 flex items-center justify-end"></span>
                    <span className="h-3 flex items-center justify-end">Fri</span>
                    <span className="h-3 flex items-center justify-end"></span>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <div className="relative h-4 text-[10px] text-zinc-500 font-medium w-full pointer-events-none">
                      {monthLabels.map((m, idx) => (
                        <span 
                          key={idx} 
                          className="absolute top-0 transition-colors duration-300 group-hover/container:text-zinc-400" 
                          style={{ left: `calc(${m.colIndex} * 1rem)` }}
                        >
                          {m.label}
                        </span>
                      ))}
                    </div>
  
                    <div className="flex gap-1">
                      {weeks.map((week: Week, i: number) => (
                        <div key={i} className="flex flex-col gap-1">
                          {week.contributionDays.map((day: ContributionDay, j: number) => (
                            <div 
                              key={`${i}-${j}`} 
                              className={`w-3 h-3 rounded-sm ${getColor(day.contributionCount)} border border-white/5 group relative transition-all duration-300 hover:scale-150 hover:z-10 hover:shadow-[0_0_12px_rgba(74,222,128,0.6)] cursor-crosshair`}
                            >
                              {/* Custom CSS Hover Tooltip */}
                              <div className={`absolute bottom-full mb-3 hidden group-hover:block px-3 py-2 bg-black/80 backdrop-blur-md text-xs text-zinc-300 rounded-lg whitespace-nowrap z-50 shadow-2xl border border-white/10 pointer-events-none animate-in fade-in zoom-in duration-200 ${
                                i > 45 ? 'right-0' : i < 5 ? 'left-0' : 'left-1/2 -translate-x-1/2'
                              }`}>
                                <span className="font-semibold text-green-400">{day.contributionCount > 0 ? day.contributionCount : "No"}</span> contributions on {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                <div className={`absolute -bottom-1 w-2 h-2 bg-black/80 border-b border-r border-white/10 rotate-45 ${
                                  i > 45 ? 'right-1' : i < 5 ? 'left-1' : 'left-1/2 -translate-x-1/2'
                                }`}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end items-center gap-2 mt-2 text-xs text-zinc-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-white/5" />
                  <div className="w-3 h-3 rounded-sm bg-green-900/40" />
                  <div className="w-3 h-3 rounded-sm bg-green-700/60" />
                  <div className="w-3 h-3 rounded-sm bg-green-500/80" />
                  <div className="w-3 h-3 rounded-sm bg-green-400" />
                </div>
                <span>More</span>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </Section>
  );
}
