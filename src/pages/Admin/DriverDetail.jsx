import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, Star, MapPin, Phone, Mail, Edit3, Save, X,
  FileText, ShieldCheck, Truck, Clock, AlertTriangle, 
  CheckCircle2, Package, Route, TrendingUp, Search
} from 'lucide-react';

const driver = {
  id: 'DRV-102',
  name: 'Jack Taylor',
  avatar: 'JT',
  phone: '+61 412 000 102',
  email: 'jack.taylor@hero.com',
  address: '14 Parramatta Rd, Strathfield NSW 2135',
  status: 'On Trip',
  depot: 'Sydney Central Hub',
  shiftType: 'Full-time Permanent',
  license: { type: 'NSW HC (Heavy Combination)', number: 'HR-4412', expiry: '12 Sep 2026', status: 'Valid' },
  medical: { expiry: '15 Oct 2026', status: 'Valid' },
  vehicle: { id: 'TRK-102', reg: 'XQG-984', type: 'Heavy Truck' },
  currentShipment: { id: 'SHP-20481', route: 'Sydney Port → Blacktown DC', progress: 65, eta: '3:45 PM', load: '18.4t' },
  stats: { completedShipments: 284, onTimeRate: '96.2%', avgRating: 4.8, delayedShipments: 11 },
  recentShipments: [
    { id: 'SHP-20481', route: 'Sydney Port → Blacktown DC', status: 'In Transit', date: 'Today' },
    { id: 'SHP-20477', route: 'Chullora DC → Richmond Depot', status: 'Delivered', date: 'Yesterday' },
    { id: 'SHP-20469', route: 'Port Botany → Penrith Hub', status: 'Delivered', date: '05 Apr' },
    { id: 'SHP-20461', route: 'Blacktown DC → Newcastle Depot', status: 'Delivered', date: '04 Apr' },
  ]
};

