import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, MapPin, CheckCircle2, Circle, AlertTriangle, ShieldAlert,
  FileText, UploadCloud, Truck, PackageCheck, FileSignature, X,
  ArrowRight, Share2, ClipboardList, Clock, Send
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// Dynamic Network Stages for sequential custody transfer
const NETWORK_STAGES = [
  { id: 1, type: 'Pickup', label: 'First Mile Pickup', location: 'Customer Site (Bondi)', actor: 'Local Courier', status: 'Completed', icon: PackageCheck },
  { id: 2, type: 'Sorting', label: 'Inbound Sorting', location: 'Sydney Central Depot', actor: 'Depot Manager', status: 'Completed', icon: MapPin },
  { id: 3, type: 'Inter-Depot', label: 'Depot Transfer (Trunk)', location: 'Sydney Depot → Melbourne Depot', actor: 'Line-haul Truck', status: 'Active', icon: Truck },
  { id: 4, type: 'Sorting', label: 'Outbound Sorting', location: 'Melbourne Terminal', actor: 'Depot Supervisor', status: 'Pending', icon: Circle },
  { id: 5, type: 'Delivery', label: 'Last Mile Delivery', location: 'Melbourne CBD', actor: 'Local Courier', status: 'Pending', icon: FileSignature },
];

const AVAILABLE_DRIVERS = [
  { id: 'DRV-134', name: 'Oliver Brown', initials: 'OB', rank: 'Junior', status: 'In Break', rating: 4.0, vehicle: 'VAN-14', availability: 'Available 13:00' },
  { id: 'DRV-145', name: 'Lucas Jones', initials: 'LJ', rank: 'Senior', status: 'Off Duty', rating: 4.9, vehicle: 'TRK-05', availability: 'Available Now' },
  { id: 'DRV-105', name: 'Liam Smith', initials: 'LS', rank: 'Regular', status: 'On Duty', rating: 4.5, vehicle: 'BGT-221', availability: 'Finishing at 11:30' },
];

