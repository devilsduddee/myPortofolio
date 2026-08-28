import type { Profile, Contact } from '@prisma/client';
import { SocialLinks } from '../shared/SocialLinks';

export function FooterSection({ profile, contact }: { profile: Profile | null, contact: Contact | null }) {
  return (
    <footer className="border-t border-slate-200/50 bg-transparent py-12 relative z-10">
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center space-y-6">
        <SocialLinks contact={contact} className="gap-6" />
        <div className="flex flex-col items-center space-y-2">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} {profile?.full_name || 'Ahmad Ridho Syafaat'}. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
