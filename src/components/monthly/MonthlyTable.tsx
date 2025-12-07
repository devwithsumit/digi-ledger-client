import { TenantRow } from './TenantRow';
import type { MonthlyOverviewItem } from '@/types/monthly';

interface MonthlyTableProps {
    items: MonthlyOverviewItem[];
    onOpenDetail: (roomId: number) => void;
}
const tableHeaders = [
    { label: 'Room', key: 'roomNumber' },
    { label: 'Tenant', key: 'tenantName' },
    { label: 'Status', key: 'rentStatus' },
    { label: 'Rent', key: 'rentSnapshot' },
    { label: 'Unit', key: 'currentUnit' },
    { label: 'Electricity', key: 'electricityStatus' },
    { label: 'Record', key: 'hasPersistedRecord' },
];
export function MonthlyTable({ items, onOpenDetail }: MonthlyTableProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            {tableHeaders.map((header) => (
                                <th key={header.key} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{header.label}</th>
                            ))}
                            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <TenantRow key={item.roomId} item={item} onOpenDetail={onOpenDetail} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

