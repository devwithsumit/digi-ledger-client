import { useState, type FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { Room, CreateRoomRequest, UpdateRoomRequest } from '@/types/room';

interface RoomFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateRoomRequest | UpdateRoomRequest) => Promise<Boolean>;
    room?: Room | null;
    isLoading: boolean;
}

const ROOM_TYPE_OPTIONS = [
    { label: 'Deluxe', value: 'Deluxe' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Small', value: 'Small' },
];

export function RoomForm({ isOpen, onClose, onSubmit, room, isLoading }: RoomFormProps) {
    const [form, setForm] = useState({ roomNumber: '', roomType: '' });
    const [errors, setErrors] = useState({ roomNumber: '', roomType: '' });

    useEffect(() => {
        if (room) {
            setForm({ roomNumber: room.roomNumber, roomType: room.roomType });
        } else {
            setForm({ roomNumber: '', roomType: '' });
        }
        setErrors({ roomNumber: '', roomType: '' });
    }, [room, isOpen]);

    const validate = () => {
        const newErrors = { roomNumber: '', roomType: '' };
        if (!form.roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
        if (!form.roomType.trim()) newErrors.roomType = 'Room type is required';
        setErrors(newErrors);
        return !newErrors.roomNumber && !newErrors.roomType;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const result = await onSubmit(form);
        if (result) {
            setForm({ roomNumber: '', roomType: '' });
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">
                        {room ? 'Edit Room' : 'Create Room'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <Input
                        id="roomNumber"
                        label="Room Number"
                        type="text"
                        placeholder="e.g., 101"
                        value={form.roomNumber}
                        error={errors.roomNumber}
                        onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                    />
                    <Select
                        id="roomType"
                        label="Room Type"
                        placeholder="Select room type"
                        value={form.roomType}
                        error={errors.roomType}
                        options={ROOM_TYPE_OPTIONS}
                        onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                    />
                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading}>
                            {room ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
