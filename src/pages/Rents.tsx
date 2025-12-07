import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Receipt } from 'lucide-react';

export function Rents() {
    return (
        <div className="space-y-6">
            <Breadcrumb />
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <Receipt className="w-7 h-7 text-primary" />
                    <h1 className="text-2xl font-bold text-slate-900">Rent Records</h1>
                </div>
                <p className="text-slate-600">Track rent payments here.</p>
            </div>
        </div>
    );
}

