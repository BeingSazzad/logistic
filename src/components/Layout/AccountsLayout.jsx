import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileCheck, FileText, CreditCard,
  Receipt, Users, BarChart2, LogOut, Bell, Zap, DollarSign
} from 'lucide-react';

const navItems = [
  { to: '/accounts',                  label: 'Dashboard',           icon: LayoutDashboard, end: true },
  { to: '/accounts/pod-review',       label: 'POD Review',          icon: FileCheck },
  { to: '/accounts/invoices',         label: 'Invoices',            icon: FileText },
  { to: '/accounts/payments',         label: 'Payments',            icon: CreditCard },
  { to: '/accounts/reimbursements',   label: 'Reimbursements',      icon: Receipt },
  { to: '/accounts/settlements',      label: 'Driver Settlements',  icon: Users },
  { to: '/accounts/reports',          label: 'Financial Reports',   icon: BarChart2 },
];

function NavItem({ to, label, Icon, end, badge }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          isActive ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}>
          <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
              {badge}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}

export default function AccountsLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 font-sans">
      <aside className="w-[240px] bg-[#0f1923] shrink-0 flex flex-col h-full overflow-y-auto hidden-scrollbar">
        {/* Brand */}
        <div className="px-6 pt-6 pb-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 bg-emerald-500 rounded-md flex items-center justify-center shrink-0">
              <DollarSign size={15} color="#fff" strokeWidth={3} />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">HERO</span>
          </div>
          <p className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase ml-[36px]">
            Accounts Portal
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-4 pb-4 flex-1">
          {navItems.map(({ to, label, icon, end, badge }) => (
            <NavItem key={to} to={to} label={label} Icon={icon} end={end} badge={badge} />
          ))}
        </nav>

        {/* Profile */}
        <div className="px-3 pb-5 border-t border-white/5 pt-3 shrink-0">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mb-3">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 font-bold text-white text-sm">
              SC
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Sarah Chen</p>
              <p className="text-gray-500 text-xs">Accounts Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Finance & Billing Control</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-xs">
              SC
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
