import React, { useState } from 'react';
import { ArrowDownToLine, CheckCircle2, Clock, AlertCircle, Search, ChevronDown, Car, ShieldCheck, FileCheck, X, Scan, MapPin, Warehouse } from 'lucide-react';

const MOCK_INBOUND = [
  { id: 'TRF-044', origin: 'SYD-CENTRAL', driver: 'Noah Williams (TRK-05)', vehicles: 8, eta: '09:00', status: 'Arrived at Gate', dock: 'Gate 2' },
  { id: 'TRF-012', origin: 'MEL-HUB',     driver: 'Jack Taylor (TRK-12)',   vehicles: 4, eta: '10:45', status: 'In Transit',      dock: 'Gate 1' },
  { id: 'RCV-107', origin: 'Auction Grp', driver: 'EXT-99 (Third Party)',   vehicles: 1, eta: '11:00', status: 'Pending',         dock: 'Gate 4' },
];

const statusCfg = {
  'Arrived at Gate':  { cls: 'bg-blue-50 text-blue-700 border-blue-200',         icon: AlertCircle },
  'In Transit':       { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200',   icon: Clock },
  'Pending':          { cls: 'bg-gray-50 text-gray-500 border-gray-200',         icon: Clock },
  'Received':         { cls: 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]',     icon: CheckCircle2 },
};

const ZONES = ['North Wing', 'South Wing', 'Customs Bonded', 'Staging A', 'Heavy Duty'];
const ROWS = ['A', 'B', 'C', 'D', 'E'];
const BAYS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

function ReceiveVehicleModal({ handover, onClose, onConfirm }) {
  // Mock expected vehicles (VINs) for this trip
  const expectedVehicles = ['1HGCM82633A004352', '2T1BURHE0JC034820', '3FADP4BJ7FM123456', '5YJSA1DG9PFJ12345'].slice(0, handover.vehicles);
  
  const [scanned, setScanned] = useState([]);
  const [exceptions, setExceptions] = useState({}); // { 'VIN': 'Damaged' }
  const [assignments, setAssignments] = useState({}); // { 'VIN': { zone: '', bay: '' } }
  const [scanInput, setScanInput] = useState('');
  const [scanStatus, setScanStatus] = useState({ state: 'idle', msg: '' });

  const total = expectedVehicles.length;
  const accounted = scanned.length + Object.keys(exceptions).length;
  const isComplete = accounted === total;

  const handleScan = (e) => {
    if (e.key === 'Enter') {
      const id = scanInput.trim().toUpperCase();
      if (!id) return;
      
      if (!expectedVehicles.includes(id)) {
         setScanStatus({ state: 'error', msg: `VIN ${id} not expected on this manifest!` });
      } else if (scanned.includes(id) || exceptions[id]) {
         setScanStatus({ state: 'warning', msg: `Duplicate Scan: VIN ${id} already verified.` });
      } else {
         setScanned([...scanned, id]);
         setAssignments({ ...assignments, [id]: { zone: ZONES[0], row: ROWS[0], bay: BAYS[0] } });
         setScanStatus({ state: 'success', msg: `Success: VIN ${id} received.` });
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
      if (!scanned.includes(id)) {
          setScanned([...scanned, id]);
          if (!assignments[id]) setAssignments({ ...assignments, [id]: { zone: ZONES[0], row: ROWS[0], bay: BAYS[0] } });
      }
  };

  const updateAssignment = (id, field, value) => {
      setAssignments({
          ...assignments,
          [id]: { ...assignments[id], [field]: value }
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center shrink-0 bg-[#FAFAFA] rounded-t-[2rem]">
           <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-3"><Car className="text-[#FFCC00]" /> Receive &amp; Slot Vehicles</h3>
              <p className="hero-body text-gray-600 mt-1.5">Check-in manifest • {handover.id}</p>
           </div>
           <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 rounded-2xl text-gray-400 transition-colors"><X size={24}/></button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1 flex flex-col gap-8">
           {/* Smart Scanner Simulation */}
           <div className={`border-2 rounded-3xl p-6 shadow-inner transition-all ${scanStatus.state === 'error' ? 'bg-red-50 border-red-200' : scanStatus.state === 'warning' ? 'bg-yellow-50 border-yellow-200' : scanStatus.state === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-[#111] border-gray-800'}`}>
             <div className="flex justify-between items-center mb-3">
               <label className="text-xs font-semibold uppercase text-gray-500 tracking-[0.2em] block">VIN Optical Scan Simulation</label>
               <span className={`text-xs font-semibold uppercase tracking-widest ${scanStatus.state === 'error' ? 'text-red-400' : scanStatus.state === 'warning' ? 'text-yellow-400' : scanStatus.state === 'success' ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {scanStatus.msg || 'Awaiting Hardware Pulse...'}
               </span>
             </div>
             <div className="relative group">
               <Scan className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFCC00] transition-colors" size={20} />
               <input type="text" autoFocus value={scanInput} onChange={e => setScanInput(e.target.value)} onKeyDown={handleScan} placeholder="SCAN VIN BARCODE..." className="w-full bg-black/40 border border-white/5 rounded-2xl py-4.5 pl-14 pr-4 text-sm font-semibold text-[#FFCC00] focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 shadow-2xl transition-all uppercase tracking-[0.1em]" />
             </div>
           </div>

           {/* Live Counters */}
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20"></div>
                 <p className="hero-metadata mb-2">Total Expected</p>
                 <p className="text-2xl font-semibold text-hero-dark">{total}</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20"></div>
                 <p className="hero-metadata mb-2">Verified OK</p>
                 <p className="text-2xl font-semibold text-emerald-600">{scanned.length}</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20"></div>
                 <p className="hero-metadata mb-2">Alerts/Issues</p>
                 <p className="text-2xl font-semibold text-red-600">{Object.keys(exceptions).length}</p>
              </div>
           </div>

           {/* Line Items */}
           <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-gray-800 ml-1">Asset Verification &amp; Slotting</h4>
              <div className="space-y-4">
                 {expectedVehicles.map(id => {
                   const isScanned = scanned.includes(id);
                   const exc = exceptions[id];
                   const assign = assignments[id] || {};
                   return (
                    <div key={id} className={`flex flex-col border p-6 rounded-[2rem] shadow-sm transition-all ${isScanned ? 'border-emerald-100 bg-emerald-50/20' : exc ? 'border-red-100 bg-red-50/20' : 'border-gray-100 bg-white'}`}>
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isScanned ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                                <Car size={20} />
                             </div>
                             <div>
                               <p className={`font-mono font-semibold text-sm tracking-widest ${isScanned ? 'text-emerald-900' : exc ? 'text-red-900' : 'text-gray-900'}`}>{id}</p>
                               <p className="text-xs font-medium text-gray-500 mt-1">
                                  {isScanned ? 'Marked In-Depot' : exc ? `Status: ${exc}` : 'Awaiting Check-in'}
                               </p>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => markOk(id)} className={`px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-widest transition-all ${isScanned ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-emerald-50'}`}>OK</button>
                             <button onClick={() => markException(id, 'Missing')} className={`px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-widest transition-all ${exc === 'Missing' ? 'bg-red-500 text-white border-red-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-red-50'}`}>Missing</button>
                             <button onClick={() => markException(id, 'Damaged')} className={`px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-widest transition-all ${exc === 'Damaged' ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-amber-50'}`}>Damaged</button>
                          </div>
                       </div>

                       {isScanned && (
                         <div className="mt-2 pt-4 border-t border-emerald-100 flex items-center gap-4">
                           <div className="flex-1 flex items-center gap-3">
                              <MapPin size={16} className="text-emerald-500" />
                              <div className="flex gap-2 flex-1">
                                 <select value={assign.zone} onChange={e => updateAssignment(id, 'zone', e.target.value)} className="bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-semibold uppercase flex-1 outline-none focus:ring-2 focus:ring-emerald-400">
                                    {ZONES.map(z => <option key={z}>{z}</option>)}
                                 </select>
                                 <select value={assign.row} onChange={e => updateAssignment(id, 'row', e.target.value)} className="bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-semibold uppercase flex-1 outline-none focus:ring-2 focus:ring-emerald-400">
                                    {ROWS.map(r => <option key={r}>Row {r}</option>)}
                                 </select>
                                 <select value={assign.bay} onChange={e => updateAssignment(id, 'bay', e.target.value)} className="bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-semibold uppercase flex-1 outline-none focus:ring-2 focus:ring-emerald-400">
                                    {BAYS.map(b => <option key={b}>Bay {b}</option>)}
                                 </select>
                              </div>
                           </div>
                         </div>
                       )}
                    </div>
                  )})}
              </div>
           </div>
        </div>

        <div className="p-8 border-t border-gray-100 flex justify-between items-center bg-[#FAFAFA] rounded-b-[2rem] shrink-0">
           <span className="text-xs font-medium text-gray-500">
             {isComplete ? 'Verification Completed' : `${total - accounted} units pending`}
           </span>
           <div className="flex gap-4">
               <button 
                onClick={onConfirm} 
                disabled={!isComplete}
                className={`px-10 py-5 text-xs uppercase tracking-[0.15em] font-semibold rounded-2xl shadow-xl flex items-center gap-3 transition-all ${isComplete ? 'bg-[#FFCC00] hover:bg-black hover:text-[#FFCC00] text-black active:scale-[0.98]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
              >
                <ShieldCheck size={20} /> Commit to Inventory
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

  const filtered = MOCK_INBOUND.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.origin.toLowerCase().includes(search.toLowerCase()) ||
    r.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Inbound Check-In</h1>
          <p className="hero-body text-gray-600 mt-1">Verify and Slot Arriving Assets</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
          <div>
             <p className="hero-metadata">Inbound Transfers</p>
             <p className="text-2xl font-semibold text-hero-dark mt-1.5 leading-none">{MOCK_INBOUND.length}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-[#FFCC00] group-hover:text-black transition-all"><Warehouse size={28}/></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
          <div>
             <p className="hero-metadata">Awaiting Gate</p>
             <p className="text-2xl font-semibold text-amber-500 mt-1.5 leading-none">{MOCK_INBOUND.filter(r => r.status !== 'Received').length}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all"><Clock size={28}/></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
          <div>
             <p className="hero-metadata">Logged Today</p>
             <p className="text-2xl font-semibold text-emerald-600 mt-1.5 leading-none">{received.length}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all"><CheckCircle2 size={28}/></div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mx-2">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
          <div className="relative w-full max-w-[480px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
              placeholder="Filter Transfers by ID, Origin, or Driver..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-semibold text-gray-500 uppercase tracking-widest hover:bg-gray-50 shadow-sm">
            <ChevronDown size={16} /> Filter Results
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-xs font-medium text-gray-500 uppercase tracking-wide">Batch ID</th>
                <th className="px-6 py-5 text-xs font-medium text-gray-500 uppercase tracking-wide">Origin &amp; Operator</th>
                <th className="px-6 py-5 text-center text-xs font-medium text-gray-500 uppercase tracking-wide">Asset Count</th>
                <th className="px-6 py-5 text-xs font-medium text-gray-500 uppercase tracking-wide">Schedule</th>
                <th className="px-6 py-5 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => {
                const isReceived = received.includes(r.id) || r.status === 'Received';
                const status = isReceived ? 'Received' : r.status;
                const cfg = statusCfg[status] || statusCfg['Pending'];
                return (
                  <tr key={r.id} className={`transition-all group ${isReceived ? 'bg-emerald-50/10' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-6 py-6">
                      <div className="font-mono font-semibold text-gray-900 text-sm leading-none">{r.id}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="font-semibold text-gray-900 text-sm leading-none">{r.origin}</div>
                      <div className="text-xs font-medium text-gray-500 mt-2">{r.driver}</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="font-semibold text-gray-900 bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-lg shadow-inner group-hover:bg-[#FFCC00] transition-colors">{r.vehicles}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="font-semibold text-gray-900 text-sm leading-none">{r.eta}</div>
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mt-2 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg inline-block">{r.dock}</div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-xs font-semibold px-3 py-2 rounded-xl border uppercase tracking-widest inline-flex items-center gap-2 shadow-sm ${cfg.cls}`}>
                        <cfg.icon size={12} strokeWidth={3} /> {status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      {!isReceived ? (
                        <button onClick={() => setActiveHandover(r)}
                          className="text-xs font-semibold text-black bg-[#FFCC00] hover:bg-black hover:text-[#FFCC00] px-6 py-3 rounded-xl transition-all uppercase tracking-[0.1em] flex items-center gap-2 shadow-lg ml-auto active:scale-95">
                          <Scan size={16} /> Scan Manifest
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2 text-emerald-600">
                           <ShieldCheck size={20}/>
                           <span className="text-xs font-semibold uppercase tracking-widest">Entry Verified</span>
                        </div>
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
        <ReceiveVehicleModal 
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


