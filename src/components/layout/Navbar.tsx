"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Super simple scroll spy
      const sections = links.map((link) => link.href.substring(1));
      
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current || "home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex justify-center py-4 transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-6 rounded-full border border-white/10 px-8 py-3 transition-all duration-300",
          scrolled ? "bg-black/50 backdrop-blur-md shadow-lg" : "bg-transparent"
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
              "text-sm font-medium transition-colors hover:text-white",
              activeSection === link.href.substring(1)
                ? "text-white"
                : "text-zinc-400"
            )}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
