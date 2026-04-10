import React, { useState } from 'react';
import { 
  Building2, Shield, Bell, CreditCard, Key, 
  MapPin, Globe, Mail, Phone, Lock, Save, User, Sliders
} from 'lucide-react';

const navTabs = [
  { id: 'profile', label: 'My Account', icon: User },
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'security', label: 'Safety & Security', icon: Shield },
  { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
  { id: 'notifications', label: 'Alert Preferences', icon: Bell },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your organization's operational defaults</p>
        </div>
        <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Save size={18} strokeWidth={2.5} /> Save All Changes
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="flex flex-col md:flex-row gap-8 items-start px-2">
        
        {/* Left Sidebar Nav */}
        <div className="w-full md:w-[260px] shrink-0 flex flex-col gap-1.5">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-xl transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-gray-900 border border-gray-100'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
              }`}
            >
              <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${activeTab === tab.id ? 'bg-[#FFCC00] text-black' : 'bg-gray-200 text-gray-500'}`}>
                 <tab.icon size={16} strokeWidth={2.5}/>
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full flex flex-col gap-6">

          {/* Personal Profile Tab */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Personal Details</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Manage your super admin credentials.</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Full Name</label>
                      <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" defaultValue="Jack Taylor" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1 flex items-center gap-1.5">
                        <Mail size={12} /> Login Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-400 rounded-lg py-2.5 px-4 text-sm font-medium shadow-sm cursor-not-allowed" 
                        readOnly 
                        defaultValue="admin@hero.com.au" 
                      />
                      <p className="text-[9px] text-gray-400 mt-1.5 font-medium ml-1">Fixed for Super Admins. Contact platform support to transfer ownership.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                  <Lock size={16} className="text-gray-500" />
                  <div>
                    <h3 className="font-bold text-[#111] text-sm uppercase tracking-wide">Change Password</h3>
                  </div>
                </div>
                <div className="p-6 space-y-5 max-w-md">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Current Password</label>
                    <input type="password" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">New Password</label>
                    <input type="password" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" placeholder="New Password" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Confirm New Password</label>
                    <input type="password" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" placeholder="Confirm Password" />
                  </div>
                  <button className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold flex justify-center w-full transition-all shadow-sm mt-2">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Company Profile Tab */}
          {activeTab === 'company' && (
            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Organization Details</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Visible on invoices and platform headers.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Legal Company Name</label>
                    <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none flex justifiy-center" defaultValue="OzFreight Logistics Pty Ltd" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">ABN / Business ID</label>
                    <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none" defaultValue="88 123 456 789" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Primary Industry</label>
                    <select className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none appearance-none font-medium cursor-pointer"><option>Road Freight & Transport</option></select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-gray-100 pt-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1 flex items-center gap-1.5">
                      <Mail size={12} /> Contact Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-200 text-gray-400 rounded-lg py-2.5 px-4 text-sm font-medium shadow-sm cursor-not-allowed" 
                      readOnly 
                      defaultValue="admin@hero.com.au" 
                    />
                    <p className="text-[9px] text-gray-400 mt-1.5 ml-1">Contact support to change.</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 ml-1 flex items-center gap-1.5">
                      <Phone size={12} /> Support Phone
                    </label>
                    <input type="tel" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none" defaultValue="+61 412 345 678" />
                  </div>
                </div>
                
                <hr className="border-gray-100" />
                
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4 uppercase tracking-widest text-[10px]">
                    <MapPin size={12} className="text-gray-400" /> HQ Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium shadow-sm transition-all focus:outline-none" placeholder="Street Address" defaultValue="200 George St" />
                    <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium shadow-sm transition-all focus:outline-none" placeholder="Suburb" defaultValue="Sydney" />
                    <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium shadow-sm transition-all focus:outline-none" placeholder="State" defaultValue="NSW" />
                    <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium shadow-sm transition-all focus:outline-none" placeholder="Postal Code" defaultValue="2000" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Safety Protocols</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Manage operator constraints and platform security.</p>
                </div>
                <div className="p-6 space-y-6">
                  {[
                    { label: 'Require 2FA for Dispatchers', desc: 'Adds an extra layer of security to sensitive operations.', default: true },
                    { label: 'Idle Driver Tracking', desc: 'Notify dispatcher if driver is idle for > 15 minutes.', default: true },
                    { label: 'Route Recording', desc: 'Record detailed GPS breadcrumbs for every route.', default: true },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between gap-6 p-2">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{s.label}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked={s.default} className="w-5 h-5 accent-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl group-hover:bg-gray-700/50 transition-all"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2 relative z-10">
                   <Key size={16}/> System Access Token
                </h3>
                
                <div className="space-y-4 relative z-10">
                   <p className="text-xs text-gray-400">Used for programmatic API operations (e.g. ERP integration).</p>
                   <div className="bg-black/50 border border-white/20 rounded-lg p-3 font-mono text-sm text-[#FFCC00] break-all select-all flex items-center gap-3">
                     hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                   </div>
                   <button className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors underline decoration-gray-500 underline-offset-4">Regenerate Access Key</button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-gray-900 border border-gray-200 mb-5 shadow-sm">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-xl font-black text-[#111] mb-2 tracking-tight">Enterprise Infrastructure</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium">Billed automatically on the 1st of every month via saved Mastercard ending in 4122.</p>
                
                <div className="mt-8 flex gap-3">
                  <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm">Manage Billing</button>
                  <button className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">View Invoices</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 font-bold">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                <h3 className="font-bold text-[#111] text-sm uppercase tracking-wide">Alert Preferences</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Control operational reporting subscriptions.</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'E-mail Support Alerts', default: true },
                  { label: 'In-App Performance Reports', default: true },
                  { label: 'Critical Delay / Breakdown Notifications', default: false },
                  { label: 'Weekly Operational Summary', default: true },
                ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors shadow-sm">
                     <span className="text-sm font-bold text-gray-800">{s.label}</span>
                     <input type="checkbox" defaultChecked={s.default} className="w-5 h-5 accent-yellow-400" />
                   </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
