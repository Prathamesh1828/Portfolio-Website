export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Contact } from "@/components/sections/Contact";

import GithubActivity from "@/components/sections/GithubActivity";
import LeetcodeActivity from "@/components/sections/LeetcodeActivity";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatIBuild />
      <Experience />
      <FeaturedProject />
      <CurrentlyBuilding />
      <Projects />
      <Skills />
      <Suspense fallback={
        <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 min-h-[300px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-white/60 animate-spin" />
        </div>
      }>
        <GithubActivity />
      </Suspense>
      <Suspense fallback={
        <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 min-h-[300px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-white/60 animate-spin" />
        </div>
      }>
        <LeetcodeActivity />
      </Suspense>
      <Contact />
    </>
  );
}
