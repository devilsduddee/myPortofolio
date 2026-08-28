import { PageHeader } from '@/components/admin/PageHeader';
import { ProjectForm } from '../ProjectForm';

export default function CreateProjectPage() {
  return (
    <div>
      <PageHeader 
        title="Add Project" 
        description="Create a new portfolio project entry."
      />
      <div className="max-w-3xl">
        <ProjectForm />
      </div>
    </div>
  );
}
