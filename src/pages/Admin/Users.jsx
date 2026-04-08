import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, UserPlus, Shield, Filter, ArrowDownUp, Mail, Clock } from 'lucide-react';

export default function AdminUsers() {
  const navigate = useNavigate();
  const users = [
    { id: 'USR-01', name: 'Sarah Mitchell', email: 'sarah.m@hero.com', role: 'Dispatcher', systemAccess: 'Full', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'USR-02', name: 'Jack Taylor',    email: 'jack.t@hero.com',  role: 'Driver',     systemAccess: 'Mobile Only', status: 'Active', lastLogin: '2 days ago' },
    { id: 'USR-03', name: 'Oliver Brown',   email: 'oliver.b@hero.com', role: 'Warehouse',  systemAccess: 'Floor Devices', status: 'Offline', lastLogin: '1 week ago' },
    { id: 'USR-04', name: 'Liam Smith',     email: 'liam.s@hero.com',  role: 'Dispatcher', systemAccess: 'Full', status: 'Active', lastLogin: '1 hr ago' },
    { id: 'USR-05', name: 'Michael Adams',  email: 'mike.a@hero.com',  role: 'System Admin', systemAccess: 'Root', status: 'Active', lastLogin: 'Now' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users & Roles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform access, roles, and security permissions.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/users/invite')} className="btn btn-primary shadow-sm"><UserPlus size={16}/> Invite User</button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="card bg-white shadow-sm mt-4 overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
           <div className="relative w-full sm:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by name, email or role..." className="input pl-9 w-full bg-white border-gray-200" />
           </div>
           
           <div className="flex gap-2 w-full sm:w-auto">
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <ArrowDownUp size={14}/> 
               <span className="text-xs font-bold">Sort</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <Filter size={14}/> 
               <span className="text-xs font-bold">Groups</span>
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">User Details</th>
                 <th className="px-6 py-4">Role Assigned</th>
                 <th className="px-6 py-4">Access Level</th>
                 <th className="px-6 py-4">Last Activity</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50 text-sm">
               {users.map(u => (
                 <tr className="hover:bg-gray-50 transition-colors group" key={u.id}>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-black text-xs text-black border border-black/5 shadow-sm shrink-0">
                         {u.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div className="min-w-0">
                         <div className="font-bold text-gray-900 leading-none truncate">{u.name}</div>
                         <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase flex items-center gap-1"><Mail size={10}/> {u.email}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="text-[11px] font-black uppercase text-gray-700 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{u.role}</span>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-gray-600 font-bold text-xs uppercase tracking-tight">
                       <Shield size={14} className={u.systemAccess === 'Root' ? 'text-red-500 animate-pulse' : 'text-gray-400'}/> {u.systemAccess}
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium whitespace-nowrap">
                       <Clock size={12} className="text-gray-300"/> {u.lastLogin}
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>{u.status}</span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button className="text-[10px] font-black uppercase text-gray-400 hover:text-yellow-600 transition-colors tracking-widest" onClick={() => navigate('/admin/users/invite')}>Manage</button>
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
