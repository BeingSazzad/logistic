import React, { useState } from 'react';
import { Download, Search, FileText, CheckCircle2, Clock, ChevronDown, DollarSign } from 'lucide-react';

const transactions = [
  { id: 'TXN-0102', date: '2026-04-08 10:15', tenant: 'HERO Logistics Pty Ltd', amount: '$149.00', plan: 'Pro',        status: 'Paid' },
  { id: 'TXN-0101', date: '2026-04-07 14:30', tenant: 'SunState Transport',     amount: '$149.00', plan: 'Pro',        status: 'Paid' },
  { id: 'TXN-0100', date: '2026-04-05 09:00', tenant: 'OzFreight Co',           amount: '$599.00', plan: 'Enterprise', status: 'Paid' },
  { id: 'TXN-0099', date: '2026-04-01 11:20', tenant: 'FastMove AU',            amount: '$99.00',  plan: 'Starter',   status: 'Pending' },
  { id: 'TXN-0098', date: '2026-03-28 16:45', tenant: 'HERO Logistics Pty Ltd', amount: '$149.00', plan: 'Pro',        status: 'Paid' },
];

export default function PlatformTransactions() {
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t =>
    t.tenant.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = transactions.filter(t => t.status === 'Paid').reduce((s, t) => s + parseFloat(t.amount.replace('$', '')), 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">Tenant subscription billing and payment history.</p>
        </div>
        <button className="bg-gray-900 hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Download size={16}/> Export CSV
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Collected</p><p className="text-2xl font-black text-emerald-600 mt-0.5">${totalPaid.toFixed(2)}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500"><DollarSign size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Paid</p><p className="text-2xl font-black text-gray-900 mt-0.5">{transactions.filter(t => t.status === 'Paid').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400"><CheckCircle2 size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Pending</p><p className="text-2xl font-black text-yellow-600 mt-0.5">{transactions.filter(t => t.status === 'Pending').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-50 text-yellow-500"><Clock size={20}/></div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all"
              placeholder="Search by Tenant or TXN ID..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
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
            <tbody className="divide-y divide-gray-100">
              {filtered.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <div className="font-mono font-bold text-gray-500 text-xs">{txn.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-500">{txn.date}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[#111] text-[15px]">{txn.tenant}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-bold text-gray-600 bg-gray-100 w-max px-2.5 py-1 rounded-md border border-gray-200 uppercase">{txn.plan}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-black text-[#111]">{txn.amount}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-md border inline-flex items-center gap-1.5 ${
                      txn.status === 'Paid' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {txn.status === 'Paid' ? <CheckCircle2 size={10}/> : <Clock size={10}/>}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                      View PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
