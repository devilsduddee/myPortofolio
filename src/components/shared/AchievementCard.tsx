import { Card } from '../ui/Card';
import type { Achievement } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="h-full hover:-translate-y-2 transition-transform duration-500 group relative">
      <Card className="h-full flex flex-col transition-all border border-white/10 border-t-white/20 overflow-hidden bg-white/5 backdrop-blur-2xl relative z-10 rounded-[2rem] group-hover:border-white/20">
        {/* Layer 4: Glass reflection internal highlight */}
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none z-20"></div>
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        {achievement.certificate_url && (
          <div className="relative w-full aspect-video overflow-hidden bg-slate-900 flex items-center justify-center shrink-0 border-b border-white/10">
            {achievement.certificate_url.toLowerCase().endsWith('.pdf') ? (
              <div className="w-full h-full relative group/pdf overflow-hidden bg-white">
                {/* Hide iframe on small mobile, show button instead to save resources */}
                <div className="hidden sm:block">
                  <iframe 
                    src={`${achievement.certificate_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title={achievement.title}
                    className="w-[105%] h-[600px] absolute top-[-10px] left-1/2 -translate-x-1/2 scale-[1.15] origin-top pointer-events-none"
                    style={{ border: 'none' }}
                  />
                </div>
                <a 
                  href={achievement.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/60 sm:bg-slate-900/0 sm:group-hover/pdf:bg-slate-900/10 transition-colors"
                  aria-label="View Certificate"
                >
                  <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover/pdf:opacity-100 bg-white sm:bg-white/95 text-slate-900 text-sm font-bold px-5 py-2.5 rounded-xl sm:rounded-lg transform sm:translate-y-2 sm:group-hover/pdf:translate-y-0 transition-all shadow-xl min-h-[44px]">
                    <ExternalLink size={16} />
                    View PDF
                  </div>
                </a>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image 
                  src={achievement.certificate_url} 
                  alt={achievement.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        )}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3 gap-3">
            <h3 className="text-lg font-bold text-slate-100 leading-snug group-hover:text-indigo-400 transition-colors tracking-tight">{achievement.title}</h3>
            <span className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shrink-0 shadow-sm mt-0.5">
              {format(new Date(achievement.achievement_date), 'MMM yyyy')}
            </span>
          </div>
          <p className="text-slate-300 flex-1 text-sm md:text-base leading-relaxed md:leading-loose font-normal tracking-tight line-clamp-3 md:line-clamp-4 mt-1">{achievement.description}</p>
        </div>
      </Card>
    </div>
  );
}
