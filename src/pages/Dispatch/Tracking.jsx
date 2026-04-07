import React from 'react';
import { Map, Zap, Search, Truck, MapPin, Navigation, Clock } from 'lucide-react';

export default function DispatchTracking() {
  const activeVehicles = [
    { id: 'TRK-12', driver: 'Jack Taylor', status: 'Moving', speed: '45 km/h', loc: 'Hume Highway, Goulburn', eta: '45 mins' },
    { id: 'VAN-08', driver: 'Liam Smith', status: 'Stopped', speed: '0 km/h', loc: 'Albury Stopover',     eta: 'Delayed' },
    { id: 'TRK-05', driver: 'Noah Williams',  status: 'Moving', speed: '62 km/h', loc: 'Pacific Highway, NSW',   eta: '1h 15m' },
    { id: 'VAN-14', driver: 'Oliver Brown',   status: 'Loading', speed: '0 km/h', loc: 'Warehouse A, Sydney',          eta: 'Pending' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Live Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time fleet monitoring and GPS tracking</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 h-full min-h-0">
        
        {/* Left Side: Active List */}
        <div className="w-full lg:w-[350px] flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm shrink-0 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search vehicles or drivers..." className="w-full pl-9 pr-4 py-2 bg-gray-50 text-sm border border-transparent rounded-lg outline-none focus:border-yellow-400 focus:bg-white transition" />
            </div>
            <div className="flex gap-2 mt-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> 24 Moving
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-lg border border-yellow-100">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 8 Stopped
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeVehicles.map(v => (
              <div key={v.id} className="p-4 border-b border-gray-50 hover:bg-yellow-50/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                     <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${v.status === 'Moving' ? 'bg-green-100 text-green-600' : v.status === 'Stopped' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                       <Truck size={14} />
                     </span>
                     <div>
                       <p className="font-bold text-gray-900 text-sm leading-none">{v.id}</p>
                       <p className="text-xs text-gray-500 mt-1">{v.driver}</p>
                     </div>
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${v.status === 'Moving' ? 'text-green-600' : 'text-gray-500'}`}>{v.status}</span>
                </div>
                
                <div className="pl-10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Navigation size={12} className="text-gray-400" /> {v.speed}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin size={12} className="text-gray-400" /> {v.loc}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
                    <Clock size={12} className="text-gray-400" /> ETA: {v.eta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Map Area (Mock) */}
        <div className="flex-1 bg-blue-50/50 rounded-xl border border-gray-200 overflow-hidden relative shadow-inner">
           {/* Grid Pattern Background to look like a map */}
           <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }} />
           
           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <Map size={48} strokeWidth={1} className="text-gray-300 mb-4" />
             <p className="font-semibold text-gray-400 text-sm">Interactive Map Integration Ready</p>
             <p className="text-xs text-gray-400">Google Maps / Mapbox Token Required</p>
           </div>
           
           {/* Mock Map Markers */}
           <div className="absolute top-[30%] left-[40%] bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 border-2 border-green-500 animate-bounce">
              <Truck size={18} className="text-green-600" />
           </div>
           
           <div className="absolute top-[45%] left-[60%] bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 border-2 border-yellow-500">
              <Truck size={18} className="text-yellow-600" />
           </div>

           {/* Floating Map Controls */}
           <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md border border-gray-100 flex flex-col pointer-events-auto">
             <button className="w-10 h-10 flex items-center justify-center border-b border-gray-100 hover:bg-gray-50 font-bold">+</button>
             <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 font-bold">-</button>
           </div>
           
           <div className="absolute top-4 left-4 pointer-events-auto">
             <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Area Focus</p>
                <p className="font-bold text-gray-900 border-b-2 border-yellow-400 inline-block">Greater Sydney Area</p>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
