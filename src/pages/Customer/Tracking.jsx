import React, { useState } from 'react';
import { Truck, MapPin, Clock, Navigation } from 'lucide-react';

const trips = [
  { id: 'J-2026-1260', driver: 'James Mitchell', vehicle: 'NSW-456-XY', lat: -37.4, status: 'In Transit', eta: '17:30', progress: 65, from: 'Sydney', to: 'Melbourne', phone: '0412 345 678' },
  { id: 'J-2026-1268', driver: 'Sarah Chen',     vehicle: 'VIC-891-AB', lat: -37.8, status: 'At Pickup',  eta: 'Tomorrow', progress: 20, from: 'Melbourne', to: 'Adelaide', phone: '0423 567 890' },
];

export default function CustomerTracking() {
  const [selected, setSelected] = useState(trips[0]);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
        <p className="text-sm text-gray-500 mt-1">{trips.length} active shipments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipment selector */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {trips.map(t => (
            <button key={t.id} onClick={() => setSelected(t)}
              className={`bg-white rounded-2xl border p-4 text-left transition-all ${selected.id === t.id ? 'border-yellow-400 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
              <p className="font-bold text-gray-900 text-sm">{t.id}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><MapPin size={10} />{t.from} → {t.to}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] font-black uppercase text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">{t.status}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> ETA {t.eta}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${t.progress}%` }} />
              </div>
            </button>
          ))}
        </div>

        {/* Map + Detail */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Mock Map */}
          <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl h-72 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute" style={{ top: '45%', left: '35%' }}>
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"><MapPin size={13} color="white" /></div>
              <div className="bg-white text-xs font-bold px-2 py-0.5 rounded-full shadow mt-1 whitespace-nowrap">{selected.from}</div>
            </div>
            <div className="absolute" style={{ top: '55%', right: '30%' }}>
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"><MapPin size={13} color="white" /></div>
              <div className="bg-white text-xs font-bold px-2 py-0.5 rounded-full shadow mt-1 whitespace-nowrap">{selected.to}</div>
            </div>
            {/* Truck dot */}
            <div className="absolute" style={{ top: '48%', left: '52%' }}>
              <div className="w-10 h-10 bg-yellow-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-pulse">
                <Truck size={18} color="#000" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Navigation size={12} /> GPS LIVE · Updated 30s ago
            </div>
          </div>

          {/* Trip Detail */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{selected.id}</h3>
                <p className="text-sm text-gray-500">{selected.from} → {selected.to}</p>
              </div>
              <span className="text-yellow-700 bg-yellow-100 text-xs font-black uppercase px-3 py-1 rounded-full">{selected.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Driver',   selected.driver],
                ['Vehicle',  selected.vehicle],
                ['ETA',      selected.eta],
                ['Contact',  selected.phone],
              ].map(([k,v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-400 font-semibold">{k}</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Trip progress</span><span>{selected.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${selected.progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
