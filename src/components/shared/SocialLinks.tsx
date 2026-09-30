/**
 * File        : src/components/shared/SocialLinks.tsx
 * Deskripsi   : Komponen daftar tombol pill tautan media sosial (Email, LinkedIn, GitHub, WhatsApp, Website).
 * Responsif   : Menggunakan dimensi dan ikon lebih kecil pada perangkat mobile (320px-430px)
 *               agar tidak bersaing secara visual dengan tombol CTA utama.
 */

import type { Contact } from '@prisma/client';
import { Mail, Linkedin, Github, MessageCircle, Globe } from 'lucide-react';

/**
 * Komponen Daftar Tautan Media Sosial.
 *
 * Kegunaan : Menampilkan deretan tombol aksi tersier untuk kanal komunikasi sosial pengguna.
 * Input    : className (Class CSS tambahan), contact (Objek kontak dari Prisma)
 * Hasil    : Elemen flex berisi tautan media sosial.
 */
export function SocialLinks({ className = '', contact }: { className?: string, contact?: Contact | null }) {
  if (!contact) return null;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full ${className}`}>
      {contact.email && (
        <a 
          href={`mailto:${contact.email}`} 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neo-surface text-neo-text font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl border-2 sm:border-3 border-neo-border shadow-[2px_2px_0px_#000000] sm:shadow-brutal-sm brutal-btn-hover min-h-[34px] sm:min-h-[38px]" 
          aria-label="Email"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-neo-blue shrink-0" />
          <span>Email</span>
        </a>
      )}
      {contact.linkedin_url && (
        <a 
          href={contact.linkedin_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neo-surface text-neo-text font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl border-2 sm:border-3 border-neo-border shadow-[2px_2px_0px_#000000] sm:shadow-brutal-sm brutal-btn-hover min-h-[34px] sm:min-h-[38px]" 
          aria-label="LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-neo-blue shrink-0" />
          <span>LinkedIn</span>
        </a>
      )}
      {contact.github_url && (
        <a 
          href={contact.github_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neo-surface text-neo-text font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl border-2 sm:border-3 border-neo-border shadow-[2px_2px_0px_#000000] sm:shadow-brutal-sm brutal-btn-hover min-h-[34px] sm:min-h-[38px]" 
          aria-label="GitHub"
        >
          <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-neo-pink shrink-0" />
          <span>GitHub</span>
        </a>
      )}
      {contact.phone && (
        <a 
          href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neo-surface text-neo-text font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl border-2 sm:border-3 border-neo-border shadow-[2px_2px_0px_#000000] sm:shadow-brutal-sm brutal-btn-hover min-h-[34px] sm:min-h-[38px]" 
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-neo-green shrink-0" />
          <span>WhatsApp</span>
        </a>
      )}
      {contact.website_url && (
        <a 
          href={contact.website_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neo-surface text-neo-text font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl border-2 sm:border-3 border-neo-border shadow-[2px_2px_0px_#000000] sm:shadow-brutal-sm brutal-btn-hover min-h-[34px] sm:min-h-[38px]" 
          aria-label="Personal Website"
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-neo-blue shrink-0" />
          <span>Website</span>
        </a>
      )}
    </div>
  );
}
