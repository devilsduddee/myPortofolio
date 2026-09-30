/**
 * File        : src/features/auth/actions.ts
 * Deskripsi   : Server Action untuk menangani login dan logout sesi admin di Supabase Auth.
 */

'use server'

import { AuthService } from '@/services/AuthService'
import { redirect } from 'next/navigation'

/**
 * Menangani proses autentikasi masuk (login) admin.
 *
 * Kegunaan : Memeriksa email dan kata sandi admin, lalu mengarahkan ke dashboard jika sukses.
 * Input    : formData (Objek FormData yang berisi 'email' dan 'password')
 * Hasil    : Pengalihan ke '/admin/dashboard' atau pesan error jika gagal.
 */
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const result = await AuthService.login({ email, password })
  
  if (result.error) {
    return { error: result.error }
  }
  
  redirect('/admin/dashboard')
}

/**
 * Menangani proses keluar (logout) dari sesi admin.
 *
 * Kegunaan : Menghapus cookie sesi autentikasi dan mengarahkan kembali ke halaman login.
 * Input    : Tanpa input.
 * Hasil    : Pengalihan rute ke '/admin/login'.
 */
export async function logoutAction() {
  await AuthService.logout()
  redirect('/admin/login')
}
