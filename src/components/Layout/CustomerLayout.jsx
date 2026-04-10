import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Package, MapPin, FileText, User, Zap, Bell, LogOut } from 'lucide-react';

// Customer layout uses a top-nav bar (not sidebar) as it's a public-facing portal.
const navItems = [
  { to: '/customer',          label: 'Acme Distribution',  icon: Package,  end: true },
  { to: '/customer/tracking', label: 'Live Tracking', icon: MapPin },
  { to: '/customer/invoices', label: 'My Invoices',      icon: FileText },
  { to: '/customer/account',  label: 'My Account',    icon: User },
];

export default function CustomerLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Top Nav */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#FFCC00] rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(255,204,0,0.2)]">
              <Zap size={14} color="#111" strokeWidth={3} />
            </div>
            <span className="font-black text-[#111] text-lg tracking-tighter uppercase">HERO</span>
            <span className="w-px h-4 bg-gray-200 mx-1" />
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Customer Portal</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end}>
                {({ isActive }) => (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-[#FFCC00] text-[#111]'
                      : 'text-gray-500 hover:text-[#111] hover:bg-gray-100'
                  }`}>
                    <Icon size={13} />
                    {label}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center font-black text-[#111] text-xs shadow-md">
              WL
            </div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors ml-1"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
