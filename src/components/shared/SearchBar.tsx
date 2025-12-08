import { X, Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
      <Search className="w-4 h-4 text-slate-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="flex-1 outline-none text-sm text-slate-900 placeholder:text-slate-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      )}
    </div>
  );
}