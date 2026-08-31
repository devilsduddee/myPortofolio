'use client';

import { useState, useRef } from 'react';
import { uploadFileAction } from '@/features/storage/actions';
import Image from 'next/image';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  pathPrefix?: string;
  accept?: string;
}

export function ImageUploader({ value, onChange, bucket = 'portfolio', pathPrefix = 'uploads', accept = 'image/*' }: ImageUploaderProps) {
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

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    
    if (!isImage && !(isPdf && accept.includes('application/pdf'))) {
      setError(accept.includes('pdf') ? 'Only image and PDF files are allowed' : 'Only image files are allowed');
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

  const isPdfValue = value && value.toLowerCase().endsWith('.pdf');

  return (
    <div className="space-y-4">
      {value && (
        <div className="mb-4">
          {isPdfValue ? (
            <div className="flex items-center gap-3 p-4 bg-neo-surface border-3 border-neo-border rounded-xl shadow-brutal-sm max-w-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neo-pink stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase text-neo-text">Document Uploaded</span>
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-neo-blue font-extrabold hover:underline text-xs">View Uploaded File</a>
              </div>
            </div>
          ) : (
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-3 border-neo-border shadow-brutal-sm bg-neo-surface">
              <Image src={value} alt="Preview" fill className="object-cover" sizes="128px" />
            </div>
          )}
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
          className="px-4 py-2.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          {isUploading ? 'Uploading File...' : (value ? 'Change Uploaded File' : 'Upload File')}
        </button>
        
        {error && <p className="text-neo-pink text-xs font-black mt-2">{error}</p>}
      </div>
    </div>
  );
}

