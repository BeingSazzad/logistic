import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  MapPin,
  Users,
  MessageSquare,
  Settings,
  Zap,
  UserCircle,
  LogOut
} from 'lucide-react';

const navItems = [
  { to: '/dispatch',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dispatch/jobs',     label: 'Jobs',      icon: Package },
  { to: '/dispatch/tracking', label: 'Tracking',  icon: MapPin },
  { to: '/dispatch/drivers',  label: 'Drivers',   icon: Users },
  { to: '/dispatch/messages', label: 'Messages',  icon: MessageSquare },
];

function SideNavItem({ to, label, Icon, end }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          isActive ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}>
          <Icon size={17} color={isActive ? '#000' : '#9CA3AF'} />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
}

export default function DispatchLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-[220px] min-w-[220px] bg-[#111111] flex flex-col h-full shrink-0">
        {/* Brand */}
        <div className="px-6 pt-6 pb-5 border-b border-white/5">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 bg-yellow-400 rounded-md flex items-center justify-center shrink-0">
              <Zap size={15} color="#000" strokeWidth={3} />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">HERO</span>
          </div>
          <p className="text-gray-500 text-[11px] font-semibold tracking-widest uppercase ml-[36px]">
            Dispatch Portal
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 pt-4 flex-1">
          {navItems.map(({ to, label, icon, end }) => (
            <SideNavItem key={to} to={to} label={label} Icon={icon} end={end} />
          ))}
        </nav>

        {/* Settings + Profile */}
        <div className="px-3 pb-5 border-t border-white/5 pt-3">
          <SideNavItem to="/dispatch/settings" label="Settings" Icon={Settings} />
          
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 transition-all mt-1"
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>

          <div className="flex items-center gap-3 px-2 mt-4">
            <UserCircle size={36} color="#6B7280" />
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Sarah Mitchell</p>
              <p className="text-gray-500 text-xs">Dispatcher</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
