import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, CheckCircle2, Circle, AlertTriangle, 
  Printer, Share2, ClipboardList, Truck, Box, 
  User, Calendar, Clock, ChevronRight, FileCheck 
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
      contact: 'Liam O’Neil (+61 2 9283 1122)',
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
    <div className="w-full max-w-7xl mx-auto pb-24 px-6">
      
      {/* ── Header Area ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-6">
           <button 
             onClick={() => navigate('/dispatch/jobs')}
             className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-xl shadow-gray-200/20 group"
           >
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-3xl font-black text-gray-900 tracking-tighter">{job.id}</h1>
                 <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 bg-blue-50 text-blue-600 shadow-sm`}>
                    ● {job.status}
                 </span>
                 {job.priority === 'High' && (
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase rounded-lg border border-red-100 animate-pulse">Priority</span>
                 )}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Manifest Registered: April 08, 2026 • 11:42 PM</p>
           </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none btn bg-white border-2 border-gray-100 text-gray-600 hover:border-gray-900 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest py-4 px-6 rounded-2xl">
              <Printer size={16}/> Print POD
           </button>
           <button className="flex-1 md:flex-none btn bg-gray-900 text-[#FACC15] hover:bg-black transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest py-4 px-8 rounded-2xl shadow-xl shadow-yellow-400/10">
              <Share2 size={16}/> Track Live
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ── LEFT: The Physical Flow (Origin/Dest) ── */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Manifest Cards: Origin & Destination */}
           <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-2xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-0 opacity-50"></div>
              
              <div className="relative z-10 space-y-12">
                 {/* Pickup Node */}
                 <div className="flex gap-8">
                    <div className="w-14 h-14 rounded-3xl bg-yellow-400 flex items-center justify-center text-black shadow-xl shrink-0 group">
                       <MapPin size={24} className="group-hover:scale-110 transition-transform"/>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{job.consignor.type}</p>
                       <h3 className="text-xl font-black text-gray-900 leading-tight">{job.consignor.name}</h3>
                       <p className="text-sm font-bold text-gray-600">{job.consignor.address}</p>
                       <div className="pt-2 flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-widest cursor-pointer hover:underline">
                          <User size={12}/> {job.consignor.contact}
                       </div>
                    </div>
                 </div>

                 {/* Visual Connector */}
                 <div className="ml-7 h-12 border-l-4 border-dashed border-gray-100"></div>

                 {/* Delivery Node */}
                 <div className="flex gap-8">
                    <div className="w-14 h-14 rounded-3xl bg-gray-900 flex items-center justify-center text-white shadow-xl shrink-0">
                       <Truck size={24}/>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{job.consignee.type}</p>
                       <h3 className="text-xl font-black text-gray-900 leading-tight">{job.consignee.name}</h3>
                       <p className="text-sm font-bold text-gray-600">{job.consignee.address}</p>
                       <div className="pt-2 flex items-center gap-2 text-[11px] font-black text-emerald-600 uppercase tracking-widest cursor-pointer hover:underline">
                          <User size={12}/> {job.consignee.contact}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Cargo Specification Card */}
           <div className="bg-gray-50 rounded-[2.5rem] border-2 border-white shadow-xl p-10 flex flex-col md:flex-row gap-10">
              <div className="w-20 h-20 rounded-[2rem] bg-white text-violet-600 flex items-center justify-center shadow-lg shrink-0 border-2 border-violet-50">
                 <Box size={32}/>
              </div>
              <div className="flex-1 space-y-6">
                 <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Freight Declaration</h3>
                    <p className="text-lg font-black text-gray-900 leading-relaxed">{job.cargo.description}</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Packaging</p>
                       <p className="text-xs font-black text-gray-900">{job.cargo.packaging}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total Weight</p>
                       <p className="text-xs font-black text-gray-900">{job.cargo.weight}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Value</p>
                       <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">{job.cargo.value}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Handling</p>
                       <p className="text-[9px] font-black text-red-500 uppercase tracking-widest inline-block border border-red-100 bg-red-50 px-2 py-0.5 rounded">Fragile</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* ── RIGHT: Deployment Specs & Controls ── */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Fleet Status Card */}
           <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-2xl p-10 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 pb-5">Operational Chain</h3>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 text-[#FACC15] flex items-center justify-center font-black text-sm shadow-lg">JT</div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Driver</p>
                       <p className="text-sm font-black text-gray-900">{job.fleet.driver}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                       <Truck size={20}/>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Equipment</p>
                       <p className="text-sm font-black text-gray-900">{job.fleet.vehicle}</p>
                    </div>
                 </div>

                 <div className="pt-6 mt-6 border-t border-gray-50 space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target ETA</span>
                       <span className="text-xs font-black text-gray-900 bg-yellow-400 px-3 py-1 rounded-lg shadow-sm">April 10 • 08:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Network Node</span>
                       <span className="text-[10px] font-black text-white bg-blue-600 px-3 py-1 rounded-lg uppercase tracking-tighter">SYDNEY-HUB-A1</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Actions / Document Control */}
           <div className="bg-gray-50 rounded-[2.5rem] border-2 border-white p-10 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Governance</h3>
              <div className="flex flex-col gap-3">
                 <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-all flex items-center justify-center gap-3">
                    <ClipboardList size={16}/> Load Manifest
                 </button>
                 <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-all flex items-center justify-center gap-3">
                    <FileCheck size={16}/> Pre-Departure Signoff
                 </button>
                 <button className="w-full py-4 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3">
                    <AlertTriangle size={16}/> Report Exception
                 </button>
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}
