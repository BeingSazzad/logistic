import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Building2, CreditCard, ChevronDown } from 'lucide-react';

export default function AdminCustomers() {
  const navigate = useNavigate();
  const clients = [
    { id: 'CUST-001', name: 'Acme Corp Logistics',      contact: 'John Smith',   phone: '+61 411 000 001', creditLimit: '$50,000', terms: 'Net 30', status: 'Active' },
    { id: 'CUST-002', name: 'Tech Solutions Ltd',       contact: 'Emma Watson',  phone: '+61 412 000 002', creditLimit: '$10,000', terms: 'Net 14', status: 'Active' },
    { id: 'CUST-003', name: 'Global Traders Australia', contact: 'Lucas Brown',  phone: '+61 413 000 003', creditLimit: '$150,000',terms: 'Net 60', status: 'Hold' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage B2B clients, contact persons, credit limits, and payment terms.</p>
        </div>
        <button onClick={() => navigate('/admin/customers/add')} className="btn btn-primary"><Plus size={16}/> New Customer</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* Table */}
      <div className="card bg-white shadow-sm mt-2">
        <div className="p-4 border-b border-gray-100 flex justify-between">
           <div className="relative w-72">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search companies or contacts..." className="input pl-9" />
           </div>
           <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">Sort By <ChevronDown size={14}/></button>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
               <tr>
                 <th className="px-6 py-4">Company Details</th>
                 <th className="px-6 py-4">Primary Contact</th>
                 <th className="px-6 py-4 text-right">Credit Limit</th>
                 <th className="px-6 py-4">Payment Terms</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {clients.map(c => (
                 <tr hover="bg-gray-50" key={c.id}>
                   <td className="px-6 py-4">
                     <div className="font-bold text-gray-900 flex items-center gap-2"><Building2 size={14} className="text-gray-400"/> {c.name}</div>
                     <div className="text-xs text-gray-500 mt-0.5">{c.id}</div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="font-medium text-gray-800">{c.contact}</div>
                     <div className="text-xs text-gray-500">{c.phone}</div>
                   </td>
                   <td className="px-6 py-4 text-right font-bold text-gray-900">{c.creditLimit}</td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 w-max px-2.5 py-1 rounded-md"><CreditCard size={12}/> {c.terms}</div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`badge ${c.status === 'Active' ? 'badge-green' : 'bg-red-100 text-red-700'}`}>{c.status}</span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button className="text-blue-600 font-semibold hover:underline text-xs">Edit Terms</button>
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
