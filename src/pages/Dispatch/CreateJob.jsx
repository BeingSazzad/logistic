import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, MapPin, 
  Package, DollarSign,
  Navigation, Scale, Box, User, Phone,
  Layers, Fingerprint, Shield, Search,
  CheckCircle2, X, ChevronDown, Mail, CreditCard, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock registered user/customer DB
const REGISTERED_USERS = [
  { id: 'CUS-001', name: 'Acme Corp Logistics', contact: 'James Hargrove', email: 'james@acme.com.au', phone: '+61 2 9283 1122', address: 'Warehouse 4, 12 Botany Rd, Alexandria NSW 2015', type: 'Business' },
  { id: 'CUS-002', name: 'Tech Solutions Ltd', contact: 'Tom Carey', email: 'tom@techsol.com', phone: '+61 2 9666 0011', address: '1 Innovation Dr, Port Botany NSW 2036', type: 'Business' },
  { id: 'CUS-003', name: 'Fresh Markets AU', contact: 'Ben Chu', email: 'ben@freshmarkets.com.au', phone: '+61 2 9764 1230', address: '250 Parramatta Rd, Flemington NSW 2140', type: 'Business' },
  { id: 'CUS-004', name: 'Southport Logistics', contact: 'Sarah Miller', email: 'sarah@southport.com', phone: '+61 7 5582 9900', address: 'Bay 12, 45 Ferry Rd, Southport QLD 4215', type: 'Business' },
  { id: 'CUS-005', name: 'Michael Chen', contact: 'Michael Chen', email: 'm.chen@gmail.com', phone: '+61 412 345 678', address: '22 Bondi Rd, Bondi NSW 2026', type: 'Individual' },
];

