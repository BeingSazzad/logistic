import React, { useState } from 'react';
import { ArrowUpFromLine, CheckCircle2, Clock, AlertCircle, Truck } from 'lucide-react';

const outbound = [
  { id: 'LOD-048', customer: 'Woolworths', job: 'J-2026-1260', driver: 'James Mitchell', vehicle: 'Truck 14', items: 84, dock: 'B2', time: '10:00', status: 'Loading' },
  { id: 'LOD-047', customer: 'Coles',      job: 'J-2026-1258', driver: 'Sarah Chen',    vehicle: 'Van 03',    items: 24, dock: 'A1', time: '10:30', status: 'Staging' },
  { id: 'LOD-046', customer: 'Amazon AU',  job: 'J-2026-1255', driver: 'Michael Wong',  vehicle: 'Truck 09',  items: 120,dock: 'B3', time: '11:15', status: 'Dispatched' },
  { id: 'LOD-049', customer: 'IGA',        job: 'J-2026-1263', driver: 'David Lee',     vehicle: 'Truck 12',  items: 36, dock: 'A3', time: '12:00', status: 'Staging' },
];

const statusCfg = {
  Loading:    { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
  Staging:    { bg: 'bg-blue-100',   text: 'text-blue-700',   icon: ArrowUpFromLine },
  Dispatched: { bg: 'bg-green-100',  text: 'text-green-700',  icon: CheckCircle2 },
};

export default function WarehouseOutbound() {
  const [dispatched, setDispatched] = useState([]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outbound Loading</h1>
          <p className="text-sm text-gray-500 mt-1">{outbound.filter(o => o.status !== 'Dispatched').length} trucks to load today</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Loading Now',  value: outbound.filter(o=>o.status==='Loading').length,   color: 'text-yellow-600' },
          { label: 'Staging',      value: outbound.filter(o=>o.status==='Staging').length,    color: 'text-blue-600' },
          { label: 'Dispatched',   value: outbound.filter(o=>o.status==='Dispatched').length + dispatched.length, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {outbound.map(load => {
          const isDispatched = dispatched.includes(load.id) || load.status === 'Dispatched';
          const status = isDispatched ? 'Dispatched' : load.status;
          const cfg = statusCfg[status];
          return (
            <div key={load.id} className={`bg-white rounded-xl border shadow-sm p-5 ${isDispatched ? 'opacity-60' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                    <cfg.icon size={18} className={cfg.text} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-900">{load.id}</span>
                      <span className="text-gray-400">·</span>
                      <span className="font-semibold text-gray-700">{load.customer}</span>
                      <span className="text-xs text-gray-400">{load.job}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {load.driver} · {load.vehicle} · Dock {load.dock} · {load.items} items · {load.time}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                  <cfg.icon size={11} /> {status}
                </span>
              </div>
              {!isDispatched && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                  <button onClick={() => setDispatched(d => [...d, load.id])}
                    className="btn btn-primary text-xs py-2 px-4">
                    <Truck size={13} /> Mark as Dispatched
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
