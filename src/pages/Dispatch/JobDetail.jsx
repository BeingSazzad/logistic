import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, CheckCircle2, Circle, AlertTriangle, 
  Printer, Share2, ClipboardList, Truck, Box, 
  User, Clock, FileCheck, Route, FileText, UserCheck,
  Star, ChevronRight, X, Send, PackageCheck,
  UploadCloud, FileSignature, ArrowRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// Mock job database — keyed by ID
const JOB_DB = {
  'SHP-9055': {
    id: 'SHP-9055', branchId: 'SYD-CENTRAL', status: 'Unassigned', priority: 'High',
    customer: 'Acme Freight Co',
    consignor: { name: 'Acme Freight Co', address: 'Warehouse 4, 12 Botany Rd, Alexandria NSW 2015', contact: "Liam O'Neil (+61 2 9283 1122)", type: 'Pickup' },
    consignee: { name: 'Canberra Distribution Centre', address: 'Bay 5, 22 Industrial Ave, Fyshwick ACT 2609', contact: 'Sarah Miller (+61 2 6123 4567)', type: 'Delivery' },
    cargo: { description: 'Temperature-controlled medical supplies', packaging: '4 x Pallets', weight: '6,200 KG', value: '$38,000.00', fragile: true, hazardous: false },
    fleet: null,
    pickup: '11:00 AM', window: '12:00 – 14:00', load: '6.2t', notes: 'Temperature-controlled cargo'
  },
  'SHP-9054': {
    id: 'SHP-9054', branchId: 'SYD-CENTRAL', status: 'Unassigned', priority: 'Medium',
    customer: 'Tech Solutions Ltd',
    consignor: { name: 'Tech Solutions Warehouse', address: '1 Innovation Dr, Port Botany NSW 2036', contact: 'Tom Carey (+61 2 9666 0011)', type: 'Pickup' },
    consignee: { name: 'Penrith Hub Depot', address: 'Lot 4, 88 Mulgoa Rd, Penrith NSW 2750', contact: 'Jay Park (+61 2 4700 3344)', type: 'Delivery' },
    cargo: { description: 'Server hardware and networking equipment', packaging: '2 x Crates', weight: '2,100 KG', value: '$15,200.00', fragile: true, hazardous: false },
    fleet: null,
    pickup: '12:30 PM', window: '13:00 – 15:00', load: '2.1t', notes: ''
  },
  'SHP-9053': {
    id: 'SHP-9053', branchId: 'SYD-CENTRAL', status: 'Unassigned', priority: 'High',
    customer: 'Fresh Markets AU',
    consignor: { name: 'Flemington Wholesale Market', address: '250 Parramatta Rd, Flemington NSW 2140', contact: 'Ben Chu (+61 2 9764 1230)', type: 'Pickup' },
    consignee: { name: 'Randwick Distribution Centre', address: '88 Wentworth Ave, Randwick NSW 2031', contact: 'Mia Davis (+61 2 9399 4422)', type: 'Delivery' },
    cargo: { description: 'Fresh produce — perishables', packaging: '8 x Caged Pallets', weight: '4,800 KG', value: '$9,400.00', fragile: false, hazardous: false },
    fleet: null,
    pickup: '09:00 AM', window: '10:00 – 11:30', load: '4.8t', notes: 'Perishables — strict delivery window'
  },
  'SHP-9042': {
    pickup: '06:00 AM', window: 'Deliver by 16:00', load: '18.4t', notes: '',
    legs: [
      { id: 1, type: 'Pickup', from: 'Consignor', to: 'Sydney Hub', driver: 'Jack Taylor', status: 'Completed', icon: PackageCheck },
      { id: 2, type: 'Line-haul', from: 'Sydney Hub', to: 'Melbourne Hub', driver: null, status: 'Unassigned', icon: Truck },
      { id: 3, type: 'Last Mile', from: 'Melbourne Hub', to: 'Consignee', driver: null, status: 'Pending', icon: MapPin },
    ]
  },
};

