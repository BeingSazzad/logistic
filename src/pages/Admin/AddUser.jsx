import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Shield, UserCog, Mail, Building2, ChevronDown } from 'lucide-react';

const ROLES = [
  { id: 'admin',      label: 'Branch Admin',      access: 'Full Admin',      dark: true,  desc: 'Full branch-level control: staff, jobs, fleet, and reports. Cannot modify platform billing or SaaS settings.' },
  { id: 'dispatcher', label: 'Dispatcher',         access: 'Operations',      dark: false, desc: 'Operational access to job creation, driver dispatching, live tracking, and exception management.' },
  { id: 'accounts',   label: 'Accounts Officer',   access: 'Finance View',    dark: false, desc: 'Access to invoices, POD review, driver settlements, and financial reports.' },
  { id: 'warehouse',  label: 'Warehouse Staff',    access: 'Floor Devices',   dark: false, desc: 'Mobile floor device access for scanning, loading, and receiving items at the dock.' },
  { id: 'driver',     label: 'Driver',             access: 'Mobile App Only', dark: false, desc: 'Mobile-only access to job assignments, trip navigation, POD uploads, and expense logging.' },
];

const BRANCHES = ['Sydney Central Depot', 'Melbourne Depot', 'Brisbane Port Branch', 'All Branches'];

export default function AdminInviteUser() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('dispatcher');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/users')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="hero-h1">Invite System User</h1>
            <p className="hero-body text-gray-600 mt-1">Send an invitation with role-based access control (RBAC) scoped to a specific branch.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/users')}
            className="btn btn-outline py-2.5 px-6">Cancel</button>
          <button className="btn btn-primary py-2.5 px-6">
            <UserPlus size={16} strokeWidth={2.5}/> Send Invite
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">

        {/* Left col: Profile */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
              <UserCog className="text-[#FFCC00]" size={18} />
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">User Profile</h2>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                <div className="relative group">
                  <UserCog className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={15}/>
                  <input type="text" placeholder="e.g. Liam Smith"
                    className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={15}/>
                  <input type="email" placeholder="user@company.com"
                    className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Assigned Branch</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15}/>
                  <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}
                    className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-10 text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 transition-all">
                    {BRANCHES.map(b => <option key={b}>{b}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14}/>
                </div>
              </div>
            </div>
          </div>

          {/* Access summary */}
          <div className="bg-[#111] rounded-xl p-5 text-white border border-gray-800 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFCC00]/10 rounded-full blur-2xl pointer-events-none"/>
            <p className="text-xs font-black text-[#FFCC00] uppercase tracking-widest mb-2 relative z-10">Selected Role</p>
            <p className="text-base font-black text-white relative z-10">{ROLES.find(r => r.id === selectedRole)?.label}</p>
            <p className="text-xs text-gray-400 font-bold mt-1 relative z-10">{ROLES.find(r => r.id === selectedRole)?.access}</p>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed relative z-10">{ROLES.find(r => r.id === selectedRole)?.desc}</p>
          </div>
        </div>

        {/* Right col: Role matrix */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
              <Shield className="text-gray-400" size={18} />
              <div>
                <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">Role & Access Matrix</h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Access is scoped to the assigned branch unless set to All Branches.</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ROLES.map(r => {
                const isSelected = selectedRole === r.id;
                return (
                  <label key={r.id} onClick={() => setSelectedRole(r.id)}
                    className={`flex flex-col gap-3 p-5 border-2 rounded-xl cursor-pointer transition-all relative overflow-hidden ${
                      isSelected
                        ? r.dark ? 'border-[#111] bg-[#111]' : 'border-[#FFCC00] bg-[#FFFBEB]'
                        : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
                    }`}>
                    {isSelected && r.dark && (
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFCC00]/10 rounded-full blur-2xl pointer-events-none"/>
                    )}
                    <div className="flex justify-between items-start relative z-10">
                      <span className={`text-sm font-black tracking-wide ${isSelected && r.dark ? 'text-white' : 'text-gray-900'}`}>
                        {r.label}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all flex items-center justify-center ${
                        isSelected
                          ? r.dark
                            ? 'border-[#FFCC00] bg-[#FFCC00]'
                            : 'border-[#FFCC00] bg-[#FFCC00]'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#111]"/>}
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed font-medium relative z-10 ${isSelected && r.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {r.desc}
                    </p>
                    <div className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded w-fit relative z-10 ${
                      isSelected && r.dark ? 'bg-[#FFCC00]/20 text-[#FFCC00]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {r.access}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


