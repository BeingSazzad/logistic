import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Deployment: Vercel-Ready v1.0.1
import './App.css';

// ── Layouts ──────────────────────────────────────────────────────
import AdminLayout     from './components/Layout/AdminLayout';
import DispatchLayout  from './components/Layout/DispatchLayout';
import DriverLayout    from './components/Layout/DriverLayout';
import WarehouseLayout from './components/Layout/WarehouseLayout';
import AccountsLayout  from './components/Layout/AccountsLayout';
import PlatformLayout  from './components/Layout/PlatformLayout';
import CustomerLayout  from './components/Layout/CustomerLayout';

// ── Auth ─────────────────────────────────────────────────────────
import Login from './pages/Auth/Login';

// ── Admin ────────────────────────────────────────────────────────
import AdminDashboard       from './pages/Admin/Dashboard';
import AdminCompanySetup    from './pages/Admin/CompanySetup';
import AdminFleetManagement from './pages/Admin/FleetManagement';
import AdminDriverManagement from './pages/Admin/DriverManagement';
import AdminUsers           from './pages/Admin/Users';
import AdminJobsConfig      from './pages/Admin/JobsConfig';
import AdminCustomers       from './pages/Admin/Customers';
import AdminFinance         from './pages/Admin/Finance';
import AdminMessaging       from './pages/Admin/Messaging';
import AdminReports         from './pages/Admin/Reports';
import AdminNotifications   from './pages/Admin/Notifications';
import AdminHelpline        from './pages/Admin/Helpline';
import AdminIntegrations    from './pages/Admin/Integrations';
import AdminAuditLogs       from './pages/Admin/AuditLogs';
import AdminAddVehicle      from './pages/Admin/AddVehicle';
import AdminAddDriver       from './pages/Admin/AddDriver';
import AdminAddCustomer     from './pages/Admin/AddCustomer';
import AdminInviteUser      from './pages/Admin/AddUser';
import AdminDriverDetail    from './pages/Admin/DriverDetail';
import AdminVehicleDetail   from './pages/Admin/VehicleDetail';
import AdminSettings        from './pages/Admin/Settings';
import AdminShipments         from './pages/Admin/Shipments';
import AdminCreateShipment   from './pages/Admin/CreateShipment';
import AdminShipmentDetail   from './pages/Admin/ShipmentDetail';
import AdminExceptions       from './pages/Admin/Exceptions';
import AdminBranches        from './pages/Admin/Branches';
import AdminAddBranch       from './pages/Admin/AddBranch';
import AdminBranchDetail    from './pages/Admin/BranchDetail';
import AdminCustomerDetail  from './pages/Admin/CustomerDetail';
import AdminUserDetail      from './pages/Admin/UserDetail';
import AdminSafetyChecklists from './pages/Admin/SafetyChecklists';
import AdminBilling         from './pages/Admin/Billing';
import AdminSubscriptionPlans from './pages/Admin/SubscriptionPlans';

// ── Dispatch ─────────────────────────────────────────────────────
import DispatchDashboard from './pages/Dispatch/Dashboard';
import DispatchJobs      from './pages/Dispatch/Jobs';
import DispatchJobDetail  from './pages/Dispatch/JobDetail';
import DispatchCreateJob from './pages/Dispatch/CreateJob';
import DispatchTracking  from './pages/Dispatch/Tracking';
import DispatchDrivers   from './pages/Dispatch/Drivers';
import DispatchMessages  from './pages/Dispatch/Messages';
import DispatchSettings  from './pages/Dispatch/Settings';
import DispatchVehicleDetail from './pages/Dispatch/VehicleDetail';
import DispatchFleet from './pages/Dispatch/Fleet';
import DispatchTerminal from './pages/Dispatch/TerminalWorkspace';

