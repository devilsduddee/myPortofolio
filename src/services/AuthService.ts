/**
 * File        : src/services/AuthService.ts
 * Deskripsi   : Layanan autentikasi tingkat bisnis (Business Service).
 * Alasan      : Memisahkan aturan validasi kredensial dan logika bisnis dari penyimpanan database.
 * Dampak      : Memastikan input email & password terverifikasi sebelum memanggil API autentikasi Supabase.
 */

import { AuthRepository } from '@/repositories/AuthRepository'
import { LoginCredentials } from '@/types/auth'

export class AuthService {
  /**
   * Memproses login sesi admin.
   *
   * Kegunaan : Memvalidasi kredensial masuk (email dan kata sandi) lalu memanggil API autentikasi.
   * Alasan   : Mencegah request login kosong mencapai Supabase Auth.
   * Dampak   : Membuat sesi cookie autentikasi terenkripsi di peramban pengguna jika sukses.
   * Input    : credentials (Objek berisi email dan password admin)
   * Hasil    : Objek status { success: true } atau { error: string }.
   */
  static async login(credentials: LoginCredentials) {
    if (!credentials.email || !credentials.password) {
      return { error: 'Email and password are required' }
    }
    
    const { error } = await AuthRepository.login(credentials)
    
    if (error) {
      return { error: error.message }
    }
    
    return { success: true }
  }

  /**
   * Memproses logout sesi admin.
   *
   * Kegunaan : Mengakhiri sesi pengguna yang sedang aktif dan menghapus token cookie.
   * Alasan   : Menjaga keamanan area admin dari akses yang tidak sah setelah keluar.
   * Dampak   : Pengguna kehilangan akses ke rute terproteksi (/admin/*) dan perlu login kembali.
   * Input    : Tanpa input.
   * Hasil    : Objek status { success: true } atau { error: string }.
   */
  static async logout() {
    const { error } = await AuthRepository.logout()
    if (error) {
      return { error: error.message }
    }
    return { success: true }
  }
}
