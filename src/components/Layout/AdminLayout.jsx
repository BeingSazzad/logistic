import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Truck, Users, UserCog, Settings2, Warehouse,
  Briefcase, DollarSign, MessageSquare, BarChart2, Bell, Zap, Shield, Key, Link as LinkIcon, LogOut
} from 'lucide-react';

const navItems = [
  { to: '/admin',               label: 'Dashboard',          icon: LayoutDashboard, end: true },
  { to: '/admin/company',       label: 'Company Setup',      icon: Building2 },
  { to: '/admin/fleet',         label: 'Fleet Management',   icon: Truck },
  { to: '/admin/drivers',       label: 'Driver Management',  icon: Users },
  { to: '/admin/users',         label: 'Users & Roles',      icon: UserCog },
  { to: '/admin/jobs-config',   label: 'Jobs Config',        icon: Settings2 },
  { to: '/admin/warehouses',    label: 'Warehouses',         icon: Warehouse },
  { to: '/admin/customers',     label: 'Customers',          icon: Briefcase },
  { to: '/admin/finance',       label: 'Finance Overview',   icon: DollarSign },
  { to: '/admin/messaging',     label: 'Messaging',          icon: MessageSquare },
  { to: '/admin/reports',       label: 'Reports Analytics',  icon: BarChart2 },
  { to: '/admin/notifications', label: 'Notifications',      icon: Bell },
  { to: '/admin/integrations',  label: 'Integrations',       icon: LinkIcon },
  { to: '/admin/audit',         label: 'Audit Logs',         icon: Key },
];

function SideNavItem({ to, label, Icon, end }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}>
          <Icon size={16} color={isActive ? '#000' : '#9CA3AF'} />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-[240px] bg-[#111111] shrink-0 flex flex-col h-full overflow-y-auto hidden-scrollbar">
        {/* Brand */}
        <div className="px-6 pt-6 pb-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 bg-yellow-400 rounded-md flex items-center justify-center shrink-0">
              <Zap size={15} color="#000" strokeWidth={3} />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">HERO</span>
          </div>
          <div className="flex items-center gap-2 mt-2 ml-[36px]">
            <Shield size={11} color="#FACC15" />
            <p className="text-yellow-400 text-[10px] font-bold tracking-widest uppercase">Admin Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-4 pb-4 flex-1">
          {navItems.map(({ to, label, icon, end }) => (
            <SideNavItem key={to} to={to} label={label} Icon={icon} end={end} />
          ))}
        </nav>

        {/* Profile */}
        <div className="px-3 pb-5 border-t border-white/5 pt-3 shrink-0">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all mb-3">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center shrink-0 font-bold text-black text-sm">
              MA
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Michael Adams</p>
              <p className="text-gray-500 text-xs">System Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden border">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SaaS Master Control</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-xs">
              MA
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-gray-50 p-8 pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
