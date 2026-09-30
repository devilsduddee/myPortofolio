/**
 * File        : src/features/profile/actions.ts
 * Deskripsi   : Server Action untuk memperbarui profil utama pengguna (nama, judul, CV, foto profil).
 *               Menangani proteksi autentikasi admin dan pembersihan cache Next.js (revalidation).
 */

'use server';

import { ProfileService } from '@/services/ProfileService';
import { ProfileSchema, ProfileFormValues } from '@/types/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

/**
 * Menyimpan atau memperbarui data profil pengguna di database.
 *
 * Kegunaan : Memvalidasi data input profil, menyimpan ke database, dan menghapus cache halaman.
 * Input    : data (Objek ProfileFormValues dari form admin profil)
 * Hasil    : Objek status { success: boolean, data?: Profile, error?: string }.
 */
export async function saveProfileAction(data: ProfileFormValues) {
  try {
    await requireAuth();

    const parsed = ProfileSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ProfileService.saveProfile(parsed.data);
    
    if (result.success) {
      revalidatePath('/admin/profile');
      revalidatePath('/');
      revalidateTag('profile', { expire: 0 });
    }
    
    return result;
  } catch (error: any) {
    console.error('Error in saveProfileAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to save profile. Please try again.' };
  }
}
