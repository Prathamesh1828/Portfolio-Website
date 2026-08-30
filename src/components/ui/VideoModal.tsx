"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Play } from "lucide-react";
import Image from "next/image";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoPath?: string;
  imagePath?: string;
  title: string;
}

export function VideoModal({ isOpen, onClose, videoPath, imagePath, title }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mount portal target
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoMode(false);
    onClose();
  };

  // Prevent body scroll and reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVideoMode(false);
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) videoRef.current.pause();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Keyboard (ESC to close) and Fullscreen changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const handleFullscreenChange = () => {
      // If we exit fullscreen mode, close the modal completely
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-6xl aspect-video flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-grow relative bg-[#09090b] flex items-center justify-center w-full h-full">
                
                {/* ALWAYS MOUNTED VIDEO (Hidden behind thumbnail if not playing) */}
                {videoPath && (
                  <div className={`absolute inset-0 flex items-center justify-center bg-black ${!isVideoMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <video 
                      ref={videoRef}
                      src={videoPath}
                      controls
                      playsInline
                      className="w-full h-full object-contain focus:outline-none"
                    />
                  </div>
                )}

                {/* THUMBNAIL AND PLAY BUTTON OVERLAY */}
                {!isVideoMode && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    {imagePath && (
                      <Image 
                        src={imagePath}
                        alt={title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    )}
                    {videoPath && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsVideoMode(true);
                            if (videoRef.current) {
                              videoRef.current.play().catch(() => {});
                              // Request Fullscreen on the video element itself
                              if (videoRef.current.requestFullscreen) {
                                videoRef.current.requestFullscreen().catch(() => {});
                              } else if ((videoRef.current as any).webkitRequestFullscreen) {
                                (videoRef.current as any).webkitRequestFullscreen();
                              }
                            }
                          }}
                          className="w-[72px] h-[72px] rounded-full border-4 border-white/80 bg-black/50 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform backdrop-blur-sm"
                        >
                          <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(modalContent, document.body);
}
