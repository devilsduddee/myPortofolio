import { CvService } from '@/features/cv/services/CvService';
import { PageHeader } from '@/components/admin/PageHeader';
import { CvForm } from './CvForm';

export const dynamic = 'force-dynamic';

export default async function CvPage() {

  const data = await CvService.get();
  return (
    <div>
      <PageHeader title="Manage CV" description="Upload your latest resume or CV." />
      <div className="max-w-3xl">
        <CvForm initialData={data} />
      </div>
    </div>
  );
}