import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Navigation, Phone, Clock, Package, 
  CheckCircle2, Bell, User, Zap, AlertTriangle, ShieldCheck 
} from 'lucide-react';

export default function DriverHome() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const upcoming = [
    { id: 'SHP-20502', area: 'Parramatta, NSW', time: '11:45 AM', items: 3, priority: 'Normal' },
    { id: 'SHP-20503', area: 'Chatswood, NSW',  time: '1:15 PM',  items: 7, priority: 'High' },
  ];

  return (
    <div className="p-5 flex flex-col gap-6 max-w-md mx-auto min-h-screen bg-gray-50 pb-20">

      {/* ── 1. Dynamic Status Bar ── */}
      <div className="flex justify-between items-center bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100">
         <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center overflow-hidden">
               <User size={20} className="text-[#FACC15]" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Operator</p>
               <p className="text-sm font-black text-gray-900 leading-none">Jack Taylor</p>
            </div>
         </div>
         <button 
           onClick={() => setIsOnline(!isOnline)}
           className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all active:scale-95 border ${isOnline ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20' : 'bg-white text-gray-400 border-gray-200'}`}
         >
            <Zap size={14} className={isOnline ? 'fill-white' : ''} />
            <span className="text-xs font-black uppercase tracking-widest">{isOnline ? 'Online' : 'Offline'}</span>
         </button>
      </div>

      {/* ── 2. The Hero: Active Manifest ── */}
      <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/5">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-yellow-400 opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-7 relative z-10">
           <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_#FACC15]"></span>
                    <span className="text-yellow-400 text-[9px] font-black uppercase tracking-[0.2em]">Next Logistics Flow</span>
                 </div>
                 <h2 className="text-2xl font-black text-white tracking-tighter mt-1">Acme Distribution</h2>
                 <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">SHP-20481 • SYDNEY_B2B</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center shadow-inner">
                 <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest block mb-0.5">ETA</span>
                 <span className="text-xl font-black text-white">10:30</span>
                 <span className="text-[9px] font-black text-gray-500 uppercase block">AM</span>
              </div>
           </div>

           <div className="space-y-5">
              <div className="flex items-start gap-4">
                 <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <MapPin size={16} className="text-gray-400" />
                 </div>
                 <div>
                    <p className="text-gray-300 text-sm font-bold leading-tight">14 George Street, Level 4</p>
                    <p className="text-gray-600 text-[10px] font-black uppercase mt-1">Sydney CBD • 2.4 KM</p>
                 </div>
              </div>

              <div className="flex p-4 bg-white/5 rounded-2xl border border-white/5 items-center gap-4">
                 <Package size={20} className="text-yellow-400" />
                 <div className="flex-1">
                    <span className="text-gray-300 text-xs font-bold block">4 Manifested Units</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-0.5">Fragile/Heavy Load</span>
                 </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button 
                   onClick={() => navigate('/driver/active')}
                   className="flex-3 bg-[#FACC15] hover:bg-yellow-500 text-black font-black uppercase text-xs tracking-[0.15em] py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_10px_20px_rgba(250,204,21,0.2)]"
                 >
                    <Navigation size={18} /> Start Navigation
                 </button>
                 <button className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 flex items-center justify-center transition-all active:scale-95 shadow-xl">
                    <Phone size={20} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* ── 3. Quick Stats Cards ── */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Today's Pay</span>
            <span className="text-2xl font-black text-gray-900">$242.00</span>
            <div className="mt-2 w-full h-1 bg-gray-50 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
            </div>
         </div>
         <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
            <ShieldCheck size={20} className="text-emerald-500 mb-2" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Safety Checked</span>
            <span className="text-[10px] font-black text-emerald-600 mt-0.5">TRK-102 • OK</span>
         </div>
      </div>

      {/* ── 4. Tactical: Up Next ── */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Subsequent Flow</h3>
        <div className="flex flex-col gap-3">
          {upcoming.map((job) => (
            <div key={job.id} onClick={() => navigate('/driver/jobs')} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex items-center justify-between group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 border border-gray-100 group-hover:bg-[#FACC15] group-hover:text-black group-hover:border-transparent transition-colors">
                  <Package size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-gray-900 text-sm tracking-tight truncate">{job.area}</p>
                  <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 mt-1 uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><Clock size={10} /> {job.time}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className="text-blue-500">{job.items} Packages</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Alert Board ── */}
      <div className="bg-red-50 p-4 rounded-3xl border border-red-100 flex items-center gap-4">
         <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 shrink-0">
            <AlertTriangle size={18} className="text-white" />
         </div>
         <div>
            <p className="text-[11px] font-black text-red-900 leading-tight uppercase tracking-tight">Weather Alert: Sydney Heavy Rain</p>
            <p className="text-[9px] font-bold text-red-700 mt-0.5">Expect +15m delay in CBD route.</p>
         </div>
      </div>

    </div>
  );
}
