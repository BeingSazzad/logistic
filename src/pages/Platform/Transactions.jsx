import React, { useState } from 'react';
import { Download, Search, FileText, CheckCircle2, Clock } from 'lucide-react';

const transactions = [
  { id: 'TXN-0102', date: '2026-04-08 10:15', tenant: 'HERO Logistics Pty Ltd', amount: '$149.00', plan: 'Pro', status: 'Paid' },
  { id: 'TXN-0101', date: '2026-04-07 14:30', tenant: 'SunState Transport',     amount: '$149.00', plan: 'Pro', status: 'Paid' },
  { id: 'TXN-0100', date: '2026-04-05 09:00', tenant: 'OzFreight Co',           amount: '$599.00', plan: 'Enterprise', status: 'Paid' },
  { id: 'TXN-0099', date: '2026-04-01 11:20', tenant: 'FastMove AU',            amount: '$99.00',  plan: 'Starter', status: 'Pending' },
  { id: 'TXN-0098', date: '2026-03-28 16:45', tenant: 'HERO Logistics Pty Ltd', amount: '$149.00', plan: 'Pro', status: 'Paid' },
];

export default function PlatformTransactions() {
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t => 
    t.tenant.toLowerCase().includes(search.toLowerCase()) || 
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">Tenant subscription billing and history</p>
        </div>
        <button className="btn btn-dark"><Download size={15} /> Export CSV</button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-9" placeholder="Search by Tenant or TXN ID..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Plan Billed</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.map(txn => (
              <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-gray-600 text-xs whitespace-nowrap">{txn.id}</td>
                <td className="px-6 py-4 text-gray-600">{txn.date}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{txn.tenant}</td>
                <td className="px-6 py-4 text-gray-500">{txn.plan}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{txn.amount}</td>
                <td className="px-6 py-4">
                  {txn.status === 'Paid' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1.5 rounded-md">
                      <CheckCircle2 size={12} /> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1.5 rounded-md">
                      <Clock size={12} /> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors">
                    <FileText size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
