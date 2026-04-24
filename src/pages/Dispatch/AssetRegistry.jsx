import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList, Plus, Search, Truck, Car, Container,
  X, ChevronDown, CheckCircle2, AlertTriangle, Clock,
  Fingerprint, Ruler, Weight, Calendar, Shield, Tag,
  FileText, Barcode
} from 'lucide-react';

const ASSET_TYPES = [
  { id: 'semi',     label: 'Semi Truck',       icon: Truck },
  { id: 'van',      label: 'Cargo Van',         icon: Truck },
  { id: 'trailer',  label: 'Trailer / Flatbed', icon: Truck },
  { id: 'car',      label: 'Car Carrier',       icon: Car },
  { id: 'rigid',    label: 'Rigid Truck',       icon: Truck },
  { id: 'container',label: 'Container Unit',    icon: Container },
];

const NICHE_OPTS = ['General Freight', 'Car / Vehicle Transport', 'Dangerous Goods', 'Refrigerated'];

const STATUS_STYLE = {
  Active:      'bg-emerald-50 text-emerald-600 border-emerald-100',
  Pending:     'bg-amber-50  text-amber-600  border-amber-100',
  Maintenance: 'bg-red-50    text-red-600    border-red-100',
  Retired:     'bg-gray-100  text-gray-500   border-gray-200',
};

const INITIAL_ASSETS = [
  { id: 'AST-001', vin: '1FUJGBDV8CLBP8834', rego: 'XQG-984',    make: 'Freightliner Cascadia', type: 'Semi Truck',   year: '2021', niche: 'General Freight',     payload: '28t',  length: '20.0', width: '2.5', height: '4.3', status: 'Active',      registered: '2024-03-12' },
  { id: 'AST-002', vin: 'WDB9066351L123456', rego: 'BZX-441',    make: 'Mercedes Sprinter 519', type: 'Cargo Van',     year: '2022', niche: 'General Freight',     payload: '3.5t', length: '6.0',  width: '2.1', height: '2.8', status: 'Maintenance', registered: '2024-07-01' },
  { id: 'AST-003', vin: '4V4NC9EH5HN123789', rego: 'T-9921',     make: 'Vawdrey Drop Deck',    type: 'Trailer / Flatbed', year: '2020', niche: 'Car / Vehicle Transport', payload: '40t', length: '14.6', width: '2.5', height: '1.8', status: 'Active', registered: '2023-11-20' },
  { id: 'AST-004', vin: '1XKDDP9X9LJ123001', rego: 'BGT-221',    make: 'Isuzu FTR 900',        type: 'Rigid Truck',   year: '2020', niche: 'Dangerous Goods',     payload: '9t',   length: '9.0',  width: '2.5', height: '3.6', status: 'Active',      registered: '2024-01-15' },
  { id: 'AST-005', vin: '3AKJGLDRXJSJT4321', rego: 'TRK-05-MEL', make: 'Kenworth T610',        type: 'Semi Truck',    year: '2019', niche: 'Refrigerated',        payload: '42t',  length: '19.0', width: '2.5', height: '4.3', status: 'Active',      registered: '2023-06-08' },
];

const emptyForm = {
  vin: '', rego: '', make: '', type: 'Semi Truck', year: new Date().getFullYear().toString(),
  niche: 'General Freight', payload: '', length: '', width: '', height: '',
};

