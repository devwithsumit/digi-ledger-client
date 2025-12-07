import { useNavigate } from 'react-router-dom';
import { navItems } from '@/components/shared/Navbar';
import { LayoutDashboard } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const dashboardItems = navItems.filter((item) => item.path !== '/dashboard' && item.path !== '/properties' && item.path !== '/rents');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {dashboardItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="cursor-pointer aspect- py-4 px-4 sm:px-4 bg-white rounded-2xl shadow-lg shadow-slate-200/50 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {item.path === '/monthly' ? 'Monthly' :
                    item.path === '/occupancies' ? 'Tenants' :
                      item.label
                  }
                </h2>
              </div>
              <p className="text-sm text-slate-600 px-2">
                {item.label === 'Properties' && 'Manage your properties and rooms'}
                {item.label === 'Rooms' && 'View and manage all rooms'}
                {item.label === 'Occupancies' && 'Track tenant occupancies'}
                {item.label === 'Monthly' && 'View monthly rent records'}
                {item.label === 'Rent Records' && 'Track rent payments'}
                {item.label === 'Settings' && 'Configure your account'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
