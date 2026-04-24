import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, Truck, MapPin, Navigation, Clock, 
  Layers, Maximize2, Crosshair, Bell, Activity,
  Phone, X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const activeVehicles = [
  { id: 'TRK-102', branchId: 'SYD-CENTRAL', driver: 'Jack Taylor', status: 'Moving', speed: '45 km/h', loc: 'Hume Highway, Goulburn', eta: '45 mins', carga: 'Perishables', temp: '-2°C' },
  { id: 'VAN-08',  branchId: 'SYD-CENTRAL', driver: 'Liam Smith', status: 'Stopped', speed: '0 km/h', loc: 'Albury Stopover',     eta: 'Delayed', carga: 'Electronics', temp: 'N/A' },
  { id: 'TRK-05',  branchId: 'MEL-Depot',     driver: 'Noah Williams',  status: 'Moving', speed: '62 km/h', loc: 'Pacific Highway, NSW',   eta: '1h 15m', carga: 'Heavy Mach.', temp: 'N/A' },
  { id: 'VAN-14',  branchId: 'SYD-CENTRAL', driver: 'Oliver Brown',   status: 'Loading', speed: '0 km/h', loc: 'Warehouse A, Sydney',          eta: 'Pending', carga: 'Textiles', temp: '22°C' },
  { id: 'TRK-900', branchId: 'BNE-PORT',    driver: 'Ethan Hunt',     status: 'Moving', speed: '88 km/h', loc: 'Gateway Bridge, BNE',    eta: '15 mins', carga: 'Vip Parcel', temp: 'N/A' },
];

