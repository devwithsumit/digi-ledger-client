import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BedDouble, Building2, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Properties() {
    const navigate = useNavigate();

    const properties = [
        {
            name: 'Rooms',
            icon: BedDouble,
            path: '/rooms',
        },
        {
            name: 'Warehouses',
            icon: Warehouse,
            path: '/warehouses',
        },
    ];
    return (
        <div className="space-y-2">
            <Breadcrumb />
            <div className="mb-4">
                <div className="flex items-start gap-3 mb-2">
                    <Building2 className="w-7 h-7 text-primary" />
                    <h1 className="text-2xl leading-none font-bold text-slate-900">Properties</h1>
                </div>
            </div>
            <div className="properties-list mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {properties.map((property) => (
                    <div
                        key={property.path}
                        onClick={() => navigate(property.path)}
                        className="cursor-pointer p-4 text-primary hover:text-primary-hover bg-white rounded-2xl shadow-lg shadow-slate-200/50"
                    >
                        <div className="flex items-center gap-2">
                            <property.icon className="w-5 h-5 text-primary" />
                            <h1 className="text-lg font-bold text-slate-900">{property.name}</h1>
                        </div>
                        <p className="text-sm text-slate-600">Manage your {property.name} here.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

