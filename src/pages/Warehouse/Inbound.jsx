import React, { useState } from 'react';
import { ArrowDownToLine, CheckCircle2, Clock, AlertCircle, Search, ChevronDown, Package, ShieldCheck, FileCheck, X, Scan } from 'lucide-react';

const inbound = [
  { id: 'HO-SYD-044', origin: 'Branch: SYD-CENTRAL', vehicle: 'TRK-05 (Noah Williams)', items: 84,  eta: '09:00', status: 'Arrived at Branch', dock: 'A2' },
  { id: 'HO-MEL-012', origin: 'Branch: MEL-HUB',     vehicle: 'TRK-12 (Jack Taylor)',   items: 24,  eta: '10:45', status: 'In Transit',          dock: 'B1' },
  { id: 'RCV-107',    origin: 'Supplier: Coles DC',  vehicle: 'EXT-99 (Third Party)',   items: 120, eta: '11:00', status: 'Pending',             dock: 'A4' },
  { id: 'HO-SYD-041', origin: 'Branch: SYD-CENTRAL', vehicle: 'TRK-09 (Oliver Brown)',  items: 56,  eta: '08:30', status: 'Received at Branch',  dock: 'A3' },
];

const statusCfg = {
  'Arrived at Branch':  { cls: 'bg-blue-50 text-blue-700 border-blue-200',         icon: AlertCircle },
  'In Transit':         { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200',   icon: Clock },
  'Pending':            { cls: 'bg-gray-50 text-gray-500 border-gray-200',         icon: Clock },
  'Received at Branch': { cls: 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]',     icon: CheckCircle2 },
  'Exception':          { cls: 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]',     icon: AlertCircle },
};

function HandoverModal({ handover, onClose, onConfirm }) {
  // Mock expected parcels for this trip
  const expectedParcels = ['SHP-9001', 'SHP-9002', 'SHP-9003', 'SHP-9004', 'SHP-9005'];
  
  const [scanned, setScanned] = useState([]);
  const [exceptions, setExceptions] = useState({}); // { 'SHP-9001': 'Missing' }
  const [scanInput, setScanInput] = useState('');
  const [scanStatus, setScanStatus] = useState({ state: 'idle', msg: '' });

  const total = expectedParcels.length;
  const accounted = scanned.length + Object.keys(exceptions).length;
  const isComplete = accounted === total;

  const handleScan = (e) => {
    if (e.key === 'Enter') {
      const id = scanInput.trim().toUpperCase();
      if (!id) return;
      
      if (!expectedParcels.includes(id)) {
         setScanStatus({ state: 'error', msg: `Parcel ${id} does not belong to this Handover List!` });
      } else if (scanned.includes(id) || exceptions[id]) {
         setScanStatus({ state: 'warning', msg: `Duplicate Scan: ${id} already verified.` });
      } else {
         setScanned([...scanned, id]);
         setScanStatus({ state: 'success', msg: `Success: ${id} verified.` });
      }
      setScanInput('');
    }
  };

  const markException = (id, type) => {
      setScanned(scanned.filter(item => item !== id));
      setExceptions({ ...exceptions, [id]: type });
  };
  const markOk = (id) => {
      const newExc = { ...exceptions };
      delete newExc[id];
      setExceptions(newExc);
      if (!scanned.includes(id)) setScanned([...scanned, id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0 bg-[#FAFAFA] rounded-t-2xl">
           <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Manual Receive Board</h3>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Branch: SYD-CENTRAL-DEPOT • {handover.id}</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
           {/* Smart Scanner Simulation */}
           <div className={`border-2 rounded-xl p-5 shadow-inner transition-colors ${scanStatus.state === 'error' ? 'bg-red-50 border-red-200' : scanStatus.state === 'warning' ? 'bg-yellow-50 border-yellow-200' : scanStatus.state === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-900 border-gray-800'}`}>
             <div className="flex justify-between items-center mb-2">
               <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block">Type Parcel ID Manually</label>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${scanStatus.state === 'error' ? 'text-red-400' : scanStatus.state === 'warning' ? 'text-yellow-400' : scanStatus.state === 'success' ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {scanStatus.msg || 'Ready for Entry...'}
               </span>
             </div>
             <div className="relative">
               <Scan className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
               <input type="text" autoFocus value={scanInput} onChange={e => setScanInput(e.target.value)} onKeyDown={handleScan} placeholder="Enter Parcel ID (e.g. SHP-9001)..." className="w-full bg-[#111] border border-gray-800 rounded-lg py-3.5 pl-11 pr-4 text-sm font-black text-[#FFCC00] focus:outline-none focus:ring-2 focus:ring-[#FFCC00] shadow-2xl transition-all" />
             </div>
           </div>

           {/* Live Counters */}
           <div className="flex gap-4">
              <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                 <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Expected</p>
                 <p className="text-2xl font-black text-gray-900">{total}</p>
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                 <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Verified OK</p>
                 <p className="text-2xl font-black text-emerald-600">{scanned.length}</p>
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                 <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Missing/Damaged</p>
                 <p className="text-2xl font-black text-red-600">{Object.keys(exceptions).length}</p>
              </div>
           </div>

           {/* Line Items */}
           <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Shipment Validation List</h4>
              <div className="space-y-3">
                 {expectedParcels.map(id => {
                   const isScanned = scanned.includes(id);
                   const exc = exceptions[id];
                   return (
                   <div key={id} className={`flex items-center justify-between border p-4 rounded-xl shadow-sm transition-colors ${isScanned ? 'border-emerald-200 bg-emerald-50/30' : exc ? 'border-red-200 bg-red-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div>
                        <p className={`font-bold text-sm ${isScanned ? 'text-emerald-700' : exc ? 'text-red-700' : 'text-gray-900'}`}>{id}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                           {isScanned ? 'Status: Verified OK' : exc ? `Status: ${exc}` : 'Awaiting Scan'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => markOk(id)} className={`px-4 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${isScanned ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-emerald-50'}`}>OK</button>
                         <button onClick={() => markException(id, 'Missing')} className={`px-4 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${exc === 'Missing' ? 'bg-red-500 text-white border-red-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-red-50'}`}>Missing</button>
                         <button onClick={() => markException(id, 'Damaged')} className={`px-4 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${exc === 'Damaged' ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-amber-50'}`}>Damaged</button>
                      </div>
                   </div>
                 )})}
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-white rounded-b-2xl shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
           <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
             {isComplete ? 'All parcels accounted for.' : `${total - accounted} parcels remaining to verify.`}
           </span>
           <div className="flex gap-3">
             <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest">Save Draft</button>
               <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck size={16}/>
                  <span className="text-[10px] font-black uppercase tracking-widest">Enforcing Chain of Custody</span>
               </div>
               <button 
                onClick={onConfirm} 
                disabled={!isComplete}
                className={`px-8 py-3 text-xs uppercase tracking-[0.15em] font-black rounded-xl shadow-xl flex items-center gap-3 transition-all ${isComplete ? 'bg-[#FFCC00] hover:bg-[#E6B800] text-black active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Confirm Receive & Close Batch
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function WarehouseInbound() {
  const [search, setSearch] = useState('');
  const [received, setReceived] = useState([]);
  const [activeHandover, setActiveHandover] = useState(null);

  const filtered = inbound.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.origin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Incoming Handovers</h1>
          <p className="text-sm text-gray-500 mt-1">Verify and formally receive inter-branch transfers into inventory.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Inbound</p><p className="text-2xl font-black text-gray-900 mt-0.5">{inbound.length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400"><Package size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Pending</p><p className="text-2xl font-black text-yellow-600 mt-0.5">{inbound.filter(r => r.status !== 'Received at Branch').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-50 text-yellow-500"><Clock size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Received</p><p className="text-2xl font-black text-emerald-600 mt-0.5">{inbound.filter(r => r.status === 'Received at Branch').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500"><CheckCircle2 size={20}/></div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all"
              placeholder="Search Handover ID or branch..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Handover ID</th>
                <th className="px-6 py-4">Origin Branch</th>
                <th className="px-6 py-4 text-center">Items</th>
                <th className="px-6 py-4">ETA / Dock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => {
                const isReceived = received.includes(r.id) || r.status === 'Received at Branch';
                const status = isReceived ? 'Received at Branch' : r.status;
                const cfg = statusCfg[status] || statusCfg['Pending'];
                return (
                  <tr key={r.id} className={`transition-all group ${isReceived ? 'bg-emerald-50/20' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-6 py-5">
                      <div className="font-mono font-bold text-[#111] text-[15px]">{r.id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-sm">{r.origin}</div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="font-black text-[#111]">{r.items}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-sm">{r.eta}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">Dock {r.dock} · {r.vehicle}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-md border inline-flex items-center gap-1.5 ${cfg.cls}`}>
                        <cfg.icon size={10} /> {status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right flex items-center justify-end h-full mt-2">
                      {!isReceived ? (
                        <button onClick={() => setActiveHandover(r)}
                          className="text-xs font-bold text-black bg-[#FFCC00] hover:bg-[#E6B800] px-4 py-2 rounded-lg transition-colors uppercase tracking-widest flex items-center gap-2 shadow-sm">
                          <FileCheck size={14} /> Review Handover
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={14}/> Verified</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {activeHandover && (
        <HandoverModal 
           handover={activeHandover} 
           onClose={() => setActiveHandover(null)}
           onConfirm={() => {
             setReceived(prev => [...prev, activeHandover.id]);
             setActiveHandover(null);
           }}
        />
      )}

    </div>
  );
}
