import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Filter, Plus, Clock, CheckCircle2, AlertTriangle, Truck, ArrowDownUp, MapPin, MoreHorizontal } from 'lucide-react';

export default function AdminShipments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const rawShipments = [
    { id: 'SHP-9042', origin: 'Sydney Central Hub', dest: 'Melbourne North Hub', customer: 'Acme Corp Logistics', status: 'In Transit', progress: 45, type: 'FTL', driver: 'Jack Taylor', est: 'Today 4:00 PM' },
    { id: 'SHP-9041', origin: 'Port Botany', dest: 'Penrith Drop', customer: 'Tech Solutions Ltd', status: 'At Pickup', progress: 15, type: 'LTL', driver: 'Sarah Mitchell', est: 'Today 6:30 PM' },
    { id: 'SHP-9039', origin: 'Brisbane Port Facility', dest: 'Gold Coast DC', customer: 'Global Traders', status: 'Exception', progress: 60, type: 'Express', driver: 'Liam Smith', est: 'Delayed' },
    { id: 'SHP-9035', origin: 'Adelaide Depot', dest: 'Sydney Central Hub', customer: 'Acme Corp Logistics', status: 'Delivered', progress: 100, type: 'FTL', driver: 'Noah Williams', est: 'Completed' }
  ];

  const filteredShipments = useMemo(() => {
    return rawShipments.filter(shp => {
      const searchStr = `${shp.id} ${shp.customer} ${shp.origin} ${shp.dest} ${shp.driver}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [search, sortKey, sortOrder]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'In Transit': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Exception': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-100';
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-end px-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Global Freight Stream</h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> {filteredShipments.length} Active Vessels Monitoring
          </p>
        </div>
        <button onClick={() => navigate('/dispatch/jobs/create')} className="bg-gray-900 text-[#FACC15] px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-2xl shadow-yellow-400/10 flex items-center gap-3">
           <Plus size={20}/> New Shipment
        </button>
      </div>

      {/* KPI HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        {[
          { label: 'Volume (24h)', value: '1,204', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Live Traffic', value: '84', icon: Truck, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', isAlert: true },
          { label: 'Success Rate', value: '99.2%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl flex items-center justify-between group hover:border-gray-900 transition-all">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{kpi.label}</p>
              <p className={`text-2xl font-black ${kpi.isAlert ? 'text-red-600' : 'text-gray-900'}`}>{kpi.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kpi.bg} ${kpi.color} shadow-inner group-hover:rotate-12 transition-transform`}>
              <kpi.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Stream Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden mx-4">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-8 bg-gray-50/20">
           <div className="relative w-full sm:w-[500px]">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             <input 
               type="text" 
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder="Identify shipment via ID, customer, route, or driver..." 
               className="w-full bg-white border-2 border-gray-50 focus:border-yellow-400 outline-none rounded-3xl py-5 pl-14 pr-8 font-bold text-sm shadow-inner transition-all" 
             />
           </div>
           <div className="flex gap-4">
             <button className="p-4 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm relative group">
                <Filter size={20}/>
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
               <tr>
                 <th className="px-10 py-6 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('id')}>Manifest Ref <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-10 py-6 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('origin')}>Trajectory <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-10 py-6">Status Node</th>
                 <th className="px-10 py-6">Fleet Ops</th>
                 <th className="px-10 py-6 text-right">Schedule</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {filteredShipments.map(shp => (
                 <tr className="hover:bg-yellow-50/20 transition-all cursor-pointer group border-l-4 border-transparent hover:border-yellow-400" key={shp.id} onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                   <td className="px-10 py-8">
                     <div className="font-black text-gray-900 text-lg tracking-tighter mb-1 select-all">{shp.id}</div>
                     <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate max-w-[150px]">{shp.customer}</div>
                   </td>
                   <td className="px-10 py-8">
                      <div className="flex flex-col gap-1 relative pl-5">
                         <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gray-100"></div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                            <MapPin size={10}/> {shp.origin}
                         </div>
                         <div className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-tight mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50"></div> {shp.dest}
                         </div>
                      </div>
                   </td>
                   <td className="px-10 py-8">
                      <div className="flex flex-col gap-2">
                        <span className={`text-[10px] font-black tracking-[0.1em] uppercase px-4 py-1.5 rounded-full border shadow-sm inline-block w-fit ${getStatusColor(shp.status)}`}>
                           {shp.status}
                        </span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-100 mt-1">
                           <div className={`h-full transition-all duration-1000 ${shp.status === 'Exception' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${shp.progress}%` }}></div>
                        </div>
                      </div>
                   </td>
                   <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                         <div className="w-11 h-11 rounded-[1.25rem] bg-gray-900 text-[#FACC15] flex items-center justify-center font-black text-xs shadow-xl group-hover:rotate-12 transition-transform">
                            {shp.driver[0]}
                         </div>
                         <div>
                            <div className="font-black text-gray-900 text-sm tracking-tight">{shp.driver}</div>
                            <div className="text-[9px] font-black uppercase text-gray-400 tracking-tighter mt-0.5">{shp.type} Payload</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-10 py-8 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                         <div className="flex items-center gap-2 font-black text-gray-900 text-sm tracking-tighter"><Clock size={16} className="text-yellow-500"/> {shp.est}</div>
                         <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100"><MoreHorizontal size={20}/></button>
                      </div>
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
