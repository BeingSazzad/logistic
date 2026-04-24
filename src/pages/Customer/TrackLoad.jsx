import React, { useState } from 'react';
import { Search, Package, MapPin, CheckCircle2, Clock, Truck, AlertCircle, ChevronRight } from 'lucide-react';

// ── Mock Load database ──────────────────────────────────────────────────
const LoadS = {
  'SHP-20481': {
    id: 'SHP-20481',
    status: 'In Transit',
    service: 'Express',
    origin: 'Sydney Port, NSW',
    destination: 'Blacktown DC, NSW',
    estimatedDelivery: 'Today, by 5:00 PM',
    weight: '6.2t',
    items: '4 Pallets',
    progress: 65,
    timeline: [
      { label: 'Order Confirmed',     time: 'Apr 11, 08:00 AM', done: true },
      { label: 'Picked Up',           time: 'Apr 11, 09:30 AM', done: true },
      { label: 'In Transit',          time: 'Apr 11, 11:00 AM', done: true },
      { label: 'Out for Delivery',    time: 'Expected ~3:00 PM', done: false },
      { label: 'Delivered',           time: 'Expected ~5:00 PM', done: false },
    ],
  },
  'SHP-20502': {
    id: 'SHP-20502',
    status: 'Delivered',
    service: 'Normal',
    origin: 'Melbourne Depot, VIC',
    destination: 'Parramatta, NSW',
    estimatedDelivery: 'Apr 10, 2:45 PM',
    weight: '1.8t',
    items: '3 Boxes',
    progress: 100,
    timeline: [
      { label: 'Order Confirmed',  time: 'Apr 9, 10:00 AM',  done: true },
      { label: 'Picked Up',        time: 'Apr 9, 02:00 PM',  done: true },
      { label: 'In Transit',       time: 'Apr 10, 06:00 AM', done: true },
      { label: 'Out for Delivery', time: 'Apr 10, 01:00 PM', done: true },
      { label: 'Delivered',        time: 'Apr 10, 02:45 PM', done: true },
    ],
  },
  'SHP-9055': {
    id: 'SHP-9055',
    status: 'Pending Pickup',
    service: 'Direct',
    origin: 'Sydney Depot, NSW',
    destination: 'Canberra Branch, ACT',
    estimatedDelivery: 'Today, by 2:00 PM',
    weight: '6.2t',
    items: 'Temperature-controlled cargo',
    progress: 10,
    timeline: [
      { label: 'Order Confirmed',  time: 'Today, 08:00 AM', done: true },
      { label: 'Picked Up',        time: 'Scheduled 11:00 AM', done: false },
      { label: 'In Transit',       time: 'Pending',            done: false },
      { label: 'Out for Delivery', time: 'Pending',            done: false },
      { label: 'Delivered',        time: 'Estimated 2:00 PM',  done: false },
    ],
  },
};

const statusConfig = {
  'In Transit':      { color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-100',   icon: <Truck size={14} /> },
  'Delivered':       { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100',icon: <CheckCircle2 size={14} /> },
  'Pending Pickup':  { color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-100',  icon: <Clock size={14} /> },
  'Exception':       { color: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-100',    icon: <AlertCircle size={14} /> },
};

export default function TrackLoad() {
  const [query, setQuery]       = useState('');
  const [result, setResult]     = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleTrack = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setResult(LoadS[query.trim().toUpperCase()] || null);
      setSearched(true);
      setLoading(false);
    }, 600);
  };

  const cfg = result ? (statusConfig[result.status] || statusConfig['In Transit']) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Top bar ── */}
      <div className="bg-[#111] px-6 py-4 flex items-center gap-3">
        <div className="w-7 h-7 bg-[#FFCC00] rounded-md flex items-center justify-center">
          <Package size={16} className="text-black" />
        </div>
        <span className="text-white font-bold text-sm tracking-tight">HERO Logistics</span>
        <span className="text-gray-600 text-xs ml-auto">Track your Load</span>
      </div>

      {/* ── Hero Search ── */}
      <div className="flex flex-col items-center justify-center px-4 pt-16 pb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Track Your Load</h1>
        <p className="text-gray-400 text-sm mb-8 text-center">Enter your Load ID to get real-time status</p>

        <div className="w-full max-w-lg flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
              placeholder="e.g. SHP-20481"
              className="w-full pl-11 pr-4 py-3.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/40 focus:border-[#FFCC00] shadow-sm transition-all"
            />
          </div>
          <button
            onClick={handleTrack}
            disabled={loading || !query.trim()}
            className="px-6 py-3.5 bg-[#FFCC00] hover:bg-[#E6B800] disabled:opacity-50 text-black font-bold rounded-xl text-sm transition-all shadow-sm flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>Track <ChevronRight size={15} /></>
            )}
          </button>
        </div>

        {/* Quick try hints */}
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          <span className="text-xs text-gray-400">Try:</span>
          {Object.keys(LoadS).map(id => (
            <button
              key={id}
              onClick={() => { setQuery(id); }}
              className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-white transition-all"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="flex justify-center px-4 pb-16">
        <div className="w-full max-w-lg">

          {/* Not found */}
          {searched && !result && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={22} className="text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Load not found</p>
              <p className="text-xs text-gray-400 mt-1">Check the ID and try again, or contact support.</p>
            </div>
          )}

          {/* Found */}
          {result && cfg && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-medium text-gray-500">Load ID</p>
                    <span className="text-xs font-bold text-gray-700 font-mono">{result.id}</span>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                    {cfg.icon} {result.status}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Est. Delivery</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{result.estimatedDelivery}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span className="font-medium">{result.origin}</span>
                  <span className="font-medium">{result.destination}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${result.progress === 100 ? 'bg-emerald-500' : 'bg-[#FFCC00]'}`}
                    style={{ width: `${result.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin size={11} />
                    <span>{result.progress === 100 ? 'Delivered' : `${result.progress}% complete`}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md
                    ${result.service === 'Direct' ? 'bg-red-50 text-red-600' :
                      result.service === 'Express' ? 'bg-amber-50 text-amber-600' :
                      'bg-gray-50 text-gray-500'}`}>
                    {result.service}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b border-gray-50">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                  <p className="text-sm font-semibold text-gray-900">{result.weight}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contents</p>
                  <p className="text-sm font-semibold text-gray-900">{result.items}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-5">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">Tracking Timeline</p>
                <div className="relative pl-5 space-y-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gray-100">
                  {result.timeline.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-3">
                      <div className={`absolute -left-[22px] top-0.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm
                        ${step.done ? (result.progress === 100 ? 'bg-emerald-500' : 'bg-[#FFCC00]') : 'bg-gray-200'}`}
                      ></div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{step.time}</p>
                      </div>
                      {step.done && <CheckCircle2 size={14} className={result.progress === 100 ? 'text-emerald-500' : 'text-[#FFCC00]'} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Need help? Contact us at <span className="font-semibold text-gray-700">support@herologistics.com.au</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



