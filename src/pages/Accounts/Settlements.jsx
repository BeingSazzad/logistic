import React, { useState } from 'react';
import { CheckCircle2, DollarSign, Users, Send, ChevronDown } from 'lucide-react';

const drivers = [
  { id: 'DRV-01', name: 'James Mitchell', trips: 4, km: 884,  base: 751.40, bonus: 50.00, tolls: 45.00, total: 846.40 },
  { id: 'DRV-02', name: 'Sarah Chen',     trips: 3, km: 612,  base: 520.20, bonus: 50.00, tolls: 28.00, total: 598.20 },
  { id: 'DRV-03', name: 'Michael Wong',   trips: 5, km: 1120, base: 952.00, bonus: 100.00,tolls: 62.50, total: 1114.50 },
  { id: 'DRV-04', name: 'David Lee',      trips: 2, km: 445,  base: 378.25, bonus: 0,     tolls: 35.00, total: 413.25 },
  { id: 'DRV-05', name: 'Emma Wilson',    trips: 6, km: 1340, base: 1139.00,bonus: 150.00,tolls: 88.00, total: 1377.00 },
];

export default function Settlements() {
  const [processed, setProcessed] = useState(false);
  const total = drivers.reduce((s, d) => s + d.total, 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Driver Settlements</h1>
            <p className="text-sm text-gray-500 mt-1">Pay Period: 7 Apr – 13 Apr 2026 &nbsp;·&nbsp; Batch due Friday</p>
          </div>
        </div>
        {!processed ? (
          <button
            onClick={() => setProcessed(true)}
            className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Send size={16} /> Process All Payouts (${total.toLocaleString('en-AU', { minimumFractionDigits: 2 })})
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-lg font-bold border border-emerald-100 shadow-sm">
            <CheckCircle2 size={18} /> All Payouts Processed
          </div>
        )}
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Payout</p><p className="text-2xl font-black text-emerald-600 mt-0.5">${total.toFixed(2)}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500"><DollarSign size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Drivers</p><p className="text-2xl font-black text-blue-600 mt-0.5">{drivers.length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500"><Users size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Trips</p><p className="text-2xl font-black text-gray-900 mt-0.5">{drivers.reduce((s, d) => s + d.trips, 0)}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400"><CheckCircle2 size={20}/></div>
        </div>
      </div>

      {/* Main Settlement Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Settlement Breakdown</p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4 text-right">Trips</th>
                <th className="px-6 py-4 text-right">KM</th>
                <th className="px-6 py-4 text-right">Base Pay</th>
                <th className="px-6 py-4 text-right">Bonus</th>
                <th className="px-6 py-4 text-right">Tolls</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drivers.map(d => (
                <tr key={d.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-gray-50 border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-500">
                        {d.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-bold text-[#111] text-[15px]">{d.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-gray-700">{d.trips}</td>
                  <td className="px-6 py-5 text-right font-bold text-gray-700">{d.km.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-bold text-gray-700">${d.base.toFixed(2)}</td>
                  <td className="px-6 py-5 text-right font-bold text-emerald-600">${d.bonus.toFixed(2)}</td>
                  <td className="px-6 py-5 text-right font-bold text-orange-500">${d.tolls.toFixed(2)}</td>
                  <td className="px-6 py-5 text-right font-black text-[#111]">${d.total.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    {processed ? (
                      <span className="text-[10px] font-bold px-3 py-1 rounded-md border bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]">✓ Paid</span>
                    ) : (
                      <span className="text-[10px] font-bold px-3 py-1 rounded-md border bg-yellow-50 text-yellow-700 border-yellow-200">Ready</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#FAFAFA] border-t-2 border-gray-200">
              <tr>
                <td className="px-6 py-5 font-black text-gray-900 text-sm uppercase tracking-widest" colSpan={6}>Total Payout</td>
                <td className="px-6 py-5 text-right font-black text-xl text-[#111]">${total.toFixed(2)}</td>
                <td className="px-6 py-5"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
