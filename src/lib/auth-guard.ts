/**
 * File        : src/lib/auth-guard.ts
 * Deskripsi   : Helfer pelindung autentikasi server (requireAuth).
 *               Memastikan pengguna terautentikasi sebelum mengeksekusi Server Actions/API admin.
 */

import { createClient } from '@/lib/supabase/server';

/**
 * Memeriksa apakah sesi pengguna terautentikasi aktif di Supabase Auth.
 *
 * Kegunaan : Memvalidasi hak akses login admin. Jika belum login, lempar error 'Unauthorized'.
 * Input    : Tanpa input.
 * Hasil    : Objek data user Supabase jika valid.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  return user;
}
