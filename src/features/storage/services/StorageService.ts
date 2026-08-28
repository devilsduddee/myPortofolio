import { StorageRepository } from '../repositories/StorageRepository';
export class StorageService {
  static async upload(bucket: string, path: string, file: File) {
    try {
      const { data, error } = await StorageRepository.uploadFile(bucket, path, file);
      if (error) return { error: error.message };
      return { success: true, url: await StorageRepository.getPublicUrl(bucket, data.path) };
    } catch(e: any) { return { error: e.message }; }
  }
}