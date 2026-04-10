import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { House, Map, FileText, User, Bell, Zap, Receipt } from 'lucide-react';

// Driver layout keeps the mobile phone frame — it is intentionally different
// as it simulates a native phone app, not a desktop portal.
const bottomNav = [
  { to: '/driver',          label: 'Home',     icon: House,    end: true },
  { to: '/driver/jobs',     label: 'Jobs',     icon: Map },
  // { to: '/driver/pay',      label: 'Pay',      icon: FileText }, // Hidden: Fixed salary based drivers
  { to: '/driver/expenses', label: 'Expenses', icon: Receipt },
  { to: '/driver/profile',  label: 'Profile',  icon: User },
];

export default function DriverLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-sans">
      {/* Phone frame */}
      <div className="w-[390px] h-[844px] bg-white flex flex-col relative shadow-2xl rounded-[40px] overflow-hidden border-4 border-gray-800">

        {/* Status bar */}
        <div className="bg-[#111] text-white flex justify-between items-center px-6 pt-3 pb-1 text-[11px] font-semibold shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span>●●●</span>
            <span>4G</span>
            <span>🔋 100%</span>
          </div>
        </div>

        {/* App header */}
        <div className="bg-[#111] flex items-center justify-between px-5 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFCC00] rounded-lg flex items-center justify-center">
              <Zap size={16} color="#111" strokeWidth={3} />
            </div>
            <div>
              <p className="text-white text-sm font-black leading-none tracking-tight">Jack Taylor</p>
              <p className="text-[#FFCC00] text-[9px] font-black tracking-widest uppercase flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] inline-block animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <NavLink to="/driver/notifications" className={({ isActive }) =>
            `relative p-2 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
          }>
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFCC00] rounded-full animate-pulse" />
          </NavLink>
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
          <Outlet />
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-white border-t border-gray-100 flex items-center justify-around px-4 shrink-0">
          {bottomNav.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              {({ isActive }) => (
                <div className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all`}>
                  <Icon
                    size={21}
                    color={isActive ? '#111' : '#9CA3AF'}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#111]' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
