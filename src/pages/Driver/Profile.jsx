import React, { useState } from 'react';
import { User, Phone, Mail, Shield, CheckCircle2, AlertCircle, LogOut, ChevronRight, Lock, Bell, FileText, Activity, Info, Link as LinkIcon, Smartphone, Mailbox, Camera, LifeBuoy, Send, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function DriverProfile() {
  const navigate = useNavigate();
  const docs = [
    { name: 'Heavy Vehicle License (HC)',  expiry: '14 Jun 2027', ok: true,  type: 'License' },
    { name: 'MSIC Card',                  expiry: '22 Mar 2026', ok: true,  type: 'Security' },
    { name: 'Dangerous Goods Certificate',expiry: '8 Apr 2025',  ok: false, type: 'Certification' },
    { name: 'White Card (Construction)',  expiry: '30 Sep 2026', ok: true,  type: 'Safety' },
    { name: 'Medical Certificate',        expiry: '1 Feb 2027',  ok: true,  type: 'Medical' },
    { name: 'Police Check',               expiry: '8 Apr 2025',  ok: false, type: 'Background' },
    { name: 'Forklift License',           expiry: '30 Sep 2026', ok: true,  type: 'License' },
  ];

  const user = useAuthStore(state => state.user);
  const [activeView, setActiveView] = useState('main'); // 'main', 'edit', 'password'
  const [profilePhoto, setProfilePhoto] = useState(null);

  if (activeView === 'edit') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ChevronRight size={24} className="rotate-180" />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">Personal Information</h1>
          </div>
          <div className="p-5 flex flex-col gap-5 mt-2">
             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <div className="relative group cursor-pointer" onClick={() => setProfilePhoto('/assets/sample_driver.png')}>
                   <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-[#FFCC00] flex items-center justify-center font-semibold text-3xl text-black">
                      {profilePhoto ? <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover"/> : (user?.name?.split(' ').map(n=>n[0]).join('') || 'JM')}
                   </div>
                   <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="text-white" />
                   </div>
                   <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white text-gray-900 shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors pointer-events-none">
                      <Camera size={14} />
                   </button>
                </div>
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-widest mt-4">Tap to update avatar</p>
             </div>
             
             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
               <div>
                  <label className="hero-metadata block mb-2 px-1">Full Name</label>
                  <input type="text" defaultValue={user?.name || "James Mitchell"} className="w-full bg-gray-50 border border-gray-100 focus:border-[#FFCC00] focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <div>
                  <label className="hero-metadata block mb-2 px-1">Mobile Number</label>
                  <input type="text" defaultValue="+61 412 345 678" className="w-full bg-gray-50 border border-gray-100 focus:border-[#FFCC00] focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <div>
                  <label className="hero-metadata block mb-2 px-1 flex items-center gap-1.5"><Mail size={12}/> Login Email</label>
                  <input type="email" defaultValue={user?.email || "j.mitchell@hero.com.au"} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-400 cursor-not-allowed outline-none shadow-inner" />
               </div>
               <button onClick={() => setActiveView('main')} className="w-full py-4 bg-[#FFCC00] hover:bg-[#E6B800] text-black font-semibold uppercase text-xs tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4 active:scale-95">Save Changes</button>
             </div>
          </div>
        </div>
     );
  }

  if (activeView === 'password') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ChevronRight size={24} className="rotate-180" />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">Change Password</h1>
          </div>
          <div className="p-5 flex flex-col gap-5 mt-2">
             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
               <div>
                 <label className="hero-metadata block mb-2 px-1">Current Password</label>
                 <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <div>
                 <label className="hero-metadata block mb-2 px-1">New Password</label>
                 <input type="password" placeholder="New Password" className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <div>
                 <label className="hero-metadata block mb-2 px-1">Confirm New Password</label>
                 <input type="password" placeholder="Confirm Password" className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <button onClick={() => setActiveView('main')} className="w-full py-4 bg-[#111] hover:bg-black text-[#FFCC00] font-semibold uppercase text-xs tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4 active:scale-95"><Shield size={16}/> Update Password</button>
             </div>
          </div>
        </div>
     );
  }

  if (activeView === 'notifications') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ChevronRight size={24} className="rotate-180" />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">Notifications</h1>
          </div>
          <div className="p-5 flex flex-col gap-4 mt-2">
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">Push Notifications</span>
                      <span className="text-xs text-gray-400">Receive alerts on your phone</span>
                   </div>
                   <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#FFCC00]" />
                </div>
                <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">SMS Job Updates</span>
                      <span className="text-xs text-gray-400">Fallback alerts for dispatch updates</span>
                   </div>
                   <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#FFCC00]" />
                </div>
                <div className="p-4 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">Weekly Email Stats</span>
                      <span className="text-xs text-gray-400">Performance report sent to email</span>
                   </div>
                   <input type="checkbox" className="w-5 h-5 accent-[#FFCC00]" />
                </div>
             </div>
          </div>
        </div>
     );
  }

  if (activeView === 'docs') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ChevronRight size={24} className="rotate-180" />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">Compliance</h1>
          </div>
          <div className="p-4 mt-2 space-y-3">
             {docs.map(doc => (
                <div key={doc.name} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${doc.ok ? 'bg-white border-gray-100 shadow-sm' : 'bg-red-50 border-red-100 shadow-sm'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${doc.ok ? 'bg-emerald-50 text-emerald-500' : 'bg-red-100 text-red-500'}`}>
                       {doc.ok ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 leading-none">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="hero-metadata bg-gray-100 px-1.5 py-0.5 rounded leading-none">{doc.type}</span>
                        <p className={`text-xs font-bold tracking-tight ${doc.ok ? 'text-gray-400' : 'text-red-700 font-semibold uppercase'}`}>
                          {doc.ok ? `Expires ${doc.expiry}` : `Expired ${doc.expiry}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  {!doc.ok && (
                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase px-3 py-2 rounded-lg shadow-lg active:scale-95 transition-all">
                      Renew
                    </button>
                  )}
                </div>
              ))}
             <div className="pt-4 px-2">
                <button className="w-full bg-[#111] hover:bg-black text-white font-semibold uppercase text-xs py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98]">
                   Upload New Document
                </button>
             </div>
          </div>
        </div>
     );
  }

  if (activeView === 'stats') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ChevronRight size={24} className="rotate-180" />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">Performance Summary</h1>
          </div>
          <div className="p-4 mt-2">
             <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="bg-[#FFCC00] rounded-2xl p-5 shadow-sm text-center">
                 <p className="text-3xl font-semibold text-black">128</p>
                 <p className="text-xs font-semibold uppercase text-black/60 tracking-widest mt-1">Total Trips</p>
               </div>
               <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
                 <p className="text-3xl font-semibold text-[#111]">94%</p>
                 <p className="text-xs font-semibold uppercase text-gray-400 tracking-widest mt-1">On-Time</p>
               </div>
             </div>
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
                <h3 className="font-bold text-gray-900 text-sm">All-Time Metrics</h3>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                   <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Kilometers Driven</span>
                   <span className="font-bold text-gray-900">24,180 KM</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                   <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Delivery Issues</span>
                   <span className="font-bold text-gray-900">3</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                   <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Safety Score</span>
                   <span className="font-bold text-emerald-600">A+</span>
                </div>
             </div>
          </div>
        </div>
     );
  }

  if (activeView === 'about') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ChevronRight size={24} className="rotate-180" />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">About App</h1>
          </div>
          <div className="p-4 mt-2">
             <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
                <div className="w-16 h-16 bg-[#FFCC00] rounded-2xl flex items-center justify-center text-[#111] font-semibold text-2xl mb-4 shadow-inner">
                   H
                </div>
                <h3 className="text-xl font-semibold text-gray-900">HERO Logistics</h3>
                <p className="text-sm font-bold text-gray-400 mt-1">Driver Edition</p>
                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-4">Version 1.0.4 (Build 42)</p>
             </div>
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="flex items-center justify-between w-full p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                   <span className="text-sm font-bold text-gray-900">Terms and Conditions</span>
                   <LinkIcon size={16} className="text-gray-300" />
                </button>
                <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors">
                   <span className="text-sm font-bold text-gray-900">Privacy Policy</span>
                   <LinkIcon size={16} className="text-gray-300" />
                </button>
             </div>
          </div>
        </div>
     );
  }

  if (activeView === 'support') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right-4 duration-300">
           <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md gap-3">
             <button onClick={() => setActiveView('main')} className="text-white hover:text-[#FFCC00] transition-colors p-1 -ml-2 rounded-lg">
                <ArrowLeft size={24} />
             </button>
             <h1 className="text-white font-bold text-lg tracking-wide">Support Center</h1>
          </div>
          <div className="p-5 flex flex-col gap-5 mt-2">
             <div className="bg-[#111] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#111] shadow-lg">
                      <LifeBuoy size={24} />
                   </div>
                   <div>
                     <h3 className="font-semibold text-white text-lg">GET HELP NOW</h3>
                     <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-0.5">Internal Team Support Ticket</p>
                   </div>
                </div>
             </div>
             
             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
               <div>
                  <label className="hero-metadata block mb-2 px-1">Subject</label>
                  <input type="text" placeholder="e.g. Schedule Error, App Glitch..." className="w-full bg-gray-50 border border-gray-100 focus:border-[#FFCC00] focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <div>
                  <label className="hero-metadata block mb-2 px-1">Description</label>
                  <textarea placeholder="Describe the issue you're facing..." className="w-full min-h-[140px] resize-none bg-gray-50 border border-gray-100 focus:border-[#FFCC00] focus:bg-white rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all outline-none" />
               </div>
               <button onClick={() => { alert('Support ticket sent to Admin.'); setActiveView('main'); }} className="w-full py-4 bg-[#FFCC00] hover:bg-[#E6B800] text-black font-semibold uppercase text-xs tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4 active:scale-95">
                 <Send size={16}/> Submit Ticket
               </button>
             </div>
          </div>
        </div>
     );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24">
      {/* ── 1. Top Navigation Bar ── */}
      <div className="bg-[#111] px-5 py-4 sticky top-0 z-10 flex items-center shadow-md">
        <h1 className="text-white font-bold text-lg tracking-wide">Profile</h1>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* ── 2. Profile Summary Card ── */}
        <div className="bg-[#111] text-white rounded-2xl p-5 flex items-center gap-4 shadow-lg border border-gray-800">
          <div className="w-16 h-16 rounded-full bg-[#FFCC00] border-2 border-white flex items-center justify-center font-semibold text-[#111] text-2xl shrink-0 shadow-inner overflow-hidden">
            {profilePhoto ? <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover"/> : (user?.name?.split(' ').map(n=>n[0]).join('') || 'JM')}
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white mb-0.5">{user?.name || 'James Mitchell'}</h2>
            <p className="text-xs font-semibold text-[#FFCC00] uppercase tracking-widest">{user?.role || 'Heavy Vehicle Driver'} · {user?.branchName || 'Sydney Area'}</p>
          </div>
        </div>

        {/* ── 3. Action Menu List ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          
          <button onClick={() => setActiveView('edit')} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                   <User size={18} className="text-gray-600" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-gray-900">Personal Information</p>
                   <p className="text-xs text-gray-400">Name, email, phone</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </button>

          <button onClick={() => setActiveView('password')} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                   <Lock size={18} className="text-gray-600" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-gray-900">Change Password</p>
                   <p className="text-xs text-gray-400">Password & authentication</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </button>

          <button onClick={() => setActiveView('notifications')} className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                   <Bell size={18} className="text-gray-600" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-gray-900">Notification Settings</p>
                   <p className="text-xs text-gray-400">Push, email, in-app</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </button>
        </div>

        {/* ── 4. Driver Specific Items ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          
          <button onClick={() => setActiveView('docs')} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                   <FileText size={18} className="text-blue-600" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-gray-900">Compliance Documents</p>
                   <p className="text-xs text-gray-400">Licenses and certificates</p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <ChevronRight size={18} className="text-gray-300" />
             </div>
          </button>

          <button onClick={() => setActiveView('stats')} className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                   <Activity size={18} className="text-emerald-600" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-gray-900">Performance Stats</p>
                   <p className="text-xs text-gray-400">Trips, on-time, kilometers</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </button>
        </div>

        {/* ── 5. System Items ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <button onClick={() => setActiveView('support')} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors group">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                   <LifeBuoy size={18} className="text-blue-500" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-gray-900">Help & Support</p>
                   <p className="text-xs text-gray-400">Submit support ticket</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </button>

          <button onClick={() => navigate('/login')} className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors group">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-100 transition-colors">
                   <LogOut size={18} className="text-red-500" />
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-red-500">Log Out</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}



