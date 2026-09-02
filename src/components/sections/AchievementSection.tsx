'use client';

import { useRef } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AchievementCard } from '../shared/AchievementCard';
import type { Achievement } from '@prisma/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AchievementSection({ achievements }: { achievements: Achievement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.achievement-card-wrapper');
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 60, 
            scale: 0.9, 
            rotate: 0 
          },

          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.75,
            delay: (index % 3) * 0.12,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none play reset',
            },
          }
        );
      });
    }
  }, { scope: containerRef });


  if (!achievements || achievements.length === 0) return null;

  return (
    <SectionContainer id="achievements">
      <SectionHeader title="Achievements" subtitle="Recognitions & Certifications" />
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8"
      >
        {achievements.map((achievement) => (
          <div key={achievement.id} className="achievement-card-wrapper">
            <AchievementCard achievement={achievement} />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}


