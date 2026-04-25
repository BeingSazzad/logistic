import React, { useState, useRef } from 'react';
import {
  Search, Plus, Truck, X, CheckCircle2, AlertCircle,
  Printer, Barcode, Filter, ChevronDown, Tag, Calendar,
  Hash, Car, MapPin, Loader2, Fingerprint
} from 'lucide-react';

// ── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_VEHICLES = [
  { id: 1, vin: '1HGCM82633A004352', plate: 'ABC 123', make: 'Toyota', model: 'Camry', year: '2022', color: 'White', type: 'Sedan', weight: '1,450 kg', status: 'In Depot', currentLoad: 'LD-2041', destination: 'Brisbane QLD', customer: 'AutoDeal Pty Ltd', tags: ['Priority', 'Express'] },
  { id: 2, vin: '2T1BURHE0JC034820', plate: 'XYZ 987', make: 'Honda', model: 'CR-V', year: '2023', color: 'Black', type: 'SUV', weight: '1,720 kg', status: 'In Transit', currentLoad: 'LD-2039', destination: 'Melbourne VIC', customer: 'Smith Motors', tags: ['Fragile'] },
  { id: 3, vin: '5YJSA1DG9PFJ12345', plate: 'EV 0001', make: 'Tesla', model: 'Model S', year: '2024', color: 'Red', type: 'Sedan', weight: '2,162 kg', status: 'Delivered', currentLoad: 'LD-2031', destination: 'Sydney NSW', customer: 'EV Fleet Co', tags: [] },
  { id: 4, vin: '3FADP4BJ7FM123456', plate: 'TRK 444', make: 'Ford', model: 'Ranger', year: '2021', color: 'Silver', type: 'Ute', weight: '2,030 kg', status: 'Awaiting Load', currentLoad: null, destination: 'Perth WA', customer: 'WA Motors', tags: ['Oversize'] },
  { id: 5, vin: '1N4AL3AP7JC234567', plate: 'NIS 202', make: 'Nissan', model: 'X-Trail', year: '2022', color: 'Blue', type: 'SUV', weight: '1,680 kg', status: 'In Depot', currentLoad: 'LD-2042', destination: 'Adelaide SA', customer: 'SA Auto Group', tags: [] },
];

