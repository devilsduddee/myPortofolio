import { loginAction } from '@/features/auth/actions';
import { Lock, Mail, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div 
      style={{ colorScheme: 'light' }}
      className="min-h-screen flex items-center justify-center bg-neo-bg p-4 relative overflow-hidden text-neo-text selection:bg-neo-yellow selection:text-neo-text"
    >
      {/* Dot Grid Background Overlay */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      
      {/* Neo Brutalist Main Card Container */}
      <div className="w-full max-w-md p-8 sm:p-10 bg-neo-surface rounded-[24px] border-4 border-neo-border shadow-brutal-lg relative z-10">

        
        {/* Header Badge & Title */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neo-yellow border-3 border-neo-border shadow-brutal-sm text-neo-text font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-neo-pink stroke-[3]" />
            <span>PORTFOLIO ADMIN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-neo-text uppercase tracking-tight">
            ADMIN PORTAL
          </h1>
          
          <p className="text-neo-muted font-bold text-xs sm:text-sm leading-relaxed">
            Sign in with admin credentials to manage portfolio content
          </p>
        </div>
        
        <form action={loginAction as any} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-neo-text tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="admin@example.com"
                className="w-full px-4 py-3.5 pl-12 bg-white border-3 border-neo-border rounded-xl font-extrabold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/20 focus:shadow-brutal-sm outline-none transition-all" 
              />
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neo-text stroke-[3]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-neo-text tracking-wider">
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                name="password" 
                required 
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pl-12 bg-white border-3 border-neo-border rounded-xl font-extrabold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/20 focus:shadow-brutal-sm outline-none transition-all" 
              />
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neo-text stroke-[3]" />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-neo-blue text-white font-black text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center"
          >
            Sign In to Dashboard
          </button>
        </form>

        {/* Back to Public Portfolio Website */}
        <div className="mt-8 pt-6 border-t-3 border-neo-border text-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:bg-yellow-400 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Portfolio Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
}



