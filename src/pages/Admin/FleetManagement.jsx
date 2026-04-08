import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Search, Plus, Filter, AlertTriangle, Droplet, Wrench, ArrowDownUp, ChevronDown } from 'lucide-react';

export default function AdminFleetManagement() {
  const navigate = useNavigate();
  const fleet = [
    { id: 'TRK-102', reg: 'XQG-984', type: 'Heavy Truck', cap: '20t', status: 'Active', service: 'In 4,500 km', fuel: '18L/100km' },
    { id: 'VAN-08',  reg: 'BZX-441', type: 'Delivery Van', cap: '2.5t', status: 'Maintenance', service: 'Overdue', fuel: '12L/100km' },
    { id: 'TRL-44',  reg: 'T-9921',  type: 'Trailer Flatbed', cap: '40t', status: 'Active', service: 'In 12,000 km', fuel: '-' },
    { id: 'TRK-09',  reg: 'XYY-112', type: 'Heavy Truck', cap: '20t', status: 'Active', service: 'In 1,200 km', fuel: '19L/100km' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Truck size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Fleet Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage vehicles, trailers, fuel logs, and maintenance schedules.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/admin/fleet/add')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> Add Vehicle
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Active Fleet</p><p className="text-2xl font-black text-gray-900 mt-1.5 leading-none">124</p></div>
          <div className="w-10 h-10 rounded border border-gray-100 flex items-center justify-center bg-gray-50 text-gray-400"><Truck size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">In Maintenance</p><p className="text-2xl font-black text-red-600 mt-1.5 leading-none">8</p></div>
          <div className="w-10 h-10 rounded border border-red-100 flex items-center justify-center bg-red-50 text-red-500"><Wrench size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Service Due</p><p className="text-2xl font-black text-amber-600 mt-1.5 leading-none">12</p></div>
          <div className="w-10 h-10 rounded border border-amber-100 flex items-center justify-center bg-amber-50 text-amber-600"><AlertTriangle size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Fuel Efficiency</p><p className="text-2xl font-black text-blue-600 mt-1.5 leading-none">16.4<span className="text-sm font-bold text-gray-400 tracking-tighter">L</span></p></div>
          <div className="w-10 h-10 rounded border border-blue-100 flex items-center justify-center bg-blue-50 text-blue-500"><Droplet size={20}/></div>
        </div>
      </div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
           <div className="relative w-[320px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search by Reg, ID or Status..." 
                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm" 
              />
           </div>
           
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
              Sort By <ChevronDown size={14} className="text-gray-400" />
           </button>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Vehicle ID & Reg</th>
                 <th className="px-6 py-4">Type & Capacity</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Next Service</th>
                 <th className="px-6 py-4">Fuel Log</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {fleet.map(v => (
                 <tr className="hover:bg-gray-50/50 transition-all cursor-pointer group" key={v.id} onClick={() => navigate(`/admin/fleet/${v.id}`)}>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0">
                          <Truck size={18} className="text-gray-400" />
                       </div>
                       <div>
                         <div className="font-bold text-[#111] text-[15px]">{v.id}</div>
                         <div className="text-[11px] text-gray-400 font-mono tracking-tight mt-0.5">{v.reg}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-[#111]">{v.type}</span>
                         <span className="text-[11px] text-gray-400 mt-0.5">Cap: {v.cap}</span>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                     <span className={`text-[10px] font-bold px-3 py-1 rounded-md border ${
                        v.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                        'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                     }`}>
                        {v.status}
                     </span>
                   </td>
                   <td className="px-6 py-5">
                      <div className={`text-sm font-bold ${v.service === 'Overdue' ? 'text-red-500' : 'text-[#111]'}`}>{v.service}</div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="text-sm font-bold text-gray-700">{v.fuel}</div>
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
