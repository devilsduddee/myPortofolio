/**
 * File        : src/components/sections/FooterSection.tsx
 * Deskripsi   : Komponen penutup bagian paling bawah (footer) pada halaman portofolio.
 *               Menampilkan identitas nama, gelar/tagline, serta informasi hak cipta.
 * Responsif   : Dioptimalkan untuk keterbacaan pada layar 320px-430px hingga layar lebar.
 */

import type { Profile, Contact } from '@prisma/client';

/**
 * Komponen Footer Publik.
 *
 * Kegunaan : Menampilkan baris penutup halaman berisi nama pemilik portofolio,
 *            badge logo 'AR', tagline profesional, dan catatan hak cipta.
 * Input    : profile (Data profil dari database), contact (Data kontak opsional)
 * Hasil    : Elemen <footer> dengan garis batas atas gaya Neo-Brutalism.
 */
export function FooterSection({ profile }: { profile?: Profile | null, contact?: Contact | null }) {
  return (
    <footer className="border-t-3 sm:border-t-4 border-neo-border bg-neo-surface py-6 sm:py-8 lg:py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Brand Mark & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <div className="bg-neo-yellow border-2 sm:border-3 border-neo-border px-3 py-1 sm:py-1.5 rounded-xl font-black text-base sm:text-lg shadow-brutal-sm text-neo-text shrink-0">
            AR
          </div>
          <div>
            <p className="font-extrabold uppercase text-neo-text text-xs sm:text-sm tracking-wider leading-tight">
              {profile?.full_name || 'Ahmad Ridho Syafaat'}
            </p>
            <p className="text-[10px] sm:text-xs font-bold text-neo-muted tracking-wide mt-0.5">
              {profile?.title || profile?.tagline || 'Full-Stack Developer & Software Engineer'}
            </p>
          </div>
        </div>

        {/* Catatan Hak Cipta */}
        <div className="text-center sm:text-right border-t border-neo-border/15 sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto">
          <p className="text-[11px] sm:text-xs font-black uppercase text-neo-text tracking-wider">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
          <p className="text-[10px] sm:text-[11px] font-bold text-neo-muted mt-0.5">
            Designed with Neo Brutalism UI
          </p>
        </div>

      </div>
    </footer>
  );
}
