import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone,
  Navigation, CheckCircle2,
  Camera, Clock, ShieldAlert, ShieldCheck,
  AlertTriangle, X, ChevronRight, Lock, CheckSquare, Square
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

export default function ActiveTrip() {
  const navigate = useNavigate();

  // Gate: 'checklist' (pre-trip lock) → 'EnRoute' → 'Arrived' → 'Unloading' → 'Finalizing'
  const [step, setStep] = useState('checklist');
  const [waitTime, setWaitTime] = useState(0);

  // Checklist state
  const [checklist, setChecklist] = useState(PRE_TRIP_CHECKLIST);
  const [checklistSubmitting, setChecklistSubmitting] = useState(false);
  const [checklistDone, setChecklistDone] = useState(false);

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

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };
  const updateValue = (id, val) => {
    setChecklist(prev => prev.map(i => i.id === id ? { ...i, value: val, done: val.trim().length > 0 } : i));
  };

  const requiredItems = checklist.filter(i => i.required);
  const completedRequired = requiredItems.filter(i => i.done);
  const allRequiredDone = completedRequired.length === requiredItems.length;
  const completedCount = checklist.filter(i => i.done).length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  const handleStartTrip = () => {
    if (!allRequiredDone) return;
    setChecklistSubmitting(true);
    setTimeout(() => {
      setChecklistDone(true);
      setTimeout(() => setStep('EnRoute'), 1200);
    }, 800);
  };

  // ── PRE-TRIP GATE ─────────────────────────────────────────────
  if (step === 'checklist') {
    return (
      <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in fade-in duration-300">

        {/* Header */}
        <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFCC00] flex items-center justify-center">
              <ShieldCheck size={18} className="text-black" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pre-Trip Safety Gate</p>
              <h1 className="text-base font-bold text-white tracking-tight leading-none">SHP-20481</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#FFCC00] uppercase tracking-widest">{completedCount}/{checklist.length}</span>
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFCC00] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">

          {/* Blocked Banner */}
          {!checklistDone && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <Lock size={18} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-black text-red-700">Trip Blocked</p>
                <p className="text-xs font-medium text-red-500 mt-0.5 leading-relaxed">
                  Complete all required ({requiredItems.length}) safety checks before departing.
                  {' '}This is enforced by your company policy.
                </p>
              </div>
            </div>
          )}

          {/* Checklist Items */}
          {!checklistDone && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-black text-gray-900">Standard Pre-Trip Checklist</h2>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-widest">Items marked * are required</p>
              </div>
              <div className="divide-y divide-gray-50">
                {checklist.map((item) => (
                  <div key={item.id} className={`px-5 py-4 transition-colors ${item.done ? 'bg-emerald-50/30' : ''}`}>
                    {item.type === 'checkbox' && (
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className="flex items-start gap-3 w-full text-left active:scale-98 transition-transform"
                      >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${item.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-white'}`}>
                          {item.done && <CheckSquare size={14} className="text-white" strokeWidth={3} />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold leading-snug ${item.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1 no-underline">*</span>}
                          </p>
                        </div>
                        {item.done && <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />}
                      </button>
                    )}

                    {item.type === 'number' && (
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.label}
                          {item.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        <input
                          type="number"
                          placeholder="Enter reading..."
                          value={item.value || ''}
                          onChange={e => updateValue(item.id, e.target.value)}
                          className={`w-full border rounded-xl py-2.5 px-4 text-sm font-bold text-gray-900 focus:outline-none transition-all ${item.done ? 'border-emerald-300 bg-emerald-50 focus:border-emerald-400' : 'border-gray-200 bg-gray-50 focus:border-gray-400'}`}
                        />
                      </div>
                    )}

                    {item.type === 'photo' && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleCheck(item.id)}
                          className={`flex-1 py-3 border-2 border-dashed rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${item.done ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                          <Camera size={16} />
                          {item.done ? '✓ Photo Captured' : 'Tap to Take Photo'}
                          {item.required && !item.done && <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">(Optional)</span>}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Summary */}
          {!checklistDone && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Required Complete</p>
                <p className="text-lg font-black text-gray-900">{completedRequired.length} <span className="text-gray-300 font-medium">/ {requiredItems.length}</span></p>
              </div>
              {!allRequiredDone && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <AlertTriangle size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{requiredItems.length - completedRequired.length} remaining</span>
                </div>
              )}
              {allRequiredDone && (
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Ready to go</span>
                </div>
              )}
            </div>
          )}

          {/* START TRIP BUTTON */}
          {checklistDone ? (
            <div className="flex flex-col items-center gap-3 py-8 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-base font-black text-emerald-700">Safety Check Complete</p>
              <p className="text-xs text-gray-400 font-medium">Starting trip...</p>
            </div>
          ) : (
            <button
              onClick={handleStartTrip}
              disabled={!allRequiredDone || checklistSubmitting}
              className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-sm ${
                allRequiredDone
                  ? 'bg-gray-900 hover:bg-black text-[#FFCC00] shadow-black/20'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {allRequiredDone
                ? <><ShieldCheck size={18} /> Start Trip — Clear for Departure</>
                : <><Lock size={16} /> Complete Required Checks to Unlock</>
              }
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── ACTIVE TRIP VIEW ──────────────────────────────────────────
  return (
    <div className="flex flex-col bg-gray-50 pb-20">

      {/* Header */}
      <div className="bg-gray-900 px-5 py-4 flex items-center justify-between text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Navigation size={18} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Active Manifest</p>
            <h1 className="text-base font-bold tracking-tight leading-none">SHP-20481</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-1.5 border border-emerald-500/30">
            <ShieldCheck size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">Safe</span>
          </div>
          <button className="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center border border-red-500/20 active:scale-90 transition-transform">
            <ShieldAlert size={20} className="animate-pulse" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* Main action card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Drop-off Point</span>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">127 York St, Sydney CBD</h2>
            <p className="text-xs font-medium text-gray-500 mt-0.5 flex items-center gap-1.5">
              <MapPin size={12} className="text-blue-500" /> Level 4 · John Smith (Manager)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Distance</p>
              <p className="font-bold text-gray-900 text-base">2.4<span className="text-[10px] font-medium ml-0.5">km</span></p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
              <p className="text-[10px] font-medium text-amber-600 uppercase tracking-wider mb-1">ETA</p>
              <p className="font-bold text-amber-700 text-base">07:35</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Window</p>
              <p className="font-bold text-gray-900 text-base">08:00</p>
            </div>
          </div>

          <div>
            {step === 'EnRoute' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('Arrived')}
                  className="flex-[5] bg-gray-900 hover:bg-black text-[#FACC15] font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                >
                  <CheckCircle2 size={16} /> Confirm Arrival
                </button>
                <button className="flex-1 bg-white border border-gray-200 text-gray-400 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                  <Phone size={18} />
                </button>
              </div>
            )}

            {step === 'Arrived' && (
              <div className="space-y-3">
                <div className="bg-emerald-50 text-emerald-700 px-5 py-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider mb-1">Wait Timer</p>
                    <p className="text-xl font-bold">{formatTime(waitTime)}</p>
                  </div>
                  <CheckCircle2 size={28} className="opacity-30" />
                </div>
                <button
                  onClick={() => setStep('Unloading')}
                  className="w-full bg-[#FACC15] hover:bg-yellow-500 text-black font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                >
                  Start Delivery Process
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
                <p className="text-xs font-medium text-gray-500 mt-2 mb-6 leading-relaxed">Photos and signatures synced to central hub.</p>
                <button
                  onClick={() => navigate('/driver')}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Shift Summary */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800">Shift Summary</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Online</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Time Driven</p>
              <p className="text-lg font-bold text-gray-900">0h 12m</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Duty Left</p>
              <p className="text-lg font-bold text-[#FACC15]">11h 48m</p>
            </div>
          </div>
        </div>

        {/* Route Stops */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
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
