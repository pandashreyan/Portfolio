
"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  depth: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  angle: number;
  dist: number;
}

interface Crater {
  cx: number;
  cy: number;
  r: number;
  alpha: number;
}

interface TechSymbol {
  text: string;
  name: string;
  xPercent: number; // Percent of width
  yPercent: number; // Percent of height
  size: number;
  orbitRadius: number; // bobbing amplitude
  orbitSpeed: number;  // bobbing speed
  orbitPhase: number;
  depth: number;      // parallax factor (deeper = moves less)
  color: string;
  glowColor: string;
  angle: number;
  rotationSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  decay: number;
  color: string;
  thickness: number;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  speedMultiplier: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const techSymbolsRef = useRef<TechSymbol[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const dustRef = useRef<DustParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const warpRef = useRef<boolean>(false);
  const warpProgressRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initial mouse center to avoid snap
    mouseRef.current = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    // Initialize 200 layered stars
    const initStars = () => {
      const stars: Star[] = [];
      const numStars = Math.min(220, Math.floor((width * height) / 8000));
      
      const starColors = [
        "rgba(255, 255, 255, ",  // White
        "rgba(165, 243, 252, ",  // Cyan tint
        "rgba(232, 121, 249, ",  // Purple tint
        "rgba(253, 244, 255, ",  // Light lavender
        "rgba(191, 219, 254, ",  // Blue tint
      ];

      for (let i = 0; i < numStars; i++) {
        // Distribute layers: 60% distant, 30% mid, 10% close
        const rand = Math.random();
        let depth = 0.05; // distant
        let size = Math.random() * 0.8 + 0.4;
        
        if (rand > 0.6 && rand <= 0.9) {
          depth = 0.15; // midground
          size = Math.random() * 0.9 + 1.0;
        } else if (rand > 0.9) {
          depth = 0.35; // foreground
          size = Math.random() * 1.2 + 1.6;
        }

        const x = Math.random() * width;
        const y = Math.random() * height;
        const dx = x - width / 2;
        const dy = y - height / 2;

        stars.push({
          x,
          y,
          size,
          depth,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          angle: Math.atan2(dy, dx),
          dist: Math.sqrt(dx * dx + dy * dy) || 10,
        });
      }
      starsRef.current = stars;
    };

    // Initialize floating glowing tech symbols across space
    const initTechSymbols = () => {
      techSymbolsRef.current = [
        {
          name: "React", text: "⚛", xPercent: 0.18, yPercent: 0.28, size: 36, orbitRadius: 15, orbitSpeed: 0.0004, orbitPhase: 0, depth: 0.18, color: "#22d3ee", glowColor: "rgba(34, 211, 238, 0.35)", angle: 0, rotationSpeed: 0.0015,
        },
        {
          name: "JavaScript", text: "JS", xPercent: 0.82, yPercent: 0.68, size: 32, orbitRadius: 18, orbitSpeed: 0.0006, orbitPhase: Math.PI * 0.6, depth: 0.25, color: "#facc15", glowColor: "rgba(250, 204, 21, 0.3)", angle: 0.2, rotationSpeed: -0.002,
        },
        {
          name: "Python", text: "Py", xPercent: 0.76, yPercent: 0.22, size: 28, orbitRadius: 12, orbitSpeed: 0.0008, orbitPhase: Math.PI * 1.3, depth: 0.12, color: "#38bdf8", glowColor: "rgba(56, 189, 248, 0.3)", angle: -0.1, rotationSpeed: 0.001,
        },
        {
          name: "Next.js", text: "▲", xPercent: 0.12, yPercent: 0.82, size: 34, orbitRadius: 14, orbitSpeed: 0.0005, orbitPhase: Math.PI * 0.2, depth: 0.22, color: "#c084fc", glowColor: "rgba(192, 132, 252, 0.3)", angle: 0, rotationSpeed: 0.0012,
        },
        {
          name: "TypeScript", text: "TS", xPercent: 0.28, yPercent: 0.55, size: 30, orbitRadius: 16, orbitSpeed: 0.0007, orbitPhase: Math.PI * 0.9, depth: 0.15, color: "#60a5fa", glowColor: "rgba(96, 165, 250, 0.3)", angle: 0.3, rotationSpeed: -0.0015,
        },
        {
          name: "MongoDB", text: "🍃", xPercent: 0.68, yPercent: 0.48, size: 32, orbitRadius: 15, orbitSpeed: 0.00055, orbitPhase: Math.PI * 1.7, depth: 0.2, color: "#10b981", glowColor: "rgba(16, 185, 129, 0.3)", angle: 0.1, rotationSpeed: 0.0018,
        },
        {
          name: "PyTorch", text: "🔥", xPercent: 0.45, yPercent: 0.85, size: 34, orbitRadius: 18, orbitSpeed: 0.00065, orbitPhase: Math.PI * 1.1, depth: 0.28, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.35)", angle: -0.2, rotationSpeed: 0.002,
        },
        {
          name: "AI/ML", text: "🧠", xPercent: 0.52, yPercent: 0.15, size: 35, orbitRadius: 14, orbitSpeed: 0.00045, orbitPhase: Math.PI * 0.4, depth: 0.16, color: "#ec4899", glowColor: "rgba(236, 72, 153, 0.35)", angle: 0.15, rotationSpeed: -0.001,
        },
      ];
    };

