import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center z-10 relative">
      <div className="space-y-8 relative z-10">
        <div className="relative">
          <h1 className="text-[clamp(6rem,15vw,10rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] leading-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-[60px] -z-10 rounded-full mix-blend-screen" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
            Lost in the Neural Network
          </h2>
          <p className="text-zinc-400 max-w-[450px] mx-auto text-sm md:text-base leading-relaxed">
            The endpoint you requested seems to be missing from the architecture. Let's route you back to the main node.
          </p>
        </div>
        
        <div className="pt-4">
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:bg-zinc-100"
          >
            <FiHome className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Initialize Home
          </Link>
        </div>
      </div>
      
      {/* Deep Background glow specific to 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-20 pointer-events-none" />
    </div>
  );
}
