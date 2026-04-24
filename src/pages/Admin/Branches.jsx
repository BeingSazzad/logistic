import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Users, Truck, Package, Settings, MapPin, UserCog, Globe, ArrowUpRight } from 'lucide-react';

export default function AdminBranches() {
  const navigate = useNavigate();
  const branches = [
    { id: 'SYD-CENTRAL', name: 'Sydney Central Depot', type: 'Primary Depot', location: 'Strathfield, NSW', manager: 'Michael Adams', staff: 42, activeDocs: 18, capacity: '92%', status: 'Online', performance: 98 },
    { id: 'MEL-Depot', name: 'Melbourne Depot', type: 'Primary Depot', location: 'Tullamarine, VIC', manager: 'Sarah Mitchell', staff: 14, activeDocs: 6, capacity: '45%', status: 'Online', performance: 84 },
    { id: 'BNE-PORT', name: 'Brisbane Port Branch', type: 'Local Branch', location: 'Lytton, QLD', manager: 'Liam Smith', staff: 28, activeDocs: 12, capacity: '78%', status: 'Maintenance', performance: 72 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Pro Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Building2 size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Branch List</h1>
            <p className="text-sm text-gray-500 mt-1">Manage Depots and delivery centers across your area.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/branches/add')}
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Add New Branch
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Network HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'System Status', value: '98.4%', icon: Settings, color: 'text-emerald-600' },
          { label: 'Total Staff', value: '1,240', icon: Users, color: 'text-blue-600' },
          { label: 'Total Vehicles', value: '840', icon: Truck, color: 'text-amber-600' },
          { label: 'System Online', value: '99.9%', icon: Globe, color: 'text-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color} border border-gray-100`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="hero-metadata leading-none mb-1.5">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {branches.map(branch => (
          <div key={branch.id} onClick={() => navigate(`/admin/branches/${branch.id}`)} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#FFCC00] cursor-pointer transition-all relative overflow-hidden group flex flex-col hover:shadow-xl">
            <div className={`h-1.5 w-full absolute top-0 left-0 ${branch.type === 'Primary Depot' ? 'bg-[#FFCC00]' : 'bg-gray-200'}`}></div>

            <div className="p-7 flex-1">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md border ${branch.type === 'Primary Depot' ? 'bg-[#FFFBEB] text-[#9A7B00] border-[#FFCC00]/40' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {branch.type}
                  </span>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    <span className={`w-1.5 h-1.5 rounded-full ${branch.status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                    <span className="hero-metadata">{branch.status}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                  {branch.performance}% Score
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1 group-hover:text-[#FFCC00] transition-colors">{branch.name}</h2>
              <div className="flex flex-col gap-1.5 mb-8">
                <p className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-widest"><MapPin size={13} className="text-gray-300" /> {branch.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded bg-[#111] text-[#FFCC00] flex items-center justify-center font-semibold text-xs">{branch.manager.split(' ').map(n => n[0]).join('')}</div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Lead: {branch.manager}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 group-hover:bg-white transition-colors">
                  <p className="text-xs font-semibold uppercase text-gray-400 tracking-widest flex items-center gap-2 mb-1.5"><Users size={12} /> Staff Count</p>
                  <p className="text-xl font-semibold text-gray-900 leading-none">{branch.staff}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 group-hover:bg-white transition-colors">
                  <p className="text-xs font-semibold uppercase text-gray-400 tracking-widest flex items-center gap-2 mb-1.5"><Truck size={12} /> Vehicles</p>
                  <p className="text-xl font-semibold text-gray-900 leading-none">{branch.activeDocs}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#111]">Storage Usage</span>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${parseInt(branch.capacity) > 90 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {parseInt(branch.capacity) > 90 ? 'Full' : 'Ok'}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold ${parseInt(branch.capacity) > 90 ? 'text-red-500' : 'text-gray-900'}`}>{branch.capacity}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                  <div className={`h-full transition-all duration-1000 ${parseInt(branch.capacity) > 90 ? 'bg-red-500' : 'bg-[#FFCC00]'}`} style={{ width: branch.capacity }}></div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-50 p-5 bg-gray-50/50 flex justify-between items-center group-hover:bg-[#111] group-hover:text-white transition-all">
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 group-hover:text-[#FFCC00] transition-colors uppercase">{branch.id}</span>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/admin/branches/${branch.id}`); }}
                className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
              >
                Manage Branch <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


