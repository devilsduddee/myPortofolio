import { ProfileService } from '@/services/ProfileService';
import { ProfileForm } from './ProfileForm';
import { PageHeader } from '@/components/admin/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const profile = await ProfileService.getProfile();
  
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader 
        title="Manage Profile" 
        description="Update your personal information displayed on the hero and about sections."
      />
      
      <ProfileForm initialData={profile || {}} />
    </div>
  );
}