export default function DispatchJobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuthStore(state => state.user);
  const [activeStage, setActiveStage] = useState(3);
  const [exceptionActive, setExceptionActive] = useState(false);
  const [showPodModal, setShowPodModal] = useState(false);
  const [podStatus, setPodStatus] = useState('pending');
  const [deliveryMode, setDeliveryMode] = useState('Depot'); // 'Depot' | 'door'
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAssign = () => {
    if (!selectedDriver) return;
    setAssigned(true);
    setShowAssignModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-16">
      <button onClick={() => navigate('/dispatch/loads')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Loads
      </button>

      {/* Success Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-[#111] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 animate-in slide-in-from-right">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-tight">Resource Allocated</p>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-0.5">{selectedDriver?.name} assigned to mission</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="ml-4 text-gray-500 hover:text-white">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header Context */}
      <div className="flex justify-between items-start mb-6 px-2">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{id || 'SHP-9055'}</h1>
            <span className={`badge font-bold uppercase tracking-widest text-xs ${exceptionActive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              ● {assigned ? 'Assigned' : 'In Progress'}
            </span>
            <span className={`badge font-bold uppercase tracking-widest text-xs ${deliveryMode === 'Depot' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {deliveryMode === 'Depot' ? '🏢 Depot-to-Depot' : '🚪 Door-to-Door'}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-500 mt-2 flex items-center gap-2">
            Acme Corp Logistics <span className="text-gray-300">•</span> Sydney Central Depot → Melbourne Depot
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPodModal(true)}
            className="btn bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400"
          >
            <PackageCheck size={16} /> Collect POD
          </button>
          <button
            onClick={() => window.open(`/customer/tracking?id=${id || 'SHP-9055'}`, '_blank')}
            className="btn bg-white border border-[#FFCC00] text-[#111] hover:bg-yellow-50 flex items-center gap-2 font-bold shadow-sm"
          >
            <Share2 size={16} /> Live Tracking
          </button>
          <button
            onClick={() => window.print()}
            className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-bold shadow-sm"
          >
            <FileText size={16} /> Manifest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
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
                      <p className={`text-xs font-black uppercase tracking-widest ${isCurrent ? 'text-yellow-700' : 'text-gray-400'}`}>{stage.type}</p>
                      <p className={`text-sm font-bold mt-0.5 ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>{stage.label}</p>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          {stage.location} <span className="text-gray-300 mx-1">/</span> {stage.actor}
                        </p>
                        {!isCompleted && isCurrent && (
                          <button onClick={() => setShowAssignModal(true)} className="text-xs font-black uppercase tracking-widest text-[#FFCC00] bg-black px-2 py-0.5 rounded">Assign Resource</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Handover Control Block */}
          <div className="card bg-[#111] text-white p-6 shadow-xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Truck size={60} />
            </div>
            <h2 className="text-xs font-black text-[#FFCC00] tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <ShieldAlert size={14} /> Terminal Operations
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Current Asset Allocation</p>
                {assigned ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">{selectedDriver.initials}</div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight">{selectedDriver.name}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{selectedDriver.vehicle} · {selectedDriver.rank}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 opacity-50 italic">
                    <p className="text-xs font-bold text-gray-400">Waiting for resource assignment...</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="w-full bg-[#FFCC00] hover:bg-yellow-400 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-yellow-400/10 transition-all flex items-center justify-center gap-2"
                >
                  {assigned ? 'Reassign Resource' : 'Allocate Driver & Vehicle'}
                </button>
                <p className="text-xs text-center font-bold text-gray-500 uppercase tracking-widest px-4">
                  Confirmed resources will receive automated SMS notifications.
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
                <p className="text-xs text-gray-500 font-medium mt-1">Warehouse 4, 12 Botany Rd, Alexandria NSW 2015</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5 pt-2 border-t border-gray-50">Contact: James Hargrove <br /><span className="font-bold text-hero-dark">+61 2 9283 1122</span></p>
              </div>
            </div>
            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Consignee (Receiver)</h3>
              <div>
                <p className="text-sm font-bold text-gray-900">Tech Solutions Ltd</p>
                <p className="text-xs text-gray-500 font-medium mt-1">1 Innovation Dr, Port Botany NSW 2036</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5 pt-2 border-t border-gray-50">Contact: Tom Carey <br /><span className="font-bold text-hero-dark">+61 2 9666 0011</span></p>
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="card bg-[#0f172a] p-0 overflow-hidden relative shadow-lg min-h-[300px] flex items-center justify-center border border-gray-800">
            <div className="absolute inset-0 bg-[#0f172a]" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <p className="z-10 text-slate-500 font-bold tracking-widest uppercase text-sm flex items-center gap-2"><MapPin /> Map Vector Integration Zone</p>
            {assigned && (
              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl z-10 text-white shadow-xl">
                <p className="text-xs font-black uppercase tracking-widest text-[#FACC15] mb-1">Driver Location</p>
                <p className="text-sm font-bold truncate max-w-[200px]">M1 Motorway, Sydney North</p>
                <p className="text-xs text-slate-300 mt-1">Signal strength high</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Load Metadata</h3>
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
                  <span className="text-xs font-bold text-gray-500">Target ETA</span>
                  <span className="text-sm font-black text-gray-900">Today, 17:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-500">Service</span>
                  <span className="text-xs font-black text-black bg-[#FFCC00] px-2 py-0.5 rounded uppercase tracking-widest">Normal</span>
                </div>
              </div>
            </div>

            <div className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4 text-center justify-center">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Document Control</p>
              <div className="flex flex-col gap-2">
                <button className="py-2.5 bg-gray-50 border border-gray-100 hover:bg-gray-100 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Download Waybill</button>
                <button className="py-2.5 bg-gray-50 border border-gray-100 hover:bg-gray-100 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Consignee POD</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Selection Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAssignModal(false)}>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#111] text-white">
              <h3 className="text-xl font-bold tracking-tight">Assign Resource</h3>
              <button onClick={() => setShowAssignModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/50">
              {AVAILABLE_DRIVERS.map(driver => (
                <div key={driver.id} className={`bg-white border p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer ${selectedDriver?.id === driver.id ? 'border-[#FFCC00] shadow-md ring-1 ring-[#FFCC00]' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedDriver(driver)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#111] text-[#FFCC00] flex items-center justify-center font-black">{driver.initials}</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{driver.name}</p>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-500 mt-0.5">{driver.vehicle} · {driver.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-black uppercase tracking-widest ${driver.status === 'On Duty' ? 'text-emerald-500' : 'text-amber-500'}`}>{driver.availability}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button onClick={() => setShowAssignModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 uppercase tracking-widest">Cancel</button>
              <button
                disabled={!selectedDriver}
                onClick={handleAssign}
                className="px-8 py-2.5 bg-[#FFCC00] hover:bg-yellow-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                Confirm & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POD Modal Clone */}
      {showPodModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPodModal(false)}>
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#111]">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFCC00] flex items-center justify-center text-black">
                       <PackageCheck size={20}/>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white tracking-tight uppercase">Handover Authorized</h2>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Secure Proof of Delivery</p>
                    </div>
                 </div>
                 <button onClick={() => setShowPodModal(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={18} />
                 </button>
              </div>
              <div className="p-12 text-center">
                 <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 animate-pulse">
                    <FileSignature size={32} />
                 </div>
                 <h4 className="text-lg font-black text-gray-900 uppercase">Verification Pending</h4>
                 <p className="text-sm font-bold text-gray-500 mt-2 max-w-xs mx-auto">Dispatch authorization requires physical signature scan or receiver PIN verification.</p>
                 <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center gap-4">
                    <button onClick={() => setShowPodModal(false)} className="px-6 py-3 border border-gray-200 rounded-xl text-xs font-black uppercase text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                    <button className="px-6 py-3 bg-[#FFCC00] hover:bg-yellow-400 text-black rounded-xl text-xs font-black uppercase shadow-lg transition-all" onClick={() => setPodStatus('done')}>Unlock Handover</button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

