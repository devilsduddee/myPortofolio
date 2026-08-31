'use client';

import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import { motion } from 'framer-motion';
import type { Profile, Experience, Project, Achievement } from '@prisma/client';
import { CTAButton } from '../shared/CTAButton';
import { Download, Mail, Sparkles } from 'lucide-react';

export function HeroSection({ 
  profile, 
  experiences = [], 
  projects = [], 
  achievements = [] 
}: { 
  profile: Profile | null,
  experiences?: Experience[],
  projects?: Project[],
  achievements?: Achievement[]
}) {
  if (!profile) return null;

  // Calculate Years of Experience dynamically from database records
  let yearsExp = 0;
  if (experiences.length > 0) {
    const earliestDate = new Date(Math.min(...experiences.map(e => new Date(e.start_date).getTime())));
    const diffTime = Math.abs(new Date().getTime() - earliestDate.getTime());
    yearsExp = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  // Parse title into tags if comma-separated or keep clean
  const titleItems = profile.title ? profile.title.split(',').map(t => t.trim()) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } 
    }
  };

  return (
    <SectionContainer id="hero" className="pt-6 md:pt-12 pb-14 md:pb-20 relative overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full relative z-10"
      >
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Info (7 cols desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Candidate Name Sticker Badge */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neo-yellow text-neo-text font-black tracking-wider text-xs uppercase border-3 border-neo-border shadow-brutal-sm"
            >
              <Sparkles className="w-4 h-4 text-neo-pink stroke-[3]" />
              <span>{profile.full_name}</span>
            </motion.div>

            {/* Candidate Name Heading */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text uppercase tracking-tight leading-[1.08]">
                {profile.full_name}
              </h1>

              {/* Dynamic Professional Titles (Pill Badges or Clean Subheading) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                {titleItems.map((item, idx) => (
                  <span 
                    key={idx}
                    className={`px-4 py-2 rounded-2xl border-3 border-neo-border shadow-brutal-sm font-black text-sm sm:text-base uppercase tracking-tight ${
                      idx === 0 
                        ? 'bg-neo-blue text-white' 
                        : idx === 1 
                        ? 'bg-neo-yellow text-neo-text' 
                        : 'bg-neo-pink text-white'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tagline */}
            {profile.tagline && (
              <motion.p 
                variants={itemVariants} 
                className="text-base sm:text-lg text-neo-muted max-w-xl font-medium leading-relaxed pt-1"
              >
                {profile.tagline}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
            >
              {profile.cv_file && (
                <CTAButton 
                  href={profile.cv_file} 
                  variant="primary" 
                  className="w-full sm:w-auto gap-2"
                  target="_blank"
                >
                  <Download className="w-5 h-5 stroke-[3]" />
                  Download CV
                </CTAButton>
              )}

              <CTAButton 
                href="#contact" 
                variant="secondary" 
                className="w-full sm:w-auto gap-2"
              >
                <Mail className="w-5 h-5 stroke-[3]" />
                Contact Me
              </CTAButton>
            </motion.div>

            {/* Dynamic Stat Box */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 bg-neo-surface border-4 border-neo-border shadow-brutal rounded-[20px] p-4 sm:p-5 w-full max-w-md mt-4 divide-x-2 sm:divide-x-3 divide-neo-border"
            >
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span className="text-2xl sm:text-3xl font-black text-neo-blue">{yearsExp}+</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-neo-text mt-0.5">Years Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span className="text-2xl sm:text-3xl font-black text-neo-pink">{projects.length}+</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-neo-text mt-0.5">Projects</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span className="text-2xl sm:text-3xl font-black text-neo-green">{achievements.length}+</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-neo-text mt-0.5">Awards</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Profile Image / Avatar Box (5 cols desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-[440px]"
            >
              {/* Outer Neo Brutalist Frame */}
              <div className="relative p-3.5 bg-neo-yellow border-4 border-neo-border shadow-brutal-lg rounded-[32px] hover:rotate-1 transition-transform duration-300">
                
                {/* Floating Corner Accent Badge */}
                <div className="absolute -top-4 -right-3 z-20 bg-neo-pink text-white font-black text-xs uppercase px-3.5 py-1.5 rounded-full border-3 border-neo-border shadow-brutal-sm flex items-center gap-1.5 rotate-3 hover:rotate-12 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 stroke-[3]" />
                  <span>PROFILE</span>
                </div>

                {/* Inner Image Box with Portrait Aspect Ratio */}
                <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[480px] rounded-[24px] overflow-hidden bg-neo-surface border-4 border-neo-border shrink-0 flex items-center justify-center">
                  {profile.profile_photo ? (
                    <Image 
                      src={profile.profile_photo} 
                      alt={profile.full_name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 440px"
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-neo-surface flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-24 h-24 bg-neo-blue text-white rounded-full border-4 border-neo-border flex items-center justify-center text-4xl font-black mb-4 shadow-brutal">
                        {profile.full_name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-base font-black text-neo-text uppercase tracking-wider">
                        {profile.full_name}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>


        </div>
      </motion.div>
    </SectionContainer>
  );
}



