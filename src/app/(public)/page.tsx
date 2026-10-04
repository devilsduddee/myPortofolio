/**
 * File        : src/app/(public)/page.tsx
 * Deskripsi   : Halaman utama (Landing Page) publik portofolio Ahmad Ridho Syafaat.
 *               Menampilkan kumpulan section: Navbar, Hero, Tech Marquee, About, Experience, Projects, Achievements, Contact, dan Footer.
 *               Menggunakan Next.js Incremental Static Revalidation (ISR) dan cache query paralel.
 */

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementSection } from '@/components/sections/AchievementSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { PublicNavbar } from '@/components/shared/PublicNavbar';
import { TechMarquee } from '@/components/shared/TechMarquee';
import type { Metadata } from "next";

import { ProfileService } from '@/services/ProfileService';
import { ExperienceService } from '@/features/experience/ExperienceService';
import { ProjectService } from '@/features/project/ProjectService';
import { AchievementService } from '@/features/achievement/AchievementService';
import { ContactService } from '@/features/contact/ContactService';

import { unstable_cache } from 'next/cache';

export const revalidate = 3600; // Pembaharuan halaman otomatis (ISR) setiap 1 jam

export const metadata: Metadata = {
  description: "Portofolio profesional yang menampilkan proyek berbasis data, pengalaman manajemen produk, dan karya teknis.",
};

// Pengambilan data ter-cache dari database untuk kecepatan akses maksimal
const getCachedProfile = unstable_cache(async () => ProfileService.getProfile(), ['profile-data'], { revalidate: 3600, tags: ['profile'] });
const getCachedExperiences = unstable_cache(async () => ExperienceService.getAll(), ['experience-data'], { revalidate: 3600, tags: ['experience'] });
const getCachedProjects = unstable_cache(async () => ProjectService.getAll(), ['project-data'], { revalidate: 3600, tags: ['project'] });
const getCachedAchievements = unstable_cache(async () => AchievementService.getAll(), ['achievement-data'], { revalidate: 3600, tags: ['achievement'] });
const getCachedContact = unstable_cache(async () => ContactService.get(), ['contact-data'], { revalidate: 3600, tags: ['contact'] });

/**
 * Komponen utama Halaman Depan Publik (Home).
 *
 * Kegunaan : Mengambil semua data portofolio dari cache secara paralel dan merender seluruh section publik.
 * Input    : Tanpa props luar.
 * Hasil    : Struktur halaman lengkap landing page publik.
 */
export default async function Home() {
  // Ambil semua data portofolio secara paralel
  const [profile, experiences, projects, achievements, contact] = await Promise.all([
    getCachedProfile(),
    getCachedExperiences(),
    getCachedProjects(),
    getCachedAchievements(),
    getCachedContact(),
  ]);

  return (
    <>
      <PublicNavbar />
      <HeroSection profile={profile} experiences={experiences} projects={projects} achievements={achievements} />
      <TechMarquee projects={projects} />
      <AboutSection profile={profile} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <AchievementSection achievements={achievements} />
      <ContactSection contact={contact} profile={profile} />
      <FooterSection contact={contact} profile={profile} />
    </>
  );
}

