
"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TESTIMONIALS, Testimonial } from "@/lib/data";
import { Quote, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const CARD_ACCENTS = [
  "from-cyan-500/10 to-blue-500/10 border-cyan-500/20",
  "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  "from-green-500/10 to-emerald-500/10 border-green-500/20",
];

const GLOWS = [
  "rgba(0, 229, 255, 0.3)",
  "rgba(176, 38, 255, 0.3)",
  "rgba(16, 185, 129, 0.3)",
];

const AVATAR_COLORS = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-green-500 to-emerald-600",
];

function TestimonialCard3D({ t, index }: { t: Testimonial; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ perspective: 1500 }}
      className="h-full w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovered ? `0 20px 40px -10px ${GLOWS[index % GLOWS.length]}` : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
        className={`
          relative h-full rounded-3xl bg-gradient-to-br ${CARD_ACCENTS[index % CARD_ACCENTS.length]}
          border glass-card p-8 flex flex-col gap-6
          transition-shadow duration-500 bg-[hsl(240,40%,6%)]/80 backdrop-blur-xl
        `}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-0 mix-blend-overlay rounded-3xl transition-opacity duration-300"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
            ),
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Decorative quote icon */}
        <motion.div 
          style={{ translateZ: hovered ? 60 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute top-6 right-6 opacity-10"
        >
          <Quote className="h-16 w-16 text-white" />
        </motion.div>

        {/* Stars */}
        <motion.div 
          style={{ translateZ: hovered ? 30 : 0 }} 
          className="flex gap-1.5"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow-md" />
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote 
          style={{ translateZ: hovered ? 50 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-white/70 text-base md:text-lg leading-relaxed italic flex-grow drop-shadow-sm font-medium"
        >
          &ldquo;{t.quote}&rdquo;
        </motion.blockquote>

        {/* Author */}
        <motion.div 
          style={{ translateZ: hovered ? 40 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-4 pt-4 border-t border-white/10"
        >
          <Avatar className="h-12 w-12 border-2 border-white/10 shadow-lg">
            <AvatarImage
              src={t.avatarUrl}
              alt={t.name}
              data-ai-hint={t.avatarHint || "person avatar"}
            />
            <AvatarFallback
              className={`text-sm font-bold text-white bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
            >
              {t.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-white text-base drop-shadow-md">{t.name}</p>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">
              {t.title}
              {t.company && ` · ${t.company}`}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  return (
    <section ref={ref} className="py-24 px-4 overflow-hidden perspective-2000">
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30, rotateX: 20 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          style={{ transformStyle: "preserve-3d" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Star className="h-3.5 w-3.5" />
            <span className="uppercase tracking-widest">Testimonials</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black gradient-text-cyan-purple mb-6 drop-shadow-xl">
            What People Say
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            Hover over the cards below to see the 3D popping effects! Kind words from teammates and collaborators.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TESTIMONIALS.map((t: Testimonial, index: number) => (
            <TestimonialCard3D key={index} t={t} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
