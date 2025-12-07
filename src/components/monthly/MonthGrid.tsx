import { MonthTile } from './MonthTile';
import { getMonthLabel } from '@/utils/monthHelpers';
import type { MonthlyRecord } from '@/types/monthly';
import type { Occupancy } from '@/types/occupancy';

interface MonthGridProps {
    year: number;
    records: MonthlyRecord[];
    activeOccupancy?: Occupancy;
    onMonthClick: (month: number) => void;
    isLoading: boolean;
}

export function MonthGrid({ year, records, activeOccupancy, onMonthClick, isLoading }: MonthGridProps) {
    const getMonthRecord = (month: number) => {
        return records.find((r) => r.month === month && r.year === year);
    };

    const isTenantActiveForMonth = (month: number): boolean => {
        if (!activeOccupancy) return false;
        const startDate = new Date(activeOccupancy.startDate);
        const monthDate = new Date(year, month - 1, 1);
        return startDate <= monthDate;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                const record = getMonthRecord(month);
                const status = record ? (record.rentStatus as 'PAID' | 'UNPAID') : 'UNPAID';
                const label = getMonthLabel(month);
                const isPersisted = !!record;
                const isActive = isTenantActiveForMonth(month);
                return (
                    <MonthTile
                        key={month}
                        label={label}
                        status={status}
                        record={record}
                        isPersisted={isPersisted}
                        isActive={isActive}
                        onClick={() => onMonthClick(month)}
                    />
                );
            })}
        </div>
    );
}
