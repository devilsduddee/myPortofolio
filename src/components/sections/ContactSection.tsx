import { SectionContainer } from '../shared/SectionContainer';
import { AnimatedSection } from '../shared/AnimatedSection';
import { SocialLinks } from '../shared/SocialLinks';
import type { Contact, Profile } from '@prisma/client';

export function ContactSection({ contact, profile }: { contact: Contact | null, profile?: Profile | null }) {
  return (
    <SectionContainer id="contact" className="bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 text-center rounded-[2.5rem] mb-20 mx-4 md:mx-auto mt-20 md:mt-32 p-8 sm:p-12 lg:p-20 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 relative overflow-hidden max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 md:mb-6 leading-[1.1] relative z-10 tracking-tighter text-white w-full max-w-lg mx-auto">
          Let's Build Something<br/>Meaningful Together
        </h2>
        <p className="text-slate-300 mb-8 md:mb-10 w-full max-w-lg mx-auto text-[15px] sm:text-lg md:text-[19px] relative z-10 leading-relaxed font-normal tracking-tight px-2">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's connect and make it happen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mb-12">
          <a href={contact?.email ? `mailto:${contact.email}` : '#contact'} className="w-full sm:w-auto bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 sm:py-3.5 rounded-2xl sm:rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all shadow-lg shadow-black/20 text-center text-[15px] sm:text-sm min-h-[44px]">
            Send Message
          </a>
          <a href={profile?.cv_file || '#cv'} target={profile?.cv_file ? "_blank" : "_self"} className="w-full sm:w-auto bg-transparent text-slate-300 backdrop-blur-md border border-white/10 px-8 py-4 sm:py-3.5 rounded-2xl sm:rounded-full font-semibold hover:bg-white/5 hover:text-white hover:scale-105 transition-all shadow-sm text-center text-[15px] sm:text-sm min-h-[44px]">
            Download Resume
          </a>
        </div>
        
        <div className="relative z-10 mt-12 pt-10 border-t border-white/10">
          <p className="text-sm text-slate-400 mb-6 font-medium tracking-wide uppercase">Or connect with me on</p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3">
            <SocialLinks contact={contact} className="!justify-start sm:!justify-center col-span-2 grid grid-cols-2 sm:flex gap-3" />
          </div>
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
