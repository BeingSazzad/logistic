import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Building, Phone, Mail, CreditCard, Package,
  TrendingUp, Star, Edit3, CheckCircle2, AlertTriangle, 
  FileText, MessageSquare, ChevronRight, Clock, MapPin
} from 'lucide-react';

const CUSTOMER_DB = {
  'CUST-001': { id: 'CUST-001', name: 'Acme Corp Logistics', contact: 'John Smith', email: 'john@acme.com.au', phone: '+61 411 000 001', creditLimit: 50000, usedCredit: 18400, terms: 'Net 30', status: 'Active', Loads: 142, revenue: 28400, rating: 4.8, address: '12 Botany Rd, Alexandria NSW 2015', joined: 'Jan 12, 2024', industry: 'Logistics', abn: '88 101 234 987', notes: 'VIP Account — always verify pickup window before dispatch.' },
  'CUST-002': { id: 'CUST-002', name: 'Tech Solutions Ltd', contact: 'Emma Watson', email: 'emma@techsol.com', phone: '+61 412 000 002', creditLimit: 10000, usedCredit: 4200, terms: 'Net 14', status: 'Active', Loads: 38, revenue: 7200, rating: 4.5, address: '1 Innovation Dr, Port Botany NSW 2036', joined: 'Mar 05, 2025', industry: 'Technology', abn: '12 345 678 901', notes: '' },
  'CUST-003': { id: 'CUST-003', name: 'Global Traders Australia', contact: 'Lucas Brown', email: 'lucas@globaltr.com', phone: '+61 413 000 003', creditLimit: 150000, usedCredit: 0, terms: 'Net 60', status: 'On Hold', Loads: 0, revenue: 0, rating: 3.2, address: '88 Industrial Ave, Wetherill Park NSW 2164', joined: 'Aug 03, 2024', industry: 'Import/Export', abn: '55 888 777 444', notes: 'Account on hold — disputed invoice INV-2024-88.' },
  'CUST-004': { id: 'CUST-004', name: 'Fresh Markets AU', contact: 'Ben Chu', email: 'ben@freshmarkets.com', phone: '+61 414 000 004', creditLimit: 25000, usedCredit: 11300, terms: 'Net 14', status: 'Active', Loads: 89, revenue: 14600, rating: 4.9, address: '250 Parramatta Rd, Flemington NSW 2140', joined: 'Jun 22, 2024', industry: 'Food & Agriculture', abn: '77 654 321 109', notes: 'Perishables only. Strict 2hr delivery windows.' },
  'CUST-005': { id: 'CUST-005', name: 'Southport Logistics', contact: 'Sarah Miller', email: 'sarah@southport.com', phone: '+61 415 000 005', creditLimit: 80000, usedCredit: 32100, terms: 'Net 30', status: 'Active', Loads: 204, revenue: 41300, rating: 4.7, address: 'Bay 12, 45 Ferry Rd, Southport QLD 4215', joined: 'Nov 15, 2023', industry: 'Logistics', abn: '33 998 776 554', notes: '' },
  'CUST-006': { id: 'CUST-006', name: 'Blue River Exports', contact: 'Mike Tan', email: 'mike@blueriver.com', phone: '+61 416 000 006', creditLimit: 5000, usedCredit: 0, terms: 'Net 7', status: 'Suspended', Loads: 0, revenue: 0, rating: 2.8, address: '7 Wharf Rd, Newcastle NSW 2300', joined: 'Feb 01, 2025', industry: 'Export', abn: '19 111 222 333', notes: 'Suspended — non-payment of 3 invoices.' },
};

const RECENT_LoadS = [
  { id: 'SHP-9042', origin: 'Sydney Depot', dest: 'Melbourne Depot', status: 'Completed', date: 'Apr 07', value: '$2,400' },
  { id: 'SHP-9035', origin: 'Port Botany', dest: 'Canberra DC', status: 'Active', date: 'Apr 08', value: '$1,800' },
  { id: 'SHP-9021', origin: 'Sydney Depot', dest: 'Brisbane Port', status: 'Completed', date: 'Mar 28', value: '$3,100' },
];

