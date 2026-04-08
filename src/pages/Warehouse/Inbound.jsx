import React, { useState } from 'react';
import { ArrowDownToLine, CheckCircle2, Clock, AlertCircle, Search, ChevronDown, Package } from 'lucide-react';

const inbound = [
  { id: 'RCV-105', supplier: 'Woolworths DC', vehicle: 'Truck 14', items: 84,  eta: '09:00', status: 'Arriving Soon', dock: 'A2' },
  { id: 'RCV-106', supplier: 'Amazon AU',     vehicle: 'Van 07',   items: 24,  eta: '09:45', status: 'Pending',       dock: 'B1' },
  { id: 'RCV-107', supplier: 'Coles DC',      vehicle: 'Truck 09', items: 120, eta: '11:00', status: 'Pending',       dock: 'A4' },
  { id: 'RCV-104', supplier: 'IGA NSW',       vehicle: 'Truck 12', items: 56,  eta: '08:30', status: 'Received',      dock: 'A3' },
];

const statusCfg = {
  'Arriving Soon': { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200',   icon: Clock },
  'Pending':       { cls: 'bg-gray-50 text-gray-500 border-gray-200',         icon: Clock },
  'Received':      { cls: 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]',    icon: CheckCircle2 },
  'Exception':     { cls: 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]',    icon: AlertCircle },
};

export default function WarehouseInbound() {
  const [search, setSearch] = useState('');
  const [received, setReceived] = useState([]);

  const filtered = inbound.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inbound Receipts</h1>
          <p className="text-sm text-gray-500 mt-1">{inbound.filter(r => r.status !== 'Received').length} pending deliveries today.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Inbound</p><p className="text-2xl font-black text-gray-900 mt-0.5">{inbound.length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400"><Package size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Pending</p><p className="text-2xl font-black text-yellow-600 mt-0.5">{inbound.filter(r => r.status !== 'Received').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-50 text-yellow-500"><Clock size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Received</p><p className="text-2xl font-black text-emerald-600 mt-0.5">{inbound.filter(r => r.status === 'Received').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500"><CheckCircle2 size={20}/></div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all"
              placeholder="Search manifest ID or supplier..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Manifest</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4 text-center">Items</th>
                <th className="px-6 py-4">ETA / Dock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => {
                const isReceived = received.includes(r.id) || r.status === 'Received';
                const status = isReceived ? 'Received' : r.status;
                const cfg = statusCfg[status];
                return (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-6 py-5">
                      <div className="font-mono font-bold text-[#111] text-[15px]">{r.id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-sm">{r.supplier}</div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="font-black text-[#111]">{r.items}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-sm">{r.eta}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">Dock {r.dock} · {r.vehicle}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-md border inline-flex items-center gap-1.5 ${cfg.cls}`}>
                        <cfg.icon size={10} /> {status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {!isReceived ? (
                        <button onClick={() => setReceived(prev => [...prev, r.id])}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest flex items-center gap-1.5 ml-auto">
                          <ArrowDownToLine size={13} /> Receive
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">✓ Done</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
