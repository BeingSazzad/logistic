import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   MapPin, Navigation, Phone, Clock, Package, Search,
   CheckCircle2, Bell, User, Zap, AlertTriangle, ShieldCheck, ChevronRight, RefreshCw
} from 'lucide-react';

export default function DriverHome() {
   const navigate = useNavigate();
   const [isOnline, setIsOnline] = useState(true);
   const [searchQuery, setSearchQuery] = useState('');

   const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         // Navigate to job detail if search matches pattern
         navigate(`/driver/shipments/${searchQuery.trim()}`);
      }
   };

   const upcoming = [
      { id: 'SHP-20502', area: 'Parramatta, NSW', time: '11:45 AM', items: 3, priority: 'Normal' },
      { id: 'SHP-20503', area: 'Chatswood, NSW', time: '1:15 PM', items: 7, priority: 'High' },
   ];

   return (
      <div className="p-5 flex flex-col gap-6 max-w-md mx-auto min-h-screen bg-gray-50 pb-24">

         {/* ── 0. Global Standard Search ── */}
         <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
               <Search size={18} className="text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
            </div>
            <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Check Job ID Globally..."
               className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all placeholder:text-gray-300"
            />
         </form>

         {/* ── 动态状态栏 (Dynamic Status Bar) ── */}
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

         {/* ── 2. NEW: The Live Map Preview Card ── */}
         <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group cursor-pointer" onClick={() => navigate('/driver/active')}>
            <div className="h-44 relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/map.png')` }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-[#FACC15] flex items-center justify-center text-black shadow-lg">
                        <Navigation size={14} className="animate-pulse" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Next Station</p>
                        <p className="text-sm font-bold text-white mt-1">14 George Street, Sydney</p>
                     </div>
                  </div>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-widest">Live Map</span>
               </div>
            </div>
            <div className="p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                     <Clock size={16} className="text-gray-400" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-gray-900 leading-none">ETA: 10:30 AM</p>
                     <p className="text-[10px] font-medium text-gray-400 mt-1">Distance: 2.4 KM</p>
                  </div>
               </div>
               <button className="bg-gray-900 text-[#FACC15] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all">Start Navigation</button>
            </div>
         </div>

         {/* ── 3. The Hero: Active Manifest (Refined) ── */}
         <div className="bg-[#111] rounded-3xl overflow-hidden shadow-xl relative border border-gray-800">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                     <h2 className="text-xl font-bold text-white tracking-tight">Acme Distribution</h2>
                     <p className="text-gray-400 text-xs font-medium">SHP-20481 • SYDNEY_B2B</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                     <span className="text-[9px] font-bold uppercase tracking-widest">In Transit</span>
                  </div>
               </div>

               <div className="flex p-3 bg-white/5 rounded-xl border border-white/5 items-center gap-3">
                  <Package size={18} className="text-[#FACC15]" />
                  <div className="flex-1">
                     <span className="text-white text-xs font-semibold block">4 Manifested Units</span>
                     <span className="text-[10px] font-medium text-gray-400 mt-0.5 block">Fragile/Heavy Load</span>
                  </div>
               </div>
            </div>
         </div>

         {/* ── 4. MANDATORY: Safety & Sync ── */}
         <div className="flex flex-col gap-3">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-100 flex items-center justify-between group cursor-pointer hover:bg-orange-50 transition-colors" onClick={() => navigate('/driver/safety-check')}>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center relative">
                     <ShieldCheck size={24} className="text-orange-500" />
                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] font-black text-white">!</span>
                     </span>
                  </div>
                  <div className="text-left">
                     <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block">Safety Checklist</span>
                     <span className="text-sm font-bold text-gray-900 leading-tight block mt-0.5">Pre-Trip Inspection</span>
                     <p className="text-[10px] font-medium text-orange-400 mt-1 uppercase tracking-widest font-black">Action Required</p>
                  </div>
               </div>
               <button className="bg-orange-500 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Start Check</button>
            </div>
         </div>

         <div className="bg-white p-5 rounded-3xl shadow-[0_0_15px_-3px_rgba(249,115,22,0.15)] border border-orange-100 flex items-center justify-between group cursor-pointer hover:bg-orange-50/50 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center relative">
                  <RefreshCw size={18} className="text-orange-500" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
               </div>
               <div className="text-left">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">Sync Queue</span>
                  <span className="text-sm font-bold text-gray-900 leading-tight block mt-0.5">3 Items Pending</span>
               </div>
            </div>
            <button className="text-[10px] font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200 transition-all uppercase tracking-widest shadow-sm">Sync Now</button>
         </div>

         {/* ── 5. Tactical: Up Next ── */}
         <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800 ml-1">Upcoming Jobs</h3>
            <div className="flex flex-col gap-3">
               {upcoming.map((job) => (
                  <div key={job.id} onClick={() => navigate('/driver/shipments')} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
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

         {/* ── 6. Alert Board ── */}
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
