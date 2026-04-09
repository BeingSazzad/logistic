import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Truck, Users, UserCog, Settings2, Warehouse,
  Briefcase, DollarSign, MessageSquare, BarChart2, Bell, Zap, Shield, Key, Link as LinkIcon, LogOut, HelpCircle, Settings,
  ChevronDown, ChevronRight, Package, Network
} from 'lucide-react';

const navGroups = [
  {
    type: 'link', label: 'Dashboard', icon: LayoutDashboard, to: '/admin', end: true
  },
  {
    type: 'group', label: 'Operations', icon: Package,
    items: [
      { to: '/admin/shipments',     label: 'Shipments' },
      { to: '/admin/exceptions',    label: 'Delivery Issues' },
      { to: '/admin/customers',     label: 'Customers' },
      { to: '/admin/jobs-config',   label: 'Jobs Config' },
    ]
  },
  {
    type: 'link', label: 'Financial Control', icon: DollarSign, to: '/admin/finance'
  },
  {
    type: 'group', label: 'Network Control', icon: Network,
    items: [
      { to: '/admin/branches',      label: 'Branches' },
      { to: '/admin/fleet',         label: 'Fleet' },
      { to: '/admin/drivers',       label: 'Drivers' },
    ]
  },
  {
    type: 'group', label: 'Insights', icon: BarChart2,
    items: [
      { to: '/admin/reports',       label: 'Operational Analytics' },
      { to: '/admin/audit',         label: 'System Audit Logs' },
    ]
  },
  {
    type: 'group', label: 'Help & Support', icon: MessageSquare,
    items: [
      { to: '/admin/messaging',     label: 'Messages' },
      { to: '/admin/helpline',      label: 'Support' },
    ]
  },
  {
    type: 'group', label: 'General Settings', icon: Settings,
    items: [
      { to: '/admin/company',       label: 'Company Profile' },
      { to: '/admin/users',         label: 'Users & Permissions' },
      { to: '/admin/notifications', label: 'Alert Notifications' },
      { to: '/admin/integrations',  label: 'API & Connections' },
      { to: '/admin/settings',      label: 'System Config' },
    ]
  }
];

function SideNavItem({ to, label, Icon, end }) {
  return (
    <NavLink to={to} end={end} className="group">
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-hero-sm text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
          isActive 
            ? 'bg-brand text-hero-dark shadow-lg shadow-brand/20' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}>
          <Icon size={16} className={isActive ? 'text-hero-dark' : 'text-hero-neutral group-hover:text-white transition-colors'} />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
}

function NavGroup({ group }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  if (group.type === 'link') {
    return <SideNavItem to={group.to} label={group.label} Icon={group.icon} end={group.end} />;
  }

  const isChildActive = group.items.some(item => location.pathname === item.to || location.pathname.startsWith(item.to + '/'));

  return (
    <div className="mb-0.5">
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:text-white group transition-colors rounded-hero-sm mb-1 ${isChildActive && !open ? 'bg-white/5' : ''}`}>
        <div className="flex items-center gap-2">
          <group.icon size={14} className={`transition-colors ${isChildActive ? 'text-brand' : 'text-gray-600 group-hover:text-white'}`} />
          <span className={`hero-metadata font-black ${isChildActive ? 'text-white' : ''}`}>{group.label}</span>
        </div>
        {open ? <ChevronDown size={14} className="opacity-40" /> : <ChevronRight size={14} className="opacity-40" />}
      </button>
      {open && (
        <div className="flex flex-col gap-0.5">
          {group.items.map(item => (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <div className={`flex items-center gap-3 ml-[18px] px-4 py-2 rounded-hero-sm text-[12px] font-black uppercase tracking-widest transition-all border-l-2 cursor-pointer ${
                  isActive 
                    ? 'bg-brand/10 border-brand text-brand shadow-inner' 
                    : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5 hover:border-white/10'
                }`}>
                  <span>{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLayout() {
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
      {/* ── Sidebar ── */}
      <aside className="w-[240px] bg-[#111111] shrink-0 flex flex-col h-full overflow-y-auto hidden-scrollbar">
        {/* Brand */}
        <div className="px-6 pt-6 pb-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 bg-[#FACC15] rounded-md flex items-center justify-center shrink-0">
              <Zap size={15} color="#000" strokeWidth={3} />
            </div>
            <span className="text-white font-black text-xl tracking-tighter">HERO</span>
          </div>
          <div className="flex items-center gap-2 mt-2 ml-[36px]">
            <Shield size={11} className="text-[#FACC15]" />
            <p className="text-[#FACC15] text-[10px] font-black tracking-widest uppercase">Admin Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1.5 px-3 pt-4 pb-4 flex-1">
          {navGroups.map((g, i) => (
            <NavGroup key={i} group={g} />
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="px-3 pb-5 border-t border-white/5 pt-3 shrink-0">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all mb-3">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#FACC15] flex items-center justify-center shrink-0 font-black text-[#000] text-sm shadow-lg shadow-yellow-500/10">
              MA
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">Michael Adams</p>
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 relative z-40">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enterprise Fleet Operations</p>
          </div>
          <div className="flex items-center gap-4">
            <div ref={notifRef} className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              {/* Notification Popover (Synced Design) */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-sm">Activities</h3>
                    <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest cursor-pointer hover:underline">Clear</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[400px] overflow-auto">
                    {[
                      { title: 'Job Completed', desc: 'JOB-902 delivered to Mascot.', time: '12m ago', color: 'bg-emerald-50 text-emerald-600' },
                      { title: 'System Warning', desc: 'Driver Jack is idling for > 20 mins.', time: '1hr ago', color: 'bg-amber-50 text-amber-600' },
                      { title: 'Customer Query', desc: 'Inquiry received on JOB-891.', time: '4hrs ago', color: 'bg-sky-50 text-sky-600' },
                    ].map((n, i) => (
                      <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-bold text-gray-900">{n.title}</p>
                          <span className="text-[10px] text-gray-400 font-bold">{n.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-50 text-center rounded-b-2xl">
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900">View Full Monitor</button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FACC15] flex items-center justify-center font-black text-[#000] text-xs shadow-md">
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
