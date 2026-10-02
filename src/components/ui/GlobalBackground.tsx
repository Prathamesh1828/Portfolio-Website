"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SiGithub, SiLeetcode } from "react-icons/si";

export function GlobalBackground() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Track active sections for targeted background elements
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } // Trigger when a section passes the middle of the viewport
    );

    const sections = [
      "home", 
      "about", 
      "experience", 
      "what-i-build", 
      "featured-project", 
      "projects", 
      "skills", 
      "github", 
      "leetcode", 
      "contact"
    ];
    const observed = new Set<string>();

    const interval = setInterval(() => {
      sections.forEach((id) => {
        if (!observed.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            observer.observe(el);
            observed.add(id);
          }
        }
      });
      if (observed.size === sections.length) {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Subtle ambient parallax moving up as we scroll down
  const ambientY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  // Rotate the gradient slightly for dynamic shift
  const ambientRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020617]">
      {/* Base ambient gradient (Purple -> Blue -> Cyan) */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : ambientY,
          rotate: prefersReducedMotion ? 0 : ambientRotate,
        }}
        className="absolute inset-0 opacity-20 flex items-center justify-center transition-opacity duration-1000"
      >
        <div className="w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/40 via-blue-600/20 to-cyan-500/30 blur-[150px] rounded-full mix-blend-screen" />
      </motion.div>



      {/* Developer Activity: GitHub Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeSection === "github" ? (prefersReducedMotion ? 0.10 : 0.12) : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-end pr-[10vw]"
      >
        <SiGithub className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] text-white/50 blur-[2px]" />
      </motion.div>

      {/* Developer Activity: LeetCode Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeSection === "leetcode" ? (prefersReducedMotion ? 0.10 : 0.12) : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-end pr-[10vw]"
      >
        <SiLeetcode className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] text-white/50 blur-[2px]" />
      </motion.div>
    </div>
  );
}
