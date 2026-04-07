import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  PackageSearch, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Truck
} from 'lucide-react';

const navItems = [
  { to: '/warehouse', label: 'Dashboard', icon: Building2, end: true },
  { to: '/warehouse/inbound', label: 'Inbound Receipts', icon: ArrowDownToLine },
  { to: '/warehouse/outbound', label: 'Outbound Loading', icon: ArrowUpFromLine },
  { to: '/warehouse/inventory', label: 'Inventory Search', icon: PackageSearch },
];

export default function WarehouseLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-[240px] bg-gray-900 shrink-0 flex flex-col text-gray-300">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 gap-3 border-b border-gray-800 bg-black">
          <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center shrink-0">
            <Truck className="text-black fill-black" size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">HERO</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-1.5 flex-1 overflow-y-auto w-full">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 mt-2 px-2">
            Warehouse Ops
          </div>
          
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-yellow-400 text-black' : 'hover:bg-gray-800 hover:text-white'}`}
            >
              {({isActive}) => (
                <>
                  <Icon size={18} className={isActive ? "text-black" : "text-gray-400"} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800 flex flex-col gap-1">
          <NavLink to="/warehouse/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors text-sm font-medium">
            <Settings size={18} className="text-gray-400" />
            <span>Settings</span>
          </NavLink>
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors text-left text-sm font-medium text-red-400">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Scan barcode or search ID..." 
                className="w-full bg-yellow-50 border border-yellow-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono tracking-wide"
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 border-l border-gray-200 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">Floor Manager</p>
                <p className="text-xs text-gray-500 leading-none">Zone A-14</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-sm text-gray-600">
                FM
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
