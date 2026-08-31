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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal p-6 sm:p-8">
      
      {status && (
        <div className={`p-4 rounded-xl border-3 border-neo-border font-extrabold text-sm shadow-brutal-sm ${
          status.type === 'success' ? 'bg-emerald-100 text-emerald-950' : 'bg-neo-pink/20 text-neo-pink'
        }`}>
          {status.msg}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Primary Email Address</label>
        <input 
          type="email" 
          {...register('email')} 
          placeholder="your.email@domain.com"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          required 
        />
        {errors.email && <p className="text-neo-pink text-xs font-black mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Phone Number (Optional)</label>
        <input 
          type="text" 
          {...register('phoneNumber')} 
          placeholder="+62 812-3456-7890"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.phoneNumber && <p className="text-neo-pink text-xs font-black mt-1">{errors.phoneNumber.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">LinkedIn Profile URL</label>
        <input 
          type="url" 
          {...register('linkedinUrl')} 
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.linkedinUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.linkedinUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">GitHub Profile URL</label>
        <input 
          type="url" 
          {...register('githubUrl')} 
          placeholder="https://github.com/username"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.githubUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.githubUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Personal Website URL (Optional)</label>
        <input 
          type="url" 
          {...register('personalWebsite')} 
          placeholder="https://yourwebsite.com"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.personalWebsite && <p className="text-neo-pink text-xs font-black mt-1">{errors.personalWebsite.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Saving Contact Info...' : 'Save Contact Information'}
      </button>
    </form>
  );
}

