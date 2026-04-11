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

const PACKAGING_TYPES = ['Pallets', 'Boxes / Cartons', 'Crates', 'Vehicle / Car', 'Furniture / Loose', 'Dangerous Goods'];

const createItem = (id) => ({
  id,
  description: '',
  packaging: 'Pallets',
  qty: 1,
  weight: '',
  pickupAddress: '',
  dropoffAddress: '',
  pickupSameAsSender: false,
  collapsed: false,
});

export default function AdminCreateShipment() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');
  const [paymentBy, setPaymentBy] = useState('Sender');
  const [transferType, setTransferType] = useState('Direct'); // 'Branch' | 'Direct'
  const [targetBranch, setTargetBranch] = useState('');

  // Sender state
  const [senderMode, setSenderMode] = useState('registered');
  const [senderSearch, setSenderSearch] = useState('');
  const [selectedSender, setSelectedSender] = useState(null);
  const [showSenderDropdown, setShowSenderDropdown] = useState(false);

  // Multi-item state
  const [items, setItems] = useState([createItem(1)]);
  const [nextId, setNextId] = useState(2);

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
    setItems(prev => [...prev, createItem(nextId)]);
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

  const copyPickupFromSender = (id) => {
    if (!selectedSender) return;
    updateItem(id, 'pickupAddress', selectedSender.address);
    updateItem(id, 'pickupSameAsSender', true);
  };

  const copyPickupFromPrev = (idx, id) => {
    if (idx === 0) return;
    const prevPickup = items[idx - 1].pickupAddress;
    updateItem(id, 'pickupAddress', prevPickup);
  };

  const copyDropoffFromPrev = (idx, id) => {
    if (idx === 0) return;
    const prevDropoff = items[idx - 1].dropoffAddress;
    updateItem(id, 'dropoffAddress', prevDropoff);
  };

  const totalWeight = items.reduce((sum, i) => sum + (parseFloat(i.weight) || 0), 0);
  const totalQty = items.reduce((sum, i) => sum + (parseInt(i.qty) || 0), 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/shipments')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Shipment</h1>
              <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-2.5 py-1 rounded-md uppercase tracking-widest">Draft</span>
              {items.length > 1 && (
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-widest">
                  {items.length} Items
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">Add multiple items — each with its own pickup and drop-off location.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/shipments')} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm">
            Cancel
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <Save size={18} strokeWidth={2.5} /> Create Shipment
          </button>
        </div>
      </div>

      {/* Delivery Mode Banner */}
      <div className="bg-[#111] border border-gray-800 rounded-lg p-3 flex justify-between items-center px-5 mb-2 shadow-sm text-white">
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 shrink-0 gap-1">
          {[
            { type: 'Direct', label: '🚪 Door to Door', desc: 'Pickup → Direct Delivery' },
            { type: 'Branch', label: '🏢 Hub to Hub', desc: 'Branch → Sort → Branch' },
          ].map(({ type, label, desc }) => (
            <button
              key={type}
              onClick={() => setTransferType(type)}
              className={`px-5 py-2 text-[10px] font-black rounded-md flex flex-col items-center transition-all ${transferType === type ? 'bg-[#FFCC00] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <span className="uppercase tracking-[0.15em]">{label}</span>
              <span className={`text-[8px] font-bold mt-0.5 ${transferType === type ? 'text-black/60' : 'text-gray-600'}`}>{desc}</span>
            </button>
          ))}
        </div>
        <span className="text-xs font-bold text-gray-500">Creating as: <span className="text-[#FFCC00]">{user?.name || 'Admin'} ({user?.role || 'Admin'})</span></span>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">

        {/* ── Main Form ── */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* SENDER */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint className="text-[#FFCC00]" size={18} />
                <div>
                  <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Sender Details</h2>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Who is sending this shipment?</p>
                </div>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200/60">
                {['guest', 'registered'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => { setSenderMode(mode); clearSender(); }}
                    className={`px-4 py-1.5 text-xs font-black rounded-md transition-all uppercase tracking-widest ${senderMode === mode ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {mode === 'guest' ? 'Guest' : 'Registered'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {senderMode === 'guest' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Sender Name *</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                      <input type="text" placeholder="Full name or company" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Contact Phone</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                      <input type="text" placeholder="Mobile or landline" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Sender Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16} />
                      <input type="text" placeholder="Full address" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Search Registered Customer *</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={senderSearch}
                        onChange={e => { setSenderSearch(e.target.value); setShowSenderDropdown(true); setSelectedSender(null); }}
                        onFocus={() => setShowSenderDropdown(true)}
                        placeholder="Search by name, phone, or email..."
                        className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-xl py-3 pl-11 pr-11 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20"
                      />
                      {senderSearch && (
                        <button onClick={clearSender} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                          <X size={15} />
                        </button>
                      )}
                    </div>
                    {showSenderDropdown && senderResults.length > 0 && !selectedSender && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 relative">
                        {senderResults.map(u => (
                          <button key={u.id} onClick={() => selectSender(u)} className="w-full flex items-center gap-4 p-4 hover:bg-[#FFFBEB] text-left border-b border-gray-50 last:border-0 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-xs shrink-0">
                              {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-gray-900 truncate">{u.name}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widests font-bold">{u.phone} · {u.type}</p>
                            </div>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widests shrink-0 border border-gray-100 px-2 py-0.5 rounded-md">{u.id}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSender && (
                    <div className="bg-[#FFFBEB] border-2 border-[#FFCC00] rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFCC00]/10 rounded-bl-full pointer-events-none"></div>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-lg shadow-xl shrink-0">
                          {selectedSender.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-gray-900 text-base tracking-tight">{selectedSender.name}</h4>
                            <span className="text-[9px] font-black text-[#9A7B00] bg-[#FFCC00]/20 border border-[#FFCC00]/40 px-2 py-0.5 rounded uppercase tracking-widests">{selectedSender.id}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><Phone size={11} />{selectedSender.phone}</p>
                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><Mail size={11} />{selectedSender.email}</p>
                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><MapPin size={11} />{selectedSender.address}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <CheckCircle2 size={22} className="text-[#FFCC00]" />
                          <button onClick={clearSender} className="text-[10px] text-gray-400 hover:text-red-500 font-black uppercase tracking-widests transition-colors">Change</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── MULTI-ITEM SECTION ── */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <div>
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                  <Boxes size={16} className="text-violet-500" /> Shipment Items
                </h2>
                <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Each item can have its own pickup and drop-off address.</p>
              </div>
              <button
                onClick={addItem}
                className="flex items-center gap-2 bg-[#111] hover:bg-black text-[#FFCC00] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widests transition-all shadow-sm"
              >
                <Plus size={14} strokeWidth={3} /> Add Item
              </button>
            </div>

            {items.map((item, idx) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Item Header */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => toggleCollapse(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 font-black text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {item.description || `Item ${idx + 1}`}
                        {item.packaging && <span className="text-gray-400 font-medium ml-2 text-xs">· {item.packaging}</span>}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {item.pickupAddress ? `📍 ${item.pickupAddress.slice(0, 35)}${item.pickupAddress.length > 35 ? '...' : ''}` : 'Pickup address not set'}
                        {item.dropoffAddress && ` → ${item.dropoffAddress.slice(0, 25)}...`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    {item.collapsed
                      ? <ChevronDown size={18} className="text-gray-400" />
                      : <ChevronUp size={18} className="text-gray-400" />
                    }
                  </div>
                </div>

                {/* Item Form — collapsed/expanded */}
                {!item.collapsed && (
                  <div className="border-t border-gray-50 p-5 flex flex-col gap-5">

                    {/* Description & Packaging */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Item Description *</label>
                        <input
                          type="text"
                          placeholder="e.g. Toyota Camry 2020, Electronics pallet, Furniture set"
                          value={item.description}
                          onChange={e => updateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Packaging Type</label>
                        <select
                          value={item.packaging}
                          onChange={e => updateItem(item.id, 'packaging', e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20 appearance-none cursor-pointer"
                        >
                          {PACKAGING_TYPES.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={e => updateItem(item.id, 'qty', e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Weight (KG)</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={item.weight}
                          onChange={e => updateItem(item.id, 'weight', e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                    </div>

                    {/* Pickup Address */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-blue-700 uppercase tracking-widests flex items-center gap-1.5">
                          <MapPin size={12} /> Pickup Address *
                        </label>
                        <div className="flex items-center gap-2">
                          {selectedSender && (
                            <button
                              onClick={() => copyPickupFromSender(item.id)}
                              className="text-[9px] font-black uppercase tracking-widests px-2.5 py-1 rounded border border-blue-200 bg-white text-blue-600 hover:bg-blue-100 transition-all flex items-center gap-1"
                            >
                              <Copy size={10} /> Same as Sender
                            </button>
                          )}
                          {idx > 0 && (
                            <button
                              onClick={() => copyPickupFromPrev(idx, item.id)}
                              className="text-[9px] font-black uppercase tracking-widests px-2.5 py-1 rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-1"
                            >
                              <Copy size={10} /> Same as Item {idx}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                        <input
                          type="text"
                          placeholder="Full pickup address..."
                          value={item.pickupAddress}
                          onChange={e => updateItem(item.id, 'pickupAddress', e.target.value)}
                          className="w-full bg-white border border-blue-200 focus:border-blue-400 rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    {/* Drop-off Address */}
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-emerald-700 uppercase tracking-widests flex items-center gap-1.5">
                          <Navigation size={12} /> Drop-off Address *
                        </label>
                        {idx > 0 && (
                          <button
                            onClick={() => copyDropoffFromPrev(idx, item.id)}
                            className="text-[9px] font-black uppercase tracking-widests px-2.5 py-1 rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-1"
                          >
                            <Copy size={10} /> Same as Item {idx}
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                        <input
                          type="text"
                          placeholder="Full drop-off address..."
                          value={item.dropoffAddress}
                          onChange={e => updateItem(item.id, 'dropoffAddress', e.target.value)}
                          className="w-full bg-white border border-emerald-200 focus:border-emerald-400 rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      {/* Hub-to-Hub branch selector per item */}
                      {transferType === 'Branch' && (
                        <div className="relative group mt-1">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                          <select
                            value={item.targetBranch || ''}
                            onChange={e => updateItem(item.id, 'targetBranch', e.target.value)}
                            className="w-full bg-white border border-emerald-200 focus:border-emerald-400 rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                          >
                            <option value="">Select Destination Branch...</option>
                            <option value="SYD-CENTRAL">Sydney Central Hub (SYD)</option>
                            <option value="MEL-HUB">Melbourne Hub (MEL)</option>
                            <option value="BNE-PORT">Brisbane Port Branch (BNE)</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            ))}

            {/* Add Item CTA */}
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

          {/* Order Summary */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl group-hover:bg-[#FFCC00]/20 transition-all"></div>
            <h3 className="text-xs font-black uppercase tracking-widests mb-4 text-[#FFCC00] flex items-center justify-center gap-2 border-b border-white/10 pb-4">
              <Box size={16} /> Order Summary
            </h3>

            {/* Item Quick List */}
            <div className="space-y-2 mb-5 max-h-48 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded bg-violet-500/20 text-violet-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{idx + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.description || `Item ${idx + 1}`}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">{item.qty} × {item.packaging}</p>
                    {item.dropoffAddress && (
                      <p className="text-[9px] text-gray-600 mt-0.5 truncate">→ {item.dropoffAddress}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widests font-bold mb-1">Total Items</p>
                  <p className="text-xl font-black text-white">{totalQty}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widests font-bold mb-1">Total Weight</p>
                  <p className="text-xl font-black text-white">{totalWeight > 0 ? `${totalWeight} KG` : '—'}</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widests mb-2">Delivery Priority</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Low', 'Normal', 'High', 'Urgent'].map(l => (
                    <button
                      key={l}
                      onClick={() => setPriority(l)}
                      className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widests border transition-all ${priority === l ? 'bg-[#FFCC00] text-black border-transparent shadow-sm' : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widests mb-2 flex items-center gap-1.5"><CreditCard size={12} /> Payment</label>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                  {['Sender', 'Receiver'].map(t => (
                    <button
                      key={t}
                      onClick={() => setPaymentBy(t)}
                      className={`flex-1 py-2 rounded-md text-[10px] font-black uppercase tracking-widests transition-all ${paymentBy === t ? 'bg-[#FFCC00] text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    >
                      {t} Pays
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between items-end pb-2 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widests">Base ({items.length} stops)</span>
                  <span className="text-lg font-black text-white">${(items.length * 420).toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-end pb-2 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widests">Priority Fee</span>
                  <span className={`text-sm font-black ${['High', 'Urgent'].includes(priority) ? 'text-[#FFCC00]' : 'text-gray-500'}`}>
                    {['High', 'Urgent'].includes(priority) ? '+$250.00' : '$0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-1">
                  <span className="text-xs font-black uppercase text-[#FFCC00] tracking-widests">Total</span>
                  <span className="text-2xl font-black text-white">
                    ${(items.length * 420 + (['High', 'Urgent'].includes(priority) ? 250 : 0)).toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col gap-5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widests flex items-center gap-2">
              <Shield size={16} className="text-emerald-500" /> Terms & Conditions
            </h3>
            <p className="text-xs font-medium text-gray-600 leading-relaxed">
              By creating this shipment, you confirm all items are correctly declared and do not contain restricted, illegal, or undeclared dangerous materials.
            </p>
            {items.some(i => i.packaging === 'Dangerous Goods') && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-red-700">Dangerous Goods detected. A certified driver with DG certification will be required.</p>
              </div>
            )}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-yellow-400 cursor-pointer" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widests group-hover:text-gray-900 transition-colors">I confirm all details are correct</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
