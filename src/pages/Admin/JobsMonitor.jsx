import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldAlert, BarChart, ChevronDown, AlertTriangle } from 'lucide-react';

const ALL_JOBS_RAW = [
  { id: 'JOB-20481', tenant: 'Dispatch Sydney',   status: 'In Transit', driver: 'Jack Taylor',   flag: 'Clear' },
  { id: 'JOB-20482', tenant: 'Dispatch Brisbane', status: 'Assigned',   driver: 'Liam Smith',    flag: 'Clear' },
  { id: 'JOB-20483', tenant: 'Dispatch Perth',    status: 'Delayed',    driver: 'Noah Williams', flag: 'Warning' },
  { id: 'JOB-20499', tenant: 'Dispatch Sydney',   status: 'Stalled',    driver: 'Unknown',       flag: 'Critical' },
];

export default function AdminJobsMonitor() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');

  const allJobs = useMemo(() => {
    return ALL_JOBS_RAW.filter(j => 
       `${j.id} ${j.tenant} ${j.driver}`.toLowerCase().includes(search.toLowerCase())
    ).sort((a,b) => {
       const aVal = a[sortKey];
       const bVal = b[sortKey];
       if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
       return aVal < bVal ? 1 : -1;
    });
  }, [search, sortKey, sortOrder]);

  const toggleSort = () => {
    if (sortKey === 'id') {
      setSortKey('tenant');
      setSortOrder('asc');
    } else if (sortKey === 'tenant') {
      setSortKey('id');
      setSortOrder('desc');
    } else {
      setSortKey('id');
      setSortOrder('desc');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <BarChart size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Global Load Monitor</h1>
            <p className="text-sm text-gray-500 mt-1">Cross-tenant oversight of all live logistics operations.</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-xs text-gray-400 uppercase font-bold tracking-widest leading-tight">Global Active Jobs</p><p className="text-2xl font-black text-gray-900 mt-1.5 leading-none">482</p></div>
          <div className="w-10 h-10 rounded border border-gray-100 flex items-center justify-center bg-gray-50 text-gray-400"><BarChart size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-xs text-gray-400 uppercase font-bold tracking-widest leading-tight">SLA Breaches</p><p className="text-2xl font-black text-red-600 mt-1.5 leading-none">14</p></div>
          <div className="w-10 h-10 rounded border border-red-100 flex items-center justify-center bg-red-50 text-red-500"><ShieldAlert size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-xs text-gray-400 uppercase font-bold tracking-widest leading-tight">Critical Flags</p><p className="text-2xl font-black text-amber-600 mt-1.5 leading-none">3</p></div>
          <div className="w-10 h-10 rounded border border-amber-100 flex items-center justify-center bg-amber-50 text-amber-500"><AlertTriangle size={20}/></div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
          <div className="relative w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
            <input 
              type="text" 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cross-tenant Job ID..." 
              className="input pl-10" 
            />
          </div>
          <div className="relative">
            <select 
              value={sortKey} 
              onChange={(e) => setSortKey(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg pl-9 pr-10 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 transition-all cursor-pointer shadow-sm uppercase tracking-widest"
            >
              <option value="id">Sort: Job ID</option>
              <option value="tenant">Sort: Processing Depot / Tenant</option>
              <option value="driver">Sort: Driver Name</option>
            </select>
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Load ID</th>
                <th className="px-6 py-4">Tenant / Depot</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">System Flag</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allJobs.map(job => (
                <tr className="hover:bg-gray-50/50 transition-all group" key={job.id}>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[#111] text-[15px]">{job.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-700 text-sm">{job.tenant}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[#111] text-sm">{job.driver}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-xs font-bold px-3 py-1 rounded-md border ${
                      job.status === 'In Transit' ? 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]' :
                      job.status === 'Assigned'   ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' :
                      job.status === 'Delayed'    ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-xs font-bold px-3 py-1 rounded-md border ${
                      job.flag === 'Clear'    ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' :
                      job.flag === 'Warning'  ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                               'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                    }`}>
                      {job.flag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest">Override</button>
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

