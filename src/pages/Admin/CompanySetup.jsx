import React from 'react';
import { Building2, Save, Globe, Phone, MapPin, Truck, Layout, Globe2 } from 'lucide-react';

export default function AdminCompanySetup() {
  return (
    <div className="flex flex-col gap-6 max-w-[1000px] mb-8">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Company Profile Setup</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your core SaaS organization details, business niche, and operational regions.</p>
        </div>
        <button className="btn btn-primary"><Save size={16}/> Save Profile</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Profile */}
        <div className="md:col-span-2 card bg-white shadow-sm p-6 flex flex-col gap-6">
           <div className="flex items-center gap-6 border-b border-gray-50 pb-6 mb-2">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-dashed border-gray-300 relative group overflow-hidden">
                <Layout size={32} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-[10px] text-white font-bold uppercase">Upload Logo</span>
                </div>
              </div>
              <div className="flex-1">
                 <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Building2 size={16}/> Registered Entity Name</label>
                 <input type="text" className="input text-lg font-bold" defaultValue="HERO Logistics AU Pty Ltd" />
                 <p className="text-xs text-gray-400 mt-1.5">Official company name used for all legal invoicing and POD documents.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Business Type / Niche</label>
                <select className="input font-bold text-gray-800">
                  <option>General Freight & Logistics</option>
                  <option>Car / Vehicle Transport</option>
                  <option>Container Services</option>
                  <option>Refrigerated / Cold Chain</option>
                  <option>Custom Logistics Config</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Support Phone Number</label>
                <div className="relative"><Phone size={14} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/><input type="text" className="input pl-9" defaultValue="+61 1800 000 000" /></div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Headquarters Address</label>
                <div className="relative"><MapPin size={14} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/><input type="text" className="input pl-9" defaultValue="Level 4, 200 George St, Sydney NSW 2000" /></div>
              </div>
           </div>
        </div>

        {/* Operating Regions */}
        <div className="card bg-white shadow-sm p-6 flex flex-col gap-6">
           <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Globe size={18}/> Regions & Zones</h3>
              <p className="text-xs text-gray-500 mt-1">Specify where your fleet currently operates.</p>
           </div>
           
           <div className="flex flex-col gap-2">
              <label className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 cursor-pointer">
                 <span className="text-sm font-bold text-gray-700">New South Wales</span>
                 <input type="checkbox" defaultChecked className="toggle shrink-0" />
              </label>
              <label className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 cursor-pointer">
                 <span className="text-sm font-bold text-gray-700">Victoria</span>
                 <input type="checkbox" defaultChecked className="toggle shrink-0" />
              </label>
              <label className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 cursor-pointer opacity-50">
                 <span className="text-sm font-bold text-gray-700">Western Australia</span>
                 <input type="checkbox" className="toggle shrink-0" />
              </label>
           </div>

           <div className="pt-4 border-t border-gray-50">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Globe2 size={14}/> System Currency</label>
              <select className="input font-bold text-gray-900"><option>AUD - Australian Dollar ($)</option><option>USD - US Dollar ($)</option></select>
           </div>
        </div>

      </div>
    </div>
  );
}
