import React, { useState } from 'react';
import { CheckCircle2, DollarSign, Users, Send } from 'lucide-react';

const drivers = [
  { id: 'DRV-01', name: 'James Mitchell', trips: 4, km: 884,  base: 751.40, bonus: 50.00, tolls: 45.00, total: 846.40, status: 'ready' },
  { id: 'DRV-02', name: 'Sarah Chen',     trips: 3, km: 612,  base: 520.20, bonus: 50.00, tolls: 28.00, total: 598.20, status: 'ready' },
  { id: 'DRV-03', name: 'Michael Wong',   trips: 5, km: 1120, base: 952.00, bonus: 100.00,tolls: 62.50, total: 1114.50, status: 'ready' },
  { id: 'DRV-04', name: 'David Lee',      trips: 2, km: 445,  base: 378.25, bonus: 0,     tolls: 35.00, total: 413.25, status: 'ready' },
  { id: 'DRV-05', name: 'Emma Wilson',    trips: 6, km: 1340, base: 1139.00,bonus: 150.00,tolls: 88.00, total: 1377.00, status: 'ready' },
];

export default function Settlements() {
  const [processed, setProcessed] = useState(false);
  const total = drivers.reduce((s, d) => s + d.total, 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Weekly Driver Settlements</h1>
          <p className="text-sm text-gray-500 mt-1">Pay Period: 7 Apr – 13 Apr 2026 · Batch due Friday</p>
        </div>
        {!processed ? (
          <button onClick={() => setProcessed(true)} className="btn btn-primary py-3 px-6">
            <Send size={16} /> Process All Payouts (${total.toLocaleString('en-AU', {minimumFractionDigits:2})})
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold">
            <CheckCircle2 size={18} /> All Payouts Processed
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Payout',    value: `$${total.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600' },
          { label: 'Drivers',         value: drivers.length,          icon: Users,      color: 'text-blue-600' },
          { label: 'Total Trips',     value: drivers.reduce((s,d) => s+d.trips, 0), icon: CheckCircle2, color: 'text-gray-700' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Settlement Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4 text-right">Trips</th>
              <th className="px-6 py-4 text-right">KM</th>
              <th className="px-6 py-4 text-right">Base Pay</th>
              <th className="px-6 py-4 text-right">Bonus</th>
              <th className="px-6 py-4 text-right">Tolls</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {drivers.map(d => (
              <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                      {d.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <span className="font-semibold text-gray-900">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-gray-700">{d.trips}</td>
                <td className="px-6 py-4 text-right text-gray-700">{d.km.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-medium text-gray-700">${d.base.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium text-emerald-600">${d.bonus.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium text-orange-600">${d.tolls.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">${d.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  {processed ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">✓ Paid</span>
                  ) : (
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">Ready</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t-2 border-gray-200">
            <tr>
              <td className="px-6 py-4 font-bold text-gray-900" colSpan={6}>Total Payout</td>
              <td className="px-6 py-4 text-right font-black text-xl text-gray-900">${total.toFixed(2)}</td>
              <td className="px-6 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
