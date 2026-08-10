"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { SiOpenai, SiClaude, SiGooglegemini, SiLangchain, SiLanggraph, SiFastapi, SiPostgresql, SiSupabase, SiRedis, SiN8N } from "react-icons/si";

const techLogos = [
  { id: 'openai', icon: SiOpenai, label: 'OpenAI' },
  { id: 'claude', icon: SiClaude, label: 'Claude' },
  { id: 'gemini', icon: SiGooglegemini, label: 'Gemini' },
  { id: 'langchain', icon: SiLangchain, label: 'LangChain' },
  { id: 'langgraph', icon: SiLanggraph, label: 'LangGraph' },
  { id: 'fastapi', icon: SiFastapi, label: 'FastAPI' },
  { id: 'postgresql', icon: SiPostgresql, label: 'PostgreSQL' },
  { id: 'supabase', icon: SiSupabase, label: 'Supabase' },
  { id: 'redis', icon: SiRedis, label: 'Redis' },
  { id: 'n8n', icon: SiN8N, label: 'n8n' },
];

function OrbContent() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  const orbitalRef = useRef<THREE.Group>(null);

  // Procedural node generation
  const nodeCount = 80;
  const nodes = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const nodeArray: THREE.Vector3[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        
        const radius = 2.5;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        nodeArray.push(new THREE.Vector3(x, y, z));
    }
    return { positions, nodeArray };
  }, []);

  // Neural network connections based on distance threshold
  const connections = useMemo(() => {
    const linePairs: THREE.Vector3[][] = [];
    const threshold = 1.1;
    
    for (let i = 0; i < nodes.nodeArray.length; i++) {
        for (let j = i + 1; j < nodes.nodeArray.length; j++) {
            const distance = nodes.nodeArray[i].distanceTo(nodes.nodeArray[j]);
            if (distance < threshold) {
                linePairs.push([nodes.nodeArray[i], nodes.nodeArray[j]]);
            }
        }
    }
    return linePairs;
  }, [nodes]);

  // Tech Logo nodes distribution
  const techNodes = useMemo(() => {
    // Select evenly distributed indices on the sphere for the 10 logos
    const indices = [5, 17, 29, 41, 55, 67, 79, 91, 103, 115];
    return techLogos.map((tech, i) => ({
      ...tech,
      position: nodes.nodeArray[indices[i % nodes.nodeArray.length]]
    }));
  }, [nodes]);

  // Handle animations and interactions
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!orbitalRef.current) return;
    
    // Rotation
    orbitalRef.current.rotation.y += delta * 0.2;
    
    // Floating oscillation
    orbitalRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    
    // Mouse-parallax tilt
    const targetX = (state.mouse.x * Math.PI) / 10;
    const targetY = (state.mouse.y * Math.PI) / 10;
    orbitalRef.current.rotation.x += (targetY - orbitalRef.current.rotation.x) * 0.05;
    orbitalRef.current.rotation.z += (targetX - orbitalRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={orbitalRef}>
      {/* Glow Orbs (Neural Nodes) */}
      <Points ref={pointsRef} positions={nodes.positions} stride={3}>
        <PointMaterial
          transparent
          color="#7C3AED"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Tech Logo Anchor Nodes */}
      {techNodes.map((tech) => (
        <group key={tech.id} position={tech.position}>
          <Html center transform sprite distanceFactor={12} zIndexRange={[100, 0]}>
            <div className="group relative flex items-center justify-center w-7 h-7 rounded-full bg-black/40 border border-purple-500/30 backdrop-blur-md transition-all duration-500 hover:scale-125 hover:bg-black/70 hover:border-cyan-400/60 cursor-default shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              <tech.icon className="w-3.5 h-3.5 text-white/70 group-hover:text-cyan-300 transition-colors duration-500" />
              {/* Tooltip */}
              <div className="absolute -top-10 px-2.5 py-1.5 bg-black/90 border border-white/10 rounded-md text-[11px] text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-medium tracking-wide shadow-xl">
                {tech.label}
              </div>
            </div>
          </Html>
        </group>
      ))}

      {/* Connection Lines (Neural Network) */}
      <group ref={linesRef}>
        {connections.map((points, idx) => (
          <Line
            key={idx}
            points={points}
            color="#06B6D4"
            lineWidth={0.5}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        ))}
      </group>
    </group>
  );
}

export function NeuralOrb() {
  return (
    <div className="relative w-full h-[320px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
        {/* Soft radial glow behind the orb */}
        <div className="absolute inset-0 bg-orb-glow pointer-events-none" />
        
        <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
            <OrbContent />
        </Canvas>
    </div>
  );
}