// ── Driver ───────────────────────────────────────────────────────
import DriverHome        from './pages/Driver/Home';
import DriverSafetyCheck from './pages/Driver/SafetyCheck';
import DriverActiveTrip  from './pages/Driver/ActiveTrip';
import DriverJobs        from './pages/Driver/Jobs';
import DriverPay         from './pages/Driver/Pay';
import DriverExpenses    from './pages/Driver/Expenses';
import DriverProfile     from './pages/Driver/Profile';
import DriverMessages    from './pages/Driver/Messages';
import DriverNotifications from './pages/Driver/Notifications';
import DriverJobDetail   from './pages/Driver/JobDetail';

// ── Warehouse ────────────────────────────────────────────────────
import WarehouseDashboard from './pages/Warehouse/Dashboard';
import WarehouseInbound   from './pages/Warehouse/Inbound';
import WarehouseOutbound  from './pages/Warehouse/Outbound';
import WarehouseInventory from './pages/Warehouse/Inventory';

// ── Accounts ─────────────────────────────────────────────────────
import AccountsDashboard     from './pages/Accounts/Dashboard';
import AccountsPODReview     from './pages/Accounts/PODReview';
import AccountsInvoices      from './pages/Accounts/Invoices';
import AccountsPayments      from './pages/Accounts/Payments';
import AccountsReimbursements from './pages/Accounts/Reimbursements';
import AccountsSettlements   from './pages/Accounts/Settlements';
import AccountsReports       from './pages/Accounts/Reports';

// ── Platform ─────────────────────────────────────────────────────
import PlatformDashboard      from './pages/Platform/Dashboard';
import PlatformTenants        from './pages/Platform/Tenants';
import PlatformTenantDetail   from './pages/Platform/TenantDetail';
import PlatformAnalytics      from './pages/Platform/Analytics';
import PlatformSubscriptions  from './pages/Platform/Subscriptions';
import PlatformSupport        from './pages/Platform/Support';
import PlatformSupportDetail  from './pages/Platform/SupportDetail';
import PlatformTransactions   from './pages/Platform/Transactions';
import PlatformSettings       from './pages/Platform/Settings';
import PlatformAuditLogs      from './pages/Platform/AuditLogs';

// ── Customer ─────────────────────────────────────────────────────
import CustomerDashboard from './pages/Customer/Dashboard';
import CustomerTracking  from './pages/Customer/Tracking';
import CustomerInvoices  from './pages/Customer/Invoices';
import CustomerAccount   from './pages/Customer/Account';

