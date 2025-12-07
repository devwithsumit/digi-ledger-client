import { BedDouble } from 'lucide-react';
import type { Room } from '@/types/room';

interface RoomMonthlyHeaderProps {
    room: Room;
    year: number;
}

export function RoomMonthlyHeader({ room, year }: RoomMonthlyHeaderProps) {
    return (
        <>
            <div className="flex items-center gap-3 mb-6">
                <BedDouble className="w-7 h-7 text-primary" />
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Room {room.roomNumber}</h1>
                    <p className="text-sm text-slate-500">{room.roomType}</p>
                </div>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Monthly Records - {year}</h2>
        </>
    );
}

