export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef4ff,#f7fafc)] relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Layer 1: Noise Texture */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0"></div>
      
      {/* Layer 2: Grid Pattern - Extremely subtle */}
      <div className="fixed inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none z-0"></div>
      
      {/* Layer 3: Environmental Lighting (4-point ambient system, prominent for glassmorphism) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] mix-blend-multiply animate-float-slow"></div>
        <div className="absolute top-[-10%] right-[-20%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] mix-blend-multiply animate-float-slower"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-[90vw] h-[90vw] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] mix-blend-multiply animate-float-slow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)] mix-blend-overlay animate-float-slower" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Layer 4: Extremely subtle moving light gradient (30-40s) */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_30s_infinite_linear] opacity-10 pointer-events-none z-0"></div>
      
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full flex flex-col">
        {children}
      </main>
    </div>
  );
}
