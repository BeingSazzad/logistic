import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';

const payments = [
  { id: 'PAY-881', customer: 'Woolworths', invoice: 'INV-2026-1195', amount: '$3,120.00', date: '8 Apr', method: 'Bank Transfer', status: 'reconciled' },
  { id: 'PAY-880', customer: 'Amazon AU',  invoice: 'INV-2026-1190', amount: '$1,840.50', date: '8 Apr', method: 'Stripe',        status: 'reconciled' },
  { id: 'PAY-879', customer: 'Coles',      invoice: 'INV-2026-1185', amount: '$2,260.00', date: '7 Apr', method: 'Bank Transfer', status: 'reconciled' },
  { id: 'PAY-878', customer: 'IGA',        invoice: 'INV-2026-1180', amount: '$620.00',   date: '7 Apr', method: 'Bank Transfer', status: 'pending' },
  { id: 'PAY-877', customer: 'BigW',       invoice: 'INV-2026-1175', amount: '$980.00',   date: '6 Apr', method: 'Stripe',        status: 'pending' },
];

export default function Payments() {
  const [matched, setMatched] = useState([]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payment Tracking</h1>
        <p className="text-sm text-gray-500 mt-1">Reconcile incoming payments with invoices</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Received Today',   value: '$18,450', color: 'text-emerald-600' },
          { label: 'Pending Match',    value: `${payments.filter(p=>p.status==='pending').length} payments`, color: 'text-yellow-600' },
          { label: 'MTD Collections', value: '$486,500', color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recent Payments</h3>
          <button className="btn btn-dark text-xs">Upload Bank Statement</button>
        </div>
        <div className="divide-y divide-gray-50">
          {payments.map(p => {
            const isMatched = matched.includes(p.id) || p.status === 'reconciled';
            return (
              <div key={p.id} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMatched ? 'bg-emerald-100' : 'bg-yellow-100'}`}>
                    {isMatched ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Clock size={18} className="text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{p.customer} — {p.amount}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.invoice} · {p.method} · {p.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isMatched ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">✓ Reconciled</span>
                  ) : (
                    <button onClick={() => setMatched(m => [...m, p.id])} className="btn btn-primary text-xs py-1.5">
                      Match Payment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

