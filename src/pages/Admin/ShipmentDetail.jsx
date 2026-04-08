import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, Circle, AlertTriangle, ShieldAlert, FileText, UploadCloud, Truck, PackageCheck, FileSignature } from 'lucide-react';

const LIFECYCLE_STATES = [
  { step: 1,  label: 'Created Booking', reqs: ['Address Validated'], strict: true },
  { step: 2,  label: 'Assigned to Branch', reqs: [], strict: false },
  { step: 3,  label: 'Driver Assigned', reqs: ['Driver Active'], strict: true },
  { step: 4,  label: 'Vehicle Allocated', reqs: ['Pre-Start Check'], strict: true },
  { step: 5,  label: 'Dispatched to Pickup', reqs: [], strict: false },
  { step: 6,  label: 'Arrived at Pickup', reqs: ['GPS Geofence (50m)'], strict: false },
  { step: 7,  label: 'Loading Goods', reqs: [], strict: false },
  { step: 8,  label: 'Pickup Complete', reqs: ['Pallet Count Verified'], strict: true },
  { step: 9,  label: 'In Transit', reqs: [], strict: false },
  { step: 10, label: 'Arrived at Hub / Consolidation', reqs: [], strict: false },
  { step: 11, label: 'Out for Last Mile', reqs: [], strict: false },
  { step: 12, label: 'Arrived at Drop-off', reqs: ['GPS Geofence (50m)'], strict: true },
  { step: 13, label: 'Unloading Goods', reqs: [], strict: false },
  { step: 14, label: 'Proof of Delivery (POD)', reqs: ['Receiver Signature', 'Photo Proof'], strict: true },
  { step: 15, label: 'Completed', reqs: [], strict: true },
];

export default function AdminShipmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentStep = 9; // "In Transit"
  const exceptionActive = false; // Mock data

  return (
    <div className="w-full max-w-7xl mx-auto pb-16">
      <button onClick={() => navigate('/admin/shipments')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Shipments
      </button>

      {/* Header Context */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{id || 'SHP-9000'}</h1>
            <span className={`badge font-bold uppercase tracking-widest text-[10px] ${exceptionActive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              ● {exceptionActive ? 'Exception Detected' : 'In Progress'}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-500 mt-2 flex items-center gap-2">
            Acme Corp Logistics <span className="text-gray-300">•</span> Sydney Central Hub → Melbourne North Hub
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn bg-white border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold shadow-sm">
            <ShieldAlert size={16}/> Super Admin Override
          </button>
          <button className="btn btn-dark flex items-center gap-2 font-bold shadow-sm">
            <FileText size={16}/> Generate Manifest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COMPONENT: 15-State Lifecycle Architecture */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="card bg-white shadow-sm p-6">
            <h2 className="text-sm font-black text-gray-900 tracking-widest uppercase border-b border-gray-100 pb-4 mb-4">Shipment Lifecycle</h2>
            
            <div className="flex flex-col gap-0 relative">
               <div className="absolute top-4 bottom-8 left-[11px] w-0.5 bg-gray-100 z-0"></div>
               {LIFECYCLE_STATES.map((state, idx) => {
                 const isCompleted = state.step < currentStep;
                 const isCurrent = state.step === currentStep;
                 const isPending = state.step > currentStep;

                 return (
                   <div key={state.step} className="flex gap-4 relative z-10 hover:bg-gray-50/50 p-2 rounded-lg -ml-2 transition-colors group">
                     {/* Node */}
                     <div className="pt-0.5 shrink-0">
                       {isCompleted ? (
                         <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-4 border-white shadow-sm">
                           <CheckCircle2 size={12} className="text-white" />
                         </div>
                       ) : isCurrent ? (
                         <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center border-4 border-white shadow-md animate-pulse">
                           <div className="w-2 h-2 rounded-full bg-black"></div>
                         </div>
                       ) : (
                         <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white">
                           <Circle size={8} className="text-gray-300 fill-gray-300" />
                         </div>
                       )}
                     </div>

                     {/* Content */}
                     <div className={`pb-6 w-full ${isPending ? 'opacity-50' : ''}`}>
                       <div className="flex justify-between items-start">
                         <p className={`text-xs font-bold uppercase tracking-widest ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>{state.label}</p>
                         {isCurrent && <span className="text-[9px] font-black uppercase text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded">Active</span>}
                       </div>
                       
                       {state.reqs.length > 0 && (
                         <div className="mt-2 flex flex-wrap gap-1.5">
                           {state.reqs.map((r, i) => (
                             <span key={i} className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${isCompleted ? 'bg-green-50 text-green-700 border-green-200' : isCurrent ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                               {r}
                             </span>
                           ))}
                         </div>
                       )}
                       
                       {/* Admin Override Action Reveal */}
                       <div className="hidden group-hover:flex mt-2 justify-end">
                          <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Force Bypass</button>
                       </div>
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENTS: Maps, Details, Actors */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Tracking */}
          <div className="card bg-[#0f172a] p-0 overflow-hidden relative shadow-lg min-h-[300px] flex items-center justify-center border border-gray-800">
             <div className="absolute inset-0 bg-[#0f172a]" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
             <p className="z-10 text-slate-500 font-bold tracking-widest uppercase text-sm flex items-center gap-2"><MapPin/> Map Vector Integration Zone</p>
             <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl z-10 text-white shadow-xl">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] mb-1">Driver Location</p>
               <p className="text-sm font-bold truncate max-w-[200px]">Hume Highway, Goulburn NSW</p>
               <p className="text-xs text-slate-300 mt-1">Updated 2m ago</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Operational Actors */}
            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Assigned Logistics Node</h3>
              
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Truck size={20}/></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Fleet Vehicle</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">XQG-984 (Volvo FH16)</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 cursor-pointer hover:border-yellow-300 transition-all" onClick={() => navigate('/admin/drivers/DRV-102')}>
                <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center text-black font-black text-lg shrink-0">JT</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Operator</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">Jack Taylor (DRV-102)</p>
                </div>
              </div>
            </div>

            {/* Shipment Metadata */}
            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Cargo Declaration</h3>
               <div className="space-y-4">
                 <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-xs font-bold text-gray-500">Commodity</span>
                   <span className="text-sm font-black text-gray-900">Electronics</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-xs font-bold text-gray-500">Weight & Vol</span>
                   <span className="text-sm font-black text-gray-900">18.42t / 41 CBM</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-xs font-bold text-gray-500">Requirements</span>
                   <span className="text-[10px] font-black text-white bg-blue-600 px-2 py-0.5 rounded uppercase tracking-widest">Fragile</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-xs font-bold text-gray-500">Revenue</span>
                   <span className="text-sm font-black text-green-600">$1,420.00</span>
                 </div>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
