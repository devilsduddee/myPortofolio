'use server';

import { StorageService } from './services/StorageService';
import { requireAuth } from '@/lib/auth-guard';
import crypto from 'crypto';

const ALLOWED_BUCKETS = ['portofolio', 'portfolio', 'profiles', 'projects', 'cv', 'achievements'] as const;
type AllowedBucket = typeof ALLOWED_BUCKETS[number];

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const ALLOWED_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp', 'pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function uploadFileAction(formData: FormData) {
  try {
    await requireAuth();

    const file = formData.get('file') as File | null;
    const requestedBucket = formData.get('bucket') as string | null;
    const requestedPrefix = (formData.get('pathPrefix') as string) || (formData.get('path') as string) || 'uploads';

    if (!file || !requestedBucket) {
      return { error: 'Missing required file or bucket parameter.' };
    }

    // 1. Bucket allowlist validation
    if (!ALLOWED_BUCKETS.includes(requestedBucket as AllowedBucket)) {
      return { error: 'Invalid or unauthorized upload bucket.' };
    }

    // 2. File size validation (Max 5MB)
    if (file.size > MAX_FILE_SIZE) {
      return { error: 'File size exceeds maximum allowed limit of 5MB.' };
    }

    // 3. MIME type validation & explicit rejection of SVG / script files
    const mimeType = file.type?.toLowerCase() || '';
    if (mimeType.includes('svg') || mimeType.includes('html') || mimeType.includes('javascript')) {
      return { error: 'SVG, HTML, and script uploads are strictly disallowed for security reasons.' };
    }

    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return { error: 'Invalid file type. Only JPEG, PNG, WEBP, and PDF files are accepted.' };
    }

    // 4. Extension validation from filename
    const originalExt = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(originalExt) || originalExt === 'svg') {
      return { error: 'Invalid file extension.' };
    }

    // 5. Server-side safe prefix and unique filename generation (prevent directory traversal / overwrites)
    const sanitizedPrefix = requestedPrefix.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30) || 'uploads';
    const uniqueFileName = `${sanitizedPrefix}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${originalExt}`;

    return await StorageService.upload(requestedBucket, uniqueFileName, file);
  } catch (error: any) {
    console.error('Error in uploadFileAction:', error);
    if (error.message === 'Unauthorized') {
      return { error: 'Unauthorized. Please sign in to upload files.' };
    }
    return { error: 'Upload failed. Please try again.' };
  }
}

