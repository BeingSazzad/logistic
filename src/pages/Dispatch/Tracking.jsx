import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Map, Zap, Search, Truck, MapPin, Navigation, Clock, 
  Satellite, Layers, Maximize2, Crosshair, Bell, Info,
  ChevronRight, Phone, MessageCircle, AlertTriangle, Package
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DispatchTracking() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const vid = searchParams.get('id');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  React.useEffect(() => {
    if (vid) {
      const found = activeVehicles.find(v => v.id === vid);
      if (found) setSelectedVehicle(found);
    }
  }, [vid]);

  const activeVehicles = [
    { id: 'TRK-102', branchId: 'SYD-CENTRAL', driver: 'Jack Taylor', status: 'Moving', speed: '45 km/h', loc: 'Hume Highway, Goulburn', eta: '45 mins', carga: 'Perishables', temp: '-2°C' },
    { id: 'VAN-08',  branchId: 'SYD-CENTRAL', driver: 'Liam Smith', status: 'Stopped', speed: '0 km/h', loc: 'Albury Stopover',     eta: 'Delayed', carga: 'Electronics', temp: 'N/A' },
    { id: 'TRK-05',  branchId: 'MEL-HUB',     driver: 'Noah Williams',  status: 'Moving', speed: '62 km/h', loc: 'Pacific Highway, NSW',   eta: '1h 15m', carga: 'Heavy Mach.', temp: 'N/A' },
    { id: 'VAN-14',  branchId: 'SYD-CENTRAL', driver: 'Oliver Brown',   status: 'Loading', speed: '0 km/h', loc: 'Warehouse A, Sydney',          eta: 'Pending', carga: 'Textiles', temp: '22°C' },
    { id: 'TRK-900', branchId: 'BNE-PORT',    driver: 'Ethan Hunt',     status: 'Moving', speed: '88 km/h', loc: 'Gateway Bridge, BNE',    eta: '15 mins', carga: 'Vip Parcel', temp: 'N/A' },
  ];

  const filteredVehicles = activeVehicles.filter(v => v.branchId === user.branchId);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      
      {/* ── 1. Live HUD Header ── */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <Satellite className="text-blue-500" size={24}/> Fleet GPS Monitor
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Network Synchronized • 0s Delay
          </p>
        </div>
        <div className="flex gap-2">
           <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm font-bold">
              <Layers size={14}/> Base Layers
           </button>
           <button className="btn bg-[#111] text-[#FFCC00] border-transparent hover:bg-black flex items-center gap-2 shadow-xl font-bold px-6">
              <Maximize2 size={14}/> Full Screen
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0 overflow-hidden">
        
        {/* ── 2. Telemetry Sidebar ── */}
        <div className="w-full lg:w-[400px] flex flex-col bg-white rounded-3xl border border-gray-100 shadow-xl shrink-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
              <input type="text" placeholder="Ping driver or vessel ID..." className="input pl-9 w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] shadow-inner rounded-xl transition-all" />
            </div>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 flex flex-col items-center justify-center p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden group">
                <span className="text-[9px] font-black uppercase tracking-widest relative z-10">Active</span>
                <span className="text-2xl font-black relative z-10">24</span>
                <Truck size={30} className="absolute -right-2 -bottom-2 opacity-10 group-hover:rotate-12 transition-transform"/>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-3 bg-red-50 text-red-700 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group">
                <span className="text-[9px] font-black uppercase tracking-widest relative z-10">Alerts</span>
                <span className="text-2xl font-black relative z-10">03</span>
                <AlertTriangle size={30} className="absolute -right-2 -bottom-2 opacity-10 group-hover:rotate-12 transition-transform"/>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/20">
            {filteredVehicles.map(v => (
              <div 
                key={v.id} 
                onClick={() => setSelectedVehicle(v)}
                className={`p-6 border-b border-gray-50 transition-all cursor-pointer relative overflow-hidden ${selectedVehicle?.id === v.id ? 'bg-white shadow-[inset_4px_0_0_0_#FFCC00]' : 'hover:bg-white/80'}`}
              >
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border ${v.status === 'Moving' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                        <Truck size={20} className={v.status === 'Moving' ? '' : ''}/>
                     </div>
                     <div>
                        <p className="font-black text-gray-900 text-sm tracking-tight">{v.id}</p>
                        <p className="text-[10px] font-black text-[#FFCC00] bg-gray-900 px-2 py-0.5 rounded shadow-sm inline-block mt-1 uppercase tracking-widest">{v.driver}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <span className={`text-[10px] font-black uppercase tracking-widest ${v.status === 'Moving' ? 'text-emerald-500' : 'text-gray-400'}`}>{v.status}</span>
                     <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase truncate max-w-[80px]">{v.loc.split(',')[1] || v.loc}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Navigation size={12} className="text-blue-500" /> {v.speed}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black text-gray-900 bg-[#FFCC00]/10 border border-[#FFCC00]/20 p-2 rounded-lg">
                    <Clock size={12} className="text-yellow-600" /> {v.eta} INV
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Strategic Map HUD ── */}
        <div className="flex-1 bg-gray-900 rounded-[2.5rem] border border-gray-800 overflow-hidden relative shadow-2xl">
           
           {/* Mock Map Texture */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           {/* Ambient HUD Lighting */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <div className="w-24 h-24 rounded-full border border-[#FFCC00]/20 flex items-center justify-center animate-[ping_3s_infinite] absolute"></div>
             <div className="text-center relative z-10 px-12">
               <Crosshair size={48} strokeWidth={1} className="text-[#FFCC00]/20 mx-auto mb-6" />
               <h4 className="text-white font-black text-xl tracking-tight mb-2">Satellite Telemetry Locked</h4>
               <p className="text-gray-500 text-sm max-w-sm mx-auto font-medium">Coordinate synchronization active. Select a vehicle from the telemetry board to focus tracking.</p>
             </div>
           </div>
           
           {/* Floating HUD Elements */}
           <div className="absolute inset-x-6 top-6 flex justify-between pointer-events-none">
              <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 p-4 rounded-3xl shadow-2xl pointer-events-auto">
                 <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-[#FFCC00] uppercase tracking-widest mb-1">Active HUB</span>
                       <span className="text-sm font-black text-white px-3 py-1 bg-[#FFCC00]/10 border border-[#FFCC00]/20 rounded-xl shadow-inner">{user.branchName}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Signal</span>
                       <div className="flex gap-0.5 items-end h-4">
                          {[20, 60, 40, 100].map((h, i) => <div key={i} className="w-1 bg-emerald-500 rounded-t-full" style={{ height: `${h}%` }}></div>)}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-3 pointer-events-auto">
                 <button className="w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all shadow-xl group">
                    <Bell size={18} className="group-hover:rotate-12 transition-transform" />
                 </button>
                 <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col shadow-xl">
                    <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-all font-black">+</button>
                    <div className="h-px bg-white/10 mx-2"></div>
                    <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-all font-black">-</button>
                 </div>
              </div>
           </div>

           {/* Selected Vehicle Detail HUD (Bottom) */}
           {selectedVehicle && (
             <div className="absolute inset-x-6 bottom-6 flex justify-center pointer-events-none animate-in slide-in-from-bottom-6 transition-all">
                <div className="bg-gray-900/90 backdrop-blur-2xl border border-[#FFCC00]/30 p-8 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto max-w-4xl w-full flex items-center gap-10">
                   <div className="w-24 h-24 rounded-full border-4 border-[#FFCC00] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,204,0,0.2)]">
                      <Truck size={40} className="text-[#FFCC00]" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-2xl font-black text-white tracking-tighter truncate capitalize">{selectedVehicle.driver} <span className="text-[#FFCC00] text-sm ml-2 px-3 py-1 bg-[#FFCC00]/10 rounded-full border border-[#FFCC00]/20">{selectedVehicle.id}</span></h4>
                      <p className="text-gray-400 text-sm font-medium mt-1 mb-6 flex items-center gap-1.5 truncate"><MapPin size={14} className="text-gray-600"/> {selectedVehicle.loc}</p>
                      
                      <div className="grid grid-cols-3 gap-6">
                         {[
                           { label: 'Cargo Type', val: selectedVehicle.carga, icon: Package },
                           { label: 'Temp Monitor', val: selectedVehicle.temp, icon: Info },
                           { label: 'Speed Limit', val: '80 km/h', icon: Navigation },
                         ].map((item, i) => (
                           <div key={i} className="flex flex-col bg-white/5 p-3 rounded-2xl border border-white/5">
                              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-1"><item.icon size={10}/> {item.label}</span>
                              <span className="text-sm font-black text-white">{item.val}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="flex flex-col gap-3">
                      <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-[0.15em] flex items-center gap-2 shadow-[0_0_20px_rgba(255,204,0,0.3)] transition-all active:scale-95">
                         <Phone size={14}/> Open COMMS
                      </button>
                      <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-[0.15em] border border-white/10 transition-all active:scale-95">
                         Close HUD
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
