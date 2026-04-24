import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, 
  ChevronRight, Camera, ArrowLeft, 
  Truck, Thermometer, Droplets, Zap
} from 'lucide-react';

export default function SafetyCheck() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    tires: false,
    lights: false,
    brakes: false,
    fuel: false,
    cabin: false,
    cargo: false,
  });

  const items = [
    { id: 'tires',   label: 'Tires & Wheels', icon: Truck,       desc: 'Pressure & tread depth OK' },
    { id: 'lights',  label: 'Lights & Signals', icon: Zap,         desc: 'Headlights, brake & indicators' },
    { id: 'brakes',  label: 'Braking System',  icon: ShieldCheck, desc: 'Fluid levels & pad response' },
    { id: 'fuel',    label: 'Fluid Levels',    icon: Droplets,    desc: 'Oil, Coolant & Diesel OK' },
    { id: 'cabin',   label: 'Cabin Safety',    icon: Thermometer, desc: 'Dash alerts & mirrors clear' },
    { id: 'cargo',   label: 'Load Security',   icon: CheckCircle2, desc: 'Straps & locks engaged' },
  ];

  const allDone = Object.values(checks).every(v => v);

  const toggleCheck = (id) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24">
      {/* ── Header ── */}
      <div className="bg-[#111] px-5 py-6 sticky top-0 z-10 flex items-center gap-4 shadow-xl">
        <button onClick={() => navigate('/driver')} className="text-white hover:bg-white/10 p-2 -ml-2 transition-all rounded-xl">
           <ArrowLeft size={24} />
        </button>
        <div>
           <h1 className="text-white font-semibold text-lg tracking-tight uppercase leading-none">Vehicle Compliance</h1>
           <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Pre-Trip Safety Checklist</p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6">
        
        {/* ── Vehicle Info ── */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-yellow-400 shrink-0 shadow-inner">
                 <Truck size={24} />
              </div>
              <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Vehicle</p>
                 <h2 className="text-lg font-bold text-gray-900 leading-tight">SYD-TRK-102</h2>
              </div>
           </div>
           <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
              <Camera size={18} />
           </button>
        </div>

        {/* ── Checklist Items ── */}
        <div className="flex flex-col gap-3">
           <h3 className="text-sm font-bold text-gray-900 ml-1 mb-1">Standard Checklist</h3>
           {items.map((item) => (
             <button 
               key={item.id}
               onClick={() => toggleCheck(item.id)}
               className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${checks[item.id] ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-gray-100 shadow-sm'}`}
             >
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${checks[item.id] ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                      <item.icon size={20} />
                   </div>
                   <div className="text-left">
                      <p className={`text-sm font-bold ${checks[item.id] ? 'text-emerald-900' : 'text-gray-900'}`}>{item.label}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{item.desc}</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checks[item.id] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-200'}`}>
                   {checks[item.id] && <CheckCircle2 size={14} className="text-white" />}
                </div>
             </button>
           ))}
        </div>

        {/* ── Submit Button ── */}
        <div className="mt-4">
           {!allDone && (
             <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2">
                <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                <p className="text-xs font-bold text-amber-700 leading-tight">Please complete all 6 safety checks before proceeding to navigation.</p>
             </div>
           )}
           <button 
             disabled={!allDone}
             onClick={() => navigate('/driver')}
             className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${allDone ? 'bg-gray-900 text-yellow-400 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
           >
              <ShieldCheck size={20} />
              Confirm Vehicle Status
           </button>
        </div>

      </div>
    </div>
  );
}



