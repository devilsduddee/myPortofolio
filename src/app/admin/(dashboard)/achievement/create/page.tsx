import { PageHeader } from '@/components/admin/PageHeader';
import { AchievementForm } from '../AchievementForm';

export default function CreateAchievementPage() {
  return (
    <div>
      <PageHeader 
        title="Add Achievement" 
        description="Create a new achievement or certification entry."
      />
      <div className="max-w-3xl">
        <AchievementForm />
      </div>
    </div>
  );
}
