import { PageHeader } from '@/components/admin/PageHeader';
import { ExperienceForm } from '../ExperienceForm';

export default function CreateExperiencePage() {
  return (
    <div>
      <PageHeader 
        title="Add Experience" 
        description="Create a new professional experience entry."
      />
      <div className="max-w-3xl">
        <ExperienceForm />
      </div>
    </div>
  );
}
