import React, { useState } from 'react';
import { Download, Search, Filter, ChevronDown, CheckCircle } from 'lucide-react';

const logs = [
  { id: 'AL-1205', time: '2026-04-08 14:30:22', actor: 'System Admin (admin@hero.com.au)', action: 'Impersonate End', tenant: 'FastMove AU', details: 'Duration: 45 min, Ticket: SUP-12345' },
  { id: 'AL-1204', time: '2026-04-08 13:45:00', actor: 'System Admin (admin@hero.com.au)', action: 'Impersonate Start', tenant: 'FastMove AU', details: 'Reason: Login issue, Ticket: SUP-12345' },
  { id: 'AL-1203', time: '2026-04-08 12:15:00', actor: 'John Doe (john@hero.com.au)',     action: 'Suspend Company', tenant: 'QuickShip Pty Ltd', details: 'Reason: Non-payment' },
  { id: 'AL-1202', time: '2026-04-07 09:10:00', actor: 'System Admin (admin@hero.com.au)', action: 'Activate Company', tenant: 'OzFreight Co', details: 'Reason: Payment cleared' },
  { id: 'AL-1201', time: '2026-04-06 16:22:15', actor: 'John Doe (john@hero.com.au)',     action: 'Create Company', tenant: 'SunState Transport', details: 'Plan: Pro' },
  { id: 'AL-1200', time: '2026-04-05 10:05:00', actor: 'System Admin (admin@hero.com.au)', action: 'Login', tenant: '—', details: 'IP: 121.200.12.5' },
];

const actionColors = {
  'Create Company': 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]',
  'Suspend Company': 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]',
  'Activate Company': 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]',
  'Impersonate Start': 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]',
  'Impersonate End': 'bg-gray-50 text-gray-700 border-gray-200',
  'Login': 'bg-gray-50 text-gray-700 border-gray-200',
};

export default function AuditLogs() {
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  
  const filtered = logs.filter(l => 
    l.actor.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.tenant.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Updated Header - Matching Reference Style */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-1">Compliance & security event tracking.</p>
        </div>
        <button 
          className="bg-gray-900 hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Download size={18} strokeWidth={3} /> Export CSV
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
           <div className="relative w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search actor, action, company..." 
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all" 
              />
           </div>
           
           <div className="relative">
             <button 
               onClick={() => setShowSort(!showSort)}
               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
             >
                Sort By <ChevronDown size={16} className={`text-gray-400 transition-transform ${showSort ? 'rotate-180' : ''}`} />
             </button>

             {showSort && (
               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                 <div className="py-1">
                   {['Timestamp (Newest)', 'Timestamp (Oldest)', 'Actor Name', 'Event Action'].map((opt) => (
                     <button
                       key={opt}
                       onClick={() => setShowSort(false)}
                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors font-medium"
                     >
                       {opt}
                     </button>
                   ))}
                 </div>
               </div>
             )}
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-xs font-bold text-gray-400 uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4">Timestamp</th>
                 <th className="px-6 py-4">Actor</th>
                 <th className="px-6 py-4">Event Action</th>
                 <th className="px-6 py-4">Target Company</th>
                 <th className="px-6 py-4">Event Details</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filtered.map(log => (
                 <tr className="hover:bg-gray-50/50 transition-all group" key={log.id}>
                   <td className="px-6 py-5">
                      <div className="font-mono text-gray-500 font-bold tracking-tight text-xs">{log.time}</div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-sm">{log.actor}</div>
                   </td>
                   <td className="px-6 py-5">
                      <span className={`text-xs font-bold px-3 py-1 rounded-md border inline-flex items-center gap-1.5 ${actionColors[log.action]}`}>
                        <CheckCircle size={10} /> {log.action}
                      </span>
                   </td>
                   <td className="px-6 py-5">
                      <span className="text-sm font-bold text-[#111]">{log.tenant}</span>
                   </td>
                   <td className="px-6 py-5">
                      <span className="text-sm font-medium text-gray-600 block max-w-[200px] truncate" title={log.details}>{log.details}</span>
                   </td>
                 </tr>
               ))}
               {filtered.length === 0 && (
                 <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm font-medium text-gray-500">
                       No audit logs match your search.
                    </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

