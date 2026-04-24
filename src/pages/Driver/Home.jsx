import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   MapPin, Navigation, Phone, Clock, Package, Search,
   CheckCircle2, Bell, User, Zap, AlertTriangle, ShieldCheck, ShieldAlert,
   ChevronRight, RefreshCw, Smartphone, LifeBuoy
} from 'lucide-react';

export default function DriverHome() {
   const navigate = useNavigate();
   const [isOnline, setIsOnline] = useState(true);

   const upcoming = [
      { id: 'SHP-20502', area: 'Parramatta, NSW', time: '11:45 AM', items: 3, priority: 'Express' },
      { id: 'SHP-20503', area: 'Chatswood, NSW', time: '1:15 PM', items: 7, priority: 'Direct' },
   ];

   return (
      <div className="flex flex-col gap-5 w-full max-w-[480px] mx-auto min-h-screen bg-gray-50 pb-24 p-5">

         {/* ── 1. Operator Status HUD ── */}
         <div className="flex justify-between items-center bg-[#111] p-4 rounded-3xl shadow-xl border border-white/5">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#FFCC00] border-2 border-white/10 flex items-center justify-center font-black text-black text-xl shadow-inner">
                  JT
               </div>
               <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest leading-none">Primary Operator</p>
                  <p className="text-sm font-black text-white mt-1 uppercase">Jack Taylor</p>
                  <div className="flex items-center gap-1.5 mt-1">
                     <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`}></div>
                     <span className={`text-xs font-black uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-gray-500'}`}>{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={() => setIsOnline(!isOnline)} className={`p-3 rounded-2xl transition-all ${isOnline ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-400'}`}>
                  <Zap size={20} className={isOnline ? 'fill-emerald-500' : ''} />
               </button>
            </div>
         </div>

         {/* ── 2. Mission Center (High-Visibility Controls) ── */}
         <div className="grid grid-cols-2 gap-4">
            <button 
               onClick={() => navigate('/driver/safety-check')} 
               className="bg-white hover:bg-gray-50 text-gray-900 px-5 py-6 rounded-[2rem] shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-3 border border-gray-100"
            >
               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 text-emerald-600">
                  <ShieldCheck size={28} />
               </div>
               <span className="text-xs font-black uppercase tracking-tight text-center">Compliance</span>
            </button>
            <button 
               onClick={() => navigate('/driver/active')} 
               className="bg-[#FFCC00] hover:bg-yellow-500 text-black px-5 py-6 rounded-[2rem] shadow-xl active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-3 border border-yellow-400"
            >
               <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Navigation size={28} className="text-black" />
               </div>
               <span className="text-xs font-black uppercase tracking-tight text-center">Route</span>
            </button>
            <button 
               onClick={() => navigate('/driver/draft')} 
               className="col-span-2 bg-blue-50 hover:bg-blue-100 text-blue-900 p-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all flex items-center gap-4 border border-blue-100"
            >
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Package size={24} className="text-blue-600" />
               </div>
               <div className="text-left flex-1">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-blue-500 mb-0.5">Quick Action</span>
                  <span className="block text-sm font-black uppercase tracking-tight text-blue-900">Create Draft Load</span>
               </div>
               <ChevronRight size={20} className="text-blue-300" />
            </button>
         </div>

         {/* ── 3. Emergency Dispatch Action ── */}
         <button onClick={() => navigate('/driver/incident')} className="bg-red-50 hover:bg-red-100 p-4 rounded-2xl border border-red-100 flex items-center justify-between group transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <ShieldAlert size={20} fill="currentColor" className="opacity-20" />
                  <ShieldAlert size={20} className="absolute" />
               </div>
               <div className="text-left">
                  <p className="text-xs font-black text-red-600 uppercase tracking-widest leading-none">Emergency Protocol</p>
                  <p className="text-xs font-black text-red-900 uppercase mt-1">Report Incident / Breakdown</p>
               </div>
            </div>
            <ChevronRight size={18} className="text-red-300" />
         </button>

         {/* ── 4. Strategic: Up Next ── */}
         <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Operational Schedule</h3>
               <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest">2 jobs today</span>
            </div>
            
            <div className="flex flex-col gap-3">
               {upcoming.map((job) => (
                  <div key={job.id} onClick={() => navigate('/driver/loads')} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
                     <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 border border-gray-100 group-hover:bg-[#FFCC00] group-hover:text-black group-hover:border-transparent transition-all">
                           <Package size={22} />
                        </div>
                        <div className="min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase tracking-tighter">{job.priority}</span>
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{job.id}</span>
                           </div>
                           <p className="font-black text-gray-900 text-sm tracking-tight truncate leading-none uppercase">{job.area}</p>
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mt-2 uppercase">
                              <span className="flex items-center gap-1 leading-none"><Clock size={12} /> {job.time}</span>
                           </div>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* ── 5. System Bulletin ── */}
         <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-center gap-4 mt-auto">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
               <AlertTriangle size={20} className="text-blue-600" />
            </div>
            <div>
               <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Operational Alert</p>
               <p className="text-xs font-bold text-blue-900 mt-1 leading-tight">Sydney Heavy Rain: Expect +15m delay in CBD route.</p>
            </div>
         </div>

      </div>
   );
}

