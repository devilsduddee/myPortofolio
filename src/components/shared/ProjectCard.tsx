import { Card } from '../ui/Card';
import type { Project } from '@prisma/client';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  const techStackList = project.tech_stack ? project.tech_stack.split(',').map(s => s.trim()) : [];

  return (
    <div className="h-full hover:-translate-y-2 transition-transform duration-500 group relative">
      <Card className="h-full flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all border border-white/60 border-t-white/90 overflow-hidden bg-white/50 backdrop-blur-2xl relative z-10 rounded-[2rem] group-hover:border-white/90">
        {/* Layer 4: Glass reflection internal highlight */}
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/50 pointer-events-none z-20"></div>
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/20 via-transparent to-white/5 pointer-events-none z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        {project.image_url && (
          <div className="relative w-full h-40 overflow-hidden bg-slate-100 shrink-0 border-b border-white/50">
            <Image 
              src={project.image_url} 
              alt={project.project_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-snug">{project.project_name}</h3>
          </div>
          
          <div className="space-y-3 flex-1 mt-1">
            <p className="text-slate-600 text-[13px] leading-relaxed font-normal tracking-tight line-clamp-3">{project.description}</p>
          </div>

          {techStackList.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/50">
              {techStackList.map((tech, i) => (
                <span key={i} className="text-[11px] font-medium text-slate-600 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200/50 shadow-sm tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {(project.demo_url || project.repository_url) && (
            <div className="mt-auto pt-4 flex items-center gap-2 border-t border-slate-200/50">
              {project.demo_url && (
                <a 
                  href={project.demo_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/80 text-slate-700 text-[13px] font-semibold rounded-lg border border-slate-200/50 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {project.repository_url && (
                <a 
                  href={project.repository_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 text-white text-[13px] font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-sm shadow-slate-900/20"
                >
                  <Github size={14} />
                  Repo
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
