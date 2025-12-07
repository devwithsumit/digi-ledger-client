import { Button } from '@/components/ui/Button';
import type { MonthlyOverviewItem } from '@/types/monthly';
import { MonthlyStatusBadge } from './MonthlyStatusBadge';

interface TenantRowProps {
    item: MonthlyOverviewItem;
    onOpenDetail: (roomId: number) => void;
}

export function TenantRow({ item, onOpenDetail }: TenantRowProps) {
    const isPaid = item.rentStatus === 'PAID';

    const handleAction = () => {
        onOpenDetail(item.roomId);
    };

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        if (e.detail === 1 && !e.shiftKey && !e.ctrlKey && !e.metaKey && e.button === 0) {
            const selection = window.getSelection?.();
            if (!selection || selection.type === 'Caret' || selection.toString().length === 0) {
                handleAction();
            }
        }
    };

    return (
        <tr onClick={handleRowClick} className="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {item.roomNumber}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{item.tenantName}</td>
            <td className="px-4 py-3">
                <MonthlyStatusBadge status={item.rentStatus as 'PAID' | 'UNPAID'} />
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">
                ₹{item.rentSnapshot.toLocaleString()}
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">
                {item.currentUnit !== null ? item.currentUnit.toLocaleString() : '-'}
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">
                <MonthlyStatusBadge status={item.electricityStatus as 'PAID' | 'UNPAID'} />
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">
                {item.hasPersistedRecord ? 'Recorded' : 'Not Created'}
            </td>
            <td className="px-4 py-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAction}
                    // disabled={!isPaid && !canMarkPaid}
                    className="w-auto px-4! py-1.5 text-sm!"
                >
                    {isPaid ? 'View/ Edit' : 'Mark Paid'}
                </Button>
            </td>
        </tr>
    );
}
