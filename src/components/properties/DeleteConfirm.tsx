import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Room } from '@/types/room';

interface DeleteConfirmProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    room: Room | null;
    isLoading: boolean;
}

export function DeleteConfirm({ isOpen, onClose, onConfirm, room, isLoading }: DeleteConfirmProps) {
    if (!isOpen || !room) return null;

    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Delete Room</h2>
                            <p className="text-sm text-slate-500">This action cannot be undone</p>
                        </div>
                    </div>
                    <p className="text-slate-600 mb-6">
                        Are you sure you want to delete room <span className="font-semibold">{room.roomNumber}</span>?
                        This will permanently remove it from your properties.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            isLoading={isLoading}
                            className="bg-red-600 hover:bg-red-700 hover:shadow-red-600/25"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

