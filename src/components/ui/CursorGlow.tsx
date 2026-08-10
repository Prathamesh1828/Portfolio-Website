"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorGlow() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Immediate spring for the dot
  const springX = useSpring(mouseX, { stiffness: 800, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 30 });

  // Slower spring for the trailing ring
  const ringSpringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringSpringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Very slow spring for the ambient glow
  const glowSpringX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const glowSpringY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    
    // Hide default cursor globally on mount
    document.body.style.cursor = 'none';
    
    // Also apply to all interactive elements to prevent default pointer from showing
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      @media (max-width: 768px) {
        * { cursor: auto !important; }
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return false;
      return (
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        target.classList?.contains('interactive')
      );
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (checkHover(e)) setIsHovering(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (checkHover(e)) setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = 'auto';
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Background Ambient Glow */}
      <motion.div
        style={{
          x: glowSpringX,
          y: glowSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-40 hidden md:block"
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-purple-500/15 via-cyan-500/5 to-transparent blur-[80px]" />
      </motion.div>

      {/* Center Dot */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-difference"
      >
        <motion.div 
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 bg-white rounded-full"
        />
      </motion.div>

      {/* Trailing Interactive Ring */}
      <motion.div
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-difference"
      >
        <motion.div 
          animate={{
            width: isHovering ? 40 : 20,
            height: isHovering ? 40 : 20,
            backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
            borderWidth: isHovering ? 0 : 1.5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="border-white rounded-full"
        />
      </motion.div>
    </>
  );
}
