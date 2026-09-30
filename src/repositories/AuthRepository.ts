/**
 * File        : src/repositories/AuthRepository.ts
 * Deskripsi   : Repositori akses autentikasi Supabase Auth (Data Access Layer).
 * Alasan      : Mengisolasi pemanggilan SDK Supabase Auth dari logika aplikasi utama.
 * Dampak      : Berinteraksi langsung dengan backend Supabase Auth untuk pembuatan & penghapusan sesi.
 */

import { createClient } from '@/lib/supabase/server'
import { LoginCredentials } from '@/types/auth'

export class AuthRepository {
  /**
   * Mengirim kredensial ke Supabase Auth untuk otentikasi kata sandi.
   *
   * Kegunaan : Memanggil signInWithPassword pada SDK Supabase Server.
   * Alasan   : Memverifikasi keabsahan pasangan email & kata sandi dengan basis data pengguna.
   * Dampak   : Supabase merespons dengan token JWT dan menetapkan cookie sesi HTTP-only.
   * Input    : credentials (Objek berisi email dan password)
   * Hasil    : Objek respons Supabase { data, error }.
   */
  static async login(credentials: LoginCredentials) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })
    return { data, error }
  }

  /**
   * Memanggil pembersihan sesi pada Supabase Auth.
   *
   * Kegunaan : Memanggil signOut pada SDK Supabase Server.
   * Alasan   : Membatalkan enkripsi token JWT yang aktif di server Supabase.
   * Dampak   : Sesi pengguna di hancurkan di sisi server dan cookie dihapus dari respons.
   * Input    : Tanpa input.
   * Hasil    : Objek respons Supabase { error }.
   */
  static async logout() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  }
}
