import type { Occupancy } from '@/types/occupancy';
import { Edit2, Phone, Trash2, Users } from 'lucide-react';

interface OccupancyCardProps {
    occupancy: Occupancy;
    onEdit: (occupancy: Occupancy) => void;
    onDelete: (occupancy: Occupancy) => void;
}

export function OccupancyCard({ occupancy, onEdit, onDelete }: OccupancyCardProps) {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-2xs border border-slate-200 p-3 sm:p-5 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-500">Room:</span>
                        <span className="text-sm font-semibold text-slate-900">{occupancy.roomNumber}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{occupancy.tenantName}</h3>
                    <div className="space-y-1 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{occupancy.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span>{occupancy.peopleCount} {occupancy.peopleCount === 1 ? 'person' : 'people'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2 sm:pt-3 border-t border-slate-100 mb-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Rent:</span>
                    <span className="font-semibold text-slate-900">₹{occupancy.rentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-slate-600">Period:</span>
                    <span className="text-slate-700">
                        {formatDate(occupancy.startDate)}
                        {occupancy.endDate ? ` - ${formatDate(occupancy.endDate)}` : ' (Ongoing)'}
                    </span>
                </div>
            </div>
            <div className="flex gap-1.5 sm:gap-2">
                <button
                    onClick={() => onEdit(occupancy)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                    <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Edit</span>
                </button>
                <button
                    onClick={() => onDelete(occupancy)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Delete</span>
                </button>
            </div>
        </div>
    );
}

