/**
 * File        : src/features/achievement/AchievementService.ts
 * Deskripsi   : Layanan bisnis pengelolaan entitas pencapaian dan sertifikat (AchievementService).
 * Alasan      : Memisahkan validasi skema formulir dari kueri kueri ORM database.
 * Dampak      : Mengkonversi tanggal dan format URL sertifikat menjadi struktur database yang valid.
 */

import { AchievementRepository } from './AchievementRepository';
import { AchievementSchema } from './schema';

export class AchievementService {
  /**
   * Mengambil seluruh daftar pencapaian dari database.
   *
   * Kegunaan : Membaca semua data pencapaian yang diurutkan berdasarkan tanggal terbaru.
   * Alasan   : Menyediakan data resmi pencapaian untuk halaman publik dan admin dashboard.
   * Dampak   : Mengembalikan array objek Achievement.
   * Input    : Tanpa input.
   * Hasil    : Array data Achievement dari Prisma.
   */
  static async getAll() { 
    return await AchievementRepository.findAll(); 
  }

  /**
   * Mengambil entitas pencapaian tunggal berdasarkan ID.
   *
   * Kegunaan : Membaca satu record pencapaian untuk kebutuhan halaman edit admin.
   * Alasan   : Mengisi formulir edit dengan data awal dari database.
   * Dampak   : Mengembalikan objek Achievement atau null jika tidak ditemukan.
   * Input    : id (String ID pencapaian)
   * Hasil    : Objek Achievement atau null.
   */
  static async getById(id: string) { 
    return await AchievementRepository.findById(id); 
  }
  
  /**
   * Memvalidasi dan membuat record pencapaian baru di database.
   *
   * Kegunaan : Menguji input Zod Schema dan menyimpan data pencapaian baru.
   * Alasan   : Mencegah penyimpanan data pencapaian yang tidak lengkap atau tidak valid.
   * Dampak   : Menambahkan baris pencapaian baru ke tabel Achievement.
   * Input    : data (Objek input dari formulir pencapaian)
   * Hasil    : Objek status { success: true, data } atau { error: string }.
   */
  static async create(data: any) {
    const validated = AchievementSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        title: validated.data.title,
        description: validated.data.description,
        achievement_date: validated.data.date ? new Date(validated.data.date).toISOString() : new Date().toISOString(),
        certificate_url: validated.data.certificateUrl,
      };
      const result = await AchievementRepository.create(dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  /**
   * Memvalidasi dan memperbarui record pencapaian yang ada.
   *
   * Kegunaan : Mengubah data judul, deskripsi, tanggal, atau sertifikat pencapaian berdasarkan ID.
   * Alasan   : Memastikan pembaruan data pencapaian tetap memenuhi aturan skema.
   * Dampak   : Mengubah baris pencapaian yang tersimpan pada database.
   * Input    : id (String ID pencapaian), data (Objek input formulir)
   * Hasil    : Objek status { success: true, data } atau { error: string }.
   */
  static async update(id: string, data: any) {
    const validated = AchievementSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        title: validated.data.title,
        description: validated.data.description,
        achievement_date: validated.data.date ? new Date(validated.data.date).toISOString() : new Date().toISOString(),
        certificate_url: validated.data.certificateUrl,
      };
      const result = await AchievementRepository.update(id, dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  /**
   * Menghapus record pencapaian dari database berdasarkan ID.
   *
   * Kegunaan : Memanggil repositori untuk mengeliminasi data pencapaian yang tidak lagi relevan.
   * Alasan   : Membersihkan data lama yang dihapus pengguna admin.
   * Dampak   : Menghapus baris record pencapaian dari database.
   * Input    : id (String ID pencapaian)
   * Hasil    : Objek status { success: true } atau { error: string }.
   */
  static async delete(id: string) {
    try {
      await AchievementRepository.delete(id);
      return { success: true };
    } catch (e: any) { return { error: e.message }; }
  }
}
