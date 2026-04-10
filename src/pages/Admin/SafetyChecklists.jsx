import React, { useState } from 'react';
import {
  ShieldCheck, Plus, Trash2, Edit2, X, GripVertical,
  CheckCircle2, AlertCircle, ToggleLeft, ToggleRight,
  ClipboardList, Zap, Eye, ChevronDown
} from 'lucide-react';

const CATEGORY_OPTIONS = ['Safety', 'Vehicle', 'Cargo', 'Documentation', 'Personal'];
const FIELD_TYPES = [
  { value: 'checkbox', label: '☑ Checkbox (Yes/No)' },
  { value: 'photo',    label: '📷 Photo Required' },
  { value: 'number',   label: '🔢 Numeric Input' },
  { value: 'text',     label: '✏️ Free Text' },
];

const DEFAULT_CHECKLISTS = [
  {
    id: 'CL-001', name: 'Standard Pre-Trip', active: true, category: 'Safety',
    appliesTo: 'All Drivers', triggerOn: 'Every Trip',
    items: [
      { id: 1, label: 'Tyres inspected — pressure and tread OK', type: 'checkbox', required: true },
      { id: 2, label: 'Headlights, indicators and brake lights functional', type: 'checkbox', required: true },
      { id: 3, label: 'Fuel level above 25%', type: 'checkbox', required: true },
      { id: 4, label: 'Mirrors adjusted and clean', type: 'checkbox', required: true },
      { id: 5, label: 'Odometer reading at trip start', type: 'number', required: true },
      { id: 6, label: 'Vehicle exterior photo (front & rear)', type: 'photo', required: false },
    ]
  },
  {
    id: 'CL-002', name: 'Dangerous Goods Check', active: true, category: 'Cargo',
    appliesTo: 'DG Certified Drivers', triggerOn: 'DG Shipments Only',
    items: [
      { id: 1, label: 'DG manifest verified and onboard', type: 'checkbox', required: true },
      { id: 2, label: 'Hazmat placards correctly displayed', type: 'checkbox', required: true },
      { id: 3, label: 'Emergency response guide accessible', type: 'checkbox', required: true },
      { id: 4, label: 'PPE kit in vehicle (gloves, goggles, spill kit)', type: 'checkbox', required: true },
      { id: 5, label: 'Cargo segregation confirmed — no incompatible goods', type: 'checkbox', required: true },
    ]
  },
  {
    id: 'CL-003', name: 'Cold Chain Monitoring', active: false, category: 'Cargo',
    appliesTo: 'Reefer Vehicle Drivers', triggerOn: 'Cold Chain Shipments',
    items: [
      { id: 1, label: 'Refrigeration unit temperature set correctly', type: 'checkbox', required: true },
      { id: 2, label: 'Current temperature reading (°C)', type: 'number', required: true },
      { id: 3, label: 'Temperature data logger activated', type: 'checkbox', required: true },
    ]
  },
];

