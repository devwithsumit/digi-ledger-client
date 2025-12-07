import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
    // dashboard: 'Dashboard',
    properties: 'Properties',
    rooms: 'Rooms',
    tenants: 'Tenants',
    rents: 'Rent Records',
    settings: 'Settings',
    occupancies: 'Occupancies',
    monthly: 'Monthly',
};

function formatSegment(segment: string): string {
    if (segment === '') return 'Home';
    if (routeLabels[segment]) return routeLabels[segment];
    if (/^\d+$/.test(segment)) return 'Details';
    return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function Breadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    let breadcrumbs: Array<{ path: string; label: string }> = [
        { path: '/dashboard', label: 'Home' },
    ];

    if (location.pathname === '/rooms' || location.pathname.startsWith('/rooms/')) {
        breadcrumbs.push(
            { path: '/properties', label: 'Properties' },
            ...pathSegments.map((segment, index) => {
                const path = '/' + pathSegments.slice(0, index + 1).join('/');
                return { path, label: formatSegment(segment) };
            })
        );
    } else if (location.pathname.startsWith('/properties/rooms/')) {
        breadcrumbs.push(
            { path: '/properties', label: 'Properties' },
            { path: '/rooms', label: 'Rooms' },
            ...pathSegments.slice(2).map((segment, index) => {
                const path = '/' + pathSegments.slice(0, 2 + index + 1).join('/');
                return { path, label: formatSegment(segment) };
            })
        );
    } else if (location.pathname.startsWith('/monthly/room/')) {
        breadcrumbs.push(
            { path: '/monthly', label: 'Monthly' },
            ...pathSegments.slice(1).map((segment, index) => {
                const path = '/' + pathSegments.slice(0, index + 2).join('/');
                return { path, label: formatSegment(segment) };
            })
        );
    } else {
        breadcrumbs.push(
            ...pathSegments.map((segment, index) => {
                const path = '/' + pathSegments.slice(0, index + 1).join('/');
                return { path, label: formatSegment(segment) };
            })
        );
    }

    const isLast = (index: number) => index === breadcrumbs.length - 1;

    return (
        <nav className="flex items-center gap-1.5 text-sm mb-4 flex-wrap">
            {breadcrumbs.map((crumb, index) => (
                <div key={`${crumb.path}-${index}`} className="flex items-center gap-1.5">
                    {index === 0 ? (
                        <Home className="w-4 h-4 text-slate-500" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                    {isLast(index) ? (
                        <span className="font-semibold text-primary">{crumb.label}</span>
                    ) : (
                        <button
                            onClick={() => navigate(crumb.path)}
                            className="text-slate-600 hover:text-primary transition-colors"
                        >
                            {crumb.label}
                        </button>
                    )}
                </div>
            ))}
        </nav>
    );
}
