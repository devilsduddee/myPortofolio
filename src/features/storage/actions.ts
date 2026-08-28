'use server'

import { StorageService } from './services/StorageService';

export async function uploadFileAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string;
    const path = formData.get('path') as string;
    
    if (!file || !bucket || !path) {
      return { error: 'Missing required fields' };
    }
    
    return await StorageService.upload(bucket, path, file);
  } catch (error: any) {
    return { error: error.message };
  }
}
