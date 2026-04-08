import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Building, MapPin, Truck, 
  Package, Clock, DollarSign, AlertCircle, Info,
  Navigation, Calendar, Scale, Box, User, Phone,
  ChevronRight, Layers, Fingerprint
} from 'lucide-react';

export default function DispatchCreateJob() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto pb-24">
      
      {/* ── 1. Strategic Form Header ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="w-14 h-14 flex items-center justify-center bg-white border-2 border-gray-100 rounded-[2rem] text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-xl shadow-gray-200/20 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-4xl font-black text-gray-900 tracking-tighter">New Logistics Manifest</h1>
               <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Draft Active</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
               Enterprise Grade Shipment Deployment HUD
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="flex-1 md:flex-none px-10 py-4 bg-white border-2 border-gray-100 text-gray-500 font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:border-gray-900 transition-all active:scale-95"
          >
            Cancel Manifest
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-4 px-12 py-4 bg-gray-900 hover:bg-black text-[#FACC15] font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-2xl shadow-yellow-400/20 transition-all active:scale-95 group">
            <Save size={18} /> Deploy to Fleet <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-6">
        
        {/* ── Main Form Columns (Guest Logic & Cargo) ── */}
        <div className="lg:col-span-8 space-y-12">
           
           {/* Section: SENDER (Guest Friendly) */}
           <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-2xl overflow-hidden relative">
              <div className="px-10 py-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                 <div>
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] flex items-center gap-3">
                       <Fingerprint className="text-yellow-500" size={18} /> Sender Identity (Consignor)
                    </h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Manual entry or guest checkout enabled</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl">Guest Input</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all">Registered Client</button>
                 </div>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Consignor / Sender Full Name *</label>
                    <div className="relative group">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors" size={20}/>
                       <input type="text" placeholder="Enter guest or company name" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 rounded-2xl py-5 pl-14 pr-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Contact Phone</label>
                    <div className="relative group">
                       <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors" size={18}/>
                       <input type="text" placeholder="+61 XXX XXX XXX" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 rounded-2xl py-5 pl-14 pr-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Collection Address *</label>
                    <div className="relative group">
                       <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors" size={18}/>
                       <input type="text" placeholder="Street, City, State, Postcode" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 rounded-2xl py-5 pl-14 pr-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: RECEIVER (Guest Friendly) */}
           <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-2xl overflow-hidden relative">
              <div className="px-10 py-8 border-b border-gray-50 bg-gray-50/30">
                 <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] flex items-center gap-3">
                    <Navigation className="text-blue-500" size={18} /> Receiver Identity (Consignee)
                 </h2>
                 <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Destination point of delivery contact</p>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Consignee / Receiver Name *</label>
                    <div className="relative group">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" size={20}/>
                       <input type="text" placeholder="Individual or Warehouse contact" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-2xl py-5 pl-14 pr-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Contact Email / Phone</label>
                    <input type="text" placeholder="Tracking alerts will be sent here" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-2xl py-5 px-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                 </div>
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Destination Address *</label>
                    <div className="relative group">
                       <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" size={18}/>
                       <input type="text" placeholder="Final drop-off point" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-2xl py-5 pl-14 pr-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: Cargo Breakdown (Missing info fixed) */}
           <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-2xl overflow-hidden">
              <div className="px-10 py-8 border-b border-gray-50 bg-gray-50/30">
                 <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] flex items-center gap-3">
                    <Layers className="text-violet-500" size={18} /> What are we sending? (Cargo Manifest)
                 </h2>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                       <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Commodity Description *</label>
                       <textarea rows="3" placeholder="Detailed description of goods (e.g. 2 Pallets of Electronics, Fragile Glassware)" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-violet-400 rounded-2xl py-5 px-8 font-bold text-gray-900 shadow-inner transition-all outline-none resize-none"></textarea>
                    </div>
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Packaging Type</label>
                        <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-violet-400 rounded-2xl py-5 px-8 font-bold text-gray-900 shadow-inner outline-none transition-all appearance-none cursor-pointer">
                           <option>Pallets (Chep/Loscam)</option>
                           <option>Cartons / Boxes</option>
                           <option>Crates / Bulk</option>
                           <option>Furniture / Loose</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Qty</label>
                          <input type="number" placeholder="1" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-violet-400 rounded-2xl py-5 px-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                       </div>
                       <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Weight (KG)</label>
                          <input type="number" placeholder="0" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-violet-400 rounded-2xl py-5 px-8 font-bold text-gray-900 shadow-inner transition-all outline-none" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* ── Side Configuration Bar (Matches system) ── */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Manifest Meta */}
           <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FACC15]/10 rounded-full blur-3xl group-hover:bg-[#FACC15]/20 transition-all"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-[#FACC15] flex items-center gap-2">
                 <Box size={14}/> Logistic Specs
              </h3>
              
              <div className="space-y-8">
                 <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Service Level</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['Low', 'Normal', 'High', 'Critical'].map(l => (
                         <button 
                           key={l}
                           onClick={() => setPriority(l)}
                           className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${priority === l ? 'bg-[#FACC15] text-black border-transparent shadow-lg shadow-yellow-500/20' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                         >
                            {l}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                       <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Base Rate</span>
                       <span className="text-xl font-black text-white">$1,420.00</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                       <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Priority Fee</span>
                       <span className={`text-sm font-black transition-all ${['High', 'Critical'].includes(priority) ? 'text-yellow-400' : 'text-gray-600'}`}>+$250.00</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                       <span className="text-[10px] font-black uppercase text-[#FACC15] tracking-widest">Grand Total</span>
                       <span className="text-3xl font-black text-white">$1,670.00</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Security / Compliance */}
           <div className="bg-white rounded-[2.5rem] p-10 border-2 border-gray-50 shadow-xl space-y-8">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4">Compliance Note</h3>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Shield size={20}/>
                 </div>
                 <p className="text-[11px] font-bold text-gray-500 leading-relaxed uppercase tracking-tight">
                    By deploying this manifest, you confirm the cargo does not contain restricted materials and adheres to heavy vehicle national law.
                 </p>
              </div>
              <div className="pt-8 border-t border-gray-50">
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-100 checked:bg-[#FACC15] transition-all cursor-pointer"/>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Manifest confirmed for dispatch</span>
                 </label>
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}
