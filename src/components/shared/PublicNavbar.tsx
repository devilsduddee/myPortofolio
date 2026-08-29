'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-end md:justify-center items-center pt-6 px-4 md:px-6 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}
      >
        {/* Desktop Navbar */}
        <motion.nav 
          animate={{
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
            borderColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
            scale: scrolled ? 0.98 : 1,
            backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
            boxShadow: scrolled ? "0 25px 50px -12px rgba(0, 0, 0, 0.3)" : "none"
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="hidden md:flex items-center gap-1 md:gap-2 px-6 py-2.5 rounded-full border overflow-hidden relative"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-2 text-[14px] font-medium tracking-wide rounded-full min-h-[44px] flex items-center transition-all duration-300 ${
                scrolled ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
        </motion.nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white z-[60]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-8 px-6"
          >
            <div className="flex flex-col items-center w-full max-w-sm gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="w-full text-center py-4 text-xl font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-white/10 min-h-[44px]"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
