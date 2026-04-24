import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone, Map,
  Navigation, CheckCircle2,
  Camera, Clock, ShieldAlert, ShieldCheck,
  AlertTriangle, X, ChevronRight, Lock, CheckSquare, Square, CreditCard, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simulated checklist from Admin — in production this comes from the API
const PRE_TRIP_CHECKLIST = [
  { id: 1, label: 'Tyres inspected — pressure and tread OK', type: 'checkbox', required: true, done: false },
  { id: 2, label: 'Headlights, indicators and brake lights functional', type: 'checkbox', required: true, done: false },
  { id: 3, label: 'Fuel level above 25%', type: 'checkbox', required: true, done: false },
  { id: 4, label: 'Mirrors adjusted and clean', type: 'checkbox', required: true, done: false },
  { id: 5, label: 'Odometer reading at trip start', type: 'number', required: true, done: false, value: '' },
  { id: 6, label: 'Vehicle exterior photo (front & rear)', type: 'photo', required: false, done: false },
];

const GLOBAL_CHECKLIST_MODE = 'Flexible'; // Admin configuration ('Strict' | 'Flexible')

export default function ActiveTrip() {
  const navigate = useNavigate();

  // Gate: 'EnRoute' → 'Arrived' → 'Unloading' → 'Finalizing'
  const [step, setStep] = useState('EnRoute');
  const [waitTime, setWaitTime] = useState(0);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (step === 'Arrived') {
      interval = setInterval(() => setWaitTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Checklist state removed — now handled via Home screen or dedicated flow
  const [checklistDone, setChecklistDone] = useState(true);

  // ── ACTIVE TRIP VIEW ──────────────────────────────────────────
  return (
    <div className="flex flex-col bg-[#F8FAFC] min-h-screen w-full max-w-[480px] mx-auto relative">

      {/* ── Navigation HUD (Extreme Focus Mode) ── */}
      <div className="h-[360px] bg-[#111] relative overflow-hidden shrink-0 pt-10">
         {/* Floating Exit Button */}
         <button 
            onClick={() => navigate('/driver')}
            className="absolute top-4 right-4 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white z-50 hover:bg-black/60 active:scale-95 transition-all shadow-2xl"
         >
            <X size={24} />
         </button>
         {/* Map Background Simulation */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#FFCC0022_0%,transparent_70%)] pointer-events-none"></div>
         
         {/* Instruction HUD */}
         <div className="absolute inset-x-4 top-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl z-20">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-[#FFCC00] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FFCC00]/20 shrink-0">
                  <Navigation size={28} className="text-[#111] -rotate-45" />
               </div>
               <div className="flex flex-col justify-center">
                  <p className="text-[#FFCC00] text-xs font-bold uppercase tracking-[0.2em] leading-none mb-1">In 800 Meters</p>
                  <h2 className="text-white text-base font-bold leading-none">Turn Right onto York Street</h2>
               </div>
            </div>
         </div>

         {/* Vehicle Marker */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
               <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center shadow-[0_0_30px_#FFCC00] animate-pulse">
                  <div className="w-4 h-4 bg-[#111] rounded-sm transform rotate-45"></div>
               </div>
               <div className="absolute -inset-10 border border-[#FFCC00]/10 rounded-full animate-ping"></div>
            </div>
         </div>

         {/* Map Overlay Controls */}
         <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="w-12 h-12 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-xl">+</button>
            <button className="w-12 h-12 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-xl">-</button>
         </div>
      </div>

      <div className="px-4 pb-20 space-y-4 -mt-10 relative z-30">
        
        {/* Main action card */}
        <div className="bg-white rounded-[2rem] p-6 pb-10 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
           <div className="space-y-4 w-full mb-6">
              {/* Header Section */}
              <div className="flex flex-col items-center">
                 <div className="flex flex-col items-center leading-none">
                    <p className="hero-metadata">Next Milestone</p>
                    <div className="flex items-center gap-1 mt-1">
                       <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></div>
                       <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">Priority Asset</span>
                    </div>
                 </div>
                 <h2 className="text-xl font-semibold text-gray-900 leading-tight mt-2 uppercase tracking-tight">SYD CBD Terminal</h2>
                 <p className="text-xs font-semibold text-gray-400 mt-1.5 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                    <MapPin size={12} className="text-red-500" /> 127 York St, Sydney NSW 2000
                 </p>
              </div>

              {/* Telemetry Strip - Centered and Fixed Layout */}
              <div className="bg-[#111] rounded-2xl p-4 flex items-center justify-between shadow-xl border border-white/5">
                 <div className="flex flex-col items-center flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Distance</p>
                    <div className="flex items-baseline gap-0.5">
                       <span className="text-lg font-semibold text-white">1.2</span>
                       <span className="text-xs font-semibold text-gray-500 uppercase">km</span>
                    </div>
                 </div>
                 
                 <div className="w-px h-6 bg-white/5 mx-1"></div>
                 
                 <div className="flex flex-col items-center flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">EST. Time</p>
                    <div className="flex items-baseline gap-0.5">
                       <span className="text-lg font-semibold text-white">08</span>
                       <span className="text-xs font-semibold text-gray-500 uppercase">min</span>
                    </div>
                 </div>
                 
                 <div className="w-px h-6 bg-white/5 mx-1"></div>
                 
                 <div className="flex flex-col items-center flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Schedule</p>
                    <div className="flex items-baseline gap-0.5">
                       <span className="text-lg font-semibold text-white">08:00</span>
                       <span className="text-xs font-semibold text-gray-500 uppercase">am</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="w-full space-y-4">
            {step === 'EnRoute' && (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep('Arrived')}
                  className="w-full bg-[#161B22] hover:bg-black text-[#FFCC00] font-semibold uppercase text-sm py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl"
                >
                  <CheckCircle2 size={20} /> Confirm Arrival
                </button>
                <div className="flex gap-3">
                   <button className="flex-1 items-center justify-center py-4 bg-white border border-gray-100 text-gray-600 font-bold text-xs rounded-2xl flex flex-col gap-1.5 shadow-sm active:scale-95 transition-all">
                      <Phone size={18} className="text-gray-400"/> Call Site
                   </button>
                   <button className="flex-1 items-center justify-center py-4 bg-white border border-gray-100 text-[#FF6B00] font-bold text-xs rounded-2xl flex flex-col gap-1.5 shadow-sm active:scale-95 transition-all">
                      <AlertTriangle size={18} className="text-[#FF6B00]/40"/> Delay
                   </button>
                </div>
              </div>
            )}

            {step === 'Arrived' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-900 p-8 rounded-3xl border border-emerald-100 flex flex-col items-center">
                   <p className="text-xs font-semibold text-emerald-600 uppercase mb-2 font-mono">Gate Wait Timer</p>
                   <p className="text-5xl font-semibold tracking-tighter tabular-nums">{formatTime(waitTime)}</p>
                </div>
                <button
                  onClick={() => setStep('Unloading')}
                  className="w-full bg-[#111] hover:bg-black text-[#FFCC00] font-semibold uppercase text-sm py-6 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl"
                >
                  <Navigation size={18} /> Start Unloading
                </button>
              </div>
            )}

            {step === 'Unloading' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center gap-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                      <Camera size={20} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">Photo Proof</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                      <CheckSquare size={20} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">Signature</span>
                  </button>
                </div>
                <button
                  onClick={() => setStep('Finalizing')}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                >
                  Complete &amp; Upload
                </button>
              </div>
            )}

            {step === 'Finalizing' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                 <h2 className="text-xl font-bold text-gray-900">Delivery Complete</h2>
                 <p className="text-xs font-semibold text-gray-500 mt-2 mb-6 leading-relaxed">Evidence and signatures successfully synced.</p>
                 <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() => navigate('/driver/pay')}
                      className="w-full bg-orange-50 text-orange-600 font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm border border-orange-100 whitespace-nowrap"
                    >
                      <CreditCard size={18} /> Log Trip Tolls / Expenses
                    </button>
                    <button
                      onClick={() => navigate('/driver')}
                      className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm whitespace-nowrap"
                    >
                      Back to Dashboard
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Shift Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800">Shift Summary</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Online</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Time Driven</p>
              <p className="text-lg font-bold text-gray-900">0h 12m</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Duty Left</p>
              <p className="text-lg font-bold text-[#FACC15]">11h 48m</p>
            </div>
          </div>
        </div>

        {/* Route Stops */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-5">Route Stops</h3>
          <div className="space-y-6 relative">
            <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-gray-100"></div>

            <div className="flex items-center gap-4 relative">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 outline outline-4 outline-white shadow-sm shrink-0 z-10"></div>
              <div>
                <p className="text-sm font-semibold text-gray-400 line-through">Pre-Trip Safety Check</p>
                <p className="text-xs font-medium text-emerald-600 mt-0.5 flex items-center gap-1"><ShieldCheck size={10} /> Passed · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className={`w-2.5 h-2.5 rounded-full outline outline-4 outline-white shadow-sm shrink-0 z-10 ${step === 'Finalizing' ? 'bg-emerald-500' : 'bg-[#FACC15] animate-pulse'}`}></div>
              <div>
                <p className={`text-sm font-semibold ${step === 'Finalizing' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>Pickup #1 · York St</p>
                {step !== 'Finalizing' && <p className="text-xs font-medium text-amber-600 mt-0.5 flex items-center gap-1"><Clock size={10} /> In Progress</p>}
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-200 outline outline-4 outline-white shadow-sm shrink-0 z-10"></div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Final Stop · Warehouse SYD</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



