import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, MoreHorizontal, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DispatchJobs() {
  const navigate = useNavigate();
  const jobs = [
    { id: 'JOB-20481', date: '07 Apr 2026', customer: 'Acme Corp',        route: 'Sydney → Melbourne',  type: 'Freight',    driver: 'Jack Taylor', status: 'In Transit', amount: '$1,240' },
    { id: 'JOB-20482', date: '07 Apr 2026', customer: 'Tech Solutions',   route: 'Brisbane → Sydney',      type: 'LTL',        driver: 'Liam Smith', status: 'Assigned',   amount: '$450' },
    { id: 'JOB-20483', date: '06 Apr 2026', customer: 'Global Traders',   route: 'Perth → Adelaide',   type: 'Express',    driver: 'Noah Williams',  status: 'Delayed',    amount: '$820' },
    { id: 'JOB-20484', date: '06 Apr 2026', customer: 'Express Goods',    route: 'Sydney → Newcastle',  type: 'Standard',   driver: 'Unassigned',  status: 'Pending',    amount: '$310' },
    { id: 'JOB-20485', date: '05 Apr 2026', customer: 'Bengal Motors',    route: 'Melbourne → Sydney',  type: 'Freight',    driver: 'Oliver Brown',   status: 'Delivered',  amount: '$1,500' },
    { id: 'JOB-20486', date: '05 Apr 2026', customer: 'Nexus Ltd',        route: 'Sydney → Canberra',      type: 'Express',    driver: 'Lucas Jones',   status: 'Delivered',  amount: '$580' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'In Transit': return <span className="badge badge-yellow">In Transit</span>;
      case 'Assigned':   return <span className="badge badge-blue">Assigned</span>;
      case 'Delayed':    return <span className="badge badge-orange">Delayed</span>;
      case 'Pending':    return <span className="badge badge-gray">Pending</span>;
      case 'Delivered':  return <span className="badge badge-green">Delivered</span>;
      default: return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1200px]">
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Jobs Management</h1>
          <p className="text-sm text-gray-500 mt-1">View, assign, and track all shipment jobs</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg shadow-sm transition">
            <Download size={16} /> Export
          </button>
          <button onClick={() => navigate('create')} className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold rounded-lg transition shadow-sm">
            <Plus size={16} /> Create New Job
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search by Job ID or Customer..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition" />
          </div>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            <Filter size={18} />
          </button>
        </div>

        <div className="flex gap-2">
          {['All', 'In Transit', 'Pending', 'Delivered'].map(tab => (
            <button key={tab} className={`px-4 py-1.5 text-sm font-semibold rounded-full border transition ${tab === 'All' ? 'bg-gray-900 text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Full Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Job Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Route Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{job.id}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{job.customer} &bull; {job.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-700">{job.route}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{job.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{job.driver}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{job.amount}</td>
                  <td className="px-6 py-4">{getStatusBadge(job.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1.5 text-gray-400 hover:text-black rounded-lg transition">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">6</span> of <span className="font-bold text-gray-900">124</span> results</p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50" disabled><ChevronLeft size={16} /></button>
            <button className="w-9 h-9 flex items-center justify-center border border-yellow-400 bg-yellow-400 text-black font-bold rounded-lg text-sm">1</button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-bold rounded-lg text-sm">2</button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-bold rounded-lg text-sm">3</button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 bg-white hover:bg-gray-50"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
