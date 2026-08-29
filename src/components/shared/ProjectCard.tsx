import { Card } from '../ui/Card';
import type { Project } from '@prisma/client';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  const techStackList = project.tech_stack ? project.tech_stack.split(',').map(s => s.trim()) : [];

  return (
    <div className="h-full hover:-translate-y-2 transition-transform duration-500 group relative">
      <Card className="h-full flex flex-col transition-all border border-white/10 border-t-white/20 overflow-hidden bg-white/5 backdrop-blur-2xl relative z-10 rounded-[2rem] group-hover:border-white/20">
        {/* Layer 4: Glass reflection internal highlight */}
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none z-20"></div>
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        {/* Image or Fallback */}
        <div className="relative w-full aspect-video overflow-hidden bg-slate-900 shrink-0 border-b border-white/10 flex items-center justify-center">
          {project.image_url ? (
            <Image 
              src={project.image_url} 
              alt={project.project_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-bold text-white/20 tracking-tighter uppercase">
                {project.project_name.substring(0, 2)}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5 md:p-6 flex flex-col flex-grow">
          {/* Content Area pushes footer to bottom */}
          <div className="flex-grow flex flex-col">
            <div className="mb-2">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors tracking-tight leading-snug line-clamp-1">{project.project_name}</h3>
            </div>
            
            <div className="mt-1">
              {/* Force minimum height/line-clamps for consistent layout */}
              <p className="text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose font-normal tracking-tight line-clamp-3 min-h-[4.5rem] md:min-h-[5.5rem]">{project.description}</p>
            </div>
          </div>

          {/* Footer Area (Tags and Buttons always at bottom) */}
          <div className="mt-6 flex flex-col justify-end">
            {techStackList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-4">
                {techStackList.map((tech, i) => (
                  <span key={i} className="text-[11px] font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 shadow-sm tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className={`flex items-center gap-2 w-full ${techStackList.length === 0 ? 'pt-4 border-t border-white/10' : ''}`}>
              {project.demo_url && (
                <a 
                  href={project.demo_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 text-white text-[13px] font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:text-blue-400 hover:border-blue-400/50 transition-all shadow-sm shadow-black/20 text-center min-w-0"
                >
                  <ExternalLink size={14} className="shrink-0" />
                  <span className="truncate">Live Demo</span>
                </a>
              )}
              
              {project.repository_url && (
                <a 
                  href={project.repository_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${project.demo_url ? 'flex-1' : 'w-full'} flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 text-slate-300 text-[13px] font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-sm shadow-black/20 text-center min-w-0`}
                >
                  <Github size={14} className="shrink-0" />
                  <span className="truncate">Repo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
