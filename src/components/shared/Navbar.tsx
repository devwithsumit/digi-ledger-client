import { useAppSelector } from '@/hooks/useAppSelector';
import { useLogout } from '@/hooks/useLogout';
import { BedDouble, Calendar, LayoutDashboard, Menu, Settings, Users } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { MobileMenu } from './MobileMenu';
import { ProfileAvatarDropdown } from './ProfileAvatarDropdown';

export const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    // { label: 'Properties', path: '/properties', icon: Building2 },
    { label: 'Monthly', path: '/monthly', icon: Calendar },
    { label: 'Rooms', path: '/rooms', icon: BedDouble },
    { label: 'Occupancies', path: '/occupancies', icon: Users },
    // { label: 'Tenants', path: '/tenants', icon: Users },
    // { label: 'Rent Records', path: '/rents', icon: Receipt },
    { label: 'Settings', path: '/settings', icon: Settings },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const logout = useLogout();

    return (
        <>
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Logo size={8} />
                            <span className="text-xl font-bold text-slate-800">DigiLedger</span>
                        </div>

                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 hover:bg-slate-100'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Profile Avatar Circle Dropdown */}
                        <div className="hidden md:flex items-center gap-4 relative">
                            <ProfileAvatarDropdown user={user} onLogout={logout} />
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6 text-slate-700" />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                userName={user?.name}
                onLogout={logout}
            />
        </>
    );
}

