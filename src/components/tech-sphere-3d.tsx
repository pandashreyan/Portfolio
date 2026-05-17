"use client";

import dynamic from "next/dynamic";
import { Loader2, Cpu } from "lucide-react";

// Dynamically import the 3D Canvas component to prevent SSR/Hydration issues on compile
const TechSphereCanvas = dynamic(
  () => import("./tech-sphere-canvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[550px] flex flex-col items-center justify-center gap-4 glass-card border border-white/5 rounded-3xl bg-[hsl(240,40%,6%)]/40 backdrop-blur-md">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-14 w-14 text-cyan-400 animate-spin" />
          <Cpu className="absolute h-6 w-6 text-purple-400 animate-pulse" />
        </div>
        <p className="text-white/40 text-sm font-bold uppercase tracking-widest animate-pulse">
          Initializing 3D Space Planetarium...
        </p>
      </div>
    ),
  }
);

export default function TechSphere3D() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      <TechSphereCanvas />
    </div>
  );
}
