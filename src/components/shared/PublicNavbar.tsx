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
      <nav className={`flex items-center gap-1 md:gap-2 px-6 py-2.5 rounded-full border transition-all duration-500 ease-out relative overflow-hidden ${
        scrolled 
          ? 'bg-white/5 backdrop-blur-md border-white/10 shadow-2xl shadow-black/20 scale-[0.98]' 
          : 'bg-transparent border-transparent scale-100'
      }`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`px-4 py-2 text-[14px] font-medium tracking-wide rounded-full transition-all duration-300 ${
              scrolled ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
