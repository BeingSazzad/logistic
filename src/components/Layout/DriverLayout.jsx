import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { House, Map, FileText, User, Bell, Zap } from 'lucide-react';

export default function DriverLayout() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-sans">
      {/* Phone frame */}
      <div className="w-[390px] h-[844px] bg-white flex flex-col relative shadow-2xl rounded-[40px] overflow-hidden border-4 border-gray-800">
        {/* Status bar */}
        <div className="bg-black text-white flex justify-between items-center px-6 pt-3 pb-1 text-[11px] font-semibold shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span>●●●</span>
            <span>4G</span>
            <span>🔋 100%</span>
          </div>
        </div>

        {/* App header */}
        <div className="bg-black flex items-center justify-between px-5 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Zap size={16} color="#000" strokeWidth={3} />
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-none">Jack Taylor</p>
              <p className="text-yellow-400 text-[10px] font-semibold tracking-widest uppercase flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <button className="relative p-2 text-gray-400">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full" />
          </button>
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
          <Outlet />
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-white border-t border-gray-100 flex items-center justify-around px-4 shrink-0">
          {[
            { to: '/driver', label: 'Home', icon: House, end: true },
            { to: '/driver/route', label: 'Route', icon: Map },
            { to: '/driver/expenses', label: 'Expenses', icon: FileText },
            { to: '/driver/profile', label: 'Profile', icon: User },
          ].map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
            >
              {({ isActive }) => (
                <div className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${isActive ? 'text-black' : 'text-gray-400'}`}>
                  <Icon size={21} color={isActive ? '#000' : '#9CA3AF'} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className={`text-[10px] font-semibold ${isActive ? 'text-black' : 'text-gray-400'}`}>{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
