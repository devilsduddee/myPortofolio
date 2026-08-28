'use server';
import { ContactService } from '../services/ContactService';
import { revalidatePath } from 'next/cache';

export async function saveContactAction(data: any) {
  const result = await ContactService.save(data);
  if (result.success) {
    revalidatePath('/admin/contact');
    revalidatePath('/');
  }
  return result;
}