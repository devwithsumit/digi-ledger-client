import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery } from '@/api/onwerAuthApi';

export function ProtectedRoute() {
  const { isAuthenticated, token } = useAppSelector((state) => state.user);
  const { isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-slate-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

