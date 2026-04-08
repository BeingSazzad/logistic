import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Building, MapPin, Truck, 
  Package, Clock, DollarSign, AlertCircle, Info,
  Navigation, Calendar, Scale, Box, User, Phone,
  ChevronRight, Layers, Fingerprint, Shield
} from 'lucide-react';

export default function DispatchCreateJob() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── 1. Standardized Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Shipment</h1>
               <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-2.5 py-1 rounded-md uppercase tracking-widest leading-none">Draft</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
               Enter shipment details and assign to a driver.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={() => navigate('/dispatch/jobs')}
             className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm"
          >
            Cancel
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm group">
            <Save size={18} strokeWidth={2.5}/> Create Shipment
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">
        
        {/* ── Main Form Columns (Guest Logic & Cargo) ── */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           
           {/* Section: SENDER (Guest Friendly) */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Fingerprint className="text-[#FFCC00]" size={18} />
                    <div>
                      <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Sender Details</h2>
                      <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Who is sending this package?</p>
                    </div>
                 </div>
                 <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button className="px-4 py-1.5 bg-white text-gray-900 shadow-sm text-xs font-bold rounded-md">Guest</button>
                    <button className="px-4 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-bold rounded-md transition-all">Registered User</button>
                 </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2 relative">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Sender Name *</label>
                    <div className="relative group">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={18}/>
                       <input type="text" placeholder="Enter full name or company name" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Phone</label>
                    <div className="relative group">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="text" placeholder="Mobile or landline" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Pickup Address *</label>
                    <div className="relative group">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="text" placeholder="Full address" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: RECEIVER (Guest Friendly) */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <Navigation className="text-blue-500" size={18} />
                 <div>
                   <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Receiver Details</h2>
                   <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Where is this package going?</p>
                 </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Receiver Name *</label>
                    <div className="relative group">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18}/>
                       <input type="text" placeholder="Enter full name or company name" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Email / Phone</label>
                    <input type="text" placeholder="Tracking alerts will be sent here" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Drop-off Address *</label>
                    <div className="relative group">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                       <input type="text" placeholder="Full address" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: Cargo Breakdown */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <Layers className="text-violet-500" size={18} />
                 <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Shipment Items</h2>
              </div>
              <div className="p-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Item Description *</label>
                       <textarea rows="3" placeholder="What are you sending? (e.g., 2 boxes of clothes, 1 pallet of electronics)" className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"></textarea>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Packaging Type</label>
                        <select className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20 appearance-none cursor-pointer">
                           <option>Pallets</option>
                           <option>Boxes / Cartons</option>
                           <option>Crates</option>
                           <option>Furniture / Loose Items</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Quantity</label>
                          <input type="number" placeholder="1" className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Weight (KG)</label>
                          <input type="number" placeholder="0" className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* ── Side Configuration Bar (Matches system) ── */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           
           {/* Manifest Meta */}
           <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl group-hover:bg-[#FFCC00]/20 transition-all"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#FFCC00] flex items-center gap-2">
                 <Box size={16}/> Summary
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Delivery Priority</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['Low', 'Normal', 'High', 'Urgent'].map(l => (
                         <button 
                           key={l}
                           onClick={() => setPriority(l)}
                           className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${priority === l ? 'bg-[#FFCC00] text-black border-transparent shadow-sm' : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}`}
                         >
                            {l}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-end border-b border-white/10 pb-3">
                       <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Base Price</span>
                       <span className="text-lg font-black text-white">$1,420.00</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-3">
                       <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Extra Fees</span>
                       <span className={`text-sm font-black transition-all ${['High', 'Urgent'].includes(priority) ? 'text-[#FFCC00]' : 'text-gray-500'}`}>+$250.00</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                       <span className="text-xs font-black uppercase text-[#FFCC00] tracking-widest">Total Price</span>
                       <span className="text-2xl font-black text-white">$1,670.00</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Security / Compliance */}
           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col gap-5">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Shield size={16} className="text-emerald-500"/> Terms & Conditions
              </h3>
              <p className="text-xs font-medium text-gray-600 leading-relaxed">
                By creating this shipment, you confirm that the items do not contain any restricted, illegal, or dangerous materials.
              </p>
              <div className="pt-5 border-t border-gray-100">
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFCC00] focus:ring-[#FFCC00] transition-all cursor-pointer"/>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">I confirm all details are correct</span>
                 </label>
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}
