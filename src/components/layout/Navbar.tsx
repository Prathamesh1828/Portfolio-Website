"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section tracking via IntersectionObserver
  useEffect(() => {
    const sections = links.map((link) => link.href.substring(1));
    const observed = new Set<string>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Process intersecting entries
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Trigger when a section passes the middle of the viewport
        rootMargin: "-40% 0px -40% 0px"
      }
    );

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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-6 inset-x-0 z-50 flex justify-center px-6 pointer-events-none"
    >
      <nav
        className={cn(
          "flex items-center gap-2 md:gap-6 rounded-full border border-white/10 px-4 md:px-8 py-3 transition-all duration-500 pointer-events-auto",
          "bg-[#111111]/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]",
          scrolled ? "bg-[#111111]/60 border-white/20 scale-95" : "scale-100"
        )}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "relative px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 rounded-full",
              activeSection === link.href.substring(1)
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {activeSection === link.href.substring(1) && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {link.name}
          </a>
        ))}

        <div className="w-[1px] h-4 bg-white/10 mx-1 md:mx-2 hidden md:block" />

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 hover:border-white/20 text-xs md:text-sm font-semibold text-white transition-all duration-300"
        >
          Resume
        </a>
      </nav>
    </motion.header>
  );
}
