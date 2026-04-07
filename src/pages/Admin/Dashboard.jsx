import React from 'react';
import { Users, Building, Activity, ShieldCheck, PieChart } from 'lucide-react';

export default function AdminDashboard() {
  const users = [
    { id: 'USR-01', name: 'Sarah Mitchell', role: 'Dispatcher', status: 'Active', lastLogin: 'Today, 2:45 PM' },
    { id: 'USR-02', name: 'Jack Taylor', role: 'Driver',     status: 'Active', lastLogin: 'Today, 11:30 AM' },
    { id: 'USR-03', name: 'Oliver Brown',role: 'Warehouse', status: 'Offline',lastLogin: 'Yesterday' },
    { id: 'USR-04', name: 'Liam Smith',  role: 'Dispatcher', status: 'Active', lastLogin: 'Today, 8:00 AM' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">
      {/* ── Header ── */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Global platform metrics and governance</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg shadow-sm transition">
            Export Audit Log
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
           <div className="flex justify-between items-start mb-2">
             <div className="text-sm font-medium text-gray-500">Total Users</div>
             <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
               <Users size={16} />
             </div>
           </div>
           <div className="text-3xl font-bold text-gray-900 mb-2">1,248</div>
           <div className="text-xs font-medium text-gray-500">Across 4 roles</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
           <div className="flex justify-between items-start mb-2">
             <div className="text-sm font-medium text-gray-500">Active Tenants</div>
             <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-500">
               <Building size={16} />
             </div>
           </div>
           <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
           <div className="text-xs font-medium text-gray-500">Primary operations</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
           <div className="flex justify-between items-start mb-2">
             <div className="text-sm font-medium text-gray-500">System Uptime</div>
             <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center text-green-500">
               <Activity size={16} />
             </div>
           </div>
           <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
           <div className="text-xs font-semibold text-green-600">All systems operational</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
           <div className="flex justify-between items-start mb-2">
             <div className="text-sm font-medium text-gray-500">Security Events</div>
             <div className="w-8 h-8 rounded-md bg-yellow-50 flex items-center justify-center text-yellow-600">
               <ShieldCheck size={16} />
             </div>
           </div>
           <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
           <div className="text-xs font-medium text-gray-500">In the last 24 hours</div>
        </div>
      </div>

      {/* ── Main Content Splits ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* Left Col: Users Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-lg text-gray-900">Recent User Activity</h3>
            <button className="text-sm text-blue-600 font-semibold hover:underline">Manage All</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                 <tr>
                   <th className="px-6 py-4">User</th>
                   <th className="px-6 py-4">Role</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Last Login</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 bg-white text-[13px]">
                 {users.map((user) => (
                   <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                     <td className="px-6 py-4">
                       <div className="font-bold text-gray-900">{user.name}</div>
                       <div className="text-gray-500 text-xs mt-0.5 font-mono">{user.id}</div>
                     </td>
                     <td className="px-6 py-4 font-medium text-gray-700">{user.role}</td>
                     <td className="px-6 py-4">
                       <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                         {user.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-gray-600 font-medium">{user.lastLogin}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Right Col: Operations Overview */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-white">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
               <PieChart size={18} className="text-gray-400" /> Platform Usage
            </h3>
          </div>
          <div className="p-6 flex flex-col gap-6">
             <div>
               <div className="flex justify-between text-sm font-semibold mb-2">
                 <span className="text-gray-700">Dispatch Module</span>
                 <span className="text-gray-900">45%</span>
               </div>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-yellow-400 rounded-full w-[45%]"></div>
               </div>
             </div>
             
             <div>
               <div className="flex justify-between text-sm font-semibold mb-2">
                 <span className="text-gray-700">Driver PWA</span>
                 <span className="text-gray-900">35%</span>
               </div>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 rounded-full w-[35%]"></div>
               </div>
             </div>

             <div>
               <div className="flex justify-between text-sm font-semibold mb-2">
                 <span className="text-gray-700">Warehouse App</span>
                 <span className="text-gray-900">20%</span>
               </div>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 rounded-full w-[20%]"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
