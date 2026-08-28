import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedSection } from '../shared/AnimatedSection';
import { ProjectCard } from '../shared/ProjectCard';
import type { Project } from '@prisma/client';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <SectionContainer id="projects" className="bg-transparent relative">
      <AnimatedSection>
        <SectionHeader title="My Projects" subtitle="Project I’ve Built" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
