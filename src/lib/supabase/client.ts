/**
 * File        : src/lib/supabase/client.ts
 * Deskripsi   : Membuat klien Supabase untuk lingkungan peramban (browser / client component).
 */

import { createBrowserClient } from '@supabase/ssr'

/**
 * Membuat instance kuesioner klien browser Supabase Auth & DB.
 *
 * Kegunaan : Menyiapkan klien Supabase browser menggunakan environment variable publik.
 * Input    : Tanpa input.
 * Hasil    : Objek SupabaseClient browser.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
