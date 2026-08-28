'use server'

import { ProfileService } from '@/services/ProfileService'
import { ProfileFormValues } from '@/types/schema'
import { revalidatePath } from 'next/cache'

export async function saveProfileAction(data: ProfileFormValues) {
  const result = await ProfileService.saveProfile(data);
  
  if (result.success) {
    revalidatePath('/admin/profile');
    revalidatePath('/'); // Revalidate public page
  }
  
  return result;
}
