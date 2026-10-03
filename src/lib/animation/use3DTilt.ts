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
 *            Memastikan elemen selalu kembali ke posisi netral (rotateX: 0, rotateY: 0) saat interaksi berakhir.
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
    resetDuration = 0.5,
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;

    // Strategi Deteksi: Jangan pasang listener pada perangkat layar sentuh atau preferensi reduced motion
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || !isDesktop || prefersReducedMotion) return;

    const element = containerRef.current;

    /**
     * Mengatur rotasi 3D elemen berdasarkan koordinat kursor mouse.
     *
     * Kegunaan : Menghitung offset kursor dari titik tengah elemen dan menjalankan animasi tilt GSAP.
     * Input    : e (PointerEvent atau MouseEvent dari pergerakan mouse)
     * Hasil    : Memperbarui transformasi rotasi X dan Y elemen secara halus.
     */
    const handlePointerMove = (e: PointerEvent) => {
      // Abaikan jika pointer bukan mouse biasa (misal sentuhan jari atau pen)
      if (e.pointerType && e.pointerType !== 'mouse') return;

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
        overwrite: true,
      });
    };

    /**
     * Mengembalikan rotasi elemen ke posisi netral (0, 0).
     *
     * Kegunaan : Menghilangkan efek tilt dan memastikan transform dibersihkan sempurna ke posisi semula.
     * Input    : Tidak ada
     * Hasil    : Animasi reset rotasi X dan Y kembali ke 0 derajat dengan pembersihan active tween.
     */
    const resetTilt = () => {
      gsap.killTweensOf(element);

      gsap.to(element, {
        rotateY: 0,
        rotateX: 0,
        duration: resetDuration,
        ease: 'power2.out',
        overwrite: true,
        onComplete: () => {
          // Bersihkan style inline rotate jika sudah kembali netral agar tidak meninggalkan transform residu
          gsap.set(element, { clearProps: 'rotateX,rotateY' });
        },
      });
    };

    // Gunakan pointer events untuk penanganan kursor yang lebih andal di semua browser modern
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', resetTilt);
    element.addEventListener('pointercancel', resetTilt);
    element.addEventListener('mouseleave', resetTilt);
    window.addEventListener('blur', resetTilt);

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', resetTilt);
      element.removeEventListener('pointercancel', resetTilt);
      element.removeEventListener('mouseleave', resetTilt);
      window.removeEventListener('blur', resetTilt);
      gsap.killTweensOf(element);
      gsap.set(element, { clearProps: 'rotateX,rotateY' });
    };
  }, { scope: containerRef });

  return containerRef;
}
