'use client';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedSection } from '../shared/AnimatedSection';
import { AchievementCard } from '../shared/AchievementCard';
import type { Achievement } from '@prisma/client';
import { motion } from 'framer-motion';

export function AchievementSection({ achievements }: { achievements: Achievement[] }) {
  if (!achievements || achievements.length === 0) return null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SectionContainer id="achievements">
      <AnimatedSection>
        <SectionHeader title="Achievements" subtitle="Recognitions and certifications" />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {achievements.map((achievement) => (
            <motion.div key={achievement.id} variants={item}>
              <AchievementCard achievement={achievement} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </SectionContainer>
  );
}
