import React from 'react';
import { Shield, Search, Filter, Key, Eye, ChevronDown, Download } from 'lucide-react';

export default function AdminAuditLogs() {
  const logs = [
    { id: 'LOG-4412', user: 'Michael Adams',  action: 'Modified System Settings', role: 'Admin',    time: '10 mins ago', ip: '192.168.1.44' },
    { id: 'LOG-4411', user: 'Sarah Mitchell', action: 'Created New Job',           role: 'Dispatch', time: '22 mins ago', ip: '192.168.1.101' },
    { id: 'LOG-4410', user: 'Jack Taylor',    action: 'Vehicle Status Update',     role: 'Driver',   time: '1 hr ago',    ip: '172.16.0.4' },
    { id: 'LOG-4409', user: 'Liam Smith',     action: 'Deleted Draft Job',         role: 'Dispatch', time: '4 hrs ago',   ip: '192.168.1.92' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">System Audit Logs</h1>
          <p className="hero-body text-gray-600 mt-1">Activity traceability including role changes, login history, and data mutations.</p>
        </div>
        <button className="bg-gray-900 hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Download size={16}/> Export Logs
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search by user or action..." className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-xs font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ref ID</th>
                <th className="px-6 py-4">User & Role</th>
                <th className="px-6 py-4">Action Taken</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map(log => (
                <tr className="hover:bg-gray-50/50 group cursor-default transition-all" key={log.id}>
                  <td className="px-6 py-5">
                    <div className="font-mono text-xs text-gray-400 font-bold uppercase">{log.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[#111] text-[15px]">{log.user}</div>
                    <div className="text-xs uppercase font-bold text-gray-400 mt-0.5">{log.role}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-700 text-sm">{log.action}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-500">{log.time}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-mono text-xs text-gray-400">{log.ip}</div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">View</button>
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


