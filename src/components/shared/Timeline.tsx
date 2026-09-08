'use client';

import { useRef } from 'react';
import { Building2, Calendar, CheckCircle2, Briefcase } from 'lucide-react';
import { use3DTilt } from '@/lib/animation/use3DTilt';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface TimelineItemProps {
  position: string;
  company: string;
  period: string;
  description: string;
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Dynamic Vertical Line Progress Fill on Scroll
    if (lineProgressRef.current) {
      gsap.fromTo(
        lineProgressRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        }
      );
    }

    // 2. Timeline Item Stagger Reveal with Elastic Pop
    const timelineItems = containerRef.current.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      const nodeBadge = item.querySelector('.timeline-node-badge');
      const card = item.querySelector('.timeline-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none play none',
        },
      });

      if (nodeBadge) {
        tl.fromTo(
          nodeBadge,
          { scale: 0, rotation: -45, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }
        );
      }

      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, x: 45, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.65, ease: 'back.out(1.5)' },
          '-=0.3'
        );
      }
    });

  }, { scope: containerRef });

  const badgeColors = [
    { bg: 'bg-neo-yellow text-neo-text', tag: 'bg-neo-pink text-white' },
    { bg: 'bg-neo-blue text-white', tag: 'bg-neo-yellow text-neo-text' },
    { bg: 'bg-neo-pink text-white', tag: 'bg-neo-blue text-white' },
    { bg: 'bg-neo-green text-white', tag: 'bg-neo-pink text-white' },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-6 pb-8">
      
      {/* Start Header Badge */}
      <div className="flex items-center gap-3 mb-8">
        <div className="px-5 py-2.5 bg-neo-yellow border-3 border-neo-border shadow-brutal-sm rounded-2xl text-xs sm:text-sm font-black uppercase text-neo-text tracking-wider inline-flex items-center gap-2">
          <Briefcase className="w-4.5 h-4.5 text-neo-pink stroke-[2.5]" />
          <span>Career Milestone Journey</span>
        </div>
      </div>


      {/* Main Timeline Container with Dynamic Animated Progress Line */}
      <div ref={containerRef} className="relative pl-6 sm:pl-12 ml-6 sm:ml-6">
        
        {/* Background Track Line */}
        <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-neo-border/20 rounded-full" />
        
        {/* Animated Progress Fill Line (GSAP Scrub) */}
        <div 
          ref={lineProgressRef} 
          className="absolute left-0 top-3 w-1.5 bg-neo-yellow border-x border-neo-border rounded-full" 
        />

        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => {
            const colorScheme = badgeColors[index % badgeColors.length];
            const isPresent = item.period.toLowerCase().includes('present');

            return (
              <div 
                key={index} 
                className="timeline-item relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Timeline Node Badge Icon (Positioned over vertical line) */}
                <div className="timeline-node-badge absolute -left-[2.35rem] sm:-left-[3.85rem] top-2 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-neo-surface border-4 border-neo-border shadow-brutal flex items-center justify-center shrink-0 z-20 group-hover:bg-neo-yellow group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="font-black text-sm text-neo-text">#{index + 1}</span>
                </div>

                {/* Connecting Horizontal Stem */}
                <div className="absolute -left-6 sm:-left-12 top-7 w-6 sm:w-12 h-1 bg-neo-border z-10" />

                {/* Experience Card with 3D Tilt */}
                <div className="timeline-card w-full bg-neo-surface border-4 border-neo-border shadow-brutal hover:shadow-brutal-lg rounded-[24px] p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card">
                  
                  {/* Top Right Sticker Tag (Only shown if CURRENT ROLE to avoid milestone repetition) */}
                  {isPresent && (
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-1.5">
                      <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-xl border-2 border-neo-border shadow-[2px_2px_0px_#000000] bg-neo-pink text-white rotate-2">
                        🔥 CURRENT ROLE
                      </span>
                    </div>
                  )}

                  {/* Header Area */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pr-0 sm:pr-24">
                    <div>
                      <h3 className="font-black text-2xl sm:text-3xl text-neo-text uppercase tracking-tight group-hover/card:text-neo-blue transition-colors">
                        {item.position}
                      </h3>
                      
                      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 mt-2.5 rounded-xl border-2 border-neo-border shadow-[2px_2px_0px_#000000] font-black text-xs uppercase tracking-wider ${colorScheme.bg}`}>
                        <Building2 className="w-4 h-4 stroke-[2.5]" />
                        <span>{item.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date Period Badge */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-neo-bg text-neo-text border-2 border-neo-border shadow-[2px_2px_0px_#000000] font-black text-xs uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-neo-pink stroke-[2.5]" />
                    <span>{item.period}</span>
                  </div>

                  {/* Description Body */}
                  <div className="border-t-3 border-neo-border/20 pt-4">
                    <p className="text-neo-muted text-sm sm:text-base leading-relaxed font-medium tracking-tight">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            );

          })}
        </div>
      </div>

      {/* End Cap Node */}
      <div className="flex items-center gap-4 mt-8 ml-6 sm:ml-6 pl-6 sm:pl-12 relative">
        <div className="absolute -left-[0.65rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neo-green border-3 border-neo-border shadow-[2px_2px_0px_#000000] animate-ping opacity-75" />
        <div className="absolute -left-[0.65rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neo-green border-3 border-neo-border shadow-[2px_2px_0px_#000000]" />
        <div className="px-5 py-2 bg-neo-surface border-3 border-neo-border shadow-brutal-sm rounded-2xl text-xs sm:text-sm font-black uppercase text-neo-text tracking-wider inline-flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-neo-green stroke-[3]" />
          <span>Present & Growing</span>
        </div>
      </div>

    </div>
  );
}



