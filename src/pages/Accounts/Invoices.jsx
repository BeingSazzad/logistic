import React, { useState } from 'react';
import { Send, Eye, Download, CheckCircle2, Clock, AlertCircle, ChevronDown } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-1247', customer: 'Woolworths',  job: 'J-2026-1260', amount: '$2,037.20', due: '9 May 2026',  status: 'ready',   days: null },
  { id: 'INV-2026-1243', customer: 'Coles',        job: 'J-2026-1253', amount: '$1,450.00', due: '28 Apr 2026', status: 'sent',    days: null },
  { id: 'INV-2026-1238', customer: 'Amazon AU',    job: 'J-2026-1248', amount: '$980.50',   due: '15 Apr 2026', status: 'overdue', days: 22 },
  { id: 'INV-2026-1201', customer: 'IGA',          job: 'J-2026-1201', amount: '$620.00',   due: '10 Mar 2026', status: 'overdue', days: 58 },
  { id: 'INV-2026-1195', customer: 'Woolworths',   job: 'J-2026-1195', amount: '$3,120.00', due: '5 Mar 2026',  status: 'paid',    days: null },
];

const statusConfig = {
  ready:   { label: 'Ready to Send', cls: 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]',  icon: Clock },
  sent:    { label: 'Sent',          cls: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Send },
  overdue: { label: 'Overdue',       cls: 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]',  icon: AlertCircle },
  paid:    { label: 'Paid',          cls: 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]',  icon: CheckCircle2 },
};

const TABS = ['All', 'Ready to Send', 'Sent', 'Overdue', 'Paid'];

export default function Invoices() {
  const [tab, setTab] = useState('All');
  const [sent, setSent] = useState([]);

  const filtered = invoices.filter(inv => {
    if (tab === 'All') return true;
    if (tab === 'Ready to Send') return inv.status === 'ready';
    if (tab === 'Sent')          return inv.status === 'sent' || sent.includes(inv.id);
    if (tab === 'Overdue')       return inv.status === 'overdue';
    if (tab === 'Paid')          return inv.status === 'paid';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and send customer invoices. Track payment status and follow up on overdue accounts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <Download size={16} /> Export CSV
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <Send size={16} /> Send All Ready ({invoices.filter(i => i.status === 'ready').length})
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'Total Outstanding', value: '$127,300', color: 'text-gray-900' },
          { label: 'Overdue Balance',   value: '$18,900',  color: 'text-red-600' },
          { label: 'Paid This Month',   value: '$486,500', color: 'text-emerald-600' },
          { label: 'Avg Days to Pay',   value: '24 days',  color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{s.label}</p>
            <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Invoice Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(inv => {
                const cfg = statusConfig[inv.status];
                const isSent = sent.includes(inv.id);
                return (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-[15px]">{inv.id}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">{inv.job}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-sm">{inv.customer}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-black text-[#111]">{inv.amount}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`text-sm font-bold ${inv.status === 'overdue' ? 'text-red-500' : 'text-gray-700'}`}>
                        {inv.due}
                        {inv.days && <span className="ml-1 text-[10px] font-bold text-red-400">({inv.days}d overdue)</span>}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-md border inline-flex items-center gap-1.5 ${cfg.cls}`}>
                        <cfg.icon size={10} />
                        {isSent ? 'Sent' : cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                          Preview
                        </button>
                        {(inv.status === 'ready' && !isSent) && (
                          <button onClick={() => setSent(s => [...s, inv.id])}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors uppercase tracking-widest ml-3">
                            Send
                          </button>
                        )}
                        {inv.status === 'overdue' && (
                          <button className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors uppercase tracking-widest ml-3">
                            Follow Up
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
