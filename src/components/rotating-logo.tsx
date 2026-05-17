
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function RotatingLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
      {/* Animated logo mark */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, rgba(0,229,255,0.6), rgba(176,38,255,0.6), rgba(255,60,172,0.6), rgba(0,229,255,0.6))",
            borderRadius: "50%",
            padding: "1.5px",
          }}
        />
        <div className="relative w-9 h-9 rounded-full bg-[hsl(240,50%,5%)] flex items-center justify-center border border-white/10 m-[1.5px]">
          <span
            className="text-xs font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #00e5ff, #b026ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            SP
          </span>
        </div>
      </div>

      {/* Name */}
      <span
        className="text-lg font-extrabold hidden sm:inline transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        Shreyan
      </span>
    </Link>
  );
}
