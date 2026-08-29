'use client';
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  position: string;
  company: string;
  period: string;
  description: string;
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemAnim} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-500 group-hover:border-white/40 group-hover:shadow-md backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-white/40 group-hover:bg-white rounded-full transition-colors duration-500"></span>
          </div>
          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-5 md:p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-700 ease-out relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                <h3 className="font-bold text-lg md:text-xl text-white tracking-tight leading-snug">{item.position}</h3>
                <time className="text-[11px] font-semibold tracking-wide text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shadow-sm uppercase shrink-0">{item.period}</time>
              </div>
              <div className="text-slate-300 text-[13px] md:text-sm font-medium mb-5 flex items-center gap-2">
                <Building2 size={16} className="text-slate-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                {item.company}
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed md:leading-loose font-normal tracking-tight">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