export default function DispatchCreateJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');
  const [paymentBy, setPaymentBy] = useState('Sender');
  const [directDropoff, setDirectDropoff] = useState(true);

  // Sender mode: 'guest' | 'registered'
  const [senderMode, setSenderMode] = useState('registered');
  const [transferType, setTransferType] = useState('Branch'); // 'Branch' or 'Direct'
  const [targetBranch, setTargetBranch] = useState('');
  const [senderSearch, setSenderSearch] = useState('');
  const [selectedSender, setSelectedSender] = useState(null);
  const [showSenderDropdown, setShowSenderDropdown] = useState(false);

  const senderResults = REGISTERED_USERS.filter(u =>
    senderSearch.length > 1 && (
      u.name.toLowerCase().includes(senderSearch.toLowerCase()) ||
      u.phone.includes(senderSearch) ||
      u.email.toLowerCase().includes(senderSearch.toLowerCase())
    )
  );

  const selectSender = (user) => {
    setSelectedSender(user);
    setSenderSearch(user.name);
    setShowSenderDropdown(false);
  };

  const clearSender = () => {
    setSelectedSender(null);
    setSenderSearch('');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Shipment</h1>
               <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-2.5 py-1 rounded-md uppercase tracking-widest">Draft</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Enter shipment details and assign to a driver.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/dispatch/jobs')} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm">
            Cancel
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <Save size={18} strokeWidth={2.5}/> Create Shipment
          </button>
        </div>
      </div>

      {/* Creator Accountability Banner */}
      <div className="bg-[#111] border border-gray-800 rounded-lg p-3 flex justify-between items-center px-4 mb-2 shadow-sm text-white">
         <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 shrink-0">
            {['Branch', 'Direct'].map(type => (
              <button
                key={type}
                onClick={() => setTransferType(type)}
                className={`px-6 py-1.5 text-[10px] font-black rounded uppercase tracking-[0.2em] transition-all ${transferType === type ? 'bg-[#FFCC00] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {type === 'Branch' ? 'Branch to Branch' : 'Direct Delivery'}
              </button>
            ))}
         </div>
         <span className="text-xs font-bold text-gray-500">Creating as: <span className="text-[#FFCC00]">{user?.name || 'Dispatcher'} ({user?.role || 'Dispatch'})</span></span>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">
        
        {/* ── Main Form ── */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           
          {/* SENDER */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Fingerprint className="text-[#FFCC00]" size={18} />
                  <div>
                    <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Sender Details</h2>
                    <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Who is sending this package?</p>
                  </div>
               </div>
               {/* Mode Toggle */}
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
                /* Guest Mode */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Sender Name *</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                      <input type="text" placeholder="Full name or company" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Phone</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                      <input type="text" placeholder="Mobile or landline" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pickup Address</label>
                      <button 
                        onClick={() => setDirectDropoff(!directDropoff)}
                        className={`text-[9px] font-black uppercase tracking-tight px-2 py-0.5 rounded transition-all border ${!directDropoff ? 'bg-black text-[#FFCC00] border-black' : 'bg-white text-gray-400 border-gray-200'}`}
                      >
                        {!directDropoff ? '✓ Pickup Service' : '+ Add Pickup Address'}
                      </button>
                    </div>
                    {!directDropoff ? (
                      <div className="relative group animate-in slide-in-from-top-1 duration-200">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                        <input type="text" placeholder="Full address" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-center">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Customer is bringing parcel to branch</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Registered User Mode */
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Search Registered Customer *</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
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

                    {/* Dropdown Results */}
                    {showSenderDropdown && senderResults.length > 0 && !selectedSender && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 relative">
                        {senderResults.map(u => (
                          <button
                            key={u.id}
                            onClick={() => selectSender(u)}
                            className="w-full flex items-center gap-4 p-4 hover:bg-[#FFFBEB] text-left border-b border-gray-50 last:border-0 transition-all"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-xs shrink-0">
                              {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-gray-900 truncate">{u.name}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{u.phone} · {u.type}</p>
                            </div>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest shrink-0 border border-gray-100 px-2 py-0.5 rounded-md">{u.id}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {showSenderDropdown && senderSearch.length > 1 && senderResults.length === 0 && !selectedSender && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                        <p className="text-sm font-bold text-gray-400">No matching customers found</p>
                        <p className="text-[10px] text-gray-400 mt-1">Try a different name, phone or email</p>
                      </div>
                    )}
                  </div>

                  {/* Selected Customer Card */}
                  {selectedSender && (
                    <div className="bg-[#FFFBEB] border-2 border-[#FFCC00] rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFCC00]/10 rounded-bl-full pointer-events-none"></div>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-lg shadow-xl shrink-0">
                          {selectedSender.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-gray-900 text-base tracking-tight">{selectedSender.name}</h4>
                            <span className="text-[9px] font-black text-[#9A7B00] bg-[#FFCC00]/20 border border-[#FFCC00]/40 px-2 py-0.5 rounded uppercase tracking-widest">{selectedSender.id}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><Phone size={11}/>{selectedSender.phone}</p>
                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><Mail size={11}/>{selectedSender.email}</p>
                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><MapPin size={11}/>{selectedSender.address}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <CheckCircle2 size={22} className="text-[#FFCC00]" />
                          <button onClick={clearSender} className="text-[10px] text-gray-400 hover:text-red-500 font-black uppercase tracking-widest transition-colors">
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RECEIVER */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
              <Navigation className="text-blue-500" size={18} />
              <div>
                <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Receiver Details</h2>
                <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Where is this package going?</p>
              </div>
            </div>
            <div className="p-6">
              {transferType === 'Branch' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Target Receiving Branch *</label>
                    <div className="relative group">
                       <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                       <select 
                         value={targetBranch}
                         onChange={(e) => setTargetBranch(e.target.value)}
                         className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 pl-11 pr-4 text-sm font-black text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                       >
                         <option value="">Select Destination Branch...</option>
                         <option value="HUB-SYD">Sydney Central Hub (HUB-SYD)</option>
                         <option value="STA-MEL">Melbourne North Station (STA-MEL)</option>
                         <option value="STA-BRI">Brisbane Port Station (STA-BRI)</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-3">
                     <Shield className="text-blue-500 shrink-0 mt-0.5" size={16} />
                     <div>
                        <p className="text-[10px] font-black uppercase text-blue-700 tracking-widest">Internal Logistics Protocol</p>
                        <p className="text-[10px] text-blue-600 mt-1 font-medium">Branch transfers are prioritized for internal fleet movements. Delivery details will be managed by the destination hub.</p>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Receiver Name *</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                      <input type="text" placeholder="Full name or company name" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Email / Phone</label>
                    <input type="text" placeholder="Tracking alerts will be sent here" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Drop-off Address *</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                      <input type="text" placeholder="Full address" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cargo */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
              <Layers className="text-violet-500" size={18} />
              <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Shipment Items</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Item Description *</label>
                <textarea rows="3" placeholder="What are you sending? (e.g., 2 boxes of clothes, 1 pallet of electronics)" className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Packaging Type</label>
                <select className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20 appearance-none cursor-pointer">
                  <option>Pallets</option>
                  <option>Boxes / Cartons</option>
                  <option>Crates</option>
                  <option>Furniture / Loose Items</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Quantity</label>
                  <input type="number" placeholder="1" className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widests mb-1.5 ml-1">Weight (KG)</label>
                  <input type="number" placeholder="0" className="w-full bg-white border border-gray-200 focus:border-violet-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           
          {/* Summary */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl group-hover:bg-[#FFCC00]/20 transition-all"></div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-[#FFCC00] flex items-center justify-center gap-2 border-b border-white/10 pb-4">
               <Box size={16}/> Network Transit Order
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widests mb-2">Delivery Priority</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Low', 'Normal', 'High', 'Urgent'].map(l => (
                    <button 
                      key={l}
                      onClick={() => setPriority(l)}
                      className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${priority === l ? 'bg-[#FFCC00] text-black border-transparent shadow-sm' : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widests mb-2 flex items-center gap-1.5"><CreditCard size={12}/> Payment Responsibility</label>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                  {['Sender', 'Receiver'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setPaymentBy(t)}
                      className={`flex-1 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${paymentBy === t ? 'bg-[#FFCC00] text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    >
                      {t} Pays
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10 mt-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widests">Base Price</span>
                  <span className="text-lg font-black text-white">$1,420.00</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widests">Extra Fees</span>
                  <span className={`text-sm font-black transition-all ${['High','Urgent'].includes(priority) ? 'text-[#FFCC00]' : 'text-gray-500'}`}>+$250.00</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-black uppercase text-[#FFCC00] tracking-widests">Total Price</span>
                  <span className="text-2xl font-black text-white">$1,670.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col gap-5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <Shield size={16} className="text-emerald-500"/> Terms & Conditions
            </h3>
            <p className="text-xs font-medium text-gray-600 leading-relaxed">
              By creating this shipment, you confirm that the items do not contain any restricted, illegal, or dangerous materials.
            </p>
            <div className="pt-4 border-t border-gray-100">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-yellow-400 cursor-pointer"/>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">I confirm all details are correct</span>
               </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
