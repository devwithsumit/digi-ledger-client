import { useState } from 'react';
import { Receipt } from 'lucide-react';
import { useGetMonthlyOverviewQuery } from '@/api/monthlyApi';
import { MonthSelector } from '@/components/monthly/MonthSelector';
import { MonthlySummary } from '@/components/monthly/MonthlySummary';
import { MonthlyTable } from '@/components/monthly/MonthlyTable';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { getCurrentMonth } from '@/utils/monthHelpers';

export function MonthlyOverviewPage() {

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

    const { data, isLoading, isError } = useGetMonthlyOverviewQuery({
        year: selectedMonth.year,
        month: selectedMonth.month,
    });

    const handleMonthChange = (year: number, month: number) => {
        setSelectedMonth({ year, month });
    };


    const handleOpenDetail = (roomId: number) => {
        window.location.href = `/monthly/room/${roomId}`;
    };

    return (
        <div className="space-y-6">
            <Breadcrumb />
            <div className="flex items-center gap-3">
                <Receipt className="w-7 h-7 text-primary" />
                <h1 className="text-xl font-bold text-slate-900">Monthly Overview</h1>
            </div>

            <MonthSelector
                selected={selectedMonth}
                onChange={handleMonthChange}
            />

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            ) : isError ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-slate-600">Failed to load monthly overview</p>
                </div>
            ) : !data || data?.records?.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-slate-600">No records found for this month</p>
                </div>
            ) : (
                <>
                    <MonthlySummary summary={data.summary} records={data.records} />
                    <MonthlyTable items={data.records} onOpenDetail={handleOpenDetail} />
                </>
            )}
        </div>
    );
}

