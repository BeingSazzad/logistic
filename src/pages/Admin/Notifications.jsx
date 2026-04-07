import React from 'react';
import { Bell, Search, Plus, Filter, MessageSquare, AlertCircle } from 'lucide-react';

export default function AdminNotifications() {
  const alerts = [
    { id: 'ALT-112', type: 'Driver Alert',  message: 'Driver Jack Taylor has been inactive for > 4 hours during shift.', time: '12 mins ago', priority: 'High' },
    { id: 'ALT-111', type: 'Job Delayed',    message: 'Job JOB-20483 has missed its delivery window by 30 mins.', time: '45 mins ago', priority: 'Medium' },
    { id: 'ALT-110', type: 'Payment Alert', message: 'Customer Global Traders has overdue balance of $85K.',  time: '2 hrs ago',  priority: 'Critical' },
    { id: 'ALT-109', type: 'Docs Expired',   message: 'Driver Noah Williams license expired today.',       time: '4 hrs ago',  priority: 'Critical' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notification Center</h1>
          <p className="text-sm text-gray-500 mt-1">SaaS-level alerts for inactive drivers, delayed jobs, overdue payments, and expired credentials.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16}/> Config Alerts</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="card bg-white mt-1 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
           <div className="relative w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search alerts..." className="input pl-9" />
           </div>
           <button className="btn btn-dark text-xs"><Filter size={14}/> Priority View</button>
        </div>
        <div className="flex flex-col">
           {alerts.map(alt => (
             <div key={alt.id} className="p-5 border-b border-gray-50 last:border-b-0 flex items-start gap-4 hover:bg-gray-50/50 transition truncate group relative cursor-pointer">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner ${
                 alt.priority === 'Critical' ? 'bg-red-50 text-red-500' : 
                 alt.priority === 'High' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
               }`}>
                 {alt.priority === 'Critical' ? <AlertCircle size={20}/> : <Bell size={20}/> }
               </div>
               <div className="flex-1 min-w-0 pr-4">
                 <div className="flex items-center gap-3 mb-1">
                   <h3 className="font-bold text-gray-900 text-sm">{alt.type}</h3>
                   <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                     alt.priority === 'Critical' ? 'bg-red-100 text-red-600' : 
                     alt.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                   }`}>
                     {alt.priority}
                   </span>
                 </div>
                 <p className="text-gray-500 text-sm font-medium leading-relaxed truncate group-hover:whitespace-normal">{alt.message}</p>
                 <span className="text-[10px] text-gray-400 font-bold mt-2 inline-block uppercase tracking-wider">{alt.time}</span>
               </div>
               <div className="absolute top-1/2 -translate-y-1/2 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="btn btn-dark text-xs py-1.5 px-4 font-bold rounded-full">Resolve / Join Chat</button>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
