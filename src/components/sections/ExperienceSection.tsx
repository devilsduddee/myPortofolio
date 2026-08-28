import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedSection } from '../shared/AnimatedSection';
import { Timeline } from '../shared/Timeline';
import type { Experience } from '@prisma/client';
import { format } from 'date-fns';

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) return null;

  const mappedItems = experiences.map((exp) => ({
    position: exp.position,
    company: exp.company_name,
    period: `${format(new Date(exp.start_date), 'MMM yyyy')} - ${exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : 'Present'}`,
    description: exp.description
  }));

  return (
    <SectionContainer id="experience">
      <AnimatedSection>
        <SectionHeader title="Experience" subtitle="My professional journey" />
        <Timeline items={mappedItems} />
      </AnimatedSection>
    </SectionContainer>
  );
}
