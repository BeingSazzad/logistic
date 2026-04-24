import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Save, MapPin,
  Package, DollarSign,
  Navigation, Scale, Box, User, Phone,
  Layers, Fingerprint, Shield, Search,
  CheckCircle2, X, ChevronDown, Mail, CreditCard, Building2,
  Plus, Trash2, Copy, ChevronUp, Car, Boxes, AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const REGISTERED_USERS = [
  { id: 'CUS-001', name: 'Acme Corp Logistics', contact: 'James Hargrove', email: 'james@acme.com.au', phone: '+61 2 9283 1122', address: 'Warehouse 4, 12 Botany Rd, Alexandria NSW 2015', type: 'Business' },
  { id: 'CUS-002', name: 'Tech Solutions Ltd', contact: 'Tom Carey', email: 'tom@techsol.com', phone: '+61 2 9666 0011', address: '1 Innovation Dr, Port Botany NSW 2036', type: 'Business' },
  { id: 'CUS-003', name: 'Fresh Markets AU', contact: 'Ben Chu', email: 'ben@freshmarkets.com.au', phone: '+61 2 9764 1230', address: '250 Parramatta Rd, Flemington NSW 2140', type: 'Business' },
  { id: 'CUS-004', name: 'Southport Logistics', contact: 'Sarah Miller', email: 'sarah@southport.com', phone: '+61 7 5582 9900', address: 'Bay 12, 45 Ferry Rd, Southport QLD 4215', type: 'Business' },
  { id: 'CUS-005', name: 'Michael Chen', contact: 'Michael Chen', email: 'm.chen@gmail.com', phone: '+61 412 345 678', address: '22 Bondi Rd, Bondi NSW 2026', type: 'Individual' },
];

