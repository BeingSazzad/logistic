import React, { useState } from 'react';
import { CheckCircle2, Clock, XCircle, Receipt, AlertCircle } from 'lucide-react';

const claims = [
  { id: 'TOL-881', driver: 'James Mitchell', job: 'J-2026-1260', type: 'Toll', amount: 45.00, date: '9 Apr',  status: 'pending',  desc: 'M1 Sydney–Melbourne' },
  { id: 'TOL-879', driver: 'Sarah Chen',     job: 'J-2026-1255', type: 'Toll', amount: 28.00, date: '8 Apr',  status: 'pending',  desc: 'Eastern Distributor' },
  { id: 'FUL-041', driver: 'Michael Wong',   job: 'J-2026-1249', type: 'Fuel', amount: 180.50, date: '8 Apr', status: 'approved', desc: 'Goulburn service stop' },
  { id: 'TOL-872', driver: 'David Lee',      job: 'J-2026-1241', type: 'Toll', amount: 35.00, date: '7 Apr',  status: 'paid',     desc: 'Lane Cove Tunnel' },
  { id: 'TOL-870', driver: 'James Mitchell', job: 'J-2026-1238', type: 'Toll', amount: 22.00, date: '6 Apr',  status: 'rejected', desc: 'Claim duplicate' },
];

const statusCfg = {
  pending:  { label: 'Pending',  bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
  approved: { label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
  paid:     { label: 'Paid',     bg: 'bg-blue-100',   text: 'text-blue-700',   icon: CheckCircle2 },
  rejected: { label: 'Rejected', bg: 'bg-red-100',    text: 'text-red-700',    icon: XCircle },
};

export default function Reimbursements() {
  const [decisions, setDecisions] = useState({});
  const decide = (id, action) => setDecisions(d => ({ ...d, [id]: action }));

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Driver Reimbursements</h1>
        <p className="text-sm text-gray-500 mt-1">Review toll and fuel expense claims</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: `${claims.filter(c=>c.status==='pending').length} claims`, color: 'text-yellow-600' },
          { label: 'Approved This Week', value: '$253.50', color: 'text-emerald-600' },
          { label: 'Paid This Week',     value: '$580.00', color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Claims */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Expense Claims</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {claims.map(claim => {
            const status = decisions[claim.id] || claim.status;
            const cfg = statusCfg[status];
            return (
              <div key={claim.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    claim.type === 'Toll' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    <Receipt size={18} className={claim.type === 'Toll' ? 'text-orange-600' : 'text-blue-600'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{claim.driver}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">{claim.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{claim.job} · {claim.desc} · {claim.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900 text-lg">${claim.amount.toFixed(2)}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                    <cfg.icon size={11} /> {cfg.label}
                  </span>
                  {status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => decide(claim.id, 'approved')}
                        className="btn text-xs py-1.5 px-3 bg-emerald-500 text-white hover:bg-emerald-600">
                        Approve
                      </button>
                      <button onClick={() => decide(claim.id, 'rejected')}
                        className="btn text-xs py-1.5 px-3 bg-red-100 text-red-700 hover:bg-red-200">
                        Reject
                      </button>
                    </div>
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
