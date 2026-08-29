'use client';

import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import { motion } from 'framer-motion';
import type { Profile, Experience, Project, Achievement } from '@prisma/client';

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

  // Calculate Years of Experience
  let yearsExp = 0;
  if (experiences.length > 0) {
    const earliestDate = new Date(Math.min(...experiences.map(e => new Date(e.start_date).getTime())));
    const diffTime = Math.abs(new Date().getTime() - earliestDate.getTime());
    yearsExp = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  const textVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay } }
  });

  const photoVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.6 } }
  };

  return (
    <SectionContainer id="hero" className="min-h-[85vh] lg:min-h-[95vh] flex items-center bg-transparent pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
      <div className="w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="w-full max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
            <div>
              <motion.h2 
                initial="hidden" animate="show" variants={textVariant(0)} 
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md text-slate-300 font-semibold tracking-wider text-[11px] uppercase mb-4 border border-white/10 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {profile.full_name}
              </motion.h2>
              <motion.h1 
                initial="hidden" animate="show" variants={textVariant(0.1)} 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] md:leading-[1.05] tracking-tighter"
              >
                {profile.title.split(',').map((part, index, array) => (
                  <span key={index} className="block mt-1">
                    {index === 0 ? (
                      <span className="text-white">{part.trim()}{index < array.length - 1 ? ',' : ''}</span>
                    ) : index === 1 ? (
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{part.trim()}{index < array.length - 1 ? ',' : ''}</span>
                    ) : (
                      <span className="text-slate-400">{part.trim()}</span>
                    )}
                  </span>
                ))}
              </motion.h1>
            </div>
            
            <motion.div 
              initial="hidden" animate="show" variants={textVariant(0.2)} 
              className="text-[15px] md:text-lg lg:text-xl text-slate-300 max-w-xl font-normal leading-relaxed tracking-tight px-4 sm:px-0"
            >
              {profile.tagline}
            </motion.div>

            <motion.div 
              initial="hidden" animate="show" variants={textVariant(0.3)} 
              className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0 pt-2"
            >
              <motion.a 
                href={profile.cv_file || "#cv"} 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-3.5 md:py-3 text-white font-medium shadow-lg shadow-black/20 text-center min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.2)" }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Download CV
              </motion.a>
              <motion.a 
                href="#contact" 
                className="w-full sm:w-auto bg-transparent backdrop-blur-md border border-white/10 rounded-full px-8 py-3.5 md:py-3 text-slate-300 font-medium shadow-sm text-center min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#fff" }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Contact Me
              </motion.a>
            </motion.div>

            <motion.div 
              initial="hidden" animate="show" variants={textVariant(0.4)} 
              className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 glass-panel rounded-2xl px-4 sm:px-8 py-5 w-full max-w-[320px] sm:max-w-max mx-auto lg:mx-0 divide-x divide-white/10 mt-6"
            >
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-1 sm:px-0">
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{yearsExp}+</div>
                <div className="text-[10px] md:text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-1">Years Exp</div>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-1 sm:px-4 md:px-0">
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{projects.length}+</div>
                <div className="text-[10px] md:text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-1">Projects</div>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-1 sm:px-0 pl-1 sm:pl-4 md:pl-0">
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{achievements.length}+</div>
                <div className="text-[10px] md:text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-1">Awards</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial="hidden" animate="show" variants={photoVariant} 
            className="flex justify-center lg:justify-end relative w-full pt-4 md:pt-0"
          >
            {profile.profile_photo ? (
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl shadow-black/40"
              >
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden bg-slate-900 shrink-0 z-10">
                  <Image 
                    src={profile.profile_photo} 
                    alt={profile.full_name}
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
                    priority
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ) : (
              <div className="p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl shadow-black/40">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full bg-white/5 flex items-center justify-center shrink-0 z-10">
                  <span className="text-slate-300 text-4xl md:text-6xl">📸</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
