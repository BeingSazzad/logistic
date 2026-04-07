import React from 'react';
import { Settings as SettingsIcon, Save, Globe, Shield, CreditCard, Bell } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure global application parameters and defaults.</p>
        </div>
        <button className="btn btn-primary"><Save size={16}/> Save Changes</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Nav Tabs (Visual only for now) */}
        <div className="flex flex-col gap-1">
           <button className="flex items-center gap-3 px-4 py-3 bg-yellow-50 text-black font-semibold rounded-lg"><SettingsIcon size={18}/> General</button>
           <button className="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg"><Shield size={18}/> Security</button>
           <button className="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg"><CreditCard size={18}/> Billing</button>
           <button className="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg"><Bell size={18}/> Notifications</button>
        </div>

        {/* Settings Panel */}
        <div className="md:col-span-3 card bg-white shadow-sm p-6 flex flex-col gap-8">
           <section>
             <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-100 pb-2">Global Locale Settings</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Language</label>
                  <select className="input"><option>English (AU)</option></select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">System Timezone</label>
                  <select className="input"><option>AEST (Sydney, Melbourne)</option></select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency Setup</label>
                  <select className="input"><option>AUD ($)</option></select>
                </div>
             </div>
           </section>

           <section>
             <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-100 pb-2">Tenant Defaults</h3>
             <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Address</label>
                  <input type="text" className="input" defaultValue="Level 4, 200 George St, Sydney NSW 2000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Phone Support</label>
                  <input type="text" className="input" defaultValue="+61 1800 000 000" />
                </div>
             </div>
           </section>
        </div>
      </div>
    </div>
  );
}
