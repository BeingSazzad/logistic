import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, CheckCircle2, Circle, AlertTriangle, 
  Printer, Share2, ClipboardList, Truck, Box, 
  User, Calendar, Clock, ChevronRight, FileCheck, Route, FileText
} from 'lucide-react';

export default function DispatchJobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data for the manifest
  const job = {
    id: id || 'JOB-10254',
    status: 'In Transit',
    priority: 'High',
    consignor: {
      name: 'Global Traders PTY (Guest)',
      address: 'Warehouse 4, 12 Botany Rd, Alexandria NSW 2015',
      contact: "Liam O'Neil (+61 2 9283 1122)",
      type: 'Pickup'
    },
    consignee: {
      name: 'Southport Logistics Hub',
      address: 'Bay 12, 45 Ferry Rd, Southport QLD 4215',
      contact: 'Sarah Miller (+61 7 5582 9900)',
      type: 'Delivery'
    },
    cargo: {
      description: 'Precision Medical Equipment & Testing Kits',
      packaging: '3 x Chep Pallets',
      weight: '840 KG',
      value: '$24,500.00',
      fragile: true,
      hazardous: false
    },
    fleet: {
      driver: 'Jack Taylor',
      vehicle: 'T-102 (Freightliner Cascadia)',
      eta: 'April 10, 08:30 AM'
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
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
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{job.id}</h1>
               <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span> {job.status}
               </span>
               {job.priority === 'High' && (
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-50 text-red-600 border border-red-100 uppercase tracking-widest animate-pulse">
                     Priority
                  </span>
               )}
            </div>
            <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-medium">Manifest Registered: April 08, 2026 • 11:42 PM</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center justify-center gap-2">
              <Printer size={16}/> Print POD
           </button>
           <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm group">
              <Share2 size={16} strokeWidth={2.5}/> Track Live
           </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        
        {/* ── LEFT: The Physical Flow (Origin/Dest) Col-span-2 ── */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Manifest Cards: Origin & Destination */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <Route className="text-[#FFCC00]" size={18} />
                 <div>
                    <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Transit Route</h2>
                 </div>
              </div>
              <div className="p-6">
                 {/* Pickup Node */}
                 <div className="flex gap-6">
                    <div className="relative">
                       <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 z-10 relative">
                          <Circle size={14} strokeWidth={3} />
                       </div>
                       {/* Connector Line */}
                       <div className="absolute top-10 bottom-[-1.5rem] left-1/2 -translate-x-1/2 border-l-2 border-dashed border-gray-200 z-0"></div>
                    </div>
                    <div className="space-y-1.5 pb-8 pt-1">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{job.consignor.type} Location</p>
                       <h3 className="text-lg font-black text-gray-900 leading-tight">{job.consignor.name}</h3>
                       <p className="text-sm font-medium text-gray-600">{job.consignor.address}</p>
                       <div className="pt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          <User size={12}/> {job.consignor.contact}
                       </div>
                    </div>
                 </div>

                 {/* Delivery Node */}
                 <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#111] border border-gray-800 flex items-center justify-center text-white shrink-0 z-10 relative">
                       <MapPin size={16} />
                    </div>
                    <div className="space-y-1.5 pt-1">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{job.consignee.type} Location</p>
                       <h3 className="text-lg font-black text-gray-900 leading-tight">{job.consignee.name}</h3>
                       <p className="text-sm font-medium text-gray-600">{job.consignee.address}</p>
                       <div className="pt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          <User size={12}/> {job.consignee.contact}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Cargo Specification Card */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <Box className="text-gray-400" size={18} />
                 <div>
                    <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Freight Declaration</h2>
                 </div>
              </div>
              <div className="p-6">
                 <div className="mb-6">
                    <p className="text-base font-black text-gray-900 leading-relaxed">{job.cargo.description}</p>
                 </div>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Packaging</p>
                       <p className="text-sm font-bold text-gray-900">{job.cargo.packaging}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Weight</p>
                       <p className="text-sm font-bold text-gray-900">{job.cargo.weight}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Value</p>
                       <p className="text-sm font-black text-green-600 uppercase tracking-widest">{job.cargo.value}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Handling</p>
                       <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest inline-block border border-red-100 bg-red-50 px-2 py-0.5 rounded leading-tight">Fragile</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* ── RIGHT: Deployment Specs & Controls Col-span-1 ── */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Fleet Status Card */}
           <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl group-hover:bg-gray-700/50 transition-all"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2 relative z-10">
                 <Truck size={16}/> Operational Chain
              </h3>
              
              <div className="space-y-5 relative z-10">
                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><User size={12}/> Assigned Driver</label>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10" >
                      <div className="w-8 h-8 rounded shrink-0 bg-[#FFCC00] flex items-center justify-center text-black text-[10px] font-black">
                        JT
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{job.fleet.driver}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest hover:underline cursor-pointer">View Profile</p>
                      </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Truck size={12}/> Equipment Asset</label>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                       <div className="w-8 h-8 rounded shrink-0 bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                          <Truck size={14}/>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{job.fleet.vehicle}</p>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest hover:underline cursor-pointer">View Asset</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 mt-2 border-t border-gray-800 space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target ETA</span>
                       <span className="text-xs font-black text-black bg-[#FFCC00] px-2 py-1 rounded shadow-sm">{job.fleet.eta}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network Node</span>
                       <span className="text-[9px] font-bold text-white bg-blue-600 px-2 py-1 rounded uppercase tracking-widest">SYDNEY-HUB-A1</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Actions / Document Control */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-[#FAFAFA] text-center">
                 <h2 className="text-xs font-bold text-[#111] uppercase tracking-wide flex items-center justify-center gap-2"><FileText size={14} className="text-gray-400"/> Document Control</h2>
              </div>
              <div className="p-5 flex flex-col gap-3">
                 <button className="w-full py-3 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <ClipboardList size={14}/> Load Manifest
                 </button>
                 <button className="w-full py-3 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <FileCheck size={14}/> Pre-Departure Signoff
                 </button>
                 <button className="w-full py-3 bg-red-50 border border-red-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 mt-2">
                    <AlertTriangle size={14}/> Report Exception
                 </button>
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}
