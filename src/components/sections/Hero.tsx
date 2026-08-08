"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { FiArrowRight, FiMail, FiChevronDown, FiDownload } from "react-icons/fi";
import { NeuralOrb } from "@/components/ui/NeuralOrb";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { cn } from "@/lib/utils";

const words = ["AI-Powered Systems"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = (e: React.MouseEvent) => {
    setIsDownloading(true);
    setTimeout(() => {
        setIsDownloading(false);
    }, 2000);
  };
  
  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform values for text tilt
  const textX = useTransform(springX, [-500, 500], [-10, 10]);
  const textY = useTransform(springY, [-500, 500], [-10, 10]);

  useEffect(() => {
    // Keep static text
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  } as any;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32"
      id="home"
    >
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ x: textX, y: textY }}
            className="flex flex-col text-left order-2 lg:order-1 max-w-[600px] w-full"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-zinc-400 w-fit"
            >
               <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
               <span>Open to AI / Backend Opportunities</span> 
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 mb-10 group/text relative">
              {/* Spotlight Layer */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover/text:opacity-100 transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]: any) => `radial-gradient(350px circle at ${x + 300}px ${y + 100}px, rgba(255,255,255,0.15), transparent 80%)`
                    )
                }}
              />
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight relative">
                <span className="relative z-10 text-zinc-500 group-hover/text:text-white transition-colors duration-700">
                    Building <br />
                </span>
                <div className="relative h-[1.2em] overflow-visible mt-2">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="absolute left-0 top-0 text-gradient whitespace-nowrap"
                    >
                      {words[index]}
                    </motion.span>
                </div>
              </h1>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed font-light transition-colors duration-500 group-hover/text:text-zinc-200"
            >
              Hi, I&apos;m <span className="text-white font-medium">Prathamesh Jaiswar</span>, 
              an AI Engineer focused on Agentic AI, Generative AI, backend engineering, and intelligent automation. I build production-ready AI systems that connect LLMs, APIs, data, and real-world workflows.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap lg:flex-nowrap items-center gap-3 lg:gap-4"
            >
              <motion.a 
                href="#projects"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)",
                  backgroundColor: "#FFFFFF"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold transition-all duration-300 min-w-[140px]"
              >
                Explore Projects
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a 
                href="#contact"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-transparent text-white font-bold transition-all duration-300 min-w-[140px]"
              >
                <FiMail className="w-5 h-5" />
                Let&apos;s Connect
              </motion.a>

              <motion.a 
                href="/resume.pdf"
                download
                onClick={handleDownload}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-transparent text-white font-bold transition-all duration-300 min-w-[140px]"
              >
                <div className="relative w-5 h-5 flex items-center justify-center overflow-visible">
                    <motion.div
                        animate={isDownloading ? { y: [0, 15, -15, 0] } : {}}
                        whileHover={{ y: 3 }}
                        transition={isDownloading ? { duration: 0.6, repeat: Infinity } : { duration: 0.2 }}
                    >
                        <FiDownload className="w-5 h-5" />
                    </motion.div>
                </div>
                <span>{isDownloading ? "Downloading..." : "Resume"}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Visual */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="relative flex justify-center lg:justify-end order-1 lg:order-2 w-full"
          >
            <div className="w-full max-w-[500px] xl:max-w-[600px] flex justify-center items-center">
              <NeuralOrb />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 group-hover:text-cyan-400 transition-colors duration-300">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors duration-300" />
        </motion.div>
      </motion.div>

      {/* Footer Info Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 w-full max-w-7xl px-6 flex justify-between items-center text-[10px] uppercase tracking-[0.4em] text-zinc-600 pointer-events-none"
      >
        <span className="hidden md:block">Est. 2024</span>
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
        <span className="hidden md:block">Mumbai, India</span>
      </motion.div>
    </section>
  );
}
