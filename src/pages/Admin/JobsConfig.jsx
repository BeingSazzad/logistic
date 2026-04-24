import React from 'react';
import { Settings2, Plus, Info, ShieldCheck, Zap, Navigation, Camera, PenTool, MapPin } from 'lucide-react';

export default function AdminJobsConfig() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-hero-sm text-hero-dark shadow-sm">
            <Settings2 size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Global Load Monitor</h1>
            <p className="hero-body text-gray-600 mt-1">Configure systemic status flows, automation triggers, and POD compliance requirements</p>
          </div>
        </div>
        <button className="bg-hero-dark hover:bg-black text-brand px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm">
          Save System Global Config
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
        
        {/* Load Architecture (Left 8 Units) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Status Pipelines */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-brand/40 transition-all">
             <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <h3 className="text-xs font-semibold text-hero-dark uppercase tracking-widest">Load Status Pipelines</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase mt-1">Core logistics lifecycle control</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold uppercase tracking-widest flex items-center gap-2"><Plus size={14}/> Define New Status</button>
             </div>
             
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'FTL (Full Truckload)', desc: 'Dedicated vehicle logic with express routing', enabled: true, icon: Zap },
                  { name: 'LTL (Less Than Truckload)', desc: 'Consolidation logic with multiple pickups', enabled: true, icon: Navigation },
                  { name: 'Same-Day Express', desc: 'Point-to-point priority with zero staging', enabled: true, icon: ShieldCheck },
                  { name: 'Inter-Branch Transfer', desc: 'Internal depot movements and cross-docking', enabled: false, icon: Info },
                ].map((type, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${type.enabled ? 'bg-white border-gray-100' : 'bg-gray-50/50 border-gray-100 opacity-60'} flex items-center justify-between group/row`}>
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type.enabled ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-400'}`}>
                           <type.icon size={18}/>
                        </div>
                        <div>
                           <p className="text-xs font-semibold text-hero-dark uppercase tracking-tight">{type.name}</p>
                           <p className="text-xs font-bold text-gray-400 uppercase mt-0.5">{type.desc}</p>
                        </div>
                     </div>
                     <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={type.enabled} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Compliance Matrix */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-hero-success/40 transition-all">
             <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                <h3 className="text-xs font-semibold text-hero-dark uppercase tracking-widest">Compliance & POD Requirements</h3>
                <p className="text-xs text-gray-400 font-bold uppercase mt-1">Proof of Delivery (POD) Validation Rules</p>
             </div>
             <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                     { label: 'Photo Upload', icon: Camera, desc: 'Driver must capture drop-off evidence' },
                     { label: 'Digital Sign', icon: PenTool, desc: 'Receiver must sign on glass' },
                     { label: 'GPS Geofence', icon: MapPin, desc: 'Match drop-off within 50m radius' },
                   ].map((pod, i) => (
                     <div key={i} className="flex flex-col gap-3 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-hero-success transition-all">
                        <div className="flex items-center justify-between">
                           <pod.icon size={18} className="text-hero-dark"/>
                           <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 accent-hero-success cursor-pointer" />
                        </div>
                        <p className="text-xs font-semibold text-hero-dark uppercase tracking-widest">{pod.label}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase leading-relaxed">{pod.desc}</p>
                     </div>
                   ))}
                </div>
                <div className="p-4 bg-gray-800 rounded-2xl text-xs text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
                   <p className="flex items-center gap-2"><Info size={14} className="text-brand"/> Automated validation is active. Non-compliant Loads will be flagged as a "Delivery Issue" automatically after 30 minutes of delivery completion.</p>
                </div>
             </div>
          </div>

        </div>

        {/* Financial Logic (Right 4 Units) */}
        <div className="lg:col-span-4 space-y-8">
           
           <div className="bg-hero-dark rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-8 text-brand flex items-center gap-3">
                 Billings Logic
              </h3>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <label className="hero-metadata block mb-2">Default Calculation Model</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-widest focus:border-brand focus:outline-none transition-all">
                       <option>Flat Fee + Distance</option>
                       <option>Strict Distance Matrix</option>
                       <option>Volumetric Weight Base</option>
                    </select>
                 </div>
                 <div>
                    <label className="hero-metadata block mb-2">Base Minimum (AUD)</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand font-semibold text-xs">$</span>
                       <input type="number" defaultValue="250.00" className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-xs font-semibold uppercase tracking-widest focus:border-brand focus:outline-none transition-all" />
                    </div>
                 </div>
                 <div className="pt-4">
                    <button className="w-full bg-brand text-hero-dark py-4 rounded-xl text-xs font-semibold uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 shadow-xl">Update Logic Matrix</button>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-xs font-semibold text-hero-dark uppercase tracking-widest mb-6">Automation Triggers</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Auto-Assign Near Drivers', enabled: true },
                   { label: 'SMS Alerts on Issues', enabled: true },
                   { label: 'Auto-Invoice on Delivery', enabled: false },
                   { label: 'E-Manifest Generation', enabled: true },
                 ].map((t, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                       <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{t.label}</span>
                       <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={t.enabled} className="sr-only peer" />
                          <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
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




