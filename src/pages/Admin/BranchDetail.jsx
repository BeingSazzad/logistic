import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Building2, MapPin, Users, Truck, Package,
  Settings, CheckCircle2, AlertTriangle, UserCog, Power
} from 'lucide-react';

const BRANCH_DB = {
  'HUB-SYD': { id: 'HUB-SYD', name: 'Sydney Central Hub', type: 'Primary Hub', location: 'Strathfield, NSW', manager: 'Michael Adams', staff: 42, activeDocs: 18, capacity: '92%', status: 'Online', phone: '+61 2 9111 2222', operatingHours: '24/7' },
  'STA-MEL': { id: 'STA-MEL', name: 'Melbourne North Station', type: 'Local Station', location: 'Tullamarine, VIC', manager: 'Sarah Mitchell', staff: 14, activeDocs: 6, capacity: '45%', status: 'Online', phone: '+61 3 8111 2222', operatingHours: '06:00 - 22:00' },
  'STA-BRI': { id: 'STA-BRI', name: 'Brisbane Port Station', type: 'Local Station', location: 'Lytton, QLD', manager: 'Liam Smith', staff: 28, activeDocs: 12, capacity: '78%', status: 'Offline', phone: '+61 7 7111 2222', operatingHours: '04:00 - 20:00' },
};

export default function AdminBranchDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const b = BRANCH_DB[id] || BRANCH_DB['HUB-SYD'];
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/branches')} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{b.name}</h1>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${b.type === 'Primary Hub' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{b.type}</span>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${b.status === 'Online' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'}`}>{b.status}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-medium"><MapPin size={10} className="inline mr-1"/> {b.location}</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setEditing(!editing)} className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm border ${editing ? 'bg-[#111] text-[#FFCC00] border-gray-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
             <Settings size={16}/> {editing ? 'Cancel Config' : 'Configure Branch'}
           </button>
           {editing && (
             <button onClick={() => setEditing(false)} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
               <CheckCircle2 size={16}/> Save Settings
             </button>
           )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Staff', val: b.staff, icon: Users, color: 'text-blue-500' },
              { label: 'Fleet Assets', val: 24, icon: Truck, color: 'text-violet-500' },
              { label: 'Dock Usage', val: b.capacity, icon: Package, color: 'text-emerald-500' },
              { label: 'Active Jobs', val: b.activeDocs, icon: CheckCircle2, color: 'text-amber-500' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                  <s.icon size={14} className={s.color} />
                </div>
                <p className="text-2xl font-black text-gray-900">{s.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-2">
              <Building2 size={15} className="text-gray-400"/>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Branch Profile</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Branch Manager', val: b.manager },
                { label: 'Contact Phone', val: b.phone },
                { label: 'Operating Hours', val: b.operatingHours },
                { label: 'Facility Type', val: b.type },
              ].map((f, i) => (
                <div key={i}>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</p>
                  {editing ? (
                    <input defaultValue={f.val} className="w-full border border-[#FFCC00] bg-[#FFFBEB] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 transition-all" />
                  ) : (
                    <p className="text-sm font-bold text-gray-900">{f.val}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl group-hover:bg-[#FFCC00]/20 transition-all"></div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-[#FFCC00] flex items-center gap-2 relative z-10">
              <Settings size={16}/> Operations Control
            </h3>
            <div className="space-y-3 relative z-10">
               {b.status === 'Online' ? (
                 <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                   <Power size={14}/> Force Offline
                 </button>
               ) : (
                 <button className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                   <Power size={14}/> Bring Online
                 </button>
               )}
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                 <Users size={14}/> Manage Roster
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
