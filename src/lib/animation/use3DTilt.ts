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
    const element = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Accessibility & Pointer checks: gate behind fine pointer, dekstop width & no reduced motion
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isDesktop = window.innerWidth >= 1024;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isFinePointer || !isDesktop || prefersReducedMotion) return;

      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      if (isNaN(x) || isNaN(y)) return;

      // 2. Hardware-accelerated GPU tilt
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
