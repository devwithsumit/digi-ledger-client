import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Users } from 'lucide-react';

export function Tenants() {
    return (
        <div className="space-y-6">
            <Breadcrumb />
            <div className="flex items-center gap-3 mb-4">
                <Users className="w-7 h-7 text-primary" />
                <h1 className="text-2xl font-bold text-slate-900">Tenants</h1>
            </div>
            <p className="text-slate-600">Manage your tenants here.</p>
        </div>
    );
}

