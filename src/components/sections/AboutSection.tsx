'use client';

import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { motion } from 'framer-motion';
import type { Profile } from '@prisma/client';
import { Sparkles } from 'lucide-react';

export function AboutSection({ profile }: { profile: Profile | null }) {
  if (!profile || !profile.about_me) return null;

  return (
    <SectionContainer id="about">
      <SectionHeader title="About Me" subtitle="Professional Summary" />
      
      <div className="mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neo-surface border-4 border-neo-border p-6 sm:p-8 lg:p-12 rounded-[20px] shadow-brutal brutal-card-hover relative"
        >
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-neo-yellow border-3 border-neo-border px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6 shadow-brutal-sm">
            <Sparkles className="w-4 h-4 stroke-[3] text-neo-text" />
            <span>Profile Summary</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-neo-text uppercase tracking-tight mb-4">
            {profile.full_name} — {profile.title}
          </h3>

          <div className="text-neo-text text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
            {profile.about_me}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}


