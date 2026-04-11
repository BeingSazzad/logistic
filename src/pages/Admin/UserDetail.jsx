import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Shield, Clock, Building2,
  Save, CheckCircle2, AlertTriangle, LogOut, Key,
  ChevronRight, Lock, Unlock, Phone
} from 'lucide-react';

const USER_DB = {
  'USR-01': { id: 'USR-01', name: 'Sarah Mitchell', email: 'sarah.m@hero.com', phone: '+61 411 000 001', role: 'Dispatcher', branch: 'Sydney Central Hub', branchId: 'SYD-CENTRAL', status: 'Active', lastLogin: '10 mins ago', access: 'Full', joined: 'Mar 15, 2024', sessions: 1842, twoFA: true },
  'USR-02': { id: 'USR-02', name: 'Jack Taylor',    email: 'jack.t@hero.com',  phone: '+61 412 000 002', role: 'Driver',     branch: 'Sydney Central Hub', branchId: 'SYD-CENTRAL', status: 'Active', lastLogin: '2 days ago',  access: 'Mobile Only', joined: 'Jan 08, 2024', sessions: 3201, twoFA: false },
  'USR-03': { id: 'USR-03', name: 'Oliver Brown',   email: 'oliver.b@hero.com', phone: '+61 413 000 003', role: 'Dispatcher', branch: 'Melbourne Hub', branchId: 'MEL-HUB', status: 'Offline', lastLogin: '1 week ago',  access: 'Full', joined: 'Jun 01, 2024', sessions: 744, twoFA: false },
  'USR-04': { id: 'USR-04', name: 'Liam Smith',     email: 'liam.s@hero.com',  phone: '+61 414 000 004', role: 'Driver',     branch: 'Sydney Central Hub', branchId: 'SYD-CENTRAL', status: 'Active', lastLogin: '1 hr ago',    access: 'Mobile Only', joined: 'Feb 20, 2024', sessions: 2807, twoFA: false },
  'USR-05': { id: 'USR-05', name: 'Michael Adams',  email: 'mike.a@hero.com',  phone: '+61 415 000 005', role: 'Accounts',   branch: 'All Branches', branchId: 'ALL', status: 'Active', lastLogin: 'Now', access: 'Full', joined: 'Nov 01, 2023', sessions: 5100, twoFA: true },
};

const ROLES = ['Dispatcher', 'Driver', 'Warehouse', 'Accounts'];
const BRANCHES = ['Sydney Central Hub', 'Melbourne Hub', 'Brisbane Port'];
const ACCESS_LEVELS = ['Full', 'Mobile Only', 'Floor Devices', 'Read Only'];

const roleColor = r => {
  if (r === 'Dispatcher') return 'bg-blue-50 text-blue-700 border-blue-100';
  if (r === 'Driver')     return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (r === 'Warehouse')  return 'bg-violet-50 text-violet-700 border-violet-100';
  return 'bg-amber-50 text-amber-700 border-amber-100';
};

export default function AdminUserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const u = USER_DB[id] || USER_DB['USR-01'];
  
  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState(u.role);
  const [branch, setBranch] = useState(u.branch);
  const [access, setAccess] = useState(u.access);
  const [toastMsg, setToastMsg] = useState('');
  const [accountStatus, setAccountStatus] = useState(u.status);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = () => {
    setEditing(false);
    showToast('User access updated successfully');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Success Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#111] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 animate-in slide-in-from-right">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <p className="font-black text-sm">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/users')} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{u.name}</h1>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${roleColor(u.role)}`}>{u.role}</span>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${accountStatus === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-red-50 text-red-600 border-red-200'}`}>{accountStatus}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-medium">{u.id} · {u.email} · Joined {u.joined}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm">Cancel</button>
              <button onClick={handleSave} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
                <Save size={16}/> Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="bg-[#111] hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
              <Shield size={16}/> Edit Profile &amp; Access
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Sessions', val: u.sessions.toLocaleString() },
              { label: '2FA Enabled', val: u.twoFA ? 'Yes' : 'No', alert: !u.twoFA },
              { label: 'Last Login', val: u.lastLogin },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl border p-5 shadow-sm ${s.alert ? 'bg-amber-50 border-amber-100' : 'bg-white border-gray-100'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${s.alert ? 'text-amber-500' : 'text-gray-400'}`}>{s.label}</p>
                <p className={`text-xl font-black mt-1 ${s.alert ? 'text-amber-600' : 'text-gray-900'}`}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Role & Access Config */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Shield size={12}/> Role & Access Configuration</h3>
              {editing && <span className="text-[10px] font-black text-[#FFCC00] bg-[#111] px-2.5 py-1 rounded uppercase tracking-widest">Edit Mode</span>}
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">System Role</label>
                {editing ? (
                  <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-[#FFCC00] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 bg-[#FFFBEB]">
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                ) : (
                  <span className={`text-[11px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-widest inline-block ${roleColor(role)}`}>{role}</span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Assigned Branch</label>
                {editing ? (
                  <select value={branch} onChange={e => setBranch(e.target.value)} className="w-full border border-[#FFCC00] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 bg-[#FFFBEB]">
                    {BRANCHES.map(b => <option key={b}>{b}</option>)}
                  </select>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900"><Building2 size={14} className="text-gray-400"/>{branch}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Access Level</label>
                {editing ? (
                  <select value={access} onChange={e => setAccess(e.target.value)} className="w-full border border-[#FFCC00] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 bg-[#FFFBEB]">
                    {ACCESS_LEVELS.map(a => <option key={a}>{a}</option>)}
                  </select>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900"><Shield size={14} className="text-blue-500"/>{access}</div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Details</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1"><Mail size={11}/> Email Address</label>
                <input type="email" defaultValue={u.email} readOnly={!editing} className={`w-full border rounded-xl px-4 py-2.5 text-sm font-bold outline-none transition-all ${editing ? 'border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 bg-[#FFFBEB]' : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}`} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1"><Phone size={11}/> Phone</label>
                <input type="tel" defaultValue={u.phone} readOnly={!editing} className={`w-full border rounded-xl px-4 py-2.5 text-sm font-bold outline-none transition-all ${editing ? 'border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 bg-[#FFFBEB]' : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1 space-y-6">
          {/* Identity Card */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#FFCC00] flex items-center justify-center text-black font-black text-3xl shadow-2xl">
                {u.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-black text-white leading-none">{u.name}</h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{u.id}</p>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">{u.branch}</p>
              </div>
            </div>
          </div>

          {/* Security Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security Actions</h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <button onClick={() => showToast('Password reset link sent to user email')} className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <Key size={14}/> Reset Password
              </button>
              <button onClick={() => showToast('User session explicitly terminated (Forced Logout)')} className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <Lock size={14}/> Force Logout
              </button>
              {accountStatus === 'Active' ? (
                <button onClick={() => { setAccountStatus('Suspended'); showToast('Account suspended'); }} className="w-full py-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-100 transition-all flex items-center justify-center gap-2 mt-1">
                  <AlertTriangle size={14}/> Suspend Account
                </button>
              ) : (
                <button onClick={() => { setAccountStatus('Active'); showToast('Account reactivated'); }} className="w-full py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 mt-1">
                  <Unlock size={14}/> Reactivate Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
