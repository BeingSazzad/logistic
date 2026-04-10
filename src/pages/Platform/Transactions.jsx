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
  const [showSort, setShowSort] = useState(false);

  const filtered = transactions.filter(t =>
    t.tenant.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = transactions.filter(t => t.status === 'Paid').reduce((s, t) => s + parseFloat(t.amount.replace('$', '')), 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">Company subscription billing and payment history.</p>
        </div>
        <button className="bg-gray-900 hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Download size={16}/> Export CSV
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 mb-6">
        <div className="card p-5 flex flex-col justify-between">
          <div><p className="hero-metadata">Total Collected</p><p className="text-2xl font-semibold text-emerald-600 mt-1">${totalPaid.toFixed(2)}</p></div>
          <div className="flex items-center justify-between mt-4">
             <span className="text-sm font-medium text-gray-500">All Time</span>
             <DollarSign size={20} className="text-emerald-500"/>
          </div>
        </div>
        
        <div className="card p-5 flex flex-col justify-between">
          <div><p className="hero-metadata">Paid</p><p className="text-2xl font-semibold text-gray-900 mt-1">{transactions.filter(t => t.status === 'Paid').length}</p></div>
          <div className="flex items-center justify-between mt-4">
             <span className="text-sm font-medium text-gray-500">Transactions</span>
             <CheckCircle2 size={20} className="text-gray-400"/>
          </div>
        </div>
        
        <div className="card p-5 flex flex-col justify-between">
          <div><p className="hero-metadata">Pending</p><p className="text-2xl font-semibold text-yellow-600 mt-1">{transactions.filter(t => t.status === 'Pending').length}</p></div>
          <div className="flex items-center justify-between mt-4">
             <span className="text-sm font-medium text-gray-500">Transactions</span>
             <Clock size={20} className="text-yellow-500"/>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all"
              placeholder="Search by Company or TXN ID..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Sort By <ChevronDown size={16} className={`text-gray-400 transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>

            {showSort && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="py-1">
                  {['Date (Newest)', 'Date (Oldest)', 'Company Name', 'Highest Amount', 'Lowest Amount'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setShowSort(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Company</th>
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
