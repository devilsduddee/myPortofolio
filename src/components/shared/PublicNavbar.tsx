'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}
    >
      <nav className={`flex items-center gap-1 md:gap-2 px-4 py-2 rounded-full border transition-all duration-700 ease-out relative overflow-hidden ${
        scrolled 
          ? 'bg-white/60 backdrop-blur-[32px] border-white/80 shadow-[0_16px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5 scale-[0.98]' 
          : 'bg-white/40 backdrop-blur-xl border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.02)] scale-100'
      }`}>
        {/* Subtle top reflection pseudo-element */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none mix-blend-overlay"></div>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-900/5 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