const STATUS_META = {
  'In Depot':      { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  'In Transit':    { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500' },
  'Delivered':     { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
  'Awaiting Load': { bg: 'bg-gray-100',  text: 'text-gray-600',   dot: 'bg-gray-400' },
};

const EMPTY_FORM = {
  vin: '', plate: '', make: '', model: '', year: '', color: '',
  type: 'Sedan', weight: '', height: '', length: '', customer: '',
  destination: '', notes: '', tags: '',
};

export default function VehicleRegistry() {
  const [vehicles, setVehicles]       = useState(MOCK_VEHICLES);
  const [search, setSearch]           = useState('');
  const [showModal, setShowModal]     = useState(false);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [errors, setErrors]           = useState({});
  const [vinChecking, setVinChecking] = useState(false);
  const [vinOk, setVinOk]            = useState(null);
  const [labelVehicle, setLabelVehicle] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Assign load states
  const [assignLoadModal, setAssignLoadModal] = useState(null);
  const [loadInput, setLoadInput] = useState('');

  const vinTimer = useRef(null);

  const updateVehicleStatus = (id, newStatus) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const handleAssignLoad = () => {
    if (!loadInput.trim()) return;
    setVehicles(prev => prev.map(v => v.id === assignLoadModal.id ? { ...v, currentLoad: loadInput, status: 'In Transit' } : v));
    setAssignLoadModal(null);
    setLoadInput('');
  };

  // ── Search & Filter ──────────────────────────────────────────────
  const filtered = vehicles.filter(v => {
    const q = search.toLowerCase();
    const matchQ = !q || v.vin.toLowerCase().includes(q) || v.plate.toLowerCase().includes(q)
      || v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q)
      || v.destination.toLowerCase().includes(q) || v.customer.toLowerCase().includes(q)
      || v.tags.some(t => t.toLowerCase().includes(q));
    const matchS = statusFilter === 'All' || v.status === statusFilter;
    return matchQ && matchS;
  });

  // ── VIN Live Duplicate Check ─────────────────────────────────────
  const handleVinChange = (val) => {
    setForm(f => ({ ...f, vin: val }));
    setVinOk(null);
    clearTimeout(vinTimer.current);
    if (val.length >= 10) {
      setVinChecking(true);
      vinTimer.current = setTimeout(() => {
        const dup = vehicles.some(v => v.vin.toLowerCase() === val.toLowerCase());
        setVinOk(dup ? 'duplicate' : 'ok');
        setVinChecking(false);
      }, 600);
    }
  };

  // ── Form Validation ──────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.vin || form.vin.length < 10) e.vin = 'Valid VIN required (min 10 chars)';
    if (vinOk === 'duplicate') e.vin = 'This VIN already exists in registry';
    if (!form.plate.trim()) e.plate = 'Number plate required';
    if (!form.make.trim())  e.make  = 'Make required';
    if (!form.model.trim()) e.model = 'Model required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const newVehicle = {
      id: vehicles.length + 1,
      vin: form.vin.toUpperCase(),
      plate: form.plate.toUpperCase(),
      make: form.make, model: form.model, year: form.year,
      color: form.color, type: form.type, weight: form.weight,
      status: 'Awaiting Load', currentLoad: null,
      destination: form.destination, customer: form.customer,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
    setVehicles(prev => [newVehicle, ...prev]);
    setShowModal(false);
    setForm(EMPTY_FORM);
    setErrors({});
    setVinOk(null);
  };

  const statuses = ['All', 'Awaiting Load', 'In Depot', 'In Transit', 'Delivered'];

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1440px] mx-auto pb-12 px-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="hero-h1">Vehicle Registry</h1>
          <p className="hero-body text-gray-600 mt-1">{vehicles.length} assets registered · Global VIN Search</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setErrors({}); setVinOk(null); }}
          className="btn btn-dark"
        >
          <Plus size={18} strokeWidth={3} /> Register Vehicle
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Search + Filter Bar ── */}
      <div className="flex items-center gap-4 flex-wrap mb-2">
        <div className="relative flex-1 min-w-[300px] group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" />
          <input
            type="text"
            placeholder="Search VIN, Plate, Make, Model, Destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#FFCC00]/10 focus:border-[#FFCC00] transition-all shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${
                statusFilter === s
                  ? 'bg-white text-gray-900 shadow-md border border-gray-200'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Vehicle Table ── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FAFAFA]">
                <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Vehicle Asset</th>
                <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">VIN / Plate</th>
                <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Operational Status</th>
                <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Current Task</th>
                <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Target</th>
                <th className="py-5 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center text-gray-400">
                    <Car size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="text-sm font-semibold text-gray-500">No matching vehicles found</p>
                  </td>
                </tr>
              ) : filtered.map(v => {
                const sm = STATUS_META[v.status] || STATUS_META['Awaiting Load'];
                return (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#FFCC00] group-hover:border-transparent transition-all">
                          <Car size={24} className="text-gray-400 group-hover:text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm leading-none">{v.year} {v.make} {v.model}</p>
                          <p className="text-xs font-medium text-gray-500 mt-1.5">{v.color} · {v.type} · {v.weight}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="inline-block  py-1 bg-gray-50 border border-gray-200 rounded font-mono text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        {v.vin}
                      </div>
                      <p className="text-xs font-medium text-gray-500 ml-1">{v.plate}</p>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-widest border ${sm.bg} ${sm.text} border-transparent shadow-sm`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                        {v.status}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      {v.currentLoad
                        ? <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm">{v.currentLoad}</span>
                        : <span className="text-xs font-medium text-gray-400">Available</span>}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-gray-900 text-xs font-semibold">
                        <MapPin size={14} className="text-emerald-500 shrink-0" />
                        {v.destination}
                      </div>
                      <p className="text-xs font-medium text-gray-500 mt-1">{v.customer}</p>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select 
                          className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl  py-2 cursor-pointer outline-none hover:bg-gray-100"
                          value={v.status}
                          onChange={(e) => updateVehicleStatus(v.id, e.target.value)}
                        >
                          <option value="Awaiting Load">Awaiting Load</option>
                          <option value="In Depot">In Depot</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          onClick={() => setAssignLoadModal(v)}
                          className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-blue-100 shadow-sm active:scale-95 flex items-center gap-2"
                          title="Assign Load"
                        >
                          <Truck size={16} /> <span className="text-xs font-semibold uppercase tracking-widest hidden xl:inline">Assign</span>
                        </button>
                        <button
                          onClick={() => setLabelVehicle(v)}
                          className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#111] text-gray-400 hover:text-[#FFCC00] transition-all border border-gray-200 shadow-sm active:scale-95"
                          title="Print Shipping Label"
                        >
                          <Barcode size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Register Vehicle Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl flex items-center justify-between p-8 border-b border-gray-100 z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Register Asset</h2>
                <p className="hero-body text-gray-600 mt-1">Permanent entry for multi-load assignment</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors">
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-8">
              {/* VIN */}
              <section>
                <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">
                  17-Digit VIN Identifier <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Fingerprint size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FFCC00] transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter VIN..."
                    value={form.vin}
                    onChange={e => handleVinChange(e.target.value)}
                    className={`w-full bg-gray-50 border-2 rounded-2xl py-4 pl-12 pr-12 text-sm font-mono font-semibold uppercase tracking-widest focus:outline-none focus:bg-white transition-all ${errors.vin ? 'border-red-400' : 'border-gray-100 focus:border-[#FFCC00]'}`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {vinChecking && <Loader2 size={20} className="text-[#FFCC00] animate-spin" />}
                    {!vinChecking && vinOk === 'ok'        && <CheckCircle2 size={20} className="text-emerald-500" />}
                    {!vinChecking && vinOk === 'duplicate' && <AlertCircle  size={20} className="text-red-500" />}
                  </div>
                </div>
                {errors.vin && <p className="text-xs font-semibold text-red-500 mt-2 ml-1 uppercase">{errors.vin}</p>}
                {!errors.vin && vinOk === 'ok' && <p className="text-xs font-semibold text-emerald-600 mt-2 ml-1 uppercase tracking-widest">VIN Verified ✓</p>}
              </section>

              <div className="grid grid-cols-2 gap-6">
                {/* Plate */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Rego / Plate</label>
                  <div className="relative group">
                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500" />
                    <input
                      type="text"
                      placeholder="ABC-123"
                      value={form.plate}
                      onChange={e => setForm(f => ({ ...f, plate: e.target.value }))}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Body Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold uppercase tracking-widest appearance-none focus:outline-none focus:bg-white focus:border-violet-400 transition-all">
                    {['Sedan', 'SUV', 'Ute', 'Van', 'Truck', 'Motorcycle', 'Other'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                {/* Make */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Manufacturer</label>
                  <input type="text" placeholder="e.g. Toyota" value={form.make}
                    onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-[#111] transition-all" />
                </div>

                {/* Model */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Model Name</label>
                  <input type="text" placeholder="e.g. Camry" value={form.model}
                    onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-[#111] transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                 <div>
                   <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Year</label>
                   <input type="text" placeholder="2024" value={form.year}
                     onChange={e => setForm(f => ({ ...f, year: e.target.value }))} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:bg-white transition-all" />
                 </div>
                 <div>
                   <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Color</label>
                   <input type="text" placeholder="White" value={form.color}
                     onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:bg-white transition-all" />
                 </div>
                 <div>
                   <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Weight</label>
                   <input type="text" placeholder="1500kg" value={form.weight}
                     onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:bg-white transition-all" />
                 </div>
              </div>

              <div className="border-t border-gray-100 pt-8 grid grid-cols-2 gap-6">
                <div className="col-span-2">
                   <h4 className="text-xs font-semibold text-gray-800 mb-4">Ownership &amp; Routing</h4>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Customer / Owner</label>
                  <input type="text" placeholder="Client name or ID" value={form.customer}
                    onChange={e => setForm(f => ({ ...f, customer: e.target.value }))} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-3 ml-1">Final Destination</label>
                  <input type="text" placeholder="e.g. Brisbane QLD" value={form.destination}
                    onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:bg-white transition-all" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-4">
                <button onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl hero-metadata hover:text-gray-900 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="px-10 py-5 rounded-[1.5rem] bg-[#FFCC00] text-black text-sm font-semibold uppercase tracking-[0.1em] shadow-xl hover:shadow-yellow-200 active:scale-[0.98] transition-all">
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Assign Load Modal ── */}
      {assignLoadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[480px] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Assign Load</h2>
                <p className="hero-body text-gray-600 mt-1">Vehicle: {assignLoadModal.vin}</p>
              </div>
              <button onClick={() => setAssignLoadModal(null)} className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Load ID / Manifest Number</label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                  <input
                    type="text"
                    value={loadInput}
                    onChange={e => setLoadInput(e.target.value)}
                    placeholder="e.g. LD-2048"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#FFCC00]/10 focus:border-[#FFCC00] transition-all uppercase"
                  />
                </div>
              </div>
              <button 
                onClick={handleAssignLoad} 
                disabled={!loadInput.trim()}
                className="w-full py-4 rounded-2xl bg-[#FFCC00] text-black text-sm font-semibold uppercase tracking-[0.1em] shadow-xl hover:shadow-yellow-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Label Modal ── */}
      {labelVehicle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-[420px] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-[#FAFAFA]">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Shipping Label</h2>
                <p className="hero-body text-gray-600 mt-2">Print &amp; Attach to windshield</p>
              </div>
              <button onClick={() => setLabelVehicle(null)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors border border-transparent hover:border-gray-200">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-8 flex flex-col gap-6">
              {/* Sticker Preview */}
              <div className="border-[3px] border-black rounded-[2rem] p-8 flex flex-col items-center gap-6 bg-white shadow-2xl scale-105 my-4">
                <div className="flex flex-col gap-1 items-center text-center">
                  <p className="text-[12px] font-semibold text-black uppercase tracking-[0.3em] mb-2 border-b-2 border-black pb-1">HERO LOGISTICS</p>
                  <p className="text-xl font-semibold text-black leading-none">{labelVehicle.year} {labelVehicle.make}</p>
                  <p className="text-lg font-semibold text-black/60 uppercase tracking-tight">{labelVehicle.model}</p>
                </div>
                
                <div className="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold tracking-widest">
                  {labelVehicle.plate}
                </div>

                {/* Mock Barcode */}
                <div className="flex items-end gap-[2px] h-20 my-2">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div key={i} className="bg-black"
                      style={{ width: [1,2,3,1,4,2,1][i%7] + 'px', height: (i%5===0 ? 80 : i%5===2 ? 60 : 70) + 'px' }}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center">
                   <p className="font-mono text-sm font-semibold text-black tracking-[0.2em]">{labelVehicle.vin}</p>
                   <div className="mt-6 flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
                      <MapPin size={16} className="text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-900 uppercase tracking-tight">{labelVehicle.destination}</span>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { window.print(); }}
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-black text-[#FFCC00] text-sm font-semibold uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  <Printer size={18} strokeWidth={3} /> Execute Print Job
                </button>
                <p className="text-xs font-semibold text-gray-400 text-center uppercase tracking-widest">System Hash: HL-{labelVehicle.id.toString().padStart(6, '0')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



