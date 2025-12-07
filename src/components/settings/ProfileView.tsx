import { Button } from '@/components/ui/Button';

interface ProfileViewProps {
    profile: { name?: string; email?: string; role?: string; createdAt?: string };
    onEdit: () => void;
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
                <Button variant="secondary" onClick={onEdit}
                    className="sm:block w-fit! px-4! py-2!">
                    Edit Profile
                </Button>
                {/* <Button onClick={onEdit} variant='secondary'
                    className="mb-0! sm:hidden flex items-center justify-center"
                >
                    <Pencil className='w-4 h-4' />
                </Button> */}
            </div>
            <div className="space-y-4 *:flex-wrap">
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-500">Name</span>
                    <span className="text-base font-medium text-slate-900">{profile?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-500">Email</span>
                    <span className="text-base font-medium text-slate-900">{profile?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-500">Role</span>
                    <span className="text-base font-medium text-slate-900">{profile?.role || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-slate-500">Member Since</span>
                    <span className="text-base font-medium text-slate-900">{formatDate(profile?.createdAt)}</span>
                </div>
            </div>
        </>
    );
}

