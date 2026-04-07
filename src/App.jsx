import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layouts
import AdminLayout from './components/Layout/AdminLayout';
import DispatchLayout from './components/Layout/DispatchLayout';
import DriverLayout from './components/Layout/DriverLayout';
import WarehouseLayout from './components/Layout/WarehouseLayout';

// Auth
import Login from './pages/Auth/Login';

// Admin pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminCompanySetup from './pages/Admin/CompanySetup';
import AdminFleetManagement from './pages/Admin/FleetManagement';
import AdminDriverManagement from './pages/Admin/DriverManagement';
import AdminUsers from './pages/Admin/Users';
import AdminJobsConfig from './pages/Admin/JobsConfig';
import AdminWarehouses from './pages/Admin/Warehouses';
import AdminCustomers from './pages/Admin/Customers';
import AdminFinance from './pages/Admin/Finance';
import AdminMessaging from './pages/Admin/Messaging';
import AdminReports from './pages/Admin/Reports';
import AdminNotifications from './pages/Admin/Notifications';
import AdminIntegrations from './pages/Admin/Integrations';
import AdminAuditLogs from './pages/Admin/AuditLogs';
import AdminAddVehicle from './pages/Admin/AddVehicle';
import AdminAddDriver from './pages/Admin/AddDriver';
import AdminAddWarehouse from './pages/Admin/AddWarehouse';
import AdminAddCustomer from './pages/Admin/AddCustomer';
import AdminInviteUser from './pages/Admin/AddUser';
import AdminDriverDetail from './pages/Admin/DriverDetail';
import AdminVehicleDetail from './pages/Admin/VehicleDetail';
import AdminSettings from './pages/Admin/Settings'; // Legacy/Backup

// Dispatch pages
import DispatchDashboard from './pages/Dispatch/Dashboard';
import DispatchJobs from './pages/Dispatch/Jobs';
import DispatchCreateJob from './pages/Dispatch/CreateJob';
import DispatchTracking from './pages/Dispatch/Tracking';
import DispatchDrivers from './pages/Dispatch/Drivers';
import DispatchMessages from './pages/Dispatch/Messages';

// Driver pages
import DriverHome from './pages/Driver/Home';

// Warehouse pages
import WarehouseDashboard from './pages/Warehouse/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Admin Module */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="company" element={<AdminCompanySetup />} />
          <Route path="fleet" element={<AdminFleetManagement />} />
          <Route path="drivers" element={<AdminDriverManagement />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="jobs-config" element={<AdminJobsConfig />} />
          <Route path="warehouses" element={<AdminWarehouses />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="messaging" element={<AdminMessaging />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="integrations" element={<AdminIntegrations />} />
          <Route path="audit" element={<AdminAuditLogs />} />
          <Route path="fleet/add" element={<AdminAddVehicle />} />
          <Route path="fleet/:vehicleId" element={<AdminVehicleDetail />} />
          <Route path="drivers/add" element={<AdminAddDriver />} />
          <Route path="drivers/:driverId" element={<AdminDriverDetail />} />
          <Route path="warehouses/add" element={<AdminAddWarehouse />} />
          <Route path="customers/add" element={<AdminAddCustomer />} />
          <Route path="users/invite" element={<AdminInviteUser />} />
          <Route path="settings" element={<AdminSettings />} /> {/* Fallback route */}
        </Route>

        {/* Dispatch Module */}
        <Route path="/dispatch" element={<DispatchLayout />}>
          <Route index element={<DispatchDashboard />} />
          <Route path="jobs" element={<DispatchJobs />} />
          <Route path="jobs/create" element={<DispatchCreateJob />} />
          <Route path="tracking" element={<DispatchTracking />} />
          <Route path="drivers" element={<DispatchDrivers />} />
          <Route path="messages" element={<DispatchMessages />} />
        </Route>

        {/* Driver Module */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverHome />} />
        </Route>

        {/* Warehouse Module */}
        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
