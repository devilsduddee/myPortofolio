import { ProjectService } from '@/features/project/services/ProjectService';
import { PageHeader } from '@/components/admin/PageHeader';
import { ProjectForm } from '../../ProjectForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await ProjectService.getById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <PageHeader 
        title="Edit Project" 
        description={`Update details for ${project.project_name}`} 
      />
      <div className="max-w-3xl">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
