
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, MessageSquare, Menu, X, Rocket } from "lucide-react";
import { RotatingLogo } from "./rotating-logo";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isWarp, setIsWarp] = useState(false);

  const playWarpSound = (active: boolean) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      if (active) {
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      } else {
        osc.frequency.setValueAtTime(700, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      }
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.error("Audio synth error", e);
    }
  };

  const toggleWarp = () => {
    const nextVal = !isWarp;
    setIsWarp(nextVal);
    playWarpSound(nextVal);
    window.dispatchEvent(new CustomEvent("toggleWarpSpeed", { detail: { active: nextVal } }));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[hsl(240,50%,5%)]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,229,255,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <RotatingLogo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative group flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon
                      className={`h-4 w-4 relative z-10 transition-colors ${
                        isActive ? "text-cyan-400" : "text-white/50 group-hover:text-cyan-400"
                      }`}
                    />
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive ? "text-cyan-300" : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={toggleWarp}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                isWarp
                  ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white border-transparent shadow-[0_0_25px_rgba(0,229,255,0.8)] animate-pulse scale-105"
                  : "bg-white/5 border-white/10 text-cyan-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Rocket className={`h-3.5 w-3.5 ${isWarp ? "animate-bounce text-white" : "text-cyan-400"}`} />
              <span>{isWarp ? "Warp Active ⚡" : "Hyperdrive"}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle + Hyperdrive */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleWarp}
              className={`p-2 rounded-full border ${
                isWarp
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-[0_0_15px_rgba(0,229,255,0.6)] animate-pulse"
                  : "bg-white/5 border-white/10 text-cyan-400"
              }`}
              aria-label="Toggle Hyperdrive"
            >
              <Rocket className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden bg-[hsl(240,50%,5%)]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
