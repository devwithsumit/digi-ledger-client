import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useListMonthlyRecordOfRoomQuery, useUpsertMonthlyRecordMutation } from '@/api/monthlyApi';
import { useGetRoomByIdQuery } from '@/api/roomsApi';
import { useGetOccupanciesQuery } from '@/api/occupancyApi';
import { MonthEditForm } from '@/components/monthly/MonthEditForm';
import { MonthGrid } from '@/components/monthly/MonthGrid';
import { RoomMonthlyHeader } from '@/components/monthly/RoomMonthlyHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import type { MonthlyUpdateRequest } from '@/types/monthly';

export function RoomMonthlyDetailPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [selectedMonth, setSelectedMonth] = useState<{ year: number; month: number } | null>(null);
    const [form, setForm] = useState<MonthlyUpdateRequest>({
        rentStatus: undefined,
        notes: '',
        currentUnit: null,
        electricityStatus: undefined,
    });

    const { data: room } = useGetRoomByIdQuery(Number(roomId) || 0, { skip: !roomId });
    const { data: records = [], isLoading } = useListMonthlyRecordOfRoomQuery(
        { roomId: Number(roomId) || 0, year: currentYear },
        { skip: !roomId }
    );
    const { data: occupancies = [] } = useGetOccupanciesQuery();
    const [upsertRecord, { isLoading: isSaving }] = useUpsertMonthlyRecordMutation();

    const activeOccupancy = useMemo(() => {
        return occupancies.find((occ) => occ.roomId === Number(roomId) && (occ.endDate === null || new Date(occ.endDate) > new Date()));
    }, [occupancies, roomId]);

    useEffect(() => {
        if (!selectedMonth) return;
        const record = records.find((r) => r.year === selectedMonth.year && r.month === selectedMonth.month);
        setForm(record ? {
            rentStatus: record.rentStatus,
            notes: record.notes || '',
            currentUnit: record.currentUnit,
            electricityStatus: record.electricityStatus,
        } : { rentStatus: 'UNPAID', notes: '', currentUnit: null, electricityStatus: 'UNPAID' });
    }, [selectedMonth, records]);

    const handleSave = async () => {
        if (!selectedMonth || !roomId) return;
        if (form.rentStatus === 'PAID' && !form.currentUnit) {
            toast.error('Enter meter reading first!');
            return;
        }
        try {
            await upsertRecord({
                roomId: Number(roomId),
                year: selectedMonth.year,
                month: selectedMonth.month,
                data: form,
            }).unwrap();
            toast.success('Monthly record updated successfully!');
            setSelectedMonth(null);
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to update record';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="space-y-6">
            <Breadcrumb />
            <button
                onClick={() => navigate('/monthly')}
                className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
            </button>

            {room && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <RoomMonthlyHeader room={room} year={currentYear} />
                    <MonthGrid
                        year={currentYear}
                        records={records}
                        activeOccupancy={activeOccupancy}
                        onMonthClick={(month) => setSelectedMonth({ year: currentYear, month })}
                        isLoading={isLoading}
                    />
                    {selectedMonth && (
                        <MonthEditForm
                            year={selectedMonth.year}
                            month={selectedMonth.month}
                            form={form}
                            record={records.find((r) => r.year === selectedMonth.year && r.month === selectedMonth.month)}
                            onFormChange={setForm}
                            onSave={handleSave}
                            onCancel={() => setSelectedMonth(null)}
                            isLoading={isSaving}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
