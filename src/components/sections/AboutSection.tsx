'use client';

import { useRef } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import type { Profile } from '@prisma/client';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AboutSection({ profile }: { profile: Profile | null }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 35, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none play reset',
        },
      }
    );
  }, { scope: cardRef });

  if (!profile || !profile.about_me) return null;

  return (
    <SectionContainer id="about">
      <SectionHeader title="About Me" subtitle="Professional Summary" />
      
      <div className="mt-8">
        <div 
          ref={cardRef}
          className="bg-neo-surface border-4 border-neo-border p-6 sm:p-8 lg:p-12 rounded-[20px] shadow-brutal brutal-card-hover relative"
        >
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-neo-yellow border-3 border-neo-border px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6 shadow-brutal-sm">
            <Sparkles className="w-4 h-4 stroke-[3] text-neo-text" />
            <span>Profile Summary</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-neo-text uppercase tracking-tight mb-4">
            {profile.full_name} — {profile.title}
          </h3>

          <div className="text-neo-text text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
            {profile.about_me}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}



