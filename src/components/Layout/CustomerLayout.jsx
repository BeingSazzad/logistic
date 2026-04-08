import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, FileText, LogOut, Bell, Zap, User } from 'lucide-react';

export default function CustomerLayout() {
  const navigate = useNavigate();
  const navItems = [
    { to: '/customer',          label: 'My Shipments', icon: Package,     end: true },
    { to: '/customer/tracking', label: 'Live Tracking', icon: MapPin },
    { to: '/customer/invoices', label: 'Invoices',      icon: FileText },
    { to: '/customer/account',  label: 'My Account',   icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Zap size={16} color="#000" strokeWidth={3} />
            </div>
            <span className="font-bold text-gray-900 text-lg">HERO</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-sm text-gray-500 font-medium">Customer Portal</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end}>
                {({ isActive }) => (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-yellow-400 text-black' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                    <Icon size={15} />
                    {label}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-xs">
              WL
            </div>
            <button onClick={() => navigate('/login')} className="text-sm text-gray-500 hover:text-red-500 font-medium ml-1">
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
