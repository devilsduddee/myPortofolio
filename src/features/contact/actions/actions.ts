'use server';

import { ContactService } from '../services/ContactService';
import { ContactSchema, ContactFormValues } from '../validation/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

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