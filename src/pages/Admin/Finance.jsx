import React, { useState } from 'react';
import {
  DollarSign, Search, Filter, CreditCard, Receipt,
  TrendingUp, TrendingDown, AlertCircle, Download, ChevronDown,
  CheckCircle2, Loader2, List, Activity, ArrowDownRight,
  ArrowUpRight, BarChart2, Truck, Fuel, Wrench, Package, X
} from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { id: 'INV-1024', customer: 'AutoDeal Pty Ltd', amount: 64500,  status: 'Unpaid',  dueDate: '20 Apr 2026', type: 'Credit',  loads: 6 },
  { id: 'INV-1023', customer: 'Global Traders',   amount: 85000,  status: 'Overdue', dueDate: '30 Mar 2026', type: 'Credit',  loads: 9 },
  { id: 'INV-1022', customer: 'Tech Solutions',   amount: 12200,  status: 'Paid',    dueDate: '02 Apr 2026', type: 'Direct',  loads: 2 },
  { id: 'INV-1021', customer: 'Acme Corp',        amount: 42500,  status: 'Unpaid',  dueDate: '15 Apr 2026', type: 'Credit',  loads: 4 },
  { id: 'INV-1020', customer: 'Smith Motors',     amount: 28800,  status: 'Paid',    dueDate: '10 Apr 2026', type: 'Direct',  loads: 3 },
  { id: 'INV-1019', customer: 'EV Fleet Co',      amount: 19200,  status: 'Paid',    dueDate: '05 Apr 2026', type: 'Direct',  loads: 2 },
];

const AUDIT_LOGS = [
  { id: 'AUD-091', action: 'Invoice INV-1024 Generated',  user: 'Jack Taylor',   time: '10 mins ago', status: 'Success' },
  { id: 'AUD-090', action: 'Payment $12,200 Processed',   user: 'System',        time: '1 hour ago',  status: 'Success' },
  { id: 'AUD-089', action: 'Failed Charge Attempt',       user: 'System',        time: '3 hours ago', status: 'Failed' },
  { id: 'AUD-088', action: 'Expense LOG-8821 Approved',   user: 'Sarah Chen',    time: '5 hours ago', status: 'Success' },
  { id: 'AUD-087', action: 'Overdue Flag: INV-1023',      user: 'System',        time: '1 day ago',   status: 'Warning' },
];

// P&L line items (dynamic – linked to TRANSACTIONS for revenue)
const EXPENSE_LINES = [
  { category: 'Fuel & AdBlue',   icon: Fuel,     amount: 184200, trend: +4.1 },
  { category: 'Driver Wages',    icon: Truck,    amount: 521000, trend: +2.3 },
  { category: 'Maintenance',     icon: Wrench,   amount: 89400,  trend: -1.2 },
  { category: 'Depot / Storage', icon: Package,  amount: 42000,  trend: +0.8 },
  { category: 'Tolls & Levies',  icon: CreditCard, amount: 21600, trend: +1.1 },
];

const fmt = (n) => '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 0 });

const STATUS_STYLE = {
  Paid:    'bg-emerald-50 text-emerald-600 border-emerald-100',
  Unpaid:  'bg-amber-50 text-amber-600 border-amber-100',
  Overdue: 'bg-red-50 text-red-600 border-red-100',
};

