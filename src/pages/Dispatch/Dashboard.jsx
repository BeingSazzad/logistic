import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, Plus, Package, Truck, DollarSign, AlertCircle,
  Clock, TrendingUp, MapPin, Search, MoreVertical, 
  ArrowUpRight, Navigation, Zap, ShieldAlert, CheckCircle2, ChevronDown
} from 'lucide-react';

const jobs = [
  { id: 'SHP-20481', customer: 'Acme Corp',          route: 'Sydney Branch → Melbourne Branch',  driver: 'Jack Taylor',  vehicle: 'TRK-102', status: 'In Transit', progress: 65, eta: '2:45 PM' },
  { id: 'SHP-20482', customer: 'Tech Solutions Ltd',  route: 'Brisbane Branch → Sydney Branch',      driver: 'Liam Smith',  vehicle: 'VAN-08',   status: 'Arrived at Branch',  progress: 85, eta: '4:30 PM' },
  { id: 'SHP-20483', customer: 'Global Traders',      route: 'Perth Branch → Adelaide Branch',   driver: 'Noah Williams',   vehicle: 'TRK-05',   status: 'Received at Branch',   progress: 100, eta: 'Done' },
  { id: 'SHP-20484', customer: 'Express Goods',       route: 'Sydney Branch → Newcastle Branch',  driver: 'Unassigned',   vehicle: '-',        status: 'Unassigned',   progress: 0, eta: '-' },
];

function StatusBadge({ status }) {
  const map = {
    'In Transit': 'badge-blue',
    'Arrived at Branch': 'badge-blue',
    'Received at Branch': 'badge-green',
    'Delayed':    'badge-red',
    'Unassigned': 'badge-gray',
  };
  return <span className={`badge ${map[status] ?? 'badge-gray'}`}>{status}</span>;
}

