import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, UserPlus, Shield, Filter, ArrowDownUp, Mail, Clock, MoreHorizontal } from 'lucide-react';

export default function AdminUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const rawUsers = [
    { id: 'USR-01', name: 'Sarah Mitchell', email: 'sarah.m@hero.com', role: 'Dispatcher', systemAccess: 'Full', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'USR-02', name: 'Jack Taylor',    email: 'jack.t@hero.com',  role: 'Driver',     systemAccess: 'Mobile Only', status: 'Active', lastLogin: '2 days ago' },
    { id: 'USR-03', name: 'Oliver Brown',   email: 'oliver.b@hero.com', role: 'Warehouse',  systemAccess: 'Floor Devices', status: 'Offline', lastLogin: '1 week ago' },
    { id: 'USR-04', name: 'Liam Smith',     email: 'liam.s@hero.com',  role: 'Dispatcher', systemAccess: 'Full', status: 'Active', lastLogin: '1 hr ago' },
    { id: 'USR-05', name: 'Michael Adams',  email: 'mike.a@hero.com',  role: 'System Admin', systemAccess: 'Root', status: 'Active', lastLogin: 'Now' },
  ];

  const filteredUsers = useMemo(() => {
    return rawUsers.filter(u => {
      const searchStr = `${u.name} ${u.email} ${u.role}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [search, sortKey, sortOrder]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Identity & Authorization</h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Node Accessibility & RBAC Management</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/users/invite')} className="bg-gray-900 text-[#FACC15] px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-yellow-400/10 flex items-center gap-2">
             <UserPlus size={18}/> Invite Operator
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6 bg-gray-50/20">
           <div className="relative w-full sm:w-[400px]">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder="Find users by name, email, or system role..." 
               className="w-full bg-white border-2 border-gray-100 focus:border-yellow-400 outline-none rounded-2xl py-4 pl-12 pr-6 font-bold text-sm shadow-inner transition-all" 
             />
           </div>
           
           <div className="flex gap-3">
             <button className="p-3.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm">
                <Filter size={18}/>
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
               <tr>
                 <th className="px-8 py-5 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('name')}>Operator Details <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-8 py-5 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('role')}>Role & Matrix <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-8 py-5 cursor-pointer hover:text-gray-900" onClick={() => toggleSort('systemAccess')}>Access Level <ArrowDownUp size={12} className="inline ml-1"/></th>
                 <th className="px-8 py-5">Last Activity</th>
                 <th className="px-8 py-5">Status</th>
                 <th className="px-8 py-5 text-right w-20"></th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {filteredUsers.map(u => (
                 <tr className="hover:bg-yellow-50/30 transition-all group" key={u.id}>
                   <td className="px-8 py-6">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center font-black text-sm text-[#FACC15] shadow-lg group-hover:scale-105 transition-transform">
                         {u.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div className="min-w-0">
                         <div className="font-black text-gray-900 text-sm tracking-tight">{u.name}</div>
                         <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase flex items-center gap-1"><Mail size={12}/> {u.email}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-8 py-6">
                       <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border shadow-sm ${u.status === 'Active' ? 'bg-white text-gray-700 border-gray-100' : 'bg-gray-50 text-gray-400'}`}>{u.role}</span>
                   </td>
                   <td className="px-8 py-6">
                     <div className="flex items-center gap-2.5 text-gray-900 font-black text-[11px] uppercase tracking-widest">
                       <Shield size={16} className={u.systemAccess === 'Root' ? 'text-red-500 animate-pulse' : 'text-blue-500'}/> {u.systemAccess}
                     </div>
                   </td>
                   <td className="px-8 py-6">
                     <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-tight">
                       <Clock size={14} className="text-gray-300"/> {u.lastLogin}
                     </div>
                   </td>
                   <td className="px-8 py-6">
                     <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        ● {u.status}
                     </span>
                   </td>
                   <td className="px-8 py-6 text-right">
                     <button className="p-2.5 text-gray-300 hover:text-gray-900 transition-colors">
                        <MoreHorizontal size={20} />
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
