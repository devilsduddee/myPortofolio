import { DashboardCard } from '@/components/admin/DashboardCard';
import { PageHeader } from '@/components/admin/PageHeader';
import { Briefcase, Award, FolderGit2, User } from 'lucide-react';

import { ProjectService } from '@/features/project/services/ProjectService';
import { ExperienceService } from '@/features/experience/services/ExperienceService';
import { AchievementService } from '@/features/achievement/services/AchievementService';
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard 
          title="Total Projects" 
          value={projects.length.toString()} 
          icon={FolderGit2} 
          trend="Showcased work" 
        />
        <DashboardCard 
          title="Experience Entries" 
          value={experiences.length.toString()} 
          icon={Briefcase} 
          trend="Career timeline" 
        />
        <DashboardCard 
          title="Achievements" 
          value={achievements.length.toString()} 
          icon={Award} 
          trend="Certifications" 
        />
        <DashboardCard 
          title="Profile Status" 
          value={profile ? "Active" : "Incomplete"} 
          icon={User} 
          trend="Main config" 
        />
      </div>

      {/* Neo Brutalist Summary Card */}
      <div className="bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal p-6 sm:p-8">
        <h3 className="text-xl font-black text-neo-text uppercase tracking-tight mb-3">Content Summary</h3>
        <p className="text-neo-muted font-medium text-base leading-relaxed">
          Your portfolio currently has <strong className="text-neo-blue">{projects.length} projects</strong>, <strong className="text-neo-pink">{experiences.length} experience records</strong>, and <strong className="text-neo-text">{achievements.length} achievements</strong>. 
          Use the sidebar menu to create, update, or delete content dynamically.
        </p>
      </div>
    </div>
  );
}

