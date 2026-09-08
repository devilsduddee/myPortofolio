import { AchievementService } from '@/features/achievement/services/AchievementService';
import { PageHeader } from '@/components/admin/PageHeader';
import { AchievementForm } from '../../AchievementForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievement = await AchievementService.getById(id);

  if (!achievement) {
    notFound();
  }

  return (
    <div>
      <PageHeader 
        title="Edit Achievement" 
        description={`Update achievement record for ${achievement.title}`} 
      />
      <div className="max-w-3xl">
        <AchievementForm initialData={achievement} />
      </div>
    </div>
  );
}
