import React from 'react';
import { CreditCard, TrendingUp, Zap } from 'lucide-react';

const plans = [
  { id: 'starter',    name: 'Starter',    price: 49,    users: 3,  branches: 1,  ships: 50,   tenants: 1, color: 'border-gray-200' },
  { id: 'pro',        name: 'Pro',        price: 149,   users: 15, branches: 5,  ships: 500,  tenants: 3, color: 'border-yellow-500', recommended: true },
  { id: 'enterprise', name: 'Enterprise', price: 599,   users: -1, branches: -1, ships: -1,   tenants: 1, color: 'border-gray-800' },
];

export default function Subscriptions() {
  const totalMRR = 149 + 0 + 0 + 599 + 149;
  const arr = totalMRR * 12;
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions & Billing</h1>
        <p className="text-sm text-gray-500 mt-1">Manage plans and recurring revenue</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'MRR',  value: `$${totalMRR}/mo`, icon: TrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'ARR',  value: `$${arr.toLocaleString()}/yr`, icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Plan Value', value: `$${(totalMRR/5).toFixed(0)}/tenant`, icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon size={18} className={s.color} /></div>
            <div><p className="text-xs text-gray-500">{s.label}</p><p className={`text-xl font-bold ${s.color}`}>{s.value}</p></div>
          </div>
        ))}
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-3 gap-5">
        {plans.map(p => (
          <div key={p.id} className={`bg-white rounded-2xl border-2 ${p.color} shadow-sm p-6 relative`}>
            {p.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
            )}
            <h3 className="font-black text-gray-900 text-lg">{p.name}</h3>
            <div className="mt-2 mb-5">
              <span className="text-4xl font-black text-gray-900">${p.price}</span>
              <span className="text-gray-500 text-sm font-medium">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              <li className="flex items-center gap-2">✓ <span>{p.users === -1 ? 'Unlimited' : p.users} users</span></li>
              <li className="flex items-center gap-2">✓ <span>{p.branches === -1 ? 'Unlimited' : p.branches} branches</span></li>
              <li className="flex items-center gap-2">✓ <span>{p.ships === -1 ? 'Unlimited' : p.ships} shipments/mo</span></li>
              <li className="flex items-center gap-2">✓ <span>Full driver PWA</span></li>
              {p.id !== 'starter' && <li className="flex items-center gap-2">✓ <span>Accounts portal</span></li>}
              {p.id === 'enterprise' && <li className="flex items-center gap-2">✓ <span>Custom integrations</span></li>}
            </ul>
            <button className={`btn w-full py-3 ${p.recommended ? 'btn-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {p.tenants} tenant(s) on this plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
