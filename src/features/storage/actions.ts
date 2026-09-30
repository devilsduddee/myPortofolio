/**
 * File        : src/features/storage/actions.ts
 * Deskripsi   : Server Action untuk mengunggah file media (gambar / PDF) ke Supabase Storage.
 *               Dilengkapi dengan validasi autentikasi, batas ukuran file, dan tipe MIME aman.
 */

'use server';

import { StorageService } from './StorageService';
import { requireAuth } from '@/lib/auth-guard';
import crypto from 'crypto';

// Daftar bucket storage yang diizinkan untuk proses pengunggahan
const ALLOWED_BUCKETS = ['portofolio', 'portfolio', 'profiles', 'projects', 'cv', 'achievements'] as const;
type AllowedBucket = typeof ALLOWED_BUCKETS[number];

// Daftar format berkas yang aman (mencegah eksploitasi berkas script / SVG)
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const ALLOWED_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp', 'pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Maksimal 5 MB

/**
 * Mengunggah file dari formulir ke Supabase Storage secara aman.
 *
 * Kegunaan : Memvalidasi hak akses admin, memeriksa batas ukuran & tipe berkas,
 *            serta mengunggah file dengan nama acak yang unik.
 * Input    : formData (Objek FormData yang berisi 'file', 'bucket', dan 'pathPrefix')
 * Hasil    : Objek respons berisi URL file publik jika sukses, atau pesan 'error' jika gagal.
 */
export async function uploadFileAction(formData: FormData) {
  try {
    // 1. Verifikasi autentikasi sesi admin
    await requireAuth();

    const file = formData.get('file') as File | null;
    const requestedBucket = formData.get('bucket') as string | null;
    const requestedPrefix = (formData.get('pathPrefix') as string) || (formData.get('path') as string) || 'uploads';

    if (!file || !requestedBucket) {
      return { error: 'Missing required file or bucket parameter.' };
    }

    // 2. Validasi bucket yang diizinkan
    if (!ALLOWED_BUCKETS.includes(requestedBucket as AllowedBucket)) {
      return { error: 'Invalid or unauthorized upload bucket.' };
    }

    // 3. Validasi ukuran file (Maksimal 5MB)
    if (file.size > MAX_FILE_SIZE) {
      return { error: 'File size exceeds maximum allowed limit of 5MB.' };
    }

    // 4. Validasi tipe MIME & penolakan berkas script / SVG yang berisiko XSS
    const mimeType = file.type?.toLowerCase() || '';
    if (mimeType.includes('svg') || mimeType.includes('html') || mimeType.includes('javascript')) {
      return { error: 'SVG, HTML, and script uploads are strictly disallowed for security reasons.' };
    }

    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return { error: 'Invalid file type. Only JPEG, PNG, WEBP, and PDF files are accepted.' };
    }

    // 5. Validasi ekstensi nama file
    const originalExt = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(originalExt) || originalExt === 'svg') {
      return { error: 'Invalid file extension.' };
    }

    // 6. Buat prefix yang aman dan nama file unik (mencegah directory traversal & penimpaan file)
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