const NICHES = [
  { id: 'car', label: 'Car Transport', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { id: 'freight', label: 'General Freight', icon: Boxes, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  { id: 'dangerous', label: 'Dangerous Goods', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' }
];

const createItem = (id) => ({
  id,
  niche: 'freight', // Default niche
  description: '',
  qty: 1,
  weight: '',
  // Car specific
  vin: '',
  rego: '',
  makeModel: '',
  // Dangerous Goods specific
  unNumber: '',
  hazardClass: '',
  packaging: 'Pallets',
  pickupAddress: '',
  dropoffAddress: '',
  pickupSameAsSender: false,
  collapsed: false,
});

export default function AdminCreateLoad() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');
  const [paymentBy, setPaymentBy] = useState('Sender');
  const [transferType, setTransferType] = useState('Direct'); 
  const [selectedNiche, setSelectedNiche] = useState('freight'); // Global niche selection for the load

  // Sender state
  const [senderMode, setSenderMode] = useState('registered');
  const [senderSearch, setSenderSearch] = useState('');
  const [selectedSender, setSelectedSender] = useState(null);
  const [showSenderDropdown, setShowSenderDropdown] = useState(false);

  // Multi-item state
  const [items, setItems] = useState([createItem(1)]);
  const [nextId, setNextId] = useState(2);

  // Helper to change niche for all items
  const handleNicheChange = (nicheId) => {
    setSelectedNiche(nicheId);
    setItems(prev => prev.map(item => ({ ...item, niche: nicheId })));
  };

  const senderResults = REGISTERED_USERS.filter(u =>
    senderSearch.length > 1 && (
      u.name.toLowerCase().includes(senderSearch.toLowerCase()) ||
      u.phone.includes(senderSearch) ||
      u.email.toLowerCase().includes(senderSearch.toLowerCase())
    )
  );

  const selectSender = (u) => {
    setSelectedSender(u);
    setSenderSearch(u.name);
    setShowSenderDropdown(false);
  };
  const clearSender = () => { setSelectedSender(null); setSenderSearch(''); };

  // Item helpers
  const addItem = () => {
    setItems(prev => [...prev, { ...createItem(nextId), niche: selectedNiche }]);
    setNextId(n => n + 1);
  };

  const removeItem = (id) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const toggleCollapse = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, collapsed: !i.collapsed } : i));
  };

  const totalWeight = items.reduce((sum, i) => sum + (parseFloat(i.weight) || 0), 0);
  const totalQty = items.reduce((sum, i) => sum + (parseInt(i.qty) || 0), 0);

  const copyPickupFromSender = (id) => {
    if (!selectedSender) return;
    updateItem(id, 'pickupAddress', selectedSender.address);
    updateItem(id, 'pickupSameAsSender', true);
  };

  const copyDropoffFromPrev = (idx, id) => {
    if (idx === 0) return;
    const prevDropoff = items[idx - 1].dropoffAddress;
    updateItem(id, 'dropoffAddress', prevDropoff);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/loads')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Load</h1>
              <span className="text-xs font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-2.5 py-1 rounded-md uppercase tracking-widest">Draft</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Configure your load type and add items below.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/admin/loads')} className="btn btn-outline text-gray-600">
            Cancel
          </button>
          <button className="btn btn-primary pl-6 pr-8">
            <Save size={18} strokeWidth={2.5} /> Create Load
          </button>
        </div>
      </div>

      {/* Niche Selection & Mode Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 bg-white border border-gray-100 rounded-2xl p-2 shadow-sm flex gap-2 overflow-x-auto no-scrollbar">
          {NICHES.map(niche => (
            <button
              key={niche.id}
              onClick={() => handleNicheChange(niche.id)}
              className={`flex-1 min-w-[140px] flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${selectedNiche === niche.id ? `${niche.bg} ${niche.border} ${niche.color} border-blue-500 shadow-md` : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              <div className={`p-2 rounded-lg ${selectedNiche === niche.id ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                <niche.icon size={20} />
              </div>
              <div className="text-left">
                <p className="text-[13px] font-bold uppercase tracking-wide">{niche.label}</p>
                </div>
            </button>
          ))}
        </div>

        <div className="md:col-span-4 bg-[#111] border border-gray-800 rounded-2xl p-2 flex justify-between items-center px-4 text-white shadow-sm">
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 shrink-0 gap-1 flex-1">
            {[
              { type: 'Direct', label: 'Direct', desc: 'Door-to-Door' },
              { type: 'Branch', label: 'Depot', desc: 'Depot-to-Depot' },
            ].map(({ type, label, desc }) => (
              <button
                key={type}
                onClick={() => setTransferType(type)}
                className={`flex-1 py-1.5 text-xs font-black rounded-md flex flex-col items-center transition-all ${transferType === type ? 'bg-[#FFCC00] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="uppercase tracking-widest">{label}</span>
                <span className="text-xs font-bold opacity-70 leading-none mt-0.5">{desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2 mt-2">

        {/* ── Main Form ── */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* SENDER */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden transition-all">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide">Sender Identity</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase mt-0.5 tracking-widest">Originating Party</p>
                </div>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200/60">
                {['guest', 'registered'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => { setSenderMode(mode); clearSender(); }}
                    className={`px-5 py-2 text-xs font-black rounded-lg transition-all uppercase tracking-widest ${senderMode === mode ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {mode === 'guest' ? 'Quick Guest' : 'Existing Client'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {senderMode === 'guest' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Legal Name / Company *</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input type="text" placeholder="e.g. John Doe or Global Ltd" className="input pl-11 !rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Contact Phone</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input type="text" placeholder="+61 4XX XXX XXX" className="input pl-11 !rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Office Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input type="text" placeholder="Suburb, State, Postcode" className="input pl-11 !rounded-xl" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Secure Customer Search *</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={senderSearch}
                        onChange={e => { setSenderSearch(e.target.value); setShowSenderDropdown(true); setSelectedSender(null); }}
                        onFocus={() => setShowSenderDropdown(true)}
                        placeholder="Search by name, phone, or email..."
                        className="input pl-11 pr-11 !rounded-xl"
                      />
                      {senderSearch && (
                        <button onClick={clearSender} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                          <X size={15} />
                        </button>
                      )}
                    </div>
                    {showSenderDropdown && senderResults.length > 0 && !selectedSender && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-20 relative animate-in slide-in-from-top-2">
                        {senderResults.map(u => (
                          <button key={u.id} onClick={() => selectSender(u)} className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 text-left border-b border-gray-50 last:border-0 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-[#FFCC00] font-black text-xs shrink-0 shadow-lg">
                              {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-sm text-gray-900 truncate">{u.name}</p>
                              <p className="text-xs text-gray-400 uppercase tracking-widest font-black">{u.phone} · {u.type}</p>
                            </div>
                            <span className="text-xs text-gray-400 font-black uppercase tracking-widest shrink-0 border border-gray-100 px-2 py-0.5 rounded-md ml-auto">{u.id}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSender && (
                    <div className="bg-blue-600 rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-blue-200 animate-in zoom-in-95">
                      <div className="absolute top-0 right-0 p-12 -mr-6 -mt-6 bg-white/10 rounded-full blur-3xl"></div>
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-black text-xl border border-white/30 shadow-lg shrink-0">
                          {selectedSender.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <h4 className="font-black text-white text-lg tracking-tight">{selectedSender.name}</h4>
                            <span className="text-xs font-black text-white bg-white/20 border border-white/30 px-2.5 py-0.5 rounded uppercase tracking-widest">ID: {selectedSender.id}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-y-1.5 gap-x-6">
                            <p className="text-xs font-bold text-blue-100 flex items-center gap-2"><Phone size={12} className="opacity-70" />{selectedSender.phone}</p>
                            <p className="text-xs font-bold text-blue-100 flex items-center gap-2"><Mail size={12} className="opacity-70" />{selectedSender.email}</p>
                            <p className="text-xs font-bold text-blue-100 flex items-center gap-2 col-span-2"><MapPin size={12} className="opacity-70" />{selectedSender.address}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-lg">
                            <CheckCircle2 size={18} strokeWidth={3} />
                          </div>
                          <button onClick={clearSender} className="text-xs text-white/70 hover:text-white font-black uppercase tracking-widest transition-colors border-b border-white/30 pb-0.5">Switch Client</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── MULTI-ITEM SECTION ── */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <div>
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Boxes size={18} className="text-blue-600" /> Manifest Items
                </h2>
                <p className="text-xs text-gray-400 mt-0.5 font-bold uppercase tracking-widest">Detailed Content Declaration</p>
              </div>
              <button
                onClick={addItem}
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-[#FFCC00] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                <Plus size={14} strokeWidth={4} /> Add Item
              </button>
            </div>

            {items.map((item, idx) => (
              <div key={item.id} className={`bg-white rounded-2xl border ${selectedNiche === 'car' ? 'border-blue-100 shadow-blue-50' : selectedNiche === 'dangerous' ? 'border-orange-100 shadow-orange-50' : 'border-gray-100 shadow-gray-50'} shadow-xl overflow-hidden transition-all duration-300`}>
                <div
                  className={`p-5 flex items-center justify-between cursor-pointer transition-colors ${item.collapsed ? 'hover:bg-gray-50/50' : 'bg-gray-50/30'}`}
                  onClick={() => toggleCollapse(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${selectedNiche === 'car' ? 'bg-blue-100 text-blue-700' : selectedNiche === 'dangerous' ? 'bg-orange-100 text-orange-700' : 'bg-violet-100 text-violet-700'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-gray-900">
                          {item.description || (item.niche === 'car' ? 'Vehicle Entry' : item.niche === 'dangerous' ? 'Hazardous Material' : 'Freight Item')}
                        </p>
                        {item.vin && <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-widest">VIN: {item.vin}</span>}
                      </div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {item.pickupAddress ? `📍 ${item.pickupAddress}` : 'Location data pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {items.length > 1 && (
                      <button onClick={e => { e.stopPropagation(); removeItem(item.id); }} className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 shadow-sm transition-transform duration-300 ${item.collapsed ? '' : 'rotate-180'}`}>
                      <ChevronDown size={18} strokeWidth={3} />
                    </div>
                  </div>
                </div>

                {!item.collapsed && (
                  <div className="border-t border-gray-50 p-6 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-300">
                    
                    {/* Niche Specific Fields */}
                    {item.niche === 'car' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50">
                        <div className="md:col-span-3 mb-2 flex items-center gap-2">
                          <Car size={16} className="text-blue-600" />
                          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">Vehicle Specifications</h4>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-blue-700 mb-2 ml-1">VIN Number *</label>
                          <input type="text" value={item.vin} onChange={e => updateItem(item.id, 'vin', e.target.value)} placeholder="17-Digit VIN" className="input !bg-white !border-blue-200 !rounded-xl font-mono uppercase" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-blue-700 mb-2 ml-1">Registration / Plate</label>
                          <input type="text" value={item.rego} onChange={e => updateItem(item.id, 'rego', e.target.value)} placeholder="State & Number" className="input !bg-white !border-blue-200 !rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-blue-700 mb-2 ml-1">Make / Model</label>
                          <input type="text" value={item.makeModel} onChange={e => updateItem(item.id, 'makeModel', e.target.value)} placeholder="e.g. Toyota Hilux" className="input !bg-white !border-blue-200 !rounded-xl" />
                        </div>
                      </div>
                    ) : item.niche === 'dangerous' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-orange-50/30 p-5 rounded-2xl border border-orange-100/50">
                         <div className="md:col-span-3 mb-2 flex items-center gap-2">
                          <AlertCircle size={16} className="text-orange-600" />
                          <h4 className="text-xs font-bold text-orange-900 uppercase tracking-wide">Hazardous Declaration</h4>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-orange-700 mb-2 ml-1">UN Number *</label>
                          <input type="text" value={item.unNumber} onChange={e => updateItem(item.id, 'unNumber', e.target.value)} placeholder="UN XXXX" className="input !bg-white !border-orange-200 !rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-orange-700 mb-2 ml-1">Hazard Class</label>
                          <select value={item.hazardClass} onChange={e => updateItem(item.id, 'hazardClass', e.target.value)} className="input !bg-white !border-orange-200 !rounded-xl">
                             <option>Class 1: Explosives</option>
                             <option>Class 2: Gases</option>
                             <option>Class 3: Flammable Liquids</option>
                             <option>Class 4: Flammable Solids</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-orange-700 mb-2 ml-1">Packaging Type</label>
                          <input type="text" value={item.packaging} onChange={e => updateItem(item.id, 'packaging', e.target.value)} placeholder="e.g. IBC, Drum" className="input !bg-white !border-orange-200 !rounded-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-violet-50/30 p-5 rounded-2xl border border-violet-100/50">
                        <div className="md:col-span-2 mb-2 flex items-center gap-2">
                          <Boxes size={16} className="text-violet-600" />
                          <h4 className="text-xs font-bold text-violet-900 uppercase tracking-wide">Freight Details</h4>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-violet-700 mb-2 ml-1">Description *</label>
                          <input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="e.g. Standard Pallet" className="input !bg-white !border-violet-200 !rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-violet-700 mb-2 ml-1">Packaging Group</label>
                          <select value={item.packaging} onChange={e => updateItem(item.id, 'packaging', e.target.value)} className="input !bg-white !border-violet-200 !rounded-xl">
                             <option>Pallets</option>
                             <option>Skids</option>
                             <option>Tote Boxes</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Quantity</label>
                        <input type="number" value={item.qty} onChange={e => updateItem(item.id, 'qty', e.target.value)} className="input !rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Weight (KG)</label>
                        <input type="number" value={item.weight} onChange={e => updateItem(item.id, 'weight', e.target.value)} className="input !rounded-xl" />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-xs font-semibold text-gray-500 mb-2 ml-1">Dimensions (L x W x H cm)</label>
                         <div className="grid grid-cols-3 gap-2">
                            <input type="text" placeholder="L" className="input !rounded-xl text-center px-1" />
                            <input type="text" placeholder="W" className="input !rounded-xl text-center px-1" />
                            <input type="text" placeholder="H" className="input !rounded-xl text-center px-1" />
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                          <label className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                            <MapPin size={12} className="text-red-500" /> Pickup Origin *
                          </label>
                          {selectedSender && (
                            <button onClick={() => copyPickupFromSender(item.id)} className="text-xs font-semibold text-blue-600 hover:underline">Match Sender</button>
                          )}
                        </div>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={14} />
                          <input type="text" value={item.pickupAddress} onChange={e => updateItem(item.id, 'pickupAddress', e.target.value)} placeholder="Search suburb or enter address..." className="input pl-11 !rounded-xl !bg-gray-50/50 hover:bg-white" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                          <label className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                            <Navigation size={12} className="text-emerald-500" /> Delivery Target *
                          </label>
                          {idx > 0 && (
                            <button onClick={() => copyDropoffFromPrev(idx, item.id)} className="text-xs font-semibold text-blue-600 hover:underline">Match Prev</button>
                          )}
                        </div>
                        <div className="relative group">
                          <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={14} />
                          <input type="text" value={item.dropoffAddress} onChange={e => updateItem(item.id, 'dropoffAddress', e.target.value)} placeholder="Full destination address..." className="input pl-11 !rounded-xl !bg-gray-50/50 hover:bg-white" />
                        </div>
                        {transferType === 'Branch' && (
                          <div className="relative group mt-2">
                            <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                              value={item.targetBranch || ''}
                              onChange={e => updateItem(item.id, 'targetBranch', e.target.value)}
                              className="input pl-11 !rounded-xl !bg-white !border-emerald-200 appearance-none cursor-pointer"
                            >
                              <option value="">Select Destination Depot...</option>
                              <option value="SYD-CENTRAL">Sydney Central Depot (SYD)</option>
                              <option value="MEL-Depot">Melbourne Depot (MEL)</option>
                              <option value="BNE-PORT">Brisbane Port Depot (BNE)</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform" size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}


            <button
              onClick={addItem}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-400 hover:border-violet-300 hover:text-violet-500 hover:bg-violet-50/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Another Item
            </button>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-[#FFCC00] flex items-center gap-2 border-b border-white/10 pb-4">
              <Box size={16} /> Load Summary
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Total Items</p>
                  <p className="text-2xl font-black">{totalQty}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Total Weight</p>
                  <p className="text-2xl font-black">{totalWeight}<span className="text-sm font-medium ml-1">KG</span></p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Service Level</label>
                <div className="flex bg-white/5 p-1 rounded-xl gap-1">
                  {['Normal', 'Express', 'Direct'].map(l => (
                    <button key={l} onClick={() => setPriority(l)} className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${priority === l ? 'bg-[#FFCC00] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-gray-400">Billing</span>
                <div className="flex gap-1.5">
                  {['Sender', 'Receiver'].map(t => (
                    <button key={t} onClick={() => setPaymentBy(t)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${paymentBy === t ? 'bg-[#FFCC00] text-black' : 'text-gray-400 hover:text-white'}`}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Freight ({items.length} {items.length === 1 ? 'unit' : 'units'})</span>
                  <span className="text-sm font-bold">${(items.length * 420 + totalWeight * 2.5).toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Handling Fee</span>
                  <span className="text-sm font-bold">$45.00</span>
                </div>
                {priority !== 'Normal' && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-amber-400">Priority Surcharge</span>
                    <span className="text-sm font-bold text-amber-400">+${(priority === 'Direct' ? 450 : 120).toLocaleString()}.00</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <span className="text-xs text-gray-400">Subtotal</span>
                  <span className="text-sm font-bold">${(items.length * 420 + totalWeight * 2.5 + 45 + (priority === 'Direct' ? 450 : (priority === 'Express' ? 120 : 0))).toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">GST (10%)</span>
                  <span className="text-sm font-bold">${((items.length * 420 + totalWeight * 2.5 + 45 + (priority === 'Direct' ? 450 : (priority === 'Express' ? 120 : 0))) * 0.1).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="text-sm font-bold text-[#FFCC00]">
                    {paymentBy === 'Sender' ? 'Total Charged' : 'Total Due'}
                  </span>
                  <span className="text-2xl font-black">
                    ${((items.length * 420 + totalWeight * 2.5 + 45 + (priority === 'Direct' ? 450 : (priority === 'Express' ? 120 : 0))) * 1.1).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-2">
              <Shield size={14} className="text-emerald-500" /> Declaration
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              By creating this Load, you confirm all items are correctly declared and comply with transport regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}







