import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, 
  Building2, UserCog, Briefcase, AlertTriangle, Blocks
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [shipmentYear, setShipmentYear] = useState('2026');
  const [revenueYear, setRevenueYear] = useState('2026');

  const recentActivities = [
    { id: 'SHP-9042', action: 'Delivery Completed', user: 'Jack Taylor (Driver)', time: '12 mins ago', amount: '+$450.00' },
    { id: 'SHP-9041', action: 'Route Optimized', user: 'Sarah Mitchell (Dispatch)', time: '1 hr ago', amount: null },
    { id: 'SHP-9039', action: 'Override Requested', user: 'Liam Smith (Driver)', time: '2 hrs ago', amount: null },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Super Admin Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Company-wide overview of operations, network topology, and financial growth.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm px-4 py-2 text-sm font-semibold rounded-xl transition">
            Export BI Report
          </button>
          <button onClick={() => navigate('/dispatch/jobs/create')} className="btn btn-primary shadow-sm px-4 py-2 text-sm font-bold rounded-xl transition">
            New Shipment
          </button>
        </div>
      </div>

      {/* ── 1. The Pulse (Network, Operations, Accounts) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network */}
        <div className="card bg-white p-6 shadow-sm border border-gray-100 hover:border-yellow-200 transition-colors flex flex-col gap-5">
           <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase flex items-center gap-2 border-b border-gray-50 pb-3">
             <Blocks size={14}/> Logistics Network
           </h3>
           <div className="flex flex-col gap-4 flex-1">
             <div className="flex justify-between items-center hover:bg-gray-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/branches')}>
               <div className="flex items-center gap-3"><Building2 size={18} className="text-gray-400"/><span className="font-bold text-sm text-gray-700">Regional Branches</span></div>
               <span className="font-black text-xl text-gray-900">3</span>
             </div>
             <div className="flex justify-between items-center hover:bg-gray-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/fleet')}>
               <div className="flex items-center gap-3"><Truck size={18} className="text-gray-400"/><span className="font-bold text-sm text-gray-700">Total Fleet Assets</span></div>
               <span className="font-black text-xl text-gray-900">124</span>
             </div>
             <div className="flex justify-between items-center hover:bg-gray-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/drivers')}>
               <div className="flex items-center gap-3"><Users size={18} className="text-gray-400"/><span className="font-bold text-sm text-gray-700">Total Drivers</span></div>
               <span className="font-black text-xl text-gray-900">142</span>
             </div>
           </div>
        </div>

        {/* Operations */}
        <div className="card bg-white p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors flex flex-col gap-5">
           <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase flex items-center gap-2 border-b border-gray-50 pb-3">
             <Package size={14}/> Live Operations
           </h3>
           <div className="flex flex-col gap-4 flex-1">
             <div className="flex justify-between items-center hover:bg-blue-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/shipments')}>
               <div className="flex items-center gap-3"><Package size={18} className="text-blue-500"/><span className="font-bold text-sm text-gray-700">Active Shipments</span></div>
               <span className="font-black text-xl text-blue-600">42</span>
             </div>
             <div className="flex justify-between items-center hover:bg-violet-50 p-1 -mx-1 rounded cursor-pointer transition">
               <div className="flex items-center gap-3"><Truck size={18} className="text-violet-500"/><span className="font-bold text-sm text-gray-700">On-Road Fleet</span></div>
               <span className="font-black text-xl text-violet-600">18</span>
             </div>
             <div className="flex justify-between items-center hover:bg-red-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/exceptions')}>
               <div className="flex items-center gap-3"><AlertTriangle size={18} className="text-red-500"/><span className="font-bold text-sm text-gray-700">Exceptions (Needs Override)</span></div>
               <span className="font-black text-xl text-red-500 animate-pulse">3</span>
             </div>
           </div>
        </div>

        {/* Accounts */}
        <div className="card bg-white p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors flex flex-col gap-5">
           <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase flex items-center gap-2 border-b border-gray-50 pb-3">
             <Briefcase size={14}/> Accounts & Users
           </h3>
           <div className="flex flex-col gap-4 flex-1">
             <div className="flex justify-between items-center hover:bg-gray-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/customers')}>
               <div className="flex items-center gap-3"><Briefcase size={18} className="text-gray-400"/><span className="font-bold text-sm text-gray-700">B2B Customers</span></div>
               <span className="font-black text-xl text-gray-900">28</span>
             </div>
             <div className="flex justify-between items-center hover:bg-gray-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/users')}>
               <div className="flex items-center gap-3"><UserCog size={18} className="text-gray-400"/><span className="font-bold text-sm text-gray-700">Internal Dispatchers</span></div>
               <span className="font-black text-xl text-gray-900">14</span>
             </div>
             <div className="flex justify-between items-center hover:bg-gray-50 p-1 -mx-1 rounded cursor-pointer transition" onClick={() => navigate('/admin/users')}>
               <div className="flex items-center gap-3"><Users size={18} className="text-gray-400"/><span className="font-bold text-sm text-gray-700">Super Admins</span></div>
               <span className="font-black text-xl text-gray-900">3</span>
             </div>
           </div>
        </div>

      </div>

      {/* ── 2. Growth & Volume Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Growth Chart */}
        <div className="card bg-white shadow-sm p-6 border border-gray-100">
           <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18}/> Yearly Revenue Growth</h3>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Year To Date (YTD)</p>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={revenueYear} 
                  onChange={e => setRevenueYear(e.target.value)}
                  className="input py-1.5 px-3 text-xs font-bold cursor-pointer bg-gray-50 hover:bg-gray-100 border-transparent shadow-sm"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-600">
                    {revenueYear === '2026' ? '$2.4M' : revenueYear === '2025' ? '$1.8M' : '$1.5M'}
                  </p>
                  <p className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest inline-flex items-center gap-1 mt-1">
                    <ArrowUpRight size={10}/> {revenueYear === '2026' ? '18%' : revenueYear === '2025' ? '12%' : '8%'} vs Last Year
                  </p>
                </div>
              </div>
           </div>
           
           <div className="h-64 flex items-end justify-between mt-4 relative px-2">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gray-100 z-0"></div>
              <div className="absolute inset-x-0 bottom-1/4 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
              <div className="absolute inset-x-0 bottom-2/4 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
              <div className="absolute inset-x-0 bottom-3/4 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
              
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => {
                 const baseVal = revenueYear === '2026' ? 20 : revenueYear === '2025' ? 15 : 10;
                 const h = baseVal + (i * 5) + (Math.random() * 10);
                 const rev = Math.floor(h * 3.2);
                 return (
                   <div key={m} className="flex flex-col items-center justify-end h-full z-10 group relative w-full px-1">
                     <div className="w-full bg-emerald-100 group-hover:bg-emerald-500 rounded-t-sm transition-all relative cursor-pointer" style={{ height: `${h}%` }}>
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-white bg-gray-900 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                         ${rev}K
                       </div>
                     </div>
                     <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase">{m}</span>
                   </div>
                 )
              })}
           </div>
        </div>

        {/* Structured Shipments Chart */}
        <div className="card bg-white shadow-sm p-6 border border-gray-100">
           <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Package size={18}/> Structured Shipments</h3>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Volume Over 12 Months</p>
              </div>
              <select 
                value={shipmentYear} 
                onChange={e => setShipmentYear(e.target.value)}
                className="input py-1.5 px-3 text-xs font-bold cursor-pointer bg-gray-50 hover:bg-gray-100 border-transparent shadow-sm"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
           </div>
           
           <div className="h-64 flex items-end justify-between mt-4 relative px-2">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gray-100 z-0"></div>
              <div className="absolute inset-x-0 bottom-1/3 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
              <div className="absolute inset-x-0 bottom-2/3 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
              
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m) => {
                 const base = shipmentYear === '2026' ? 40 : shipmentYear === '2025' ? 30 : 20;
                 const h = base + Math.random() * 40;
                 const vol = Math.floor(h * 15);
                 return (
                   <div key={m} className="flex flex-col items-center justify-end h-full z-10 group relative w-full px-1">
                     <div className="w-full bg-[#111] group-hover:bg-[#FACC15] rounded-t-sm transition-all relative cursor-pointer" style={{ height: `${Math.min(h, 100)}%` }}>
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-gray-900 bg-[#FACC15] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                         {vol}
                       </div>
                     </div>
                     <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase">{m}</span>
                   </div>
                 )
              })}
           </div>
        </div>
      </div>

      {/* ── 3. Operational Feed & Hotspots ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
          <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="font-bold text-gray-900 text-sm">Recent Platform Activity</h3>
            <button onClick={() => navigate('/admin/audit')} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-gray-900">View Audit Logs →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 text-[9px] uppercase font-black tracking-widest border-b border-gray-50">
                <tr>
                  <th className="px-6 py-3">Reference</th>
                  <th className="px-6 py-3">Action Recorded</th>
                  <th className="px-6 py-3">Actor / User</th>
                  <th className="px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        <span className="font-black text-gray-900 text-xs tracking-tight">{act.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <p className="text-xs font-bold text-gray-800">{act.action}</p>
                      {act.amount && <p className="text-[10px] text-emerald-600 font-bold">{act.amount}</p>}
                    </td>
                    <td className="px-6 py-3">
                      <p className="text-xs text-gray-600 font-medium">{act.user}</p>
                    </td>
                    <td className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {act.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-yellow-500" /> Regional Output Status
          </h3>
          <div className="space-y-3">
            {[
              { loc: 'Sydney Metro', load: 'High Cap', color: 'text-red-500', bg: 'bg-red-50' },
              { loc: 'Melbourne SE', load: 'Optimum', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { loc: 'Brisbane Port', load: 'Optimum', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { loc: 'Adelaide Hub', load: 'Warning', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((loc, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                <span className="text-xs font-bold text-gray-700">{loc.loc}</span>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${loc.bg} ${loc.color}`}>{loc.load}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
