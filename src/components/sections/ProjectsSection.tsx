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

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.project-card-wrapper');
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


  if (!projects || projects.length === 0) return null;

  return (
    <SectionContainer id="projects">
      <SectionHeader title="Projects" subtitle="Selected Work & Products" />
      
      {/* Clean Bento / Uniform Grid Layout with GSAP Stagger */}
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8"
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



