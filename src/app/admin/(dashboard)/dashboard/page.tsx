import { DashboardCard } from '@/components/admin/DashboardCard';
import { PageHeader } from '@/components/admin/PageHeader';
import { Briefcase, Award, FolderGit2, User } from 'lucide-react';

import { ProjectService } from '@/features/project/services/ProjectService';
import { ExperienceService } from '@/features/experience/services/ExperienceService';
import { AchievementService } from '@/features/achievement/services/AchievementService';
import { ProfileService } from '@/services/ProfileService';

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
        description="Overview of your portfolio content and data."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Content Summary</h3>
        <p className="text-slate-500 text-sm">
          Your portfolio currently has {projects.length} projects, {experiences.length} experience records, and {achievements.length} achievements. 
          Navigate through the sidebar to manage your content.
        </p>
      </div>
    </div>
  );
}
