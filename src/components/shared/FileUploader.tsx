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
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
          <span className="text-sm text-slate-700 truncate max-w-xs">{value.split('/').pop()}</span>
          <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View File</a>
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
          className="px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : (value ? 'Update Document' : 'Upload Document')}
        </button>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
