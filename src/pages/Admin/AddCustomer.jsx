import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CreditCard, Save, MapPin, Mail, Settings } from 'lucide-react';

export default function AdminAddCustomer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/customers')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">New B2B Customer Setup</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Configure a new client organization, billing contact, and shipping terms.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/customers')}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm"
          >
            Cancel
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm group">
            <Save size={18} strokeWidth={2.5}/> Save Customer
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">

        {/* Company Identity (Col-span-2) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <Building2 className="text-[#FFCC00]" size={18} />
               <div>
                  <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Company Identity</h2>
               </div>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Company Legal Name</label>
                  <input type="text" placeholder="e.g. Acme Corp Logistics" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">ABN / Business ID</label>
                  <input type="text" placeholder="11-digit ABN" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Billing / HQ Address</label>
                  <div className="relative group">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                     <input type="text" placeholder="Street Address" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                  </div>
               </div>
               <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Primary Billing Email</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                     <input type="email" placeholder="accounts@company.com" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar (Credit & Terms) */}
        <div className="md:col-span-1 flex flex-col gap-6">
           
           <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl group-hover:bg-gray-700/50 transition-all"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2 relative z-10">
                 <CreditCard size={16}/> Credit & Terms
              </h3>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Credit Limit (AUD)</label>
                    <input type="number" placeholder="50000" className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white shadow-sm transition-all focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Payment Terms</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-white/40 leading-tight">
                      <option className="text-black">Net 30 Days</option>
                      <option className="text-black">Net 14 Days</option>
                      <option className="text-black">Net 7 Days</option>
                      <option className="text-black">COD (Cash On Delivery)</option>
                      <option className="text-black">EOM + 30 Days</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Currency Selection</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-white/40 leading-tight">
                      <option className="text-black">AUD ($)</option>
                      <option className="text-black">USD ($)</option>
                    </select>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-[#FAFAFA] text-center">
               <h2 className="text-xs font-bold text-[#111] uppercase tracking-wide flex items-center justify-center gap-2"><Settings size={14} className="text-gray-400"/> Operational Setup</h2>
             </div>
             <div className="p-5 text-gray-500 text-xs text-center border-b border-gray-100">
               <p className="leading-relaxed font-medium">By registering this customer, they will be activated in the main Dispatch "Create Job" window.</p>
             </div>
             <label className="flex items-center justify-center gap-2 cursor-pointer font-bold text-gray-700 py-4 hover:bg-gray-50 transition-colors">
               <input type="checkbox" className="w-4 h-4 accent-[#FFCC00]" defaultChecked /> 
               <span className="text-xs">Auto-generate Customer ID</span>
             </label>
           </div>
        </div>
      </div>
    </div>
  );
}