export default function AdminFinance() {
  const [loadingInvoice, setLoadingInvoice] = useState(null);
  const [showSuccess, setShowSuccess]       = useState(false);
  const [activeTab, setActiveTab]           = useState('pl');   // 'pl' | 'transactions' | 'audit'
  const [search, setSearch]                 = useState('');

  // ── Computed P&L ───────────────────────────────────────────────────────
  const totalRevenue  = TRANSACTIONS.filter(t => t.status === 'Paid').reduce((sum, t) => sum + t.amount, 0);
  const totalPending  = TRANSACTIONS.filter(t => t.status !== 'Paid').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = EXPENSE_LINES.reduce((sum, e) => sum + e.amount, 0);
  const netProfit     = totalRevenue - totalExpenses;
  const margin        = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

  const filteredTx = TRANSACTIONS.filter(t => {
    const q = search.toLowerCase();
    return !q || t.id.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q);
  });

  const handleDownload = (id) => {
    setLoadingInvoice(id);
    setTimeout(() => {
      setLoadingInvoice(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1400);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 relative">

      {/* ── Toast ── */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-black text-[#FFCC00] px-6 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 animate-in slide-in-from-right-10 border border-[#FFCC00]">
          <CheckCircle2 size={20} />
          <div>
            <p className="text-sm font-semibold">Downloaded</p>
            <p className="text-xs font-bold text-gray-400">Invoice PDF ready.</p>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Finance &amp; P&amp;L</h1>
          <p className="hero-body text-gray-600 mt-1">Revenue, expenses &amp; profitability dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-xs font-medium rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#FFCC00] shadow-sm cursor-pointer">
              <option>This Quarter</option>
              <option>FY 2026–27</option>
              <option>Last 30 Days</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="btn btn-dark">
            <Receipt size={16} /> New Invoice
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2" />

      {/* ── KPI Summary Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {[
          { label: 'Total Revenue',   value: fmt(totalRevenue),  sub: 'Collected (Paid)',    icon: TrendingUp,   color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+14.2%', up: true },
          { label: 'Pending / Owed',  value: fmt(totalPending),  sub: 'Unpaid + Overdue',    icon: AlertCircle,  color: 'text-amber-600',   bg: 'bg-amber-50',   trend: '+2.1%',  up: false },
          { label: 'Total Expenses',  value: fmt(totalExpenses), sub: 'Operational Costs',   icon: TrendingDown, color: 'text-red-500',     bg: 'bg-red-50',     trend: '+4.1%',  up: false },
          { label: 'Net Profit',      value: fmt(Math.max(netProfit, 0)), sub: `${margin}% Margin`, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+9.8%', up: true },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 flex flex-col justify-between group hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${k.bg} ${k.color} group-hover:scale-110 transition-transform`}>
                <k.icon size={22} />
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl uppercase tracking-widest ${k.up ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                {k.trend}
              </span>
            </div>
            <div>
              <p className="hero-metadata">{k.label}</p>
              <p className="text-2xl font-semibold text-hero-dark mt-1 leading-none">{k.value}</p>
              <p className="text-xs font-medium text-gray-400 mt-1.5">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="px-2">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200 w-fit shadow-inner">
          {[
            { key: 'pl',           label: 'P&L Breakdown',   icon: BarChart2 },
            { key: 'transactions', label: 'Invoices',         icon: List },
            { key: 'audit',        label: 'Audit Trail',      icon: Activity },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === t.key ? 'bg-white text-gray-900 shadow-md border border-gray-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── P&L Tab ── */}
      {activeTab === 'pl' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" /> Revenue Breakdown
            </h3>
            <div className="space-y-3">
              {TRANSACTIONS.filter(t => t.status === 'Paid').map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{t.customer}</p>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">{t.id} · {t.loads} loads</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-700">{fmt(t.amount)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-emerald-500 rounded-2xl">
                <span className="text-xs font-medium text-white">Total Revenue</span>
                <span className="text-base font-semibold text-white">{fmt(totalRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <TrendingDown size={16} className="text-red-500" /> Expense Breakdown
            </h3>
            <div className="space-y-3">
              {EXPENSE_LINES.map((e, i) => {
                const pct = Math.round((e.amount / totalExpenses) * 100);
                return (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <e.icon size={14} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-900">{e.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold uppercase ${e.trend > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {e.trend > 0 ? '+' : ''}{e.trend}%
                        </span>
                        <span className="text-xs font-semibold text-gray-900">{fmt(e.amount)}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs font-medium text-gray-400 mt-1">{pct}% of total spend</p>
                  </div>
                );
              })}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-2xl">
                <span className="text-xs font-medium text-white">Total Expenses</span>
                <span className="text-base font-semibold text-red-400">{fmt(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Net Profit Banner */}
          <div className="lg:col-span-2 bg-[#111] rounded-3xl border border-gray-800 shadow-2xl p-8 flex items-center justify-between">
            <div>
              <p className="hero-metadata mb-1">Net Profit (This Quarter)</p>
              <p className="text-4xl font-bold text-[#FFCC00] leading-none">{fmt(Math.max(netProfit, 0))}</p>
              <p className="text-xs font-medium text-gray-500 mt-3">{margin}% profit margin · Revenue − Expenses</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-gray-500 mb-1">Revenue vs Expenses</div>
              <div className="flex items-center gap-4 justify-end mt-2">
                <div className="text-right">
                  <p className="text-xs font-medium text-emerald-500">Revenue</p>
                  <p className="text-lg font-semibold text-white">{fmt(totalRevenue)}</p>
                </div>
                <div className="w-px h-10 bg-gray-800" />
                <div className="text-right">
                  <p className="text-xs font-medium text-red-400">Expenses</p>
                  <p className="text-lg font-semibold text-white">{fmt(totalExpenses)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Transactions Tab ── */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mx-2">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
            <div className="relative w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search by ID or customer..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5">Invoice ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Amount</th>
                  <th className="px-6 py-5">Loads</th>
                  <th className="px-6 py-5">Due Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTx.map(acc => (
                  <tr className="hover:bg-gray-50/50 cursor-pointer group transition-all" key={acc.id}>
                    <td className="px-6 py-5">
                      <span className="font-mono font-semibold text-gray-900 text-sm">{acc.id}</span>
                    </td>
                    <td className="px-6 py-5 font-semibold text-gray-900 text-sm">{acc.customer}</td>
                    <td className="px-6 py-5 font-semibold text-gray-900 text-sm">{fmt(acc.amount)}</td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">{acc.loads} loads</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-sm font-semibold ${acc.status === 'Overdue' ? 'text-red-500' : 'text-gray-700'}`}>{acc.dueDate}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl border uppercase tracking-widest ${STATUS_STYLE[acc.status]}`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={e => { e.stopPropagation(); handleDownload(acc.id); }}
                        disabled={!!loadingInvoice}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-500 border border-gray-200 hover:bg-gray-900 hover:text-[#FFCC00] hover:border-gray-900 px-4 py-2 rounded-xl transition-all uppercase tracking-widest ml-auto shadow-sm disabled:opacity-40"
                      >
                        {loadingInvoice === acc.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Audit Tab ── */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mx-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5">Audit ID</th>
                  <th className="px-6 py-5">Event</th>
                  <th className="px-6 py-5">Actor</th>
                  <th className="px-6 py-5">Timestamp</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {AUDIT_LOGS.map(log => (
                  <tr className="hover:bg-gray-50/50 transition-all" key={log.id}>
                    <td className="px-6 py-5 font-mono font-medium text-gray-500 text-xs">{log.id}</td>
                    <td className="px-6 py-5 font-bold text-gray-900 text-sm">{log.action}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                          {log.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-semibold text-gray-900">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-gray-500">{log.time}</td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl border uppercase tracking-widest ${
                        log.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        log.status === 'Warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                   'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}


