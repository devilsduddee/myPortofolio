/**
 * File        : src/components/sections/HeroSection.tsx
 * Deskripsi   : Komponen Hero Section utama pada halaman depan portofolio.
 *               Menampilkan nama kandidat, tag gelar profesional, tagline, tombol aksis utama,
 *               penghitung statistik pengalamam & proyek, serta foto profil dengan efek tilt 3D.
 * Kontras     : Dioptimalkan khusus untuk layar laptop 14 inch (1366x768, 1440x900, 1536x864) dan desktop (1920x1080).
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import type { Profile, Experience, Project, Achievement } from '@prisma/client';
import { CTAButton } from '../shared/CTAButton';
import { Download, Mail } from 'lucide-react';
import { use3DTilt } from '@/lib/animation/use3DTilt';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Komponen Hero Section Utama Publik.
 *
 * Kegunaan : Menampilkan bagian pembuka portofolio yang atraktif dengan animasi GSAP,
 *            statistik angka dinamis, serta bingkai foto bertema Neo-Brutalism.
 * Input    : profile (Data profil kandidat), experiences (Daftar pengalaman),
 *            projects (Daftar proyek), achievements (Daftar pencapaian)
 * Hasil    : Elemen Hero Section lengkap dengan kontras dan hierarki visual yang tajam.
 */
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
  const imageFrameRef = use3DTilt<HTMLDivElement>({ maxTiltX: 14, maxTiltY: 14 });
  const yearsRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const awardsRef = useRef<HTMLSpanElement>(null);

  // Menghitung total tahun pengalaman secara dinamis berdasarkan tanggal entri terkecil
  let yearsExp = 0;
  if (experiences.length > 0) {
    const earliestDate = new Date(Math.min(...experiences.map(e => new Date(e.start_date).getTime())));
    const diffTime = Math.abs(new Date().getTime() - earliestDate.getTime());
    yearsExp = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  // Memecah string judul profesional menjadi array tag jika dipisahkan koma
  const titleItems = profile?.title ? profile.title.split(',').map(t => t.trim()) : [];

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(['.hero-title', '.hero-tag', '.hero-tagline', '.hero-cta', '.hero-stats', '.hero-image-frame'], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      '.hero-title',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.4)' }
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

    // Animasi angka statistik saat kotak statistik masuk ke area viewport
    const counterObj = { years: 0, projects: 0, awards: 0 };
    gsap.to(counterObj, {
      years: yearsExp,
      projects: projects.length,
      awards: achievements.length,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.hero-stats',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (yearsRef.current) yearsRef.current.innerText = `${Math.floor(counterObj.years)}+`;
        if (projectsRef.current) projectsRef.current.innerText = `${Math.floor(counterObj.projects)}+`;
        if (awardsRef.current) awardsRef.current.innerText = `${Math.floor(counterObj.awards)}+`;
      },
    });

  }, { scope: containerRef });

  if (!profile) return null;

  return (
    <SectionContainer id="hero" className="pt-6 md:pt-12 pb-14 md:pb-20 relative overflow-hidden">
      <div ref={containerRef} className="w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Kolom Kiri: Nama, Tag, Subtitle & Tombol Aksi */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Judul Nama Kandidat Utama */}
            <div className="space-y-3.5 w-full">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text uppercase tracking-tighter leading-[1.05]">
                {profile.full_name}
              </h1>

              {/* Tag Judul Profesional */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                {titleItems.map((item, idx) => (
                  <span 
                    key={idx}
                    className={`hero-tag px-3.5 py-1.5 rounded-xl border-3 border-neo-border shadow-brutal-sm font-black text-xs sm:text-sm uppercase tracking-tight ${
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

            {/* Tagline dengan Kontras & Keterbacaan yang Ditingkatkan */}
            {profile.tagline && (
              <p className="hero-tagline text-base sm:text-lg lg:text-xl text-neo-text font-bold leading-relaxed max-w-xl opacity-90">
                {profile.tagline}
              </p>
            )}

            {/* Tombol CTA Utama & Sekunder */}
            <div className="hero-cta flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-1">
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

            {/* Kotak Statistik Ringkas dengan Penegasan Kontras Surface & Border */}
            <div className="hero-stats grid grid-cols-3 gap-2 sm:gap-6 bg-neo-surface border-4 border-neo-border shadow-brutal-lg rounded-[22px] p-3.5 sm:p-5 w-full max-w-md mt-4 sm:mt-6 divide-x-2 sm:divide-x-3 divide-neo-border">
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span ref={yearsRef} className="text-2xl sm:text-3xl font-black text-neo-blue tracking-tight">0+</span>
                <span className="text-[10px] sm:text-xs font-black uppercase text-neo-text mt-1 tracking-wider">Years Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span ref={projectsRef} className="text-2xl sm:text-3xl font-black text-neo-pink tracking-tight">0+</span>
                <span className="text-[10px] sm:text-xs font-black uppercase text-neo-text mt-1 tracking-wider">Projects</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span ref={awardsRef} className="text-2xl sm:text-3xl font-black text-neo-green tracking-tight">0+</span>
                <span className="text-[10px] sm:text-xs font-black uppercase text-neo-text mt-1 tracking-wider">Awards</span>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Bingkai Foto Profil 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div ref={imageFrameRef} className="hero-image-frame relative w-full max-w-[440px]">
              <div className="relative p-3.5 bg-neo-yellow border-4 border-neo-border shadow-brutal-lg rounded-[32px] hover:rotate-1 transition-transform duration-300">
                <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[480px] rounded-[24px] overflow-hidden bg-neo-surface border-4 border-neo-border shrink-0 flex items-center justify-center">
                  {profile.profile_photo ? (
                    <Image 
                      src={profile.profile_photo} 
                      alt={profile.full_name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 440px"
                      priority
                      className="object-cover object-[center_20%] sm:object-top hover:scale-105 transition-transform duration-500"
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
