/**
 * File        : src/services/ProfileService.ts
 * Deskripsi   : Layanan bisnis pengelolaan data profil pengguna (ProfileService).
 * Alasan      : Memisahkan transformasi skema formulir dari penyimpanan Prisma ORM.
 * Dampak      : Memastikan format data nama, judul, tagline, dan foto profil terstruktur dengan benar.
 */

import { ProfileRepository } from '../repositories/ProfileRepository';
import { ProfileSchema, ProfileFormValues } from '../types/schema';

export class ProfileService {
  /**
   * Mengambil data profil utama pengguna dari repositori.
   *
   * Kegunaan : Mengakses record profil tunggal untuk ditampilkan pada landing page publik dan admin.
   * Alasan   : Memberikan sumber data profil resmi bagi komponen halaman.
   * Dampak   : Mengembalikan objek profil atau null jika belum ada record.
   * Input    : Tanpa input.
   * Hasil    : Objek Profile dari Prisma atau null.
   */
  static async getProfile() {
    return await ProfileRepository.getProfile();
  }

  /**
   * Memvalidasi dan menyimpan data profil pengguna.
   *
   * Kegunaan : Memeriksa validitas input formulir profil (Zod Schema) lalu melakukan upsert data.
   * Alasan   : Menjamin hanya data yang lolos validasi skema yang tersimpan di database.
   * Dampak   : Memperbarui record profil di database sehingga informasi terbaru langsung dapat diakses.
   * Input    : data (Objek ProfileFormValues dari form admin)
   * Hasil    : Objek status { success: true, data } atau { error: string }.
   */
  static async saveProfile(data: ProfileFormValues) {
    const validated = ProfileSchema.safeParse(data);
    
    if (!validated.success) {
      return { 
        error: 'Validation failed', 
        details: validated.error.flatten().fieldErrors 
      };
    }
    
    try {
      const mappedData = {
        full_name: validated.data.name,
        title: validated.data.title,
        tagline: validated.data.tagline,
        about_me: validated.data.aboutMe,
        profile_photo: validated.data.avatarUrl,
      };
      
      const result = await ProfileRepository.upsertProfile(mappedData);
      return { success: true, data: result };
    } catch (e: any) {
      console.error(e);
      return { error: 'Failed to save profile' };
    }
  }
}
