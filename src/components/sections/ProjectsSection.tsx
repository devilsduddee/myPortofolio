'use client';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedSection } from '../shared/AnimatedSection';
import { ProjectCard } from '../shared/ProjectCard';
import type { Project } from '@prisma/client';
import { motion } from 'framer-motion';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SectionContainer id="projects" className="bg-transparent relative">
      <AnimatedSection>
        <SectionHeader title="My Projects" subtitle="Project I’ve Built" />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </SectionContainer>
  );
}
