import React, { useState } from 'react';
import { Download, CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-1238', job: 'J-2026-1248', amount: '$980.50',  due: '15 Apr 2026', status: 'unpaid',  issued: '16 Mar' },
  { id: 'INV-2026-1225', job: 'J-2026-1240', amount: '$2,037.20',due: '10 Apr 2026', status: 'unpaid',  issued: '11 Mar' },
  { id: 'INV-2026-1195', job: 'J-2026-1195', amount: '$3,120.00',due: '5 Mar 2026',  status: 'paid',    issued: '3 Feb' },
  { id: 'INV-2026-1180', job: 'J-2026-1180', amount: '$620.00',  due: '28 Feb 2026', status: 'paid',    issued: '29 Jan' },
];

const statusCfg = {
  unpaid: { label: 'Unpaid', bg: 'bg-red-100',    text: 'text-red-700',    icon: AlertCircle },
  paid:   { label: 'Paid',   bg: 'bg-green-100',  text: 'text-green-700',  icon: CheckCircle2 },
};

export default function CustomerInvoices() {
  const [paying, setPaying] = useState(null);
  const [paid, setPaid] = useState([]);

  if (paying) {
    const inv = invoices.find(i => i.id === paying);
    return (
      <div className="max-w-lg mx-auto">
        <button onClick={() => setPaying(null)} className="text-sm text-gray-500 hover:text-gray-700 mb-6">← Back to Invoices</button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Pay Invoice</h2>
          <p className="text-sm text-gray-500 mb-6">{paying}</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Amount due</span>
            <span className="text-2xl font-black text-gray-900">{inv?.amount}</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Card Number</label>
              <input className="input font-mono" defaultValue="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Expiry</label>
                <input className="input" defaultValue="12/28" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">CVV</label>
                <input className="input" defaultValue="123" />
              </div>
            </div>
          </div>
          {paid.includes(paying) ? (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2" />
              <p className="font-bold text-green-800">Payment Successful!</p>
              <p className="text-sm text-green-600 mt-1">Receipt sent to your email.</p>
              <button onClick={() => setPaying(null)} className="btn btn-primary mt-4">Done</button>
            </div>
          ) : (
            <button onClick={() => { setPaid(p => [...p, paying]); }}
              className="w-full btn btn-primary py-4 mt-6 text-base">
              <CreditCard size={18} /> Pay {inv?.amount} via Stripe
            </button>
          )}
          <p className="text-xs text-center text-gray-400 mt-3">🔒 Secured by Stripe · AES-256 encryption</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">{invoices.filter(i => i.status === 'unpaid').length} outstanding</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Outstanding', value: '$3,017.70', color: 'text-red-600' },
          { label: 'Paid (All Time)', value: '$3,740.00', color: 'text-emerald-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {invoices.map(inv => {
            const isPaid = paid.includes(inv.id) || inv.status === 'paid';
            const cfg = isPaid ? statusCfg.paid : statusCfg.unpaid;
            return (
              <div key={inv.id} className="p-5 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-sm">{inv.id}</p>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} flex items-center gap-1`}>
                      <cfg.icon size={10} /> {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{inv.job} · Issued {inv.issued} · Due {inv.due}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">{inv.amount}</span>
                  <button className="btn btn-dark text-xs py-1.5 px-3"><Download size={12} /> PDF</button>
                  {!isPaid && (
                    <button onClick={() => setPaying(inv.id)} className="btn btn-primary text-xs py-1.5 px-3">
                      Pay Now
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
