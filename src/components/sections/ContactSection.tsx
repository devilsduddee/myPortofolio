import { SectionContainer } from '../shared/SectionContainer';
import { AnimatedSection } from '../shared/AnimatedSection';
import { SocialLinks } from '../shared/SocialLinks';
import type { Contact, Profile } from '@prisma/client';
import { CTAButton } from '../shared/CTAButton';

export function ContactSection({ contact, profile }: { contact: Contact | null, profile?: Profile | null }) {
  if (!contact && !profile) return null;

  return (
    <SectionContainer id="contact" className="bg-neo-yellow border-4 border-neo-border text-center rounded-[20px] mb-20 mx-4 md:mx-auto mt-20 md:mt-32 p-8 sm:p-12 lg:p-16 shadow-brutal-lg relative overflow-hidden max-w-5xl">
      <AnimatedSection>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.1] relative z-10 tracking-tight text-neo-text uppercase">
          Get In Touch
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mb-10">
          {contact?.email && (
            <CTAButton href={`mailto:${contact.email}`} variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">
              GET IN TOUCH
            </CTAButton>
          )}
          
          {profile?.cv_file && (
            <CTAButton href={profile.cv_file} variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4 bg-neo-surface border-3 border-neo-border shadow-brutal-sm text-neo-text font-bold" target="_blank">
              DOWNLOAD RESUME
            </CTAButton>
          )}
        </div>
        
        {contact && (
          <div className="relative z-10 pt-8 border-t-4 border-neo-border">
            <SocialLinks contact={contact} />
          </div>
        )}
      </AnimatedSection>
    </SectionContainer>
  );
}

