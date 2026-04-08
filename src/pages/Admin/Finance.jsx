import React from 'react';
import { DollarSign, Search, Filter, CreditCard, Receipt, TrendingUp, AlertCircle, Download, ChevronDown } from 'lucide-react';

export default function AdminFinance() {
  const accounts = [
    { id: 'INV-1021', customer: 'Acme Corp', amount: '$42,500.00', status: 'Unpaid', dueDate: '15 Apr 2026', type: 'Credit' },
    { id: 'INV-1022', customer: 'Tech Solutions', amount: '$12,200.00', status: 'Paid', dueDate: '02 Apr 2026', type: 'Direct' },
    { id: 'INV-1023', customer: 'Global Traders', amount: '$85,000.00', status: 'Overdue', dueDate: '30 Mar 2026', type: 'Credit' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <DollarSign size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Controls</h1>
            <p className="text-sm text-gray-500 mt-1">Revenue overview, outstanding payments, and GST/Tax management.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-900 hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <Receipt size={16}/> Create Invoice
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <DollarSign size={16}/> Payouts
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Total Revenue</p><p className="text-2xl font-black text-gray-900 mt-1.5 leading-none">$4.12M</p></div>
          <div className="w-10 h-10 rounded border border-emerald-100 flex items-center justify-center bg-emerald-50 text-emerald-500"><TrendingUp size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Outstanding</p><p className="text-2xl font-black text-red-600 mt-1.5 leading-none">$184.5K</p></div>
          <div className="w-10 h-10 rounded border border-red-100 flex items-center justify-center bg-red-50 text-red-500"><AlertCircle size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Profit Margin</p><p className="text-2xl font-black text-blue-600 mt-1.5 leading-none">32.4%</p></div>
          <div className="w-10 h-10 rounded border border-blue-100 flex items-center justify-center bg-blue-50 text-blue-500"><TrendingUp size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">Tax (GST) Q2</p><p className="text-2xl font-black text-amber-600 mt-1.5 leading-none">$412K</p></div>
          <div className="w-10 h-10 rounded border border-amber-100 flex items-center justify-center bg-amber-50 text-amber-500"><DollarSign size={20}/></div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
          <div className="relative w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search by Invoice ID or Customer..."
              className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
              <Download size={14}/> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
              Sort By <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Type</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map(acc => (
                <tr className="hover:bg-gray-50/50 cursor-pointer group transition-all" key={acc.id}>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[#111] text-[15px]">{acc.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[#111]">{acc.customer}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-black text-[#111] text-sm">{acc.amount}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 w-max px-3 py-1.5 rounded-md border border-gray-200">
                      <CreditCard size={12}/> {acc.type}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`text-sm font-bold ${acc.status === 'Overdue' ? 'text-red-500' : 'text-gray-700'}`}>{acc.dueDate}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-md border ${
                      acc.status === 'Paid'    ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' :
                      acc.status === 'Overdue' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' :
                                                 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest">
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
