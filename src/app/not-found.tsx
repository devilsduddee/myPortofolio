import Link from 'next/link';
import { CTAButton } from '@/components/shared/CTAButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4">404 - Not Found</h2>
      <p className="text-xl text-slate-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <CTAButton href="/" variant="primary">
        Return Home
      </CTAButton>
    </div>
  );
}
