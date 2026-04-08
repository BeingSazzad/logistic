import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, MessageSquare, AlertTriangle, 
  Navigation, CheckCircle2, XCircle, Camera, 
  Signature, Clock, ChevronRight, ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActiveTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState('EnRoute'); // EnRoute, Arrived, Unloading, Finalizing
  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    let interval;
    if (step === 'Arrived') {
      interval = setInterval(() => setWaitTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20 max-w-md mx-auto relative">
      
      {/* ── 1. Tactical HUD Header ── */}
      <div className="bg-gray-900 px-6 py-5 flex items-center justify-between text-white sticky top-0 z-50 shadow-2xl border-b border-white/5">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Navigation size={20} className="text-yellow-400" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Active Manifest</p>
              <h1 className="text-lg font-black tracking-tight leading-none uppercase">SHP-20481</h1>
           </div>
        </div>
        <button className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center border border-red-500/20 active:scale-90 transition-transform">
           <ShieldAlert size={22} className="animate-pulse" />
        </button>
      </div>

      <div className="p-5 space-y-6">
        
        {/* ── 2. The Focus: Flow Control ── */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col gap-8 relative overflow-hidden">
           
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Point</span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter leading-tight">127 York St, Sydney CBD</h2>
              <p className="text-xs font-bold text-gray-500 mt-1 flex items-center gap-1.5"><MapPin size={14} className="text-blue-500"/> Level 4 • John Smith (Manager)</p>
           </div>

           <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Range</p>
                 <p className="font-black text-gray-900 text-lg">2.4<span className="text-[10px] ml-0.5">KM</span></p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-3 text-center border border-yellow-100 shadow-sm shadow-yellow-400/5">
                 <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">Impact</p>
                 <p className="font-black text-yellow-700 text-lg">07:35</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Window</p>
                 <p className="font-black text-gray-900 text-lg">08:00</p>
              </div>
           </div>

           {/* Dynamic Action Zone */}
           <div className="mt-4">
              {step === 'EnRoute' && (
                <div className="flex gap-3">
                   <button 
                     onClick={() => setStep('Arrived')}
                     className="flex-5 bg-gray-900 hover:bg-black text-[#FACC15] font-black uppercase text-xs tracking-[0.2em] py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl"
                   >
                      <CheckCircle2 size={18} /> Confirm Arrival
                   </button>
                   <button className="flex-1 bg-white border-2 border-gray-100 text-gray-400 rounded-3xl flex items-center justify-center active:scale-95 transition-all">
                      <Phone size={20} />
                   </button>
                </div>
              )}

              {step === 'Arrived' && (
                <div className="space-y-4">
                   <div className="bg-emerald-50 text-emerald-700 px-6 py-5 rounded-3xl border border-emerald-100 flex items-center justify-between shadow-sm animate-in fade-in zoom-in-95 duration-300">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest mb-1">Stationary Timer</p>
                         <p className="text-2xl font-black">{formatTime(waitTime)}s</p>
                      </div>
                      <CheckCircle2 size={32} className="opacity-40" />
                   </div>
                   <button 
                     onClick={() => setStep('Unloading')}
                     className="w-full bg-[#FACC15] hover:bg-yellow-500 text-black font-black uppercase text-xs tracking-[0.2em] py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
                   >
                      Start Manifest Process
                   </button>
                </div>
              )}

              {step === 'Unloading' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-300">
                   <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-50 transition-colors group">
                         <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform"><Camera size={24}/></div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Capture Proof</span>
                      </button>
                      <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-50 transition-colors group">
                         <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform"><Signature size={24}/></div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Sign Proof</span>
                      </button>
                   </div>
                   <button 
                     onClick={() => setStep('Finalizing')}
                     className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
                   >
                      Complete & Upload
                   </button>
                </div>
              )}

              {step === 'Finalizing' && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-2 border-emerald-50">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Manifest Finalized</h2>
                   <p className="text-xs font-bold text-gray-500 mt-2 mb-8 px-6 uppercase tracking-widest">Metadata, Photos, and Signatures have been synced to the Central Hub.</p>
                   <button 
                     onClick={() => navigate('/driver')}
                     className="w-full bg-gray-900 hover:bg-black text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
                   >
                      Resume Route Control
                   </button>
                </div>
              )}
           </div>
        </div>

        {/* ── 3. Critical: Duty Logic ── */}
        <div className="bg-gray-100 rounded-[2.5rem] p-6 flex flex-col gap-4 border border-gray-200/50">
           <div className="flex justify-between items-center px-2">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Duty Manifest Summary</h3>
              <span className="text-[10px] font-black text-emerald-600 bg-white px-3 py-1 rounded-full shadow-sm">Online</span>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200/40">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Time Driven</p>
                 <p className="text-xl font-black text-gray-900 tracking-tight">0h 12m</p>
              </div>
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200/40">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Duty Left</p>
                 <p className="text-xl font-black text-[#FACC15] tracking-tight">11h 48m</p>
              </div>
           </div>
        </div>

        {/* ── 4. Strategic: Flow Trace ── */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Node Sequence</h3>
           <div className="space-y-10 relative">
              <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-gray-100"></div>
              
              <div className="flex items-center gap-6 relative">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 outline outline-4 outline-white shadow-sm shrink-0 z-10"></div>
                 <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest line-through">Safety Protocol Alpha</p>
                    <p className="text-[10px] font-black text-emerald-600 mt-1 uppercase">Completed 07:15</p>
                 </div>
              </div>

              <div className="flex items-center gap-6 relative">
                 <div className={`w-2.5 h-2.5 rounded-full outline outline-4 outline-white shadow-sm shrink-0 z-10 ${step === 'Finalizing' ? 'bg-emerald-500' : 'bg-[#FACC15] animate-pulse'}`}></div>
                 <div>
                    <p className={`text-xs font-black uppercase tracking-widest ${step === 'Finalizing' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>Pickup #1 • York St</p>
                    {step !== 'Finalizing' && <p className="text-[10px] font-black text-yellow-600 mt-1 uppercase tracking-widest flex items-center gap-1.5"><Clock size={10}/> In Progress</p>}
                 </div>
              </div>

              <div className="flex items-center gap-6 relative">
                 <div className="w-2.5 h-2.5 rounded-full bg-gray-200 outline outline-4 outline-white shadow-sm shrink-0 z-10"></div>
                 <div>
                    <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Final Node • Warehouse-SYD</p>
                 </div>
              </div>

           </div>
        </div>

      </div>

    </div>
  );
}
