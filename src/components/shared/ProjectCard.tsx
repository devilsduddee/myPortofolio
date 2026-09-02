'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@prisma/client';
import Image from 'next/image';
import { ExternalLink, Github, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const techStackList = project.tech_stack ? project.tech_stack.split(',').map(s => s.trim()) : [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const rect = card.getBoundingClientRect();

      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <>
      {/* Project Card */}
      <div 
        ref={cardRef}
        className="h-full group brutal-card-hover bg-neo-surface border-4 border-neo-border shadow-brutal rounded-[20px] overflow-hidden flex flex-col justify-between"
      >

        
        <div>
          {/* Image Banner */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="relative w-full aspect-video overflow-hidden bg-neo-yellow/20 shrink-0 border-b-4 border-neo-border flex items-center justify-center cursor-pointer group/img"
          >
            {project.image_url ? (
              <Image 
                src={project.image_url} 
                alt={project.project_name}
                fill
                className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full min-h-[180px] bg-neo-blue flex flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl font-black text-white uppercase tracking-tighter">
                  {project.project_name.substring(0, 2)}
                </span>
              </div>
            )}
            
            {/* Quick View Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm">
                <Eye className="w-4 h-4 stroke-[3]" />
                <span>Read Full Project</span>
              </span>
            </div>
          </div>
          
          {/* Content Header & Body */}
          <div className="p-6 md:p-7">
            <h3 
              onClick={() => setIsModalOpen(true)}
              className="text-2xl font-black text-neo-text group-hover:text-neo-blue transition-colors uppercase tracking-tight mb-3 line-clamp-2 cursor-pointer"
            >
              {project.project_name}
            </h3>
            
            <p className="text-neo-muted text-sm sm:text-base font-medium leading-relaxed mb-3 line-clamp-3">
              {project.description}
            </p>

            {/* Read More Trigger Button */}
            <button 
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-black uppercase tracking-wider text-neo-blue hover:text-neo-pink underline decoration-2 underline-offset-4 transition-colors mb-2 inline-flex items-center gap-1"
            >
              <span>Read Full Details →</span>
            </button>
          </div>
        </div>

        {/* Footer Area: Tech Stack & Actions */}
        <div className="px-6 pb-6 md:px-7 md:pb-7 pt-0">
          {/* Tech Stack Badges */}
          {techStackList.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t-3 border-neo-border mb-5">
              {techStackList.map((tech, i) => (
                <span 
                  key={i} 
                  className={`brutal-badge ${i % 3 === 0 ? 'bg-neo-yellow text-neo-text' : i % 3 === 1 ? 'bg-neo-blue text-white' : 'bg-neo-pink text-white'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center gap-3 w-full">
            {project.demo_url && (
              <a 
                href={project.demo_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neo-blue text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border brutal-btn-hover text-center"
              >
                <ExternalLink size={16} className="stroke-[3]" />
                <span>Live Demo</span>
              </a>
            )}
            
            {project.repository_url && (
              <a 
                href={project.repository_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${project.demo_url ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 px-4 py-3 bg-neo-surface text-neo-text font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border brutal-btn-hover text-center`}
              >
                <Github size={16} className="stroke-[3]" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Neo Brutalist Popup Modal rendered via Portal to Document Body */}
      {isMounted && createPortal(
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

              {/* Modal Dialog Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 30, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
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

                {/* Modal Banner Image */}
                {project.image_url && (
                  <div className="relative w-full h-44 sm:h-56 max-h-[220px] rounded-2xl overflow-hidden border-3 border-neo-border shadow-brutal-sm mb-6 bg-neo-yellow/20">
                    <Image 
                      src={project.image_url} 
                      alt={project.project_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Modal Title */}
                <h2 className="text-2xl sm:text-3xl font-black text-neo-text uppercase tracking-tight mb-4 pr-12">
                  {project.project_name}
                </h2>


                {/* Tech Stack List */}
                {techStackList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {techStackList.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`brutal-badge ${i % 3 === 0 ? 'bg-neo-yellow text-neo-text' : i % 3 === 1 ? 'bg-neo-blue text-white' : 'bg-neo-pink text-white'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Full Description Text */}
                <div className="border-t-3 border-b-3 border-neo-border py-5 mb-6">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neo-muted mb-2">Project Overview</h4>
                  <p className="text-neo-text text-base leading-relaxed font-medium whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                {/* Modal Actions & Close Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {project.demo_url && (
                    <a 
                      href={project.demo_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-neo-blue text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 transition-all text-center"
                    >
                      <ExternalLink size={16} className="stroke-[3]" />
                      <span>Visit Live Demo</span>
                    </a>
                  )}
                  
                  {project.repository_url && (
                    <a 
                      href={project.repository_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 transition-all text-center"
                    >
                      <Github size={16} className="stroke-[3]" />
                      <span>View Repository</span>
                    </a>
                  )}

                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-neo-bg text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:bg-neo-pink hover:text-white transition-all text-center"
                  >
                    Close
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}




