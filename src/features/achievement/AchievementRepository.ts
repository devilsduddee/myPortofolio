/**
 * File        : src/features/achievement/AchievementRepository.ts
 * Deskripsi   : Repositori akses database Prisma untuk entitas Achievement.
 * Alasan      : Mengisolasi kueri database CRUD entitas pencapaian dari lapisan layanan bisnis.
 * Dampak      : Menjalankan operasi kueri Prisma langsung pada tabel 'Achievement'.
 */

import { prisma } from '@/lib/prisma';

export class AchievementRepository {
  /**
   * Mengambil semua record pencapaian diurutkan berdasarkan tanggal buat terbaru.
   */
  static async findAll() {
    return await prisma.achievement.findMany({ orderBy: { created_at: 'desc' } });
  }

  /**
   * Mencari record pencapaian berdasarkan ID unik.
   */
  static async findById(id: string) {
    return await prisma.achievement.findUnique({ where: { id } });
  }

  /**
   * Membuat baris pencapaian baru di database.
   */
  static async create(data: any) {
    return await prisma.achievement.create({ data });
  }

  /**
   * Memperbarui baris pencapaian berdasarkan ID.
   */
  static async update(id: string, data: any) {
    return await prisma.achievement.update({ where: { id }, data });
  }

  /**
   * Menghapus baris pencapaian berdasarkan ID.
   */
  static async delete(id: string) {
    return await prisma.achievement.delete({ where: { id } });
  }
}
