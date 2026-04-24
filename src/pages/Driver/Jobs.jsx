import React, { useState } from 'react';
import { 
  Package, MapPin, Clock, ChevronRight, 
  CheckCircle, AlertCircle, ArrowRight,
  Calculator, DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_VARIANTS = {
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'In Progress': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Assigned': 'bg-blue-50 text-blue-700 border-blue-100',
  'Issue': 'bg-red-50 text-red-700 border-red-200',
};

const jobs = [
  { id: 'SHP-9081', customer: 'Woolworths', from: 'Sydney NSW', to: 'Melbourne VIC', date: 'Today, 08:00', items: '3 Pallets', weight: '850kg', status: 'In Progress', earnings: '796.30' },
  { id: 'SHP-9076', customer: 'Coles Logistics', from: 'Melbourne VIC', to: 'Adelaide SA', date: 'Yesterday', items: '6 Pallets', weight: '1,200kg', status: 'Completed', earnings: '620.50' },
  { id: 'SHP-9065', customer: 'Amazon AU', from: 'Brisbane QLD', to: 'Sydney NSW', date: '6 Apr', items: '2 Pallets', weight: '400kg', status: 'Completed', earnings: '510.00' },
  { id: 'SHP-9052', customer: 'IGA Metro', from: 'Sydney NSW', to: 'Newcastle NSW', date: '4 Apr', items: '4 Pallets', weight: '960kg', status: 'Issue', earnings: '240.00' },
  { id: 'SHP-9099', customer: 'BigW Distribution', from: 'Sydney NSW', to: 'Canberra ACT', date: 'Tomorrow, 06:00', items: '1 Pallets', weight: '190kg', status: 'Assigned', earnings: '310.00' },
];

export default function DriverJobs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('active');

  const filtered = jobs.filter(j => {
    if (tab === 'active') return j.status === 'In Progress' || j.status === 'Assigned' || j.status === 'Issue';
    if (tab === 'done') return j.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24 w-full max-w-[480px] mx-auto">
      
      {/* ── Summary HUD ── */}
      <div className="bg-[#111] px-5 py-6 flex items-center justify-between shadow-xl">
         <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Estimated Payouts</p>
            <h2 className="text-3xl font-black text-[#FFCC00] leading-none">$2,142.30</h2>
         </div>
         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
            <Calculator size={20} className="text-[#FFCC00]" />
         </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* ── Tabs ── */}
        <div className="flex gap-2 p-1.5 bg-gray-200/50 rounded-2xl border border-gray-100 mt-2">
          {[
            { key: 'active', label: 'In Progress' },
            { key: 'done', label: 'History' },
            { key: 'all', label: 'Manifest' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${tab === t.key ? 'bg-white shadow-xl text-gray-900 border border-gray-100' : 'text-gray-400'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Job Cards ── */}
        <div className="space-y-4">
          {filtered.map(job => (
            <div 
              key={job.id} 
              onClick={() => navigate(`/driver/loads/${job.id}`)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 active:scale-[0.98] transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0 pr-2">
                   <span className="text-xs font-black text-[#FFCC00] bg-black px-2 py-0.5 rounded uppercase tracking-widest">{job.id}</span>
                   <h3 className="font-black text-gray-900 text-lg tracking-tight mt-1 truncate">{job.customer}</h3>
                </div>
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-black uppercase tracking-widest shrink-0 ${STATUS_VARIANTS[job.status]}`}>
                   {job.status}
                </div>
              </div>

              {/* Route Visualization */}
              <div className="relative pl-6 space-y-4 mb-5">
                 <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-gray-100"></div>
                 <div className="relative">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-300"></div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Origin</p>
                    <p className="text-sm font-bold text-gray-700 truncate">{job.from}</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-black border-2 border-[#FFCC00]"></div>
                    <p className="text-xs font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Destination</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{job.to}</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-5 border-b border-gray-50 mb-5">
                 <div className="flex items-center gap-2.5 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                    <Package size={14} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-600">{job.items} • {job.weight}</span>
                 </div>
                 <div className="flex items-center gap-2.5 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-600">{job.date}</span>
                 </div>
              </div>

              <div className="flex justify-between items-center">
                 <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Est. Payout</span>
                    <span className="text-xl font-black text-gray-900 tracking-tighter">${job.earnings}</span>
                 </div>
                 <button className="h-10 w-10 bg-gray-900 group-hover:bg-black text-[#FFCC00] rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-95">
                    <ArrowRight size={18} />
                 </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

