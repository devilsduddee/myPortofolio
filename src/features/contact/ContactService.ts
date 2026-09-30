/**
 * File        : src/features/contact/ContactService.ts
 * Deskripsi   : Layanan bisnis pengelolaan data kontak pengguna (ContactService).
 * Alasan      : Memetakan input formulir ke struktur tabel database Contact.
 * Dampak      : Memastikan alamat email, nomor telepon, dan tautan sosial media tervalidasi dengan aman.
 */

import { ContactRepository } from './ContactRepository';
import { ContactSchema } from './schema';

export class ContactService {
  /**
   * Mengambil data kontak pengguna dari database.
   *
   * Kegunaan : Membaca data kontak untuk ditampilkan pada ContactSection & footer.
   * Input    : Tanpa input.
   * Hasil    : Objek Contact dari Prisma atau null.
   */
  static async get() {
    return await ContactRepository.get();
  }

  /**
   * Memvalidasi dan menyimpan data kontak pengguna.
   *
   * Kegunaan : Menguji skema Zod pada formulir kontak dan melakukan upsert di database.
   * Alasan   : Mencegah format email atau URL sosial media yang salah tersimpan di database.
   * Dampak   : Memperbarui record kontak utama di database.
   * Input    : data (Objek input dari formulir kontak)
   * Hasil    : Objek status { success: true, data } atau { error: string }.
   */
  static async save(data: any) {
    const validated = ContactSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        email: validated.data.email,
        phone: validated.data.phoneNumber,
        linkedin_url: validated.data.linkedinUrl,
        github_url: validated.data.githubUrl,
        website_url: validated.data.personalWebsite,
      };
      const result = await ContactRepository.upsert(dbData);
      return { success: true, data: result };
    } catch (e: any) {
      return { error: e.message || 'Failed to save contact' };
    }
  }
}
