import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, 
  Building2, UserCog, Briefcase, AlertTriangle, Blocks,
  Plus, ChevronDown, Activity, Globe, ShieldAlert, Zap,
  Navigation, CheckCircle, Smartphone, ExternalLink, Filter
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
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Blocks size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Main Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of your branch performance and delivery activity.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/shipments')} 
            className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={18} strokeWidth={3} /> Shipments Queue
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── KPI HUD ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
        {[
          { label: 'Active Shipments', value: '428', trend: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Network Drivers', value: '142', trend: 'Live', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Operational Alerts', value: '03', trend: 'Critical', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Active Branches', value: '03', trend: 'Global', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{kpi.label}</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${kpi.bg} ${kpi.color}`}>{kpi.trend}</span>
              </div>
              <p className="text-3xl font-black text-gray-900 leading-none">{kpi.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
              <kpi.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        
        {/* Network Health Board (Pro Solution) */}
        <div className="lg:col-span-2 space-y-6">
           {/* Section Header */}
           <div className="flex justify-between items-center px-1">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                 <Activity size={16} className="text-[#FFCC00]"/> Branch Performance
              </h2>
              <button className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-1">
                 View All Branches <ExternalLink size={12}/>
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'SYDNEY CENTRAL', manager: 'Sarah Mitchell', performance: 94, status: 'Optimal', parcels: 156, alerts: 0, color: '#FFCC00' },
                { name: 'MELBOURNE HUB', manager: 'Jack Taylor', performance: 78, status: 'Attention', parcels: 92, alerts: 2, color: '#3B82F6' },
                { name: 'BRISBANE DEPOT', manager: 'Oliver Brown', performance: 91, status: 'Optimal', parcels: 114, alerts: 0, color: '#10B981' },
              ].map((br, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-[#FFCC00]/50 transition-all cursor-pointer group">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <h4 className="font-black text-gray-900 text-sm">{br.name}</h4>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manager: {br.manager}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${br.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600 animate-pulse'}`}>
                         {br.status}
                      </span>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery Success</span>
                         <span className="text-xs font-black text-gray-900">{br.performance}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                         <div className="h-full transition-all duration-1000" style={{ width: `${br.performance}%`, backgroundColor: br.performance > 80 ? '#10B981' : '#EF4444' }}></div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                         <div className="flex items-center gap-4">
                            <div>
                               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">In Transit</p>
                               <p className="text-xs font-black text-gray-900 mt-1">{br.parcels}</p>
                            </div>
                            <div className="w-px h-6 bg-gray-100"></div>
                            <div>
                               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Excp.</p>
                               <p className={`text-xs font-black mt-1 ${br.alerts > 0 ? 'text-red-500' : 'text-gray-900'}`}>{br.alerts}</p>
                            </div>
                         </div>
                         <button className="text-[9px] font-black text-white bg-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest">View Details</button>
                      </div>
                   </div>
                </div>
              ))}
              {/* Add Branch Placeholder */}
              <button className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-5 text-gray-400 hover:border-[#FFCC00] hover:text-[#FFCC00] transition-all group">
                 <Plus size={24} className="mb-2 group-hover:scale-125 transition-transform"/>
                  <span className="text-[10px] font-black uppercase tracking-widest">Add New Branch</span>
              </button>
           </div>

           {/* Revenue Pulse */}
           <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6"><TrendingUp size={48} className="text-gray-50 opacity-50"/></div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Income Overview</h3>
              <div className="flex items-end gap-1 h-32 w-full mb-4">
                 {[40, 65, 45, 80, 55, 90, 70, 100, 85, 120, 95, 140, 110, 150, 130, 180, 155, 200, 175, 220].map((h, i) => (
                   <div key={i} className="flex-1 bg-emerald-50 rounded-t-sm relative group cursor-pointer hover:bg-[#FFCC00] transition-colors" style={{ height: `${(h/220)*100}%` }}>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all">
                        ${h}k
                      </div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="flex items-center gap-6">
                   <div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Income</p>
                      <p className="text-lg font-black text-emerald-600 leading-none">$2.42M</p>
                   </div>
                   <div className="w-px h-8 bg-gray-100"></div>
                   <div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Growth</p>
                      <p className="text-lg font-black text-blue-600 leading-none">+18.4%</p>
                   </div>
                </div>
                 <button className="text-[10px] font-black text-gray-500 hover:text-black uppercase tracking-widest border border-gray-200 px-4 py-2 rounded-xl transition-all">View All Reports</button>
              </div>
           </div>
        </div>

        {/* Operational Status & Shortcuts (Pro Sidebar) */}
        <div className="space-y-6">
           
           {/* Shortcuts Card */}
           <div className="bg-[#111] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#FFCC00]/20 transition-all"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-[#FFCC00] flex items-center gap-2">
                  <Zap size={14} fill="#FFCC00"/> Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-3 relative z-10">
                 {[
                    { label: 'View Shipments', path: '/admin/shipments', icon: Plus },
                   { label: 'View Fleet', path: '/admin/fleet', icon: Truck },
                   { label: 'Manage Staff', path: '/admin/users', icon: UserCog },
                   { label: 'Global Settings', path: '/admin/settings', icon: Globe },
                 ].map((btn, i) => (
                   <button 
                     key={i}
                     onClick={() => navigate(btn.path)}
                     className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FFCC00] hover:text-black transition-all group/btn"
                   >
                     <div className="flex items-center gap-3">
                        <btn.icon size={16} className="text-[#FFCC00] group-hover/btn:text-black"/>
                        <span className="text-[11px] font-black uppercase tracking-widest">{btn.label}</span>
                     </div>
                     <ChevronDown size={14} className="-rotate-90 opacity-40 group-hover/btn:opacity-100"/>
                   </button>
                 ))}
              </div>
           </div>

           {/* Live Operational Feed */}
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
                 <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Smartphone size={14} className="text-blue-500"/> Real-time Activity
                 </h3>
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="p-2 max-h-[480px] overflow-y-auto">
                 {recentActivities.map((act, i) => (
                   <div key={i} className="p-4 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] font-black text-[#FFCC00] bg-black px-2 py-0.5 rounded uppercase tracking-widest">{act.id}</span>
                         <span className="text-[9px] font-bold text-gray-400 uppercase">{act.time}</span>
                      </div>
                      <p className="text-[11px] font-bold text-gray-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors">{act.action}</p>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center font-black text-[8px] text-gray-600">
                            {act.user.split(' ').map(n=>n[0]).join('')}
                         </div>
                         <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{act.user}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-4 border-t border-gray-50 text-center">
                 <button className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Launch System Audit Log →</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
