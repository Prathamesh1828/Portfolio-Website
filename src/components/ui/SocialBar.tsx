"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { cn } from "@/lib/utils";

const socials = [
  {
    name: "GitHub",
    icon: FiGithub,
    href: "https://github.com/Prathamesh1828",
    aria: "Visit my GitHub profile",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/prathamesh-jaiswar/",
    aria: "Connect with me on LinkedIn",
  },
  {
    name: "Instagram",
    icon: FiInstagram,
    href: "https://www.instagram.com/__prattham/",
    aria: "Follow me on Instagram",
  },
];

export function SocialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed z-40 flex md:flex-col items-center gap-6 
                 left-1/2 -translate-x-1/2 bottom-4 md:bottom-auto 
                 md:left-8 md:top-1/2 md:-translate-y-1/2 
                 bg-white/10 backdrop-blur-md md:bg-transparent md:backdrop-blur-none
                 px-6 py-3 md:px-0 md:py-0 rounded-full md:rounded-none
                 border border-white/10 md:border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] md:shadow-none"
    >
      {/* Top line (desktop only) */}
      <div className="hidden md:block w-px h-12 bg-gradient-to-t from-white/20 to-transparent" />

      {socials.map((social, i) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.aria}
          whileHover={{ 
            scale: 1.2, 
            color: "#ffffff",
          }}
          className="group relative flex items-center justify-center text-gray-500 transition-all duration-300"
        >
          <social.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          
          {/* Tooltip */}
          <span className="absolute left-full ml-4 px-2 py-1 bg-white/10 backdrop-blur-md 
                         text-white text-[10px] uppercase font-bold tracking-widest rounded opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                         hidden md:block border border-white/10 whitespace-nowrap">
            {social.name}
          </span>
        </motion.a>
      ))}

      {/* Bottom line (desktop only) */}
      <div className="hidden md:block w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
    </motion.div>
  );
}
