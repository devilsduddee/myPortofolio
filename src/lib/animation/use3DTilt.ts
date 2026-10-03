/**
 * File        : src/lib/animation/use3DTilt.ts
 * Deskripsi   : Hook React kustom untuk memberikan efek rotasi/kemiringan 3D interaktif (tilt)
 *               pada elemen HTML menggunakan pustaka GSAP berdasarkan pergerakan kursor mouse.
 * Perangkat   : Efek 3D tilt HANYA aktif di desktop dengan mouse presisi.
 *               Diblokir di HP dan tablet melalui 3 lapisan pengecekan:
 *               1. CSS media query: (hover: hover) and (pointer: fine)
 *               2. Deteksi layar sentuh: 'ontouchstart' di window
 *               3. Lebar layar minimum 1024px (ukuran tablet landscape ke atas)
 *               Tidak ada listener atau komputasi yang dipasang di perangkat sentuh.
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
 * Perangkat : Aktif hanya pada perangkat desktop dengan mouse presisi via capability detection (hover: hover) dan (pointer: fine).
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
    if (typeof window === 'undefined') return;

    // --- Lapisan 1: CSS Media Query ---
    // (hover: hover) artinya perangkat punya kemampuan hover (mouse)
    // (pointer: fine) artinya pointer presisi seperti mouse, bukan jari
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // --- Lapisan 2: Deteksi Layar Sentuh ---
    // Jika browser punya event 'ontouchstart', artinya perangkat sentuh (HP/tablet)
    const adalahPerangkatSentuh = 'ontouchstart' in window;

    // --- Lapisan 3: Lebar Layar Minimum ---
    // Tilt hanya aktif jika lebar layar >= 1024px (setara laptop/desktop)
    const LEBAR_LAYAR_MINIMUM_DESKTOP = 1024;
    const lebarLayarCukup = window.innerWidth >= LEBAR_LAYAR_MINIMUM_DESKTOP;

    // Pengguna yang memilih gerakan minimal (aksesibilitas) juga dikecualikan
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Jika salah satu syarat tidak terpenuhi, langsung keluar — tidak ada listener yang dipasang
    const bolehAktif = isFinePointer && !adalahPerangkatSentuh && lebarLayarCukup && !prefersReducedMotion;
    if (!bolehAktif) return;

    const element = containerRef.current;

    /**
     * Mengatur rotasi 3D elemen berdasarkan koordinat kursor mouse.
     *
     * Kegunaan : Menghitung offset kursor dari titik tengah elemen dan menjalankan animasi tilt GSAP.
     * Input    : e (PointerEvent dari pergerakan mouse kursor)
     * Hasil    : Memperbarui transformasi rotasi X dan Y elemen secara halus.
     */
    const handlePointerMove = (e: PointerEvent) => {
      // Abaikan jika pointer bukan mouse biasa (misal sentuhan jari atau pen digital)
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
     * Hasil    : Animasi reset rotasi X dan Y kembali ke 0 derajat dengan pembersihan transform total.
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
          // Bersihkan hanya properti tilt (rotateX, rotateY, perspective) agar tidak menghapus
          // properti transform lain seperti opacity/scale yang diatur oleh animasi GSAP lain
          gsap.set(element, { clearProps: 'rotateX,rotateY,perspective' });
        },
      });
    };

    // Pasang listener interaksi HANYA untuk desktop dengan fine pointer
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
      // Hanya bersihkan properti tilt, bukan semua transform
      gsap.set(element, { clearProps: 'rotateX,rotateY,perspective' });
    };
  }, { scope: containerRef });

  return containerRef;
}
