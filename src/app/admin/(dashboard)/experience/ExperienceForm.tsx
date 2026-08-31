'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperienceSchema, ExperienceFormValues } from '@/types/schema';
import { createExperienceAction, updateExperienceAction } from '@/features/experience/actions/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export function ExperienceForm({ initialData }: { initialData?: any }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ExperienceFormValues>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      companyName: initialData?.company_name || '',
      position: initialData?.position || '',
      startDate: initialData?.start_date ? format(new Date(initialData.start_date), 'yyyy-MM-dd') : '',
      endDate: initialData?.end_date ? format(new Date(initialData.end_date), 'yyyy-MM-dd') : '',
      description: initialData?.description || '',
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    setStatus(null);
    
    const result = initialData 
      ? await updateExperienceAction(initialData.id, data)
      : await createExperienceAction(data);
    
    if (result.error) {
      setStatus({ type: 'error', msg: result.error });
    } else {
      setStatus({ type: 'success', msg: 'Experience saved successfully!' });
      router.push('/admin/experience');
      router.refresh();
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
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Company Name</label>
        <input 
          {...register('companyName')} 
          placeholder="e.g. GoTo, Tokopedia, Google"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.companyName && <p className="text-neo-pink text-xs font-black mt-1">{errors.companyName.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Position Title</label>
        <input 
          {...register('position')} 
          placeholder="e.g. Senior Data Analyst / Product Manager"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.position && <p className="text-neo-pink text-xs font-black mt-1">{errors.position.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Start Date</label>
          <input 
            type="date" 
            {...register('startDate')} 
            className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          />
          {errors.startDate && <p className="text-neo-pink text-xs font-black mt-1">{errors.startDate.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase text-neo-text tracking-wider">End Date (Leave empty if current role)</label>
          <input 
            type="date" 
            {...register('endDate')} 
            className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          />
          {errors.endDate && <p className="text-neo-pink text-xs font-black mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Description & Key Contributions</label>
        <textarea 
          {...register('description')} 
          rows={5} 
          placeholder="Detail your responsibilities, impacts, and achievements in this role..."
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.description && <p className="text-neo-pink text-xs font-black mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Saving Experience...' : 'Save Experience Record'}
      </button>
    </form>
  );
}

