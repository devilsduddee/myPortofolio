import { createClient } from '@/lib/supabase/server';
export class StorageRepository {
  static async uploadFile(bucket: string, path: string, file: File) {
    const supabase = await createClient();
    return await supabase.storage.from(bucket).upload(path, file);
  }
  static async deleteFile(bucket: string, path: string) {
    const supabase = await createClient();
    return await supabase.storage.from(bucket).remove([path]);
  }
  static async getPublicUrl(bucket: string, path: string) {
    const supabase = await createClient();
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
}