import { SectionContainer } from '../shared/SectionContainer';
import { AnimatedSection } from '../shared/AnimatedSection';
import { SocialLinks } from '../shared/SocialLinks';
import type { Contact, Profile } from '@prisma/client';

export function ContactSection({ contact, profile }: { contact: Contact | null, profile?: Profile | null }) {
  return (
    <SectionContainer id="contact" className="bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 text-center rounded-[2.5rem] mb-20 mx-4 md:mx-auto mt-32 p-12 lg:p-20 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 relative overflow-hidden max-w-5xl">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.05] relative z-10 tracking-tighter text-white">
          Let's Build Something<br/>Meaningful Together
        </h2>
        <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg md:text-[19px] relative z-10 leading-relaxed font-normal tracking-tight">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's connect and make it happen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href={contact?.email ? `mailto:${contact.email}` : '#contact'} className="w-full sm:w-auto bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all shadow-lg shadow-black/20 text-center text-sm">
            Send Message
          </a>
          <a href={profile?.cv_file || '#cv'} target={profile?.cv_file ? "_blank" : "_self"} className="w-full sm:w-auto bg-transparent text-slate-300 backdrop-blur-md border border-white/10 px-8 py-3.5 rounded-full font-semibold hover:bg-white/5 hover:text-white hover:scale-105 transition-all shadow-sm text-center text-sm">
            Download Resume
          </a>
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
