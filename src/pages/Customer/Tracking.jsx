import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Truck, MapPin, Clock, Navigation } from 'lucide-react';

const trips = [
  { 
    id: 'SHP-9042', 
    driver: 'James Mitchell', 
    vehicle: 'NSW-456-XY', 
    status: 'On the way to Melbourne', 
    currentCity: 'Albury (NSW/VIC Border)',
    progress: 55, 
    from: 'Sydney', 
    to: 'Melbourne', 
    phone: '0412 345 678',
    steps: [
      { city: 'Sydney CBD', label: 'Collected from Customer', done: true },
      { city: 'Sydney Depot', label: 'Processing at Depot', done: true },
      { city: 'Goulburn Depot', label: 'Departed Central Depot', done: true },
      { city: 'Albury', label: 'Inter-city Transit', current: true },
      { city: 'Melbourne Depot', label: 'Awaiting Arrival', done: false },
      { city: 'Melbourne CBD', label: 'Out for Delivery', done: false }
    ]
  },
  { 
    id: 'SHP-9039', 
    driver: 'Sarah Chen',     
    vehicle: 'VIC-891-AB', 
    status: 'Out for delivery', 
    currentCity: 'Melbourne (St Kilda)',
    progress: 92, 
    from: 'Melbourne Depot', 
    to: 'St Kilda', 
    phone: '0423 567 890',
    steps: [
      { city: 'Brisbane Depot', label: 'Line-haul Departed', done: true },
      { city: 'Melbourne Depot', label: 'Sorting at Depot', done: true },
      { city: 'Melbourne Depot', label: 'Staged for Delivery', done: true },
      { city: 'Melbourne CBD', label: 'With Courier', current: true }
    ]
  },
];

export default function CustomerTracking() {
  const [searchParams] = useSearchParams();
  const trackId = searchParams.get('id');
  
  const [selected, setSelected] = useState(() => {
    return trips.find(t => t.id === trackId) || trips[0];
  });

  useEffect(() => {
    if (trackId && selected?.id !== trackId) {
      const found = trips.find(t => t.id === trackId);
      if (found) setSelected(found);
    }
  }, [trackId, selected]);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
        <p className="text-sm text-gray-500 mt-1">{trips.length} active Loads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Load selector */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {trips.map(t => (
            <button key={t.id} onClick={() => setSelected(t)}
              className={`bg-white rounded-2xl border p-4 text-left transition-all ${selected.id === t.id ? 'border-yellow-400 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
              <p className="font-bold text-gray-900 text-sm">{t.id}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><MapPin size={10} />{t.from} → {t.to}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-black uppercase text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">{t.status}</span>
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

            {/* Trip Detail & Network Journey (Depot-to-Depot) */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h3 className="font-black text-gray-900 text-2xl uppercase tracking-tighter">{selected.id}</h3>
                  <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest flex items-center gap-2">
                     <MapPin size={12} className="text-brand" /> {selected.from} <span className="text-gray-200">→</span> {selected.to}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-black bg-yellow-400 text-xs font-black uppercase px-4 py-2 rounded-xl shadow-lg shadow-yellow-400/20">{selected.status}</span>
                  <div className="mt-3 flex flex-col items-end">
                     <p className="text-xs font-black text-brand uppercase tracking-widest">Active Node</p>
                     <p className="text-xs font-bold text-gray-900 mt-1">{selected.currentCity}</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Network Path (Depot to Depot) */}
              <div className="p-10 bg-white">
                 <div className="relative space-y-12">
                    {/* The Progress Line */}
                    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                    
                    {selected.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-8 relative group">
                         {/* Icon/Dot */}
                         <div className={`w-4 h-4 rounded-full border-2 z-10 shrink-0 mt-1.5 transition-all duration-500 ${
                            step.done ? 'bg-emerald-500 border-emerald-100 scale-110 shadow-lg' : 
                            step.current ? 'bg-yellow-400 border-yellow-200 animate-pulse scale-150 shadow-xl shadow-yellow-400/40' : 
                            'bg-white border-gray-200 opacity-30 shadow-inner'
                         }`}></div>

                         {/* Content */}
                         <div className={`flex-1 transition-all duration-500 ${step.done ? 'opacity-60' : step.current ? 'opacity-100' : 'opacity-20'}`}>
                            <div className="flex justify-between items-center">
                               <p className={`text-xs font-black uppercase tracking-[0.2em] ${step.current ? 'text-yellow-600' : 'text-gray-400'}`}>
                                  {step.city}
                               </p>
                               {step.done && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded tracking-widest uppercase">Scanned</span>}
                            </div>
                            
                            <div className={`mt-2 p-4 rounded-2xl border transition-all ${step.current ? 'bg-gray-900 border-gray-800 shadow-2xl translate-x-1' : 'bg-gray-50/50 border-gray-100'}`}>
                               <p className={`text-sm font-bold leading-tight ${step.current ? 'text-white' : 'text-gray-900'}`}>
                                  {step.label}
                               </p>
                               {step.current && (
                                  <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">
                                     Our automated sorting facility is preparing this parcel for the next inter-city line-haul truck.
                                  </p>
                               )}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Transit Context */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm">
                       <Truck size={22} />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest">In Transit via Depot</p>
                       <p className="text-xs font-bold text-gray-900">Consolidated Loading</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Network Speed</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Standard Express</p>
                 </div>
              </div>

              <div className="p-5 bg-black text-[#FFCC00] text-xs font-black uppercase tracking-[0.3em] text-center flex items-center justify-center gap-4 group">
                 <div className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse"></div>
                 AUSTRALIAN LOGISTICS NETWORK LIVE FEED
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}


