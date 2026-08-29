import type { Contact } from '@prisma/client';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

export function SocialLinks({ className = '', contact }: { className?: string, contact?: Contact | null }) {
  if (!contact) return null;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full transition-all border border-white/10 shadow-lg shadow-black/20" aria-label="Email">
          <Mail size={18} />
          <span className="font-medium text-sm">Email</span>
        </a>
      )}
      {contact.linkedin_url && (
        <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full transition-all border border-white/10 shadow-lg shadow-black/20" aria-label="LinkedIn">
          <Linkedin size={18} />
          <span className="font-medium text-sm">LinkedIn</span>
        </a>
      )}
      {contact.github_url && (
        <a href={contact.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full transition-all border border-white/10 shadow-lg shadow-black/20" aria-label="GitHub">
          <Github size={18} />
          <span className="font-medium text-sm">GitHub</span>
        </a>
      )}
      {contact.phone && (
        <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full transition-all border border-white/10 shadow-lg shadow-black/20" aria-label="WhatsApp">
          <MessageCircle size={18} />
          <span className="font-medium text-sm">WhatsApp</span>
        </a>
      )}
    </div>
  );
}
