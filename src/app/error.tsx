'use client';

import { useEffect } from 'react';
import { CTAButton } from '@/components/shared/CTAButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Something went wrong</h2>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        We encountered an unexpected error. Please try again later.
      </p>
      <button 
        onClick={() => reset()}
        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}
