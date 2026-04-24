import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Truck, FileText, Settings, Key, MapPin, Gauge, AlertTriangle, ShieldAlert } from 'lucide-react';

const CURRENT_VEHICLE_COUNT = 10;
const PLAN_LIMIT = 10;
const PLAN_NAME = 'Starter Fleet';

export default function AdminAddVehicle() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  const handleSave = () => {
    if (CURRENT_VEHICLE_COUNT >= PLAN_LIMIT) {
      alert(`Plan Exceeded: Your ${PLAN_NAME} plan allows a maximum of ${PLAN_LIMIT} vehicles. Please upgrade your subscription to add more assets.`);
      navigate('/admin/billing/plans');
    } else {
      navigate('/admin/fleet');
    }
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/fleet')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add Vehicle</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Register a new truck, trailer or van to the global fleet.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/fleet')}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm"
          >
            Cancel
          </button>
          <button onClick={handleSave} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm group">
            <Save size={18} strokeWidth={2.5}/> Save Vehicle
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {CURRENT_VEHICLE_COUNT >= PLAN_LIMIT && (
        <div className="px-2 mb-2">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
             <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
               <ShieldAlert size={20} className="text-red-600" />
             </div>
             <div className="flex-1">
               <h3 className="text-sm font-black text-red-900 tracking-tight">Plan Limit Reached ({CURRENT_VEHICLE_COUNT}/{PLAN_LIMIT})</h3>
               <p className="text-xs font-bold text-red-700 mt-0.5">Your '{PLAN_NAME}' plan does not allow more vehicles. Additional assets will not be saved.</p>
             </div>
             <button onClick={() => navigate('/admin/billing/plans')} className="shrink-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all">
               Upgrade Plan
             </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">

        {/* Main Details (Col-span-2) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <Truck className="text-[#FFCC00]" size={18} />
               <div>
                  <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Vehicle Identification</h2>
               </div>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Reg / Number Plate</label>
                  <input type="text" placeholder="e.g. XQG-984" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Vehicle Category</label>
                  <select className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm appearance-none cursor-pointer focus:outline-none focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20">
                    <option>Heavy Truck (Semi)</option>
                    <option>B-Double</option>
                    <option>Rigid Truck</option>
                    <option>Delivery Van</option>
                    <option>Trailer (Flatbed)</option>
                    <option>Trailer (Refrigerated)</option>
                  </select>
               </div>
               <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">VIN / Chassis Number</label>
                  <div className="relative group">
                     <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                     <input type="text" placeholder="17-digit identification" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 font-mono" />
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Make & Model</label>
                  <input type="text" placeholder="e.g. Kenworth T610" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Year of Manufacture</label>
                  <input type="number" placeholder="2024" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
               </div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <Settings className="text-gray-500" size={18} />
               <div>
                  <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Specs & Metrics</h2>
               </div>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Payload Capacity (Tonnes)</label>
                   <input type="number" placeholder="e.g. 22" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:border-gray-300" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Initial Odometer (km)</label>
                   <div className="relative group">
                     <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-800 transition-colors" size={16}/>
                     <input type="number" placeholder="12500" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:border-gray-300" />
                   </div>
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Fuel Type / Powertrain</label>
                   <select className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm appearance-none cursor-pointer">
                     <option>Diesel Engine</option>
                     <option>Battery Electric (BEV)</option>
                     <option>Hydrogen Fuel Cell</option>
                     <option>LNG / Gas</option>
                   </select>
                </div>
             </div>
          </div>

        </div>

        {/* Sidebar (Photo & Operations) */}
        <div className="md:col-span-1 flex flex-col gap-6">
           
           {/* Asset Photo */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-[#FAFAFA] text-center">
               <h2 className="text-xs font-bold text-[#111] uppercase tracking-wide">Vehicle Photo</h2>
             </div>
             <div className="p-5">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group min-h-[220px]">
                  {photo ? (
                    <>
                      <img src={photo} alt="Vehicle preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                        <p className="text-white text-sm font-bold flex items-center gap-2"><Upload size={16}/> Change Photo</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400 p-8">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                        <ImageIcon size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-600">Upload Asset Photo</p>
                        <p className="text-xs mt-1 leading-tight">JPEG, PNG up to 5MB</p>
                      </div>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                </div>
             </div>
             <div className="p-5 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Additional Notes</label>
                <textarea className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" placeholder="Special requirements or history..."></textarea>
             </div>
           </div>

           {/* Operational Config */}
           <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl group-hover:bg-gray-700/50 transition-all"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2">
                 <Truck size={16}/> Initial Status Setup
              </h3>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Initial Status</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-white/40 leading-tight">
                      <option className="text-black">Active / Available</option>
                      <option className="text-black">In Maintenance</option>
                      <option className="text-black">Out of Service</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><MapPin size={10}/> Default Depot</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-white/40 leading-tight">
                      <option className="text-black">Sydney Central Depot</option>
                      <option className="text-black">Melbourne Depot</option>
                      <option className="text-black">Brisbane Port</option>
                    </select>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}

