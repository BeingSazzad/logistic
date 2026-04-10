import React, { useState } from 'react';
import { 
  DollarSign, Search, Filter, CreditCard, Receipt, 
  TrendingUp, AlertCircle, Download, ChevronDown, CheckCircle2, Loader2
} from 'lucide-react';

export default function AdminFinance() {
  const [loadingInvoice, setLoadingInvoice] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const accounts = [
    { id: 'INV-1021', customer: 'Acme Corp', amount: '$42,500.00', status: 'Unpaid', dueDate: '15 Apr 2026', type: 'Credit' },
    { id: 'INV-1022', customer: 'Tech Solutions', amount: '$12,200.00', status: 'Paid', dueDate: '02 Apr 2026', type: 'Direct' },
    { id: 'INV-1023', customer: 'Global Traders', amount: '$85,000.00', status: 'Overdue', dueDate: '30 Mar 2026', type: 'Credit' },
  ];

  const handleDownloadInvoice = (id) => {
    setLoadingInvoice(id);
    // Simulate generation delay
    setTimeout(() => {
      setLoadingInvoice(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Real download simulation
      const blob = new Blob(["Demo Invoice Content for " + id], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}_Invoice.txt`;
      a.click();
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 relative">
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-black text-[#FFCC00] px-6 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 animate-in slide-in-from-right-10 border border-[#FFCC00]">
           <CheckCircle2 size={20} />
           <div>
              <p className="text-sm font-black uppercase tracking-widest">Success</p>
              <p className="text-xs font-bold text-gray-400">Invoice downloaded successfully.</p>
           </div>
        </div>
      )}

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
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all shadow-sm cursor-pointer">
              <option>FY 2026-2027</option>
              <option>FY 2025-2026</option>
              <option>This Quarter</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
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
        {[
          { label: 'Total Revenue', val: '$4.12M', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Outstanding', val: '$184.5K', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
          { label: 'Profit Margin', val: '32.4%', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'Tax (GST) Q2', val: '$412K', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
        ].map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">{k.label}</p><p className="text-2xl font-black text-gray-900 mt-1.5 leading-none">{k.val}</p></div>
            <div className={`w-10 h-10 rounded border ${k.border} flex items-center justify-center ${k.bg} ${k.color}`}><k.icon size={20}/></div>
          </div>
        ))}
      </div>

      {/* Revenue Trend Chart (Custom Tailwind) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col mb-2">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-bold text-gray-900 text-lg">Yearly Revenue Flow</h3>
               <p className="text-xs text-gray-500 mt-1">Monthly collection vs projected targets</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#FFCC00]"></div><span className="text-xs font-bold text-gray-600">Collected Income</span></div>
               <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-gray-200"></div><span className="text-xs font-bold text-gray-400">Projections</span></div>
            </div>
         </div>
         <div className="flex items-end gap-2 h-48 w-full pt-4 border-b border-gray-100 pb-2">
            {[ 
              {m: 'Jul', v: 40}, {m: 'Aug', v: 65}, {m: 'Sep', v: 55}, {m: 'Oct', v: 80}, {m: 'Nov', v: 70}, {m: 'Dec', v: 110},
              {m: 'Jan', v: 90}, {m: 'Feb', v: 130}, {m: 'Mar', v: 160}, {m: 'Apr', v: 140}, {m: 'May', v: 180}, {m: 'Jun', v: 210}
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <div className="w-full relative h-[140px] flex items-end justify-center">
                    {/* Projection Box */}
                    <div className="absolute bottom-0 w-8 bg-gray-100 rounded-t-md transition-all" style={{ height: `${(d.v/210)*100 + 10}%` }}></div>
                    {/* Actual Bar */}
                    <div className="absolute bottom-0 w-8 bg-[#FFCC00] rounded-t-md hover:bg-yellow-400 transition-colors cursor-pointer" style={{ height: `${(d.v/210)*100}%` }}>
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all z-10 shadow-lg">
                         ${d.v}k
                       </div>
                    </div>
                 </div>
                 <span className="text-[10px] font-bold text-gray-400 uppercase">{d.m}</span>
              </div>
            ))}
         </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDownloadInvoice(acc.id); }}
                      disabled={loadingInvoice === acc.id}
                      className="min-w-[100px] text-[10px] font-bold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loadingInvoice === acc.id ? (
                        <>
                          <Loader2 size={12} className="animate-spin" /> ...
                        </>
                      ) : (
                        'View PDF'
                      )}
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
