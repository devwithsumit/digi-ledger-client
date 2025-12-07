import type { ReactNode } from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex -translate-x-2 items-center gap-2 mb-6">
            <Logo />
            <h1 className="text-3xl font-bold text-slate-800">DigiLedger</h1>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-500">{subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

