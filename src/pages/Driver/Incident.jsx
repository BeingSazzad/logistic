import React, { useState } from 'react';
import { 
  AlertTriangle, Camera, MapPin, Phone, 
  ShieldAlert, Send, ArrowLeft, CheckCircle2,
  Clock, Info, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverIncident() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // 'form' | 'success'

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24 w-full max-w-[480px] mx-auto overflow-x-hidden">
      
      {/* ── Header ── */}
      <div className="bg-red-600 px-5 py-6 sticky top-0 z-10 flex items-center gap-4 shadow-xl">
        <button onClick={() => navigate(-1)} className="text-white hover:bg-white/10 p-2 -ml-2 transition-all rounded-xl">
           <ArrowLeft size={24} />
        </button>
        <div>
           <h1 className="text-white font-semibold text-lg tracking-tight uppercase leading-none">Emergency Protocol</h1>
           <p className="text-xs font-semibold text-red-100 uppercase tracking-widest mt-1">Incident & Breakdown Response</p>
        </div>
      </div>

      {step === 'form' ? (
        <div className="p-5 flex flex-col gap-6 animate-in fade-in duration-300">
           
           <div className="bg-red-50 border border-red-100 rounded-3xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                 <Info size={20} className="text-red-600" />
              </div>
              <div>
                 <p className="text-xs font-semibold text-red-900 uppercase tracking-widest leading-tight">Critical Protocol</p>
                 <p className="text-xs text-red-700 mt-1 font-bold leading-relaxed">If there are injuries, call 000 immediately before completing this form.</p>
              </div>
           </div>

           <div className="space-y-6">
              
              <div>
                 <label className="hero-metadata block mb-2 px-1">Incident Type</label>
                 <select className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all shadow-sm appearance-none">
                    <option>Vehicle Collision (Major)</option>
                    <option>Minor Scratch / Dent</option>
                    <option>Cargo Damage</option>
                    <option>Break-in / Theft</option>
                    <option>Mechanical Failure (Breakdown)</option>
                    <option>Personal Injury</option>
                 </select>
              </div>

              <div>
                 <label className="hero-metadata block mb-2 px-1">Location Details</label>
                 <div className="relative">
                    <input type="text" placeholder="Fetching current GPS..." className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl text-sm font-bold focus:outline-none shadow-sm" />
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                 </div>
              </div>

              <div>
                 <label className="hero-metadata block mb-2 px-1">Description of Events</label>
                 <textarea 
                    placeholder="Describe exactly what happened..." 
                    className="w-full min-h-[120px] bg-white border border-gray-100 py-4 px-5 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all shadow-sm resize-none"
                 />
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-3xl gap-2 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
                    <Camera size={24} className="text-gray-400" />
                    <span className="text-xs font-semibold uppercase text-gray-400 tracking-widest">Add Photos</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-3xl gap-2 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
                    <Phone size={24} className="text-gray-400" />
                    <span className="text-xs font-semibold uppercase text-gray-400 tracking-widest">Call Dispatch</span>
                 </button>
              </div>

              <button 
                 onClick={() => setStep('success')}
                 className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-semibold uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
              >
                 <Send size={16}/> Submit Incident Report
              </button>
           </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-in zoom-in-95 duration-300">
           <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 size={48} strokeWidth={2.5}/>
           </div>
           <h2 className="text-2xl font-semibold text-gray-900 uppercase tracking-tight">Report Received</h2>
           <p className="text-sm font-bold text-gray-500 mt-3 leading-relaxed">Dispatch has been alerted. An emergency safety coordinator will contact you shortly.</p>
           
           <div className="mt-10 p-5 bg-white border border-gray-100 rounded-3xl w-full flex items-center gap-4 text-left">
              <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                 <Clock size={20} className="text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-emerald-900 uppercase leading-snug">Safety Checklist: Turn on hazards and move to a safe zone if possible.</p>
           </div>

           <button 
             onClick={() => navigate('/driver')}
             className="mt-10 px-10 py-4 bg-[#111] text-white rounded-2xl font-semibold uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
           >
             Return to Home
           </button>
        </div>
      )}

    </div>
  );
}


