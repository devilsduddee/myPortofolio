import { SectionContainer } from '../shared/SectionContainer';
import { AnimatedSection } from '../shared/AnimatedSection';
import { SocialLinks } from '../shared/SocialLinks';
import type { Contact, Profile } from '@prisma/client';
import { CTAButton } from '../shared/CTAButton';

export function ContactSection({ contact, profile }: { contact: Contact | null, profile?: Profile | null }) {
  if (!contact && !profile) return null;

  return (
    <SectionContainer id="contact" className="bg-neo-yellow border-4 border-neo-border text-center rounded-[24px] mb-12 md:mb-20 mx-4 md:mx-auto mt-12 md:mt-32 px-5 py-8 sm:p-12 lg:p-16 shadow-brutal-lg relative overflow-hidden max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3.5 sm:mb-4 leading-[1.1] relative z-10 tracking-tight text-neo-text uppercase">
          Get In Touch
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg font-bold text-neo-text max-w-xl mx-auto mb-6 sm:mb-8 relative z-10">
          Have an opportunity or project in mind? Let's build something extraordinary together.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 mb-8 sm:mb-10">
          {contact?.email && (
            <CTAButton 
              href={`mailto:${contact.email}`} 
              variant="primary" 
              className="w-full sm:w-auto text-sm sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4 shadow-brutal"
            >
              SEND EMAIL TO ME
            </CTAButton>
          )}
          
          {profile?.cv_file && (
            <CTAButton 
              href={profile.cv_file} 
              variant="outline" 
              className="w-full sm:w-auto text-sm sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4 bg-neo-surface border-3 border-neo-border shadow-brutal-sm text-neo-text font-black" 
              target="_blank"
            >
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

