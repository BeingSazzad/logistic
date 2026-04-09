import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Receipt, BarChart3,
  HeadphonesIcon, Settings, LogOut, Bell, Globe
} from 'lucide-react';

const navItems = [
  { to: '/platform',               label: 'Dashboard',      icon: LayoutDashboard, end: true },
  { to: '/platform/tenants',       label: 'Tenants',        icon: Building2 },
  { to: '/platform/transactions',  label: 'Transactions',   icon: Receipt },
  { to: '/platform/subscriptions', label: 'Subscriptions',  icon: CreditCard },
  { to: '/platform/support',       label: 'Support',        icon: HeadphonesIcon },
  { to: '/platform/analytics',     label: 'Analytics',      icon: BarChart3 },
  { to: '/platform/settings',      label: 'Settings',       icon: Settings },
];

function NavItem({ to, label, Icon, end }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          isActive ? 'bg-yellow-500 text-gray-900' : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}>
          <Icon size={16} className={isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-white transition-colors'} />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
}

export default function PlatformLayout() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 font-sans">
      <aside className="w-[240px] bg-[#0d0d1a] shrink-0 flex flex-col h-full overflow-y-auto hidden-scrollbar">
        <div className="px-6 pt-6 pb-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 bg-yellow-500 rounded-md flex items-center justify-center shrink-0">
              <Globe size={15} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">HERO</span>
          </div>
          <p className="text-yellow-400 text-[10px] font-bold tracking-widest uppercase ml-[36px]">
            Platform Owner
          </p>
        </div>

        <nav className="flex flex-col gap-1 px-3 pt-4 pb-4 flex-1">
          {navItems.map(({ to, label, icon, end }) => (
            <NavItem key={to} to={to} label={label} Icon={icon} end={end} />
          ))}
        </nav>

        <div className="px-3 pb-5 border-t border-white/5 pt-3 shrink-0">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mb-3">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 font-bold text-gray-900 text-sm">
              PO
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Platform Admin</p>
              <p className="text-gray-500 text-xs">SaaS Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SaaS Management Console</p>
          </div>
          <div className="flex items-center gap-4 relative">
            <div ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-12 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                    <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-80 overflow-auto">
                    {[
                      { title: 'New Tenant Signup', desc: 'FastMove AU has requested to join.', time: '2 mins ago', unread: true },
                      { title: 'Support Ticket', desc: 'New high priority ticket from OzFreight Co.', time: '1 hr ago', unread: true },
                      { title: 'Payment Failed', desc: 'Automated invoice collection failed.', time: '5 hrs ago', unread: false },
                    ].map((n, i) => (
                      <div key={i} className={`p-4 hover:bg-gray-50 cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex justify-between items-start mb-1">
                          <p className={`text-sm ${n.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{n.title}</p>
                          {n.unread && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{n.desc}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="w-full text-center p-3 border-t border-gray-50 bg-gray-50/50 rounded-b-xl">
                    <button className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors">View All Activity</button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-gray-900 text-xs">
              PO
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
