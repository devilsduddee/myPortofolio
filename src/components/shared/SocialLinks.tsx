import type { Contact } from '@prisma/client';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

export function SocialLinks({ className = '', contact }: { className?: string, contact?: Contact | null }) {
  if (!contact) return null;

  return (
    <div className={`grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 w-full ${className}`}>
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl sm:rounded-full transition-all border border-white/10 shadow-lg shadow-black/20 min-h-[56px] sm:min-h-[44px]" aria-label="Email">
          <Mail size={22} className="sm:w-[18px] sm:h-[18px]" />
          <span className="font-medium text-[13px] sm:text-sm">Email</span>
        </a>
      )}
      {contact.linkedin_url && (
        <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl sm:rounded-full transition-all border border-white/10 shadow-lg shadow-black/20 min-h-[56px] sm:min-h-[44px]" aria-label="LinkedIn">
          <Linkedin size={22} className="sm:w-[18px] sm:h-[18px]" />
          <span className="font-medium text-[13px] sm:text-sm">LinkedIn</span>
        </a>
      )}
      {contact.github_url && (
        <a href={contact.github_url} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl sm:rounded-full transition-all border border-white/10 shadow-lg shadow-black/20 min-h-[56px] sm:min-h-[44px]" aria-label="GitHub">
          <Github size={22} className="sm:w-[18px] sm:h-[18px]" />
          <span className="font-medium text-[13px] sm:text-sm">GitHub</span>
        </a>
      )}
      {contact.phone && (
        <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl sm:rounded-full transition-all border border-white/10 shadow-lg shadow-black/20 min-h-[56px] sm:min-h-[44px]" aria-label="WhatsApp">
          <MessageCircle size={22} className="sm:w-[18px] sm:h-[18px]" />
          <span className="font-medium text-[13px] sm:text-sm">WhatsApp</span>
        </a>
      )}
    </div>
  );
}