export default function DispatchTracking() {
  const user = useAuthStore(state => state.user);
  const [searchParams] = useSearchParams();
  const vid = searchParams.get('id');
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    return activeVehicles.find(v => v.id === vid) || null;
  });

  useEffect(() => {
    if (vid && (!selectedVehicle || selectedVehicle.id !== vid)) {
      const found = activeVehicles.find(v => v.id === vid);
      if (found) setSelectedVehicle(found);
    }
  }, [vid, selectedVehicle]);

  const filteredVehicles = activeVehicles.filter(v => v.branchId === user.branchId);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-[1600px] mx-auto pb-6">
      
      {/* ── Refined Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 shrink-0">
        <div>
          <h1 className="hero-h1 mb-1 flex items-center gap-2">
             <Crosshair className="text-brand" size={24}/> Fleet Monitor
          </h1>
          <p className="hero-body text-gray-600 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> 
             Live Network • {user.branchName || 'Global'}
          </p>
        </div>
        <div className="flex gap-3">
           <button className="btn-sm btn-outline flex items-center gap-2">
              <Layers size={14}/> Layers
           </button>
           <button className="btn-sm btn-dark flex items-center gap-2">
              <Maximize2 size={14}/> Full Screen
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0 overflow-hidden">
        
        {/* ── Telemetry Sidebar ── */}
        <div className="w-full lg:w-[420px] flex flex-col card shrink-0 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search driver or vehicle..." 
                className="w-full bg-white border border-gray-200 focus:ring-4 focus:ring-brand/10 focus:border-brand rounded-hero-sm py-2 pl-10 pr-4 text-sm font-medium transition-all shadow-sm" 
              />
            </div>
            <div className="flex gap-3 mt-4">
              <div className="flex-1 flex flex-col p-3 bg-emerald-50/50 rounded-hero-sm border border-emerald-100/50">
                <span className="hero-metadata text-emerald-600 mb-1">Active Units</span>
                <span className="text-xl font-semibold text-emerald-900 leading-none">24</span>
              </div>
              <div className="flex-1 flex flex-col p-3 bg-red-50/50 rounded-hero-sm border border-red-100/50">
                <span className="hero-metadata text-red-600 mb-1">Incidents</span>
                <span className="text-xl font-semibold text-red-900 leading-none">03</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto hidden-scrollbar">
            {filteredVehicles.map(v => (
              <div 
                key={v.id} 
                onClick={() => setSelectedVehicle(v)}
                className={`px-5 py-4 border-b border-gray-50 transition-all cursor-pointer ${selectedVehicle?.id === v.id ? 'bg-brand/[0.03] border-l-4 border-l-brand' : 'hover:bg-gray-50/50 border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                     <div className={`w-9 h-9 rounded-hero-sm bg-gray-900 flex items-center justify-center text-brand shadow-sm`}>
                        <Truck size={16}/>
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-900">{v.id}</p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">{v.driver}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${v.status === 'Moving' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>{v.status}</span>
                     <p className="text-xs font-medium text-gray-400 mt-1 truncate max-w-[120px]">{v.loc}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 ml-12">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Navigation size={12} className="text-blue-500" /> {v.speed}
                  </div>
                  <span className="text-gray-200">•</span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Clock size={12} className="text-amber-500" /> {v.eta} away
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Map View ── */}
        <div className="flex-1 bg-gray-50 rounded-hero-md border border-gray-200 overflow-hidden relative shadow-inner">
           
           {/* Mock Map Placeholder */}
           <div className="absolute inset-0 bg-[#F1F5F9]" 
                style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 0)', backgroundSize: '24px 24px' }} />
           
           {/* Clean Overlay UI */}
           <div className="absolute inset-x-4 top-4 flex justify-between pointer-events-none">
              <div className="bg-white/95 backdrop-blur border border-gray-200 px-4 py-2.5 rounded-hero-sm shadow-sm pointer-events-auto flex items-center gap-4">
                 <div className="flex flex-col">
                    <span className="hero-metadata mb-0.5">Focus Area</span>
                    <span className="text-xs font-semibold text-gray-900">{user.branchName || 'Global Terminal'}</span>
                 </div>
                 <div className="w-px h-6 bg-gray-200"></div>
                 <div className="flex gap-1 items-end h-3">
                    {[20, 60, 40, 100].map((h, i) => <div key={i} className="w-1 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>)}
                 </div>
              </div>

              <div className="flex gap-2 pointer-events-auto">
                 <button className="w-10 h-10 bg-white border border-gray-200 rounded-hero-sm flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50">
                    <Bell size={16} />
                 </button>
                 <div className="bg-white border border-gray-200 rounded-hero-sm flex shadow-sm overflow-hidden">
                    <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all font-semibold border-r border-gray-100 text-lg">+</button>
                    <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all font-semibold text-lg">-</button>
                 </div>
              </div>
           </div>
           
           {/* Selected Vehicle Card */}
           {selectedVehicle && (
             <div className="absolute inset-x-4 bottom-4 flex justify-center pointer-events-none animate-in slide-in-from-bottom-2">
                <div className="bg-white border border-gray-200 p-5 rounded-hero-md shadow-xl pointer-events-auto max-w-xl w-full flex items-center gap-5">
                   <div className="w-12 h-12 rounded-hero-sm bg-gray-900 flex items-center justify-center shrink-0 shadow-sm">
                      <Truck size={20} className="text-brand" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{selectedVehicle.driver}</h4>
                        <span className="text-xs font-semibold text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">{selectedVehicle.id}</span>
                      </div>
                      <p className="text-gray-400 text-xs font-medium mb-3 flex items-center gap-1.5 truncate">
                        <MapPin size={12} className="text-gray-300"/> {selectedVehicle.loc}
                      </p>
                      
                      <div className="flex gap-5">
                         {[
                           { label: 'Source', val: 'Mobile GPS', icon: Phone },
                           { label: 'Signal', val: 'Active', icon: Activity },
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-1.5">
                              <item.icon size={12} className="text-gray-400"/>
                              <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">{item.val}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <button className="bg-brand hover:bg-brand-hover text-black px-5 py-2.5 rounded-hero-sm font-semibold text-xs uppercase tracking-widest shadow-sm transition-all">
                         Comm
                      </button>
                      <button 
                        onClick={() => setSelectedVehicle(null)}
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                         <X size={16} />
                      </button>
                   </div>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
}



