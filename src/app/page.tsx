
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Cpu, Globe2, Sparkles, TerminalSquare, Rocket, Download, Terminal, Orbit, LayoutGrid, FileCode, Zap, Boxes, Server, Layers, Binary, Database, Flame, Network, Bot, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TestimonialsSection from "@/components/testimonials";
import { ACHIEVEMENTS, PROJECTS, TECHNICAL_SKILLS } from "@/lib/data";
import TechSphere3D from "@/components/tech-sphere-3d";

const TECH_THEMES: Record<string, { icon: any; color: string; border: string; bg: string; shadow: string }> = {
  "Python": { icon: FileCode, color: "text-blue-400 group-hover:text-blue-300", border: "hover:border-blue-500/50", bg: "group-hover:bg-blue-500/20", shadow: "rgba(59,130,246,0.4)" },
  "JavaScript": { icon: Zap, color: "text-yellow-400 group-hover:text-yellow-300", border: "hover:border-yellow-500/50", bg: "group-hover:bg-yellow-500/20", shadow: "rgba(234,179,8,0.4)" },
  "TypeScript": { icon: Code2, color: "text-cyan-400 group-hover:text-cyan-300", border: "hover:border-cyan-500/50", bg: "group-hover:bg-cyan-500/20", shadow: "rgba(6,182,212,0.4)" },
  "Java": { icon: Boxes, color: "text-orange-400 group-hover:text-orange-300", border: "hover:border-orange-500/50", bg: "group-hover:bg-orange-500/20", shadow: "rgba(249,115,22,0.4)" },
  "C++": { icon: Cpu, color: "text-purple-400 group-hover:text-purple-300", border: "hover:border-purple-500/50", bg: "group-hover:bg-purple-500/20", shadow: "rgba(168,85,247,0.4)" },
  "HTML": { icon: LayoutGrid, color: "text-red-400 group-hover:text-red-300", border: "hover:border-red-500/50", bg: "group-hover:bg-red-500/20", shadow: "rgba(239,68,68,0.4)" },
  "CSS": { icon: Sparkles, color: "text-emerald-400 group-hover:text-emerald-300", border: "hover:border-emerald-500/50", bg: "group-hover:bg-emerald-500/20", shadow: "rgba(16,185,129,0.4)" },
  "React": { icon: Orbit, color: "text-cyan-300 group-hover:text-cyan-200", border: "hover:border-cyan-400/50", bg: "group-hover:bg-cyan-400/20", shadow: "rgba(34,211,238,0.4)" },
  "Next.js": { icon: TerminalSquare, color: "text-violet-400 group-hover:text-violet-300", border: "hover:border-violet-500/50", bg: "group-hover:bg-violet-500/20", shadow: "rgba(139,92,246,0.4)" },
  "Node.js": { icon: Server, color: "text-green-400 group-hover:text-green-300", border: "hover:border-green-500/50", bg: "group-hover:bg-green-500/20", shadow: "rgba(74,222,128,0.4)" },
  "Express.js": { icon: Layers, color: "text-slate-300 group-hover:text-white", border: "hover:border-slate-400/50", bg: "group-hover:bg-slate-400/20", shadow: "rgba(148,163,184,0.4)" },
  "Scikit-learn": { icon: Binary, color: "text-rose-400 group-hover:text-rose-300", border: "hover:border-rose-500/50", bg: "group-hover:bg-rose-500/20", shadow: "rgba(244,63,94,0.4)" },
  "NumPy": { icon: Hash, color: "text-blue-300 group-hover:text-blue-200", border: "hover:border-blue-400/50", bg: "group-hover:bg-blue-400/20", shadow: "rgba(147,197,253,0.4)" },
  "MongoDB": { icon: Database, color: "text-emerald-500 group-hover:text-emerald-400", border: "hover:border-emerald-600/50", bg: "group-hover:bg-emerald-600/20", shadow: "rgba(16,185,129,0.4)" },
  "SQL / PostgreSQL": { icon: Database, color: "text-blue-500 group-hover:text-blue-400", border: "hover:border-blue-600/50", bg: "group-hover:bg-blue-600/20", shadow: "rgba(59,130,246,0.4)" },
  "PyTorch": { icon: Flame, color: "text-orange-500 group-hover:text-orange-400", border: "hover:border-orange-600/50", bg: "group-hover:bg-orange-600/20", shadow: "rgba(249,115,22,0.4)" },
  "TensorFlow": { icon: Network, color: "text-amber-500 group-hover:text-amber-400", border: "hover:border-amber-600/50", bg: "group-hover:bg-amber-600/20", shadow: "rgba(245,158,11,0.4)" },
  "LLMs & GenAI": { icon: Bot, color: "text-pink-500 group-hover:text-pink-400", border: "hover:border-pink-600/50", bg: "group-hover:bg-pink-600/20", shadow: "rgba(236,72,153,0.4)" },
};

