import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementSection } from '@/components/sections/AchievementSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { PublicNavbar } from '@/components/shared/PublicNavbar';
import type { Metadata } from "next";

import { ProfileService } from '@/services/ProfileService';
import { ExperienceService } from '@/features/experience/services/ExperienceService';
import { ProjectService } from '@/features/project/services/ProjectService';
import { AchievementService } from '@/features/achievement/services/AchievementService';
import { ContactService } from '@/features/contact/services/ContactService';

import { unstable_cache } from 'next/cache';

export const revalidate = 3600; // Enable ISR (Static Generation with 1-hour revalidation)

export const metadata: Metadata = {
  title: "Portofolio Ahmad Ridho Syafaat",
  description: "Professional portfolio showcasing data-driven projects, product management experience, and technical builds.",
};

// Cache the database queries to drastically speed up page refreshes
const getCachedProfile = unstable_cache(async () => ProfileService.getProfile(), ['profile-data'], { revalidate: 3600, tags: ['profile'] });
const getCachedExperiences = unstable_cache(async () => ExperienceService.getAll(), ['experience-data'], { revalidate: 3600, tags: ['experience'] });
const getCachedProjects = unstable_cache(async () => ProjectService.getAll(), ['project-data'], { revalidate: 3600, tags: ['project'] });
const getCachedAchievements = unstable_cache(async () => AchievementService.getAll(), ['achievement-data'], { revalidate: 3600, tags: ['achievement'] });
const getCachedContact = unstable_cache(async () => ContactService.get(), ['contact-data'], { revalidate: 3600, tags: ['contact'] });

export default async function Home() {
  // Fetch all data in parallel from the cache
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
      <AboutSection profile={profile} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <AchievementSection achievements={achievements} />
      <ContactSection contact={contact} profile={profile} />
      <FooterSection contact={contact} profile={profile} />
    </>
  );
}
