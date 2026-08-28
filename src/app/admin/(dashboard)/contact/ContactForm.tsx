'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, ContactFormValues } from '@/features/contact/validation/schema';
import { saveContactAction } from '@/features/contact/actions/actions';
import { useState } from 'react';

export function ContactForm({ initialData }: { initialData?: any }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: initialData?.email || '',
      phoneNumber: initialData?.phone || '',
      linkedinUrl: initialData?.linkedin_url || '',
      githubUrl: initialData?.github_url || '',
      personalWebsite: initialData?.website_url || '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus(null);
    
    const result = await saveContactAction(data);
    
    if (result.error) {
      setStatus({ type: 'error', msg: result.error });
    } else {
      setStatus({ type: 'success', msg: 'Contact information saved successfully!' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      
      {status && (
        <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input type="email" {...register('email')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
        <input type="text" {...register('phoneNumber')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
        <input type="url" {...register('linkedinUrl')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.linkedinUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">GitHub URL</label>
        <input type="url" {...register('githubUrl')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.githubUrl && <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Personal Website (Optional)</label>
        <input type="url" {...register('personalWebsite')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.personalWebsite && <p className="text-red-500 text-sm mt-1">{errors.personalWebsite.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Contact Info'}
      </button>
    </form>
  );
}
