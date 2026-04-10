import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, TrendingUp, ArrowUpRight, 
  AlertTriangle, Blocks, Plus, Activity, Globe, 
  Zap, Navigation, CheckCircle, ShieldCheck, DollarSign, ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [shipmentYear, setShipmentYear] = useState('2026');
  const [revenueYear, setRevenueYear] = useState('2026');

  const recentActivities = [
    { id: 'SHP-9042', action: 'Delivery Completed', user: 'Jack Taylor', time: '12m ago', status: 'Success' },
    { id: 'SHP-9041', action: 'Route Optimized', user: 'Sarah Mitchell', time: '1h ago', status: 'System' },
    { id: 'SHP-9039', action: 'Handover Initiated', user: 'Liam Smith', time: '2h ago', status: 'Warning' },
    { id: 'SHP-9032', action: 'Cross-dock Sorting', user: 'Maria Garcia', time: '5h ago', status: 'Success' },
  ];

  const shipmentData = [32, 45, 38, 52, 65, 58, 72, 85, 92, 88, 105, 120];
  const revenueData  = [140, 165, 155, 180, 210, 195, 230, 250, 280, 265, 305, 342];
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 animate-in fade-in duration-700">
      
      {/* ── Standardized Header ── */}
      <div className="flex justify-between items-center px-2 mb-6 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-hero-sm text-hero-dark shadow-sm">
            <Blocks size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Main Dashboard</h1>
            <p className="hero-body mt-1 flex items-center gap-2">Global network visibility and financial performance.</p>
          </div>
        </div>

      </div>

      <div className="w-full h-px bg-gray-100 mb-6 px-2"></div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mb-6">
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="hero-metadata leading-tight text-hero-neutral">Total Order <span className="text-emerald-500 font-bold ml-1">+1.29%</span></p>
            <p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">$238.00</p>
          </div>
          <div className="w-10 h-10 rounded-hero-sm border border-blue-100 flex items-center justify-center bg-blue-50 text-blue-500">
            <Package size={20}/>
          </div>
        </div>
        
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="hero-metadata leading-tight text-hero-neutral">Total Delivered <span className="text-emerald-500 font-bold ml-1">+1.29%</span></p>
            <p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">35,874</p>
          </div>
          <div className="w-10 h-10 rounded-hero-sm border border-emerald-100 flex items-center justify-center bg-emerald-50 text-emerald-500">
            <Truck size={20}/>
          </div>
        </div>
        
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="hero-metadata leading-tight text-hero-neutral">Return Pending <span className="text-emerald-500 font-bold ml-1">+1.29%</span></p>
            <p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">64%</p>
          </div>
          <div className="w-10 h-10 rounded-hero-sm border border-amber-200 flex items-center justify-center bg-amber-50 text-amber-500">
            <AlertTriangle size={20}/>
          </div>
        </div>
        
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="hero-metadata leading-tight text-hero-neutral">Total Revenue <span className="text-emerald-500 font-bold ml-1">+4.5%</span></p>
            <p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">$1.2M</p>
          </div>
          <div className="w-10 h-10 rounded-hero-sm border border-indigo-100 flex items-center justify-center bg-indigo-50 text-indigo-500">
            <DollarSign size={20}/>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">
        
        {/* Left: Analytics (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Dual Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Shipment Volume */}
            <div className="card overflow-hidden flex flex-col min-h-[340px]">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                <div>
                  <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide">Shipment Volume</h3>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">FY {shipmentYear} Throughput</p>
                </div>
                <select 
                  value={shipmentYear} 
                  onChange={e => setShipmentYear(e.target.value)}
                  className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-bold outline-none cursor-pointer focus:ring-2 focus:ring-brand/20 focus:border-brand"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div className="flex-1 flex items-end gap-1.5 px-5 pt-8 pb-4">
                {shipmentData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-2 group/bar">
                    <div 
                      className="w-full bg-blue-50 hover:bg-brand transition-all relative cursor-pointer rounded-t-sm" 
                      style={{ height: `${(v/130)*100}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 shadow-lg z-20 whitespace-nowrap transition-opacity">
                        {v}k
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 text-center uppercase tracking-widest">{months[i]}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Avg Growth</p>
                  <p className="text-lg font-black text-hero-dark tracking-tight mt-0.5">+14.2% YoY</p>
                </div>
                <TrendingUp size={20} className="text-gray-400" />
              </div>
            </div>

            {/* Financial Yield */}
            <div className="card overflow-hidden flex flex-col min-h-[340px]">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                <div>
                  <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide">Market Yield</h3>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">FY {revenueYear} Revenue</p>
                </div>
                <select 
                  value={revenueYear} 
                  onChange={e => setRevenueYear(e.target.value)}
                  className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-bold outline-none cursor-pointer focus:ring-2 focus:ring-brand/20 focus:border-brand"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div className="flex-1 flex items-end gap-1.5 px-5 pt-8 pb-4">
                {revenueData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-2 group/bar">
                    <div 
                      className="w-full bg-emerald-50 hover:bg-emerald-500 transition-all relative cursor-pointer rounded-t-sm" 
                      style={{ height: `${(v/380)*100}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 shadow-lg z-20 whitespace-nowrap transition-opacity">
                        ${v}k
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 text-center uppercase tracking-widest">{months[i]}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Yield</p>
                  <p className="text-lg font-black text-emerald-600 tracking-tight mt-0.5">$2.84M USD</p>
                </div>
                <ArrowUpRight size={20} className="text-emerald-400" />
              </div>
            </div>

          </div>

          {/* Bottom mini-metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-hero-sm bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><Navigation size={18}/></div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Transit Time</p>
                <p className="text-lg font-black text-hero-dark leading-none mt-1">1.4 Days</p>
              </div>
            </div>
            <div className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-hero-sm bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0"><CheckCircle size={18}/></div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Resolution</p>
                <p className="text-lg font-black text-hero-dark leading-none mt-1">94.2%</p>
              </div>
            </div>
            <div className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-hero-sm bg-brand/10 flex items-center justify-center text-brand-hover shrink-0"><ShieldCheck size={18}/></div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fleet Status</p>
                <p className="text-lg font-black text-hero-dark leading-none mt-1">Optimal</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Black Control Terminal */}
          <div className="bg-[#111] rounded-xl shadow-xl overflow-hidden border border-gray-800">
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-brand flex items-center gap-2.5">
                <Zap size={14} /> Control Terminal
              </h3>
            </div>
            <div className="p-3">
              {[
                { label: 'Shipment Queue', path: '/admin/shipments', icon: Package },
                { label: 'Fleet Control', path: '/admin/vehicles', icon: Truck },
                { label: 'Staff Roster', path: '/admin/users', icon: Users },
                { label: 'Global Settings', path: '/admin/settings', icon: Globe },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between p-4 mb-2 last:mb-0 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer text-left border border-transparent hover:border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className="text-brand group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-600 group-hover:text-brand transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card flex-1 flex flex-col h-full min-h-[400px]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                Network Monitor
              </h3>
              <span className="badge badge-gray text-[9px] uppercase">Live</span>
            </div>
            <div className="p-5 flex-1 overflow-y-auto hidden-scrollbar">
              <div className="space-y-6">
                {recentActivities.map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${act.status === 'Success' ? 'bg-emerald-500' : act.status === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                      {i !== recentActivities.length - 1 && <div className="w-px h-full bg-gray-100 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-black text-white bg-[#111] px-2 py-0.5 rounded uppercase tracking-widest">{act.id}</span>
                        <span className="text-[10px] font-bold text-gray-400">{act.time}</span>
                      </div>
                      <p className="text-xs font-black text-hero-dark uppercase tracking-wide my-1">{act.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-500">
                          {act.user.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{act.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 text-center bg-[#FAFAFA]">
              <button onClick={() => navigate('/admin/audit')} className="text-[10px] font-black text-gray-400 hover:text-hero-dark uppercase tracking-widest transition-all">
                View Global Logs
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
