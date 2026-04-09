import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, UserPlus, Shield, Mail, Clock, ChevronDown, 
  ArrowDownUp, User, CheckCircle2, AlertCircle
} from 'lucide-react';

const RAW_USERS = [
  { id: 'USR-01', name: 'Sarah Mitchell', email: 'sarah.m@hero.com', role: 'Dispatcher', branch: 'Sydney Central Hub', status: 'Active',  lastLogin: '10 mins ago', access: 'Full' },
  { id: 'USR-02', name: 'Jack Taylor',    email: 'jack.t@hero.com',  role: 'Driver',     branch: 'Sydney Central Hub', status: 'Active',  lastLogin: '2 days ago',  access: 'Mobile Only' },
  { id: 'USR-03', name: 'Oliver Brown',   email: 'oliver.b@hero.com',role: 'Dispatcher', branch: 'Melbourne Hub',      status: 'Offline', lastLogin: '1 week ago',  access: 'Full' },
  { id: 'USR-04', name: 'Liam Smith',     email: 'liam.s@hero.com',  role: 'Driver',     branch: 'Sydney Central Hub', status: 'Active',  lastLogin: '1 hr ago',    access: 'Mobile Only' },
  { id: 'USR-05', name: 'Michael Adams',  email: 'mike.a@hero.com',  role: 'Accounts',   branch: 'All Branches',       status: 'Active',  lastLogin: 'Now',         access: 'Full' },
  { id: 'USR-06', name: 'Noah Williams',  email: 'noah.w@hero.com',  role: 'Driver',     branch: 'Melbourne Hub',      status: 'Active',  lastLogin: '30 mins ago', access: 'Mobile Only' },
  { id: 'USR-07', name: 'Emma Stevens',   email: 'emma.s@hero.com',  role: 'Warehouse',  branch: 'Brisbane Port',      status: 'Offline', lastLogin: '3 days ago',  access: 'Floor Devices' },
];

const ROLE_TABS = ['All', 'Dispatcher', 'Driver', 'Warehouse', 'Accounts'];

const roleColor = (r) => {
  if (r === 'Dispatcher') return 'bg-blue-50 text-blue-600 border-blue-100';
  if (r === 'Driver')     return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (r === 'Warehouse')  return 'bg-violet-50 text-violet-600 border-violet-100';
  if (r === 'Accounts')   return 'bg-amber-50 text-amber-700 border-amber-100';
  return 'bg-gray-100 text-gray-600 border-gray-200';
};

export default function AdminUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filtered = useMemo(() => {
    return RAW_USERS.filter(u => {
      const matchRole   = roleFilter === 'All' || u.role === roleFilter;
      const matchSearch = `${u.name} ${u.email} ${u.role} ${u.branch}`.toLowerCase().includes(search.toLowerCase());
      return matchRole && matchSearch;
    }).sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      return sortOrder === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }, [search, roleFilter, sortKey, sortOrder]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <User size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Identity & Access</h1>
            <p className="text-sm text-gray-500 mt-1">Manage platform operators, roles, and branch permissions.</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin/users/invite')} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <UserPlus size={18} strokeWidth={3} /> Invite Operator
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200/60 w-full xl:w-auto shadow-sm overflow-x-auto">
            {ROLE_TABS.map(tab => (
              <button key={tab} onClick={() => setRoleFilter(tab)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${roleFilter === tab ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, branch..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm" />
            </div>
            <div className="relative">
              <select value={sortKey} onChange={e => setSortKey(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-9 pr-10 py-2.5 focus:outline-none shadow-sm cursor-pointer">
                <option value="name">Sort: Name</option>
                <option value="role">Sort: Role</option>
                <option value="lastLogin">Sort: Last Login</option>
              </select>
              <ArrowDownUp size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">Access Level</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} onClick={() => navigate(`/admin/users/${u.id}`)}
                  className="hover:bg-gray-50/80 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-xs shrink-0 border-2 border-transparent group-hover:border-[#FFCC00] transition-colors">
                        {u.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-[#111] text-sm">{u.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold mt-0.5 flex items-center gap-1"><Mail size={10}/> {u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border uppercase tracking-widest ${roleColor(u.role)}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-600">{u.branch}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Shield size={13} className={u.access === 'Full' ? 'text-blue-500' : 'text-gray-400'}/>
                      {u.access}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                      <Clock size={12} className="text-gray-300"/> {u.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border uppercase tracking-widest ${u.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {u.status === 'Active' ? <span className="flex items-center gap-1"><CheckCircle2 size={10}/> {u.status}</span> : u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={e => { e.stopPropagation(); navigate(`/admin/users/${u.id}`); }}
                      className="text-[10px] font-black border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest">
                      Manage →
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
