import { SectionContainer } from '../shared/SectionContainer';
import { AnimatedSection } from '../shared/AnimatedSection';
import { SocialLinks } from '../shared/SocialLinks';
import type { Contact, Profile } from '@prisma/client';

export function ContactSection({ contact, profile }: { contact: Contact | null, profile?: Profile | null }) {
  return (
    <SectionContainer id="contact" className="bg-white/40 backdrop-blur-xl border border-white/60 text-slate-900 text-center rounded-[2.5rem] mb-20 mx-4 md:mx-auto mt-32 p-12 lg:p-20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden max-w-5xl">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.05] relative z-10 tracking-tighter text-slate-900">
          Let's Build Something<br/>Meaningful Together
        </h2>
        <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg md:text-[19px] relative z-10 leading-relaxed font-normal tracking-tight">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's connect and make it happen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href={contact?.email ? `mailto:${contact.email}` : '#contact'} className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-[0_8px_20px_rgba(15,23,42,0.1)] text-center text-sm">
            Send Message
          </a>
          <a href={profile?.cv_file || '#cv'} target={profile?.cv_file ? "_blank" : "_self"} className="w-full sm:w-auto bg-white/80 text-slate-700 border border-slate-200/50 px-8 py-3.5 rounded-xl font-semibold hover:bg-white transition-all shadow-sm text-center text-sm">
            Download Resume
          </a>
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
