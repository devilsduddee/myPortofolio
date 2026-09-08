import { ExperienceService } from '@/features/experience/services/ExperienceService';
import { PageHeader } from '@/components/admin/PageHeader';
import { ExperienceForm } from '../../ExperienceForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await ExperienceService.getById(id);

  if (!experience) {
    notFound();
  }

  return (
    <div>
      <PageHeader 
        title="Edit Experience" 
        description={`Update experience record for ${experience.position} at ${experience.company_name}`} 
      />
      <div className="max-w-3xl">
        <ExperienceForm initialData={experience} />
      </div>
    </div>
  );
}
