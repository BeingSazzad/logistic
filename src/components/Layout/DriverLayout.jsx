import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { House, Map, FileText, User, Bell, Zap, Receipt, MessageSquare } from 'lucide-react';

// Driver layout keeps the mobile phone frame — it is intentionally different
// as it simulates a native phone app, not a desktop portal.
const bottomNav = [
  { to: '/driver', label: 'Home', icon: House, end: true },
  { to: '/driver/loads', label: 'Assigned', icon: FileText },
  { to: '/driver/active', label: 'Active Route', icon: Map },
  { to: '/driver/expenses', label: 'Expenses', icon: Receipt },
  { to: '/driver/profile', label: 'Profile', icon: User },
];

export default function DriverLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/driver') return 'Dashboard';
    if (path.startsWith('/driver/loads')) return 'Assigned Jobs';
    if (path === '/driver/active') return 'Active Route';
    if (path === '/driver/messages') return 'Messenger';
    if (path === '/driver/profile') return 'My Profile';
    if (path === '/driver/expenses' || path === '/driver/pay') return 'Expenses';
    if (path === '/driver/safety-check') return 'Safety Check';
    if (path === '/driver/notifications') return 'Notifications';
    if (path === '/driver/incident') return 'Incident Report';
    return 'Hero Driver';
  };
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-sans">
      {/* Phone frame */}
      <div className="w-[390px] h-[844px] bg-white flex flex-col relative shadow-2xl rounded-[40px] overflow-hidden border-4 border-gray-800">

        {/* Status bar */}
        <div className="bg-[#111] text-white flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span>●●●</span>
            <span>4G</span>
            <span>🔋 100%</span>
          </div>
        </div>

        {/* App header — Hidden on Live Map */}
        {location.pathname !== '/driver/active' && (
          <div className="bg-[#111] flex items-center justify-between px-5 py-3 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-[#FFCC00] rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-[#FFCC00]/20">
                  <Zap size={15} color="#111" strokeWidth={3} />
               </div>
               <p className="text-white text-sm font-bold uppercase tracking-tight">{getPageTitle()}</p>
            </div>
            <NavLink to="/driver/notifications" className={({ isActive }) =>
              `relative p-2 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
            }>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFCC00] rounded-full animate-pulse" />
            </NavLink>
          </div>
        )}

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
          <Outlet />
        </div>

        {/* Bottom nav — Hidden on Live Map for focused navigation */}
        {location.pathname !== '/driver/active' && (
          <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-100 flex items-center justify-around px-2 shrink-0 z-50">
            {bottomNav.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className="flex-1">
                {({ isActive }) => (
                  <div className={`flex flex-col items-center gap-1 transition-all`}>
                    <Icon
                      size={20}
                      color={isActive ? '#111' : '#9CA3AF'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                    <span className={`text-xs leading-none uppercase ${isActive ? 'font-black text-[#111]' : 'font-normal text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

