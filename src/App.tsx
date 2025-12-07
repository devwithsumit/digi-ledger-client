import { DashboardLayout } from '@/layouts/DashboardLayout';
import { SignInPage } from '@/pages/auth/SignInPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';
import { Dashboard } from '@/pages/Dashboard';
import { Properties } from '@/pages/Properties';
import { Rents } from '@/pages/Rents';
import { SettingsPage } from '@/pages/Settings';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { MonthlyOverviewPage } from './pages/monthly/MonthlyOverviewPage';
import { RoomMonthlyDetailPage } from './pages/monthly/RoomMonthlyDetailPage';
import { OccupancyListPage } from './pages/occupancy/OccupancyListPage';
import { RoomDetailsPage } from './pages/properties/RoomDetailsPage';
import { Rooms } from './pages/Rooms';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/rooms/:roomId" element={<RoomDetailsPage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/occupancies" element={<OccupancyListPage />} />
          <Route path="/monthly" element={<MonthlyOverviewPage />} />
          <Route path="/monthly/room/:roomId" element={<RoomMonthlyDetailPage />} />
          {/* <Route path="/tenants" element={<Tenants />} /> */}
          <Route path="/rents" element={<Rents />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/not-found" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default App;
