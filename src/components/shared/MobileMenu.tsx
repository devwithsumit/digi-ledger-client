import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';
import Logo from './Logo';
import { navItems } from './Navbar';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
    onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, userName, onLogout }: MobileMenuProps) {
    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        onClose();
    }, [location.pathname]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <Logo size={8} />
                        <span className="text-lg font-bold text-slate-800">DigiLedger</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {userName && (
                    <div className="p-4 border-b border-slate-100">
                        <p className="text-sm text-slate-500">Signed in as</p>
                        <p className="font-medium text-slate-800">{userName}</p>
                    </div>
                )}

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

