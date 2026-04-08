import React from 'react';
import { DollarSign, Search, Filter, CreditCard, Receipt, TrendingUp, AlertCircle, ArrowDownUp, Download } from 'lucide-react';

export default function AdminFinance() {
  const accounts = [
    { id: 'INV-1021', customer: 'Acme Corp', amount: '$42,500.00', status: 'Unpaid', dueDate: '15 Apr 2026', type: 'Credit' },
    { id: 'INV-1022', customer: 'Tech Solutions', amount: '$12,200.00', status: 'Paid',   dueDate: '02 Apr 2026', type: 'Direct' },
    { id: 'INV-1023', customer: 'Global Traders', amount: '$85,000.00', status: 'Overdue', dueDate: '30 Mar 2026', type: 'Credit' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Controls</h1>
          <p className="text-sm text-gray-500 mt-1">Company-wide revenue overview, outstanding payments, and GST/Tax management.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-dark"><Receipt size={16}/> Create Invoice</button>
          <button className="btn btn-primary"><DollarSign size={16}/> Payouts</button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* Finance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 bg-white border-l-4 border-l-green-500 shadow-sm">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
           <div className="flex justify-between items-end mt-2">
              <p className="text-2xl font-black text-gray-900">$4.12M</p>
              <TrendingUp size={18} className="text-green-500 mb-1" />
           </div>
        </div>
        <div className="card p-5 bg-white border-l-4 border-l-red-500 shadow-sm">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Outstanding</p>
           <div className="flex justify-between items-end mt-2">
              <p className="text-2xl font-black text-red-600">$184.5K</p>
              <AlertCircle size={18} className="text-red-400 mb-1" />
           </div>
        </div>
        <div className="card p-5 bg-white border-l-4 border-l-blue-500 shadow-sm">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profit Margin</p>
           <div className="flex justify-between items-end mt-2">
              <p className="text-2xl font-black text-blue-600">32.4%</p>
              <TrendingUp size={18} className="text-blue-400 mb-1" />
           </div>
        </div>
        <div className="card p-5 bg-white border-l-4 border-l-yellow-400 shadow-sm">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tax Provision (GST)</p>
           <div className="flex justify-between items-end mt-2">
              <p className="text-2xl font-black text-yellow-600">$412K</p>
              <p className="text-[10px] text-gray-500 font-bold mb-1">Q2 Est.</p>
           </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card bg-white mt-2 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
           <div className="relative w-full sm:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by Invoice ID or Customer..." className="input pl-9 w-full bg-white border-gray-200" />
           </div>
           
           <div className="flex gap-2 w-full sm:w-auto">
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <ArrowDownUp size={14}/> 
               <span className="text-xs font-bold">Sort</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <Download size={14}/> 
               <span className="text-xs font-bold">Export</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <Filter size={14}/> 
               <span className="text-xs font-bold">Filters</span>
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
               <tr>
                 <th className="px-6 py-4">Invoice ID</th>
                 <th className="px-6 py-4">Customer</th>
                 <th className="px-6 py-4">Amount</th>
                 <th className="px-6 py-4">Type</th>
                 <th className="px-6 py-4">Due Date</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50 bg-white">
               {accounts.map(acc => (
                 <tr className="hover:bg-gray-50 cursor-pointer group" key={acc.id}>
                   <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-yellow-600 transition-colors uppercase tracking-widest text-[12px]">{acc.id}</td>
                   <td className="px-6 py-4 text-gray-700 font-medium">{acc.customer}</td>
                   <td className="px-6 py-4 font-black text-gray-900">{acc.amount}</td>
                   <td className="px-6 py-4"><span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md border border-gray-200 font-bold uppercase">{acc.type}</span></td>
                   <td className="px-6 py-4 text-gray-500 font-medium">{acc.dueDate}</td>
                   <td className="px-6 py-4">
                     <span className={`badge ${acc.status === 'Paid' ? 'badge-green' : acc.status === 'Overdue' ? 'bg-red-100 text-red-700 border border-red-200' : 'badge-yellow'}`}>
                       {acc.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button className="btn btn-dark text-xs py-1.5 px-3">View PDF</button>
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
