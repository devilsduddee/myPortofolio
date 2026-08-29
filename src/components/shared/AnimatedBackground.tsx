'use client';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-950">
      {/* Deep Purple Blob - Always visible but smaller on mobile */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-purple-600/30 rounded-full blur-[80px] md:blur-[120px]"
      />
      
      {/* Vivid Blue Blob - Hidden on mobile to save performance */}
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-blue-600/30 rounded-full blur-[120px]"
      />
      
      {/* Soft Pink Blob - Hidden on mobile to save performance */}
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] bg-pink-600/20 rounded-full blur-[120px]"
      />
    </div>
  );
}
