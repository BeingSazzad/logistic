import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Plus, FileText, AlertCircle, Star, Filter, ArrowDownUp } from 'lucide-react';

export default function AdminDriverManagement() {
  const navigate = useNavigate();
  const drivers = [
    { id: 'DRV-102', name: 'Jack Taylor',   license: 'HR-4412', licenseExp: '12 Sep 2026', medExp: '15 Oct 2026', status: 'On Trip', compliance: 'Valid', rating: 4.8 },
    { id: 'DRV-105', name: 'Liam Smith',   license: 'MR-9921', licenseExp: '02 May 2026', medExp: 'Expiring Soon', status: 'Off Duty', compliance: 'Warning', rating: 4.5 },
    { id: 'DRV-118', name: 'Noah Williams',    license: 'HC-1182', licenseExp: 'Expired', medExp: '22 Aug 2026', status: 'Suspended', compliance: 'Invalid', rating: 4.2 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Driver & Compliance Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage driver profiles, licenses, performance, and legal compliance.</p>
        </div>
        <button onClick={() => navigate('/admin/drivers/add')} className="btn btn-primary"><Plus size={16}/> Add Driver</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-green-500 bg-white shadow-sm">
          <div><p className="text-xs text-gray-500 uppercase font-bold">Total Drivers</p><p className="text-2xl font-bold">28</p></div>
          <Users className="text-green-200" size={28}/>
        </div>
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500 bg-white shadow-sm">
          <div><p className="text-xs text-gray-500 uppercase font-bold">On Trip</p><p className="text-2xl font-bold text-blue-600">14</p></div>
          <Users className="text-blue-200" size={28}/>
        </div>
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-red-500 bg-white shadow-sm">
          <div><p className="text-xs text-gray-500 uppercase font-bold">Compliance Alerts</p><p className="text-2xl font-bold text-red-600">3</p></div>
          <AlertCircle className="text-red-200" size={28}/>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-white mt-2 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
           <div className="relative w-full sm:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by name or license ID..." className="input pl-9 w-full bg-white border-gray-200" />
           </div>
           
           <div className="flex gap-2 w-full sm:w-auto">
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <ArrowDownUp size={14}/> 
               <span className="text-xs font-bold">Sort</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <Filter size={14}/> 
               <span className="text-xs font-bold">Filters <span className="bg-yellow-400 text-black text-[9px] px-1.5 py-0.5 rounded ml-1">2</span></span>
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
               <tr>
                 <th className="px-6 py-4">Driver Details</th>
                 <th className="px-6 py-4">License & Expiry</th>
                 <th className="px-6 py-4">Medical Expiry</th>
                 <th className="px-6 py-4">Compliance Status</th>
                 <th className="px-6 py-4">Current Duty</th>
                 <th className="px-6 py-4">Performance</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {drivers.map(d => (
                 <tr className="hover:bg-gray-50 transition-colors" key={d.id}>
                   <td className="px-6 py-4">
                     <div className="font-bold text-gray-900">{d.name}</div>
                     <div className="text-xs text-gray-500">{d.id}</div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="font-medium text-gray-800">{d.license}</div>
                     <div className={`text-xs ${d.licenseExp === 'Expired' ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{d.licenseExp}</div>
                   </td>
                   <td className="px-6 py-4">
                     <div className={`text-sm ${d.medExp.includes('Expiring') ? 'text-yellow-600 font-bold' : 'text-gray-700'}`}>{d.medExp}</div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`badge ${d.compliance === 'Valid' ? 'badge-green' : d.compliance === 'Warning' ? 'badge-yellow' : 'bg-red-100 text-red-700'}`}>{d.compliance}</span>
                   </td>
                   <td className="px-6 py-4"><span className="badge badge-gray">{d.status}</span></td>
                   <td className="px-6 py-4"><div className="flex items-center gap-1 font-bold text-gray-800"><Star size={14} className="text-yellow-500 fill-yellow-500"/> {d.rating}</div></td>
                   <td className="px-6 py-4 text-right">
                     <button onClick={() => navigate(`/admin/drivers/${d.id}`)} className="btn btn-dark text-xs py-1.5 px-3">View Profile →</button>
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
