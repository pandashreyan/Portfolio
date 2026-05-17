
"use client";

import { Github, Linkedin, Mail, Code, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/pandashreyan",
    icon: Github,
    color: "hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shreyan-panda-a4a6aa254/",
    icon: Linkedin,
    color: "hover:text-blue-400",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/shreyan1302/",
    icon: Code,
    color: "hover:text-yellow-400",
  },
  {
    label: "Email",
    href: "mailto:pandashreyan7@gmail.com",
    icon: Mail,
    color: "hover:text-cyan-400",
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-transparent to-[hsl(240,50%,3%)] mt-20">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                SP
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Shreyan Panda
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Full Stack Developer & AI/ML enthusiast building impactful software. KIIT University · SIH Finalist.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ label, href, icon: Icon, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg bg-white/5 text-white/40 transition-all duration-200 ${color} hover:bg-white/10`}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white/80 font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 text-white/40 hover:text-cyan-400 text-sm transition-colors duration-200"
                  >
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h4 className="text-white/80 font-semibold text-sm uppercase tracking-wider">
              Status
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-white/50">Open to opportunities</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                Studying @ KIIT University
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Building cool things 🚀
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/30 leading-relaxed">
                &quot;Code is poetry written for machines but read by humans.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {currentYear} Shreyan Panda. All rights reserved.
          </p>
          <p className="text-white/25 text-xs flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-pink-500 fill-pink-500 mx-0.5" /> using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
