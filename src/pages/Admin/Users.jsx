import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, UserPlus, Shield } from 'lucide-react';

export default function AdminUsers() {
  const navigate = useNavigate();
  const users = [
    { id: 'USR-01', name: 'Sarah Mitchell', role: 'Dispatcher', systemAccess: 'Full', status: 'Active' },
    { id: 'USR-02', name: 'Jack Taylor',    role: 'Driver',     systemAccess: 'Mobile Only', status: 'Active' },
    { id: 'USR-03', name: 'Oliver Brown',   role: 'Warehouse',  systemAccess: 'Floor Devices', status: 'Offline' },
    { id: 'USR-04', name: 'Liam Smith',     role: 'Dispatcher', systemAccess: 'Full', status: 'Active' },
    { id: 'USR-05', name: 'Michael Adams',  role: 'System Admin', systemAccess: 'Root', status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users & Roles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform access, roles, and security permissions.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/users/invite')} className="btn btn-primary"><UserPlus size={16}/> Invite User</button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="card bg-white shadow-sm mt-4">
        <div className="p-4 border-b border-gray-100 flex justify-between">
           <div className="relative w-72">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search accounts..." className="input pl-9" />
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase">
               <tr>
                 <th className="px-6 py-4">User</th>
                 <th className="px-6 py-4">Role Assigned</th>
                 <th className="px-6 py-4">System Access Level</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50 text-sm">
               {users.map(u => (
                 <tr hover="bg-gray-50" key={u.id}>
                   <td className="px-6 py-4">
                     <div className="font-bold text-gray-900">{u.name}</div>
                     <div className="text-xs text-gray-500">{u.id}</div>
                   </td>
                   <td className="px-6 py-4 text-gray-600 font-medium">{u.role}</td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-gray-600">
                       <Shield size={14} className={u.systemAccess === 'Root' ? 'text-red-500' : 'text-gray-400'}/> {u.systemAccess}
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`badge ${u.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{u.status}</span>
                   </td>
                   <td className="px-6 py-4 text-blue-600 font-semibold cursor-pointer">Edit</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
