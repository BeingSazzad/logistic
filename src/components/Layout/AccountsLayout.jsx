import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileCheck, FileText, CreditCard,
  Receipt, Users, BarChart2, LogOut, Bell, Zap, DollarSign, ChevronRight, ShieldCheck
} from 'lucide-react';

const navItems = [
  { to: '/accounts',                  label: 'Dashboard',           icon: LayoutDashboard, end: true },
  { to: '/accounts/pod-review',       label: 'POD Review',          icon: FileCheck, badge: 12 },
  { to: '/accounts/invoices',         label: 'Invoices',            icon: FileText },
  { to: '/accounts/payments',         label: 'Payments',            icon: CreditCard },
  { to: '/accounts/reimbursements',   label: 'Reimbursements',      icon: Receipt },
  { to: '/accounts/settlements',      label: 'Settlements',         icon: Users },
  { to: '/accounts/reports',          label: 'Reports',             icon: BarChart2 },
];

function NavItem({ to, label, Icon, end, badge }) {
  return (
    <NavLink to={to} end={end} className="group">
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
          isActive 
            ? 'bg-[#FFCC00] text-[#000]' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}>
          <Icon size={18} className={isActive ? 'text-black' : 'text-gray-500 group-hover:text-white transition-colors'} />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className={`text-[10px] font-black rounded-full px-1.5 py-0.5 ${isActive ? 'bg-black text-[#FFCC00]' : 'bg-red-500 text-white'}`}>
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
      {/* ── Sidebar ── */}
      <aside className="w-[260px] bg-[#111] shrink-0 flex flex-col h-full overflow-y-auto hidden-scrollbar">
        {/* Brand */}
        <div className="px-8 pt-8 pb-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-[#FFCC00] rounded-lg flex items-center justify-center shrink-0 shadow-lg">
              <Zap size={16} color="#000" strokeWidth={3} />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">HERO</span>
          </div>
          <div className="flex items-center gap-2 mt-2 ml-[44px]">
             <ShieldCheck size={11} className="text-[#FFCC00]" />
             <p className="text-[#FFCC00] text-[10px] font-black tracking-[0.2em] uppercase">Accounts HQ</p>
          </div>
        </div>

        {/* Nav Section Header */}
        <div className="px-8 pt-6 pb-2">
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Financial Management</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1.5 px-4 pt-2 pb-4 flex-1">
          {navItems.map(({ to, label, icon, end, badge }) => (
            <NavItem key={to} to={to} label={label} Icon={icon} end={end} badge={badge} />
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="px-4 pb-6 border-t border-white/5 pt-4 shrink-0">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all mb-4">
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
          
          <div className="flex items-center gap-3 px-2 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 font-black text-black text-sm shadow-xl shadow-yellow-500/10 border-2 border-white/10">
              SC
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-black truncate">Sarah Chen</p>
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Fin. Controller</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Canvas ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0 relative z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Enterprise Billing & Audit Control</p>
            <div className="w-px h-4 bg-gray-100"></div>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">System Live</p>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative">
               <button className="relative p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition-all">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
               </button>
            </div>
            <div className="w-px h-6 bg-gray-100"></div>
            <div className="flex items-center gap-3">
               <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-gray-900 uppercase">FY 2025-26</p>
                  <p className="text-[9px] font-bold text-gray-400">Quarter 2 Active</p>
               </div>
               <div className="w-9 h-9 rounded-full bg-[#FFCC00] flex items-center justify-center font-black text-black text-xs shadow-md border border-black/5">
                 SC
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-gray-50/50 p-10 pt-8 relative">
          {/* Subtle noise/texture overlay could go here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
