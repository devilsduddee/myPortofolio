'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CvSchema, CvFormValues } from '@/features/cv/validation/schema';
import { saveCvAction } from '@/features/cv/actions/actions';
import { useState } from 'react';
import { FileUploader } from '@/components/shared/FileUploader';

export function CvForm({ initialData }: { initialData?: any }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CvFormValues>({
    resolver: zodResolver(CvSchema),
    defaultValues: {
      fileUrl: initialData?.fileUrl || '',
    },
  });

  const onSubmit = async (data: CvFormValues) => {
    setStatus(null);
    const result = await saveCvAction(data);
    
    if (result.error) {
      setStatus({ type: 'error', msg: result.error });
    } else {
      setStatus({ type: 'success', msg: 'CV uploaded & saved successfully!' });
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
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Resume / CV Document (PDF format)</label>
        <Controller
          name="fileUrl"
          control={control}
          render={({ field }) => (
            <FileUploader
              value={field.value || ''}
              onChange={field.onChange}
              bucket="portofolio"
              pathPrefix="cv"
              accept=".pdf"
            />
          )}
        />
        {errors.fileUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.fileUrl.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Uploading & Saving...' : 'Save & Publish CV'}
      </button>
    </form>
  );
}

