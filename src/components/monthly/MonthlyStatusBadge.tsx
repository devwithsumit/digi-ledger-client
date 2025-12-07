interface MonthlyStatusBadgeProps {
    status: 'PAID' | 'UNPAID';
}

export function MonthlyStatusBadge({ status }: MonthlyStatusBadgeProps) {
    const isPaid = status === 'PAID';

    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${isPaid
                ? 'bg-green-50 text-green-700'
                : 'bg-yellow-50 text-yellow-700'
                }`}
        >
            {status}
        </span>
    );
}

