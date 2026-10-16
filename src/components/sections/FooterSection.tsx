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
        
        {/* Brand Mark & Tagline Resmi */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          {/* Simbol Ikonik Spark Pivot */}
          <div className="relative w-10 h-10 shrink-0">
            <div className="absolute inset-0 bg-neo-border translate-x-1 translate-y-1 rounded-xl" />
            <div className="relative w-full h-full bg-neo-yellow border-2 border-neo-border rounded-xl flex items-center justify-center p-1.5 overflow-hidden">
              <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
                <rect x="24" y="56" width="16" height="42" rx="4" fill="#000000" />
                <rect x="48" y="34" width="16" height="64" rx="4" fill="#2563EB" stroke="#000000" strokeWidth="3" />
                <path d="M 88 16 Q 88 34 70 34 Q 88 34 88 52 Q 88 34 106 34 Q 88 34 88 16 Z" fill="#FF006E" stroke="#000000" strokeWidth="3" />
                <circle cx="88" cy="80" r="7" fill="#000000" />
              </svg>
            </div>
          </div>
          <div>
            <p className="font-black uppercase text-neo-text text-sm sm:text-base tracking-wider leading-tight">
              {profile?.full_name || 'Ahmad Ridho Syafaat'}
            </p>
            <p className="text-[10px] sm:text-xs font-bold text-neo-muted tracking-wide mt-1 sm:mt-0.5">
              {profile?.title || profile?.tagline || 'Full-Stack Developer & Software Engineer'}
            </p>
          </div>
        </div>

        {/* Catatan Hak Cipta */}
        <div className="text-center sm:text-right border-t-2 border-neo-border/20 sm:border-0 pt-3.5 sm:pt-0 w-full sm:w-auto">
          <p className="text-[11px] sm:text-xs font-black uppercase text-neo-text tracking-wider">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
          <p className="text-[10px] sm:text-[11px] font-bold text-neo-muted mt-1 sm:mt-0.5">
            Designed with Neo Brutalism UI
          </p>
        </div>

      </div>
    </footer>
  );
}
