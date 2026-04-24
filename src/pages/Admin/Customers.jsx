import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Building, CreditCard, ChevronDown, 
  ArrowDownUp, Phone, Mail, Package, Star, TrendingUp
} from 'lucide-react';

const RAW_CUSTOMERS = [
  { id: 'CUST-001', name: 'Acme Corp Logistics',      contact: 'John Smith',   email: 'john@acme.com.au',    phone: '+61 411 000 001', creditLimit: 50000,  terms: 'Net 30', status: 'Active',    Loads: 142, revenue: '$28,400', rating: 4.8 },
  { id: 'CUST-002', name: 'Tech Solutions Ltd',       contact: 'Emma Watson',  email: 'emma@techsol.com',    phone: '+61 412 000 002', creditLimit: 10000,  terms: 'Net 14', status: 'Active',    Loads: 38,  revenue: '$7,200',  rating: 4.5 },
  { id: 'CUST-003', name: 'Global Traders Australia', contact: 'Lucas Brown',  email: 'lucas@globaltr.com',  phone: '+61 413 000 003', creditLimit: 150000, terms: 'Net 60', status: 'On Hold',   Loads: 0,   revenue: '$0',      rating: 3.2 },
  { id: 'CUST-004', name: 'Fresh Markets AU',         contact: 'Ben Chu',      email: 'ben@freshmarkets.com', phone: '+61 414 000 004', creditLimit: 25000,  terms: 'Net 14', status: 'Active',    Loads: 89,  revenue: '$14,600', rating: 4.9 },
  { id: 'CUST-005', name: 'Southport Logistics',      contact: 'Sarah Miller', email: 'sarah@southport.com', phone: '+61 415 000 005', creditLimit: 80000,  terms: 'Net 30', status: 'Active',    Loads: 204, revenue: '$41,300', rating: 4.7 },
  { id: 'CUST-006', name: 'Blue River Exports',       contact: 'Mike Tan',     email: 'mike@blueriver.com',  phone: '+61 416 000 006', creditLimit: 5000,   terms: 'Net 7',  status: 'Suspended', Loads: 0,   revenue: '$0',      rating: 2.8 },
];

const STATUS_TABS = ['All', 'Active', 'On Hold', 'Suspended'];

export default function AdminCustomers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filtered = useMemo(() => {
    return RAW_CUSTOMERS.filter(c => {
      const matchStatus = status === 'All' || c.status === status;
      const matchSearch = `${c.name} ${c.contact} ${c.id}`.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    }).sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      return sortOrder === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }, [search, status, sortKey, sortOrder]);

  const statusStyle = (s) => {
    if (s === 'Active')    return 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]';
    if (s === 'On Hold')   return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Building size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Customer Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage B2B clients, credit limits, and payment terms.</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin/customers/add')} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Plus size={18} strokeWidth={3} /> New Customer
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200/60 w-full xl:w-auto shadow-sm">
            {STATUS_TABS.map(tab => (
              <button key={tab} onClick={() => setStatus(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded transition-all whitespace-nowrap ${status === tab ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center w-full xl:w-auto">
            <div className="relative flex-1 xl:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by Company or ID..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-normal text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] hover:border-gray-300 transition-all shadow-sm" />
            </div>
            <div className="relative">
              <select value={sortKey} onChange={e => setSortKey(e.target.value)}
                className="appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-900 text-sm font-normal rounded-lg pl-9 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 cursor-pointer shadow-sm">
                <option value="name">Sort by Name</option>
                <option value="creditLimit">Sort by Credit</option>
                <option value="Loads">Sort by Loads</option>
                <option value="rating">Sort by Rating</option>
              </select>
              <ArrowDownUp size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all text-gray-500">
              <ArrowDownUp size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] hero-metadata border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Primary Contact</th>
                <th className="px-6 py-4">Credit Limit</th>
                <th className="px-6 py-4">Terms</th>
                <th className="px-6 py-4">Loads</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} onClick={() => navigate(`/admin/customers/${c.id}`)}
                  className="hover:bg-gray-50/80 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#111] flex items-center justify-center text-[#FFCC00] font-semibold text-xs shrink-0 group-hover:border-[#FFCC00] border-2 border-transparent transition-colors">
                        {c.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div className="font-bold text-[#111] text-sm">{c.name}</div>
                        <div className="text-xs text-gray-400 font-bold tracking-widest uppercase mt-0.5">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-700">{c.contact}</div>
                    <div className="text-xs text-gray-400 font-bold mt-0.5 flex items-center gap-1"><Mail size={10}/> {c.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">${c.creditLimit.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 w-max px-3 py-1.5 rounded-md border border-gray-200">
                      <CreditCard size={11}/> {c.terms}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{c.Loads}</div>
                    <div className="text-xs text-emerald-600 font-bold">{c.revenue}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                      <Star size={12} className="fill-amber-400"/> {c.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border uppercase tracking-widest ${statusStyle(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={e => { e.stopPropagation(); navigate(`/admin/customers/${c.id}`); }}
                      className="text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest">
                      View →
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


