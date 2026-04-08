import React from 'react';
import { Package, MapPin, ChevronRight, Clock, CheckCircle2, Truck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const shipments = [
  { id: 'J-2026-1260', origin: 'Sydney NSW', dest: 'Melbourne VIC', status: 'In Transit', eta: 'Today, 17:30', progress: 65, alert: false },
  { id: 'J-2026-1268', origin: 'Melbourne VIC', dest: 'Adelaide SA', status: 'En Route to Pickup', eta: 'Tomorrow, 09:00', progress: 20, alert: false },
  { id: 'J-2026-1241', origin: 'Brisbane QLD', dest: 'Sydney NSW', status: 'Delayed +45 min', eta: 'Today, 19:15', progress: 50, alert: true },
  { id: 'J-2026-1195', origin: 'Sydney NSW', dest: 'Canberra ACT', status: 'Delivered', eta: 'Delivered 7 Apr', progress: 100, alert: false },
];

const statusStyle = {
  'In Transit':            { color: 'text-blue-600',    bg: 'bg-blue-50',    icon: Truck },
  'En Route to Pickup':   { color: 'text-yellow-600',  bg: 'bg-yellow-50',  icon: Clock },
  'Delayed +45 min':      { color: 'text-red-600',     bg: 'bg-red-50',     icon: AlertTriangle },
  'Delivered':            { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
};

export default function CustomerDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">Welcome back</p>
        <h1 className="text-2xl font-bold mb-1">Woolworths Group Logistics</h1>
        <p className="text-gray-400 text-sm">You have {shipments.filter(s=>s.status!=='Delivered').length} active shipments today</p>
        <div className="flex gap-4 mt-6">
          {[
            { label: 'Active', value: shipments.filter(s=>s.status!=='Delivered').length, color: 'text-yellow-400' },
            { label: 'Delivered MTD', value: 47, color: 'text-emerald-400' },
            { label: 'Outstanding Invoices', value: '$4,887', color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/10 px-4 py-3 rounded-xl">
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipments */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">My Shipments</h2>
          <button onClick={() => navigate('/customer/tracking')} className="text-sm text-yellow-600 font-semibold hover:underline flex items-center gap-1">
            Open live map <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shipments.map(s => {
            const cfg = statusStyle[s.status] || statusStyle['In Transit'];
            return (
              <div key={s.id} className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all cursor-pointer ${s.alert ? 'border-red-200' : 'border-gray-100'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{s.id}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <MapPin size={11} /> {s.origin} → {s.dest}
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color} flex items-center gap-1`}>
                    <cfg.icon size={10} /> {s.status}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${s.progress === 100 ? 'bg-emerald-500' : s.alert ? 'bg-red-400' : 'bg-yellow-400'}`} style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 flex items-center gap-1"><Clock size={11} /> {s.eta}</span>
                  <button className="text-yellow-600 font-bold hover:underline">Track →</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick invoice prompt */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="font-bold text-red-800">Outstanding Invoice Due</p>
          <p className="text-sm text-red-600 mt-0.5">INV-2026-1238 · $980.50 · Due 15 Apr</p>
        </div>
        <button onClick={() => navigate('/customer/invoices')} className="btn btn-primary">Pay Now →</button>
      </div>
    </div>
  );
}
