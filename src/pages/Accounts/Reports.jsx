import React from 'react';
import { Download, TrendingUp } from 'lucide-react';

export default function AccountsReports() {
  const months = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
  const revenue = [320, 380, 410, 395, 450, 470, 486];
  const costs   = [210, 240, 265, 255, 290, 305, 312];
  const max = 550;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Revenue, costs & margin analysis</p>
        </div>
        <button className="btn btn-primary"><Download size={15} /> Export Report</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Revenue MTD',  value: '$486,500', delta: '+12%', up: true },
          { label: 'Costs MTD',    value: '$312,400', delta: '+8%',  up: false },
          { label: 'Gross Margin', value: '35.8%',    delta: '+2.1%',up: true },
          { label: 'Outstanding',  value: '$127,300', delta: '-5%',  up: true },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
            <p className={`text-xs font-bold mt-1 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>{s.delta} vs last month</p>
          </div>
        ))}
      </div>

      {/* Revenue vs Cost Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18} className="text-gray-400" /> Revenue vs Costs (7 months)</h3>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block" /> Costs</span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-48">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end" style={{ height: '180px' }}>
                <div className="flex-1 bg-emerald-500 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${(revenue[i]/max)*180}px` }} title={`$${revenue[i]}K`} />
                <div className="flex-1 bg-red-400 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${(costs[i]/max)*180}px` }}   title={`$${costs[i]}K`} />
              </div>
              <span className="text-[10px] text-gray-500 font-semibold">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100"><h3 className="font-bold text-gray-900">Monthly Breakdown</h3></div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3 text-right">Revenue</th>
              <th className="px-6 py-3 text-right">Costs</th>
              <th className="px-6 py-3 text-right">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {months.map((m, i) => {
              const margin = ((revenue[i]-costs[i])/revenue[i]*100).toFixed(1);
              return (
                <tr key={m} className="hover:bg-gray-50">
                  <td className="px-6 py-3.5 font-semibold text-gray-900">{m} 2026</td>
                  <td className="px-6 py-3.5 text-right font-medium text-emerald-600">${revenue[i]}K</td>
                  <td className="px-6 py-3.5 text-right font-medium text-red-500">${costs[i]}K</td>
                  <td className="px-6 py-3.5 text-right font-bold text-gray-900">{margin}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
