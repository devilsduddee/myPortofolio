'use client';

import { useState } from 'react';
import type { Achievement } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { ExternalLink, X, Calendar, Trophy, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPdf = achievement.certificate_url?.toLowerCase().endsWith('.pdf');

  return (
    <>
      {/* Achievement Card */}
      <div className="h-full group relative brutal-card-hover bg-neo-surface border-4 border-neo-border shadow-brutal rounded-[20px] flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col flex-1">
          {achievement.certificate_url && (
            <div 
              onClick={() => setIsModalOpen(true)}
              className="relative w-full aspect-video overflow-hidden bg-neo-bg flex items-center justify-center shrink-0 border-b-4 border-neo-border cursor-pointer group/img"
            >
              {isPdf ? (
                <div className="w-full h-full relative group/pdf overflow-hidden bg-neo-surface">
                  <div className="hidden sm:block">
                    <iframe 
                      src={`${achievement.certificate_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={achievement.title}
                      className="w-[105%] h-[600px] absolute top-[-10px] left-1/2 -translate-x-1/2 scale-[1.15] origin-top pointer-events-none"
                      style={{ border: 'none' }}
                    />
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 bg-neo-yellow border-3 border-neo-border text-neo-text text-xs font-black uppercase px-4 py-2 rounded-xl shadow-brutal-sm">
                      <Eye size={16} className="stroke-[3]" />
                      <span>Read Full Achievement</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <Image 
                    src={achievement.certificate_url} 
                    alt={achievement.title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-neo-yellow border-3 border-neo-border text-neo-text text-xs font-black uppercase px-4 py-2 rounded-xl shadow-brutal-sm">
                      <Eye size={16} className="stroke-[3]" />
                      <span>Read Full Achievement</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-5 md:p-6 flex flex-col flex-1 bg-neo-surface justify-between">
            <div>
              <div className="flex justify-between items-start mb-4 gap-3">
                <h3 
                  onClick={() => setIsModalOpen(true)}
                  className="text-xl font-black text-neo-text leading-snug group-hover:text-neo-pink transition-colors tracking-tight line-clamp-2 cursor-pointer"
                >
                  {achievement.title}
                </h3>
                <span className="text-[12px] font-bold text-neo-text bg-neo-bg border-2 border-neo-border px-3 py-1.5 rounded-full shrink-0 shadow-[2px_2px_0px_#000000] mt-0.5 tracking-wide">
                  {format(new Date(achievement.achievement_date), 'MMM yyyy')}
                </span>
              </div>

              <p className="text-neo-muted text-sm md:text-base leading-relaxed font-medium tracking-tight line-clamp-3 mb-3">
                {achievement.description}
              </p>
            </div>

            {/* Read More Trigger Link */}
            <button 
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-black uppercase tracking-wider text-neo-pink hover:text-neo-blue underline decoration-2 underline-offset-4 transition-colors pt-2 self-start inline-flex items-center gap-1"
            >
              <span>Read Full Details →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Neo Brutalist Popup Modal for Achievement Details */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative z-10 bg-neo-surface border-4 border-neo-border shadow-brutal-lg rounded-[24px] max-w-2xl w-full p-6 sm:p-8 my-auto max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button Top Right */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-xl bg-neo-pink text-white border-3 border-neo-border shadow-brutal-sm flex items-center justify-center font-black hover:scale-105 active:translate-y-0.5 transition-all z-20"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 stroke-[3]" />
              </button>

              {/* Certificate Preview Banner */}
              {achievement.certificate_url && (
                <div className="relative w-full h-44 sm:h-56 max-h-[220px] rounded-2xl overflow-hidden border-3 border-neo-border shadow-brutal-sm mb-6 bg-neo-bg">
                  {isPdf ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neo-yellow/20">
                      <Trophy className="w-12 h-12 text-neo-pink mb-3 stroke-[2.5]" />
                      <span className="text-sm font-black uppercase text-neo-text mb-4">Official PDF Certificate Document</span>
                      <a 
                        href={achievement.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                      >
                        <ExternalLink size={16} className="stroke-[3]" />
                        <span>Open Certificate PDF</span>
                      </a>
                    </div>
                  ) : (
                    <Image 
                      src={achievement.certificate_url} 
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              )}


              {/* Title & Issued Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pr-10">
                <h2 className="text-2xl sm:text-3xl font-black text-neo-text uppercase tracking-tight">
                  {achievement.title}
                </h2>
                
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neo-yellow text-neo-text border-2 border-neo-border shadow-[2px_2px_0px_#000000] font-black text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{format(new Date(achievement.achievement_date), 'MMMM yyyy')}</span>
                </div>
              </div>

              {/* Full Description Text */}
              <div className="border-t-3 border-b-3 border-neo-border py-5 mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-neo-muted mb-2">Achievement Details</h4>
                <p className="text-neo-text text-base leading-relaxed font-medium whitespace-pre-line">
                  {achievement.description}
                </p>
              </div>

              {/* Actions & Close Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {achievement.certificate_url && (
                  <a 
                    href={achievement.certificate_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-neo-blue text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 transition-all text-center"
                  >
                    <ExternalLink size={16} className="stroke-[3]" />
                    <span>View Official Certificate</span>
                  </a>
                )}

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neo-pink text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:scale-105 active:translate-y-0.5 transition-all text-center"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

