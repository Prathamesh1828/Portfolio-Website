"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 20 random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base Background Fill */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Top Left Purple Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-glow-purple blur-[100px] animate-pulse-glow" />

      {/* Bottom Right Cyan Glow */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-glow-cyan blur-[100px] animate-pulse-glow" style={{ animationDelay: "-4s" }} />

      {/* Particles Layer */}
      <div className="absolute inset-0 px-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
    </div>
  );
}
