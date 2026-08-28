import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import { CTAButton } from '../shared/CTAButton';
import { AnimatedSection } from '../shared/AnimatedSection';
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

  return (
    <SectionContainer id="hero" className="min-h-[85vh] lg:min-h-[95vh] flex items-center bg-transparent pt-32 pb-20 relative overflow-hidden">
      <AnimatedSection className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 max-w-3xl">
            <h2 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-slate-700 font-semibold tracking-wider text-[11px] uppercase mb-8 border border-slate-200/50 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {profile.full_name}
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-8 tracking-tighter">
              {profile.title.split(',').map((part, index, array) => (
                <span key={index} className="block mt-1">
                  {index === 0 ? (
                    <span className="text-slate-900">{part.trim()}{index < array.length - 1 ? ',' : ''}</span>
                  ) : index === 1 ? (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">{part.trim()}{index < array.length - 1 ? ',' : ''}</span>
                  ) : (
                    <span className="text-slate-500">{part.trim()}</span>
                  )}
                </span>
              ))}
            </h1>
            
            <div className="text-lg md:text-xl text-slate-500 mb-12 max-w-xl font-normal leading-relaxed tracking-tight">
              {profile.tagline}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <CTAButton href={profile.cv_file || "#cv"} variant="primary" className="shadow-[0_8px_20px_rgba(15,23,42,0.1)] bg-slate-900 hover:bg-slate-800 text-white border-transparent">Download CV</CTAButton>
              <CTAButton href="#contact" variant="secondary" className="bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm hover:bg-white text-slate-700">Contact Me</CTAButton>
            </div>

            <div className="flex items-center gap-8 bg-white/30 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-sm px-8 py-5 max-w-xl w-max">
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{yearsExp}+</div>
                <div className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">Years Exp</div>
              </div>
              <div className="w-px h-10 bg-slate-200/60"></div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{projects.length}+</div>
                <div className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">Projects</div>
              </div>
              <div className="w-px h-10 bg-slate-200/60"></div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{achievements.length}+</div>
                <div className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">Awards</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* Single soft ambient light source */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)] pointer-events-none -z-10 mix-blend-multiply"></div>
            
            {profile.profile_photo ? (
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[460px] lg:h-[460px] rounded-[2rem] overflow-hidden bg-slate-100 shrink-0 z-10 transition-transform duration-700 hover:-translate-y-2 group border-[3px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                <Image 
                  src={profile.profile_photo} 
                  alt={profile.full_name}
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 460px"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/5 pointer-events-none"></div>
              </div>
            ) : (
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[480px] lg:h-[480px] rounded-[2rem] bg-white/40 backdrop-blur-xl flex items-center justify-center border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)] shrink-0 z-10">
                <span className="text-slate-300 text-6xl">📸</span>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
