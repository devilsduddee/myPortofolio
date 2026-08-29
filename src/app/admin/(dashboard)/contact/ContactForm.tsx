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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 p-6">
      
      {status && (
        <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
        <input type="email" {...register('email')} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all" required />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number (Optional)</label>
        <input type="text" {...register('phoneNumber')} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all" />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">LinkedIn URL</label>
        <input type="url" {...register('linkedinUrl')} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all" />
        {errors.linkedinUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">GitHub URL</label>
        <input type="url" {...register('githubUrl')} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all" />
        {errors.githubUrl && <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Personal Website (Optional)</label>
        <input type="url" {...register('personalWebsite')} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all" />
        {errors.personalWebsite && <p className="text-red-500 text-sm mt-1">{errors.personalWebsite.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 py-3 rounded-xl hover:bg-white/20 hover:scale-[1.02] transition-all text-white font-semibold disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Contact Info'}
      </button>
    </form>
  );
}
