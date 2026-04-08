import React, { useState } from 'react';
import { Send, Eye, Download, CheckCircle2, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-1247', customer: 'Woolworths',  job: 'J-2026-1260', amount: '$2,037.20', due: '9 May 2026',  status: 'ready',   days: null },
  { id: 'INV-2026-1243', customer: 'Coles',        job: 'J-2026-1253', amount: '$1,450.00', due: '28 Apr 2026', status: 'sent',    days: null },
  { id: 'INV-2026-1238', customer: 'Amazon AU',    job: 'J-2026-1248', amount: '$980.50',   due: '15 Apr 2026', status: 'overdue', days: 22 },
  { id: 'INV-2026-1201', customer: 'IGA',          job: 'J-2026-1201', amount: '$620.00',   due: '10 Mar 2026', status: 'overdue', days: 58 },
  { id: 'INV-2026-1195', customer: 'Woolworths',   job: 'J-2026-1195', amount: '$3,120.00', due: '5 Mar 2026',  status: 'paid',    days: null },
];

const statusConfig = {
  ready:   { label: 'Ready to Send', bg: 'bg-blue-100',   text: 'text-blue-700',   icon: Clock },
  sent:    { label: 'Sent',          bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Send },
  overdue: { label: 'Overdue',       bg: 'bg-red-100',    text: 'text-red-700',    icon: AlertCircle },
  paid:    { label: 'Paid',          bg: 'bg-green-100',  text: 'text-green-700',  icon: CheckCircle2 },
};

const TABS = ['All', 'Ready to Send', 'Sent', 'Overdue', 'Paid'];

export default function Invoices() {
  const [tab, setTab] = useState('All');
  const [sent, setSent] = useState([]);

  const filtered = invoices.filter(inv => {
    if (tab === 'All') return true;
    if (tab === 'Ready to Send') return inv.status === 'ready';
    if (tab === 'Sent')          return inv.status === 'sent';
    if (tab === 'Overdue')       return inv.status === 'overdue';
    if (tab === 'Paid')          return inv.status === 'paid';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and send customer invoices</p>
        </div>
        <div className="flex gap-2">
          <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Download size={15} /> Export CSV
          </button>
          <button className="btn btn-primary">
            <Send size={15} /> Send All Ready ({invoices.filter(i => i.status === 'ready').length})
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Outstanding', value: '$127,300', color: 'text-gray-900' },
          { label: 'Overdue',           value: '$18,900',  color: 'text-red-600' },
          { label: 'Paid This Month',   value: '$486,500', color: 'text-emerald-600' },
          { label: 'Avg Days to Pay',   value: '24 days',  color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Invoice</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(inv => {
              const cfg = statusConfig[inv.status];
              const isSent = sent.includes(inv.id);
              return (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">{inv.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{inv.job}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{inv.customer}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${inv.status === 'overdue' ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                      {inv.due}
                      {inv.days && <span className="ml-1 text-xs">({inv.days}d overdue)</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                      <cfg.icon size={11} />
                      {isSent ? 'Sent' : cfg.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="btn btn-dark text-xs py-1.5 px-3">
                        <Eye size={12} /> Preview
                      </button>
                      {(inv.status === 'ready' && !isSent) && (
                        <button onClick={() => setSent(s => [...s, inv.id])}
                          className="btn btn-primary text-xs py-1.5 px-3">
                          <Send size={12} /> Send
                        </button>
                      )}
                      {inv.status === 'overdue' && (
                        <button className="btn text-xs py-1.5 px-3 bg-red-100 text-red-700 hover:bg-red-200">
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
  );
}
