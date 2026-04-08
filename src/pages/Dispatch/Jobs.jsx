import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Plus, Clock, 
  MapPin, Truck, ChevronDown, CheckCircle2, 
  AlertTriangle, MoreHorizontal 
} from 'lucide-react';

export default function DispatchJobs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const rawJobs = [
    { id: 'SHP-9042', customer: 'Acme Corp Logistics', origin: 'Sydney', dest: 'Melbourne', status: 'Active', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', eta: '14:30' },
    { id: 'SHP-9041', customer: 'Tech Solutions Ltd', origin: 'Port Botany', dest: 'Penrith', status: 'Delayed', driver: 'Sarah Mitchell', vehicle: 'BGT-221', priority: 'Medium', eta: '16:45' },
    { id: 'SHP-9039', customer: 'Global Traders Australia', origin: 'Brisbane Port', dest: 'Gold Coast', status: 'Completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', eta: 'Done' },
    { id: 'SHP-9035', customer: 'Southport Logistics', origin: 'Adelaide', dest: 'Sydney Hub', status: 'Active', driver: 'Noah Williams', vehicle: 'V-102', priority: 'High', eta: '10:00' }
  ];

  const filteredJobs = useMemo(() => {
    return rawJobs.filter(job => {
      const matchesFilter = filter === 'All' || job.status === filter;
      const matchesSearch = `${job.id} ${job.customer} ${job.driver}`.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [filter, search, sortKey, sortOrder]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shipment Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Live dispatch control and real-time shipment status monitoring.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/dispatch/jobs/create')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> Create Shipment
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
           <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200/60 w-full xl:w-auto overflow-x-auto shadow-sm">
             {['All', 'Active', 'Delayed', 'Completed'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setFilter(tab)}
                 className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${filter === tab ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}
               >
                 {tab}
               </button>
             ))}
           </div>

           <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
             <div className="relative w-full md:w-[320px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search shipments, drivers..." 
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm" 
                />
             </div>
             
             <div className="relative w-full md:w-auto">
                <select 
                  value={sortKey} 
                  onChange={(e) => setSortKey(e.target.value)}
                  className="w-full md:w-auto appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-10 pr-12 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 transition-all cursor-pointer shadow-sm"
                >
                  <option value="id">Sort: Shipment ID</option>
                  <option value="eta">Sort: ETA Time</option>
                  <option value="customer">Sort: Customer Name</option>
                  <option value="priority">Sort: By Priority</option>
                </select>
                <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Shipment ID</th>
                 <th className="px-6 py-4">Route Info</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Assigned Unit</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filteredJobs.map(job => (
                 <tr className="hover:bg-gray-50 transition-all cursor-pointer group" key={job.id} onClick={() => navigate(`/dispatch/jobs/${job.id}`)}>
                   <td className="px-6 py-4">
                      <div className="font-bold text-[#111] text-sm">{job.id}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-0.5 truncate max-w-[160px]">{job.customer}</div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                         <span>{job.origin}</span>
                         <span className="text-gray-300">→</span>
                         <span>{job.dest}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                        <Clock size={10}/> ETA: {job.eta}
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-widest ${
                         job.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                         job.status === 'Delayed' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' : 
                         'bg-[#F8FAFC] text-gray-600 border-gray-200'
                      }`}>
                         {job.status}
                      </span>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded border-2 border-transparent bg-[#111] flex items-center justify-center font-black text-[10px] text-[#FFCC00] shrink-0 group-hover:border-[#FFCC00] transition-colors">
                            {job.driver[0]}
                         </div>
                         <div>
                            <div className="font-bold text-[#111] text-xs leading-tight">{job.driver}</div>
                            <div className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mt-0.5">{job.vehicle}</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <button className="text-[10px] font-bold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest">
                        Manage
                      </button>
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