export default function DispatchDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [autoAssigning, setAutoAssigning] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── Standardized Header ── */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-hero-sm text-hero-dark shadow-sm">
            <Navigation size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Fleet Operations</h1>
            <p className="hero-body mt-1 flex items-center gap-2">Live Fleet Activity • Shift: <span className="font-bold text-hero-dark">06:00 - 18:00</span></p>
          </div>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => {
               setAutoAssigning(true);
               setTimeout(() => setAutoAssigning(false), 2000);
             }}
             className="btn btn-outline"
           >
              <Zap size={14}/> Auto-Assign
           </button>
           <button 
             onClick={() => navigate('/dispatch/jobs/create')} 
             className="btn btn-primary"
           >
             <Plus size={16} strokeWidth={3} /> Create Shipment
          </button>
        </div>
      </div>

      {autoAssigning && (
        <div className="fixed top-24 right-8 bg-[#111] text-[#FFCC00] px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-right border border-white/10">
           <Zap size={20} className="animate-pulse" />
           <div>
              <p className="text-sm font-black uppercase tracking-widest">Optimizing Routes</p>
              <p className="text-xs font-bold text-gray-400">AI is assigning drivers based on proximity.</p>
           </div>
        </div>
      )}

      <div className="w-full h-px bg-gray-100 mb-6"></div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mb-6">
        <div className="card p-5 flex items-center justify-between">
          <div><p className="hero-metadata leading-tight text-hero-neutral">Active Shipments</p><p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">42</p></div>
          <div className="w-10 h-10 rounded-hero-sm border border-blue-100 flex items-center justify-center bg-blue-50 text-blue-500"><Package size={20}/></div>
        </div>
        <div className="card p-5 flex items-center justify-between">
          <div><p className="hero-metadata leading-tight text-hero-neutral">Drivers On Duty</p><p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">18 <span className="text-sm text-hero-neutral tracking-tighter">/24</span></p></div>
          <div className="w-10 h-10 rounded-hero-sm border border-hero-success/20 flex items-center justify-center bg-hero-success/10 text-hero-success"><Truck size={20}/></div>
        </div>
        <div className="card p-5 flex items-center justify-between">
          <div><p className="hero-metadata leading-tight text-hero-neutral">Average Delay</p><p className="text-2xl font-black text-hero-warning mt-1.5 leading-none">+4<span className="text-sm font-bold text-hero-neutral tracking-tighter">m</span></p></div>
          <div className="w-10 h-10 rounded-hero-sm border border-hero-warning/20 flex items-center justify-center bg-hero-warning/10 text-hero-warning"><Clock size={20}/></div>
        </div>
        <div className="card p-5 flex items-center justify-between">
          <div><p className="hero-metadata leading-tight text-hero-neutral">Deliveries Completed</p><p className="text-2xl font-black text-hero-dark mt-1.5 leading-none">92%</p></div>
          <div className="w-10 h-10 rounded-hero-sm border border-violet-100 flex items-center justify-center bg-violet-50 text-violet-500"><CheckCircle2 size={20}/></div>
        </div>
      </div>

      {/* ── 3. The "War Room" View ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        
        {/* Live List (High Density) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col h-full">
              
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                 <div className="relative w-[320px] group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                    <input 
                      type="text" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Filter by Driver, ID or Area..." 
                      className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm" 
                    />
                 </div>
                 
                 <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                    Sort By <ChevronDown size={14} className="text-gray-400" />
                 </button>
              </div>

              <div className="overflow-x-auto flex-1">
                 <table className="w-full text-left">
                    <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                       <tr>
                          <th className="px-6 py-4">Shipment</th>
                          <th className="px-6 py-4">Logistics Flow</th>
                          <th className="px-6 py-4">Resource</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {jobs.map(job => (
                          <tr key={job.id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => navigate(`/dispatch/jobs/${job.id}`)}>
                             <td className="px-6 py-4">
                                <div className="font-bold text-[#111] text-sm">{job.id}</div>
                                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-0.5 truncate max-w-[150px]">{job.customer}</div>
                             </td>
                             <td className="px-6 py-4">
                                <p className="text-xs font-bold text-gray-700 mb-1.5">{job.route}</p>
                                <div className="flex items-center gap-3">
                                   <StatusBadge status={job.status} />
                                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={12}/> {job.eta}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className={`w-9 h-9 rounded border-2 border-transparent flex items-center justify-center font-black text-[10px] shrink-0 transition-colors ${job.driver === 'Unassigned' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-[#111] text-[#FFCC00] group-hover:border-[#FFCC00]'}`}>
                                      {job.driver === 'Unassigned' ? '?' : job.driver[0]}
                                   </div>
                                   <div>
                                      <div className={`text-xs font-bold leading-tight ${job.driver === 'Unassigned' ? 'text-red-500' : 'text-[#111]'}`}>{job.driver}</div>
                                      <div className={`text-[9px] uppercase font-bold tracking-widest mt-0.5 ${job.vehicle === '-' ? 'text-gray-300' : 'text-gray-400'}`}>{job.vehicle}</div>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <button className="text-[10px] font-bold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest" onClick={(e)=>{e.stopPropagation(); navigate(`/dispatch/jobs/${job.id}`);}}>
                                   Manage Details
                                </button>
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
           
           {/* Map Preview Placeholder */}
           <div className="bg-[#111] rounded-xl p-6 h-64 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-800 relative overflow-hidden group cursor-pointer hover:border-gray-700 transition-colors" onClick={() => navigate('/dispatch/tracking')}>
              <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30">
                 <div className="absolute top-1/2 left-0 w-full h-px bg-[#FFCC00]/50 rotate-12"></div>
                 <div className="absolute top-0 left-1/2 w-px h-full bg-[#FFCC00]/50 -rotate-45"></div>
                 <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#FFCC00] shadow-[0_0_15px_#FFCC00] animate-pulse"></div>
                 <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_#3B82F6] animate-pulse"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold uppercase text-white tracking-widest flex items-center gap-2">
                       <MapPin size={14} className="text-[#FFCC00]"/> Network Map
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live Connect
                    </span>
                 </div>
                 <div className="text-center">
                    <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-all backdrop-blur-sm border border-white/10">Open Dashboard</button>
                 </div>
              </div>
           </div>

           {/* Urgent Alerts */}
           <div className="bg-white rounded-xl border border-red-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                 <ShieldAlert size={16}/> Alerts & Issues
              </h4>
              <div className="space-y-4">
                 {[
                   { msg: 'SHP-20483 geofence breach in Perth SE.', time: '4m ago', level: 'Critical' },
                   { msg: 'Unassigned load SHP-20484 near timeout.', time: '12m ago', level: 'Warning' }
                 ].map((a, i) => (
                   <div key={i} className="flex gap-3 items-start p-3 bg-red-50/30 rounded-lg border border-red-50">
                      <div className={`mt-1.5 w-2 h-2 shrink-0 rounded-full animate-pulse ${a.level === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                      <div>
                         <p className="text-xs font-bold text-[#111] leading-snug">{a.msg}</p>
                         <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{a.time} • {a.level}</p>
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
