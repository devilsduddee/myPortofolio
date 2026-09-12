'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CvSchema, CvFormValues } from '@/features/cv/validation/schema';
import { saveCvAction } from '@/features/cv/actions/actions';
import { FileUploader } from '@/components/shared/FileUploader';
import { toast } from 'sonner';

export function CvForm({ initialData }: { initialData?: any }) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CvFormValues>({
    resolver: zodResolver(CvSchema),
    defaultValues: {
      fileUrl: initialData?.fileUrl || '',
    },
  });

  const onSubmit = async (data: CvFormValues) => {
    try {
      const result = await saveCvAction(data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('CV uploaded & saved successfully!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save CV');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal p-6 sm:p-8">

      <div className="space-y-2">
        <label htmlFor="fileUrl" className="block text-xs font-black uppercase text-neo-text tracking-wider">Resume / CV Document (PDF format)</label>
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

