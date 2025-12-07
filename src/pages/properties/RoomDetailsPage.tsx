import { useCreateOccupancyMutation, useGetOccupanciesQuery } from '@/api/occupancyApi';
import { useGetRoomByIdQuery } from '@/api/roomsApi';
import { OccupancyCard } from '@/components/occupancy/OccupancyCard';
import { OccupancyForm } from '@/components/occupancy/OccupancyForm';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/Button';
import type { CreateOccupancyRequest } from '@/types/occupancy';
import { ArrowLeft, BedDouble, Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export function RoomDetailsPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { data: room, isLoading: roomLoading, refetch: refectRoom } = useGetRoomByIdQuery(Number(roomId));
    const { data: occupancies = [], isLoading: occupanciesLoading } = useGetOccupanciesQuery();
    const [createOccupancy, { isLoading: isCreating }] = useCreateOccupancyMutation();

    const activeOccupancy = occupancies.find(
        (occ) => occ.roomId === Number(roomId) &&
            (
                occ.endDate === null ||
                new Date(occ.endDate) > new Date()
            )
    );

    const handleCreateOccupancy = async (data: CreateOccupancyRequest) => {
        try {
            await createOccupancy({ ...data, roomId: Number(roomId) }).unwrap();
            toast.success('Occupancy created successfully!');
            refectRoom();
            setIsFormOpen(false);
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to create occupancy';
            toast.error(errorMessage);
        }
    };

    if (roomLoading || occupanciesLoading) {
        return (
            <div className="space-y-6">
                <Breadcrumb />
                <div className="flex items-center justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="space-y-6">
                <Breadcrumb />
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-slate-600">Room not found</p>
                    <Button onClick={() => navigate('/rooms')} className="mt-4 w-auto">Back to Rooms</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <Breadcrumb />
            <button
                onClick={() => navigate('/rooms')}
                className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
            </button>

            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 px-4 py-6">
                <div className="flex items-start gap-3 mb-3">
                    <div className='flex gap-3'>
                        <BedDouble className="w-7 h-7 text-primary" />
                        <div>
                            <h1 className="text-lg leading-none font-bold text-slate-900">Room no. {room.roomNumber}</h1>
                            <p className="text-sm text-slate-500">{room.roomType}</p>
                        </div>
                    </div>
                    {room.isActive ? (
                        <span className="ml-auto px-3 py-1 text-sm font-medium text-green-700 bg-green-50 rounded-full">
                            Active
                        </span>
                    ) : (
                        <span className="ml-auto px-3 py-1 text-sm font-medium text-slate-500 bg-slate-100 rounded-full">
                            Inactive
                        </span>
                    )}
                </div>

                {room.isActive && activeOccupancy ? (
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">Current Occupancy</h2>
                        <div className="max-w-md">
                            <OccupancyCard
                                occupancy={activeOccupancy}
                                onEdit={() => navigate(`/occupancies`)}
                                onDelete={() => navigate(`/occupancies`)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate-600 mb-6">No active occupancy for this room</p>
                        <Button onClick={() => setIsFormOpen(true)}>
                            <Plus className="w-5 h-5 mr-2 inline" />
                            Add Occupancy
                        </Button>
                    </div>
                )}
            </div>

            <OccupancyForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleCreateOccupancy}
                isLoading={isCreating}
                preselectedRoomId={Number(roomId)}
            />
        </div>
    );
}

