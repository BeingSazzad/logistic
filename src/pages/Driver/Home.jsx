import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Navigation, Phone, Clock, Package, 
  CheckCircle2, Bell, User, Zap, AlertTriangle, ShieldCheck, ChevronRight
} from 'lucide-react';

export default function DriverHome() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const upcoming = [
    { id: 'SHP-20502', area: 'Parramatta, NSW', time: '11:45 AM', items: 3, priority: 'Normal' },
    { id: 'SHP-20503', area: 'Chatswood, NSW',  time: '1:15 PM',  items: 7, priority: 'High' },
  ];

  return (
    <div className="p-5 flex flex-col gap-6 max-w-md mx-auto min-h-screen bg-gray-50 pb-24">

      {/* ── 1. Dynamic Status Bar ── */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
               <User size={20} className="text-gray-500" />
            </div>
            <div>
               <p className="text-xs text-gray-500 font-medium">Operator</p>
               <p className="text-sm font-bold text-gray-900 leading-none mt-0.5">Jack Taylor</p>
            </div>
         </div>
         <button 
           onClick={() => setIsOnline(!isOnline)}
           className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all outline-none ${isOnline ? 'bg-emerald-500 text-white shadow-sm' : 'bg-gray-100 text-gray-500'}`}
         >
            <Zap size={14} className={isOnline ? 'fill-white' : ''} />
            <span>{isOnline ? 'Online' : 'Offline'}</span>
         </button>
      </div>

      {/* ── 2. The Hero: Active Manifest ── */}
      <div className="bg-[#111] rounded-3xl overflow-hidden shadow-xl relative border border-gray-800">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#FACC15] opacity-5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-6 relative z-10">
           <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse"></span>
                    <span className="text-[#FACC15] text-[10px] font-bold uppercase tracking-wider">Active Route</span>
                 </div>
                 <h2 className="text-xl font-bold text-white tracking-tight">Acme Distribution</h2>
                 <p className="text-gray-400 text-xs font-medium">SHP-20481 • SYDNEY_B2B</p>
              </div>
              <div className="bg-white/10 px-3 py-2 rounded-xl text-center">
                 <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider block mb-0.5">ETA</span>
                 <span className="text-lg font-bold text-white leading-none">10:30</span>
                 <span className="text-[9px] font-bold text-gray-400 uppercase block mt-0.5">AM</span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-start gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gray-400" />
                 </div>
                 <div>
                    <p className="text-white text-sm font-semibold leading-tight">14 George Street, Level 4</p>
                    <p className="text-gray-400 text-xs font-medium mt-1">Sydney CBD • 2.4 KM</p>
                 </div>
              </div>

              <div className="flex p-3 bg-white/5 rounded-xl border border-white/5 items-center gap-3">
                 <Package size={18} className="text-[#FACC15]" />
                 <div className="flex-1">
                    <span className="text-white text-xs font-semibold block">4 Manifested Units</span>
                    <span className="text-[10px] font-medium text-gray-400 mt-0.5 block">Fragile/Heavy Load</span>
                 </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button 
                   onClick={() => navigate('/driver/active')}
                   className="flex-[3] w-full bg-[#FACC15] hover:bg-yellow-500 text-black font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                 >
                    <Navigation size={16} /> Start Navigation
                 </button>
                 <button className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-all active:scale-95">
                    <Phone size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* ── 3. Quick Stats Cards ── */}
      <div className="grid grid-cols-1 gap-4">
         {/* Hidden: Drivers are on fixed salary, uncomment if piece-rate/commission is enabled later
         <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Today's Pay</span>
            <span className="text-2xl font-black text-gray-900">$242.00</span>
            <div className="mt-2 w-full h-1 bg-gray-50 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
            </div>
         </div>
         */}
         <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/driver/safety-check')}>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                  <ShieldCheck size={20} className="text-emerald-500" />
               </div>
               <div className="text-left">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Vehicle Status</span>
                  <span className="text-sm font-bold text-gray-900 leading-tight block mt-0.5">Safety Checked</span>
               </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">TRK-102 • OK</span>
         </div>
      </div>

      {/* ── 4. Tactical: Up Next ── */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-800 ml-1">Upcoming Jobs</h3>
        <div className="flex flex-col gap-3">
          {upcoming.map((job) => (
            <div key={job.id} onClick={() => navigate('/driver/jobs')} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100 group-hover:bg-[#FACC15] group-hover:text-black group-hover:border-transparent transition-colors">
                  <Package size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm tracking-tight truncate">{job.area}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.time}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-gray-600">{job.items} Packages</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Alert Board ── */}
      <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-4 mt-2">
         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-red-600" />
         </div>
         <div>
            <p className="text-xs font-bold text-red-900 leading-tight">Sydney Heavy Rain</p>
            <p className="text-xs text-red-700 mt-0.5 font-medium">Expect +15m delay in CBD route.</p>
         </div>
      </div>

    </div>
  );
}
