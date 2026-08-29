'use client';
import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export function Card({ children, className = '', ...props }: { children: ReactNode, className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div 
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 ${className}`}
      whileHover={{ y: -6, scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
