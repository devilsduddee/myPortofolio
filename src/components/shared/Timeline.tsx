'use client';

import { Building2, Calendar, Sparkles, CheckCircle2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  position: string;
  company: string;
  period: string;
  description: string;
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } }
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-6">
      
      {/* Start Cap Node */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-neo-yellow border-4 border-neo-border shadow-brutal-sm flex items-center justify-center text-neo-text font-black shrink-0 rotate-3">
          <Rocket className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div className="px-4 py-1.5 bg-neo-yellow border-3 border-neo-border shadow-brutal-sm rounded-full text-xs font-black uppercase text-neo-text tracking-wider">
          Career Milestone Journey
        </div>
      </div>

      {/* Main Timeline Container with Vertical Line */}
      <motion.div 
        className="relative pl-6 sm:pl-10 space-y-10 border-l-4 border-neo-border ml-6 sm:ml-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants} 
            className="relative flex items-start gap-4 sm:gap-6 group"
          >
            {/* Timeline Node Icon (Positioned over vertical line) */}
            <div className="absolute -left-[3.15rem] sm:-left-[3.65rem] top-1.5 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-neo-surface border-4 border-neo-border shadow-brutal-sm flex items-center justify-center shrink-0 z-10 group-hover:bg-neo-yellow group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <span className="font-black text-sm text-neo-text">#{index + 1}</span>
            </div>

            {/* Connecting Horizontal Stem */}
            <div className="absolute -left-6 sm:-left-10 top-7 w-6 sm:w-10 h-1 bg-neo-border" />

            {/* Experience Card */}
            <div className="w-full bg-neo-surface border-4 border-neo-border shadow-brutal hover:shadow-brutal-lg rounded-[24px] p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group-hover:border-neo-border">
              
              {/* Header Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-black text-2xl text-neo-text uppercase tracking-tight group-hover:text-neo-blue transition-colors">
                    {item.position}
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-xl bg-neo-yellow/30 border-2 border-neo-border text-neo-text font-black text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-neo-pink stroke-[2.5]" />
                    <span>{item.company}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neo-blue text-white border-2 border-neo-border shadow-[2px_2px_0px_#000000] font-black text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Description Body */}
              <p className="text-neo-muted text-sm sm:text-base leading-relaxed font-medium tracking-tight pt-2 border-t-2 border-neo-border/20">
                {item.description}
              </p>

            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* End Cap Node */}
      <div className="flex items-center gap-4 mt-6 ml-6 sm:ml-6 pl-6 sm:pl-10 relative">
        <div className="absolute -left-[0.65rem] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neo-green border-3 border-neo-border shadow-[2px_2px_0px_#000000] animate-pulse" />
        <div className="px-4 py-1.5 bg-neo-surface border-3 border-neo-border shadow-brutal-sm rounded-full text-xs font-black uppercase text-neo-text tracking-wider inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-neo-green stroke-[3]" />
          <span>Present & Growing</span>
        </div>
      </div>

    </div>
  );
}

