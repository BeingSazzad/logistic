import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Car, Plus, Trash2, Send,
  CheckCircle2, Navigation, FileText, AlertCircle, Scan
} from 'lucide-react';

const DEPOTS = [
  'Sydney Central (SYD-CENTRAL)',
  'Melbourne HUB (MEL-HUB)',
  'Brisbane Port (BNE-PORT)',
  'Adelaide Depot (ADL-DEPOT)',
  'Perth Yard (PER-YARD)',
  'Auction Grounds / Other',
];

const DEST_LOCATIONS = [
  'Brisbane QLD',
  'Melbourne VIC',
  'Sydney NSW',
  'Perth WA',
  'Adelaide SA',
  'Darwin NT',
  'Hobart TAS',
  'Canberra ACT',
];

export default function DriverCreateDraft() {
  const navigate = useNavigate();
  const [origin, setOrigin]     = useState('');
  const [dest, setDest]         = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [vin, setVin]           = useState('');
  const [vinError, setVinError] = useState('');
  const [notes, setNotes]       = useState('');
  const [urgency, setUrgency]   = useState('Normal');
  const [submitted, setSubmitted] = useState(false);

  const addVehicle = () => {
    if (vin.trim().length < 5) {
      setVinError('Enter at least 5 characters for VIN/Plate.');
      return;
    }
    if (vehicles.some(v => v.vin === vin.trim().toUpperCase())) {
      setVinError('This VIN is already in the list.');
      return;
    }
    setVehicles([...vehicles, { vin: vin.trim().toUpperCase() }]);
    setVin('');
    setVinError('');
  };

  const removeVehicle = (idx) => setVehicles(vehicles.filter((_, i) => i !== idx));

  const canSubmit = origin && dest && vehicles.length > 0;

  const submitDraft = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => navigate('/driver'), 2400);
  };

  /* ── SUCCESS SCREEN ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center animate-in zoom-in-90 duration-300">
        <div className="w-28 h-28 bg-[#FFCC00] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-yellow-400/30 animate-bounce">
          <CheckCircle2 size={56} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Draft Sent!</h2>
        <p className="text-sm font-bold text-gray-500 mt-3 max-w-[260px] leading-snug">
          Your draft load has been forwarded to dispatch for review and approval.
        </p>
        <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-5 w-full max-w-[300px] shadow-sm text-left space-y-3">
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Origin</p>
            <p className="text-xs font-black text-gray-900 mt-0.5">{origin}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Destination</p>
            <p className="text-xs font-black text-gray-900 mt-0.5">{dest}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Vehicles</p>
            <p className="text-xs font-black text-gray-900 mt-0.5">{vehicles.length} unit(s)</p>
          </div>
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-6">Returning to dashboard...</p>
      </div>
    );
  }

  /* ── FORM SCREEN ── */
  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto min-h-screen bg-gray-50 pb-28">

      {/* ── Header ── */}
      <div className="bg-[#111] px-5 pt-14 pb-8 rounded-b-[3rem] shadow-2xl relative z-10">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform hover:bg-white/20"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight leading-none">New Draft Load</h1>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Field submission → Dispatch Review</p>
          </div>
        </div>

        {/* Vehicle counter badge */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5">
            <Car size={16} className="text-[#FFCC00]" />
            <span className="text-xs font-black text-white uppercase tracking-widest">{vehicles.length} Vehicles Added</span>
          </div>
          <div className={`flex items-center gap-2 border rounded-2xl px-4 py-2.5 ${
            urgency === 'High' ? 'bg-red-900/30 border-red-800 text-red-400' : 'bg-white/5 border-white/10 text-gray-400'
          }`}>
            <AlertCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">{urgency} Priority</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 flex flex-col gap-5">

        {/* Origin */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            <Navigation size={14} className="text-blue-500" /> Pickup / Origin Depot
          </label>
          <select
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-400 appearance-none"
          >
            <option value="">Select origin depot...</option>
            {DEPOTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Destination */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-emerald-500" /> Final Destination
          </label>
          <select
            value={dest}
            onChange={e => setDest(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-black text-gray-900 focus:outline-none focus:border-emerald-400 appearance-none"
          >
            <option value="">Select destination...</option>
            {DEST_LOCATIONS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Urgency */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            <AlertCircle size={14} className="text-amber-500" /> Priority Level
          </label>
          <div className="flex gap-3">
            {['Normal', 'High'].map(u => (
              <button
                key={u}
                onClick={() => setUrgency(u)}
                className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                  urgency === u
                    ? u === 'High'
                      ? 'border-red-400 bg-red-50 text-red-600'
                      : 'border-[#111] bg-[#111] text-[#FFCC00]'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-300'
                }`}
              >
                {u === 'High' ? '🔴 High Priority' : '⚪ Normal'}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Car size={14} className="text-blue-500" /> Vehicle VINs / Plates
          </label>

          {/* VIN Input */}
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Scan size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Scan or type VIN / Plate..."
                value={vin}
                onChange={e => { setVin(e.target.value); setVinError(''); }}
                onKeyDown={e => e.key === 'Enter' && addVehicle()}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3.5 pl-10 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-400 uppercase tracking-widest transition-all"
              />
            </div>
            <button
              onClick={addVehicle}
              className="w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-blue-200"
            >
              <Plus size={22} strokeWidth={3} />
            </button>
          </div>

          {vinError && (
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest px-1">{vinError}</p>
          )}

          {/* VIN List */}
          <div className="flex flex-col gap-2">
            {vehicles.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 border-2 border-gray-100 rounded-2xl p-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                    <Car size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <span className="font-mono text-sm font-black text-gray-900 tracking-widest">{v.vin}</span>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Unit #{idx + 1}</p>
                  </div>
                </div>
                <button onClick={() => removeVehicle(idx)} className="p-2.5 text-red-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {vehicles.length === 0 && (
              <div className="text-center py-6 text-gray-300">
                <Car size={40} className="mx-auto mb-2 opacity-30" />
                <p className="text-[10px] font-black uppercase tracking-widest">No vehicles added yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Driver Notes */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            <FileText size={14} className="text-violet-400" /> Field Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any special instructions for dispatch (e.g. damaged, oversize)..."
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-violet-400 resize-none transition-all"
          />
        </div>

        {/* Submit */}
        <button
          onClick={submitDraft}
          disabled={!canSubmit}
          className={`py-5 rounded-3xl font-black uppercase tracking-[0.1em] text-sm flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.97] ${
            canSubmit
              ? 'bg-[#111] text-[#FFCC00] hover:bg-black shadow-black/20'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          <Send size={20} /> Submit to Dispatch
        </button>

        {!canSubmit && (
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center -mt-2">
            {!origin ? 'Select pickup origin' : !dest ? 'Select destination' : 'Add at least one vehicle'}
          </p>
        )}
      </div>
    </div>
  );
}
