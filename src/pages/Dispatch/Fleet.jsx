import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Search, Plus, AlertTriangle, Droplet, Wrench, ArrowDownUp, ChevronDown, Activity, MapPin } from 'lucide-react';

export default function DispatchFleet() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [filter, setFilter] = useState('All');

  const fleet = [
    { id: 'TRK-102', reg: 'XQG-984', type: 'Heavy Truck', cap: '20t', status: 'Active', service: 'In 4,500 km', fuel: '72%', location: 'Hume Highway' },
    { id: 'VAN-08', reg: 'BZX-441', type: 'Delivery Van', cap: '2.5t', status: 'Maintenance', service: 'Overdue', fuel: '45%', location: 'Depot A' },
    { id: 'TRL-44', reg: 'T-9921', type: 'Trailer Flatbed', cap: '40t', status: 'Active', service: 'In 12,000 km', fuel: '-', location: 'Warehouse B' },
    { id: 'TRK-09', reg: 'XYY-112', type: 'Heavy Truck', cap: '20t', status: 'Active', service: 'In 1,200 km', fuel: '88%', location: 'Pacific Mwy' },
    { id: 'VAN-14', reg: 'VAN-14-SYD', type: 'Cargo Van', cap: '3.5t', status: 'Loading', service: 'In 8,000 km', fuel: '55%', location: 'Sydney CBD' },
  ];

  const filteredFleet = fleet.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(search.toLowerCase()) || v.reg.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || v.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Truck size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Fleet Asset Control</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time status, health monitoring, and assignment for all fleet assets.</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'Active Assets', val: '124', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Fuel Warning', val: '3', icon: Droplet, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Maintenance', val: '8', icon: Wrench, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Operational', val: '94%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-widest leading-tight">{k.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1.5 leading-none">{k.val}</p>
            </div>
            <div className={`w-10 h-10 rounded border border-gray-100 flex items-center justify-center ${k.bg} ${k.color}`}>
              <k.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
          <div className="relative w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by ID or Reg..."
              className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-normal text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1 border border-gray-200">
              {['All', 'Active', 'Maintenance', 'Loading'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 text-sm font-semibold rounded ${filter === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Asset ID & Reg</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status & Location</th>
                <th className="px-6 py-4 text-right">Fuel</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFleet.map(v => (
                <tr className="hover:bg-gray-50/50 transition-all cursor-pointer group" key={v.id} onClick={() => navigate(`/dispatch/vehicles/${v.id}`)}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0 group-hover:border-[#FFCC00] transition-colors">
                        <Truck size={18} className="text-gray-400 group-hover:text-[#111]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#111] text-sm">{v.id}</div>
                        <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase mt-0.5">{v.reg}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-700">{v.type}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">{v.cap} Payload</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded shadow-sm border uppercase tracking-widest ${v.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          v.status === 'Maintenance' ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                        {v.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-tight">
                        <MapPin size={10} /> {v.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="text-sm font-semibold text-gray-900">{v.fuel}</div>
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 ml-auto">
                      <div className={`h-full ${parseInt(v.fuel) > 50 ? 'bg-emerald-500' : 'bg-red-500'} rounded-full`} style={{ width: v.fuel || '0%' }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-4 py-2 rounded-lg transition-all uppercase tracking-widest shadow-sm">
                      View Details
                    </button>
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


