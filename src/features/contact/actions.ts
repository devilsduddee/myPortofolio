/**
 * File        : src/features/contact/actions/actions.ts
 * Deskripsi   : Server Action untuk memperbarui informasi kontak pengguna (email, LinkedIn, GitHub, WhatsApp).
 */

'use server';

import { ContactService } from './ContactService';
import { ContactSchema, ContactFormValues } from './schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

/**
 * Menyimpan atau memperbarui data kontak pengguna.
 *
 * Kegunaan : Memvalidasi input kontak, menyimpannya di database, dan memperbarui cache.
 * Input    : data (Objek ContactFormValues)
 * Hasil    : Objek status { success: boolean, data?: Contact, error?: string }.
 */
export async function saveContactAction(data: ContactFormValues) {
  try {
    await requireAuth();

    const parsed = ContactSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ContactService.save(parsed.data);
    if (result.success) {
      revalidatePath('/admin/contact');
      revalidatePath('/');
      revalidateTag('contact', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in saveContactAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to save contact information. Please try again.' };
  }
}

