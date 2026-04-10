import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Shield, UserCog, Mail, Plus } from 'lucide-react';

export default function AdminInviteUser() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/users')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invite System User</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Send a platform invitation to a new person with role-based access control (RBAC).</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/users')}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm"
          >
            Cancel
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm group">
            <UserPlus size={18} strokeWidth={2.5}/> Send Invite
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">

        {/* Core Profile (Col-span-1) */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <UserCog className="text-[#FFCC00]" size={18} />
               <div>
                  <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">User Profile</h2>
               </div>
             </div>
             <div className="p-6 grid grid-cols-1 gap-6">
               <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">User Full Name</label>
                  <div className="relative group">
                     <UserCog className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                     <input type="text" placeholder="e.g. Liam Smith" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                  </div>
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Work Email Address</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                     <input type="email" placeholder="user@company.com" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Access Matrix (Col-span-2) */}
        <div className="md:col-span-2 flex flex-col gap-6">
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <Shield className="text-gray-400" size={18} />
               <div>
                  <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Access Matrix (Role Assignment)</h2>
               </div>
             </div>
             
             <div className="p-6">
               <p className="text-[11px] text-gray-500 mb-6 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">Select the system role for this user. You can further customize permissions after invite acceptance.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-3 p-5 border-2 border-[#111] bg-[#111] rounded-xl cursor-not-allowed group relative overflow-hidden transition">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
                     <div className="flex justify-between items-start relative z-10">
                        <span className="text-sm font-bold text-white tracking-wide">System Admin (Full)</span>
                        <input type="radio" name="role" defaultChecked disabled className="w-4 h-4 cursor-not-allowed hidden" />
                        <div className="w-5 h-5 rounded-full border-4 border-[#111] ring-2 ring-[#FFCC00] bg-[#FFCC00]"></div>
                     </div>
                     <p className="text-[11px] text-gray-400 leading-relaxed font-medium relative z-10">Full root access to entire system, governance, metrics, and integrations.</p>
                  </label>

                  <label className="flex flex-col gap-3 p-5 border-2 border-gray-200 hover:border-[#111] bg-white rounded-xl cursor-pointer group transition">
                     <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-gray-900 tracking-wide">Dispatch Hub Operator</span>
                        <input type="radio" name="role" className="w-4 h-4 cursor-pointer hidden" />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-[#111] transition-colors"></div>
                     </div>
                     <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Operational access to job creation, driver dispatching, and tracking.</p>
                  </label>

                  <label className="flex flex-col gap-3 p-5 border-2 border-gray-200 hover:border-[#111] bg-white rounded-xl cursor-pointer group transition">
                     <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-gray-900 tracking-wide">Warehouse Floor Staff</span>
                        <input type="radio" name="role" className="w-4 h-4 cursor-pointer hidden" />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-[#111] transition-colors"></div>
                     </div>
                     <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Mobile floor devises access, scanning, loading, and receiving items.</p>
                  </label>

                  <label className="flex flex-col gap-3 p-5 border-2 border-gray-200 hover:border-[#111] bg-white rounded-xl cursor-pointer group transition">
                     <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-gray-900 tracking-wide">Driver Profile</span>
                        <input type="radio" name="role" className="w-4 h-4 cursor-pointer hidden" />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-[#111] transition-colors"></div>
                     </div>
                     <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Log into the driver mobile PWA with limited functional assignment access.</p>
                  </label>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
