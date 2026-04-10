import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, 
  Building2, UserCog, Briefcase, AlertTriangle, Blocks,
  Plus, ChevronDown, Activity, Globe, ShieldAlert, Zap,
  Navigation, CheckCircle, Smartphone, ExternalLink, Filter,
  Clock, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [shipmentYear, setShipmentYear] = useState('2026');
  const [revenueYear, setRevenueYear] = useState('2026');

  const recentActivities = [
    { id: 'SHP-9042', action: 'Delivery Completed', user: 'Jack Taylor', time: '12 mins ago', status: 'Success' },
    { id: 'SHP-9041', action: 'Route Optimized', user: 'Sarah Mitchell', time: '1 hr ago', status: 'System' },
    { id: 'SHP-9039', action: 'Override Executed', user: 'Liam Smith', time: '2 hrs ago', status: 'Warning' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-hero-sm text-hero-dark shadow-sm">
            <Blocks size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Main Dashboard</h1>
            <p className="hero-body mt-1">Overview of your branch performance and delivery activity.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/shipments')} 
            className="btn btn-primary"
          >
            <Plus size={16} strokeWidth={3} /> Shipments Queue
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 mb-6"></div>

      {/* ── KPI HUD ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        {[
          { label: 'Active Shipments', value: '428', trend: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Network Drivers', value: '142', trend: 'Live', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Operational Alerts', value: '03', trend: 'Critical', icon: ShieldAlert, color: 'text-hero-danger', bg: 'bg-hero-danger/10' },
          { label: 'Active Branches', value: '03', trend: 'Global', icon: Globe, color: 'text-hero-success', bg: 'bg-hero-success/10' },
        ].map((kpi, i) => (
          <div key={i} className="card p-5 flex items-center justify-between group hover:border-brand/40">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="hero-metadata leading-none text-hero-neutral">{kpi.label}</p>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-hero-sm uppercase tracking-widest ${kpi.bg} ${kpi.color}`}>{kpi.trend}</span>
              </div>
              <p className="text-3xl font-black text-hero-dark leading-none">{kpi.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-hero-sm flex items-center justify-center ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
              <kpi.icon size={22} />
            </div>
          </div>
        ))}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
        
        {/* Left Column: Analytics (8 Units Wide) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 12-Month Growth Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Shipment Analysis Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px] group hover:border-brand/40 transition-all">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <h3 className="text-xs font-black text-hero-dark uppercase tracking-widest">Shipment Throughput</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Network Capacity Monitor</p>
                </div>
                <select 
                  value={shipmentYear} 
                  onChange={(e) => setShipmentYear(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer shadow-sm"
                >
                  <option value="2026">FY 2026</option>
                  <option value="2025">FY 2025</option>
                </select>
              </div>

              <div className="flex-1 p-8 flex items-end gap-2.5">
                {[24, 38, 32, 45, 58, 52, 65, 78, 85, 82, 98, 115].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar h-full justify-end">
                     <div className="w-full bg-gray-100 rounded-lg group-hover/bar:bg-brand transition-all relative cursor-pointer" style={{ height: `${(v/120)*100}%` }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black text-white text-[10px] font-black px-2 py-1 rounded-hero-sm opacity-0 group-hover/bar:opacity-100 whitespace-nowrap z-30 shadow-xl pointer-events-none transition-all">
                           {v}k Units
                        </div>
                     </div>
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                       {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                     </span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Annual Volume</p>
                  <p className="text-xl font-black text-hero-dark mt-1">728.4k <span className="text-xs text-hero-success ml-2">↑ 14.2%</span></p>
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-all">
                  <ExternalLink size={14}/>
                </button>
              </div>
            </div>

            {/* Financial Revenue Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px] group hover:border-hero-success/40 transition-all">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <h3 className="text-xs font-black text-hero-dark uppercase tracking-widest">Revenue Growth</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Earnings Pulse Radar</p>
                </div>
                <select 
                  value={revenueYear} 
                  onChange={(e) => setRevenueYear(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer shadow-sm"
                >
                  <option value="2026">FY 2026</option>
                  <option value="2025">FY 2025</option>
                </select>
              </div>

              <div className="flex-1 p-8 flex items-end gap-2.5">
                {[140, 165, 155, 180, 210, 195, 230, 250, 280, 265, 305, 342].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar h-full justify-end">
                     <div className="w-full bg-gray-50 rounded-lg group-hover/bar:bg-hero-success transition-all relative cursor-pointer" style={{ height: `${(v/380)*100}%` }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black text-white text-[10px] font-black px-2 py-1 rounded-hero-sm opacity-0 group-hover/bar:opacity-100 whitespace-nowrap z-30 shadow-xl pointer-events-none transition-all">
                           ${v}k
                        </div>
                     </div>
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                       {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                     </span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Earnings</p>
                  <p className="text-xl font-black text-hero-dark mt-1">$2.84M <span className="text-xs text-hero-success ml-2">↑ 18.1%</span></p>
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-hero-success hover:border-hero-success transition-all">
                  <TrendingUp size={14}/>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Stats Grid Under Charts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { label: 'Avg Transit', val: '1.4 Days', icon: Navigation, color: 'text-blue-500', bg: 'bg-blue-50' },
               { label: 'Issue Resolved', val: '94.2%', icon: CheckCircle, color: 'text-hero-success', bg: 'bg-hero-success/10' },
               { label: 'Fleet Health', val: 'Optimal', icon: Truck, color: 'text-brand', bg: 'bg-brand/10' },
               { label: 'Active Users',  val: '2,840', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
             ].map((stat, i) => (
               <div key={i} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group">
                  <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                     <stat.icon size={18}/>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-black text-hero-dark mt-1">{stat.val}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Shortcuts & Feed (4 Units Wide) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Shortcuts Board */}
          <div className="bg-hero-dark rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-brand/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-brand/20 transition-all"></div>
             <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-brand flex items-center gap-3">
                <Zap size={16} fill="#FFCC00"/> Control Hub
             </h3>
             <div className="grid grid-cols-1 gap-4 relative z-10">
                {[
                  { label: 'Shipment Queue', path: '/admin/shipments', icon: Package },
                  { label: 'Fleet Control', path: '/admin/fleet', icon: Truck },
                  { label: 'Staff Roster', path: '/admin/users', icon: UserCog },
                  { label: 'System Settings', path: '/admin/settings', icon: Globe },
                ].map((btn, i) => (
                  <button 
                    key={i}
                    onClick={() => navigate(btn.path)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-brand hover:text-hero-dark transition-all group/btn"
                  >
                    <div className="flex items-center gap-4">
                       <btn.icon size={18} className="text-brand group-hover/btn:text-hero-dark"/>
                       <span className="text-xs font-black uppercase tracking-widest">{btn.label}</span>
                    </div>
                    <ArrowUpRight size={16} className="opacity-40 group-hover/btn:opacity-100 transition-all"/>
                  </button>
                ))}
             </div>
          </div>

          {/* Live Feed Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[420px]">
             <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xs font-black text-hero-dark uppercase tracking-widest flex items-center gap-3">
                   <Activity size={16} className="text-blue-500 animate-pulse"/> Tracking Portal
                </h3>
                <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase">Live Feed</span>
             </div>
             <div className="flex-1 p-3 overflow-y-auto space-y-1">
                {recentActivities.map((act, i) => (
                  <div key={i} className="p-5 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black text-brand bg-hero-dark px-2.5 py-1 rounded-hero-sm uppercase tracking-widest shadow-sm">{act.id}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{act.time}</span>
                     </div>
                     <p className="text-xs font-black text-hero-dark leading-snug mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{act.action}</p>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500 border border-gray-200">
                           {act.user.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{act.user}</span>
                     </div>
                  </div>
                ))}
             </div>
             <div className="p-6 border-t border-gray-50 text-center">
                <button onClick={()=>navigate('/admin/audit')} className="text-[10px] font-black text-gray-400 hover:text-hero-dark uppercase tracking-widest transition-all">Deep Audit Log View →</button>
             </div>
          </div>

        </div>

      </div>>
      </div>
    </div>
  );
}
