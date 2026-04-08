import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Plus, MoreHorizontal, Download, 
  ChevronLeft, ChevronRight, ArrowDownUp, Package, 
  Clock, MapPin, AlertCircle 
} from 'lucide-react';

export default function DispatchJobs() {
  const navigate = useNavigate();
  const shipments = [
    { id: 'SHP-20481', date: '07 Apr 2026', customer: 'Acme Corp',        route: 'Sydney → Melbourne',  type: 'Freight',    driver: 'Jack Taylor', status: 'In Transit', progress: 45, priority: 'Normal' },
    { id: 'SHP-20482', date: '07 Apr 2026', customer: 'Tech Solutions',   route: 'Brisbane → Sydney',      type: 'LTL',        driver: 'Liam Smith', status: 'Assigned',   progress: 0, priority: 'High' },
    { id: 'SHP-20483', date: '06 Apr 2026', customer: 'Global Traders',   route: 'Perth → Adelaide',   type: 'Express',    driver: 'Noah Williams',  status: 'Delayed',    progress: 75, priority: 'Critical' },
    { id: 'SHP-20484', date: '06 Apr 2026', customer: 'Express Goods',    route: 'Sydney → Newcastle',  type: 'Standard',   driver: 'Unassigned',  status: 'Pending',    progress: 0, priority: 'Low' },
    { id: 'SHP-20485', date: '05 Apr 2026', customer: 'Bengal Motors',    route: 'Melbourne → Sydney',  type: 'Freight',    driver: 'Oliver Brown',   status: 'Delivered',  progress: 100, priority: 'Normal' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Transit': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Assigned':   return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Delayed':    return 'bg-red-50 text-red-600 border-red-100';
      case 'Delivered':  return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Fleet Operations</h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Live Shipment Lifecycle Management</p>
        </div>
        <div className="flex gap-2">
          <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-bold shadow-sm">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => navigate('create')} className="btn btn-primary shadow-lg font-bold flex items-center gap-2 px-6">
            <Plus size={18} /> New Shipment
          </button>
        </div>
      </div>

      {/* Premium Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50/20">
           <div className="relative w-full lg:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by ID, Customer, or Driver..." className="input pl-9 w-full bg-white border-gray-200" />
           </div>
           
           <div className="flex gap-2 items-center w-full lg:w-auto">
             <div className="flex border border-gray-200 bg-white rounded-xl overflow-hidden p-0.5 shadow-sm overflow-x-auto no-scrollbar">
                {['All', 'Active', 'Delayed', 'Completed'].map(t => (
                  <button key={t} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${t === 'All' ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-400'}`}>{t}</button>
                ))}
             </div>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm shrink-0">
               <ArrowDownUp size={14}/> <span className="text-xs font-bold font-sans">Sort</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm shrink-0">
               <Filter size={14}/> <span className="text-xs font-bold font-sans">Filters</span>
             </button>
           </div>
        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-white border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
               <tr>
                 <th className="px-6 py-4">Reference & Meta</th>
                 <th className="px-6 py-4">Origins / Destination</th>
                 <th className="px-6 py-4">Assignment</th>
                 <th className="px-6 py-4">Lifecycle State</th>
                 <th className="px-6 py-4 text-right">Control</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {shipments.map(shp => (
                 <tr key={shp.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${shp.priority === 'Critical' ? 'bg-red-50 text-red-500 shadow-sm animate-pulse' : 'bg-gray-50 text-gray-400'}`}>
                           <Package size={16} />
                        </div>
                        <div>
                           <div className="font-black text-gray-900 text-sm tracking-tight">{shp.id}</div>
                           <div className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{shp.customer}</div>
                        </div>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                            <MapPin size={10} className="text-gray-300"/> {shp.route.split(' → ')[0]}
                         </div>
                         <div className="h-2 w-px bg-gray-200 ml-1.5"></div>
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                            <MapPin size={10} className="text-gray-300"/> {shp.route.split(' → ')[1]}
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500 border border-gray-200 shadow-inner">
                            {shp.driver[0]}
                         </div>
                         <div className="min-w-0">
                            <div className="text-xs font-black text-gray-900 truncate uppercase">{shp.driver}</div>
                            <div className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-tighter">{shp.type} Load</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border inline-block w-fit ${getStatusColor(shp.status)}`}>
                          {shp.status}
                        </span>
                        <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                           <div className={`h-full ${shp.status === 'Delayed' ? 'bg-red-500' : 'bg-[#FACC15]'}`} style={{ width: `${shp.progress}%` }}></div>
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-right">
                      <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/30">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Control Node <span className="text-gray-900">#0142</span> • View 1-10 of 124
          </p>
          <div className="flex items-center gap-1.5">
            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 disabled:opacity-30 shadow-sm transition-all" disabled><ChevronLeft size={16} /></button>
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-9 h-9 text-xs font-black rounded-xl transition-all shadow-sm ${n === 1 ? 'bg-gray-900 text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>{n}</button>
            ))}
            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 shadow-sm transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
