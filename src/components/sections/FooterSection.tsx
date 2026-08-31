import type { Profile, Contact } from '@prisma/client';
import { SocialLinks } from '../shared/SocialLinks';

export function FooterSection({ profile, contact }: { profile: Profile | null, contact: Contact | null }) {
  return (
    <footer className="border-t-4 border-neo-border bg-neo-surface py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Mark */}
        <div className="flex items-center gap-3">
          <div className="bg-neo-yellow border-3 border-neo-border px-3 py-1.5 rounded-xl font-black text-lg shadow-brutal-sm">
            AR
          </div>
          <div>
            <p className="font-extrabold uppercase text-neo-text text-sm tracking-wider">
              {profile?.full_name || 'Ahmad Ridho Syafaat'}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <SocialLinks contact={contact} />

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-xs font-black uppercase text-neo-text tracking-wider">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
          <p className="text-[11px] font-bold text-neo-muted mt-0.5">
            Designed with Neo Brutalism UI
          </p>
        </div>

      </div>
    </footer>
  );
}


