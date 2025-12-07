import { MonthlyStatusBadge } from './MonthlyStatusBadge';
import type { MonthlyRecord } from '@/types/monthly';

interface MonthTileProps {
    label: string;
    status: 'PAID' | 'UNPAID';
    record?: MonthlyRecord;
    onClick: () => void;
    isPersisted?: boolean;
    isActive?: boolean;
}

export function MonthTile({ label, status, record, onClick, isPersisted = true, isActive = true }: MonthTileProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-white rounded-lg border p-4 hover:shadow-md transition-all text-left w-full 
                ${isPersisted
                    ? 'border-slate-200 hover:border-primary/30'
                    : 'border-slate-300 border-dashed opacity-75'
                } ${!isActive ? 'opacity-' : ''}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-900">{label}</span>
                <MonthlyStatusBadge status={status} />
            </div>
            {record && (
                <div className="space-y-1 text-xs text-slate-600 mt-2">
                    {record.previousUnit !== null && (
                        <div>Prev: {record.previousUnit}</div>
                    )}
                    {record.currentUnit !== null && (
                        <div>Curr: {record.currentUnit}</div>
                    )}
                    {/* {record.electricityRate !== null && (
                        <div>Rate: ₹{record.electricityRate}</div>
                    )} */}
                    {record.electricityBill !== null && (
                        <div className="font-semibold">Bill: ₹{record.electricityBill.toLocaleString()}</div>
                    )}
                </div>
            )}
        </button>
    );
}
