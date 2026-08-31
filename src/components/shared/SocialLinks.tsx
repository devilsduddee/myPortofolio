import type { Contact } from '@prisma/client';
import { Mail, Linkedin, Github, MessageCircle, Globe } from 'lucide-react';

export function SocialLinks({ className = '', contact }: { className?: string, contact?: Contact | null }) {
  if (!contact) return null;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3.5 w-full ${className}`}>
      {contact.email && (
        <a 
          href={`mailto:${contact.email}`} 
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neo-surface text-neo-text font-black text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm brutal-btn-hover min-h-[44px]" 
          aria-label="Email"
        >
          <Mail size={18} className="stroke-[3] text-neo-blue" />
          <span>Email</span>
        </a>
      )}
      {contact.linkedin_url && (
        <a 
          href={contact.linkedin_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neo-surface text-neo-text font-black text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm brutal-btn-hover min-h-[44px]" 
          aria-label="LinkedIn"
        >
          <Linkedin size={18} className="stroke-[3] text-neo-blue" />
          <span>LinkedIn</span>
        </a>
      )}
      {contact.github_url && (
        <a 
          href={contact.github_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neo-surface text-neo-text font-black text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm brutal-btn-hover min-h-[44px]" 
          aria-label="GitHub"
        >
          <Github size={18} className="stroke-[3] text-neo-pink" />
          <span>GitHub</span>
        </a>
      )}
      {contact.phone && (
        <a 
          href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neo-surface text-neo-text font-black text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm brutal-btn-hover min-h-[44px]" 
          aria-label="WhatsApp"
        >
          <MessageCircle size={18} className="stroke-[3] text-neo-green" />
          <span>WhatsApp</span>
        </a>
      )}
      {contact.website_url && (
        <a 
          href={contact.website_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neo-surface text-neo-text font-black text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm brutal-btn-hover min-h-[44px]" 
          aria-label="Personal Website"
        >
          <Globe size={18} className="stroke-[3] text-neo-blue" />
          <span>Website</span>
        </a>
      )}
    </div>
  );
}


