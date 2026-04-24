import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Bell, ChevronDown, ChevronRight, Zap, Search, Car, X, Shield, Command, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// ─── Global Search Component ────────────────────────────────────────────────
function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Mock search logic
  useEffect(() => {
    if (query.length > 2) {
      const mock = [
        { id: 'LD-2048', type: 'Load', title: 'Load LD-2048', desc: 'Dest: Brisbane QLD', status: 'Loading' },
        { id: 'VIN-82633', type: 'Vehicle', title: '1HGCM82633A004352', desc: 'Toyota Camry • Plate: XQG-984', status: 'In-Depot' },
        { id: 'DRV-102', type: 'Driver', title: 'James Mitchell', desc: 'Active on TRK-102', status: 'On Duty' },
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.id.toLowerCase().includes(query.toLowerCase())
      );
      setResults(mock);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:border-gray-200 transition-all cursor-pointer group w-64 lg:w-80"
      >
        <Search size={16} className="group-hover:text-gray-900 transition-colors" />
        <span className="text-xs font-bold flex-1 select-none">Quick Search...</span>
        <div className="flex items-center gap-1 opacity-40">
           <Command size={10} />
           <span className="text-[10px] font-black uppercase">K</span>
        </div>
      </div>

      {open && (
        <div className="absolute top-0 right-0 lg:right-auto lg:left-0 w-[420px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-[100] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Search size={20} className="text-[#FFCC00]" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search VIN, Load ID, Driver or Destination..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 w-full placeholder:text-gray-400"
            />
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[420px] overflow-auto p-2">
            {query.length <= 2 ? (
              <div className="p-12 text-center">
                <Search size={32} className="mx-auto text-gray-100 mb-3" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type to search the registry</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl cursor-pointer group transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#FFCC00] group-hover:text-black group-hover:border-[#FFCC00] transition-all">
                        {r.type === 'Vehicle' ? <Car size={18} /> : r.type === 'Load' ? <Shield size={18} /> : <Zap size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 leading-none mb-1">{r.title}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{r.desc}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 px-2 py-1 rounded-lg group-hover:border-gray-200">{r.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <AlertCircle size={32} className="mx-auto text-red-50 mb-3" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No matching records found</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1">
                 <span className="text-[8px] font-black bg-white border border-gray-200 rounded px-1 text-gray-400 shadow-sm">ESC</span>
                 <span className="text-[8px] font-black uppercase text-gray-400">Close</span>
               </div>
               <div className="flex items-center gap-1">
                 <span className="text-[8px] font-black bg-white border border-gray-200 rounded px-1 text-gray-400 shadow-sm">ENTER</span>
                 <span className="text-[8px] font-black uppercase text-gray-400">Select</span>
               </div>
            </div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Asset Search</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared Nav Item (flat link) ─────────────────────────────────────────────
export function SideNavItem({ to, label, Icon, end, badge }) {
  return (
    <NavLink to={to} end={end} className="group">
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive
            ? 'bg-[#FFCC00] text-[#111] shadow-md shadow-[#FFCC00]/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}>
          {Icon && <Icon size={15} className={isActive ? 'text-[#111]' : 'text-gray-500 group-hover:text-white transition-colors'} />}
          <span className="flex-1 leading-none">{label}</span>
          {badge != null && (
            <span className={`text-xs font-black rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${isActive ? 'bg-[#111] text-[#FFCC00]' : 'bg-red-500 text-white'}`}>
              {badge}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}

// ─── Collapsible Nav Group (for nested sections) ──────────────────────────────
export function SideNavGroup({ group }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  if (group.type === 'link') {
    return <SideNavItem to={group.to} label={group.label} Icon={group.icon} end={group.end} badge={group.badge} />;
  }

  const isChildActive = group.items.some(item =>
    location.pathname === item.to || location.pathname.startsWith(item.to + '/')
  );

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:text-white group transition-colors rounded-lg mb-0.5 ${isChildActive && !open ? 'bg-white/5' : ''}`}
      >
        <div className="flex items-center gap-2">
          {group.icon && <group.icon size={13} className={`transition-colors ${isChildActive ? 'text-[#FFCC00]' : 'text-gray-600 group-hover:text-white'}`} />}
          <span className={`text-sm font-medium ${isChildActive ? 'text-white' : ''}`}>{group.label}</span>
        </div>
        {open
          ? <ChevronDown size={12} className="opacity-40" />
          : <ChevronRight size={12} className="opacity-40" />
        }
      </button>
      {open && (
        <div className="flex flex-col gap-0.5">
          {group.items.map(item => (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <div className={`flex items-center gap-3 ml-4 px-3 py-2 rounded-lg text-sm font-medium transition-all border-l-2 cursor-pointer ${isActive
                    ? 'bg-[#FFCC00]/10 border-[#FFCC00] text-[#FFCC00]'
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

// ─── Notification Bell with Popover ──────────────────────────────────────────
function NotificationBell({ notifications = [] }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const defaults = [
    { title: 'System Alert', desc: 'A new event requires your attention.', time: '5m ago', unread: true },
    { title: 'Update', desc: 'Platform updated successfully.', time: '1h ago', unread: false },
  ];
  const items = notifications.length ? notifications : defaults;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShow(!show)}
        className={`relative p-2 rounded-full transition-colors ${show ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-100'}`}
      >
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>

      {show && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
            <span className="text-xs text-[#FFCC00] font-black uppercase tracking-widest cursor-pointer hover:opacity-70">Clear all</span>
          </div>
          <div className="divide-y divide-gray-50 max-h-80 overflow-auto">
            {items.map((n, i) => (
              <div key={i} className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${n.unread ? 'bg-amber-50/30' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <p className={`text-sm ${n.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{n.title}</p>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#FFCC00] mt-1 shrink-0" />}
                </div>
                <p className="text-xs text-gray-500 mb-1">{n.desc}</p>
                <p className="text-xs text-gray-400 font-bold">{n.time}</p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-50 text-center bg-gray-50/50 rounded-b-2xl">
            <button className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900">View All Activity</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Shared Sidebar Layout ───────────────────────────────────────────────
export default function SidebarLayout({
  roleName,
  roleIcon,
  navConfig = [],
  user = {},
  topbarTitle = '',
  topbarExtra = null,
  notifications = [],
  branchBadge = false,
  showSearch = true,
  children,
}) {
  const navigate = useNavigate();
  const initials = user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '??');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-[230px] min-w-[230px] bg-[#111111] shrink-0 flex flex-col h-full overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

        {/* Brand */}
        <div className="px-5 pt-6 pb-5 border-b border-white/5 shrink-0">
          <div className="flex items-center mb-2">
            <img
              src="/logo.png"
              alt="HERO Logistics"
              className="h-10 object-contain cursor-pointer"
              onClick={() => navigate('/')}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Text Logo */}
            <div className="hidden items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-[#FFCC00] rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,204,0,0.25)]">
                <Zap size={16} className="text-[#111]" strokeWidth={3} />
              </div>
              <span className="text-white font-black text-xl tracking-tighter uppercase">HERO</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 ml-1">
            {roleIcon && <span className="text-[#FFCC00] shrink-0">{roleIcon}</span>}
            <p className="text-[#FFCC00] text-xs font-black tracking-[0.2em] uppercase whitespace-nowrap truncate">{roleName}</p>
          </div>

          {/* Branch badge */}
          {branchBadge && user.branchName && (
            <div className="flex items-center gap-2 mt-4 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Active Branch</p>
                <p className="text-white text-xs font-bold truncate">{user.branchName}</p>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 pt-4 pb-4 flex-1">
          {navConfig.map((item, i) =>
            item.type === 'group'
              ? <SideNavGroup key={i} group={item} />
              : <SideNavItem key={i} to={item.to} label={item.label} Icon={item.icon} end={item.end} badge={item.badge} />
          )}
        </nav>

        {/* Profile Footer */}
        <div className="px-3 pb-5 border-t border-white/5 pt-3 shrink-0">
          <button
            onClick={() => {
              useAuthStore.getState().logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:text-white hover:bg-red-500/10 transition-all"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm z-40">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Navigation / {roleName}</p>
              <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{topbarTitle}</p>
            </div>
            {showSearch && <GlobalSearch />}
          </div>
          
          <div className="flex items-center gap-6">
            {topbarExtra}
            <NotificationBell notifications={notifications} />
            <div className="h-8 w-px bg-gray-100 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[#111] leading-none mb-1 uppercase tracking-tight">{user.name || 'Dispatcher'}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em]">{user.role || 'Admin'}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFCC00] border-2 border-white flex items-center justify-center font-black text-[#111] text-xs shadow-xl shadow-[#FFCC00]/20">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-gray-50 p-8 pt-6">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}
