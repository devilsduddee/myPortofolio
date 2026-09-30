/**
 * File        : src/features/contact/ContactRepository.ts
 * Deskripsi   : Repositori akses database Prisma untuk tabel Contact.
 * Alasan      : Mengabstraksi pemanggilan kueri database untuk entitas kontak.
 * Dampak      : Berinteraksi dengan tabel 'Contact' pada database.
 */

import { prisma } from '@/lib/prisma';

export class ContactRepository {
  /**
   * Mengambil record kontak pertama dari database.
   */
  static async get() {
    return await prisma.contact.findFirst();
  }

  /**
   * Memperbarui record kontak jika sudah ada, atau membuat baru jika belum ada (Upsert).
   */
  static async upsert(data: any) {
    const existing = await this.get();
    if (existing) {
      return await prisma.contact.update({
        where: { id: existing.id },
        data,
      });
    }
    return await prisma.contact.create({ data });
  }
}
