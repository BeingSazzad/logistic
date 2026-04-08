import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Search, Plus, Filter, AlertTriangle, Droplet, Wrench, ArrowDownUp } from 'lucide-react';

export default function AdminFleetManagement() {
  const navigate = useNavigate();
  const fleet = [
    { id: 'TRK-102', reg: 'XQG-984', type: 'Heavy Truck', cap: '20t', status: 'Active', service: 'In 4,500 km', fuel: '18L/100km' },
    { id: 'VAN-08',  reg: 'BZX-441', type: 'Delivery Van', cap: '2.5t', status: 'Maintenance', service: 'Overdue', fuel: '12L/100km' },
    { id: 'TRL-44',  reg: 'T-9921',  type: 'Trailer Flatbed', cap: '40t', status: 'Active', service: 'In 12,000 km', fuel: '-' },
    { id: 'TRK-09',  reg: 'XYY-112', type: 'Heavy Truck', cap: '20t', status: 'Active', service: 'In 1,200 km', fuel: '19L/100km' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fleet Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage vehicles, trailers, fuel logs, and maintenance schedules.</p>
        </div>
        <button onClick={() => navigate('/admin/fleet/add')} className="btn btn-primary"><Plus size={16}/> Add Vehicle</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-green-500 bg-white">
          <div><p className="text-xs text-gray-500 uppercase font-bold">Active Fleet</p><p className="text-2xl font-bold">124</p></div>
          <Truck className="text-gray-300" size={28}/>
        </div>
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-red-500 bg-white">
          <div><p className="text-xs text-gray-500 uppercase font-bold">In Maintenance</p><p className="text-2xl font-bold text-red-600">8</p></div>
          <Wrench className="text-gray-300" size={28}/>
        </div>
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-yellow-400 bg-white">
          <div><p className="text-xs text-gray-500 uppercase font-bold">Service Due</p><p className="text-2xl font-bold text-yellow-600">12</p></div>
          <AlertTriangle className="text-gray-300" size={28}/>
        </div>
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500 bg-white">
          <div><p className="text-xs text-gray-500 uppercase font-bold">Fuel Efficiency</p><p className="text-xl font-bold text-blue-600">16.4L <span className="text-sm font-normal text-gray-500">avg</span></p></div>
          <Droplet className="text-blue-200" size={28}/>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-white mt-2">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
           <div className="relative w-full sm:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by Reg, ID or Status..." className="input pl-9 w-full bg-white border-gray-200" />
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <ArrowDownUp size={14}/> 
               <span className="text-xs font-bold">Sort</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <Filter size={14}/> 
               <span className="text-xs font-bold">Filters <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded ml-1">1</span></span>
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
               <tr>
                 <th className="px-6 py-4">Vehicle ID & Reg</th>
                 <th className="px-6 py-4">Type & Capacity</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Next Service</th>
                 <th className="px-6 py-4">Fuel Log</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {fleet.map(v => (
                 <tr className="hover:bg-gray-50 transition-colors" key={v.id}>
                   <td className="px-6 py-4">
                     <div className="font-bold text-gray-900">{v.id}</div>
                     <div className="text-xs font-mono text-gray-500">{v.reg}</div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="font-medium text-gray-800">{v.type}</div>
                     <div className="text-xs text-gray-500">Cap: {v.cap}</div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`badge ${v.status === 'Active' ? 'badge-green' : 'bg-red-100 text-red-700'}`}>{v.status}</span>
                   </td>
                   <td className="px-6 py-4">
                     <div className={`font-semibold ${v.service === 'Overdue' ? 'text-red-500' : 'text-gray-700'}`}>{v.service}</div>
                   </td>
                   <td className="px-6 py-4 font-medium text-gray-600">{v.fuel}</td>
                   <td className="px-6 py-4 text-right">
                     <button onClick={() => navigate(`/admin/fleet/${v.id}`)} className="btn btn-dark text-xs py-1.5 px-3">Manage →</button>
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
