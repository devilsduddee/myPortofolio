'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Project } from '@prisma/client';
import { Terminal } from 'lucide-react';

export function TechMarquee({ projects = [] }: { projects?: Project[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Extract all unique tech stack tags from real database project records
  const allTechs = Array.from(
    new Set(
      projects
        .flatMap(p => (p.tech_stack ? p.tech_stack.split(/[,|•]/).map(t => t.trim().toUpperCase()) : []))
        .filter(Boolean)
    )
  );

  useGSAP(() => {
    if (!trackRef.current || allTechs.length === 0) return;

    // Infinite GSAP Marquee Loop
    const totalWidth = trackRef.current.scrollWidth / 2;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: Math.max(7, allTechs.length * 1.4),
      ease: 'none',
      repeat: -1,
    });
  }, { scope: marqueeRef, dependencies: [allTechs] });

  if (allTechs.length === 0) return null;

  const bgColors = ['bg-neo-blue text-white', 'bg-neo-yellow text-neo-text', 'bg-neo-pink text-white', 'bg-neo-green text-white'];

  return (
    <div 
      ref={marqueeRef}
      className="w-full overflow-hidden bg-neo-surface border-y-4 border-neo-border py-4 relative z-20 select-none shadow-brutal-sm"
    >
      <div ref={trackRef} className="flex whitespace-nowrap gap-4 w-max">
        {/* Double the list for smooth seamless looping */}
        {[...allTechs, ...allTechs].map((techName, idx) => {
          const colorClass = bgColors[idx % bgColors.length];
          return (
            <div 
              key={idx}
              className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl border-3 border-neo-border shadow-brutal-sm font-black text-xs sm:text-sm uppercase tracking-wider ${colorClass} hover:-translate-y-0.5 hover:rotate-1 transition-transform`}
            >
              <Terminal className="w-4 h-4 stroke-[3]" />
              <span>{techName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