export default function AdminCustomerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const c = CUSTOMER_DB[id] || CUSTOMER_DB['CUST-001'];
  const [editing, setEditing] = useState(false);

  const creditUsedPercent = Math.round((c.usedCredit / c.creditLimit) * 100);
  const creditColor = creditUsedPercent > 80 ? 'bg-red-500' : creditUsedPercent > 50 ? 'bg-amber-400' : 'bg-emerald-500';

  const statusStyle = s => {
    if (s === 'Active')    return 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]';
    if (s === 'On Hold')   return 'bg-amber-50 text-amber-600 border-amber-100';
    if (s === 'Completed') return 'bg-gray-50 text-gray-500 border-gray-200';
    return 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/customers')} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{c.name}</h1>
              <span className={`text-xs font-black px-2.5 py-1 rounded border uppercase tracking-widest ${statusStyle(c.status)}`}>{c.status}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-medium">{c.id} · {c.industry} · Customer since {c.joined}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setEditing(!editing)} className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm border ${editing ? 'bg-[#111] text-[#FFCC00] border-gray-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <Edit3 size={16}/> {editing ? 'Cancel Edit' : 'Edit Account'}
          </button>
          {editing && (
            <button onClick={() => setEditing(false)} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
              <CheckCircle2 size={16}/> Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Loads', val: c.Loads, color: 'text-blue-500' },
              { label: 'Total Revenue', val: `$${c.revenue.toLocaleString()}`, color: 'text-emerald-500' },
              { label: 'Credit Used', val: `${creditUsedPercent}%`, color: creditUsedPercent > 80 ? 'text-red-500' : 'text-gray-900' },
              { label: 'Avg Rating', val: `★ ${c.rating}`, color: 'text-amber-500' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Building size={12}/> Account Details</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Primary Contact', val: c.contact, icon: null },
                { label: 'Industry', val: c.industry, icon: null },
                { label: 'ABN', val: c.abn, icon: null },
                { label: 'Payment Terms', val: c.terms, icon: CreditCard },
              ].map((f, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{f.label}</p>
                  {editing ? (
                    <input defaultValue={f.val} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all" />
                  ) : (
                    <p className="text-sm font-bold text-gray-900">{f.val}</p>
                  )}
                </div>
              ))}
              <div className="md:col-span-2 space-y-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={11}/> Business Address</p>
                {editing ? (
                  <input defaultValue={c.address} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all" />
                ) : (
                  <p className="text-sm font-bold text-gray-900">{c.address}</p>
                )}
              </div>
              {c.notes && (
                <div className="md:col-span-2 bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-amber-700">{c.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Credit Facility */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widests flex items-center gap-2"><CreditCard size={12}/> Credit Facility</h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widests">Used Credit</p>
                  <p className="text-2xl font-black text-gray-900">${c.usedCredit.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widests">Credit Limit</p>
                  <p className="text-2xl font-black text-gray-500">${c.creditLimit.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${creditColor} rounded-full transition-all`} style={{ width: `${creditUsedPercent}%` }}></div>
              </div>
              <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widests">{creditUsedPercent}% of credit limit used · Terms: {c.terms}</p>
            </div>
          </div>

          {/* Recent Loads */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widests flex items-center gap-2"><Package size={12}/> Recent Loads</h3>
              <button onClick={() => navigate('/admin/loads')} className="text-xs font-black text-[#FFCC00] uppercase tracking-widests hover:underline">View All →</button>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_LoadS.map(s => (
                <div key={s.id} onClick={() => navigate(`/admin/loads/${s.id}`)} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer transition-all">
                  <div>
                    <p className="text-sm font-black text-gray-900">{s.id}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widests">{s.origin} → {s.dest}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Clock size={10}/>{s.date}</span>
                    <span className="text-xs font-black text-emerald-600">{s.value}</span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-md border uppercase tracking-widests ${statusStyle(s.status)}`}>{s.status}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Card */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800">
            <h3 className="text-xs font-black uppercase tracking-widests mb-5 text-gray-300">Primary Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFCC00] flex items-center justify-center text-black font-black text-xl shadow-lg shrink-0">
                  {c.contact.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <p className="font-black text-white">{c.contact}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widests">Account Owner</p>
                </div>
              </div>
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-300 font-bold text-xs">{c.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-300 font-bold text-xs">{c.email}</span>
                </div>
              </div>
              <button className="w-full bg-[#FFCC00] hover:bg-yellow-400 text-black py-2.5 rounded-xl font-black text-xs uppercase tracking-widests transition-all flex items-center justify-center gap-2 mt-4">
                <MessageSquare size={14}/> Send Message
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widests">Account Actions</h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widests text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <FileText size={14}/> View Invoices
              </button>
              <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widests text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <TrendingUp size={14}/> Load History
              </button>
              {c.status === 'Active' ? (
                <button className="w-full py-3 bg-amber-50 border border-amber-100 rounded-xl text-xs font-black uppercase tracking-widests text-amber-600 hover:bg-amber-100 transition-all flex items-center justify-center gap-2 mt-1">
                  <AlertTriangle size={14}/> Place On Hold
                </button>
              ) : (
                <button className="w-full py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-black uppercase tracking-widests text-emerald-600 hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 mt-1">
                  <CheckCircle2 size={14}/> Reactivate Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

