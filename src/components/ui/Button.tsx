import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    w-full py-2.5 px-6 text-[15px] sm:text-base rounded-xl font-semibold
    transition-all duration-200 cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-primary text-white
      hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25
      active:scale-[0.98]
    `,
    secondary: `
      bg-slate-100 text-slate-700
      hover:bg-slate-200
      active:scale-[0.98]
    `,
    tertiary: `
      bg-slate-200 text-slate-700
      hover:bg-slate-200
      active:scale-[0.98]
    `
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
}

