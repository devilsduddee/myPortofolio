/**
 * File        : src/components/sections/ContactSection.tsx
 * Deskripsi   : Komponen section kontak ("Get In Touch") pada halaman depan portofolio.
 *               Menampilkan kartu panggilan aksi (CTA) utama untuk pengiriman email,
 *               unduhan berkas CV/resume, serta tautan ke media sosial.
 * Responsif   : Disesuaikan secara khusus untuk layar mobile 320px - 430px hingga layar desktop.
 */

import { SectionContainer } from '../shared/SectionContainer';
import { AnimatedSection } from '../shared/AnimatedSection';
import { SocialLinks } from '../shared/SocialLinks';
import type { Contact, Profile } from '@prisma/client';
import { CTAButton } from '../shared/CTAButton';

/**
 * Komponen Section Kontak Publik.
 *
 * Kegunaan : Menampilkan blok kartu kuning bergaya Neo-Brutalism dengan hierarki visual
 *            yang jelas (Primary: Email CTA, Secondary: Resume CTA, Tertiary: Social Pills).
 * Input    : contact (Data objek kontak dari database / Prisma),
 *            profile (Data objek profil pengguna dari database / Prisma)
 * Hasil    : Elemen kartu kontak yang dibungkus dalam container animasi <SectionContainer>.
 */
export function ContactSection({ contact, profile }: { contact: Contact | null, profile?: Profile | null }) {
  if (!contact && !profile) return null;

  return (
    <SectionContainer id="contact" className="bg-neo-yellow border-3 sm:border-4 border-neo-border text-center rounded-[20px] sm:rounded-[24px] mx-auto mb-20 sm:mb-24 md:mb-32 p-4 sm:p-6 md:p-8 shadow-brutal sm:shadow-brutal-lg relative overflow-hidden max-w-2xl">
      <AnimatedSection>
        {/* Judul Utama Section */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-2.5 leading-[1.1] relative z-10 tracking-tight text-neo-text uppercase">
          Get In Touch
        </h2>
        
        {/* Subtitle / Deskripsi Singkat */}
        <p className="text-[11px] sm:text-xs md:text-sm font-bold text-neo-text max-w-md mx-auto mb-4 sm:mb-6 relative z-10 leading-relaxed">
          Have an opportunity or project in mind? Let's build something extraordinary together.
        </p>
        
        {/* Tombol Aksi Utama & Sekunder (Primary & Secondary CTA) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 relative z-10 mb-5 sm:mb-6 w-full max-w-xs sm:max-w-none mx-auto">
          {contact?.email && (
            <CTAButton 
              href={`mailto:${contact.email}`} 
              variant="primary" 
              className="w-full sm:w-auto text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 shadow-brutal-sm font-black"
            >
              SEND EMAIL TO ME
            </CTAButton>
          )}
          
          {profile?.cv_file && (
            <CTAButton 
              href={profile.cv_file} 
              variant="outline" 
              className="w-full sm:w-auto text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 bg-neo-surface border-3 border-neo-border shadow-brutal-sm text-neo-text font-black" 
              target="_blank"
            >
              DOWNLOAD RESUME
            </CTAButton>
          )}
        </div>
        
        {/* Tautan Media Sosial (Tertiary Actions) */}
        {contact && (
          <div className="relative z-10 pt-4 sm:pt-5 border-t-2 sm:border-t-3 border-neo-border">
            <SocialLinks contact={contact} />
          </div>
        )}
      </AnimatedSection>
    </SectionContainer>
  );
}
