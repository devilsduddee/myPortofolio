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

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <SectionContainer id="hero" className="min-h-[85vh] lg:min-h-[95vh] flex items-center bg-transparent pt-32 pb-20 relative overflow-hidden">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 max-w-3xl">
            <motion.h2 variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md text-slate-300 font-semibold tracking-wider text-[11px] uppercase mb-8 border border-white/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {profile.full_name}
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tighter">
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
            
            <motion.div variants={fadeInUp} className="text-lg md:text-xl text-slate-400 mb-12 max-w-xl font-normal leading-relaxed tracking-tight">
              {profile.tagline}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-16">
              <a href={profile.cv_file || "#cv"} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all shadow-lg shadow-black/20">
                Download CV
              </a>
              <a href="#contact" className="bg-transparent backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-slate-300 font-medium hover:bg-white/5 hover:text-white hover:scale-105 transition-all">
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-8 glass-panel rounded-2xl px-8 py-5 max-w-xl w-max">
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-white tracking-tight">{yearsExp}+</div>
                <div className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">Years Exp</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-white tracking-tight">{projects.length}+</div>
                <div className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">Projects</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-white tracking-tight">{achievements.length}+</div>
                <div className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">Awards</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeInUp} className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {profile.profile_photo ? (
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl shadow-black/40 transition-transform duration-700 hover:scale-105">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden bg-slate-900 shrink-0 z-10">
                  <Image 
                    src={profile.profile_photo} 
                    alt={profile.full_name}
                    fill
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl shadow-black/40">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full bg-white/5 flex items-center justify-center shrink-0 z-10">
                  <span className="text-slate-300 text-6xl">📸</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
