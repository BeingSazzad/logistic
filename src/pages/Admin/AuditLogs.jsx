import React from 'react';
import { Shield, Search, Filter, History, Key, Eye } from 'lucide-react';

export default function AdminAuditLogs() {
  const logs = [
    { id: 'LOG-4412', user: 'Michael Adams', action: 'Modified System Settings', role: 'Admin', time: '10 mins ago', ip: '192.168.1.44' },
    { id: 'LOG-4411', user: 'Sarah Mitchell', action: 'Created New Job', role: 'Dispatch', time: '22 mins ago', ip: '192.168.1.101' },
    { id: 'LOG-4410', user: 'Jack Taylor',    action: 'Vehicle Status Update', role: 'Driver', time: '1 hr ago', ip: '172.16.0.4' },
    { id: 'LOG-4409', user: 'Liam Smith',     action: 'Deleted Draft Job', role: 'Dispatch', time: '4 hrs ago', ip: '192.168.1.92' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Audit & Security Logs</h1>
          <p className="text-sm text-gray-500 mt-1">SaaS-level activity traceability including role changes, login history, and data mutations.</p>
        </div>
        <button className="btn bg-gray-900 text-white font-bold flex items-center gap-2"><Key size={16}/> Export Logs</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="card bg-white mt-1 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between bg-gray-50/20 items-center">
           <div className="relative w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by user or action..." className="input pl-9" />
           </div>
           <button className="btn btn-dark text-xs py-2 px-3 flex items-center gap-2"><Filter size={14}/> Advanced Filter</button>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm font-sans">
             <thead className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Ref ID</th>
                 <th className="px-6 py-4">User & Role</th>
                 <th className="px-6 py-4">Action Taken</th>
                 <th className="px-6 py-4">Timestamp</th>
                 <th className="px-6 py-4">IP Address</th>
                 <th className="px-6 py-4 text-right">Details</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {logs.map(log => (
                 <tr className="hover:bg-gray-50 group cursor-default" key={log.id}>
                   <td className="px-6 py-5 font-mono text-[10px] text-gray-400 font-bold group-hover:text-yellow-600 transition-colors uppercase">{log.id}</td>
                   <td className="px-6 py-5">
                     <div className="font-bold text-gray-900 text-sm">{log.user}</div>
                     <div className="text-[10px] uppercase font-black text-gray-400 mt-0.5 tracking-widest">{log.role}</div>
                   </td>
                   <td className="px-6 py-5 font-bold text-gray-700 tracking-tight">{log.action}</td>
                   <td className="px-6 py-5 text-gray-500 font-medium">{log.time}</td>
                   <td className="px-6 py-5 font-mono text-xs text-gray-400">{log.ip}</td>
                   <td className="px-6 py-5 text-right">
                     <button className="text-gray-400 hover:text-yellow-600 transition-colors"><Eye size={18}/></button>
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