/* ── 3D Typewriter Hero ── */
function HeroSection3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 perspective-2000"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -50, z: 100 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          style={{ translateZ: 100 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-bold shadow-[0_0_20px_rgba(0,229,255,0.3)] backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span className="tracking-widest uppercase">Shreyan Panda</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ translateZ: 150 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-tight"
        >
          Building the <br className="hidden md:block" />
          <span className="gradient-text-cyan-purple">Next Web</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ translateZ: 80 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          I am a Full Stack Developer & AI/ML Enthusiast. 
          I craft beautiful, performant, and intelligent digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ translateZ: 120 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link href="/projects">
            <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all duration-300 border-none scale-100 hover:scale-105">
              View Projects <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="h-14 px-8 rounded-full border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-md transition-all duration-300 scale-100 hover:scale-105">
              Contact Me
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 3D Floating Elements around the Hero */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 md:left-32 opacity-20 hidden md:block"
      >
        <Code2 className="w-24 h-24 text-cyan-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 md:right-32 opacity-20 hidden md:block"
      >
        <Cpu className="w-28 h-28 text-purple-500" />
      </motion.div>
    </section>
  );
}

/* ── 3D Tech Stack Card ── */
function TechCard3D({ tech, index }: { tech: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);

  const theme = TECH_THEMES[tech] || {
    icon: Terminal,
    color: "text-cyan-400 group-hover:text-cyan-300",
    border: "hover:border-cyan-500/50",
    bg: "group-hover:bg-cyan-500/20",
    shadow: "rgba(0,229,255,0.4)",
  };
  const IconComponent = theme.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovered ? `0 25px 50px -12px ${theme.shadow}` : "0 10px 20px -10px rgba(0,0,0,0.5)",
        }}
        className={`relative group p-6 rounded-2xl glass-card border border-white/10 ${theme.border} bg-[hsl(240,40%,6%)]/80 flex flex-col items-center justify-center gap-4 transition-all duration-300 h-full`}
      >
        <motion.div
          style={{ translateZ: hovered ? 50 : 0 }}
          className={`p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 shadow-inner ${theme.bg} transition-all duration-300`}
        >
          <IconComponent className={`h-8 w-8 ${theme.color} transition-all duration-300 ${hovered ? "scale-110" : ""}`} />
        </motion.div>
        <motion.span
          style={{ translateZ: hovered ? 30 : 0 }}
          className="font-bold text-white group-hover:text-white transition-colors text-center tracking-wide text-sm md:text-base"
        >
          {tech}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"galaxy" | "grid">("galaxy");
  
  // 18 Core Skills covering Full Stack & AI/ML
  const allSkills = [
    "Python", "JavaScript", "TypeScript", "Java", "C++", "HTML",
    "CSS", "React", "Next.js", "Node.js", "Express.js", "Scikit-learn",
    "NumPy", "MongoDB", "SQL / PostgreSQL", "PyTorch", "TensorFlow", "LLMs & GenAI"
  ];

  return (
    <div className="space-y-32 pb-20 overflow-hidden">
      <HeroSection3D />

      {/* ── 3D STATS SECTION ── */}
      <section className="container mx-auto px-4 perspective-2000">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects Built", value: PROJECTS.length + "+", icon: Code2, color: "text-cyan-400" },
            { label: "Awards & Honors", value: ACHIEVEMENTS.length, icon: Sparkles, color: "text-yellow-400" },
            { label: "Tech Stack", value: allSkills.length + "+", icon: Cpu, color: "text-purple-400" },
            { label: "Experience", value: "3+ Yrs", icon: Globe2, color: "text-green-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -10, z: 30 }}
              style={{ transformStyle: "preserve-3d" }}
              className="p-6 md:p-8 rounded-3xl glass-card border border-white/10 text-center flex flex-col items-center gap-4 bg-gradient-to-br from-white/5 to-transparent hover:border-white/20 transition-all shadow-xl"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} drop-shadow-md`} />
              <div className="space-y-1">
                <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">{stat.value}</h3>
                <p className="text-white/50 text-sm md:text-base font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3D TECH STACK GRID ── */}
      <section className="container mx-auto px-4 perspective-2000">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-4 shadow-[0_0_15px_rgba(176,38,255,0.2)]">
            <TerminalSquare className="h-3.5 w-3.5" />
            <span className="uppercase tracking-widest">Technologies</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black gradient-text-cyan-purple drop-shadow-xl mb-4">
            My Tech Arsenal
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Explore my tech stack! Toggle between a fully interactive 3D particle galaxy or a standard card grid.
          </p>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 relative z-20">
            <button
              onClick={() => setViewMode("galaxy")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                viewMode === "galaxy"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-transparent text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:scale-105"
              }`}
            >
              <Orbit className="h-4 w-4" /> 3D Galaxy View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-transparent text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:scale-105"
              }`}
            >
              <LayoutGrid className="h-4 w-4" /> 3D Grid View
            </button>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {viewMode === "galaxy" ? (
            <motion.div
              key="galaxy"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <TechSphere3D />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {allSkills.map((tech, i) => (
                <TechCard3D key={tech} tech={tech} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <TestimonialsSection />
    </div>
  );
}
