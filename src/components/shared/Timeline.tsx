import { Building2 } from 'lucide-react';

interface TimelineItemProps {
  position: string;
  company: string;
  period: string;
  description: string;
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  return (
    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
      {items.map((item, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-md">
            <span className="w-1.5 h-1.5 bg-slate-200 group-hover:bg-slate-600 rounded-full transition-colors duration-500"></span>
          </div>
          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-6 md:p-8 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-700 ease-out relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                <h3 className="font-bold text-lg md:text-xl text-slate-900 tracking-tight leading-snug">{item.position}</h3>
                <time className="text-[11px] font-semibold tracking-wide text-slate-500 bg-white/80 border border-slate-200/50 px-2.5 py-1 rounded-full shadow-sm uppercase shrink-0">{item.period}</time>
              </div>
              <div className="text-slate-600 text-[13px] font-medium mb-5 flex items-center gap-2">
                <Building2 size={14} className="text-slate-400" />
                {item.company}
              </div>
              <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed font-normal tracking-tight">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
