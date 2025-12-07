import { Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Room } from '@/types/room';

interface RoomCardProps {
    room: Room;
    onEdit: (room: Room) => void;
    onDelete: (room: Room) => void;
}

export function RoomCard({ room, onEdit, onDelete }: RoomCardProps) {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        navigate(`/properties/rooms/${room.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-lg shadow-2xs border border-slate-200 p-3 sm:p-5 hover:shadow-lg transition-shadow cursor-pointer"
        >
            <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div>
                    <h3 className="text-lg sm:text-lg font-semibold text-slate-900">
                        <span className="font-medium text-sm sm:text-sm text-slate-600">Room no: </span>
                        {room.roomNumber}
                    </h3>
                    <p className="text-sm sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                        <span>Type: </span>{room.roomType}
                    </p>
                </div>
                {room.isActive ? (
                    <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                        Active
                    </span>
                ) : (
                    <span className="px-2 py-0.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-full">
                        Inactive
                    </span>
                )}
            </div>
            <div className="flex gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-100">
                <button
                    onClick={() => onEdit(room)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                    <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Edit</span>
                </button>
                <button
                    onClick={() => onDelete(room)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Delete</span>
                </button>
            </div>
        </div>
    );
}

