import React, { useState } from 'react';
import { 
  Save, User, Mail, Lock, Camera
} from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[900px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 px-2 mt-2">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-900 shadow-sm">
             <User size={20} />
           </div>
          <div>
             <h1 className="hero-h1">My Profile</h1>
             <p className="hero-body mt-1">Manage your personal information and security credentials</p>
          </div>
        </div>
        <button className="btn btn-primary px-6 shadow-sm flex items-center gap-2">
          <Save size={16} strokeWidth={2.5} /> Save Profile
        </button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="flex flex-col gap-8 px-2">
        
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-[#FAFAFA]">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Personal Details</h3>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Your identity on the platform</p>
          </div>
          <div className="p-8 flex flex-col md:flex-row gap-8">
            
            <div className="shrink-0 flex flex-col justify-center items-center gap-4">
               <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#FFCC00] flex items-center justify-center text-4xl font-semibold text-black">
                     MA
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                     <Camera className="text-white" size={24} />
                  </div>
               </div>
               <button className="text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-1.5 rounded-lg shadow-sm">
                 Upload Photo
               </button>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mt-2">Super Admin</span>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Full Name</label>
                <input type="text" className="input w-full md:w-3/4" defaultValue="Michael Adams" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Contact Number</label>
                <input type="tel" className="input w-full md:w-3/4" defaultValue="+61 412 345 678" />
              </div>
              <div className="pt-2 border-t border-gray-100">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2 ml-1 flex items-center gap-1.5">
                  <Mail size={12} /> Login Email
                </label>
                <input 
                  type="email" 
                  className="input w-full md:w-3/4 bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200" 
                  readOnly 
                  defaultValue="michael@hero.com.au" 
                />
                <p className="text-xs text-gray-400 mt-1.5 font-bold ml-1">Account ownership transfers must go through support.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
            <Lock size={16} className="text-gray-500" />
            <div>
              <h3 className="font-bold text-[#111] text-sm uppercase tracking-wide">Safety & Security</h3>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Update your password and 2FA settings</p>
            </div>
          </div>
          <div className="p-8 space-y-6 max-w-lg">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Current Password</label>
              <input type="password" className="input w-full" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2 ml-1">New Password</label>
              <input type="password" className="input w-full" placeholder="New Password" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2 ml-1">Confirm New Password</label>
              <input type="password" className="input w-full" placeholder="Confirm Password" />
            </div>
            <button className="btn bg-gray-900 hover:bg-black text-white px-8 mt-4">
              Update Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}


