import React, { useState } from 'react';
import {
  ArrowUpFromLine, CheckCircle2, Clock, AlertCircle,
  Truck, Car, MapPin, Barcode, X, ChevronRight,
  Shield, PackageCheck, Loader2
} from 'lucide-react';

const MOCK_LOADS = [
  { id: 'LD-2048', customer: 'AutoDeal Pty Ltd',  driver: 'James Mitchell', truck: 'TRK-102 (XQG-984)', vehicles: 6, dock: 'Gate B2', time: '10:00', status: 'Loading',    dest: 'Brisbane QLD' },
  { id: 'LD-2047', customer: 'Smith Motors',       driver: 'Sarah Chen',     truck: 'TRK-09 (XYY-112)', vehicles: 4, dock: 'Gate A1', time: '10:30', status: 'Staging',    dest: 'Melbourne VIC' },
  { id: 'LD-2046', customer: 'EV Fleet Co',        driver: 'Michael Wong',   truck: 'TRL-44 (T-9921)',  vehicles: 9, dock: 'Gate B3', time: '11:15', status: 'Dispatched', dest: 'Sydney NSW' },
  { id: 'LD-2049', customer: 'WA Motors',          driver: 'David Lee',      truck: 'VAN-14 (VAN-14-SYD)', vehicles: 2, dock: 'Gate A3', time: '12:00', status: 'Staging', dest: 'Perth WA' },
];

const STATUS_CFG = {
  Loading:    { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100',   icon: Clock,           dot: 'bg-amber-400' },
  Staging:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-100',    icon: ArrowUpFromLine, dot: 'bg-blue-400' },
  Dispatched: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle2,    dot: 'bg-emerald-400' },
};

export default function WarehouseOutbound() {
  const [dispatched, setDispatched] = useState([]);
  const [releasingId, setReleasingId] = useState(null);

  const getStatus = (load) => dispatched.includes(load.id) ? 'Dispatched' : load.status;
  const loadNow    = MOCK_LOADS.filter(l => getStatus(l) === 'Loading').length;
  const staging    = MOCK_LOADS.filter(l => getStatus(l) === 'Staging').length;
  const dispCount  = MOCK_LOADS.filter(l => getStatus(l) === 'Dispatched').length;

  const handleRelease = (id) => {
    setReleasingId(id);
    setTimeout(() => {
      setDispatched(d => [...d, id]);
      setReleasingId(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Outbound Release</h1>
          <p className="hero-body text-gray-600 mt-1">
            {MOCK_LOADS.filter(l => getStatus(l) !== 'Dispatched').length} loads pending vehicle release
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2" />

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-3 gap-4 px-2">
        {[
          { label: 'Loading Now',  value: loadNow,   color: 'text-amber-500',   bg: 'bg-amber-50',   icon: Clock },
          { label: 'Staging',      value: staging,    color: 'text-blue-600',    bg: 'bg-blue-50',    icon: ArrowUpFromLine },
          { label: 'Dispatched',   value: dispCount,  color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center justify-between group hover:shadow-xl transition-all">
            <div>
              <p className="hero-metadata">{s.label}</p>
              <p className={`text-2xl font-semibold mt-1.5 leading-none ${s.color}`}>{s.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}>
              <s.icon size={26} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Load Cards ── */}
      <div className="flex flex-col gap-4 px-2">
        {MOCK_LOADS.map(load => {
          const status = getStatus(load);
          const cfg = STATUS_CFG[status] || STATUS_CFG.Staging;
          const isDispatched = status === 'Dispatched';
          const isReleasing  = releasingId === load.id;

          return (
            <div
              key={load.id}
              className={`bg-white rounded-[2rem] border shadow-xl transition-all overflow-hidden ${
                isDispatched ? 'opacity-60 border-gray-100' : 'border-gray-100 hover:shadow-2xl'
              }`}
            >
              {/* Status bar */}
              <div className={`h-1.5 w-full ${cfg.dot} rounded-t-[2rem]`} style={{ background: `linear-gradient(to right, ${cfg.dot === 'bg-amber-400' ? '#f59e0b' : cfg.dot === 'bg-blue-400' ? '#60a5fa' : '#34d399'}, transparent)` }} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 ${cfg.bg} ${cfg.border}`}>
                      <cfg.icon size={24} className={cfg.text} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono font-semibold text-gray-900 text-sm leading-none">{load.id}</span>
                        <span className={`text-xs font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-xl border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{load.customer}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <MapPin size={12} className="text-emerald-500" />
                        <span className="text-xs font-medium text-gray-500">{load.dest}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2 justify-end">
                      <Car size={14} className="text-gray-300" />
                      <span className="text-2xl font-semibold text-hero-dark leading-none">{load.vehicles}</span>
                    </div>
                    <p className="hero-metadata mt-1">Vehicles</p>
                  </div>
                </div>

                {/* Details strip */}
                <div className="grid grid-cols-3 gap-3 mb-5 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div>
                    <p className="hero-metadata mb-1">Driver</p>
                    <p className="text-xs font-medium text-gray-900">{load.driver}</p>
                  </div>
                  <div>
                    <p className="hero-metadata mb-1">Vehicle</p>
                    <p className="text-xs font-medium text-gray-900">{load.truck}</p>
                  </div>
                  <div>
                    <p className="hero-metadata mb-1">Gate &amp; Time</p>
                    <p className="text-xs font-semibold text-blue-600">{load.dock} · {load.time}</p>
                  </div>
                </div>

                {/* Action Row */}
                {!isDispatched && (
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button className="btn-sm btn-outline flex items-center gap-2">
                      <Barcode size={16} /> Print Labels
                    </button>
                    <div className="flex-1" />
                    <button
                      onClick={() => handleRelease(load.id)}
                      disabled={isReleasing}
                      className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-semibold uppercase tracking-[0.1em] transition-all shadow-lg active:scale-[0.97] ${
                        isReleasing
                          ? 'bg-gray-100 text-gray-300 cursor-wait'
                          : 'bg-[#111] text-[#FFCC00] hover:bg-black hover:shadow-xl'
                      }`}
                    >
                      {isReleasing ? (
                        <><Loader2 size={16} className="animate-spin" /> Processing...</>
                      ) : (
                        <><Truck size={16} /> Release & Dispatch</>
                      )}
                    </button>
                  </div>
                )}

                {isDispatched && (
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 text-emerald-600">
                    <PackageCheck size={20} />
                    <span className="text-xs font-medium">Dispatched &amp; Gate Cleared</span>
                    <Shield size={16} className="ml-auto text-emerald-300" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


