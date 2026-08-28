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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      
      {status && (
        <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
        <input {...register('companyName')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
        <input {...register('position')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
          <input type="date" {...register('startDate')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">End Date (Leave empty if present)</label>
          <input type="date" {...register('endDate')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea {...register('description')} rows={5} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Experience'}
      </button>
    </form>
  );
}
