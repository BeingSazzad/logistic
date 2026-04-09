import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Filter, Plus, Clock, CheckCircle2, AlertTriangle, Truck, ArrowDownUp, MapPin, ChevronDown, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminShipments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showCreateMock, setShowCreateMock] = useState(false);
  
  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  const rawShipments = [
    { id: 'SHP-9042', branchId: 'SYD-CENTRAL', origin: 'Sydney Depot', dest: 'Melbourne Branch', customer: 'Acme Corp Logistics', status: 'In Transit', progress: 45, type: 'Heavy Load', driver: 'Jack Taylor', est: 'Today 4:00 PM' },
    { id: 'SHP-9041', branchId: 'SYD-CENTRAL', origin: 'Sydney Depot', dest: 'Penrith Branch', customer: 'Tech Solutions Ltd', status: 'Arrived at Branch', progress: 85, type: 'Parcel', driver: 'Sarah Mitchell', est: 'Awaiting Handover' },
    { id: 'SHP-9039', branchId: 'MEL-HUB', origin: 'Brisbane Port', dest: 'Gold Coast Branch', customer: 'Global Traders Australia', status: 'Exception', progress: 60, type: 'Express', driver: 'Liam Smith', est: 'Delayed' },
    { id: 'SHP-9035', branchId: 'SYD-CENTRAL', origin: 'Adelaide Depot', dest: 'Sydney Depot', customer: 'Acme Corp Logistics', status: 'Received at Branch', progress: 100, type: 'Heavy Load', driver: 'Noah Williams', est: 'Completed' }
  ];

  const branchShipments = useMemo(() => {
    if (user.role === 'Super Admin' || user.role === 'Platform Admin') return rawShipments;
    return rawShipments.filter(shp => shp.branchId === user.branchId);
  }, [user.role, user.branchId]);

  const filteredShipments = useMemo(() => {
    return branchShipments.filter(shp => {
      const matchesFilter = filter === 'All' || shp.status === filter;
      const searchStr = `${shp.id} ${shp.customer} ${shp.origin} ${shp.dest} ${shp.driver}`.toLowerCase();
      const matchesSearch = searchStr.includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [branchShipments, filter, search, sortKey, sortOrder]);

  const toggleSort = () => {
    if (sortKey === 'id') {
      setSortKey('customer');
      setSortOrder('asc');
    } else if (sortKey === 'customer') {
      setSortKey('progress');
      setSortOrder('desc');
    } else {
      setSortKey('id');
      setSortOrder('desc');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Active Shipments</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time status tracking and lifecycle management for all active freight.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setShowCreateMock(true);
            setTimeout(() => setShowCreateMock(false), 3000);
          }} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> New Shipment
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {showCreateMock && (
        <div className="fixed top-24 right-8 bg-[#111] text-[#FFCC00] px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-right border border-white/10">
           <Package size={20} className="animate-pulse" />
           <div>
              <p className="text-sm font-black uppercase tracking-widest">Restricted Action</p>
              <p className="text-xs font-bold text-gray-400">Shipments must be created via the Booking API.</p>
           </div>
        </div>
      )}

      {/* KPI HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'Total Volume', value: '1,204', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'On Road Now', value: '84', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Exceptions', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
          { label: 'Delivered Today', value: '412', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">{kpi.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-1.5 leading-none">{kpi.value}</p>
            </div>
            <div className={`w-10 h-10 rounded border ${kpi.border} flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
           <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200/60 w-full md:w-auto shadow-sm">
             {['All', 'In Transit', 'Arrived at Branch', 'Received at Branch', 'Exception', 'Delivered'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setFilter(tab)}
                 className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${filter === tab ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}
               >
                 {tab}
               </button>
             ))}
           </div>

           <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-[320px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Find SHP- ID, origins or customers..." 
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm" 
                />
             </div>
             
             <div className="relative">
                <select 
                  value={sortKey} 
                  onChange={(e) => setSortKey(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg pl-9 pr-10 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 transition-all cursor-pointer shadow-sm uppercase tracking-widest"
                >
                  <option value="id">Sort: Handover ID</option>
                  <option value="customer">Sort: Customer Info</option>
                  <option value="progress">Sort: Delivery Progress</option>
                  <option value="origin">Sort: Origin Location</option>
                </select>
                <ArrowDownUp size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto relative">
           {/* Floating Batch Action Bar */}
           {selectedIds.length > 0 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-top-4 duration-300 border border-white/10">
                <div className="flex items-center gap-3 border-r border-white/20 pr-6">
                   <div className="w-8 h-8 rounded-lg bg-[#FFCC00] text-black flex items-center justify-center font-black">{selectedIds.length}</div>
                   <div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#FFCC00]">Shipments Selected</span>
                     <p className="text-[9px] text-gray-500 font-bold uppercase">Ready for route assembly</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <button className="bg-[#FFCC00] hover:bg-yellow-400 text-black px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2">
                      <Truck size={14} /> Create Dispatch List
                   </button>
                </div>
                <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={16}/></button>
              </div>
           )}

           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4 w-4">
                    <input 
                       type="checkbox" 
                       onChange={(e) => setSelectedIds(e.target.checked ? filteredShipments.map(j => j.id) : [])}
                       checked={selectedIds.length === filteredShipments.length && filteredShipments.length > 0}
                       className="w-4 h-4 rounded border-gray-300 accent-yellow-400"
                    />
                 </th>
                 <th className="px-6 py-4">Manifest Reference</th>
                 <th className="px-6 py-4">Ownership</th>
                 <th className="px-6 py-4">Route / Trajectory</th>
                 <th className="px-6 py-4">Current State</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filteredShipments.map(shp => (
                 <tr className={`hover:bg-gray-50/50 transition-all cursor-pointer group ${selectedIds.includes(shp.id) ? 'bg-yellow-50/30 border-l-4 border-l-[#FFCC00]' : 'border-l-4 border-l-transparent'}`} key={shp.id} onClick={() => toggleSelect(shp.id)}>
                   <td className="px-6 py-5" onClick={e => e.stopPropagation()}>
                     <input 
                       type="checkbox" 
                       checked={selectedIds.includes(shp.id)}
                       onChange={() => toggleSelect(shp.id)}
                       className="w-4 h-4 rounded border-gray-300 accent-yellow-400 cursor-pointer"
                     />
                   </td>
                   <td className="px-6 py-5" onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                      <div className="font-bold text-[#111] text-[15px]">{shp.id}</div>
                      <div className="text-[11px] text-gray-400 font-medium tracking-tight mt-0.5 truncate max-w-[160px]">{shp.customer}</div>
                   </td>
                   <td className="px-6 py-5" onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]"></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#111]">{shp.branchId}</span>
                      </div>
                   </td>
                   <td className="px-6 py-5" onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                      <div className="flex flex-col gap-1 relative pl-4">
                         <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-100"></div>
                         <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 uppercase">
                            <MapPin size={10}/> {shp.origin}
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-900 mt-0.5">
                            <div className="w-1 h-1 rounded-full bg-yellow-400"></div> {shp.dest}
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-5" onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border w-fit uppercase tracking-widest ${
                           shp.status === 'Delivered' || shp.status === 'Received at Branch' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                           shp.status === 'Exception' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' : 
                           shp.status === 'Arrived at Branch' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                           'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]'
                        }`}>
                           {shp.status}
                        </span>
                        <div className="w-20 h-1 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                           <div className={`h-full ${shp.status === 'Exception' ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${shp.progress}%` }}></div>
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/shipments/${shp.id}`); }} className="text-[10px] font-black text-[#111] hover:text-white border border-gray-200 hover:bg-black px-4 py-2 rounded-lg transition-all uppercase tracking-widest shadow-sm">
                        View Audit
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
