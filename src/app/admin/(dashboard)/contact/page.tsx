import { ContactService } from '@/features/contact/services/ContactService';
import { PageHeader } from '@/components/admin/PageHeader';
import { ContactForm } from './ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {

  const data = await ContactService.get();
  return (
    <div>
      <PageHeader title="Manage Contact" description="Update your contact information and social links." />
      <div className="max-w-3xl">
        <ContactForm initialData={data} />
      </div>
    </div>
  );
}