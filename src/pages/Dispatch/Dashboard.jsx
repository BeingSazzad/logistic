import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, Plus, Package, Truck, DollarSign, AlertCircle,
  Clock, TrendingUp, MapPin, Search, MoreVertical, 
  ArrowUpRight, Navigation, Zap, ShieldAlert, CheckCircle2
} from 'lucide-react';

const jobs = [
  { id: 'SHP-20481', customer: 'Acme Corp',          route: 'Sydney → Melbourne',  driver: 'Jack Taylor',  vehicle: 'TRK-102', status: 'In Transit', progress: 65, eta: '2:45 PM' },
  { id: 'SHP-20482', customer: 'Tech Solutions Ltd',  route: 'Brisbane → Sydney',      driver: 'Liam Smith',  vehicle: 'VAN-08',   status: 'At Pickup',  progress: 15, eta: '4:30 PM' },
  { id: 'SHP-20483', customer: 'Global Traders',      route: 'Perth → Adelaide',   driver: 'Noah Williams',   vehicle: 'TRK-05',   status: 'Delayed',   progress: 80, eta: '5:00 PM' },
  { id: 'SHP-20484', customer: 'Express Goods',       route: 'Sydney → Newcastle',  driver: 'Unassigned',   vehicle: '-',        status: 'Pending',   progress: 0, eta: '-' },
];

function StatusBadge({ status }) {
  const map = {
    'In Transit': 'bg-blue-50 text-blue-600 border-blue-100',
    'At Pickup':  'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Delayed':    'bg-red-50 text-red-600 border-red-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    'Pending':    'bg-gray-50 text-gray-500 border-gray-100',
  };
  return <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${map[status] ?? 'bg-gray-50'}`}>{status}</span>;
}

export default function DispatchDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── 1. Dispatcher Action Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Navigation className="text-yellow-500 fill-yellow-500" size={24}/> Operation Control
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Live Fleet Activity • Shift: <span className="text-gray-900">06:00 - 18:00</span></p>
        </div>
        <div className="flex gap-2">
           <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm font-bold flex items-center gap-2">
              <Zap size={14}/> Auto-Assign
           </button>
           <button onClick={() => navigate('/dispatch/jobs/create')} className="btn btn-primary shadow-lg font-bold flex items-center gap-2 px-6">
              <Plus size={16}/> Create Shipment
           </button>
        </div>
      </div>

      {/* ── 2. Live Intelligence Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Shipments', val: '42', sub: '12 Need Attention', color: 'blue', icon: Package, alert: true },
          { label: 'Drivers On Duty', val: '18 / 24', sub: '75% Utilization', color: 'emerald', icon: Truck, alert: false },
          { label: 'Avg ETA Variance', val: '+4m', sub: 'Above target (2m)', color: 'amber', icon: Clock, alert: false },
          { label: 'POD Completed', val: '92%', sub: 'Target: 98%', color: 'violet', icon: CheckCircle2, alert: false },
        ].map((k, i) => (
          <div key={i} className="card bg-white p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-yellow-400 transition-all">
             <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{k.label}</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">{k.val}</h3>
                </div>
                <p className={`text-[10px] font-bold mt-4 ${k.alert ? 'text-red-500' : 'text-gray-500 italic'}`}>{k.sub}</p>
             </div>
             <k.icon size={40} className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-${k.color}-500`}/>
          </div>
        ))}
      </div>

      {/* ── 3. The "War Room" View ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live List (High Density) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
           <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                 <h3 className="font-black text-gray-900 text-xs tracking-[0.15em] uppercase flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Monitoring Grid
                 </h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Filter by Driver, ID or Area..." 
                      className="input py-1.5 pl-9 text-xs w-64 bg-white border-gray-200" 
                    />
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-white border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <tr>
                          <th className="px-6 py-3">Shipment</th>
                          <th className="px-6 py-3">Logistics Flow</th>
                          <th className="px-6 py-3">Resource</th>
                          <th className="px-6 py-3 text-right">Progress</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {jobs.map(job => (
                          <tr key={job.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                             <td className="px-6 py-4">
                                <div className="font-black text-gray-900 text-sm">{job.id}</div>
                                <div className="text-[10px] font-bold text-gray-400 mt-0.5">{job.customer}</div>
                             </td>
                             <td className="px-6 py-4">
                                <p className="text-xs font-bold text-gray-700">{job.route}</p>
                                <div className="mt-1.5 flex items-center gap-2">
                                   <StatusBadge status={job.status} />
                                   <span className="text-[10px] font-bold text-gray-400 uppercase">ETA: {job.eta}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                   <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center text-[10px] font-black text-[#FACC15]">
                                      {job.driver[0]}
                                   </div>
                                   <div>
                                      <div className="text-xs font-bold text-gray-900">{job.driver}</div>
                                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{job.vehicle}</div>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex flex-col items-end gap-1.5">
                                   <span className="text-[10px] font-black text-gray-700">{job.progress}%</span>
                                   <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div className={`h-full ${job.status === 'Delayed' ? 'bg-red-500' : 'bg-[#FACC15]'}`} style={{ width: `${job.progress}%` }}></div>
                                   </div>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Dispatch Alerts & Quick Board */}
        <div className="flex flex-col gap-6">
           
           {/* Map Preview Placeholder (The "War Room" feel) */}
           <div className="bg-[#1a1c1e] rounded-2xl p-6 h-64 shadow-xl border border-white/5 relative overflow-hidden group cursor-pointer" onClick={() => navigate('/dispatch/tracking')}>
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                 {/* Mock map lines */}
                 <div className="absolute top-1/2 left-0 w-full h-px bg-yellow-400/20 rotate-12"></div>
                 <div className="absolute top-0 left-1/2 w-px h-full bg-yellow-400/20 -rotate-45"></div>
                 <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#FACC15]"></div>
                 <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3B82F6]"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="flex justify-between items-start">
                    <h4 className="text-xs font-black uppercase text-white tracking-[0.2em] flex items-center gap-2">
                       <MapPin size={12} className="text-yellow-400"/> Network View
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">Live</span>
                 </div>
                 <div className="text-center">
                    <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all backdrop-blur-sm border border-white/10">Open Interactive HUD</button>
                 </div>
              </div>
           </div>

           {/* Urgent Alerts */}
           <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 flex flex-col gap-4">
              <h4 className="text-[11px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                 <ShieldAlert size={14}/> Urgent Exception Board
              </h4>
              <div className="space-y-4">
                 {[
                   { msg: 'SHP-20483 geofence breach in Perth SE.', time: '4m ago', level: 'Critical' },
                   { msg: 'Unassigned load SHP-20484 near timeout.', time: '12m ago', level: 'Warning' }
                 ].map((a, i) => (
                   <div key={i} className="flex gap-3 items-start p-3 bg-red-50/50 rounded-xl border border-red-50">
                      <div className={`mt-1 w-1.5 h-1.5 shrink-0 rounded-full ${a.level === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                      <div>
                         <p className="text-[11px] font-bold text-gray-800 leading-tight">{a.msg}</p>
                         <p className="text-[9px] font-black text-gray-400 mt-1 uppercase">{a.time} • {a.level}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}