// ── 404 ──────────────────────────────────────────────────────────
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Root → Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* ── ADMIN ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="company"         element={<AdminCompanySetup />} />
          <Route path="fleet"           element={<AdminFleetManagement />} />
          <Route path="fleet/add"       element={<AdminAddVehicle />} />
          <Route path="fleet/:vehicleId" element={<AdminVehicleDetail />} />
          <Route path="drivers"         element={<AdminDriverManagement />} />
          <Route path="drivers/add"     element={<AdminAddDriver />} />
          <Route path="drivers/:driverId" element={<AdminDriverDetail />} />
          <Route path="users"           element={<AdminUsers />} />
          <Route path="users/invite"    element={<AdminInviteUser />} />
          <Route path="users/:id"       element={<AdminUserDetail />} />
          <Route path="shipments"         element={<AdminShipments />} />
          <Route path="shipments/create"  element={<AdminCreateShipment />} />
          <Route path="shipments/:id"     element={<AdminShipmentDetail />} />
          <Route path="exceptions"        element={<AdminExceptions />} />
          <Route path="jobs-config"     element={<AdminJobsConfig />} />
          <Route path="branches"        element={<AdminBranches />} />
          <Route path="branches/add"    element={<AdminAddBranch />} />
          <Route path="branches/:id"    element={<AdminBranchDetail />} />
          <Route path="customers"       element={<AdminCustomers />} />
          <Route path="customers/add"   element={<AdminAddCustomer />} />
          <Route path="customers/:id"   element={<AdminCustomerDetail />} />
          <Route path="finance"         element={<AdminFinance />} />
          <Route path="messaging"       element={<AdminMessaging />} />
          <Route path="reports"         element={<AdminReports />} />
          <Route path="notifications"   element={<AdminNotifications />} />
          <Route path="helpline"        element={<AdminHelpline />} />
          <Route path="integrations"    element={<AdminIntegrations />} />
          <Route path="audit"           element={<AdminAuditLogs />} />
          <Route path="safety-checklists" element={<AdminSafetyChecklists />} />
          <Route path="settings"        element={<AdminSettings />} />
          <Route path="billing"         element={<AdminBilling />} />
          <Route path="billing/plans"   element={<AdminSubscriptionPlans />} />
        </Route>

        {/* ── DISPATCH ── */}
        <Route path="/dispatch" element={<DispatchLayout />}>
          <Route index element={<DispatchDashboard />} />
          <Route path="shipments"         element={<DispatchJobs />} />
          <Route path="shipments/create"  element={<DispatchCreateJob />} />
          <Route path="shipments/:id"     element={<DispatchJobDetail />} />
          <Route path="tracking"          element={<DispatchTracking />} />
          <Route path="drivers"      element={<DispatchDrivers />} />
          <Route path="drivers/add"  element={<AdminAddDriver />} />
          <Route path="drivers/:driverId" element={<AdminDriverDetail />} />
          <Route path="messages"     element={<DispatchMessages />} />
          <Route path="settings"     element={<DispatchSettings />} />
          <Route path="fleet"        element={<DispatchFleet />} />
          <Route path="vehicles/:vehicleId" element={<DispatchVehicleDetail />} />
          <Route path="terminal" element={<DispatchTerminal />} />
        </Route>

        {/* ── DRIVER ── */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverHome />} />
          <Route path="safety-check" element={<DriverSafetyCheck />} />
          <Route path="active"       element={<DriverActiveTrip />} />
          <Route path="shipments"     element={<DriverJobs />} />
          <Route path="shipments/:id" element={<DriverJobDetail />} />
          <Route path="pay"          element={<DriverPay />} />
          <Route path="expenses"     element={<DriverExpenses />} />
          <Route path="profile"      element={<DriverProfile />} />
          <Route path="messages"     element={<DriverMessages />} />
          <Route path="notifications" element={<DriverNotifications />} />
        </Route>

        {/* ── WAREHOUSE ── */}
        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseDashboard />} />
          <Route path="inbound"   element={<WarehouseInbound />} />
          <Route path="outbound"  element={<WarehouseOutbound />} />
          <Route path="inventory" element={<WarehouseInventory />} />
        </Route>

        {/* ── ACCOUNTS ── */}
        <Route path="/accounts" element={<AccountsLayout />}>
          <Route index element={<AccountsDashboard />} />
          <Route path="pod-review"      element={<AccountsPODReview />} />
          <Route path="invoices"        element={<AccountsInvoices />} />
          <Route path="payments"        element={<AccountsPayments />} />
          <Route path="reimbursements"  element={<AccountsReimbursements />} />
          <Route path="settlements"     element={<AccountsSettlements />} />
          <Route path="reports"         element={<AccountsReports />} />
        </Route>

        {/* ── PLATFORM OWNER ── */}
        <Route path="/platform" element={<PlatformLayout />}>
          <Route index element={<PlatformDashboard />} />
          <Route path="tenants"         element={<PlatformTenants />} />
          <Route path="tenants/new"     element={<PlatformTenants />} />
          <Route path="tenants/:id"     element={<PlatformTenantDetail />} />
          <Route path="analytics"       element={<PlatformAnalytics />} />
          <Route path="subscriptions"   element={<PlatformSubscriptions />} />
          <Route path="support"         element={<PlatformSupport />} />
          <Route path="support/:id"     element={<PlatformSupportDetail />} />
          <Route path="transactions"    element={<PlatformTransactions />} />
          <Route path="settings"        element={<PlatformSettings />} />
          <Route path="settings/audit"  element={<PlatformAuditLogs />} />
        </Route>

        {/* ── CUSTOMER ── */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="tracking" element={<CustomerTracking />} />
          <Route path="invoices" element={<CustomerInvoices />} />
          <Route path="account"  element={<CustomerAccount />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
