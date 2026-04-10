import React, { useState } from 'react';
import { Camera, Receipt, CheckCircle, Plus, Fuel, Wrench } from 'lucide-react';

const submitted = [
  { id: 'TOL-881', type: 'Toll', desc: 'M1 Sydney–Melbourne', amount: 45.00, date: 'Today', status: 'pending' },
  { id: 'TOL-872', type: 'Toll', desc: 'Lane Cove Tunnel',     amount: 35.00, date: '7 Apr', status: 'approved' },
  { id: 'FUL-041', type: 'Fuel', desc: 'Goulburn service stop',amount: 180.50,date: '8 Apr', status: 'approved' },
];

export default function DriverExpenses() {
  const [form, setForm] = useState(null);
  const [done, setDone] = useState(false);

  if (form && !done) {
    return (
      <div className="p-4 pb-24">
        <button onClick={() => setForm(null)} className="text-sm text-gray-500 mb-4 flex items-center gap-1">← Back</button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Submit {form} Expense</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Amount ($)</label>
              <input type="number" className="input" placeholder="45.00" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Description</label>
              <input className="input" placeholder={form === 'Toll' ? 'e.g. M1 Motorway' : form === 'Fuel' ? 'e.g. Goulburn BP' : 'e.g. Replaced flat tire'} />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Link to Job</label>
              <select className="input">
                <option>J-2026-1260 — Sydney to Melbourne</option>
                <option>J-2026-1268 — Melbourne to Adelaide</option>
              </select>
            </div>
            <div className="border border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center gap-2 hover:bg-gray-50 cursor-pointer">
              <Camera size={24} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-700">Upload Receipt Photo</p>
              <p className="text-xs text-gray-400">Required for approval</p>
            </div>
          </div>
          <button onClick={() => setDone(true)} className="w-full btn btn-primary py-4 mt-5">
            Submit for Approval
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="p-4 flex flex-col items-center justify-center gap-4 min-h-[60vh]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-bold text-gray-900">Submitted!</h3>
        <p className="text-sm text-gray-500 text-center">Your claim is pending Accounts review.<br />You'll be notified when approved.</p>
        <button onClick={() => { setForm(null); setDone(false); }} className="btn btn-primary mt-2">Submit Another</button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 pb-24">
      <div className="pt-1">
        <h2 className="text-lg font-bold text-gray-900">Expenses</h2>
        <p className="text-xs text-gray-500 mt-0.5">Submit toll & fuel reimbursements</p>
      </div>

      {/* Submit Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => { setForm('Toll'); setDone(false); }}
          className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex flex-col items-center gap-2 hover:bg-orange-100 transition-colors">
          <Receipt size={28} className="text-orange-600" />
          <p className="font-bold text-sm text-orange-800">Toll Receipt</p>
          <p className="text-[10px] font-semibold text-orange-600 text-center uppercase tracking-widest mt-1">Upload + Amount</p>
        </button>
        <button onClick={() => { setForm('Fuel'); setDone(false); }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col items-center gap-2 hover:bg-blue-100 transition-colors">
          <Fuel size={28} className="text-blue-600" />
          <p className="font-bold text-sm text-blue-800">Fuel Expense</p>
          <p className="text-[10px] font-semibold text-blue-600 text-center uppercase tracking-widest mt-1">Upload + Litres</p>
        </button>
        <button onClick={() => { setForm('Maintenance'); setDone(false); }}
          className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col items-center gap-2 hover:bg-red-100 transition-colors col-span-2">
          <Wrench size={24} className="text-red-600" />
          <p className="font-bold text-sm text-red-800">Maintenance & Repairs</p>
          <p className="text-xs text-red-600 text-center">Tire punctures, oil, repairs, workshop</p>
        </button>
      </div>

      {/* Recent Claims */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">My Claims</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {submitted.map(c => (
            <div key={c.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  c.type === 'Toll' ? 'bg-orange-100 text-orange-600' : 
                  c.type === 'Fuel' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                }`}>
                  {c.type === 'Toll' ? <Receipt size={16} /> : c.type === 'Fuel' ? <Fuel size={16} /> : <Wrench size={16} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{c.desc}</p>
                  <p className="text-xs text-gray-500">{c.date} · {c.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${c.amount.toFixed(2)}</p>
                <span className={`text-[10px] font-black uppercase ${c.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
