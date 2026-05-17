
"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Filter, Sparkles } from "lucide-react";
import { PROJECTS, Project } from "@/lib/data";
import AIProjectGenerator from "@/components/ai-project-generator";

import iplPredictorProjectImage from "@/assets/project-5.jpg";
import textSummarizerProjectImage from "@/assets/Screenshot 2025-06-05 214151.jpg";
import nagrikAppProjectImage from "@/assets/Screenshot 2025-06-05 214634.jpg";
import reactPortfolioImage from "@/assets/Screenshot 2025-06-05 214824.jpg";
import carbonFootprintImage from "@/assets/Screenshot 2025-06-05 220607.jpg";
import ballotBoxImage from "@/assets/Screenshot 2025-06-05 222604.jpg";

/* ── Local images map ── */
const localImages: { [key: string]: StaticImageData } = {
  iplPredictorImage: iplPredictorProjectImage,
  textSummarizerImage: textSummarizerProjectImage,
  nagrikAppImage: nagrikAppProjectImage,
  reactPortfolioImage: reactPortfolioImage,
  carbonFootprintImage: carbonFootprintImage,
  ballotBoxImage: ballotBoxImage,
};

/* ── Card gradient presets ── */
const CARD_GRADIENTS = [
  "from-cyan-500/20 to-blue-600/20",
  "from-purple-500/20 to-pink-600/20",
  "from-green-500/20 to-emerald-600/20",
  "from-yellow-500/20 to-orange-600/20",
  "from-blue-500/20 to-indigo-600/20",
  "from-pink-500/20 to-rose-600/20",
];

const GLOW_COLORS = [
  "rgba(0, 229, 255, 0.4)",
  "rgba(176, 38, 255, 0.4)",
  "rgba(52, 211, 153, 0.4)",
  "rgba(251, 191, 36, 0.4)",
  "rgba(99, 102, 241, 0.4)",
  "rgba(236, 72, 153, 0.4)",
];

/* ── Filter categories ── */
const ALL_CATEGORIES = ["All", "AI/ML", "Full Stack", "Web Dev", "Mobile"];
const CATEGORY_MAP: Record<string, string[]> = {
  "AI/ML": ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "NLTK", "Transformers", "Pandas", "Streamlit", "Matplotlib"],
  "Full Stack": ["Next.js", "React", "Node.js", "Express.js", "MongoDB", "Firebase", "TypeScript"],
  "Web Dev": ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  "Mobile": ["React Native"],
};

function projectMatchesCategory(project: Project, category: string): boolean {
  if (category === "All") return true;
  const cats = CATEGORY_MAP[category] ?? [];
  return project.technologies.some((t) => cats.includes(t));
}

/* ── Animations ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/* ── 3D Project Card ── */
function ProjectCard3D({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse movement to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const glow = GLOW_COLORS[index % GLOW_COLORS.length];

  let imageSrc: string | StaticImageData = `https://placehold.co/600x400/0a0a1a/1a3a5a.png`;
  if (project.localImageKey && localImages[project.localImageKey]) {
    imageSrc = localImages[project.localImageKey];
  }

  let objectPosition = "center";
  if (project.localImageKey === "iplPredictorImage") objectPosition = "center 10%";
  if (project.localImageKey === "carbonFootprintImage") objectPosition = "center 20%";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ perspective: 1500 }}
      className="h-full w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovered ? `0 30px 60px -10px ${glow}` : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
        className="relative h-full flex flex-col rounded-3xl overflow-hidden glass-card border border-white/10 transition-shadow duration-500 bg-[hsl(240,40%,6%)]/80 backdrop-blur-md"
      >
        {/* Shine effect that follows mouse */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-0 mix-blend-overlay"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, transparent 50%)`
            ),
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── 3D Floating Image Container ── */}
        <motion.div
          style={{ translateZ: hovered ? 60 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative aspect-video overflow-hidden m-4 rounded-2xl shadow-xl"
        >
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition }}
            className={`transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
            priority={index < 3}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />

          {/* Floating action buttons in 3D */}
          <motion.div
            style={{ translateZ: hovered ? 90 : 0 }}
            className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 hover:opacity-100 group"
          >
            {project.repoUrl && project.repoUrl !== "#" && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" /> Code
              </Link>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/80 border border-cyan-400/30 text-white font-medium hover:bg-cyan-500 transition-all hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" /> Live
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* ── 3D Floating Body ── */}
        <div className="flex flex-col flex-grow px-6 pb-6 pt-2" style={{ transformStyle: "preserve-3d" }}>
          <motion.h3
            style={{ translateZ: hovered ? 40 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="font-black text-white text-xl leading-tight mb-2 drop-shadow-md"
          >
            {project.title}
          </motion.h3>

          <motion.p
            style={{ translateZ: hovered ? 30 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-white/50 text-sm leading-relaxed flex-grow mb-4"
          >
            {project.description}
          </motion.p>

          <motion.div
            style={{ translateZ: hovered ? 50 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-wrap gap-1.5 pt-1"
          >
            {project.technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="tech-pill text-[11px] bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10">
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="tech-pill text-[11px] opacity-60">
                +{project.technologies.length - 5}
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS PAGE
═══════════════════════════════════════════ */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = PROJECTS.filter((p) =>
    projectMatchesCategory(p, activeFilter)
  );

  return (
    <section className="space-y-12 py-10 text-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        style={{ perspective: 1000 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="uppercase tracking-wider">My Portfolio</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black gradient-text-cyan-purple drop-shadow-2xl">
          My Projects
        </h1>
        <p className="text-white/45 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Hover over the cards to experience the 3D physics! A curated showcase of my skills in AI/ML, full-stack, and creative problem-solving.
        </p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-2 relative z-20"
      >
        <Filter className="h-4 w-4 text-white/30 mr-2" />
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
              activeFilter === cat
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-transparent text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:scale-105"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="perspective-2000 px-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard3D key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 text-white/30 glass-card rounded-3xl border border-white/10 max-w-lg mx-auto"
          >
            <p className="text-lg">No projects match this filter yet.</p>
          </motion.div>
        )}
      </div>

      {/* ── AI PROJECT IDEA GENERATOR ── */}
      <div className="border-t border-white/10 pt-16 max-w-4xl mx-auto px-4 mt-20 relative z-20">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="uppercase tracking-widest text-[10px]">AI Playground</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl mb-3 leading-tight">
            Brainstorm Your Next Project
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Input some keywords (e.g., "crime scenario analysis", "AI voting platform", "carbon footprint tracker") and let my built-in Gemini assistant brainstorm a custom project idea with a title, outline, and technology recommendations tailored to my full-stack and AI/ML interests.
          </p>
        </div>
        <div className="p-1 rounded-3xl glass-card bg-[hsl(240,40%,6%)]/40 border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
          <AIProjectGenerator />
        </div>
      </div>
    </section>
  );
}
