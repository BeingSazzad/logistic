import React, { useState } from 'react';
import { 
  Globe, Shield, Bell, CreditCard, Key, User, Users, Camera, Mail, 
  Save, Info, CheckCircle2, Lock, Smartphone, RefreshCw, Zap
} from 'lucide-react';

const sections = [
  { id: 'profile', title: 'My Profile', icon: User },
  { id: 'identity', title: 'Brand Identity', icon: Globe },
  { id: 'security', title: 'Security Controls', icon: Shield },
  { id: 'revenue', title: 'Revenue & Invoicing', icon: CreditCard },
  { id: 'team', title: 'System Team', icon: Users },
];

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [inviteModal, setInviteModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 px-2">
      
      {/* Page Header — matching Dashboard/Fleet standard */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your profile, brand identity, security, and payment configuration.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-1.5">
          {sections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-xl transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-md border border-gray-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-[#FFCC00]' : 'text-gray-300'} />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Console */}
        <div className="flex-1 w-full space-y-6">
          
          {/* ── Tab Content: Profile ── */}
          {activeTab === 'profile' && (
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="p-6 border-b border-gray-50 bg-[#FAFAFA] flex items-center justify-between">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">My Profile</h3>
                   <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all shadow-sm">
                      <Save size={14}/> Save Changes
                   </button>
                </div>
                <div className="p-8 flex flex-col md:flex-row gap-10">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-2xl bg-[#111] flex flex-col items-center justify-center text-[#FFCC00] relative group cursor-pointer overflow-hidden border-4 border-white shadow-xl">
                         <span className="text-4xl font-black">PO</span>
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <Camera size={24} className="text-white mb-1" />
                            <span className="text-[9px] text-white font-black uppercase">Upload</span>
                         </div>
                      </div>
                      <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                         <CheckCircle2 size={10}/> Verified
                      </p>
                   </div>
                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Full Name</label>
                         <input type="text" defaultValue="Matthew Anderson" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-bold text-gray-900 focus:bg-white focus:border-[#FFCC00] outline-none transition-all" />
                      </div>
                      <div>
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Username</label>
                         <input type="text" defaultValue="@matthew_admin" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-bold text-gray-900 outline-none" />
                      </div>
                      <div className="md:col-span-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Email Address</label>
                         <input type="email" defaultValue="matthew@hero-logistics.app" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-bold text-gray-900 outline-none" />
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* ── Tab Content: Identity (Logo, Brand) ── */}
          {activeTab === 'identity' && (
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="p-6 border-b border-gray-50 bg-[#FAFAFA]">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Brand & Appearance</h3>
                </div>
                <div className="p-8 space-y-8">
                   <div className="flex flex-col md:flex-row gap-10 items-start">
                      <div className="w-full md:w-1/3 flex flex-col gap-4">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 leading-none">Platform Logo</label>
                         <div className="aspect-video w-full rounded-2xl bg-[#111] border-2 border-dashed border-gray-800 flex flex-col items-center justify-center text-gray-500 group hover:border-[#FFCC00] transition-colors cursor-pointer relative">
                            <Zap size={32} className="text-[#FFCC00] mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest">HERO LOGISTICS</span>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity rounded-2xl">
                               <Camera size={20} className="text-white mb-1" />
                            </div>
                         </div>
                      </div>
                      <div className="flex-1 space-y-6">
                         <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Platform Name</label>
                            <input type="text" defaultValue="HERO TMS · Logistics Cloud" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-black text-gray-900 outline-none" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Brand Color</label>
                               <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                                  <div className="w-6 h-6 rounded-full bg-[#FFCC00]"></div>
                                  <span className="text-xs font-black text-gray-900">#FFCC00</span>
                               </div>
                            </div>
                            <div>
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Support Phone</label>
                               <input type="text" defaultValue="+61 1300 HERO" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-xs font-bold text-gray-900 outline-none" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* ── Tab Content: Security (Passwords, 2FA) ── */}
          {activeTab === 'security' && (
             <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                   <div className="p-6 border-b border-gray-50 bg-[#FAFAFA] flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Lock size={14} className="text-[#FFCC00]"/> Password & Security
                      </h3>
                      <button className="text-[10px] font-bold text-[#FFCC00] hover:underline uppercase tracking-widest">Setup 2FA</button>
                   </div>
                   <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div>
                            <p className="text-sm font-bold text-gray-900 mb-4">Change Password</p>
                            <div className="space-y-4">
                               <input type="password" placeholder="Current password" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-bold outline-none" />
                               <input type="password" placeholder="New password" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-bold outline-none" />
                               <button className="w-full py-3 bg-[#FFCC00] hover:bg-[#E6B800] text-black rounded-xl text-xs font-bold shadow-sm">Update Password</button>
                            </div>
                         </div>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                            <Smartphone size={24}/>
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-xs text-gray-400 mt-1">Paired with iPhone 15 Pro Max</p>
                         </div>
                         <button className="flex items-center gap-2 text-xs font-bold text-[#FFCC00] hover:underline">
                            <RefreshCw size={12}/> Reset Device
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* ── Tab Content: Revenue (Stripe, Billing) ── */}
          {activeTab === 'revenue' && (
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="p-6 border-b border-gray-50 bg-[#FAFAFA] flex justify-between items-center">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Payment Gateway</h3>
                   <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                      <CheckCircle2 size={12} className="text-emerald-500"/>
                      <span className="text-[10px] font-bold text-emerald-600">Connected</span>
                   </div>
                </div>
                <div className="p-8 flex flex-col gap-10">
                   <div className="flex items-center gap-6 p-6 bg-[#635BFF]/5 border border-[#635BFF]/10 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#635BFF] opacity-[0.03] rounded-full -mr-16 -mt-16 blur-3xl"></div>
                      <div className="w-14 h-14 rounded-xl bg-[#635BFF] flex items-center justify-center shadow-lg shadow-[#635BFF]/20 text-white">
                         <CreditCard size={28} />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-[#635BFF] font-bold text-lg tracking-tight mb-0.5">Stripe Connect Gateway</h4>
                         <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Account ID: acct_1N9x8221_HERO_ROOT</p>
                      </div>
                      <button className="bg-white px-5 py-2.5 rounded-xl border border-gray-100 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">Open Stripe</button>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">Tax Rate (%)</label>
                         <input type="number" defaultValue="10" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-black text-gray-900 outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">Payout Schedule</label>
                         <select className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-black text-gray-900 outline-none appearance-none">
                            <option>Daily (Automatic)</option>
                            <option>Weekly</option>
                            <option>Manual</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">Currency</label>
                         <input type="text" defaultValue="AUD (Australian Dollar)" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm font-black text-gray-400 outline-none" />
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* ── Tab Content: System Team ── */}
          {activeTab === 'team' && (
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="p-6 border-b border-gray-50 bg-[#FAFAFA] flex justify-between items-center">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Team Members</h3>
                   <button onClick={() => setInviteModal(true)} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-5 py-2.5 rounded-lg font-bold text-xs shadow-sm">Invite Member</button>
                </div>
                <div className="divide-y divide-gray-50">
                   {[
                     { name: 'Matthew Anderson', role: 'Owner', email: 'matthew@hero-logistics.app' },
                     { name: 'Sarah Mitchell', role: 'Support', email: 'sarah@hero-logistics.app' }
                   ].map((t, i) => (
                     <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center font-black text-[#FFCC00]">{t.name.split(' ').map(n=>n[0]).join('')}</div>
                           <div>
                              <p className="font-black text-gray-900 text-sm leading-none mb-1">{t.name}</p>
                              <p className="text-[10px] font-black text-gray-400 uppercase">{t.role} · {t.email}</p>
                           </div>
                        </div>
                        <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                     </div>
                   ))}
                </div>
             </div>
          )}

        </div>
      </div>

      {/* Modern Invite Modal */}
      {inviteModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white">
               <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Invite Team Member</h3>
               <p className="text-sm text-gray-500 mb-6">Send a secure invitation link to join the platform admin team.</p>
               <div className="space-y-4 mb-8">
                  <input type="email" placeholder="colleague@company.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-6 text-sm font-bold focus:bg-white outline-none" />
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-6 text-sm font-bold appearance-none outline-none">
                     <option>Administrator</option>
                     <option>Support Agent</option>
                     <option>Billing Manager</option>
                  </select>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => setInviteModal(false)} className="flex-1 py-3 text-sm font-bold text-gray-400">Cancel</button>
                  <button onClick={() => setInviteModal(false)} className="flex-1 py-3 bg-[#FFCC00] hover:bg-[#E6B800] text-black rounded-xl text-sm font-bold shadow-sm">Send Invite</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}
