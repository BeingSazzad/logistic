import React, { useState } from 'react';
import { ArrowDownToLine, CheckCircle2, Clock, AlertCircle, Search } from 'lucide-react';

const inbound = [
  { id: 'RCV-105', supplier: 'Woolworths DC', vehicle: 'Truck 14', items: 84, eta: '09:00', status: 'Arriving Soon',   dock: 'A2' },
  { id: 'RCV-106', supplier: 'Amazon AU',     vehicle: 'Van 07',   items: 24, eta: '09:45', status: 'Pending',         dock: 'B1' },
  { id: 'RCV-107', supplier: 'Coles DC',      vehicle: 'Truck 09', items: 120,eta: '11:00', status: 'Pending',         dock: 'A4' },
  { id: 'RCV-104', supplier: 'IGA NSW',       vehicle: 'Truck 12', items: 56, eta: '08:30', status: 'Received',        dock: 'A3' },
];

const statusCfg = {
  'Arriving Soon': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
  'Pending':       { bg: 'bg-gray-100',   text: 'text-gray-600',   icon: Clock },
  'Received':      { bg: 'bg-green-100',  text: 'text-green-700',  icon: CheckCircle2 },
  'Exception':     { bg: 'bg-red-100',    text: 'text-red-700',    icon: AlertCircle },
};

export default function WarehouseInbound() {
  const [search, setSearch] = useState('');
  const [received, setReceived] = useState([]);

  const filtered = inbound.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbound Receipts</h1>
          <p className="text-sm text-gray-500 mt-1">{inbound.filter(r => r.status !== 'Received').length} pending today</p>
        </div>
      </div>

      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className="input pl-9" placeholder="Search manifest ID or supplier..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Manifest</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4 text-center">Items</th>
              <th className="px-6 py-4">ETA / Dock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(r => {
              const isReceived = received.includes(r.id) || r.status === 'Received';
              const status = isReceived ? 'Received' : r.status;
              const cfg = statusCfg[status];
              return (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900">{r.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{r.supplier}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-700">{r.items}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{r.eta}</p>
                    <p className="text-xs text-gray-500">Dock {r.dock} · {r.vehicle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                      <cfg.icon size={11} /> {status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {!isReceived ? (
                      <button onClick={() => setReceived(prev => [...prev, r.id])}
                        className="btn btn-primary text-xs py-1.5 px-3">
                        <ArrowDownToLine size={13} /> Receive
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold">✓ Done</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