    // Initialize 80 interactive cosmic dust particles
    const initDust = () => {
      const dust: DustParticle[] = [];
      const numDust = 80;
      const dustColors = [
        "rgba(34, 211, 238, ",  // Cyan
        "rgba(192, 132, 252, ", // Purple
        "rgba(244, 114, 182, ", // Pink
      ];

      for (let i = 0; i < numDust; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15 - 0.1, // Slow uniform leftward solar wind
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.4 + 0.6,
          alpha: Math.random() * 0.4 + 0.15,
          color: dustColors[Math.floor(Math.random() * dustColors.length)],
          speedMultiplier: Math.random() * 0.5 + 0.5,
        });
      }
      dustRef.current = dust;
    };

    initStars();
    initTechSymbols();
    initDust();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initDust();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const onToggleWarp = (e: Event) => {
      const customEvent = e as CustomEvent;
      warpRef.current = customEvent.detail?.active ?? false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("toggleWarpSpeed", onToggleWarp);

    let lastTime = 0;

    const draw = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse for realistic camera damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const mdx = mouse.x - width / 2;
      const mdy = mouse.y - height / 2;

      // Ramping warp progress
      const targetWarp = warpRef.current ? 1 : 0;
      warpProgressRef.current += (targetWarp - warpProgressRef.current) * 0.08;
      const warp = warpProgressRef.current;

      // Draw Central Hyperspace Portal Glow when warp is active
      if (warp > 0.05) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const portalGrad = ctx.createRadialGradient(
          width / 2, height / 2, 10,
          width / 2, height / 2, Math.max(width, height) * 0.55 * warp
        );
        portalGrad.addColorStop(0, `rgba(0, 229, 255, ${warp * 0.35})`);
        portalGrad.addColorStop(0.4, `rgba(176, 38, 255, ${warp * 0.25})`);
        portalGrad.addColorStop(0.8, `rgba(255, 60, 172, ${warp * 0.15})`);
        portalGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = portalGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // Draw Stars Layer with Twinkling, Parallax, and Hyperdrive Streaks
      starsRef.current.forEach((s) => {
        let sx = s.x - mdx * s.depth;
        let sy = s.y - mdy * s.depth;

        let prevX = sx;
        let prevY = sy;

        if (warp > 0.01) {
          const speed = warp * (25 + s.depth * 450);
          const prevDist = s.dist;
          s.dist += speed;
          const maxDist = Math.max(width, height) * 0.9;
          if (s.dist > maxDist) {
            s.dist = Math.random() * 50 + 10;
            s.angle = Math.random() * Math.PI * 2;
          }
          s.x = width / 2 + Math.cos(s.angle) * s.dist;
          s.y = height / 2 + Math.sin(s.angle) * s.dist;
          
          sx = s.x - mdx * s.depth;
          sy = s.y - mdy * s.depth;

          prevX = (width / 2 + Math.cos(s.angle) * prevDist) - mdx * s.depth;
          prevY = (height / 2 + Math.sin(s.angle) * prevDist) - mdy * s.depth;
        } else {
          // Normal parallax wrapping
          if (sx < 0) { sx = width + (sx % width); s.x = sx + mdx * s.depth; }
          if (sx > width) { sx = sx % width; s.x = sx + mdx * s.depth; }
          if (sy < 0) { sy = height + (sy % height); s.y = sy + mdy * s.depth; }
          if (sy > height) { sy = sy % height; s.y = sy + mdy * s.depth; }
        }

        const phase = s.twinklePhase + timestamp * s.twinkleSpeed;
        const opacity = s.size > 1.5
          ? (Math.sin(phase) * 0.35 + 0.65) * s.depth * 2
          : (Math.sin(phase) * 0.25 + 0.55) * s.depth * 2.5;

        if (warp > 0.1) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(sx, sy);
          // Dazzling neon rainbow hyperspace rays
          const rayColors = [
            `rgba(0, 229, 255, ${Math.min(1, warp * 1.5)})`,
            `rgba(176, 38, 255, ${Math.min(1, warp * 1.5)})`,
            `rgba(255, 60, 172, ${Math.min(1, warp * 1.5)})`,
            `rgba(255, 255, 255, ${Math.min(1, warp * 1.8)})`,
          ];
          ctx.strokeStyle = rayColors[Math.floor(s.dist) % rayColors.length];
          ctx.lineWidth = s.size * (1 + warp * 4);
          ctx.lineCap = "round";
          ctx.shadowBlur = 15;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${Math.max(0.05, Math.min(1, opacity))})`;
          ctx.fill();

          if (s.size > 1.8) {
            ctx.beginPath();
            ctx.ellipse(sx, sy, s.size * 2.8, s.size * 0.4, 0, 0, Math.PI * 2);
            ctx.ellipse(sx, sy, s.size * 0.4, s.size * 2.8, 0, 0, Math.PI * 2);
            ctx.fillStyle = `${s.color}${opacity * 0.25})`;
            ctx.fill();
          }
        }
      });

      // 3. Draw Cosmic Orbit Dash Paths (Space Strat Map Style)
      techSymbolsRef.current.forEach((t) => {
        const baseX = t.xPercent * width;
        const baseY = t.yPercent * height;

        ctx.save();
        ctx.strokeStyle = "rgba(100, 200, 255, 0.035)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.beginPath();
        // Orbit ring of bobbing (visual decoration)
        ctx.arc(baseX, baseY, t.orbitRadius * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // 4. Update and Draw Shooting Stars (Meteors)
      // Small chance of spawning a new shooting star (max 3 at once)
      if (Math.random() < 0.008 && meteorsRef.current.length < 3) {
        const isCyan = Math.random() > 0.4;
        meteorsRef.current.push({
          x: Math.random() * width * 0.8 + width * 0.2,
          y: Math.random() * height * 0.4,
          vx: -(5 + Math.random() * 8), // swift sweep left
          vy: 2 + Math.random() * 4,    // sweeping down
          length: Math.random() * 80 + 70,
          life: 1.0,
          decay: Math.random() * 0.02 + 0.015,
          color: isCyan ? "0, 229, 255" : "232, 121, 249",
          thickness: Math.random() * 1.5 + 0.8,
        });
      }

      meteorsRef.current = meteorsRef.current.filter((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0) return false;

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.vx * m.length * 0.1,
          m.y - m.vy * m.length * 0.1
        );
        gradient.addColorStop(0, `rgba(${m.color}, ${m.life})`);
        gradient.addColorStop(0.3, `rgba(${m.color}, ${m.life * 0.6})`);
        gradient.addColorStop(1, `rgba(${m.color}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * m.length * 0.1, m.y - m.vy * m.length * 0.1);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${m.color}, ${m.life * 0.5})`;
        ctx.stroke();
        ctx.restore();

        return true;
      });

      // 5. Update and Draw Solar Wind Dust with Mouse Gravity Waves
      dustRef.current.forEach((d) => {
        // Solar wind motion supercharged by warp
        let dx = d.vx * d.speedMultiplier * (1 + warp * 15);
        let dy = d.vy * d.speedMultiplier * (1 + warp * 15);

        // Interactive gravity pull/repel from cursor
        const toMouseX = mouse.x - d.x;
        const toMouseY = mouse.y - d.y;
        const dist = Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY);

        if (dist < 180) {
          // Slow drag vortex around cursor
          const force = (180 - dist) / 180;
          // Soft pull + orbital swirl
          dx += (toMouseX / dist) * force * 0.15;
          dy += (toMouseY / dist) * force * 0.15;
          
          // Cross product swirl
          dx += (-toMouseY / dist) * force * 0.25;
          dy += (toMouseX / dist) * force * 0.25;
        }

        d.x += dx;
        d.y += dy;

        // Wrap around screen edges
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;
        if (d.y < -10) d.y = height + 10;
        if (d.y > height + 10) d.y = -10;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${d.alpha})`;
        ctx.fill();
      });

      // 6. Draw 3D Floating Tech Symbols in Space
      techSymbolsRef.current.forEach((t) => {
        // In hyperdrive, make them swirl in a rapid time vortex
        const currentOrbitSpeed = t.orbitSpeed * (1 + warp * 35);
        t.orbitPhase += currentOrbitSpeed * deltaTime;
        const bobX = Math.sin(t.orbitPhase) * t.orbitRadius * (1 + warp * 2);
        const bobY = Math.cos(t.orbitPhase * 0.8) * (t.orbitRadius * 0.6) * (1 + warp * 2);

        const px = t.xPercent * width + bobX - mdx * t.depth;
        const py = t.yPercent * height + bobY - mdy * t.depth;

        t.angle += t.rotationSpeed * (1 + warp * 20);

        ctx.save();
        ctx.translate(px, py);

        // A. Draw Neon Atmospheric Outer Glow
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const atmosphericGlow = ctx.createRadialGradient(0, 0, t.size * 0.5, 0, 0, t.size * 2.2);
        atmosphericGlow.addColorStop(0, t.glowColor);
        atmosphericGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(0, 0, t.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = atmosphericGlow;
        ctx.fill();
        ctx.restore();

        // B. Glass Disk Backing
        ctx.beginPath();
        ctx.arc(0, 0, t.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // C. Draw Rotating/Tilting Glowing Tech Text/Icon
        ctx.rotate(t.angle);
        ctx.font = `900 ${t.size}px "Inter", "Roboto", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = t.color;
        ctx.fillText(t.text, 0, 0);

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

