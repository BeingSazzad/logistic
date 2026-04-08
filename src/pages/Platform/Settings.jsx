import React, { useState } from 'react';
import { Globe, Shield, Bell, CreditCard, Key, User, Users, Camera, Mail, Plus } from 'lucide-react';

const sections = [
  {
    id: 'profile',
    title: 'My Profile',
    icon: User,
    fields: [], // Custom rendered
  },
  {
    id: 'team',
    title: 'Platform Team',
    icon: Users,
    fields: [], // Custom rendered
  },
  {
    id: 'identity',
    title: 'Platform Identity',
    icon: Globe,
    fields: [
      { label: 'Platform Name', type: 'text', value: 'HERO TMS' },
      { label: 'Support Email', type: 'email', value: 'support@hero.com.au' },
      { label: 'Platform URL', type: 'text', value: 'https://app.hero.com.au' },
    ],
  },
  {
    id: 'security',
    title: 'Security & Access',
    icon: Shield,
    fields: [
      { label: 'Enforce 2FA for all tenants', type: 'toggle', value: true },
      { label: 'Session timeout (minutes)', type: 'number', value: 60 },
      { label: 'IP allowlist enabled', type: 'toggle', value: false },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Invoicing',
    icon: CreditCard,
    fields: [
      { label: 'Stripe Publishable Key', type: 'text', value: 'pk_live_****' },
      { label: 'Invoice prefix', type: 'text', value: 'HERO-' },
      { label: 'GST Rate (%)', type: 'number', value: 10 },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    fields: [
      { label: 'New tenant signup alerts', type: 'toggle', value: true },
      { label: 'Trial expiry reminders (days)', type: 'number', value: 3 },
      { label: 'Overdue payment alerts', type: 'toggle', value: true },
    ],
  },
];

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [inviteModal, setInviteModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Global configuration for all tenants</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-2">
        
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {sections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-100 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-yellow-600' : 'text-gray-400'} />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {sections.map(section => (
            section.id === activeTab && (
              <div key={section.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg">{section.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Manage your global {section.id} preferences.</p>
                </div>
                <div className="p-6 space-y-6">
                  {section.fields.map(field => (
                    <div key={field.label} className="flex md:items-center justify-between gap-6 flex-col md:flex-row">
                      <label className="text-sm font-semibold text-gray-700 flex-1">{field.label}</label>
                      {field.type === 'toggle' ? (
                        <input type="checkbox" defaultChecked={field.value} className="w-5 h-5 accent-yellow-600 shrink-0" />
                      ) : (
                        <input
                          type={field.type}
                          className="input w-full md:w-80"
                          defaultValue={field.value}
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                    <button className="btn btn-primary px-6 py-2.5">Save Changes</button>
                  </div>
                </div>
              </div>
            )
          ))}

          {/* Conditional Extra Blocks based on activeTab */}
          
          {/* Security Tab Extras */}
          {activeTab === 'security' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">Global Audit Logs</h3>
                  <p className="text-sm text-gray-500">View all compliance, logins, and security event tracking.</p>
                </div>
                <button onClick={() => window.location.href = '/platform/settings/audit'} className="btn border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800 shadow-sm">
                  View Audit Logs
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <Key size={18} className="text-gray-400" />
                    Change Administrator Password
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <div className="p-6 space-y-5 max-w-lg">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••" className="input w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="input w-full" />
                  </div>
                  <button className="btn bg-gray-900 hover:bg-black text-white mt-2 px-6">Update Password</button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab Extras */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg">Personal Information</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Update your photo and personal details here.</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                    <div className="relative group cursor-pointer">
                      <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl shrink-0 overflow-hidden">
                        PO
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera size={20} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Profile Picture</h4>
                      <p className="text-xs text-gray-500 max-w-xs mb-3">Upload a new avatar or use the initials generator. Best format is a square 300x300 PNG.</p>
                      <button className="btn bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs py-1.5 px-3">Upload Image</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">First Name</label>
                      <input type="text" className="input w-full" defaultValue="Platform" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">Last Name</label>
                      <input type="text" className="input w-full" defaultValue="Admin" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" className="input w-full pl-10" defaultValue="admin@hero.com.au" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 flex justify-end">
                    <button className="btn btn-primary px-6 py-2.5">Save Profile</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab Extras */}
          {activeTab === 'team' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Platform Administrators</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Invite and manage top-level configuration admins.</p>
                  </div>
                  <button onClick={() => setInviteModal(true)} className="btn btn-dark shrink-0"><Plus size={16} /> Invite Admin</button>
                </div>
                <div className="divide-y divide-gray-100 pb-2">
                  {[
                    { name: 'Platform Admin', email: 'admin@hero.com.au', role: 'Owner', initials: 'PO' },
                    { name: 'Sarah Connor', email: 'sarah@hero.com.au', role: 'Support Admin', initials: 'SC' },
                  ].map((user, i) => (
                    <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">{user.initials}</div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${user.role === 'Owner' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {user.role}
                        </span>
                        {user.role !== 'Owner' && <button className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline">Remove</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Invite Admin Modal */}
      {inviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Invite Administrator</h3>
                <p className="text-sm text-gray-500">Send an invitation email to join the core team.</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input autoFocus type="email" placeholder="colleague@hero.com.au" className="input w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Platform Role</label>
                <select className="input w-full">
                  <option>Support Admin (Read & Reply only)</option>
                  <option>Billing Admin (Financials & Billing)</option>
                  <option>Super Admin (Full Access)</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">Support Admins cannot suspend tenants or manage team members.</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setInviteModal(false)} className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-100">Cancel</button>
              <button onClick={() => setInviteModal(false)} className="btn btn-primary px-6">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
