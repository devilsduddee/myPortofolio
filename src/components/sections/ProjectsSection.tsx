'use client';

import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { ProjectCard } from '../shared/ProjectCard';
import type { Project } from '@prisma/client';
import { motion } from 'framer-motion';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SectionContainer id="projects">
      <SectionHeader title="Projects" subtitle="Selected Work & Products" />
      
      {/* Clean Uniform Grid Layout for Any Number of Projects */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            variants={itemVariants}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}


