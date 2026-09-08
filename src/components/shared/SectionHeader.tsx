'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function SectionHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.header-char');
    const badge = containerRef.current.querySelector('.header-badge');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 88%',
        toggleActions: 'play none play none',
      },
    });

    if (chars.length > 0) {
      tl.fromTo(
        chars,
        { opacity: 0, y: 20, rotate: (i) => (i % 2 === 0 ? -4 : 4), scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.015,
          ease: 'back.out(1.8)',
        }
      );
    }

    if (badge) {
      tl.fromTo(
        badge,
        { opacity: 0, scale: 0.9, x: -12 },
        { opacity: 1, scale: 1, x: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mb-8 md:mb-12 flex flex-col items-start gap-3 select-none">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-neo-text uppercase bg-neo-yellow border-4 border-neo-border px-6 py-2 shadow-[6px_6px_0px_#000000] inline-flex flex-wrap gap-x-[0.2em]">
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="header-char inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="header-badge mt-1 text-xs md:text-sm text-neo-muted font-bold uppercase tracking-wider bg-neo-surface border-2 border-neo-border/50 px-3 py-1 rounded-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

