import { DashboardCard } from '@/components/admin/DashboardCard';
import { PageHeader } from '@/components/admin/PageHeader';
import { Briefcase, Award, FolderGit2, User } from 'lucide-react';

import { ProjectService } from '@/features/project/ProjectService';
import { ExperienceService } from '@/features/experience/ExperienceService';
import { AchievementService } from '@/features/achievement/AchievementService';
import { ProfileService } from '@/services/ProfileService';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [projects, experiences, achievements, profile] = await Promise.all([
    ProjectService.getAll(),
    ExperienceService.getAll(),
    AchievementService.getAll(),
    ProfileService.getProfile(),
  ]);

  return (
    <div>
      <PageHeader 
        title="Portfolio Dashboard" 
        description="Overview of your portfolio content and dynamic data."
      />
      
      {/* Grid Kartu Statistik (2 kolom di mobile, 4 kolom di desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mb-6 sm:mb-10">
        <DashboardCard 
          title="Projects" 
          value={projects.length.toString()} 
          icon={FolderGit2} 
          trend="Showcase" 
        />
        <DashboardCard 
          title="Experience" 
          value={experiences.length.toString()} 
          icon={Briefcase} 
          trend="Timeline" 
        />
        <DashboardCard 
          title="Awards" 
          value={achievements.length.toString()} 
          icon={Award} 
          trend="Certified" 
        />
        <DashboardCard 
          title="Profile" 
          value={profile ? "Active" : "Draft"} 
          icon={User} 
          trend="Config" 
        />
      </div>

      {/* Neo Brutalist Summary Card */}
      <div className="bg-neo-surface border-3 sm:border-4 border-neo-border rounded-[18px] sm:rounded-[20px] shadow-brutal p-4 sm:p-6 md:p-8">
        <h3 className="text-lg sm:text-xl font-black text-neo-text uppercase tracking-tight mb-2 sm:mb-3">Content Summary</h3>
        <p className="text-neo-muted font-medium text-xs sm:text-sm md:text-base leading-relaxed">
          Your portfolio currently has <strong className="text-neo-blue">{projects.length} projects</strong>, <strong className="text-neo-pink">{experiences.length} experience records</strong>, and <strong className="text-neo-text">{achievements.length} achievements</strong>. 
          Use the bottom navigation to create, update, or delete content dynamically.
        </p>
      </div>
    </div>
  );
}


