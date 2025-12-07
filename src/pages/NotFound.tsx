import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto" />
            <h1 className="text-3xl font-bold text-slate-900">404 - Page Not Found</h1>
            <p className="text-slate-600">Sorry, the page you are looking for does not exist.</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 mx-auto">
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center gap-1 w-auto! py-2! rounded-lg! outline outline-gray-300"
                >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                    Go Back
                </Button>
                <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                    Go to Dashboard
                </Link>

            </div>
        </div>
    );
}
