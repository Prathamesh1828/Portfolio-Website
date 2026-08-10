"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#featured-project" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = links.map((link) => link.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-6 md:top-8 inset-x-0 z-50 flex justify-end md:justify-center px-6 md:px-8 pointer-events-none"
      >
        <nav
          className={cn(
            "flex items-center justify-center w-auto gap-2 md:gap-6 rounded-full border border-white/10 p-3 md:px-8 md:py-3 transition-all duration-500 pointer-events-auto",
            "bg-[#111111]/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]",
            scrolled ? "bg-[#111111]/60 border-white/20 scale-95 md:scale-95" : "scale-100"
          )}
        >

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  "relative px-3 py-1 text-sm font-medium transition-all duration-300 rounded-full",
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

            <div className="w-[1px] h-4 bg-white/10 mx-2 hidden md:block" />

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 hover:border-white/20 text-sm font-semibold text-white transition-all duration-300"
            >
              Resume
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-2xl flex flex-col pt-6 px-6 pb-12"
          >
            <div className="flex justify-between items-center w-full mb-12">
              <div className="font-bold text-white text-xl tracking-widest ml-2">PJ.</div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 items-center justify-center flex-1 w-full">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className={cn(
                    "text-3xl font-bold tracking-tight transition-colors",
                    activeSection === link.href.substring(1)
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.05 }}
                className="mt-6 px-8 py-4 rounded-full bg-white text-black text-xl font-bold transition-all duration-300"
              >
                View Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
