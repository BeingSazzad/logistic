import React from 'react';
import { 
  Search, MapPin, Phone, Star, AlertCircle, Filter, 
  ArrowDownUp, MessageSquare, Clock, ShieldCheck, 
  ExternalLink, UserCog
} from 'lucide-react';

export default function DispatchDrivers() {
  const drivers = [
    { id: 'DRV-102', name: 'Jack Taylor',   phone: '+61 411 000 001', rank: 'Senior', status: 'On Duty', assigned: 'SHP-20481', rating: 4.8, shift: '06:00 - 18:00', compliance: 'Valid' },
    { id: 'DRV-105', name: 'Liam Smith',   phone: '+61 412 000 002', rank: 'Regular',status: 'On Duty', assigned: 'SHP-20482', rating: 4.5, shift: '06:00 - 18:00', compliance: 'Valid' },
    { id: 'DRV-118', name: 'Noah Williams',    phone: '+61 413 000 003', rank: 'Regular',status: 'Delay Alert', assigned: 'SHP-20483', rating: 4.2, shift: '08:00 - 20:00', compliance: 'Warning' },
    { id: 'DRV-134', name: 'Oliver Brown', phone: '+61 414 000 004', rank: 'Junior', status: 'In Break',  assigned: '-', rating: 4.0, shift: '10:00 - 22:00', compliance: 'Valid' },
    { id: 'DRV-145', name: 'Lucas Jones', phone: '+61 415 000 005', rank: 'Senior', status: 'Off Duty',  assigned: '-', rating: 4.9, shift: 'Night Shift', compliance: 'Valid' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Duty': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Delay Alert': return 'bg-red-50 text-red-600 border-red-100 animate-pulse';
      case 'In Break': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Off Duty': return 'bg-gray-100 text-gray-500 border-transparent opacity-60';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── 1. Dispatch Resource Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <div className="p-2 bg-yellow-400 rounded-xl shadow-sm">
                <UserCog size={24} className="text-black" />
             </div>
             Driver Directory
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Active Fleet Operators • Live Status</p>
        </div>
        <div className="flex gap-2">
           <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm font-bold px-4">
              Export Fleet List
           </button>
        </div>
      </div>

      {/* ── 2. Unified Resource Control ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row justify-between gap-4 items-center bg-gray-50/20">
         <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search driver by name, ID or rank..." className="input pl-9 w-full bg-white border-gray-200" />
         </div>
         <div className="flex gap-2 w-full sm:w-auto">
            <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
              <ArrowDownUp size={14}/> 
              <span className="text-xs font-bold">Sort Status</span>
            </button>
            <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
              <Filter size={14}/> 
              <span className="text-xs font-bold">Filters</span>
            </button>
         </div>
      </div>

      {/* ── 3. High Density Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {drivers.map(drv => (
          <div key={drv.id} className="card bg-white p-6 border border-gray-100 shadow-sm hover:border-[#FACC15] transition-all relative group flex flex-col">
            
            {/* Compliance Badge */}
            <div className={`absolute top-0 right-0 p-2.5 rounded-bl-3xl ${drv.compliance === 'Valid' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500 animate-bounce'}`}>
               {drv.compliance === 'Valid' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
            </div>

            <div className="flex items-start gap-4 mb-6">
               <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-xl font-black text-yellow-400 shadow-xl relative shrink-0">
                  {drv.name.split(' ').map(n=>n[0]).join('')}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${drv.status === 'On Duty' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
               </div>
               <div className="min-w-0 pr-6">
                  <h3 className="font-black text-gray-900 text-lg leading-tight truncate">{drv.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] uppercase font-black tracking-widest text-[#FACC15] bg-gray-900 px-2 py-0.5 rounded shadow-sm">{drv.rank}</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">ID: {drv.id}</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 space-y-3.5 mb-6">
               <div className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-50">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1.5"><Clock size={12}/> Shift</span>
                  <span className="text-xs font-black text-gray-700">{drv.shift}</span>
               </div>
               <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1.5"><MapPin size={12}/> Current Flow</span>
                  <span className={`text-xs font-black ${drv.assigned === '-' ? 'text-gray-300' : 'text-gray-900'}`}>{drv.assigned}</span>
               </div>
               <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1.5"><Star size={12} className="text-yellow-500 fill-yellow-500"/> Performance</span>
                  <span className="text-xs font-black text-yellow-600">{drv.rating} / 5.0</span>
               </div>
            </div>

            <div className="mt-auto space-y-3">
               <div className={`w-full text-center py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${getStatusColor(drv.status)}`}>
                  {drv.status}
               </div>

               <div className="flex gap-2">
                  <button className="flex-1 bg-gray-900 hover:bg-black text-white p-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                     <MessageSquare size={16} /> <span className="text-xs font-black uppercase tracking-widest">Chat</span>
                  </button>
                  <button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 p-3 rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                     <Phone size={16} /> <span className="text-xs font-black uppercase tracking-widest">Call</span>
                  </button>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center">
                     <ExternalLink size={18} />
                  </button>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
