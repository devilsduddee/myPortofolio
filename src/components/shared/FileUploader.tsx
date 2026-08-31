'use client';

import { useState, useRef } from 'react';
import { uploadFileAction } from '@/features/storage/actions';

interface FileUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  pathPrefix?: string;
  accept?: string;
}

export function FileUploader({ value, onChange, bucket = 'portfolio', pathPrefix = 'documents', accept = '.pdf,.doc,.docx' }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${pathPrefix}/${Date.now()}.${fileExt}`;
      formData.append('path', fileName);

      const result = await uploadFileAction(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        onChange(result.url);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      {value && (
        <div className="p-4 bg-neo-surface border-3 border-neo-border rounded-xl shadow-brutal-sm flex items-center justify-between max-w-md">
          <span className="text-xs font-black uppercase text-neo-text truncate max-w-xs">{value.split('/').pop()}</span>
          <a href={value} target="_blank" rel="noreferrer" className="text-neo-blue font-extrabold hover:underline text-xs uppercase tracking-wider">
            View PDF
          </a>
        </div>
      )}
      
      <div>
        <input
          type="file"
          accept={accept}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-5 py-2.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          {isUploading ? 'Uploading Document...' : (value ? 'Update Document File' : 'Upload Document File')}
        </button>
        
        {error && <p className="text-neo-pink text-xs font-black mt-2">{error}</p>}
      </div>
    </div>
  );
}

