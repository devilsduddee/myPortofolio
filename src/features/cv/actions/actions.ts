'use server';
import { CvService } from '../services/CvService';
import { revalidatePath } from 'next/cache';

export async function saveCvAction(data: any) {
  const result = await CvService.save(data);
  if (result.success) {
    revalidatePath('/admin/cv');
    revalidatePath('/');
  }
  return result;
}