'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function CTAButton({ children, href, className = '' }: { children: ReactNode, href: string, variant?: 'primary' | 'secondary', className?: string }) {
  // We unify both variants into the requested glass button style
  const glassStyle = "inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white font-medium shadow-lg shadow-black/20";
  
  return (
    <motion.a 
      href={href} 
      className={`${glassStyle} ${className}`}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}
