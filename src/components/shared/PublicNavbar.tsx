/**
 * File        : src/components/shared/PublicNavbar.tsx
 * Deskripsi   : Komponen navigasi utama (header) untuk pengunjung publik.
 *               Menyediakan logo brand AR, tautan navigasi dengan indikator posisi (ScrollSpy),
 *               serta tombol aksi utama (CTA) "Let's Talk".
 * Responsif   : Dioptimalkan untuk mengisolasi menu drawer mobile pada lapisan z-index tertinggi (topmost layer).
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

/**
 * Komponen Navbar Publik.
 *
 * Kegunaan : Menampilkan baris navigasi tetap di bagian atas halaman publik,
 *            mengamati posisi scroll layar untuk sorotan menu aktif,
 *            serta menyediakan menu drawer mobile pada z-index teratas tanpa tumpang tindih.
 * Input    : Tanpa props luar.
 * Hasil    : Elemen header <header> dan drawer mobile berposisi teratas.
 */
export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', id: 'hero', href: '#hero' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Experience', id: 'experience', href: '#experience' },
    { name: 'Projects', id: 'projects', href: '#projects' },
    { name: 'Achievements', id: 'achievements', href: '#achievements' },
    { name: 'Soundtrack', id: 'soundtrack', href: '#soundtrack' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  /**
   * Mengunci scroll latar belakang body saat menu drawer mobile terbuka.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /**
   * Menangani pemantauan posisi scroll layar (ScrollSpy).
   */
  useEffect(() => {
    const handleScroll = () => {
      // 1. Deteksi jika pengguna sudah scroll di bagian paling bawah halaman (Contact section)
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100);
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 2. Deteksi jika pengguna berada di bagian paling atas halaman (Hero section)
      if (window.scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // 3. Cari section yang paling relevan (tengah viewport berada di dalam elemen, atau paling dominan)
      const sectionIds = ['hero', 'about', 'experience', 'projects', 'achievements', 'soundtrack', 'contact'];
      const scrollPosition = window.scrollY + 140; // 140px di bawah viewport top untuk kompensasi navbar

      let currentSection = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Menangani klik navigasi tautan menu.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Kompensasi tinggi fixed navbar 80px
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Top Navbar dengan z-index teratas z-[9999] */}
      <header className="fixed top-0 left-0 right-0 z-[9999] h-[80px] bg-neo-surface border-b-4 border-neo-border flex items-center px-4 sm:px-8 md:px-12 justify-between">
        
        {/* Brand Logo Resmi: Spark Pivot Symbol + RIDHO Wordmark */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero', 'hero')}
          className="flex items-center gap-2.5 group"
          aria-label="Ahmad Ridho Syafaat Home"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="flex items-center gap-2.5"
          >
            {/* Simbol Ikonik Spark Pivot */}
            <div className="relative w-9 h-9 shrink-0">
              <div className="absolute inset-0 bg-neo-border translate-x-0.5 translate-y-0.5 rounded-xl" />
              <div className="relative w-full h-full bg-neo-yellow border-2 border-neo-border rounded-xl flex items-center justify-center p-1.5 overflow-hidden group-hover:bg-neo-pink transition-colors">
                <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
                  {/* Bar Kiri (Data) */}
                  <rect x="24" y="56" width="16" height="42" rx="4" fill="#000000" />
                  {/* Bar Tengah (Analytics/Decision) */}
                  <rect x="48" y="34" width="16" height="64" rx="4" fill="#2563EB" stroke="#000000" strokeWidth="3" />
                  {/* Bintang Sparkle (AI Innovation) */}
                  <path d="M 88 16 Q 88 34 70 34 Q 88 34 88 52 Q 88 34 106 34 Q 88 34 88 16 Z" fill="#FF006E" stroke="#000000" strokeWidth="3" />
                  {/* Titik Jangkar */}
                  <circle cx="88" cy="80" r="7" fill="#000000" />
                </svg>
              </div>
            </div>

            {/* Wordmark RIDHO & Tagline Ringkas */}
            <div className="flex flex-col text-left">
              <span className="font-black text-lg leading-none tracking-tight text-neo-text uppercase">
                RIDHO
              </span>
              <span className="text-[9px] font-black tracking-widest text-neo-muted uppercase leading-none mt-0.5">
                DATA • PRODUCT
              </span>
            </div>
          </motion.div>
        </a>

        {/* Menu Navigasi Desktop dengan Sorotan Aktif */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`relative px-4 py-2 text-xs lg:text-sm font-black uppercase tracking-wider rounded-xl transition-transform duration-150 min-h-[44px] flex items-center gap-2 focus-visible:ring-4 focus-visible:ring-neo-border focus-visible:outline-none active:scale-[0.97] ${
                  isActive 
                    ? 'bg-neo-yellow text-neo-text border-3 border-neo-border shadow-brutal-sm -translate-y-0.5 scale-105' 
                    : 'text-neo-text opacity-75 hover:opacity-100 border-3 border-transparent hover:border-neo-border hover:bg-neo-yellow/30 hover:shadow-brutal-sm hover:-translate-y-0.5'
                }`}
              >
                {isActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-neo-pink border border-neo-border shrink-0" />
                )}
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Tombol Aksi Utama CTA (Let's Talk) */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact', 'contact')}
            className="group inline-flex items-center gap-3 px-6 py-2.5 lg:px-7 lg:py-3 text-xs lg:text-sm font-black uppercase tracking-wider bg-neo-blue text-white border-3 border-neo-border rounded-xl shadow-brutal-sm hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.97] active:translate-y-0 focus-visible:ring-4 focus-visible:ring-neo-border focus-visible:outline-none transition-all duration-150 min-h-[44px]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 lg:w-[18px] lg:h-[18px] stroke-[3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150 shrink-0" />
          </a>
        </div>

        {/* Tombol Hamburger Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-neo-yellow border-3 border-neo-border text-neo-text shadow-brutal-sm active:scale-[0.96] focus-visible:ring-4 focus-visible:ring-neo-border focus-visible:outline-none transition-transform"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
        </button>
      </header>

      {/* Menu Drawer Mobile & Backdrop Layer dengan z-index z-[9990] & z-[9980] */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay (z-[9980]) untuk Mengisolasikan Seluruh Konten Halaman */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[80px] bg-black/50 backdrop-blur-xs z-[9980] md:hidden"
            />

            {/* Menu Drawer Container (z-[9990]) di atas Backdrop Overlay */}
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-x-0 top-[80px] z-[9990] md:hidden bg-neo-surface border-b-4 border-neo-border p-6"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => handleNavClick(e, link.href, link.id)}
                      className={`w-full text-center py-3 text-base font-black uppercase tracking-wider rounded-xl border-3 border-neo-border active:scale-[0.98] transition-transform flex items-center justify-center gap-2 focus-visible:ring-4 focus-visible:ring-neo-border focus-visible:outline-none ${
                        isActive 
                          ? 'bg-neo-yellow text-neo-text shadow-brutal-sm scale-[1.02]' 
                          : 'bg-neo-bg text-neo-text hover:bg-neo-yellow shadow-brutal-sm'
                      }`}
                    >
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-neo-pink border border-neo-border" />
                      )}
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
