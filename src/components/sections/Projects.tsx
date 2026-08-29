"use client";

import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/data/projects";
import { ExternalLink, FolderGit2, Play, Pause, X } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as any;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
} as any;

export function Projects() {
  const otherProjects = projects.slice(1);

  const [activeProject, setActiveProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  // Tracks the in-flight play() Promise so we never call pause() before it resolves
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // ------- safe play / pause helpers -------
  const safePlay = () => {
    if (!videoRef.current) return;
    const promise = videoRef.current.play();
    if (promise !== undefined) {
      playPromiseRef.current = promise;
      promise
        .then(() => { playPromiseRef.current = null; })
        .catch((err) => {
          playPromiseRef.current = null;
          if (err?.name !== 'AbortError') console.error('Video play error:', err);
        });
    }
  };

  const safePause = () => {
    if (!videoRef.current) return;
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => { videoRef.current?.pause(); })
        .catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };
  // -------------------------------------------

  // Auto-start playback when entering video mode (replaces the autoPlay attribute).
  useEffect(() => {
    if (isVideoMode && videoRef.current) {
      safePlay();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoMode]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVideoMode(false);
    setIsPlaying(false);
    setProgress(0);
    setPlaybackSpeed(1);
    setCurrentTime(0);
    setTimeout(() => setActiveProject(null), 300);
    safePause();
    const vid = videoRef.current;
    if (vid) {
      Promise.resolve(playPromiseRef.current).finally(() => {
        if (vid) vid.currentTime = 0;
      });
    }
  };

  // Read actual paused state from the element to avoid stale-closure bugs.
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      safePlay();
    } else {
      safePause();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 0;
      setCurrentTime(current);
      if (dur > 0) setProgress((current / dur) * 100);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProgress(value);
    if (videoRef.current && videoRef.current.duration) {
      const seekTime = (value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!otherProjects.length) return null;

  return (
    <>
    <Section id="projects" delay={0.2}>
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold tracking-tight">Other Noteworthy Projects</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {otherProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <GlassCard hoverEffect className="group relative flex flex-col h-full overflow-hidden border-white/5">
                {/* Background Image with Dark Overlay */}
                {project.imagePath && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${project.imagePath})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/85 via-[#020617]/70 to-[#020617]/50 group-hover:from-[#020617]/75 group-hover:via-[#020617]/60 group-hover:to-[#020617]/40 transition-colors duration-500" />
                  </>
                )}
                
                {/* Content Container (z-10 to stay above background) */}
                <div className="relative z-10 flex flex-col h-full gap-5 p-2">
                  <div className="flex justify-between items-start">
                    {project.videoPath ? (
                      <button 
                        onClick={() => {
                          setActiveProject(project);
                          setIsModalOpen(true);
                        }}
                        className="group/play flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-colors duration-300"
                        title="Play Video"
                      >
                        <Play className="w-5 h-5 ml-1" fill="currentColor" />
                      </button>
                    ) : (
                      <FolderGit2 className="w-10 h-10 text-zinc-500 group-hover:text-cyan-500/70 transition-colors duration-500" />
                    )}
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <FiGithub className="w-5 h-5" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span className="sr-only">Live Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-3">
                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-3 gap-y-2 mt-auto pt-4 border-t border-white/5 text-xs font-medium text-zinc-500">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:text-zinc-300 transition-all duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>

      {/* Interactive Media Modal — rendered OUTSIDE Section so whileInView animation cannot affect the video */}
      <AnimatePresence>
        {isModalOpen && activeProject && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="relative w-full max-w-6xl aspect-video bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-grow relative bg-[#09090b] flex items-center justify-center w-full h-full">
                {!isVideoMode ? (
                  <>
                    {activeProject.imagePath && (
                      <Image 
                        src={activeProject.imagePath}
                        alt={activeProject.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    )}
                    {activeProject.videoPath && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => {
                            setIsVideoMode(true);
                            setIsPlaying(true);
                          }}
                          className="w-[72px] h-[72px] rounded-full border-4 border-white/80 bg-transparent flex items-center justify-center text-white/90 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] hover:border-white hover:text-white backdrop-blur-sm"
                        >
                          <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <video 
                    ref={videoRef}
                    src={activeProject.videoPath}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-contain"
                    controls={false}
                  />
                )}
              </div>

              {isVideoMode && (
                <div className="absolute bottom-0 left-0 right-0 p-4 z-[30] bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 text-xs font-medium text-white/70">
                    <span>{formatTime(currentTime)}</span>
                    <div className="relative flex-grow h-5 cursor-pointer flex items-center">
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="absolute inset-x-0 h-1.5 bg-white/25 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div 
                        className="absolute z-20 w-4 h-4 bg-white rounded-full border-2 border-purple-400 shadow-[0_0_0_3px_rgba(168,85,247,0.4),0_0_12px_rgba(168,85,247,0.8)]"
                        style={{ 
                          left: `${progress}%`, 
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between px-2 pt-1">
                    <button 
                      onClick={handlePlayPause}
                      className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-full p-1 backdrop-blur-sm">
                      {[1, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                            playbackSpeed === speed 
                              ? "bg-purple-600/80 text-white" 
                              : "text-white/60 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
