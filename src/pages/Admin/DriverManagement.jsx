import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Search, Plus, UserPlus, Filter, 
  ArrowDownUp, CheckCircle, AlertTriangle, 
  MapPin, Star, MoreHorizontal, Phone, Truck 
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

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-end px-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Human Resources Pool</h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Validated Operator Matrix</p>
        </div>
        <button onClick={() => navigate('/admin/drivers/add')} className="bg-gray-900 text-[#FACC15] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-yellow-400/10 flex items-center gap-3">
           <UserPlus size={20}/> Onboard Driver
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/20 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="relative w-full md:w-[450px]">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             <input 
               type="text" 
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder="Find operators by name, ID, or deployment region..." 
               className="w-full bg-white border-2 border-gray-100 focus:border-yellow-400 outline-none rounded-3xl py-5 pl-14 pr-8 font-bold text-sm shadow-inner transition-all" 
             />
           </div>
           
           <div className="flex gap-4">
             <button className="p-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm"><Filter size={20}/></button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-white text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
               <tr>
                 <th className="px-10 py-6 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('name')}>Identity <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-10 py-6 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('license')}>Credentials <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-10 py-6 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('region')}>Primary Region <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-10 py-6">Operational Status</th>
                 <th className="px-10 py-6 text-right w-20"></th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {filteredDrivers.map(d => (
                 <tr className="hover:bg-yellow-50/30 transition-all group cursor-pointer" key={d.id} onClick={() => navigate(`/admin/drivers/${d.id}`)}>
                   <td className="px-10 py-8">
                     <div className="flex items-center gap-5">
                       <div className="w-14 h-14 rounded-[1.25rem] bg-gray-900 flex items-center justify-center font-black text-lg text-[#FACC15] shadow-xl group-hover:rotate-6 transition-transform">
                         {d.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                         <div className="font-black text-gray-900 text-lg tracking-tight leading-none mb-2">{d.name}</div>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.id}</span>
                            <div className="flex items-center gap-1 text-[#FACC15]"><Star size={10} fill="#FACC15"/> <span className="text-[10px] font-black">{d.rating}</span></div>
                         </div>
                       </div>
                     </div>
                   </td>
                   <td className="px-10 py-8">
                      <div className="flex flex-col gap-1.5">
                         <span className="text-[11px] font-black uppercase text-gray-700">{d.license}</span>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><Truck size={12}/> {d.vehicle}</span>
                      </div>
                   </td>
                   <td className="px-10 py-8">
                     <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-tight">
                        <MapPin size={14} className="text-gray-300"/> {d.region}
                     </div>
                   </td>
                   <td className="px-10 py-8">
                     <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border shadow-sm ${
                        d.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        d.status === 'On Trip' ? 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse' : 
                        'bg-gray-50 text-gray-400 border-gray-100'
                     }`}>
                        ● {d.status}
                     </span>
                   </td>
                   <td className="px-10 py-8 text-right">
                      <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-300 hover:text-gray-900 shadow-sm transition-all group-hover:scale-110" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreHorizontal size={24} />
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
