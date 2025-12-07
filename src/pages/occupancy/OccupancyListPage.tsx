import { useCreateOccupancyMutation, useDeleteOccupancyMutation, useGetOccupanciesQuery, useUpdateOccupancyMutation } from '@/api/occupancyApi';
import { DeleteOccupancyConfirm } from '@/components/occupancy/DeleteOccupancyConfirm';
import { OccupancyCard } from '@/components/occupancy/OccupancyCard';
import { OccupancyForm } from '@/components/occupancy/OccupancyForm';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/Button';
import type { CreateOccupancyRequest, Occupancy, UpdateOccupancyRequest } from '@/types/occupancy';
import { Plus, Users } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function OccupancyListPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOccupancy, setEditingOccupancy] = useState<Occupancy | null>(null);
    const [deletingOccupancy, setDeletingOccupancy] = useState<Occupancy | null>(null);

    const { data: occupancies = [], isLoading } = useGetOccupanciesQuery();
    const [createOccupancy, { isLoading: isCreating }] = useCreateOccupancyMutation();
    const [updateOccupancy, { isLoading: isUpdating }] = useUpdateOccupancyMutation();
    const [deleteOccupancy, { isLoading: isDeleting }] = useDeleteOccupancyMutation();

    const handleCreate = async (data: CreateOccupancyRequest) => {
        try {
            await createOccupancy(data).unwrap();
            toast.success('Occupancy created successfully!');
            setIsFormOpen(false);
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to create occupancy';
            toast.error(errorMessage);
        }
    };

    const handleUpdate = async (data: UpdateOccupancyRequest) => {
        if (!editingOccupancy) return;

        try {
            await updateOccupancy({ id: editingOccupancy.id, data }).unwrap();
            toast.success('Occupancy updated successfully!');
            setEditingOccupancy(null);
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to update occupancy';
            toast.error(errorMessage);
        }
    };

    const handleDelete = async () => {
        if (!deletingOccupancy) return;
        try {
            await deleteOccupancy(deletingOccupancy.id).unwrap();
            toast.success('Occupancy deleted successfully!');
            setDeletingOccupancy(null);
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to delete occupancy';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="space-y-6 pb-20 sm:pb-6">
            <Breadcrumb />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Users className="w-7 h-7 text-primary" />
                    <h1 className="text-xl font-bold text-slate-900">All Occupancies</h1>
                </div>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    className="hidden sm:block sm:w-auto"
                >
                    <Plus className="w-5 h-5 mr-2 inline" />
                    Add Occupancy
                </Button>
            </div>

            <Button
                onClick={() => setIsFormOpen(true)}
                className="fixed p-0! w-13! h-13!  mb-0! bottom-10 right-6 sm:hidden z-40 shadow-lg rounded-full flex items-center justify-center"
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
            ) : occupancies.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-12 text-center">
                    <p className="text-lg font-semibold text-slate-700 mb-2">No occupancies found</p>
                    <p className="text-slate-500 mb-6">Get started by creating your first occupancy</p>
                    <Button onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto">
                        <Plus className="w-5 h-5 mr-2 inline" />
                        Add Occupancy
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {occupancies.map((occupancy) => (
                        <OccupancyCard
                            key={occupancy.id}
                            occupancy={occupancy}
                            onEdit={setEditingOccupancy}
                            onDelete={setDeletingOccupancy}
                        />
                    ))}
                </div>
            )}

            <OccupancyForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleCreate}
                isLoading={isCreating}
            />

            <OccupancyForm
                isOpen={!!editingOccupancy}
                onClose={() => setEditingOccupancy(null)}
                onSubmit={handleUpdate}
                occupancy={editingOccupancy}
                isLoading={isUpdating}
            />

            <DeleteOccupancyConfirm
                isOpen={!!deletingOccupancy}
                onClose={() => setDeletingOccupancy(null)}
                onConfirm={handleDelete}
                occupancy={deletingOccupancy}
                isLoading={isDeleting}
            />
        </div>
    );
}

