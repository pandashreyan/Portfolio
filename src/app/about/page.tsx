
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  Briefcase, Download, Github, Linkedin, Award, Brain, Code,
  MapPin, GraduationCap, Calendar, ExternalLink, Sparkles
} from "lucide-react";
import { ABOUT_TEXT, EXPERIENCES, TECHNICAL_SKILLS, ACHIEVEMENTS, SkillCategory } from "@/lib/data";
import profileImage from "@/assets/IMG-20221111-WA0040 - Copy.jpg";

/* ── Animation variants ── */
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemUp = {
  hidden: { y: 40, opacity: 0, rotateX: 20 },
  visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 80, damping: 14 } },
};

const slideLeft = {
  hidden: { x: -40, opacity: 0, rotateY: -20 },
  visible: { x: 0, opacity: 1, rotateY: 0, transition: { type: "spring", stiffness: 80, damping: 14 } },
};

/* ── 3D Profile Card ── */
function ProfileCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Moderate rotation for the huge card
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.section
      variants={itemUp}
      style={{ perspective: 2000 }}
      className="max-w-5xl mx-auto px-4 w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="rounded-3xl glass-card border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_40px_80px_-15px_rgba(0,229,255,0.15)] transition-shadow duration-700 bg-[hsl(240,40%,6%)]/80 backdrop-blur-xl"
      >
        {/* Dynamic shine */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-0 hover:opacity-100 mix-blend-overlay rounded-3xl transition-opacity duration-300"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
            ),
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ transformStyle: "preserve-3d" }}>
          {/* Photo side */}
          <div className="relative min-h-72 md:min-h-[500px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <Image
              src={profileImage}
              alt="Shreyan Panda"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              className="transition-transform duration-1000 hover:scale-110"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(240,50%,4%)]/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,50%,4%)]/90 to-transparent md:hidden" />
            
            <motion.div
              style={{ translateZ: 50 }}
              className="absolute bottom-6 left-6 flex gap-2 shadow-2xl"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                ✅ Open to Work
              </span>
            </motion.div>
          </div>

          {/* Info side */}
          <motion.div 
            className="p-8 md:p-12 flex flex-col justify-center space-y-6"
            style={{ translateZ: 60, transformStyle: "preserve-3d" }}
          >
            <motion.div style={{ translateZ: 30 }}>
              <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> About Me
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-xl">
                Shreyan Panda
              </h1>
              <p className="text-white/50 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-cyan-400" />
                Bhubaneswar, India
              </p>
            </motion.div>

            <motion.div style={{ translateZ: 40 }} className="flex flex-wrap gap-2">
              {["Full Stack Dev", "AI/ML", "Open Source", "SIH Finalist"].map((tag) => (
                <span key={tag} className="tech-pill bg-white/5 border-white/10">{tag}</span>
              ))}
            </motion.div>

            <motion.p style={{ translateZ: 20 }} className="text-white/60 text-base leading-relaxed">
              {ABOUT_TEXT}
            </motion.p>

            {/* Education */}
            <motion.div style={{ translateZ: 50 }} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <GraduationCap className="h-6 w-6 text-purple-400 flex-shrink-0" />
              </div>
              <div>
                <p className="text-white font-bold">KIIT University</p>
                <p className="text-white/50 text-sm mt-1">B.Tech in Computer Science · 2022 – 2026</p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div style={{ translateZ: 70 }} className="flex items-center gap-3 pt-2">
              {[
                { href: "https://www.linkedin.com/in/shreyan-panda-a4a6aa254/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/10" },
                { href: "https://github.com/pandashreyan", icon: Github, label: "GitHub", color: "hover:text-white hover:border-white/40 hover:bg-white/10" },
                { href: "https://leetcode.com/u/shreyan1302/", icon: Code, label: "LeetCode", color: "hover:text-yellow-400 hover:border-yellow-400/40 hover:bg-yellow-400/10" },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl border border-white/10 text-white/40 transition-all duration-300 shadow-lg ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://drive.google.com/uc?export=download&id=1mRcM8vtneI1g9Ef0Unq5nU_QNV5JWQU_"
                download="Shreyan_Panda_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all"
              >
                <Download className="h-4 w-4" />
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

/* ── Section heading ── */
function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.div variants={itemUp} className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
        <Icon className="h-3.5 w-3.5" />
        <span className="uppercase tracking-widest">{children as string}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-black gradient-text-cyan-purple drop-shadow-lg">
        {children}
      </h2>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-32 py-10 text-white overflow-hidden"
    >
      {/* ── HERO / PROFILE ── */}
      <ProfileCard3D />

      {/* ── SKILLS ── */}
      <motion.section
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-5xl mx-auto px-4 perspective-2000"
      >
        <SectionHeading icon={Brain}>Technical Skills</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECHNICAL_SKILLS.map((category: SkillCategory, catIndex) => (
            <motion.div
              key={catIndex}
              variants={slideLeft}
              whileHover={{ rotateX: 5, rotateY: -5, z: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-3xl glass-card border border-white/10 p-8 hover:border-cyan-500/30 transition-colors duration-500 bg-[hsl(240,40%,6%)]/60 shadow-xl group"
            >
              <motion.h3 style={{ translateZ: 30 }} className="font-bold text-base uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-3 drop-shadow-md">
                <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                {category.title}
              </motion.h3>
              <motion.div style={{ translateZ: 50 }} className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -5, z: 20 }}
                    className="tech-pill cursor-default text-sm py-1.5 px-3 bg-white/5 border-white/10 shadow-lg hover:shadow-cyan-500/30 font-medium"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── ACHIEVEMENTS ── */}
      <motion.section
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-4 perspective-2000"
      >
        <SectionHeading icon={Award}>Achievements</SectionHeading>
        <div className="space-y-6">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              variants={itemUp}
              whileHover={{ x: 10, z: 20, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group flex flex-col sm:flex-row gap-6 p-8 rounded-3xl glass-card border border-white/10 hover:border-yellow-500/30 transition-colors duration-500 bg-[hsl(240,40%,6%)]/60 shadow-xl"
            >
              <motion.div style={{ translateZ: 30 }} className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                <Award className="h-7 w-7 text-yellow-400" />
              </motion.div>
              <motion.div style={{ translateZ: 40 }} className="flex-grow min-w-0 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-white text-xl group-hover:text-yellow-400 transition-colors drop-shadow-md">
                    {a.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    {a.year && (
                      <span className="text-sm font-bold text-white/40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <Calendar className="h-3.5 w-3.5" />
                        {a.year}
                      </span>
                    )}
                    {a.link && (
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
                <p className="text-white/50 text-base leading-relaxed">{a.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── EXPERIENCE (Timeline) ── */}
      <motion.section
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-4 perspective-2000 pb-20"
      >
        <SectionHeading icon={Briefcase}>Experience</SectionHeading>
        <div className="relative pl-10 border-l-4 border-white/5 space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={i} variants={itemUp} className="relative group">
              {/* 3D Timeline dot */}
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className="absolute -left-[2.85rem] top-6 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-4 border-[hsl(240,50%,4%)] shadow-[0_0_20px_rgba(0,229,255,0.6)] z-10" 
              />

              <motion.div 
                whileHover={{ x: 10, z: 20 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="ml-4 p-8 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/30 transition-colors duration-500 bg-[hsl(240,40%,6%)]/60 shadow-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <motion.div style={{ translateZ: 30 }}>
                    <h3 className="font-black text-white text-2xl group-hover:text-cyan-400 transition-colors drop-shadow-lg">
                      {exp.role}
                    </h3>
                    <p className="text-white/50 text-base font-semibold mt-1">{exp.company}</p>
                  </motion.div>
                  <motion.span style={{ translateZ: 40 }} className="text-sm font-bold px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    <Calendar className="h-4 w-4" />
                    {exp.year}
                  </motion.span>
                </div>
                <motion.p style={{ translateZ: 20 }} className="text-white/50 text-base leading-relaxed mb-6">
                  {exp.description}
                </motion.p>
                <motion.div style={{ translateZ: 40 }} className="flex flex-wrap gap-2.5">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-pill bg-white/5 border-white/10 font-medium">
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
