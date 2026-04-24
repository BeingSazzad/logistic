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
    <div className="w-full max-w-[1600px] mx-auto pb-16">
      <button onClick={() => navigate('/dispatch/loads')}
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Loads
      </button>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-6 py-4 rounded-hero-md shadow-2xl flex items-center gap-4 border border-gray-800 animate-in slide-in-from-right">
          <div className="w-10 h-10 rounded-hero-sm bg-emerald-500 flex items-center justify-center shrink-0 shadow-inner text-white">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">Resource Allocated</p>
            <p className="text-xs font-medium text-gray-400 mt-1">{selectedDriver?.name} assigned to mission</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="ml-4 text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="hero-h1">{id || 'SHP-9055'}</h1>
            <span className={`px-2 py-0.5 rounded-sm font-semibold uppercase tracking-widest text-xs shadow-sm border ${exceptionActive ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
              ● {assigned ? 'Assigned' : 'In Progress'}
            </span>
            <span className={`px-2 py-0.5 rounded-sm font-semibold uppercase tracking-widest text-xs shadow-sm border ${deliveryMode === 'Depot' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
              {deliveryMode === 'Depot' ? '🏢 Depot-to-Depot' : '🚪 Door-to-Door'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowPodModal(true)}
            className="btn-sm flex-1 lg:flex-none bg-emerald-500 hover:bg-emerald-600 text-white uppercase tracking-widest shadow-sm transition-all"
          >
            <PackageCheck size={16} /> Collect POD
          </button>
          <button
            onClick={() => window.open(`/customer/tracking?id=${id || 'SHP-9055'}`, '_blank')}
            className="btn-sm flex-1 lg:flex-none bg-brand hover:brightness-105 text-black uppercase tracking-widest shadow-sm transition-all"
          >
            <Share2 size={16} /> Live Tracking
          </button>
          <button
            onClick={() => window.print()}
            className="btn-sm flex-1 lg:flex-none bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 uppercase tracking-widest shadow-sm transition-all"
          >
            <FileText size={16} /> Manifest
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COMPONENT: Dynamic Network Journey */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="card shadow-sm p-6 border border-gray-100 rounded-hero-md bg-white">
            <h2 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-4 mb-6">Transport Network Flow</h2>

            <div className="space-y-0 relative">
              <div className="absolute top-4 bottom-8 left-[11px] w-0.5 bg-gray-100"></div>
              {NETWORK_STAGES.map((stage, idx) => {
                const isCompleted = stage.id < activeStage;
                const isCurrent = stage.id === activeStage;

                return (
                  <div key={stage.id} className={`flex gap-4 relative z-10 p-3 rounded-hero-sm transition-all ${isCurrent ? 'bg-brand/10 border border-brand/20 shadow-sm' : ''}`}>
                    <div className="pt-0.5 shrink-0">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-white shadow-sm">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center border-4 border-white shadow-md animate-pulse">
                          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        </div>
                      )}
                    </div>
                    <div className={`w-full ${!isCurrent && !isCompleted ? 'opacity-40' : ''}`}>
                      <p className={`text-xs font-medium uppercase tracking-wide ${isCurrent ? 'text-brand' : 'text-gray-400'}`}>{stage.type}</p>
                      <p className={`text-sm font-semibold mt-0.5 ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>{stage.label}</p>
                      <div className="flex justify-between items-end mt-1.5">
                        <p className="text-xs font-medium text-gray-500 leading-relaxed">
                          {stage.location} <span className="text-gray-300 mx-1">/</span> {stage.actor}
                        </p>
                        {!isCompleted && isCurrent && (
                          <button onClick={() => setShowAssignModal(true)} className="btn-sm h-8 px-3 text-xs bg-gray-900 text-brand hover:bg-black rounded-sm shadow-sm uppercase tracking-widest">Assign Resource</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Handover Control Block */}
          <div className="card bg-gray-900 text-white p-6 shadow-lg border border-gray-800 rounded-hero-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-brand">
              <Truck size={60} />
            </div>
            <h2 className="text-xs font-semibold text-brand uppercase tracking-wide mb-6 flex items-center gap-2">
              <ShieldAlert size={14} /> Terminal Operations
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="p-4 bg-white/5 rounded-hero-sm border border-white/10 shadow-inner">
                <p className="hero-metadata mb-3">Current Asset Allocation</p>
                {assigned ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-hero-sm bg-brand text-black flex items-center justify-center font-semibold text-lg shadow-sm border border-brand">{selectedDriver.initials}</div>
                    <div>
                      <p className="text-sm font-semibold">{selectedDriver.name}</p>
                      <p className="text-xs font-medium text-gray-400 mt-1">{selectedDriver.vehicle} · {selectedDriver.rank}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 opacity-50 italic">
                    <p className="text-xs font-medium text-gray-400">Waiting for resource assignment...</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="btn w-full bg-brand hover:brightness-105 text-black rounded-hero-sm uppercase tracking-[0.2em] shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {assigned ? 'Reassign Resource' : 'Allocate Driver & Vehicle'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENTS: Maps, Details, Actors */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Consignor and Consignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-white p-6 shadow-sm border border-gray-100 rounded-hero-md flex flex-col gap-3">
              <h3 className="hero-metadata mb-1">Consignor (Sender)</h3>
              <div>
                <p className="text-sm font-semibold text-gray-900">Acme Corp Logistics</p>
                <p className="text-xs font-medium text-gray-500 mt-1.5">Warehouse 4, 12 Botany Rd, Alexandria NSW 2015</p>
                <p className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-100 leading-relaxed">Contact: James Hargrove <br /><span className="text-gray-900">+61 2 9283 1122</span></p>
              </div>
            </div>
            <div className="card bg-white p-6 shadow-sm border border-gray-100 rounded-hero-md flex flex-col gap-3">
              <h3 className="hero-metadata mb-1">Consignee (Receiver)</h3>
              <div>
                <p className="text-sm font-semibold text-gray-900">Tech Solutions Ltd</p>
                <p className="text-xs font-medium text-gray-500 mt-1.5">1 Innovation Dr, Port Botany NSW 2036</p>
                <p className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-100 leading-relaxed">Contact: Tom Carey <br /><span className="text-gray-900">+61 2 9666 0011</span></p>
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="card bg-[#0f172a] p-0 overflow-hidden relative shadow-md rounded-hero-md min-h-[300px] flex items-center justify-center border border-gray-800">
            <div className="absolute inset-0 bg-[#0f172a]" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <p className="z-10 text-slate-500 font-medium text-xs flex items-center gap-2"><MapPin size={16} /> Map Vector Integration Zone</p>
            {assigned && (
              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-hero-sm z-10 text-white shadow-xl">
                <p className="hero-metadata text-brand mb-2">Driver Location</p>
                <p className="text-sm font-semibold truncate max-w-[200px]">M1 Motorway, Sydney North</p>
                <p className="text-xs font-medium text-slate-300 mt-1.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Signal strength high</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-white p-6 shadow-sm border border-gray-100 rounded-hero-md flex flex-col gap-5">
              <h3 className="hero-metadata">Load Metadata</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="hero-metadata">Commodity</span>
                  <span className="text-sm font-semibold text-gray-900">Electronics</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="hero-metadata">Weight & Vol</span>
                  <span className="text-sm font-semibold text-gray-900">18.42t / 41 CBM</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="hero-metadata">Target ETA</span>
                  <span className="text-sm font-semibold text-gray-900">Today, 17:30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="hero-metadata">Service</span>
                  <span className="text-xs font-semibold text-black bg-brand px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-sm">Normal</span>
                </div>
              </div>
            </div>

            <div className="card bg-white p-6 shadow-sm border border-gray-100 rounded-hero-md flex flex-col gap-6 text-center justify-center">
              <p className="hero-metadata">Document Control</p>
              <div className="flex flex-col gap-3">
                <button className="btn-sm w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-hero-sm uppercase tracking-widest transition-all shadow-sm">Download Waybill</button>
                <button className="btn-sm w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-hero-sm uppercase tracking-widest transition-all shadow-sm">Consignee POD</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Selection Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setShowAssignModal(false)}>
          <div className="bg-white w-full max-w-lg rounded-hero-md shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900 text-white">
              <h3 className="text-lg font-bold text-white tracking-tight">Assign Resource</h3>
              <button onClick={() => setShowAssignModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/50">
              {AVAILABLE_DRIVERS.map(driver => (
                <div key={driver.id} className={`bg-white border p-4 rounded-hero-sm flex items-center justify-between transition-all cursor-pointer ${selectedDriver?.id === driver.id ? 'border-brand shadow-md ring-2 ring-brand' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedDriver(driver)}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-hero-sm bg-gray-900 text-brand flex items-center justify-center font-semibold text-lg">{driver.initials}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
                      <p className="text-xs font-medium text-gray-500 mt-1">{driver.vehicle} · {driver.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium ${driver.status === 'On Duty' ? 'text-emerald-500' : 'text-amber-500'}`}>{driver.availability}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button onClick={() => setShowAssignModal(false)} className="btn-sm bg-gray-50 border border-gray-200 text-gray-600 uppercase tracking-widest rounded-hero-sm hover:bg-gray-100 transition-all shadow-sm">Cancel</button>
              <button
                disabled={!selectedDriver}
                onClick={handleAssign}
                className="btn-sm px-8 bg-brand hover:brightness-105 text-black uppercase tracking-widest rounded-hero-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                Confirm & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POD Modal Clone */}
      {showPodModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setShowPodModal(false)}>
           <div className="bg-white rounded-hero-md shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-hero-sm bg-brand flex items-center justify-center text-black shadow-inner">
                       <PackageCheck size={24}/>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white tracking-tight">Handover Authorized</h2>
                    </div>
                 </div>
                 <button onClick={() => setShowPodModal(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-white/10 rounded-hero-sm transition-colors">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-12 text-center bg-gray-50/50">
                 <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-100 animate-pulse shadow-sm">
                    <FileSignature size={40} />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 tracking-tight">Verification Pending</h4>
                 <div className="mt-10 pt-8 border-t border-gray-200 flex justify-center gap-4">
                    <button onClick={() => setShowPodModal(false)} className="btn bg-white border border-gray-200 rounded-hero-sm uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">Cancel</button>
                    <button className="btn px-8 bg-brand hover:brightness-105 text-black rounded-hero-sm uppercase tracking-widest shadow-md transition-all active:scale-95" onClick={() => { setPodStatus('done'); setShowPodModal(false); }}>Unlock Handover</button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

