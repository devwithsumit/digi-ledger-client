import { useGetRoomsQuery, roomsApi } from '@/api/roomsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { CreateOccupancyRequest, Occupancy, UpdateOccupancyRequest } from '@/types/occupancy';
import { X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

interface OccupancyFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateOccupancyRequest | UpdateOccupancyRequest) => Promise<void>;
    occupancy?: Occupancy | null;
    isLoading: boolean;
    preselectedRoomId?: number;
}

export function OccupancyForm({ isOpen, onClose, onSubmit, occupancy, isLoading, preselectedRoomId }: OccupancyFormProps) {
    const dispatch = useAppDispatch();
    const { data: rooms = [], refetch: refetchRooms } = useGetRoomsQuery();
    const [form, setForm] = useState({
        roomId: preselectedRoomId || '',
        tenantName: '',
        phone: '',
        peopleCount: '',
        rentAmount: '',
        startDate: '',
        endDate: '',
    });
    const [errors, setErrors] = useState({
        roomId: '', tenantName: '', phone: '', peopleCount: '', rentAmount: '', startDate: '',
    });

    const inactiveRooms = rooms.filter((room) => !room.isActive);
    const roomOptions = inactiveRooms.map((room) => ({
        label: `Room ${room.roomNumber} (${room.roomType})`,
        value: room.id,
    }));

    useEffect(() => {
        if (occupancy) {
            setForm({
                roomId: occupancy.roomId,
                tenantName: occupancy.tenantName,
                phone: occupancy.phone,
                peopleCount: occupancy.peopleCount.toString(),
                rentAmount: occupancy.rentAmount.toString(),
                startDate: occupancy.startDate.split('T')[0],
                endDate: occupancy.endDate ? occupancy.endDate.split('T')[0] : '',
            });
        } else if (preselectedRoomId) {
            setForm({
                roomId: preselectedRoomId,
                tenantName: '',
                phone: '',
                peopleCount: '',
                rentAmount: '',
                startDate: '',
                endDate: '',
            });
        } else {
            setForm({
                roomId: '', tenantName: '', phone: '', peopleCount: '', rentAmount: '', startDate: '', endDate: '',
            });
        }
        setErrors({ roomId: '', tenantName: '', phone: '', peopleCount: '', rentAmount: '', startDate: '' });
    }, [occupancy, preselectedRoomId, isOpen]);

    const validate = () => {
        const newErrors = { roomId: '', tenantName: '', phone: '', peopleCount: '', rentAmount: '', startDate: '' };
        if (!occupancy && !form.roomId) newErrors.roomId = 'Room is required';
        if (!form.tenantName.trim()) newErrors.tenantName = 'Tenant name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        if (!form.peopleCount || parseInt(form.peopleCount) < 1) newErrors.peopleCount = 'People count must be at least 1';
        if (!form.rentAmount || parseFloat(form.rentAmount) <= 0) newErrors.rentAmount = 'Rent amount must be positive';
        if (!form.startDate) newErrors.startDate = 'Start date is required';
        setErrors(newErrors);
        return !Object.values(newErrors).some((err) => err);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const submitData = {
            roomId: Number(form.roomId),
            tenantName: form.tenantName.trim(),
            phone: form.phone.trim(),
            peopleCount: parseInt(form.peopleCount),
            rentAmount: parseFloat(form.rentAmount),
            startDate: form.startDate,
            endDate: form.endDate || null,
        };

        const roomIdToRefetch = Number(form.roomId);

        await onSubmit(submitData as CreateOccupancyRequest | UpdateOccupancyRequest);
        refetchRooms();

        if (roomIdToRefetch) {
            dispatch(
                roomsApi.util.invalidateTags([{ type: 'Room', id: roomIdToRefetch }])
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col max-h-[85vh] my-auto"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
                    <h2 className="text-xl font-bold text-slate-900">
                        {occupancy ? 'Edit Occupancy' : 'Add Occupancy'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
                <div className="overflow-y-auto flex-1 px-6 py-4 pb-10">
                    <form id="occupancy-form" onSubmit={handleSubmit} className="space-y-4">
                        {!occupancy && (
                            <Select
                                id="roomId"
                                label="Room"
                                placeholder="Select room"
                                value={form.roomId}
                                error={errors.roomId}
                                options={roomOptions}
                                onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                                disabled={!!preselectedRoomId}
                            />
                        )}
                        <Input
                            id="tenantName"
                            label="Tenant Name"
                            type="text"
                            placeholder="Enter tenant name"
                            value={form.tenantName}
                            error={errors.tenantName}
                            onChange={(e) => setForm({ ...form, tenantName: e.target.value })}
                        />
                        <Input
                            id="phone"
                            label="Phone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={form.phone}
                            error={errors.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <Input
                            id="peopleCount"
                            label="People Count"
                            type="number"
                            min="1"
                            max="10"
                            placeholder="Number of people"
                            value={form.peopleCount}
                            error={errors.peopleCount}
                            onChange={(e) => setForm({ ...form, peopleCount: e.target.value })}
                        />
                        <Input
                            id="rentAmount"
                            label="Rent Amount (₹)"
                            type="number"
                            min="500"
                            step="0.01"
                            placeholder="Enter rent amount"
                            value={form.rentAmount}
                            error={errors.rentAmount}
                            onChange={(e) => setForm({ ...form, rentAmount: e.target.value })}
                        />
                        <Input
                            id="startDate"
                            label="Start Date"
                            type="date"
                            value={form.startDate}
                            error={errors.startDate}
                            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        />
                        <Input
                            id="endDate"
                            label="End Date (Optional)"
                            type="date"
                            value={form.endDate}
                            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        />
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 border-t border-slate-200 shrink-0">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="occupancy-form"
                        isLoading={isLoading}
                        className="flex-1"
                    >
                        {occupancy ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

