import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Contact } from "@/components/sections/Contact";

// Lazy load the Github activity section representing a heavier component
const GithubActivity = dynamic(() => import("@/components/sections/GithubActivity"), {
  loading: () => (
    <div className="w-full max-w-5xl mx-auto px-6 py-24 min-h-[400px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-white/60 animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProject />
      <Projects />
      <Skills />
      <GithubActivity />
      <CurrentlyBuilding />
      <Contact />
    </>
  );
}
