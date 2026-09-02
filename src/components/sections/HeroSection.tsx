'use client';

import { useRef } from 'react';

import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import type { Profile, Experience, Project, Achievement } from '@prisma/client';
import { CTAButton } from '../shared/CTAButton';
import { Download, Mail, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}


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
  const containerRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const awardsRef = useRef<HTMLSpanElement>(null);

  // Calculate Years of Experience dynamically from database records
  let yearsExp = 0;
  if (experiences.length > 0) {
    const earliestDate = new Date(Math.min(...experiences.map(e => new Date(e.start_date).getTime())));
    const diffTime = Math.abs(new Date().getTime() - earliestDate.getTime());
    yearsExp = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  // Parse title into tags if comma-separated or keep clean
  const titleItems = profile?.title ? profile.title.split(',').map(t => t.trim()) : [];

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Neo Brutalist Entrance Stagger Animation
    tl.fromTo(
      '.hero-badge',
      { opacity: 0, y: -25, scale: 0.8, rotate: -4 },
      { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)' }
    )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      .fromTo(
        '.hero-tag',
        { opacity: 0, y: 25, scale: 0.85, rotate: (i) => (i % 2 === 0 ? -3 : 3) },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(
        '.hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(
        '.hero-stats',
        { opacity: 0, y: 35, scale: 0.9, rotate: 2 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(
        '.hero-image-frame',
        { opacity: 0, scale: 0.8, rotate: -6 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.8)' },
        '-=0.8'
      );


    // Number Counter Animation
    const counterObj = { years: 0, projects: 0, awards: 0 };
    gsap.to(counterObj, {
      years: yearsExp,
      projects: projects.length,
      awards: achievements.length,
      duration: 1.8,
      delay: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        if (yearsRef.current) yearsRef.current.innerText = `${Math.floor(counterObj.years)}+`;
        if (projectsRef.current) projectsRef.current.innerText = `${Math.floor(counterObj.projects)}+`;
        if (awardsRef.current) awardsRef.current.innerText = `${Math.floor(counterObj.awards)}+`;
      },
    });

    // 3D Mouse Tilt Parallax Effect on Profile Image Frame & Floating Accent (Scoped exclusively to Hero Section)
    const imageFrame = containerRef.current.querySelector<HTMLElement>('.hero-image-frame');
    const profileAccent = containerRef.current.querySelector<HTMLElement>('.hero-profile-accent');

    if (imageFrame && containerRef.current) {
      const heroContainer = containerRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const heroRect = heroContainer.getBoundingClientRect();

        if (!heroRect.width || !heroRect.height) return;

        const frameRect = imageFrame.getBoundingClientRect();
        const frameCenterX = frameRect.left + frameRect.width / 2;
        const frameCenterY = frameRect.top + frameRect.height / 2;

        // Normalized vectors relative to frame center inside hero section
        const x = (e.clientX - frameCenterX) / (heroRect.width / 2);
        const y = (e.clientY - frameCenterY) / (heroRect.height / 2);

        // Safety check for NaN values
        if (isNaN(x) || isNaN(y)) return;

        // Main frame 3D tilt
        gsap.to(imageFrame, {
          rotateY: x * 24,
          rotateX: -y * 24,
          x: x * 18,
          y: y * 18,
          transformPerspective: 750,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Floating accent sticker badge counter parallax depth
        if (profileAccent) {
          gsap.to(profileAccent, {
            x: -x * 12,
            y: -y * 12,
            rotate: 3 + x * 8,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      };

      const handleReset = () => {
        gsap.to(imageFrame, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'elastic.out(1.1, 0.4)',
        });

        if (profileAccent) {
          gsap.to(profileAccent, {
            x: 0,
            y: 0,
            rotate: 3,
            duration: 0.8,
            ease: 'elastic.out(1.1, 0.4)',
          });
        }
      };

      // 1. Mousemove and Mouseleave event listeners attached ONLY to heroContainer
      heroContainer.addEventListener('mousemove', handleMouseMove);
      heroContainer.addEventListener('mouseleave', handleReset);

      // 2. ScrollTrigger to automatically reset to initial state when scrolling past Hero section
      const st = ScrollTrigger.create({
        trigger: heroContainer,
        start: 'top top',
        end: 'bottom top',
        onLeave: handleReset,
        onLeaveBack: handleReset,
      });

      return () => {
        heroContainer.removeEventListener('mousemove', handleMouseMove);
        heroContainer.removeEventListener('mouseleave', handleReset);
        st.kill();
      };
    }



  }, { scope: containerRef });


  if (!profile) return null;

  return (
    <SectionContainer id="hero" className="pt-6 md:pt-12 pb-14 md:pb-20 relative overflow-hidden">
      <div ref={containerRef} className="w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Info (7 cols desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Candidate Name Sticker Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neo-yellow text-neo-text font-black tracking-wider text-xs uppercase border-3 border-neo-border shadow-brutal-sm">
              <Sparkles className="w-4 h-4 text-neo-pink stroke-[3]" />
              <span>{profile.full_name}</span>
            </div>

            {/* Candidate Name Heading */}
            <div className="space-y-3 w-full">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text uppercase tracking-tight leading-[1.08]">
                {profile.full_name}
              </h1>

              {/* Dynamic Professional Titles (Pill Badges or Clean Subheading) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                {titleItems.map((item, idx) => (
                  <span 
                    key={idx}
                    className={`hero-tag px-4 py-2 rounded-2xl border-3 border-neo-border shadow-brutal-sm font-black text-sm sm:text-base uppercase tracking-tight ${
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
            </div>

            {/* Tagline */}
            {profile.tagline && (
              <p className="hero-tagline text-base sm:text-lg text-neo-muted max-w-xl font-medium leading-relaxed pt-1">
                {profile.tagline}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
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
            </div>

            {/* Dynamic Stat Box */}
            <div className="hero-stats grid grid-cols-3 gap-3 sm:gap-6 bg-neo-surface border-4 border-neo-border shadow-brutal rounded-[20px] p-4 sm:p-5 w-full max-w-md mt-4 divide-x-2 sm:divide-x-3 divide-neo-border">
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span ref={yearsRef} className="text-2xl sm:text-3xl font-black text-neo-blue">0+</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-neo-text mt-0.5">Years Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span ref={projectsRef} className="text-2xl sm:text-3xl font-black text-neo-pink">0+</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-neo-text mt-0.5">Projects</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span ref={awardsRef} className="text-2xl sm:text-3xl font-black text-neo-green">0+</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-neo-text mt-0.5">Awards</span>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Image / Avatar Box (5 cols desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="hero-image-frame relative w-full max-w-[440px]">
              {/* Outer Neo Brutalist Frame */}
              <div className="relative p-3.5 bg-neo-yellow border-4 border-neo-border shadow-brutal-lg rounded-[32px] hover:rotate-1 transition-transform duration-300">
                
                {/* Floating Corner Accent Badge */}
                <div className="hero-profile-accent absolute -top-4 -right-3 z-20 bg-neo-pink text-white font-black text-xs uppercase px-3.5 py-1.5 rounded-full border-3 border-neo-border shadow-brutal-sm flex items-center gap-1.5 rotate-3 transition-transform">
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
            </div>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
}




