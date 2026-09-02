'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', id: 'hero', href: '#hero' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Experience', id: 'experience', href: '#experience' },
    { name: 'Projects', id: 'projects', href: '#projects' },
    { name: 'Achievements', id: 'achievements', href: '#achievements' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];


  // ScrollSpy observer checking bounding rectangle & bottom of page for Contact section
  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect if scrolled near/at bottom of document (Contact section)
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100);
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 2. Detect if near top of page (Hero section)
      if (window.scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // 3. Check sections in viewport from bottom to top
      const sectionIds = ['contact', 'achievements', 'projects', 'experience', 'about', 'hero'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active threshold: section top is within top 350px of window & section bottom is visible
          if (rect.top <= 350 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for fixed 80px navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Top Navbar anchored at top-0 at all times */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-neo-surface border-b-4 border-neo-border flex items-center px-4 sm:px-8 md:px-12 justify-between">







        
        {/* Brand Logo / Sticker Badge */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero', 'hero')}
          className="flex items-center gap-2.5 font-black text-xl tracking-tight text-neo-text group"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -3 }}
            className="bg-neo-yellow border-3 border-neo-border px-3 py-1 rounded-xl shadow-brutal-sm group-hover:bg-neo-pink group-hover:text-white transition-colors"
          >
            AR
          </motion.div>
          <span className="font-extrabold uppercase tracking-wider text-base">
            PORTFOLIO<span className="text-neo-blue font-black">.DEV</span>
          </span>
        </a>

        {/* Desktop Navbar Links with Active Section Highlight */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`relative px-4 py-2 text-xs lg:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 min-h-[44px] flex items-center gap-2 ${
                  isActive 
                    ? 'bg-neo-yellow text-neo-text border-3 border-neo-border shadow-brutal-sm -translate-y-0.5 scale-105' 
                    : 'text-neo-text opacity-75 hover:opacity-100 border-3 border-transparent hover:border-neo-border hover:bg-neo-yellow/30 hover:shadow-brutal-sm hover:-translate-y-0.5'
                }`}
              >
                {isActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-neo-pink border border-neo-border animate-pulse shrink-0" />
                )}
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Dynamic CTA Contact Quick Action */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact', 'contact')}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-black uppercase tracking-wider bg-neo-blue text-white border-3 border-neo-border rounded-xl shadow-brutal-sm hover:-translate-y-0.5 hover:bg-blue-700 transition-all"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-neo-yellow border-3 border-neo-border text-neo-text shadow-brutal-sm active:translate-y-0.5"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[80px] z-40 md:hidden bg-neo-surface border-b-4 border-neo-border p-6 shadow-brutal-lg"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`w-full text-center py-3 text-base font-black uppercase tracking-wider rounded-xl border-3 border-neo-border transition-all flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-neo-yellow text-neo-text shadow-brutal-sm scale-[1.02]' 
                        : 'bg-neo-bg text-neo-text hover:bg-neo-yellow shadow-[2px_2px_0px_#000000]'
                    }`}
                  >
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-neo-pink border border-neo-border animate-pulse" />
                    )}
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}





