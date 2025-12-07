import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        onWheel={e => (e.target as HTMLInputElement).blur()}
        className={`
          w-full px-4 py-3 rounded-xl border bg-white
          text-slate-900 placeholder:text-slate-400
          transition-all duration-200
          focus:ring-2 focus:ring-primary/20 focus:border-primary
          ${error
            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
            : 'border-slate-200 hover:border-slate-300'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

