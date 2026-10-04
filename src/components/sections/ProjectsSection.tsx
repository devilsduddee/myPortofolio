/**
 * File        : src/components/sections/ProjectsSection.tsx
 * Deskripsi   : Komponen section daftar karya proyek (Projects) dalam tata letak kisi (grid).
 */

'use client';

import { useRef } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { ProjectCard } from '../shared/ProjectCard';
import type { Project } from '@prisma/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Komponen Section Daftar Proyek Publik.
 *
 * Kegunaan : Menampilkan daftar kartu proyek (<ProjectCard>) dalam kisi responsif dengan animasi stagger.
 * Input    : projects (Array data proyek dari Prisma)
 * Hasil    : Blok section <ProjectsSection>.
 */
export function ProjectsSection({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = containerRef.current.querySelectorAll('.project-card-wrapper');

    if (prefersReducedMotion) {
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotate: 0 });
      }
      return;
    }

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
              toggleActions: 'play none play none',
            },
          }
        );
      });
    }
  }, { scope: containerRef });

  if (!projects || projects.length === 0) return null;

  return (
    <SectionContainer id="projects">
      <SectionHeader title="Projects" subtitle="Selected Work & Products" />
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 xl:gap-8 mt-6 lg:mt-8"
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card-wrapper"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
