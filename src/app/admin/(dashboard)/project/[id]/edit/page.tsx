import { PageHeader } from '@/components/admin/PageHeader';
import { ProjectForm } from '../../ProjectForm';
import { ProjectService } from '@/features/project/services/ProjectService';
import { notFound } from 'next/navigation';

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
        description="Update an existing portfolio project entry."
      />
      <div className="max-w-3xl">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
