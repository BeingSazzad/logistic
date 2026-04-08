import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Building, MapPin, Truck, 
  Package, Clock, DollarSign, AlertCircle, Info,
  Navigation, Calendar, Scale, Box
} from 'lucide-react';

export default function DispatchCreateJob() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-16">
      
      {/* ── 1. Strategic Form Header ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Manifest New Shipment</h1>
            <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span> Draft Mode • SYD-NODE-42
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="flex-1 md:flex-none px-8 py-3.5 bg-white text-gray-500 font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
          >
            Discard
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-3.5 bg-gray-900 hover:bg-black text-[#FACC15] font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-95">
            <Save size={16} /> Deploy Manifest
          </button>
        </div>
      </div>

      <div className="h-px bg-gray-200/60 mx-4"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
        
        {/* ── Main Form Columns ── */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Section: Identity */}
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                 <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Building className="text-yellow-500" size={16} /> Customer Identity
                 </h2>
                 <span className="text-[10px] font-bold text-gray-400">Section 01/03</span>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Client Organization *</label>
                    <div className="relative group">
                       <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors" size={18}/>
                       <select className="input pl-12 w-full bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-4 font-bold text-sm transition-all appearance-none cursor-pointer">
                          <option value="">Search customer database...</option>
                          <option value="acme">Acme Corp Logistics</option>
                          <option value="tech">Tech Solutions Ltd</option>
                          <option value="global">Global Traders PTY</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">On-Site Contact</label>
                    <input type="text" placeholder="Full name" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-4 font-bold text-sm w-full transition-all" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Billing Reference (PO)</label>
                    <input type="text" placeholder="PO-XXXX-XXXX" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-4 font-bold text-sm w-full transition-all uppercase" />
                 </div>
              </div>
           </div>

           {/* Section: Physical Logistics */}
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                 <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Navigation className="text-blue-500" size={16} /> Route & Dynamic Schedule
                 </h2>
              </div>
              <div className="p-8 space-y-8 relative">
                 
                 {/* Visual Route Line */}
                 <div className="absolute left-[3.25rem] top-24 bottom-24 w-0.5 bg-gray-100 border-dashed border-l-2 border-gray-200"></div>

                 {/* Pickup */}
                 <div className="flex gap-8 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-xs text-black border-4 border-white shadow-xl rotate-0">A</div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="md:col-span-2">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Pickup Address *</label>
                          <input type="text" placeholder="Full street or warehouse node" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-3.5 font-bold text-sm w-full" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Appointment</label>
                          <div className="relative">
                             <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={14}/>
                             <input type="datetime-local" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-3.5 font-bold text-[10px] w-full uppercase" />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Dropoff */}
                 <div className="flex gap-8 relative z-10 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center font-black text-xs text-white border-4 border-white shadow-xl">B</div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="md:col-span-2">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Drop-off Address *</label>
                          <input type="text" placeholder="Destination point" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-3.5 font-bold text-sm w-full" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Arrival</label>
                          <div className="relative">
                             <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={14}/>
                             <input type="datetime-local" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-3.5 font-bold text-[10px] w-full uppercase" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: Freight Data */}
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30">
                 <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Box className="text-violet-500" size={16} /> Cargo Specifications
                 </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Load Classification</label>
                    <select className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-4 font-bold text-sm w-full appearance-none">
                       <option>FTL - Heavy Duty</option>
                       <option>LTL - Shared Cargo</option>
                       <option>Reefer - Cold Chain</option>
                       <option>Hazmat - Hazardous</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Total Weight (KG)</label>
                    <div className="relative group">
                       <Scale className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16}/>
                       <input type="number" placeholder="0.00" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-4 font-bold text-sm w-full" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Commodity Value (AUD)</label>
                    <div className="relative group">
                       <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16}/>
                       <input type="number" placeholder="Declared Value" className="input bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl py-4 font-bold text-sm w-full" />
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* ── Side Configuration Bar ── */}
        <div className="space-y-6">
           
           {/* Priority Selector */}
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg p-8">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Service Priority</h3>
              <div className="grid grid-cols-2 gap-3">
                 {['Low', 'Normal', 'High', 'Critical'].map(lvl => (
                   <button 
                     key={lvl}
                     type="button"
                     onClick={() => setPriority(lvl)}
                     className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${priority === lvl ? 'bg-gray-900 text-[#FACC15] border-transparent shadow-xl ring-4 ring-yellow-400/10' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'}`}
                   >
                     {lvl}
                   </button>
                 ))}
              </div>
              <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                 <Info className="text-yellow-600 shrink-0" size={16}/>
                 <p className="text-[10px] font-bold text-yellow-700 leading-relaxed uppercase tracking-tight">Critical flag alerts all dispatchers and mandates real-time voice verification.</p>
              </div>
           </div>

           {/* Assignment Quick Board */}
           <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-yellow-500">Resource Assignment</h3>
              <div className="space-y-4">
                 <div className="relative">
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Deploy Driver/Vehicle</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm font-bold text-white focus:bg-white/10 outline-none transition-all cursor-pointer shadow-inner">
                       <option className="bg-gray-900">Queue (Unassigned)</option>
                       <optgroup label="Available in Region" className="bg-gray-900 text-yellow-400">
                          <option className="bg-gray-900 text-white">Jack Taylor (TRK-102)</option>
                          <option className="bg-gray-900 text-white">Liam Smith (VAN-08)</option>
                       </optgroup>
                    </select>
                 </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Est. Revenue</span>
                    <span className="text-xl font-black text-white">$4,250.00</span>
                 </div>
                 <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Est. Fuel Cost</span>
                    <span className="text-sm font-black text-red-400">-$412.00</span>
                 </div>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all" style={{ width: '84%' }}></div>
                 </div>
                 <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-3 text-center">Projected Net Margin: 84%</p>
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}