// Available branch drivers for assignment
const AVAILABLE_DRIVERS = [
  { id: 'DRV-134', name: 'Oliver Brown', initials: 'OB', rank: 'Junior', status: 'In Break', rating: 4.0, vehicle: 'VAN-14', availability: 'Available 13:00' },
  { id: 'DRV-145', name: 'Lucas Jones',  initials: 'LJ', rank: 'Senior', status: 'Off Duty', rating: 4.9, vehicle: 'TRK-05', availability: 'Available Now' },
  { id: 'DRV-105', name: 'Liam Smith',   initials: 'LS', rank: 'Regular', status: 'On Duty', rating: 4.5, vehicle: 'BGT-221', availability: 'Finishing at 11:30' },
];

export default function DispatchJobDetail() {
  const navigate = useNavigate();
  const { useAuth: _useAuth, ...rest } = {};
  const { id } = useParams();
  const user = useAuthStore(state => state.user);

  const job = JOB_DB[id] || JOB_DB['SHP-9042'];
  const isUnassigned = !job.fleet;

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [assigned, setAssigned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [smsNote, setSmsNote] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [showPodModal, setShowPodModal] = useState(false);
  const [podStatus, setPodStatus] = useState('pending'); // pending, submitting, done

  const handleAssign = () => {
    if (!selectedDriver) return;
    setAssigned(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const statusStyle = assigned || !isUnassigned
    ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]'
    : 'bg-amber-50 text-amber-600 border-amber-200';
  const statusLabel = assigned ? 'Assigned' : (isUnassigned ? 'Unassigned' : job.status);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-[#111] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 animate-in slide-in-from-right">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="font-black text-sm">Driver Assigned Successfully</p>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-widest mt-0.5">SMS sent to {selectedDriver?.name} and customer</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="ml-4 text-gray-500 hover:text-white">
            <X size={18} />
          </button>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dispatch/shipments')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{job.id}</h1>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-widest`} style={{ background: assigned || !isUnassigned ? '#F0FDF4' : '#FFFBEB', color: assigned || !isUnassigned ? '#16A34A' : '#D97706', borderColor: assigned || !isUnassigned ? '#DCFCE7' : '#FDE68A' }}>
                {statusLabel}
              </span>
              {job.priority === 'High' && (
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-50 text-red-600 border border-red-100 uppercase tracking-widest animate-pulse">
                  Priority
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-medium">{job.customer} · {job.pickup} pickup window</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPodModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400 flex items-center gap-2"
          >
            <PackageCheck size={16}/> Counter Handover 
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2">
            <Printer size={16}/> Print
          </button>
          <button 
            onClick={() => navigate(`/dispatch/shipments/edit/${job.id}`)}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2"
          >
             Edit
          </button>
          {!isUnassigned || assigned ? (
            <button 
              onClick={() => window.open(`/customer/tracking?id=${job.id}`, '_blank')}
              className="btn bg-brand hover:bg-brand-hover text-hero-dark font-black flex items-center gap-2 shadow-lg shadow-brand/20 transition-all active:scale-95"
            >
              <Share2 size={16} strokeWidth={3}/> Live Tracking
            </button>
          ) : (
            <button 
              onClick={() => { if(window.confirm('Are you sure you want to cancel this shipment? This cannot be undone.')) navigate('/dispatch/shipments') }}
              className="bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              Cancel 
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">

        {/* ── LEFT: Route & Cargo ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── NEW: NETWORK JOURNEY & LEG ASSIGNMENTS ── */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Route className="text-hero-primary" size={16} />
                <h2 className="text-sm font-bold text-hero-dark uppercase tracking-wide">Network Journey & Assignments</h2>
              </div>
              <span className="badge bg-indigo-50 text-indigo-700 border-indigo-200">Multi-Leg Enabled</span>
            </div>
            
            <div className="p-6">
               <div className="space-y-6 relative">
                  <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-100"></div>
                  
                  {job.legs?.map((leg, idx) => (
                    <div key={leg.id} className="flex gap-4 relative group">
                       <div className={`w-10 h-10 rounded-hero-sm flex items-center justify-center shrink-0 z-10 border-[3px] border-white shadow-sm transition-all ${
                          leg.status === 'Completed' ? 'bg-hero-success text-white' : 
                          leg.status === 'Unassigned' ? 'bg-hero-warning text-black animate-pulse' : 
                          'bg-gray-100 text-gray-500'
                       }`}>
                          <leg.icon size={16} />
                       </div>
                       
                       <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start">
                             <div>
                                <p className="hero-metadata">{leg.type} Leg</p>
                                <h4 className="text-sm font-bold text-hero-dark mt-1">{leg.from} <ArrowRight size={12} className="inline mx-1 text-gray-400"/> {leg.to}</h4>
                             </div>
                             <div className="text-right">
                                <span className={`badge ${
                                   leg.status === 'Completed' ? 'bg-hero-success/10 text-hero-success border-hero-success/20' : 
                                   leg.status === 'Unassigned' ? 'bg-hero-warning/10 text-hero-warning border-hero-warning/20' : 
                                   'bg-gray-100 text-gray-500 border-gray-200'
                                }`}>{leg.status}</span>
                             </div>
                          </div>

                          <div className="mt-3 p-3 rounded-hero-sm border bg-gray-50 border-gray-100 flex items-center justify-between">
                             {leg.driver ? (
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-hero-sm bg-hero-dark text-hero-primary flex items-center justify-center font-bold text-xs">{leg.driver[0]}</div>
                                   <p className="text-sm font-bold text-hero-dark">{leg.driver}</p>
                                </div>
                             ) : (
                                <p className="text-sm font-medium text-gray-400 italic">No resource allocated</p>
                             )}
                             
                             <button 
                               onClick={() => setSelectedDriver({ legId: leg.id })}
                               className="text-xs font-bold text-hero-primary hover:underline transition-colors"
                             >
                                {leg.driver ? 'Change Driver' : 'Assign Driver'}
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Fleet Status / Document Controls ── */}
        <div className="lg:col-span-1 space-y-6">

          {/* Fleet Status Card */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl group-hover:bg-gray-700/50 transition-all"></div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2 relative z-10">
              <Truck size={16}/> Operational Chain
            </h3>
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Assigned Driver</label>
                {(assigned || !isUnassigned) ? (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-9 h-9 rounded shrink-0 bg-[#FFCC00] flex items-center justify-center text-black text-[10px] font-black shadow">
                        {assigned ? selectedDriver?.initials : (job.fleet?.driverInitials || 'JT')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{assigned ? selectedDriver?.name : job.fleet?.driver}</p>
                        <button
                          onClick={() => navigate(`/dispatch/drivers/${assigned ? selectedDriver?.id : 'DRV-102'}`)}
                          className="text-[10px] text-[#FFCC00] uppercase tracking-widest font-black hover:underline"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest">No Driver Assigned</p>
                    <p className="text-gray-500 text-[9px] mt-0.5">Use the panel below to assign</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Equipment Asset</label>
                {(assigned || !isUnassigned) ? (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-9 h-9 rounded shrink-0 bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                      <Truck size={14}/>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{assigned ? selectedDriver?.vehicle : job.fleet?.vehicle}</p>
                      <button
                        onClick={() => navigate(`/dispatch/vehicles/${assigned ? selectedDriver?.vehicle : 'TRK-102'}`)}
                        className="text-[10px] text-[#FFCC00] uppercase tracking-widest font-black hover:underline"
                      >
                        View Asset →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Pending Assignment</p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-2 border-t border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pickup Window</span>
                  <span className="text-xs font-black text-black bg-[#FFCC00] px-2 py-1 rounded shadow-sm">{job.pickup}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Window</span>
                  <span className="text-[9px] font-black text-white bg-blue-600 px-2 py-1 rounded uppercase tracking-widest">{job.window}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Responsibility</span>
                  <span className="text-[10px] font-black text-black bg-[#FFCC00] px-2 py-0.5 rounded uppercase tracking-widest">Sender Pays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Controls */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#FAFAFA] text-center">
              <h2 className="text-xs font-black text-[#111] uppercase tracking-widest flex items-center justify-center gap-2">
                <FileText size={14} className="text-gray-400"/> Document Control
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <button onClick={() => setActiveModal('packing')} className="w-full py-3 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <ClipboardList size={14}/> Packing List
              </button>
              <button onClick={() => setActiveModal('checklist')} className="w-full py-3 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <FileCheck size={14}/> Driver Checklist
              </button>
              <button onClick={() => setActiveModal('exception')} className="w-full py-3 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 mt-2">
                <AlertTriangle size={14}/> Report Issue
              </button>
            </div>
          </div>

          {/* Audit Trail Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
             <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <ClipboardList size={12}/> Systematic Audit Trail
             </div>
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-1.5 h-full bg-emerald-500 rounded-full"></div>
                   <div>
                      <p className="text-xs font-bold text-gray-900 leading-none">Shipment Booked</p>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">By: {user?.name || 'Jackson Storm'} · 09:30 AM</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-1.5 h-full bg-gray-200 rounded-full"></div>
                   <div>
                      <p className="text-xs font-bold text-gray-400 leading-none">Awaiting Dispatch</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">System generated pending status</p>
                   </div>
                </div>
             </div>
             <div className="pt-4 border-t border-gray-50 text-center">
                <p className="text-[9px] font-medium text-gray-400 italic">"Full visibility on data entry accountability"</p>
             </div>
          </div>

          {/* ─────── Driver Field Evidence Block ─────── */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide flex items-center gap-2">
                <FileCheck size={14} className="text-[#FFCC00]" /> Driver POD Evidence
              </h3>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span> 3 Queued
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
                <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Queued — Awaiting Sync</span>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col gap-2">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Odometer Reading</p>
                <p className="text-sm font-bold text-gray-900">142,541 KM — After Fuel Stop (Goulburn BP)</p>
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Fuel Expense · Pending Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {activeModal === 'packing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setActiveModal(null)}>
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Packing List</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{job.id}</p>
               </div>
               <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
               <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex gap-4 items-center">
                       <span className="text-sm font-bold text-gray-900">1x Pallet 1 (Temperature Controlled)</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">1,500 KG</span>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex gap-4 items-center">
                       <span className="text-sm font-bold text-gray-900">1x Pallet 2 (Temperature Controlled)</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">1,500 KG</span>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex gap-4 items-center">
                       <span className="text-sm font-bold text-gray-900">1x Crate 1 (Fragile)</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">300 KG</span>
                  </div>
               </div>
            </div>
            <div className="p-6 border-t border-gray-100 shrink-0 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
               <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900">Close</button>
               <button className="px-5 py-2.5 bg-[#FFCC00] hover:bg-[#E6B800] text-black font-bold rounded-lg shadow-sm flex items-center gap-2"><Printer size={16}/> Print List</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'checklist' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setActiveModal(null)}>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Driver Pre-Departure Checklist</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Submitted by {job.fleet ? job.fleet.driver : 'Driver'}</p>
               </div>
               <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
            </div>
            
            {!assigned && isUnassigned ? (
               <div className="p-12 text-center flex-1">
                 <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <FileCheck size={24} />
                 </div>
                 <h4 className="text-sm font-bold text-gray-900 mb-1">No Driver Assigned</h4>
                 <p className="text-xs text-gray-500 font-medium">Assign a driver to generate their safety checklist.</p>
               </div>
            ) : (
              <div className="p-6 overflow-y-auto flex-1">
                 <div className="bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
                    <Clock size={16} className="shrink-0 mt-0.5 text-blue-500" />
                    <p>This is a live read-only feed of the driver's mobile workflow. Once they sign off, the vehicle is cleared for transit.</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { item: "Confirm vehicle meets temperature requirements", done: true },
                      { item: "Load safely secured with straps/chains", done: true },
                      { item: "Tire pressure and oil levels checked", done: false },
                      { item: "Customer documents signed and loaded", done: false }
                    ].map((task, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-4 border rounded-xl transition-all ${task.done ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200 bg-gray-50'}`}>
                         <div className="flex items-center gap-4">
                           {task.done ? (
                             <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                           ) : (
                             <Circle size={20} className="text-gray-300 shrink-0" />
                           )}
                           <span className={`text-sm font-bold ${task.done ? 'text-gray-900' : 'text-gray-500'}`}>{task.item}</span>
                         </div>
                         <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${task.done ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                           {task.done ? 'Passed' : 'Pending'}
                         </span>
                      </div>
                    ))}
                 </div>
              </div>
            )}
            
            <div className="p-6 border-t border-gray-100 shrink-0 flex justify-between items-center bg-gray-50 rounded-b-2xl">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Status: {isUnassigned && !assigned ? 'Awaiting Assignment' : 'In Progress (50%)'}
               </span>
               <div className="flex gap-3">
                 <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900">Close</button>
                 {(!isUnassigned || assigned) && (
                   <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-lg shadow-sm">Ping for Update</button>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'exception' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setActiveModal(null)}>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-xl font-bold text-red-600 tracking-tight flex items-center gap-2"><AlertTriangle size={20}/> Report Delivery Issue</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{job.id}</p>
               </div>
               <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
               <div>
                 <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2 px-1">Issue Category</label>
                 <select className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-red-500">
                   <option>Vehicle Delay / Breakdown</option>
                   <option>Weather Delay</option>
                   <option>Cargo Damage</option>
                   <option>Customer Rejection</option>
                 </select>
               </div>
               <div>
                 <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2 px-1">Detailed Description</label>
                 <textarea className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-red-500 resize-none h-32" placeholder="Describe the exception in detail. This will be sent immediately to dispatch and the client."></textarea>
               </div>
            </div>
            <div className="p-6 border-t border-gray-100 shrink-0 flex justify-end gap-3 bg-red-50 rounded-b-2xl">
               <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900">Cancel</button>
               <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-2"><Send size={16}/> Submit Report</button>
            </div>
          </div>
        </div>
      )}

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

      {/* Driver Assignment Panel */}
      {selectedDriver?.legId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setSelectedDriver(null)}>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Assign Fleet Resource</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Select driver & vehicle for Leg {selectedDriver.legId}</p>
               </div>
               <button onClick={() => setSelectedDriver(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/50">
               {AVAILABLE_DRIVERS.map(driver => (
                 <div key={driver.id} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:border-[#FFCC00] hover:shadow-md transition-all cursor-pointer" onClick={() => {
                     // Normally you would update the specific leg here
                     setSelectedDriver(driver); // set the actual driver selected, not just legId
                 }}>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-[#111] text-[#FFCC00] flex items-center justify-center font-black">{driver.initials}</div>
                     <div>
                       <p className="text-sm font-bold text-gray-900">{driver.name} <span className="text-gray-400 font-medium ml-1">({driver.vehicle})</span></p>
                       <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${driver.status === 'On Duty' ? 'text-emerald-500' : 'text-amber-500'}`}>{driver.availability}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold uppercase">{driver.rank}</span>
                   </div>
                 </div>
               ))}
            </div>
            <div className="p-6 border-t border-gray-100 shrink-0 flex justify-end gap-3 bg-white rounded-b-2xl">
               <button onClick={() => setSelectedDriver(null)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900">Cancel</button>
               {/* Note: The button in the modal actually needs to confirm a selected driver.
                   Since we click the driver row to select, if selectedDriver has .name, we show assign button */}
            </div>
          </div>
        </div>
      )}

      {/* Driver Assignment Confirmation (If they selected a driver from the list) */}
      {selectedDriver?.name && !showSuccess && !assigned && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-[#111] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-6 border border-white/10">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirm Assignment</p>
            <p className="text-sm font-bold">{selectedDriver.name} <span className="text-[#FFCC00]">({selectedDriver.vehicle})</span></p>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setSelectedDriver(null)} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
             <button onClick={handleAssign} className="px-6 py-2 bg-[#FFCC00] text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-yellow-400 transition-colors shadow-lg">Confirm & Dispatch</button>
          </div>
        </div>
      )}
    </div>
  );
}
