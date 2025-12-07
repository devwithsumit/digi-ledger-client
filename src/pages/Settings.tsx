import { useState } from 'react';
import { Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ProfileView } from '@/components/settings/ProfileView';
import { ProfileEditForm } from '@/components/settings/ProfileEditForm';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/api/onwerAuthApi';

export function SettingsPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ name: '', password: '', confirmPassword: '' });
    const { data: profile, isLoading } = useGetProfileQuery();
    const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

    const handleEdit = () => {
        if (profile) {
            setForm({ name: profile.name, password: '', confirmPassword: '' });
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setForm({ name: '', password: '', confirmPassword: '' });
    };

    const handleSave = async () => {
        if (!form.name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (form.password && form.password !== form.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const updateData: { name?: string; password?: string } = { name: form.name };
            if (form.password) {
                updateData.password = form.password;
            }
            await updateProfile(updateData).unwrap();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update profile');
        }
    };

    if (isLoading) {
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

    return (
        <div className="space-y-6">
            <Breadcrumb />
            <div className="flex items-center gap-3">
                <Settings className="w-7 h-7 text-primary" />
                <h1 className="text-xl font-bold text-slate-900">Settings</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                {isEditing ? (
                    <ProfileEditForm form={form} onFormChange={setForm} onSave={handleSave} onCancel={handleCancel} isLoading={isSaving} />
                ) : (
                    <ProfileView profile={profile || {}} onEdit={handleEdit} />
                )}
            </div>
        </div>
    );
}
