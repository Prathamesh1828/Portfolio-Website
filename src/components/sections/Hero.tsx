import { Section } from "@/components/ui/Section";
import { FiArrowRight, FiGithub, FiMail } from "react-icons/fi";

export function Hero() {
  return (
    <Section id="home" className="min-h-[90vh] justify-center items-start">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
          Hi, I am <span className="text-zinc-500">John Doe</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-zinc-400 font-medium">
          Full Stack Developer & AI Builder
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
          I specialize in building high-performance web applications and integrating AI technologies 
          to solve complex problems. Crafting elegant digital experiences from end to end.
        </p>
        
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a 
            href="#projects" 
            className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            View Work
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            <FiMail className="w-4 h-4" />
            Contact Me
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="p-3 border border-white/20 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
          >
            <FiGithub className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
