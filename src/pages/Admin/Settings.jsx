import React, { useState } from 'react';
import { 
  Building2, Shield, Bell, CreditCard, Key, 
  MapPin, Globe, Mail, Phone, Lock, Save 
} from 'lucide-react';

const navTabs = [
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'security', label: 'Safety & Security', icon: Shield },
  { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
  { id: 'notifications', label: 'Alert Preferences', icon: Bell },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your organization's operational defaults</p>
        </div>
        <button className="btn btn-primary px-6 py-2.5 font-bold shadow-sm flex items-center gap-2">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-2">
        
        {/* Left Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-100 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-yellow-600' : 'text-gray-400'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Company Profile Tab */}
          {activeTab === 'company' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-lg">Organization Details</h3>
                <p className="text-sm text-gray-500 mt-0.5">This information is visible on your invoices and tracking pages.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Legal Company Name</label>
                    <input type="text" className="input w-full" defaultValue="OzFreight Logistics Pty Ltd" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">ABN / Business ID</label>
                    <input type="text" className="input w-full" defaultValue="88 123 456 789" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Primary Industry</label>
                    <select className="input w-full"><option>Road Freight & Transport</option></select>
                  </div>
                </div>
                
                <hr className="border-gray-100" />
                
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-yellow-500" /> HQ Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" className="input w-full" placeholder="Street Address" defaultValue="200 George St" />
                    <input type="text" className="input w-full" placeholder="Suburb" defaultValue="Sydney" />
                    <input type="text" className="input w-full" placeholder="State" defaultValue="NSW" />
                    <input type="text" className="input w-full" placeholder="Postal Code" defaultValue="2000" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg">Safety Protocols</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Manage driver safety and platform access.</p>
                </div>
                <div className="p-6 space-y-6">
                  {[
                    { label: 'Require 2FA for Dispatchers', desc: 'Adds an extra layer of security to sensitive operations.', default: true },
                    { label: 'Idle Driver Tracking', desc: 'Notify dispatcher if driver is idle for > 15 minutes.', default: true },
                    { label: 'Route Recording', desc: 'Record detailed GPS breadcrumbs for every route.', default: true },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between gap-6">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked={s.default} className="w-5 h-5 accent-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#111] rounded-2xl p-6 text-white border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-400">
                    <Key size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">System Access Token</h3>
                    <p className="text-xs text-slate-500">For API and Integration usage</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm text-yellow-400 break-all">
                  hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </div>
                <button className="mt-4 text-xs font-bold text-slate-400 hover:text-white transition-colors underline">Regenerate Token</button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional SaaS Subscription</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">You are currently on the Enterprise plan billed monthly to your saved card.</p>
                
                <div className="mt-8 flex gap-3">
                  <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6">Manage Subscription</button>
                  <button className="btn btn-dark px-6">View Invoices</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 font-bold">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-lg">Alert Preferences</h3>
                <p className="text-sm text-gray-500 mt-0.5">Control how and when you want to be notified.</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { label: 'E-mail Support Alerts', default: true },
                  { label: 'In-App Performance Reports', default: true },
                  { label: 'Critical Delay Notifications', default: false },
                  { label: 'Weekly Operational Summary', default: true },
                ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:bg-gray-50/50 transition-colors">
                     <span className="text-sm text-gray-700">{s.label}</span>
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
