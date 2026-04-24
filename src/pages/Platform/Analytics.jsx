import React from 'react';
import { TrendingUp, Users, Package, Globe } from 'lucide-react';

const months = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
const mrr    = [720, 869, 1017, 1017, 1017, 1166, 1166];
const tenants = [3, 3, 4, 4, 4, 5, 5];
const maxMrr = 1300;

export default function PlatformAnalytics() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Growth metrics across all companies</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'Monthly Revenue (MRR)',  value: '$1,166',  delta: '+14.7% MoM', up: true,  icon: TrendingUp },
          { label: 'Yearly Revenue (ARR)',   value: '$13,992', delta: 'Projected',  up: true,  icon: Globe },
          { label: 'Active Users', value: '89',      delta: '+6 this month', up: true, icon: Users },
          { label: 'Loads / Month', value: '1,827',   delta: 'All companies',up: true,  icon: Package },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between group">
            <div>
               <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">{s.label}</p>
               <p className="text-2xl font-semibold text-gray-900 mt-0.5">{s.value}</p>
               <p className={`text-xs font-bold mt-1 ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>{s.delta}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400"><s.icon size={20} /></div>
          </div>
        ))}
      </div>

      {/* MRR Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">MRR Growth</h3>
          <div className="flex gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-500 inline-block" /> MRR</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-300 inline-block" /> Companies</span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end" style={{ height: '120px' }}>
                <div className="flex-1 bg-yellow-500 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${(mrr[i]/maxMrr)*120}px` }} />
                <div className="flex-1 bg-blue-300 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${(tenants[i]/6)*120}px` }} />
              </div>
              <span className="text-xs text-gray-500 font-semibold">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Churn / Retention */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Company Retention</h3>
          <div className="space-y-3">
            {[
              { label: 'Retention Rate',  value: '100%', color: 'text-emerald-600' },
              { label: 'Churn Rate',      value: '0%',   color: 'text-emerald-600' },
              { label: 'Avg Tenure',      value: '8.2 months', color: 'text-gray-900' },
              { label: 'Trial → Paid',    value: '66%',  color: 'text-blue-600' },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{r.label}</span>
                <span className={`font-bold ${r.color}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Revenue by Plan</h3>
          <div className="space-y-3">
            {[
              { plan: 'Enterprise', pct: 51.4, color: 'bg-yellow-600', value: '$599' },
              { plan: 'Pro',        pct: 25.6, color: 'bg-yellow-400', value: '$298' },
              { plan: 'Starter',    pct: 0,    color: 'bg-yellow-200', value: '$0' },
            ].map(p => (
              <div key={p.plan}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">{p.plan}</span>
                  <span className="text-gray-900">{p.value}/mo</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


