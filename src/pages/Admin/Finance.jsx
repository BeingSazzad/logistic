import React, { useState } from 'react';
import { 
  DollarSign, Search, Filter, CreditCard, Receipt, 
  TrendingUp, AlertCircle, Download, ChevronDown, CheckCircle2, Loader2,
  List, Activity, ArrowDownRight, ArrowUpRight
} from 'lucide-react';

export default function AdminFinance() {
  const [loadingInvoice, setLoadingInvoice] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'audit'

  const accounts = [
    { id: 'INV-1021', customer: 'Acme Corp', amount: '$42,500.00', status: 'Unpaid', dueDate: '15 Apr 2026', type: 'Credit' },
    { id: 'INV-1022', customer: 'Tech Solutions', amount: '$12,200.00', status: 'Paid', dueDate: '02 Apr 2026', type: 'Direct' },
    { id: 'INV-1023', customer: 'Global Traders', amount: '$85,000.00', status: 'Overdue', dueDate: '30 Mar 2026', type: 'Credit' },
  ];

  const auditLogs = [
    { id: 'AUD-091', action: 'Invoice INV-1021 Generated', user: 'Jack Taylor', time: '10 mins ago', status: 'Success' },
    { id: 'AUD-090', action: 'Payment $12,200 Processed', user: 'System', time: '1 hour ago', status: 'Success' },
    { id: 'AUD-089', action: 'Failed Charge Attempt', user: 'System', time: '3 hours ago', status: 'Failed' },
  ];

  const handleDownloadInvoice = (id) => {
    setLoadingInvoice(id);
    setTimeout(() => {
      setLoadingInvoice(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      const blob = new Blob(["Demo Invoice Content for " + id], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}_Invoice.txt`;
      a.click();
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 relative animate-in fade-in duration-500">
      
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
      <div className="flex justify-between items-center mb-2 px-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-900 shadow-sm">
            <DollarSign size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Finance</h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">Centralized financial operations and audit trail.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative border-r border-gray-200 pr-4 mr-2">
            <select className="appearance-none bg-white border border-gray-200 text-xs font-bold text-gray-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-gray-400 shadow-sm cursor-pointer">
              <option>All Branches</option>
              <option>Sydney HQ</option>
              <option>Melbourne Hub</option>
            </select>
            <ChevronDown size={14} className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-gray-400 shadow-sm cursor-pointer">
              <option>This Quarter</option>
              <option>FY 2026-2027</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="btn btn-primary px-6 tracking-widest shadow-sm">
            <Receipt size={16}/> Create Invoice
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 mb-2">
        <div className="card p-6 flex flex-col justify-between group border-transparent hover:border-gray-200 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl border border-emerald-100 flex items-center justify-center bg-emerald-50 text-emerald-500">
               <ArrowUpRight size={20}/>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+14.2%</span>
          </div>
          <div className="mt-6">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-tight">Total Revenue</p>
            <p className="text-3xl font-black text-gray-900 mt-1 leading-none">$4.12M</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between group border-transparent hover:border-gray-200 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl border border-red-100 flex items-center justify-center bg-red-50 text-red-500">
               <ArrowDownRight size={20}/>
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">+4.1%</span>
          </div>
          <div className="mt-6">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-tight">Total Expenses</p>
            <p className="text-3xl font-black text-gray-900 mt-1 leading-none">$1.28M</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between group border-transparent hover:border-gray-200 transition-colors bg-gray-900">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl border border-gray-700 flex items-center justify-center bg-gray-800 text-[#FFCC00]">
               <DollarSign size={20}/>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-tight">Net Profit</p>
            <p className="text-3xl font-black text-white mt-1 leading-none">$2.84M</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-2">
        <div className="flex items-center gap-6 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'transactions' ? 'border-[#FFCC00] text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
          >
            <List size={16} /> Transactions
          </button>
          <button 
            onClick={() => setActiveTab('audit')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'audit' ? 'border-[#FFCC00] text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
          >
            <Activity size={16} /> System Audit Logs
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mx-2">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
          <div className="relative w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter size={14}/> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Sort: Latest <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Transactions View */}
        {activeTab === 'transactions' && (
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
                      <div className="font-bold text-[#111] text-sm">{acc.id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111]">{acc.customer}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-black text-[#111] text-sm">{acc.amount}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 w-max px-3 py-1 rounded-md border border-gray-200">
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
                        className="min-w-[100px] text-[10px] font-bold text-gray-600 hover:text-white border border-gray-200 hover:bg-gray-900 hover:border-gray-900 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 ml-auto"
                      >
                        {loadingInvoice === acc.id ? <><Loader2 size={12} className="animate-spin" /> ...</> : 'View PDF'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Audit Logs View */}
        {activeTab === 'audit' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Audit ID</th>
                  <th className="px-6 py-4">Action Event</th>
                  <th className="px-6 py-4">Initiated By</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {auditLogs.map(log => (
                  <tr className="hover:bg-gray-50/50 transition-all cursor-default" key={log.id}>
                    <td className="px-6 py-5 font-bold text-[#111] text-xs">{log.id}</td>
                    <td className="px-6 py-5 font-medium text-gray-700 text-sm">{log.action}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-[9px] font-black text-gray-500">
                          {log.user.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <span className="font-bold text-gray-900 text-xs">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-medium text-gray-500">{log.time}</td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        log.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
