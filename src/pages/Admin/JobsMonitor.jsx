import React from 'react';
import { Search, Filter, ShieldAlert, BarChart } from 'lucide-react';

export default function AdminJobsMonitor() {
  const allJobs = [
    { id: 'JOB-20481', tenant: 'Dispatch Sydney', status: 'In Transit', driver: 'Jack Taylor', flag: 'Clear' },
    { id: 'JOB-20482', tenant: 'Dispatch Brisbane',status: 'Assigned',   driver: 'Liam Smith', flag: 'Clear' },
    { id: 'JOB-20483', tenant: 'Dispatch Perth',   status: 'Delayed',    driver: 'Noah Williams', flag: 'Warning' },
    { id: 'JOB-20499', tenant: 'Dispatch Sydney',  status: 'Stalled',    driver: 'Unknown', flag: 'Critical' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Global Jobs Monitor</h1>
          <p className="text-sm text-gray-500 mt-1">Cross-tenant oversight of all logistic operations.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         <div className="card p-5 bg-white shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Global Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">482 <span className="text-sm text-gray-400 font-normal">Jobs</span></p>
            </div>
            <BarChart className="text-gray-300" size={32} />
         </div>
         <div className="card p-5 bg-white shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">SLA Breaches</p>
              <p className="text-2xl font-bold text-red-600 mt-1">14 <span className="text-sm text-red-400 font-normal">Jobs Delayed</span></p>
            </div>
            <ShieldAlert className="text-red-200" size={32} />
         </div>
      </div>

      <div className="card bg-white shadow-sm mt-4">
        <div className="p-4 border-b border-gray-100 flex justify-between">
           <div className="relative w-72">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search cross-tenant ID..." className="input pl-9" />
           </div>
           <button className="btn btn-dark"><Filter size={16}/> Global Filters</button>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase">
               <tr>
                 <th className="px-6 py-4">Job ID</th>
                 <th className="px-6 py-4">Tenant / Hub</th>
                 <th className="px-6 py-4">Driver</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">System Flag</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50 text-sm">
               {allJobs.map(job => (
                 <tr hover="bg-gray-50" key={job.id}>
                   <td className="px-6 py-4 font-bold text-gray-900">{job.id}</td>
                   <td className="px-6 py-4 text-gray-600">{job.tenant}</td>
                   <td className="px-6 py-4 text-gray-600">{job.driver}</td>
                   <td className="px-6 py-4 font-semibold">{job.status}</td>
                   <td className="px-6 py-4">
                     <span className={`badge ${job.flag === 'Clear' ? 'badge-green' : job.flag === 'Warning' ? 'badge-yellow' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                       {job.flag}
                     </span>
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
