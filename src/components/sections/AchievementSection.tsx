'use client';

import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AchievementCard } from '../shared/AchievementCard';
import type { Achievement } from '@prisma/client';
import { motion } from 'framer-motion';

export function AchievementSection({ achievements }: { achievements: Achievement[] }) {
  if (!achievements || achievements.length === 0) return null;

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SectionContainer id="achievements">
      <SectionHeader title="Achievements" subtitle="Recognitions & Certifications" />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {achievements.map((achievement) => (
          <motion.div key={achievement.id} variants={itemVariants}>
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}