export default function AdminDriverDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(driver.name);
  const [editedPhone, setEditedPhone] = useState(driver.phone);
  const [editedShift, setEditedShift] = useState(driver.shiftType);
  const [editedDepot, setEditedDepot] = useState(driver.depot);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* ── 1. Standardized Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(location.pathname.includes('/dispatch') ? '/dispatch/drivers' : '/admin/drivers')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-6">
             <div className="w-24 h-24 rounded-2xl bg-[#111] overflow-hidden shadow-md border-2 border-gray-100 shrink-0">
               <img src="/assets/driver_profile.png" alt="Driver" className="w-full h-full object-cover" />
             </div>
             <div>
               <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{editedName}</h1>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-widest leading-none ${driver.status === 'On Trip' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {driver.status}
                  </span>
               </div>
               <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
                  {driver.id} • {driver.vehicle.type} • {driver.depot}
               </p>
               <div className="flex items-center gap-1 mt-2">
                 {[1,2,3,4,5].map(i => (
                   <Star key={i} size={12} className={i <= 4 ? "text-[#FFCC00] fill-[#FFCC00]" : "text-gray-200 fill-gray-200"} />
                 ))}
                 <span className="text-[10px] font-bold text-gray-400 ml-1">4.8 Rating</span>
               </div>
             </div>
          </div>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button 
                 onClick={() => setEditing(false)} 
                 className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2"
              >
                Cancel
              </button>
              <button 
                onClick={() => setEditing(false)} 
                className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <Save size={16} strokeWidth={2.5}/> Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setEditing(true)} 
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <Edit3 size={16}/> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">

        {/* ── LEFT: Profile & Configuration ── */}
        <div className="flex flex-col gap-6">
          
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#FAFAFA]">
               <h3 className="text-xs font-bold text-[#111] uppercase tracking-wide flex items-center gap-2"><FileText size={14} className="text-gray-400"/> Contact Details</h3>
            </div>
            
            <div className="p-5 flex flex-col gap-5">
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block ml-1">Full Name</label>
                {editing ? (
                  <input className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" value={editedName} onChange={e => setEditedName(e.target.value)}/> 
                ) : (
                  <p className="text-sm font-bold text-[#111] px-1">{editedName}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block flex items-center gap-1.5 ml-1"><Phone size={12}/> Phone</label>
                {editing ? (
                  <input className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" value={editedPhone} onChange={e => setEditedPhone(e.target.value)}/> 
                ) : (
                  <p className="text-sm font-medium text-gray-700 px-1">{editedPhone}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block flex items-center gap-1.5 ml-1"><Mail size={12}/> Email</label>
                <p className="text-sm font-medium text-gray-700 px-1">{driver.email}</p>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block flex items-center gap-1.5 ml-1"><MapPin size={12}/> Address</label>
                <p className="text-sm font-medium text-gray-700 px-1">{driver.address}</p>
              </div>
            </div>
          </div>

          {/* Operational Settings (Dark mode equivalent design) */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl group-hover:bg-[#FFCC00]/20 transition-all"></div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#FFCC00] flex items-center gap-2 relative z-10">
               Operational Assignment
            </h3>
            
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Assigned Depot</label>
                {editing ? (
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none focus:outline-none focus:border-[#FFCC00]/50" value={editedDepot} onChange={e => setEditedDepot(e.target.value)}>
                     <option className="text-black">Sydney Central Hub</option>
                     <option className="text-black">Melbourne Hub</option>
                     <option className="text-black">Brisbane Port Branch</option>
                  </select>
                ) : (
                  <p className="text-sm font-bold text-white">{editedDepot}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Shift Type</label>
                {editing ? (
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none focus:outline-none focus:border-[#FFCC00]/50" value={editedShift} onChange={e => setEditedShift(e.target.value)}>
                     <option className="text-black">Full-time Permanent</option>
                     <option className="text-black">Casual</option>
                     <option className="text-black">Contractor (Subby)</option>
                  </select>
                ) : (
                  <p className="text-sm font-bold text-white">{editedShift}</p>
                )}
              </div>
              <div className="pt-2 border-t border-gray-800">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Truck size={12}/> Asset Pairing</label>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                     <span className="text-sm font-bold text-white">{driver.vehicle.id}</span>
                     <span className="text-[10px] text-gray-400 uppercase tracking-widest">{driver.vehicle.reg}</span>
                  </div>
                  <button 
                    onClick={() => {
                      const base = location.pathname.includes('/dispatch') ? '/dispatch/vehicles' : '/admin/fleet';
                      navigate(`${base}/${driver.vehicle.id}`);
                    }}
                    className="text-[10px] text-[#FFCC00] font-bold uppercase tracking-widest hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Docs */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#FAFAFA]">
               <h3 className="text-xs font-bold text-[#111] uppercase tracking-wide flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Legal & Compliance</h3>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Driver's License</p>
                    <p className="text-sm font-bold text-gray-900">{driver.license.type}</p>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">{driver.license.number}</p>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-500"/>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-100/50 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-widest">Expiration</span>
                  <span className="text-[10px] font-black text-gray-800">{driver.license.expiry}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Medical Certificate</p>
                    <p className="text-sm font-bold text-gray-900">Fitness for Duty</p>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">Dept. Transport</p>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-500"/>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-100/50 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-widest">Expiration</span>
                  <span className="text-[10px] font-black text-gray-800">{driver.medical.expiry}</span>
                </div>
              </div>

              {/* Special Certifications */}
              <div className="pt-2 border-t border-gray-100 mt-2">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Special Certifications</h4>
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
                       <span className="text-xs font-bold text-gray-900">MSIC Access</span>
                       <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 uppercase tracking-widest px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
                       <span className="text-xs font-bold text-gray-900">Dangerous Goods (DG)</span>
                       <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 uppercase tracking-widest px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
                       <span className="text-xs font-bold text-gray-900">Construction White Card</span>
                       <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 uppercase tracking-widest px-2 py-0.5 rounded">Active</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Status, Route, Shipments ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Performance KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center flex flex-col justify-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Delivered</p>
              <p className="text-3xl font-black text-gray-900">{driver.stats.completedShipments}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center flex flex-col justify-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">On-Time</p>
              <p className="text-3xl font-black text-emerald-500">{driver.stats.onTimeRate}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center flex flex-col justify-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Rating</p>
              <p className="text-3xl font-black text-[#FFCC00] flex items-center justify-center gap-1">{driver.stats.avgRating} <Star size={18} className="fill-[#FFCC00]"/></p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center flex flex-col justify-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Delays</p>
              <p className="text-3xl font-black text-red-500">{driver.stats.delayedShipments}</p>
            </div>
          </div>

          {/* Current Active Shipment / Live Route */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            
            <div className="p-6 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center pl-7">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide"><Route size={16} className="text-emerald-500"/> Live Assignment</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
              </span>
            </div>
            
            <div className="p-6 pl-7 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Shipment Reference</p>
                  <p className="text-xl font-black text-gray-900">{driver.currentShipment.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Current ETA</p>
                  <p className="text-xl font-black text-gray-900 flex items-center gap-1.5"><Clock size={16} className="text-[#FFCC00]"/> {driver.currentShipment.eta}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                <MapPin size={20} className="text-[#111] shrink-0 outline outline-4 outline-white rounded-full bg-white"/>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Route Path</p>
                  <p className="font-bold text-gray-900 text-[15px]">{driver.currentShipment.route}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                <Package size={20} className="text-[#FFCC00] shrink-0"/>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Payload Measurement</p>
                  <p className="font-bold text-gray-900 text-[15px]">{driver.currentShipment.load}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Route Progress</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{driver.currentShipment.progress}% Complete</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${driver.currentShipment.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Shipments History */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide"><TrendingUp size={16} className="text-gray-400"/> Job History</h3>
              <button 
                onClick={() => navigate('/admin/shipments')}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline uppercase tracking-widest"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {driver.recentShipments.map(job => (
                <div key={job.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => navigate(`/admin/shipments/${job.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${job.status === 'In Transit' ? 'bg-[#FFCC00] animate-pulse' : 'bg-emerald-500'}`}></div>
                    <div>
                      <p className="font-bold text-[#111] text-sm group-hover:text-blue-600 transition-colors">{job.id}</p>
                      <p className="text-[11px] text-gray-500 font-medium tracking-tight mt-0.5">{job.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest leading-none block w-max ml-auto ${
                      job.status === 'In Transit' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                       {job.status}
                    </span>
                    <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">{job.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
