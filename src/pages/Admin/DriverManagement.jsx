import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Search, Plus, UserPlus, Filter, 
  ArrowDownUp, CheckCircle, AlertTriangle, 
  MapPin, Star, MoreHorizontal, Phone, Truck,
  ChevronDown
} from 'lucide-react';

export default function AdminDriverManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const rawDrivers = [
    { id: 'DRV-101', name: 'Noah Williams', phone: '+61 412 888 123', status: 'Active', rating: 4.8, license: 'MC Class', vehicle: 'XQG-984', region: 'Sydney Metro' },
    { id: 'DRV-102', name: 'Jack Taylor',   phone: '+61 412 888 456', status: 'On Trip', rating: 4.9, license: 'HC Class', vehicle: 'BGT-221', region: 'Melbourne SE' },
    { id: 'DRV-103', name: 'Oliver Brown',  phone: '+61 412 888 789', status: 'Offline', rating: 4.5, license: 'HR Class', vehicle: 'None', region: 'Brisbane NW' },
    { id: 'DRV-104', name: 'Liam Smith',    phone: '+61 412 888 000', status: 'Active', rating: 4.7, license: 'HC Class', vehicle: 'KLY-004', region: 'Adelaide Hub' },
  ];

  const filteredDrivers = useMemo(() => {
    return rawDrivers.filter(d => {
      const searchStr = `${d.name} ${d.id} ${d.region}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [search, sortKey, sortOrder]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Driver Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage fleet vehicle operators, credentials, and deployment zones.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/admin/drivers/add')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> New Driver
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
           <div className="relative w-full md:w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search drivers or regions..." 
                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm" 
              />
           </div>
           
           <div className="relative w-full md:w-auto">
              <select 
                value={sortKey} 
                onChange={(e) => setSortKey(e.target.value)}
                className="w-full md:w-auto appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-10 pr-12 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 transition-all cursor-pointer shadow-sm"
              >
                <option value="name">Sort: Driver Name</option>
                <option value="id">Sort: Driver ID</option>
                <option value="rating">Sort: By Rating</option>
                <option value="status">Sort: By Status</option>
              </select>
              <ArrowDownUp size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Identity & ID</th>
                 <th className="px-6 py-4">Credentials</th>
                 <th className="px-6 py-4">Primary Region</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filteredDrivers.map(d => (
                 <tr className="hover:bg-gray-50 transition-all cursor-pointer group" key={d.id} onClick={() => navigate(`/admin/drivers/${d.id}`)}>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded border-2 border-transparent bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-xs shrink-0 group-hover:border-[#FFCC00] transition-colors">
                          {d.name.split(' ').map(n=>n[0]).join('')}
                       </div>
                       <div>
                         <div className="font-bold text-[#111] text-sm">{d.name}</div>
                         <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">{d.id} • {d.phone}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="text-xs font-bold text-[#111]">{d.license}</span>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{d.vehicle}</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                         <MapPin size={14} className="text-gray-400"/> {d.region}
                      </div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-widest ${
                        d.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                        d.status === 'On Trip' ? 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]' : 
                        'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                     }`}>
                        {d.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <button className="text-[10px] font-bold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest" onClick={(e) => { e.stopPropagation(); navigate(`/admin/drivers/${d.id}`); }}>
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
