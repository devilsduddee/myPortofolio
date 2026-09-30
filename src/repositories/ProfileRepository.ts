/**
 * File        : src/repositories/ProfileRepository.ts
 * Deskripsi   : Repositori database untuk tabel Profile menggunakan Prisma ORM.
 * Alasan      : Mengabstraksi kueri kueri database Prisma khusus entitas profil.
 * Dampak      : Berinteraksi langsung dengan tabel 'Profile' pada database PostgreSQL/Supabase.
 */

import { prisma } from '@/lib/prisma';

export class ProfileRepository {
  /**
   * Mengambil record profil pertama dari database.
   *
   * Kegunaan : Membaca baris pertama pada tabel Profile.
   * Alasan   : Aplikasi ini merupakan portofolio personal yang hanya memerlukan satu data profil utama.
   * Dampak   : Mengembalikan data profil atau null.
   * Input    : Tanpa input.
   * Hasil    : Objek record Profile dari Prisma.
   */
  static async getProfile() {
    return await prisma.profile.findFirst();
  }

  /**
   * Memperbarui record profil jika sudah ada, atau membuat baru jika belum ada (Upsert).
   *
   * Kegunaan : Menjamin hanya ada satu baris record profil yang diperbarui terus-menerus.
   * Alasan   : Mencegah duplikasi data profil di database.
   * Dampak   : Mengubah baris profil yang ada atau menambah baris baru.
   * Input    : data (Objek data profil yang sudah dipetakan)
   * Hasil    : Record Profile yang disimpan.
   */
  static async upsertProfile(data: any) {
    const existing = await this.getProfile();
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data,
      });
    }
    return await prisma.profile.create({ data });
  }
}