export default function AssetRegistry() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterNiche, setFilterNiche] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const filtered = assets.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !search || a.vin.toLowerCase().includes(q) || a.rego.toLowerCase().includes(q) || a.make.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    const matchNiche  = filterNiche  === 'All' || a.niche  === filterNiche;
    return matchSearch && matchStatus && matchNiche;
  });

  const counts = {
    total:       assets.length,
    active:      assets.filter(a => a.status === 'Active').length,
    maintenance: assets.filter(a => a.status === 'Maintenance').length,
    pending:     assets.filter(a => a.status === 'Pending').length,
  };

  const handleRegister = () => {
    if (!form.vin.trim() || !form.rego.trim() || !form.make.trim()) {
      setFormError('VIN, Registration, and Make/Model are required.');
      return;
    }
    if (assets.some(a => a.vin === form.vin.trim())) {
      setFormError('An asset with this VIN already exists.');
      return;
    }
    const newId = `AST-${String(assets.length + 1).padStart(3, '0')}`;
    setAssets(prev => [...prev, {
      ...form,
      id: newId,
      status: 'Pending',
      registered: new Date().toISOString().slice(0, 10),
    }]);
    setForm(emptyForm);
    setFormError('');
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-lg text-[#111] shadow-sm">
            <ClipboardList size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Asset Registry</h1>
            <p className="text-sm text-gray-500 mt-1">Permanent vehicle records — VIN, Rego, Dimensions & Compliance</p>
          </div>
        </div>
        <button onClick={() => { setShowModal(true); setFormError(''); }} className="btn btn-primary">
          <Plus size={18} strokeWidth={3} /> Register Asset
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2" />

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {[
          { label: 'Total Assets',  val: counts.total,       icon: ClipboardList, color: 'text-blue-600',    bg: 'bg-blue-50' },
          { label: 'Active',        val: counts.active,       icon: CheckCircle2,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Maintenance',   val: counts.maintenance,  icon: AlertTriangle, color: 'text-red-500',     bg: 'bg-red-50' },
          { label: 'Pending Reg.',  val: counts.pending,      icon: Clock,         color: 'text-amber-600',   bg: 'bg-amber-50' },
        ].map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-widest">{k.label}</p>
              <p className="text-3xl font-semibold text-gray-900 mt-1 leading-none">{k.val}</p>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${k.bg} ${k.color}`}>
              <k.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mx-2">

        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative group w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search VIN, Rego, Make..."
              className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {/* Status filter */}
            <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1 border border-gray-200">
              {['All', 'Active', 'Maintenance', 'Pending'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${filterStatus === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {s}
                </button>
              ))}
            </div>
            {/* Niche filter */}
            <select value={filterNiche} onChange={e => setFilterNiche(e.target.value)}
              className="text-xs font-semibold border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 shadow-sm">
              <option value="All">All Niches</option>
              {NICHE_OPTS.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Asset ID</th>
                <th className="px-6 py-4">VIN / Registration</th>
                <th className="px-6 py-4">Make / Type</th>
                <th className="px-6 py-4">Niche</th>
                <th className="px-6 py-4">Dimensions (L×W×H m)</th>
                <th className="px-6 py-4">Payload</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                    No assets match your search criteria
                  </td>
                </tr>
              ) : filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/70 transition-all group cursor-pointer"
                  onClick={() => navigate(`/dispatch/vehicles/${a.id}`)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-[#FFCC00] transition-colors">
                        <Truck size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#111] text-sm">{a.id}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{a.year}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 inline-block mb-1">{a.vin}</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{a.rego}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-gray-900">{a.make}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{a.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      {a.niche}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-700 font-mono">
                      {a.length} × {a.width} × {a.height}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{a.payload}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded border uppercase tracking-widest ${STATUS_STYLE[a.status] || STATUS_STYLE.Pending}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => navigate(`/dispatch/vehicles/${a.id}`)}
                      className="text-xs font-semibold border border-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-50 bg-white transition-all uppercase tracking-widest shadow-sm">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filtered.length} of {assets.length} assets</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Registry v1.0 · Auto-synced</p>
        </div>
      </div>

      {/* ── Register Asset Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10 rounded-t-2xl">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Register New Asset</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Permanent vehicle record — all fields saved to registry</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-8">

              {/* Identity */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Fingerprint size={16} className="text-blue-500" />
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Vehicle Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">VIN Number *</label>
                    <input
                      type="text"
                      value={form.vin}
                      onChange={e => setForm(f => ({ ...f, vin: e.target.value.toUpperCase() }))}
                      placeholder="17-character VIN (e.g. 1FUJGBDV8CLBP8834)"
                      className="input font-mono uppercase tracking-widest"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Registration / Plate *</label>
                    <input type="text" value={form.rego} onChange={e => setForm(f => ({ ...f, rego: e.target.value.toUpperCase() }))}
                      placeholder="e.g. XQG-984" className="input uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Year of Manufacture</label>
                    <input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                      min="1990" max="2030" className="input" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Make / Model *</label>
                    <input type="text" value={form.make} onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
                      placeholder="e.g. Freightliner Cascadia" className="input" />
                  </div>
                </div>
              </section>

              {/* Classification */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-violet-500" />
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Classification</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {ASSET_TYPES.map(t => (
                    <button key={t.id} onClick={() => setForm(f => ({ ...f, type: t.label }))}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${form.type === t.label ? 'border-[#111] bg-[#111] text-white' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                      <t.icon size={16} className={form.type === t.label ? 'text-[#FFCC00]' : ''} />
                      <span className="text-xs font-bold">{t.label}</span>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Operating Niche</label>
                  <select value={form.niche} onChange={e => setForm(f => ({ ...f, niche: e.target.value }))} className="input">
                    {NICHE_OPTS.map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </section>

              {/* Dimensions & Payload */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Ruler size={16} className="text-emerald-500" />
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Dimensions & Payload</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Length (m)</label>
                    <input type="number" step="0.1" value={form.length} onChange={e => setForm(f => ({ ...f, length: e.target.value }))}
                      placeholder="e.g. 19.0" className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Width (m)</label>
                    <input type="number" step="0.1" value={form.width} onChange={e => setForm(f => ({ ...f, width: e.target.value }))}
                      placeholder="e.g. 2.5" className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Height (m)</label>
                    <input type="number" step="0.1" value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
                      placeholder="e.g. 4.3" className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">Payload</label>
                    <input type="text" value={form.payload} onChange={e => setForm(f => ({ ...f, payload: e.target.value }))}
                      placeholder="e.g. 28t" className="input" />
                  </div>
                </div>
              </section>

              {/* Error */}
              {formError && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertTriangle size={16} className="text-red-500 shrink-0" />
                  <p className="text-sm font-bold text-red-600">{formError}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button onClick={() => setShowModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button onClick={handleRegister} className="btn btn-primary flex-1">
                  <ClipboardList size={16} /> Register Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

