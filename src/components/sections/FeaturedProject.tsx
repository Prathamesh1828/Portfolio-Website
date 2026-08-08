"use client";

import { useState, useRef, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/data/projects";
import { ExternalLink, Play, Pause, X } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function FeaturedProject() {
  const featured = projects[0];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!featured) return null;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVideoMode(false);
    setIsPlaying(false);
    setProgress(0);
    setPlaybackSpeed(1);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 0;
      setCurrentTime(current);
      if (dur > 0) {
        setProgress((current / dur) * 100);
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
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
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Section id="featured-project" delay={0.2}>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Featured Project</h2>
        
        <GlassCard className="group flex flex-col md:flex-row gap-8 overflow-hidden p-0 border-white/5">
          {/* Default Project Media (Left Side) */}
          <div 
            className="md:w-1/2 relative min-h-[300px] overflow-hidden bg-zinc-900 border-r border-white/10 flex-shrink-0 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {featured.imagePath ? (
              <>
                <Image 
                  src={featured.imagePath}
                  alt={featured.title}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/20">
                  <div className="w-[72px] h-[72px] rounded-full border-4 border-white/80 bg-transparent flex items-center justify-center text-white/90 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] group-hover:border-white group-hover:text-white backdrop-blur-sm">
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </div>
                </div>
              </>
            ) : (
              // Fallback
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-50 p-6 text-center">
                  <span className="text-3xl md:text-4xl font-black tracking-widest uppercase text-white/20 select-none transform -rotate-12 break-words">
                    {featured.title}
                  </span>
                </div>
              </>
            )}
          </div>
          
          <div className="md:w-1/2 p-8 flex flex-col justify-center gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {featured.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {featured.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              {featured.githubLink && (
                <a 
                  href={featured.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  Code
                </a>
              )}
              {featured.githubLink && featured.liveLink && (
                <div className="w-[1px] h-4 bg-white/20 mx-1" />
              )}
              {featured.liveLink && (
                <a 
                  href={featured.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Interactive Media Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
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
                    {/* Full uncropped screenshot */}
                    {featured.imagePath && (
                      <Image 
                        src={featured.imagePath}
                        alt={featured.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    )}
                    {featured.videoPath && (
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
                  /* Video Player */
                  <video 
                    ref={videoRef}
                    src={featured.videoPath}
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-contain"
                    controls={false}
                  />
                )}
              </div>

              {/* Custom Video Controls */}
              {isVideoMode && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 transition-opacity duration-300">
                  {/* Progress Bar Container */}
                  <div className="flex items-center gap-3 px-2 text-xs font-medium text-white/70">
                    <span>{formatTime(currentTime)}</span>
                    <div className="relative flex-grow h-2 group cursor-pointer flex items-center">
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {/* Track background */}
                      <div className="absolute w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        {/* Track progress */}
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      {/* Thumb indicator */}
                      <div 
                        className="absolute h-3 w-3 bg-white rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)] transition-transform scale-0 group-hover:scale-100 -ml-1.5"
                        style={{ left: `${progress}%` }}
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
    </Section>
  );
}
