import { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Building2 } from 'lucide-react';
import { useGetRoomsQuery, useCreateRoomMutation, useUpdateRoomMutation, useDeleteRoomMutation } from '@/api/roomsApi';
import { RoomCard } from '@/components/properties/RoomCard';
import { RoomForm } from '@/components/properties/RoomForm';
import { DeleteConfirm } from '@/components/properties/DeleteConfirm';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import type { Room, CreateRoomRequest, UpdateRoomRequest } from '@/types/room';

export function RoomsListingPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);

    const { data: rooms = [], isLoading } = useGetRoomsQuery();
    const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation();
    const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation();
    const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

    const handleCreate = async (data: CreateRoomRequest) => {
        try {
            await createRoom(data).unwrap();
            toast.success('Room created successfully!');
            setIsCreateModalOpen(false);
            return true; // form will reset
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to create room';
            toast.error(errorMessage)
            return false; // form won't reset
        }
    };

    const handleUpdate = async (data: UpdateRoomRequest) => {
        if (!editingRoom) return false;
        try {
            await updateRoom({ id: editingRoom.id, data }).unwrap();
            toast.success('Room updated successfully!');
            setEditingRoom(null);
            return true;
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to update room';
            toast.error(errorMessage)
            return false;
        }
    };

    const handleDelete = async () => {
        if (!deletingRoom) return;
        try {
            await deleteRoom(deletingRoom.id).unwrap();
            toast.success('Room deleted successfully!');
            setDeletingRoom(null);
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to delete room';
            toast.error(errorMessage)
        }
    };

    return (
        <div className="space-y-6">
            <Breadcrumb />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Building2 className="w-7 h-7 text-primary" />
                    <h1 className="text-xl font-bold text-slate-900">Rooms</h1>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full hidden sm:flex sm:w-auto"
                >
                    <Plus className="w-5 h-5 mr-2 inline" />
                    Create Room
                </Button>
            </div>

            <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="fixed p-0! w-13! h-13! mb-0! bottom-10 right-6 sm:hidden z-40 shadow-lg rounded-full flex items-center justify-center"
            >
                <Plus className="w-6 h-6" />
            </Button>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            ) : rooms.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-12 text-center">
                    <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No rooms found</h3>
                    <p className="text-slate-500 mb-6">Get started by creating your first room</p>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto">
                        <Plus className="w-5 h-5 mr-2 inline" />
                        Create Room
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onEdit={setEditingRoom}
                            onDelete={setDeletingRoom}
                        />
                    ))}
                </div>
            )}

            <RoomForm
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreate}
                isLoading={isCreating}
            />

            <RoomForm
                isOpen={!!editingRoom}
                onClose={() => setEditingRoom(null)}
                onSubmit={handleUpdate}
                room={editingRoom}
                isLoading={isUpdating}
            />

            <DeleteConfirm
                isOpen={!!deletingRoom}
                onClose={() => setDeletingRoom(null)}
                onConfirm={handleDelete}
                room={deletingRoom}
                isLoading={isDeleting}
            />
        </div>
    );
}

