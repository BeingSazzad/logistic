import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Shield, UserCog, Mail, Plus } from 'lucide-react';

export default function AdminInviteUser() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Users
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Invite System User</h1>
          <p className="text-sm text-gray-500 mt-1">Send a platform invitation to a new person with role-based access control (RBAC).</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={16}/> Send Invite</button>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-12">
        {/* Core Profile */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><UserCog size={16}/> User Profile</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">User Full Name</label>
                <div className="relative"><UserCog size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" className="input pl-9" placeholder="e.g. Liam Smith" /></div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email Address</label>
                <div className="relative"><Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="email" className="input pl-9" placeholder="user@company.com" /></div>
              </div>
           </div>
        </div>

        {/* Access Matrix */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-6">
           <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><Shield size={16}/> Access Matrix (Role Assignment)</h3>
              <p className="text-xs text-gray-500 mt-2 font-medium">Select the system role for this user. You can further customize permissions after invite acceptance.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 p-4 border border-yellow-400/30 bg-yellow-400/5 rounded-xl cursor-not-allowed group relative">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 border-b border-black/5 pb-1">System Admin (Full)</span>
                    <input type="radio" name="role" defaultChecked disabled className="w-4 h-4 cursor-not-allowed" />
                 </div>
                 <p className="text-[11px] text-gray-500 leading-normal">Full root access to entire system, governance, metrics, and integrations.</p>
              </label>

              <label className="flex flex-col gap-2 p-4 border border-gray-100 hover:border-blue-400 bg-white rounded-xl cursor-pointer transition">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 border-b border-black/5 pb-1">Dispatch Hub Operator</span>
                    <input type="radio" name="role" className="w-4 h-4 cursor-pointer" />
                 </div>
                 <p className="text-[11px] text-gray-500 leading-normal">Operational access to job creation, driver dispatching, and tracking.</p>
              </label>

              <label className="flex flex-col gap-2 p-4 border border-gray-100 hover:border-green-400 bg-white rounded-xl cursor-pointer transition">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 border-b border-black/5 pb-1">Warehouse Floor Staff</span>
                    <input type="radio" name="role" className="w-4 h-4 cursor-pointer" />
                 </div>
                 <p className="text-[11px] text-gray-500 leading-normal">Mobile floor devises access, scanning, loading, and receiving items.</p>
              </label>

              <label className="flex flex-col gap-2 p-4 border border-gray-100 hover:border-gray-400 bg-white rounded-xl cursor-pointer transition">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 border-b border-black/5 pb-1">Driver Profile</span>
                    <input type="radio" name="role" className="w-4 h-4 cursor-pointer" />
                 </div>
                 <p className="text-[11px] text-gray-500 leading-normal">Log into the driver mobile PWA with limited functional assignment access.</p>
              </label>
           </div>
        </div>

      </div>
    </div>
  );
}
