import { ChevronDown } from 'lucide-react';
import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
    label: string;
    value: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

export function Select({ label, error, id, options, placeholder, ...props }: SelectProps) {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-slate-700 mb-1.5"
            >
                {label}
            </label>
            <div className='relative'>
                <select
                    id={id}
                    required
                    className={` outline-none
                    w-full px-4 py-3 rounded-xl border bg-white
                    text-slate-800 transition-all duration-200
                    focus:ring-2  focus:ring-primary/20 focus:border-primary
                    relative invalid:text-slate-400 appearance-none
                    ${error
                            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                            : 'border-slate-200 hover:border-slate-300'
                        }
                `}
                    {...props}
                >
                    {placeholder && <option disabled value="">{placeholder}</option>}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown strokeWidth={2}
                    className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
