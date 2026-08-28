import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedSection } from '../shared/AnimatedSection';
import type { Profile } from '@prisma/client';

export function AboutSection({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <SectionContainer id="about" className="bg-transparent relative">
      <AnimatedSection>
        <SectionHeader title="About Me" subtitle="Who I Am & What I Do" />
        <div className="max-w-[800px] mx-auto relative mt-8">
          <div className="relative z-10 bg-white/60 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] border border-white/60 shadow-sm hover:shadow-md transition-all duration-700 ease-out">
            <div className="prose prose-slate w-full max-w-none">
              <p className="text-slate-700 leading-relaxed font-normal text-lg md:text-[19px] whitespace-pre-wrap tracking-tight">
                {profile.about_me}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
