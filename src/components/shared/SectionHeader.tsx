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
        toggleActions: 'play none play reset',
      },
    });

    if (chars.length > 0) {
      tl.fromTo(
        chars,
        { opacity: 0, y: 30, rotate: (i) => (i % 2 === 0 ? -6 : 6), scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.035,
          ease: 'back.out(2.2)',
        }
      );
    }

    if (badge) {
      tl.fromTo(
        badge,
        { opacity: 0, scale: 0.8, x: -20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: 'back.out(1.8)' },
        '-=0.3'
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mb-8 md:mb-12 flex flex-col items-start gap-3 select-none">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neo-text uppercase bg-neo-yellow border-4 border-neo-border px-6 py-2 shadow-[6px_6px_0px_#000000] inline-flex flex-wrap gap-x-[0.25em]">
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
        <p className="header-badge mt-2 text-sm md:text-base lg:text-lg text-neo-text font-bold uppercase tracking-wider bg-neo-surface border-2 border-neo-border px-4 py-1.5 shadow-[4px_4px_0px_#000000]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

