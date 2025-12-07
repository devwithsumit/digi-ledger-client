import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Occupancy } from '@/types/occupancy';

interface DeleteOccupancyConfirmProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    occupancy: Occupancy | null;
    isLoading: boolean;
}

export function DeleteOccupancyConfirm({
    isOpen,
    onClose,
    onConfirm,
    occupancy,
    isLoading,
}: DeleteOccupancyConfirmProps) {
    if (!isOpen || !occupancy) return null;

    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <div onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Delete Occupancy</h2>
                            <p className="text-xs sm:text-sm text-slate-500">This action cannot be undone</p>
                        </div>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 mb-6">
                        Are you sure you want to delete the occupancy for{' '}
                        <span className="font-semibold">{occupancy.tenantName}</span> (Room {occupancy.roomNumber})?
                        This will permanently remove this occupancy record.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                            <span className="text-sm sm:text-base">Cancel</span>
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            isLoading={isLoading}
                            className="bg-red-600 hover:bg-red-700 hover:shadow-red-600/25"
                        >
                            <span className="text-sm sm:text-base">Delete</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

