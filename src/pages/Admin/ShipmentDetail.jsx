import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, Circle, AlertTriangle, ShieldAlert, FileText, UploadCloud, Truck, PackageCheck, FileSignature, X } from 'lucide-react';

// Dynamic Network Stages for sequential custody transfer
const NETWORK_STAGES = [
  { id: 1, type: 'Pickup', label: 'First Mile Pickup', location: 'Customer Site (Bondi)', actor: 'Local Courier', status: 'Completed', icon: PackageCheck },
  { id: 2, type: 'Sorting', label: 'Inbound Sorting', location: 'Sydney Central Hub', actor: 'Depot Manager', status: 'Completed', icon: MapPin },
  { id: 3, type: 'Inter-Hub', label: 'Hub Transfer (Trunk)', location: 'Sydney Hub → Melbourne Hub', actor: 'Line-haul Truck', status: 'Active', icon: Truck },
  { id: 4, type: 'Sorting', label: 'Outbound Sorting', location: 'Melbourne Terminal', actor: 'Hub Supervisor', status: 'Pending', icon: Circle },
  { id: 5, type: 'Delivery', label: 'Last Mile Delivery', location: 'Melbourne CBD', actor: 'Local Courier', status: 'Pending', icon: FileSignature },
];

export default function AdminShipmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStage, setActiveStage] = useState(3);
  const [exceptionActive, setExceptionActive] = useState(false);
  const [showPodModal, setShowPodModal] = useState(false);
  const [podStatus, setPodStatus] = useState('pending');
  const [overrideSuccess, setOverrideSuccess] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState('hub'); // 'hub' | 'door'

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-16">
      <button onClick={() => navigate('/admin/shipments')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Shipments
      </button>

      {/* Header Context */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{id || 'SHP-9000'}</h1>
            <span className={`badge font-bold uppercase tracking-widest text-[10px] ${exceptionActive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              ● {exceptionActive ? 'Delivery Issue Detected' : 'In Progress'}
            </span>
            <span className={`badge font-bold uppercase tracking-widest text-[10px] ${deliveryMode === 'hub' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {deliveryMode === 'hub' ? '🏢 Hub-to-Hub' : '🚪 Door-to-Door'}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-500 mt-2 flex items-center gap-2">
            Acme Corp Logistics <span className="text-gray-300">•</span> Sydney Central Hub → Melbourne Hub
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPodModal(true)}
            className="btn bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400"
          >
            <PackageCheck size={16}/> Collect POD
          </button>
          <button 
            onClick={() => {
              setOverrideSuccess(true);
              setTimeout(() => setOverrideSuccess(false), 3000);
            }}
            className="btn bg-white border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold shadow-sm"
          >
            <ShieldAlert size={16}/> Super Admin Override
          </button>
          <button 
            onClick={() => {
              const a = document.createElement('a');
              a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Invoice for ' + (id || 'SHP-9000'));
              a.download = `Invoice_${id || 'SHP-9000'}.txt`;
              a.click();
            }}
            className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-bold shadow-sm"
          >
            <FileText size={16}/> Invoice
          </button>
        </div>
      </div>

      {overrideSuccess && (
        <div className="fixed top-24 right-8 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 animate-in slide-in-from-right-10 border border-red-700">
           <ShieldAlert size={20} />
           <div>
              <p className="text-sm font-black uppercase tracking-widest">Override Executed</p>
              <p className="text-xs font-bold text-red-100">Super admin bypass logged successfully.</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COMPONENT: Dynamic Network Journey */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="card bg-white shadow-sm p-6 border border-gray-100">
            <h2 className="text-sm font-black text-gray-900 tracking-widest uppercase border-b border-gray-100 pb-4 mb-6">Transport Network Flow</h2>
            
            <div className="space-y-0 relative">
               <div className="absolute top-4 bottom-8 left-[11px] w-0.5 bg-gray-50"></div>
               {NETWORK_STAGES.map((stage, idx) => {
                 const isCompleted = stage.id < activeStage;
                 const isCurrent = stage.id === activeStage;
                 
                 return (
                   <div key={stage.id} className={`flex gap-4 relative z-10 p-3 rounded-2xl transition-all ${isCurrent ? 'bg-yellow-50 border border-yellow-100 shadow-sm' : ''}`}>
                      <div className="pt-0.5 shrink-0">
                         {isCompleted ? (
                           <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-white shadow-sm">
                             <CheckCircle2 size={12} className="text-white" />
                           </div>
                         ) : isCurrent ? (
                           <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center border-4 border-white shadow-md animate-pulse">
                             <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                           </div>
                         ) : (
                           <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white">
                             <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                           </div>
                         )}
                      </div>
                      <div className={`w-full ${!isCurrent && !isCompleted ? 'opacity-30' : ''}`}>
                         <p className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-yellow-700' : 'text-gray-400'}`}>{stage.type}</p>
                         <p className={`text-sm font-bold mt-0.5 ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>{stage.label}</p>
                         <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed">
                            {stage.location} <span className="text-gray-300 mx-1">/</span> {stage.actor}
                         </p>
                      </div>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* Terminal Handover Control Block (The SaaS Solution) */}
          <div className="card bg-[#111] text-white p-6 shadow-xl border border-gray-800 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Truck size={60} />
             </div>
             <h2 className="text-[11px] font-black text-[#FFCC00] tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                <ShieldAlert size={14}/> Terminal Management
             </h2>
             
             <div className="space-y-6 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">Current Custodian</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">LH</div>
                      <div>
                         <p className="text-sm font-bold uppercase tracking-tight">Line-haul Fleet V-904</p>
                         <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">In-Transit to MEL</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mb-1">
                     {[{key:'hub', label:'Hub to Hub'},{key:'door', label:'Door to Door'}].map(m => (
                       <button
                         key={m.key}
                         onClick={() => setDeliveryMode(m.key)}
                         className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] transition-all ${
                           deliveryMode === m.key ? 'bg-[#FFCC00] text-black shadow' : 'text-gray-500 hover:text-gray-300'
                         }`}
                       >{m.label}</button>
                     ))}
                   </div>
                   <button 
                     onClick={() => setActiveStage(prev => Math.min(5, prev + 1))}
                     className="w-full bg-[#FFCC00] hover:bg-yellow-400 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-yellow-400/10 transition-all flex items-center justify-center gap-2"
                   >
                     Authorize Handover <ArrowLeft size={16} className="rotate-180" />
                   </button>
                   <p className="text-[9px] text-center font-bold text-gray-500 uppercase tracking-widest px-4">
                      Approving handover confirms the physical scan and receipt of cargo at the next node.
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COMPONENTS: Maps, Details, Actors */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Consignor and Consignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Consignor (Sender)</h3>
              <div>
                <p className="text-sm font-bold text-gray-900">Acme Corp Logistics</p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">Warehouse 4, 12 Botany Rd, Alexandria NSW 2015</p>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5 pt-2 border-t border-gray-50">Contact: James Hargrove <br/><span className="font-bold text-hero-dark">+61 2 9283 1122</span></p>
              </div>
            </div>
            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Consignee (Receiver)</h3>
              <div>
                <p className="text-sm font-bold text-gray-900">Tech Solutions Ltd</p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">1 Innovation Dr, Port Botany NSW 2036</p>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5 pt-2 border-t border-gray-50">Contact: Tom Carey <br/><span className="font-bold text-hero-dark">+61 2 9666 0011</span></p>
              </div>
            </div>
          </div>
          
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

        {/* Driver POD Evidence */}
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mt-6">
          <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide flex items-center gap-2">
              <PackageCheck size={14} className="text-[#FFCC00]" /> Driver POD Evidence
            </h3>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span> 3 Items Queued
            </span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Condition Note</p>
              <p className="text-sm font-bold text-gray-900">Minor scratch on back-left corner. Packaging intact.</p>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Logged by Jack Taylor · 10:42 AM</span>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-100 flex flex-col gap-2">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Damage Tag</p>
              <p className="text-sm font-bold text-gray-900">Pallet 3 — Fragile sticker damaged</p>
              <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Awaiting Sync · Admin Review Required</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col gap-2">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Odometer Reading</p>
              <p className="text-sm font-bold text-gray-900">142,541 KM — Fuel Stop (Goulburn BP)</p>
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Fuel Expense $180.50 · Pending Approval</span>
            </div>
          </div>
        </div>

      </div>

      {/* Collect POD Modal (Pro Level) */}
      {showPodModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#111]">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-[#FFCC00] flex items-center justify-center text-black">
                    <PackageCheck size={20}/>
                 </div>
                 <div>
                   <h2 className="text-lg font-black text-white tracking-tight uppercase">Handover Protocol</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Secure Proof of Delivery</p>
                 </div>
              </div>
              <button onClick={() => setShowPodModal(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {podStatus === 'done' ? (
                 <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-[#FFCC00] rounded-full flex items-center justify-center text-black mb-6 shadow-xl shadow-[#FFCC00]/20 animate-bounce">
                       <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 uppercase">Handover Authorized</h3>
                    <p className="text-sm font-bold text-gray-500 mt-2 max-w-sm">Shipment officially marked as delivered. Documents forwarded to Audit Queue.</p>
                 </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Col: Receiver Details */}
                    <div className="space-y-5">
                       <div>
                         <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Receiver Identity</h4>
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Authority Type</label>
                         <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 transition-all">
                            <option>Direct Consignee</option>
                            <option>Authorized Representative</option>
                            <option>Company Staff</option>
                         </select>
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                         <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 transition-all" />
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Govt ID / Verification PIN</label>
                         <input type="text" placeholder="e.g. NID, Passport, Booking PIN" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 transition-all" />
                       </div>
                    </div>

                    {/* Right Col: Evidence */}
                    <div className="space-y-5">
                       <div>
                         <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Documentary Evidence</h4>
                       </div>

                       <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex justify-between">
                            Signed Manifest / Paperwork <span className="text-blue-500 font-bold">Recommended</span>
                         </label>
                         <div className="w-full h-24 bg-blue-50/50 border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center text-blue-500 transition-colors cursor-pointer group">
                             <UploadCloud size={24} className="group-hover:scale-110 transition-transform mb-1.5"/>
                             <span className="text-[10px] font-bold uppercase tracking-widest">Upload Signed Document</span>
                         </div>
                       </div>

                       <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Digital E-Signature (Optional)</label>
                         <div className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl relative hover:border-gray-400 transition-colors cursor-crosshair flex items-center justify-center group overflow-hidden">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:opacity-0 transition-opacity">Draw Signature</span>
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                               <FileSignature size={32}/>
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-3">
                     <button onClick={() => setShowPodModal(false)} className="px-6 py-3 rounded-lg font-bold text-sm text-gray-600 hover:bg-gray-100 transition-all uppercase tracking-widest">
                       Cancel
                     </button>
                     <button 
                       onClick={() => {
                          setPodStatus('submitting');
                          setTimeout(() => {
                             setPodStatus('done');
                             if(typeof setCurrentStep === 'function') setCurrentStep(15);
                          }, 1000);
                       }}
                       disabled={podStatus === 'submitting'}
                       className="px-8 py-3 bg-[#111] hover:bg-black text-[#FFCC00] rounded-lg font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-black/20 disabled:opacity-50 flex justify-center items-center gap-2"
                     >
                       {podStatus === 'submitting' ? <div className="w-5 h-5 border-2 border-[#FFCC00]/30 border-t-[#FFCC00] rounded-full animate-spin"/> : 'Authorize Handover'}
                     </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
