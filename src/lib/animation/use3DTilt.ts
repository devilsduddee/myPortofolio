/**
 * File        : src/lib/animation/use3DTilt.ts
 * Deskripsi   : Hook React kustom untuk memberikan efek rotasi/kemiringan 3D interaktif (tilt)
 *               pada elemen HTML menggunakan pustaka GSAP berdasarkan pergerakan kursor mouse.
 * Perangkat   : Efek 3D tilt hanya diaktifkan pada perangkat desktop dengan kursor presisi (pointer: fine).
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface Use3DTiltOptions {
  maxTiltX?: number;
  maxTiltY?: number;
  transformPerspective?: number;
  duration?: number;
  resetDuration?: number;
}

/**
 * Hook custom untuk memberikan efek kemiringan 3D (tilt) interaktif saat kursor diarahkan ke elemen.
 *
 * Kegunaan : Menghitung posisi kursor terhadap elemen lalu memutar elemen secara 3D (GSAP).
 * Perangkat : Aktif hanya pada perangkat desktop dengan mouse presisi (pointer: fine).
 * Input    : options (Ukuran sudut kemiringan maksimal, durasi animasi, dan perspektif)
 * Hasil    : React Ref (containerRef) yang harus dipasangkan pada elemen HTML target.
 */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>(options: Use3DTiltOptions = {}) {
  const containerRef = useRef<T>(null);

  const {
    maxTiltX = 10,
    maxTiltY = 10,
    transformPerspective = 800,
    duration = 0.3,
    resetDuration = 0.7,
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;

    // Strategi Deteksi: Jangan pasang listener mousemove pada perangkat sentuh (pointer: coarse)
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || !isDesktop || prefersReducedMotion) return;

    const element = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      if (isNaN(x) || isNaN(y)) return;

      gsap.to(element, {
        rotateY: x * maxTiltX,
        rotateX: -y * maxTiltY,
        transformPerspective,
        duration,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateY: 0,
        rotateX: 0,
        duration: resetDuration,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef });

  return containerRef;
}
