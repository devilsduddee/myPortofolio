import { ProfileService } from '@/services/ProfileService';
import { ProfileForm } from './ProfileForm';

export default async function ProfilePage() {
  const profile = await ProfileService.getProfile();
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Profile</h1>
        <p className="text-slate-400 mt-2">Update your personal information displayed on the hero and about sections.</p>
      </div>
      
      {/* We pass initialData to the client component. No business logic here. */}
      <ProfileForm initialData={profile || {}} />
    </div>
  );
}
