'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const floaters = containerRef.current.querySelectorAll('.parallax-sticker');

    floaters.forEach((sticker, index) => {
      // 1. Continuous gentle floating & tilt rotation loop
      gsap.to(sticker, {
        y: (index % 2 === 0 ? 18 : -18),
        rotation: (index % 2 === 0 ? 12 : -12),
        duration: 3.5 + (index % 4) * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. ScrollTrigger Parallax Scrubbing
      const speed = 80 + (index % 5) * 60; // Different speed layers
      gsap.to(sticker, {
        yPercent: -speed * 0.15,
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-neo-bg select-none">
      {/* Decorative Neo Brutalist Floating Sticker Badges & Icons */}

      
      {/* 1. Top Left: [DEV] Badge */}
      <div className="parallax-sticker absolute top-28 left-6 md:left-12 px-3.5 py-1.5 bg-neo-yellow border-3 border-neo-border text-neo-text font-black text-xs uppercase tracking-wider rounded-xl shadow-brutal-sm rotate-6 hidden sm:flex items-center gap-1.5 opacity-60">
        <span className="w-2 h-2 rounded-full bg-neo-pink border border-black animate-ping" />
        <span>[DEV_MODE]</span>
      </div>

      {/* 2. Top Right: </> Code Badge */}
      <div className="parallax-sticker absolute top-36 right-8 md:right-16 px-4 py-2 bg-neo-pink text-white border-3 border-neo-border font-black text-sm uppercase tracking-wider rounded-2xl shadow-brutal-sm -rotate-6 hidden md:flex items-center gap-2 opacity-60">
        <span>&lt;/&gt;</span>
        <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-md">SRC</span>
      </div>

      {/* 3. Mid Left: ⚡ Power Pin */}
      <div className="parallax-sticker absolute top-1/3 left-8 md:left-20 w-12 h-12 bg-neo-blue text-white border-3 border-neo-border font-black text-lg rounded-2xl shadow-brutal-sm rotate-12 hidden lg:flex items-center justify-center opacity-60">
        ⚡
      </div>

      {/* 4. Mid Right: {CODE} Syntax Badge */}
      <div className="parallax-sticker absolute top-1/2 right-10 md:right-24 px-4 py-2 bg-neo-yellow text-neo-text border-3 border-neo-border font-black text-xs uppercase tracking-widest rounded-2xl shadow-brutal-sm -rotate-12 hidden sm:flex items-center gap-1.5 opacity-60">
        <span>&#123;BUILD_NEXT&#125;</span>
      </div>

      {/* 5. Lower Left: ✦ Star Sticker */}
      <div className="parallax-sticker absolute top-2/3 left-10 md:left-16 w-11 h-11 bg-neo-green text-white border-3 border-neo-border font-black text-base rounded-2xl shadow-brutal-sm -rotate-6 hidden md:flex items-center justify-center opacity-60">
        ✦
      </div>

      {/* 6. Lower Right: npm run dev Pill */}
      <div className="parallax-sticker absolute top-3/4 right-12 md:right-32 px-4 py-2 bg-neo-surface text-neo-text border-3 border-neo-border font-black text-xs uppercase tracking-wider rounded-full shadow-brutal-sm rotate-6 hidden lg:flex items-center gap-2 opacity-60">
        <span className="w-2.5 h-2.5 rounded-full bg-neo-green border border-black" />
        <span>npm run dev</span>
      </div>

      {/* 7. Bottom Left: ★ Award Badge */}
      <div className="parallax-sticker absolute bottom-24 left-12 md:left-28 w-12 h-12 bg-neo-pink text-white border-3 border-neo-border font-black text-lg rounded-full shadow-brutal-sm rotate-12 hidden sm:flex items-center justify-center opacity-60">
        ★
      </div>

      {/* 8. Bottom Right: 0101 Binary Chip */}
      <div className="parallax-sticker absolute bottom-32 right-16 md:right-20 px-3.5 py-1.5 bg-neo-blue text-white border-3 border-neo-border font-mono font-black text-xs tracking-widest rounded-xl shadow-brutal-sm -rotate-3 hidden md:flex items-center opacity-60">
        01001001
      </div>

    </div>
  );
}