export default function AdminSafetyChecklists() {
  const [checklists, setChecklists] = useState(DEFAULT_CHECKLISTS);
  const [editingId, setEditingId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [previewId, setPreviewId] = useState(null);

  const toggleActive = (id) => {
    setChecklists(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteChecklist = (id) => {
    setChecklists(prev => prev.filter(c => c.id !== id));
  };

  const activeCount = checklists.filter(c => c.active).length;
  const previewChecklist = checklists.find(c => c.id === previewId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 px-2">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-700 shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Safety Checklists</h1>
            <p className="text-sm text-gray-500 mt-1">Build and manage pre-trip safety checklists. Active checklists block drivers from starting trips.</p>
          </div>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="btn btn-primary shadow-sm px-5 flex items-center gap-2"
        >
          <Plus size={16} strokeWidth={2.5} /> New Checklist
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {[
          { label: 'Total Checklists', val: checklists.length, color: 'text-gray-900', icon: ClipboardList, bg: 'bg-gray-50', border: 'border-gray-100' },
          { label: 'Active & Enforced', val: activeCount, color: 'text-emerald-600', icon: Zap, bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Trips Blocked Today', val: 3, color: 'text-red-600', icon: AlertCircle, bg: 'bg-red-50', border: 'border-red-100' },
        ].map((s, i) => (
          <div key={i} className={`card p-5 flex items-center justify-between border ${s.border}`}>
            <div>
              <p className="hero-metadata">{s.label}</p>
              <p className={`text-3xl font-black mt-1 ${s.color}`}>{s.val}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center border ${s.border}`}>
              <s.icon size={22} className={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Enforcement Banner */}
      <div className="bg-[#111] rounded-xl p-4 flex items-center gap-4 border border-gray-800">
        <div className="w-9 h-9 bg-[#FFCC00] rounded-xl flex items-center justify-center text-black shrink-0">
          <ShieldCheck size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black text-[#FFCC00] uppercase tracking-widest">Trip Block Enforcement Active</p>
          <p className="text-xs font-medium text-gray-400 mt-0.5">
            Drivers cannot start a trip until all required checklist items are completed. {activeCount} checklist{activeCount !== 1 ? 's' : ''} currently enforced.
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <span className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Live
          </span>
        </div>
      </div>

      {/* Checklist Cards */}
      <div className="flex flex-col gap-4">
        {checklists.map(cl => (
          <div key={cl.id} className={`bg-white rounded-2xl border transition-all shadow-sm ${cl.active ? 'border-gray-100' : 'border-gray-100 opacity-60'}`}>
            <div className="p-5 flex items-center justify-between gap-4">
              
              {/* Left: info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cl.active ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                  <ClipboardList size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-black text-gray-900">{cl.name}</h3>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 bg-gray-50 px-2 py-0.5 rounded">{cl.id}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${cl.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {cl.active ? '● Active' : '○ Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><ShieldCheck size={10} /> {cl.appliesTo}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-[10px] font-bold text-blue-500 flex items-center gap-1"><Zap size={10} /> {cl.triggerOn}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-[10px] font-bold text-gray-500">{cl.items.length} items · {cl.items.filter(i => i.required).length} required</span>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreviewId(previewId === cl.id ? null : cl.id)}
                  className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Eye size={14} /> Preview
                </button>
                <button
                  onClick={() => setEditingId(cl.id)}
                  className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => toggleActive(cl.id)}
                  className={`px-3 py-2 text-xs font-black rounded-lg flex items-center gap-1.5 transition-all ${cl.active ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
                >
                  {cl.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  {cl.active ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => deleteChecklist(cl.id)}
                  className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            {previewId === cl.id && (
              <div className="border-t border-gray-50 p-5 bg-gray-50/50 animate-in slide-in-from-top-2 duration-200">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Driver View Preview</p>
                <div className="bg-[#111] rounded-2xl p-5 max-w-sm mx-auto">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                    <div className="w-8 h-8 bg-[#FFCC00] rounded-lg flex items-center justify-center text-black">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm">{cl.name}</p>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Pre-trip safety gate</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {cl.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-5 h-5 rounded border-2 border-gray-600 shrink-0"></div>
                        <p className="text-xs font-medium text-gray-300 leading-tight flex-1">{item.label}</p>
                        {item.required && <span className="text-[8px] font-black text-red-400 uppercase tracking-widest shrink-0">Req</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 w-full py-3 bg-gray-700 text-gray-500 text-xs font-black uppercase tracking-widest rounded-xl text-center cursor-not-allowed">
                    Start Trip (Locked)
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Checklist Modal */}
      {showNew && <NewChecklistModal onClose={() => setShowNew(false)} onCreate={(c) => { setChecklists(prev => [...prev, c]); setShowNew(false); }} />}
      {editingId && <EditChecklistModal checklist={checklists.find(c => c.id === editingId)} onClose={() => setEditingId(null)} onSave={(updated) => { setChecklists(prev => prev.map(c => c.id === updated.id ? updated : c)); setEditingId(null); }} />}
    </div>
  );
}

function NewChecklistModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Safety');
  const [appliesTo, setAppliesTo] = useState('All Drivers');
  const [triggerOn, setTriggerOn] = useState('Every Trip');
  const [items, setItems] = useState([
    { id: 1, label: '', type: 'checkbox', required: true }
  ]);

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), label: '', type: 'checkbox', required: true }]);
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({
      id: `CL-${String(Date.now()).slice(-3)}`,
      name, category, appliesTo, triggerOn, active: true,
      items: items.filter(i => i.label.trim())
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center rounded-t-2xl">
          <div>
            <h3 className="text-lg font-black text-gray-900">New Safety Checklist</h3>
            <p className="text-xs text-gray-500 mt-0.5">All active checklists are enforced as a trip gate for drivers.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg text-gray-500"><X size={18} /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Checklist Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Night Shift Pre-Check" className="input w-full" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="input w-full">
                {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Applies To</label>
              <select value={appliesTo} onChange={e => setAppliesTo(e.target.value)} className="input w-full">
                <option>All Drivers</option>
                <option>DG Certified Drivers</option>
                <option>Reefer Vehicle Drivers</option>
                <option>Heavy Vehicle (HC) Drivers</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Trigger On</label>
              <select value={triggerOn} onChange={e => setTriggerOn(e.target.value)} className="input w-full">
                <option>Every Trip</option>
                <option>First Trip of Day</option>
                <option>DG Shipments Only</option>
                <option>Cold Chain Shipments</option>
                <option>Interstate Trips</option>
              </select>
            </div>
          </div>

          {/* Items Builder */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><ClipboardList size={12} /> Checklist Items</label>
              <button onClick={addItem} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-900 text-[#FFCC00] rounded-lg flex items-center gap-1.5 hover:bg-black transition-colors">
                <Plus size={11} strokeWidth={3} /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <GripVertical size={16} className="text-gray-300 shrink-0 cursor-grab" />
                  <span className="w-5 h-5 rounded bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => updateItem(item.id, 'label', e.target.value)}
                    placeholder="Describe the check..."
                    className="flex-1 bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                  <select
                    value={item.type}
                    onChange={e => updateItem(item.id, 'type', e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-[10px] font-bold text-gray-700 focus:outline-none w-36 shrink-0"
                  >
                    {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase tracking-widest shrink-0 cursor-pointer">
                    <input type="checkbox" checked={item.required} onChange={e => updateItem(item.id, 'required', e.target.checked)} className="w-3.5 h-3.5 accent-red-500" />
                    Req.
                  </label>
                  <button onClick={() => removeItem(item.id)} className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 rounded-lg transition-colors shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-[#FAFAFA] flex justify-between items-center rounded-b-2xl">
          <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
          <div className="flex gap-3">
            <button onClick={handleCreate} className="btn btn-primary shadow-sm">
              <ShieldCheck size={15} /> Create & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditChecklistModal({ checklist, onClose, onSave }) {
  const [data, setData] = useState({ ...checklist, items: [...checklist.items] });

  const updateItem = (id, field, val) => setData(d => ({ ...d, items: d.items.map(i => i.id === id ? { ...i, [field]: val } : i) }));
  const addItem = () => setData(d => ({ ...d, items: [...d.items, { id: Date.now(), label: '', type: 'checkbox', required: true }] }));
  const removeItem = (id) => setData(d => ({ ...d, items: d.items.filter(i => i.id !== id) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center rounded-t-2xl">
          <div>
            <h3 className="text-lg font-black text-gray-900">Edit: {data.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{data.id} · Changes apply immediately to all active trips.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg text-gray-500"><X size={18} /></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Checklist Name</label>
            <input value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} className="input w-full" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><ClipboardList size={12} /> Items</label>
              <button onClick={addItem} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-900 text-[#FFCC00] rounded-lg flex items-center gap-1.5">
                <Plus size={11} strokeWidth={3} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {data.items.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-5 h-5 rounded bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                  <input
                    type="text" value={item.label}
                    onChange={e => updateItem(item.id, 'label', e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-gray-400"
                  />
                  <select value={item.type} onChange={e => updateItem(item.id, 'type', e.target.value)} className="bg-white border border-gray-200 rounded-lg py-2 px-2 text-[10px] font-bold text-gray-700 focus:outline-none w-32 shrink-0">
                    {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <label className="flex items-center gap-1 text-[10px] font-black text-gray-500 uppercase tracking-widest shrink-0 cursor-pointer">
                    <input type="checkbox" checked={item.required} onChange={e => updateItem(item.id, 'required', e.target.checked)} className="w-3.5 h-3.5 accent-red-500" />
                    Req.
                  </label>
                  <button onClick={() => removeItem(item.id)} className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 rounded-lg transition-colors shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-[#FAFAFA] flex justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="btn bg-white border border-gray-200 text-gray-700">Cancel</button>
          <button onClick={() => onSave(data)} className="btn btn-primary shadow-sm"><CheckCircle2 size={15} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}
