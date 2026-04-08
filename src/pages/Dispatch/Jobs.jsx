import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Plus, MoreHorizontal, Download, 
  ChevronLeft, ChevronRight, ArrowDownUp, Package, 
  Clock, MapPin, AlertCircle, Eye, Trash2, Edit 
} from 'lucide-react';

export default function DispatchJobs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');

  const rawShipments = [
    { id: 'SHP-20481', date: '07 Apr 2026', customer: 'Acme Corp',        route: 'Sydney → Melbourne',  type: 'Freight',    driver: 'Jack Taylor', status: 'In Transit', progress: 45, priority: 'Normal' },
    { id: 'SHP-20482', date: '07 Apr 2026', customer: 'Tech Solutions',   route: 'Brisbane → Sydney',      type: 'LTL',        driver: 'Liam Smith', status: 'Assigned',   progress: 0, priority: 'High' },
    { id: 'SHP-20483', date: '06 Apr 2026', customer: 'Global Traders',   route: 'Perth → Adelaide',   type: 'Express',    driver: 'Noah Williams',  status: 'Delayed',    progress: 75, priority: 'Critical' },
    { id: 'SHP-20484', date: '06 Apr 2026', customer: 'Express Goods',    route: 'Sydney → Newcastle',  type: 'Standard',   driver: 'Unassigned',  status: 'Pending',    progress: 0, priority: 'Low' },
    { id: 'SHP-20485', date: '05 Apr 2026', customer: 'Bengal Motors',    route: 'Melbourne → Sydney',  type: 'Freight',    driver: 'Oliver Brown',   status: 'Delivered',  progress: 100, priority: 'Normal' },
  ];

  // Logic: Filter & Search
  const filteredShipments = useMemo(() => {
    return rawShipments.filter(shp => {
      const matchFilter = filter === 'All' || 
                        (filter === 'Active' && ['In Transit', 'Assigned', 'Pending'].includes(shp.status)) ||
                        (filter === 'Delayed' && shp.status === 'Delayed') ||
                        (filter === 'Completed' && shp.status === 'Delivered');
      
      const searchStr = `${shp.id} ${shp.customer} ${shp.driver}`.toLowerCase();
      const matchSearch = searchStr.includes(search.toLowerCase());

      return matchFilter && matchSearch;
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [filter, search, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Fleet Operations</h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {filteredShipments.length} Active Jobs Found
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border-2 border-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold text-sm hover:border-gray-900 transition-all flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button onClick={() => navigate('create')} className="bg-gray-900 text-[#FACC15] px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-yellow-400/10 flex items-center gap-2">
            <Plus size={18} /> Manifest New Job
          </button>
        </div>
      </div>

      {/* Control Surface */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-6 bg-gray-50/20 border-b border-gray-50">
           
           {/* Search HUD */}
           <div className="relative w-full lg:w-[400px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Find jobs, customers, or fleet drivers..." 
                className="w-full bg-white border-2 border-gray-100 focus:border-yellow-400 outline-none rounded-2xl py-4 pl-12 pr-6 font-bold text-sm shadow-inner transition-all" 
              />
           </div>
           
           {/* Filter Switcher */}
           <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex bg-gray-100 p-1 rounded-2xl shrink-0">
                 {['All', 'Active', 'Delayed', 'Completed'].map(t => (
                   <button 
                     key={t} 
                     onClick={() => setFilter(t)}
                     className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${filter === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                     {t}
                   </button>
                 ))}
              </div>
              <div className="w-px h-8 bg-gray-200 mx-2 hidden lg:block"></div>
              <button className="p-3.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm relative group">
                <Filter size={18}/>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Advanced Filters</span>
              </button>
           </div>
        </div>

        {/* Operational Grid */}
        <div className="overflow-x-auto overflow-y-hidden">
           <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                   {[
                     { label: 'Reference & Cargo', key: 'id' },
                     { label: 'Routes & Trajectory', key: 'route' },
                     { label: 'Carrier Assignment', key: 'driver' },
                     { label: 'Operational State', key: 'status' }
                   ].map(col => (
                     <th 
                       key={col.key}
                       onClick={() => handleSort(col.key)}
                       className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer hover:text-gray-900 transition-colors group"
                     >
                        <div className="flex items-center gap-2">
                           {col.label} 
                           <ArrowDownUp size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortKey === col.key ? 'opacity-100 text-yellow-600' : ''}`} />
                        </div>
                     </th>
                   ))}
                   <th className="px-8 py-5 text-right w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredShipments.map(shp => (
                  <tr 
                    key={shp.id} 
                    onClick={() => navigate(`/admin/shipments/${shp.id}`)}
                    className="hover:bg-yellow-50/30 transition-all group cursor-pointer border-l-4 border-transparent hover:border-yellow-400"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-transform group-hover:scale-105 ${shp.priority === 'Critical' ? 'bg-red-50 text-red-500 border-red-100 animate-pulse' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                            <Package size={22} />
                         </div>
                         <div>
                            <div className="font-black text-gray-900 text-base tracking-tight">{shp.id}</div>
                            <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{shp.customer}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-1 relative pl-5">
                          <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gray-100"></div>
                          <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700">
                             <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> {shp.route.split(' → ')[0]}
                          </div>
                          <div className="flex items-center gap-2.5 text-xs font-black text-gray-900 py-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/40"></div> {shp.route.split(' → ')[1]}
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center font-black text-[12px] text-[#FACC15] shadow-lg group-hover:rotate-12 transition-transform">
                             {shp.driver[0]}
                          </div>
                          <div>
                             <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{shp.driver}</div>
                             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{shp.type} Payload</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-2.5">
                         <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm ${getStatusColor(shp.status)}`}>
                              {shp.status}
                            </span>
                         </div>
                         <div className="w-full max-w-[120px] h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                            <div className={`h-full transition-all duration-1000 ${shp.status === 'Delayed' ? 'bg-red-500' : 'bg-[#FACC15]'}`} style={{ width: `${shp.progress}%` }}></div>
                         </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-100 shadow-sm transition-all"><Edit size={16}/></button>
                          <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 shadow-sm transition-all"><Trash2 size={16}/></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        {/* Pagination HUD */}
        <div className="px-8 py-6 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50/20">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Fleet Cluster</span>
                <span className="text-xs font-black text-gray-900">NODE-SYD-0142</span>
             </div>
             <div className="w-px h-6 bg-gray-200"></div>
             <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">Displaying <span className="text-gray-900">{filteredShipments.length}</span> results of 124 manifest entries</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-3 bg-white border-2 border-transparent hover:border-gray-200 rounded-2xl text-gray-400 hover:text-gray-900 disabled:opacity-20 shadow-sm transition-all" disabled><ChevronLeft size={20} /></button>
            <div className="flex gap-1.5 mx-2">
               {[1, 2, 3].map(n => (
                 <button key={n} className={`w-11 h-11 text-xs font-black rounded-2xl transition-all shadow-sm ${n === 1 ? 'bg-gray-900 text-[#FACC15] scale-110' : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-900'}`}>{n}</button>
               ))}
            </div>
            <button className="p-3 bg-white border-2 border-transparent hover:border-gray-200 rounded-2xl text-gray-400 hover:text-gray-900 shadow-sm transition-all"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
