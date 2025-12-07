import { useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { getMonthLabel } from '@/utils/monthHelpers';
import type { MonthlyUpdateRequest, MonthlyRecord } from '@/types/monthly';

interface MonthEditFormProps {
    year: number;
    month: number;
    form: MonthlyUpdateRequest;
    record?: MonthlyRecord;
    onFormChange: (form: MonthlyUpdateRequest) => void;
    onSave: () => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
}

export function MonthEditForm({
    year,
    month,
    form,
    record,
    onFormChange,
    onSave,
    onCancel,
    isLoading,
}: MonthEditFormProps) {
    const electricityBill = useMemo(() => {
        if (form.currentUnit == null || record?.electricityRate == null) return null;
        const prevUnit = record?.previousUnit ?? 0;
        return (form.currentUnit - prevUnit) * record.electricityRate;
    }, [form.currentUnit, record?.previousUnit, record?.electricityRate]);

    const formatPaymentDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `Paid on: ${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
    };

    const statusOptions = [{ label: 'PAID', value: 'PAID' }, { label: 'UNPAID', value: 'UNPAID' }];

    return (
        <div className="border-t border-slate-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Edit {getMonthLabel(month)} {year}
            </h3>
            <div className="space-y-4 max-w-md">
                {record?.paymentDate && form.rentStatus === 'PAID' && (
                    <div className="text-sm text-slate-600 bg-green-50 p-3 rounded-lg">
                        {formatPaymentDate(record.paymentDate)}
                    </div>
                )}
                <Select
                    id="rentStatus"
                    label="Rent Status"
                    value={form.rentStatus || ''}
                    options={statusOptions}
                    onChange={(e) => onFormChange({ ...form, rentStatus: e.target.value as 'PAID' | 'UNPAID' })}
                />
                {record && record.previousUnit !== null && (
                    <div className="flex items-center justify-between gap-4 py-2">
                        <span className="text-sm text-slate-500 w-48">Previous Unit</span>
                        <span className="text-base font-medium text-right text-slate-900">{record.previousUnit.toString()}</span>
                    </div>
                )}
                <Input
                    id="currentUnit"
                    label="Current Unit"
                    type="number"
                    placeholder="Enter current unit..."
                    value={form.currentUnit?.toString() || ''}
                    onChange={(e) => onFormChange({ ...form, currentUnit: e.target.value === '' ? null : Number(e.target.value) })}
                />
                {record && record.electricityRate !== null && record.electricityRate !== undefined && (
                    <div className="flex items-center justify-between gap-4 py-2">
                        <span className="text-sm text-slate-500 w-48">Electricity Rate</span>
                        <span className="text-base font-medium text-right text-slate-900">₹{record.electricityRate}</span>
                    </div>
                )}
                {electricityBill !== null && (
                    <div className="flex items-center justify-between gap-4 py-2">
                        <span className="text-sm text-slate-500 w-48">Electricity Bill (Calculated)</span>
                        <span className="text-base font-semibold text-right text-slate-900">₹{electricityBill.toLocaleString()}</span>
                    </div>
                )}
                <Select
                    id="electricityStatus"
                    label="Electricity Status"
                    value={form.electricityStatus || ''}
                    options={statusOptions}
                    onChange={(e) => onFormChange({ ...form, electricityStatus: e.target.value as 'PAID' | 'UNPAID' })}
                />
                <Input id="notes" label="Notes (Optional)" type="text" placeholder="Add notes..." value={form.notes || ''} onChange={(e) => onFormChange({ ...form, notes: e.target.value })} />
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onSave} isLoading={isLoading}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
