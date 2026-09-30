/**
 * File        : src/components/shared/AnimatedBackground.tsx
 * Deskripsi   : Komponen latar belakang animasi yang menampilkan berbagai lencana/sticker
 *               bertema pengembang (developer badges) dengan efek paralaks scroll (GSAP).
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Komponen Latar Belakang Animasi Sticker Neo-Brutalism.
 *
 * Kegunaan : Menampilkan stiker dekoratif mengapung di latar belakang halaman
 *            yang bergerak secara halus mengikuti scroll layar menggunakan GSAP ScrollTrigger.
 * Input    : Tanpa props luar.
 * Hasil    : Container <div fixed inset-0> berisi stiker-stiker paralaks.
 */
export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Menyiapkan animasi paralaks ScrollTrigger untuk setiap stiker.
   */
  useGSAP(() => {
    if (!containerRef.current) return;

    // Hormati pengaturan aksesibilitas pengguna (reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const floaters = containerRef.current.querySelectorAll('.parallax-sticker');

    floaters.forEach((sticker, index) => {
      const speed = 40 + (index % 4) * 30;
      gsap.to(sticker, {
        yPercent: -speed * 0.12,
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-neo-bg select-none">
      {/* Badge Stiker Paralaks Statis & Dekoratif Bergaya Neo-Brutalism */}

      {/* 1. Kiri Atas: Badge [DEV_MODE] */}
      <div className="parallax-sticker absolute top-24 left-6 md:left-12 px-3.5 py-1.5 bg-neo-yellow border-3 border-neo-border text-neo-text font-black text-xs uppercase tracking-wider rounded-xl shadow-brutal-sm rotate-6 hidden sm:flex items-center gap-1.5 opacity-60">
        <span className="w-2 h-2 rounded-full bg-neo-pink border border-black" />
        <span>[DEV_MODE]</span>
      </div>

      {/* 2. Kanan Atas: Badge Kode </ > */}
      <div className="parallax-sticker absolute top-28 right-8 md:right-16 px-4 py-2 bg-neo-pink text-white border-3 border-neo-border font-black text-sm uppercase tracking-wider rounded-2xl shadow-brutal-sm -rotate-6 hidden md:flex items-center gap-2 opacity-60">
        <span>&lt;/&gt;</span>
        <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-md">SRC</span>
      </div>

      {/* 3. Kiri Tengah: Pin Daya Kilat */}
      <div className="parallax-sticker absolute top-[35%] left-8 md:left-20 w-12 h-12 bg-neo-blue text-white border-3 border-neo-border font-black text-lg rounded-2xl shadow-brutal-sm rotate-12 hidden lg:flex items-center justify-center opacity-60">
        ⚡
      </div>

      {/* 4. Kanan Tengah: Badge Sintaks {BUILD_NEXT} */}
      <div className="parallax-sticker absolute top-[44%] right-8 md:right-20 px-4 py-2 bg-neo-yellow text-neo-text border-3 border-neo-border font-black text-xs uppercase tracking-widest rounded-2xl shadow-brutal-sm -rotate-12 hidden sm:flex items-center gap-1.5 opacity-60">
        <span>&#123;BUILD_NEXT&#125;</span>
      </div>

      {/* 5. Kiri Bawah: Stiker Bintang */}
      <div className="parallax-sticker absolute top-[62%] left-10 md:left-16 w-11 h-11 bg-neo-green text-white border-3 border-neo-border font-black text-base rounded-2xl shadow-brutal-sm -rotate-6 hidden md:flex items-center justify-center opacity-60">
        ★
      </div>

      {/* 6. Kanan Bawah: Pill npm run dev */}
      <div className="parallax-sticker absolute top-[64%] right-10 md:right-24 px-4 py-2 bg-neo-surface text-neo-text border-3 border-neo-border font-black text-xs uppercase tracking-wider rounded-full shadow-brutal-sm rotate-6 hidden lg:flex items-center gap-2 opacity-60">
        <span className="w-2.5 h-2.5 rounded-full bg-neo-green border border-black" />
        <span>npm run dev</span>
      </div>

      {/* 7. Paling Kiri Bawah: Badge Trofi */}
      <div className="parallax-sticker absolute bottom-12 left-12 md:left-28 w-12 h-12 bg-neo-pink text-white border-3 border-neo-border font-black text-lg rounded-full shadow-brutal-sm rotate-12 hidden sm:flex items-center justify-center opacity-60">
        🏆
      </div>

      {/* 8. Paling Kanan Bawah: Chip Biner 01001001 */}
      <div className="parallax-sticker absolute bottom-8 right-10 md:right-14 px-3.5 py-1.5 bg-neo-blue text-white border-3 border-neo-border font-mono font-black text-xs tracking-widest rounded-xl shadow-brutal-sm -rotate-3 hidden md:flex items-center opacity-60">
        01001001
      </div>

    </div>
  );
}
