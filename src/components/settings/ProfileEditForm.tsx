import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ProfileEditFormProps {
    form: { name: string; password: string; confirmPassword: string };
    onFormChange: (form: { name: string; password: string; confirmPassword: string }) => void;
    onSave: () => void;
    onCancel: () => void;
    isLoading: boolean;
}

export function ProfileEditForm({ form, onFormChange, onSave, onCancel, isLoading }: ProfileEditFormProps) {
    return (
        <>
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Edit Profile</h2>
            <div className="space-y-4 max-w-md">
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    value={form.name}
                    onChange={(e) => onFormChange({ ...form, name: e.target.value })}
                />
                <Input
                    id="password"
                    label="New Password (Optional)"
                    type="password"
                    placeholder="Leave blank to keep current"
                    value={form.password}
                    onChange={(e) => onFormChange({ ...form, password: e.target.value })}
                />
                {form.password && (
                    <Input
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => onFormChange({ ...form, confirmPassword: e.target.value })}
                    />
                )}
                <div className="flex gap-3 pt-2">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onSave} isLoading={isLoading}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </>
    );
}

