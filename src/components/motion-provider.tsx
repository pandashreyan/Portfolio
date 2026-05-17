
"use client";

import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type MotionProviderProps = {
  children: ReactNode;
};

// This component specifically handles the page transition animations
export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {/* The key={pathname} ensures animation triggers on route change */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        // Removed flex container styles, let layout.tsx handle structure
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
