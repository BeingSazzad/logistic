import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, 
  Building2, UserCog, Briefcase, AlertTriangle, Blocks,
  Plus, ChevronDown
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Super Admin Hub</h1>
            <p className="text-sm text-gray-500 mt-1">Company-wide overview of operations, network topology, and financial growth.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/dispatch/jobs/create')} 
            className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={18} strokeWidth={3} /> New Shipment
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI HUD - Unified Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
        {[
          { label: 'Active Shipments', value: '42', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'Total Drivers', value: '142', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
          { label: 'Network Nodes', value: '3', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none">{kpi.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-2 leading-none">{kpi.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${kpi.bg} ${kpi.color} ${kpi.border}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Growth Charts - Clean Card Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Yearly Revenue Growth</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                   <TrendingUp size={12} className="text-emerald-500"/> Target: $2.5M YTD
                </p>
              </div>
              <button 
                onClick={() => setRevenueYear(revenueYear === '2026' ? '2025' : '2026')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-lg text-xs font-bold text-gray-700 shadow-sm"
              >
                 {revenueYear} <ChevronDown size={14} className="text-gray-400"/>
              </button>
           </div>
           
           <div className="w-full h-64 flex items-end gap-2 group border-b border-gray-100 pb-2">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => {
                const data2026 = [40, 55, 48, 65, 75, 90, 85, 110, 130, 145, 160, 180];
                const data2025 = [20, 25, 30, 45, 40, 55, 60, 65, 80, 85, 95, 120];
                const val = revenueYear === '2026' ? data2026[i] : data2025[i];
                const heightPercent = (val / 200) * 100; // max ~200
                
                return (
                  <div key={m} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                     <div 
                        title={`$${val}K`}
                        className="w-full bg-emerald-50 rounded-t-lg relative group/bar cursor-pointer overflow-hidden border border-emerald-100" 
                        style={{ height: `${heightPercent}%` }}
                     >
                        <div className="absolute inset-x-0 bottom-0 bg-emerald-500 transition-all duration-500 h-full opacity-40 group-hover/bar:opacity-100"></div>
                     </div>
                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{m}</span>
                  </div>
                )
              })}
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Shipment Volume</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                   <Package size={12} className="text-[#FFCC00]"/> Total Shipments Processed
                </p>
              </div>
              <button 
                onClick={() => setShipmentYear(shipmentYear === '2026' ? '2025' : '2026')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-lg text-xs font-bold text-gray-700 shadow-sm"
              >
                 {shipmentYear} <ChevronDown size={14} className="text-gray-400"/>
              </button>
           </div>
           
           <div className="w-full h-64 flex items-end gap-2 border-b border-gray-100 pb-2">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => {
                const data2026 = [420, 480, 510, 590, 620, 680, 810, 790, 890, 950, 1050, 1200];
                const data2025 = [210, 240, 260, 310, 330, 390, 420, 450, 500, 520, 600, 680];
                const val = shipmentYear === '2026' ? data2026[i] : data2025[i];
                const heightPercent = (val / 1200) * 100; // max ~1200
                
                return (
                  <div key={m} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                     <div 
                        title={`${val} Shipments`}
                        className="w-full bg-[#FFCC00]/20 rounded-t-lg relative group/bar cursor-pointer overflow-hidden border border-[#FFCC00]/30" 
                        style={{ height: `${heightPercent}%` }}
                     >
                        <div className="absolute inset-x-0 bottom-0 bg-[#FFCC00] transition-all duration-500 h-full opacity-60 group-hover/bar:opacity-100"></div>
                     </div>
                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{m}</span>
                  </div>
                )
              })}
           </div>
        </div>
      </div>

      {/* Activity Table - Unified Management Look */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mx-2">
        <div className="px-6 py-4 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
            <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">Global Platform Activity</h3>
            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest rounded transition-colors px-2 py-1 hover:bg-blue-50 border border-transparent">Full Audit Log →</button>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Reference</th>
                 <th className="px-6 py-4">Event Description</th>
                 <th className="px-6 py-4">Operator</th>
                 <th className="px-6 py-4 text-right">Timestamp</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {recentActivities.map(act => (
                 <tr className="hover:bg-gray-50 transition-all" key={act.id}>
                   <td className="px-6 py-4">
                      <div className="font-bold text-[#111] text-sm">{act.id}</div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                         {act.status === 'Success' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                         {act.status === 'System' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                         {act.status === 'Warning' && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                         {act.action}
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                        <div className="w-8 h-8 rounded border-2 border-transparent bg-[#111] flex items-center justify-center font-black text-[10px] text-[#FFCC00] shrink-0">
                           {act.user.split(' ').map(n=>n[0]).join('')}
                        </div>
                        {act.user}
                      </div>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{act.time}</span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
