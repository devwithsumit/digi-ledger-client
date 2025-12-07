import type { MonthlySummary as MonthlySummaryType, MonthlyOverviewItem } from '@/types/monthly';

interface MonthlySummaryProps {
    summary: MonthlySummaryType;
    records: MonthlyOverviewItem[];
}

export function MonthlySummary({ summary, records }: MonthlySummaryProps) {

    // Calculate total rent, collected, and remaining
    const totalRent = records.reduce((sum, record) => sum + (record.rentSnapshot || 0), 0);
    const totalCollected = records
        .filter((record) => record.rentStatus === 'PAID')
        .reduce((sum, record) => sum + (record.rentSnapshot || 0), 0);
    const totalRemaining = totalRent - totalCollected;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Tenant fields first */}
                <div className="col-start-1 row-start-1 sm:col-start-1 sm:row-start-1">
                    <p className="text-sm text-slate-500">Total Tenants</p>
                    <p className="text-xl font-bold text-slate-900">{summary.totalTenants}</p>
                </div>
                <div className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1">
                    <p className="text-sm text-slate-500">Paid</p>
                    <p className="text-xl font-bold text-green-600">{summary.paidCount}</p>
                </div>
                <div className="col-start-1 row-start-3 sm:col-start-3 sm:row-start-1">
                    <p className="text-sm text-slate-500">Unpaid</p>
                    <p className="text-xl font-bold text-red-600">{summary.unpaidCount}</p>
                </div>
                {/* Rent fields at the end for desktop */}
                <div className="col-start-2 sm:col-start-1 sm:row-start-2 lg:row-start-1 lg:col-auto text-right sm:text-left">
                    <p className="text-sm text-slate-500 ">Total Rent</p>
                    <p className="text-xl font-bold text-slate-900">₹{totalRent.toLocaleString()}</p>
                </div>
                <div className="col-start-2 sm:col-start-2 sm:row-start-2 lg:row-start-1 lg:col-auto text-right sm:text-left">
                    <p className="text-sm text-slate-500 ">Collected</p>
                    <p className="text-xl font-bold text-green-600">₹{totalCollected.toLocaleString()}</p>
                </div>
                {totalRemaining > 0 && (
                    <div className="col-start-2 sm:col-start-3 sm:row-start-2 lg:row-start-1 lg:col-auto text-right sm:text-left">
                        <p className="text-sm text-slate-500">Remaining</p>
                        <p className="text-xl font-bold text-red-600">₹{totalRemaining.toLocaleString()}</p>
                    </div>
                )}
                {/* {totalRemaining > 0 && (
                    <div className="col-span-2 mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">Remaining</p>
                            <p className="text-lg font-bold text-red-600">₹{totalRemaining.toLocaleString()}</p>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}

