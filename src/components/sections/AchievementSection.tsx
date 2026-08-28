import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedSection } from '../shared/AnimatedSection';
import { AchievementCard } from '../shared/AchievementCard';
import type { Achievement } from '@prisma/client';

export function AchievementSection({ achievements }: { achievements: Achievement[] }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <SectionContainer id="achievements">
      <AnimatedSection>
        <SectionHeader title="Achievements" subtitle="Recognitions and certifications" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
