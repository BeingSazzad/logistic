import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Users, Truck, Package, Settings, MapPin, UserCog } from 'lucide-react';

export default function AdminBranches() {
  const navigate = useNavigate();
  const branches = [
    { id: 'HUB-SYD', name: 'Sydney Central Hub', type: 'Primary Hub', location: 'Strathfield, NSW', manager: 'Michael Adams', staff: 42, activeDocs: 18, capacity: '92%', status: 'Online' },
    { id: 'STA-MEL', name: 'Melbourne North Station', type: 'Local Station', location: 'Tullamarine, VIC', manager: 'Sarah Mitchell', staff: 14, activeDocs: 6, capacity: '45%', status: 'Online' },
    { id: 'STA-BRI', name: 'Brisbane Port Station', type: 'Local Station', location: 'Lytton, QLD', manager: 'Liam Smith', staff: 28, activeDocs: 12, capacity: '78%', status: 'Offline' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-yellow-500 flex items-center gap-2"><Building2 className="text-black"/> Branch Network</h1>
          <p className="text-sm text-gray-500 mt-1">Manage Central Hubs and Local Stations hierarchy across the company.</p>
        </div>
        <button className="btn btn-primary shadow-sm"><Plus size={16}/> Provision Branch</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(branch => (
          <div key={branch.id} onClick={() => navigate(`/admin/branches/${branch.id}`)} className="card bg-white shadow-sm border border-gray-100 hover:border-[#FACC15] cursor-pointer transition-colors relative overflow-hidden group flex flex-col">
            <div className={`h-1.5 w-full absolute top-0 left-0 ${branch.type === 'Primary Hub' ? 'bg-[#FACC15]' : 'bg-gray-300'}`}></div>
            
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${branch.type === 'Primary Hub' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {branch.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${branch.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                    <span className="text-[9px] font-bold text-gray-400">{branch.status}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-black transition-colors"><Settings size={16}/></button>
              </div>
              
              <h2 className="text-xl font-black text-gray-900 tracking-tight">{branch.name}</h2>
              <div className="flex flex-col gap-1 mt-1 mb-6">
                <p className="text-xs font-bold text-gray-400 flex items-center gap-1"><MapPin size={12}/> {branch.location}</p>
                <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest"><UserCog size={10} className="text-yellow-500"/> Lead: {branch.manager}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1 mb-1"><Users size={12}/> Active Staff</p>
                  <p className="text-lg font-bold text-gray-900">{branch.staff}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1 mb-1"><Truck size={12}/> Asset Docks</p>
                  <p className="text-lg font-bold text-gray-900">{branch.activeDocs}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Warehouse Capacity</span>
                  <span className={`text-xs font-bold ${parseInt(branch.capacity) > 90 ? 'text-red-500' : 'text-gray-900'}`}>{branch.capacity}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${parseInt(branch.capacity) > 90 ? 'bg-red-500' : 'bg-[#FACC15]'}`} style={{ width: branch.capacity }}></div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-50 p-4 bg-gray-50/50 flex justify-between items-center group-hover:bg-yellow-50/50 transition-colors">
               <span className="text-xs font-black tracking-widest text-gray-400 group-hover:text-yellow-600 transition-colors uppercase">{branch.id}</span>
               <button className="text-xs font-bold text-gray-900 hover:underline flex items-center gap-1">Manage Node <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
