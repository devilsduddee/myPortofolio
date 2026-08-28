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
      setStatus({ type: 'success', msg: 'CV uploaded successfully!' });
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
        <label className="block text-sm font-medium text-slate-700 mb-2">Resume / CV Document</label>
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
        {errors.fileUrl && <p className="text-red-500 text-sm mt-1">{errors.fileUrl.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save CV'}
      </button>
    </form>
  );
}
