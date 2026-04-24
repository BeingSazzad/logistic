import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox, Search,
  Clock, Car, MapPin, AlertCircle, ChevronRight,
  User, Plus, X, CheckCircle2, ArrowRight
} from 'lucide-react';

const MOCK_INBOX = [
  {
    id: 'DRAFT-1092',
    driver: 'Michael Chen',
    submittedAt: '10 mins ago',
    vehicleCount: 2,
    vins: ['1HGCM82633A004352', '2T1BURHE0JC034820'],
    origin: 'Melbourne Depot (MEL-HUB)',
    dest: 'Brisbane QLD',
    status: 'Pending Review',
    urgency: 'High',
    notes: 'Customer confirmed urgent. Two sedans, both undamaged.'
  },
  {
    id: 'DRAFT-1091',
    driver: 'Sarah Connor',
    submittedAt: '45 mins ago',
    vehicleCount: 1,
    vins: ['3FADP4BJ7FM123456'],
    origin: 'Sydney Central (SYD-CENTRAL)',
    dest: 'Perth WA',
    status: 'Pending Review',
    urgency: 'Normal',
    notes: 'Oversize Ute. Requires flatbed trailer.'
  },
  {
    id: 'DRAFT-1088',
    driver: 'James Park',
    submittedAt: '2 hrs ago',
    vehicleCount: 4,
    vins: ['5YJSA1DG9PFJ12345', '1N4AL3AP7JC234567', '1HGCM82633A004352', '3FADP4BJ7FM123456'],
    origin: 'Brisbane Port (BNE-PORT)',
    dest: 'Adelaide SA',
    status: 'Pending Review',
    urgency: 'Normal',
    notes: 'Port pickup. Vehicles in compound storage.'
  },
];

const URGENCY_STYLE = {
  High:   { badge: 'bg-red-50 text-red-600 border-red-100',    icon: AlertCircle },
  Normal: { badge: 'bg-gray-100 text-gray-500 border-gray-200', icon: Clock },
};

export default function DispatchLoadInbox() {
  const navigate = useNavigate();
  const [search, setSearch]     = useState('');
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter]     = useState('All');

  const drafts = MOCK_INBOX.filter(d => {
    const q = search.toLowerCase();
    const matchQ = !q || d.id.toLowerCase().includes(q) || d.driver.toLowerCase().includes(q) || d.origin.toLowerCase().includes(q);
    const matchF = filter === 'All' || (filter === 'High' && d.urgency === 'High') || (filter === 'Pending' && !approved.includes(d.id) && !rejected.includes(d.id));
    return matchQ && matchF;
  });

  const pendingCount = MOCK_INBOX.filter(d => !approved.includes(d.id) && !rejected.includes(d.id)).length;

  const getState = (id) => {
    if (approved.includes(id)) return 'approved';
    if (rejected.includes(id)) return 'rejected';
    return 'pending';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-start mb-2 px-2">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Load Inbox</h1>
            {pendingCount > 0 && (
              <span className="text-[10px] font-black bg-[#FFCC00] text-black px-3 py-1.5 rounded-xl uppercase tracking-widest animate-pulse shadow-lg shadow-yellow-200">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">
            Field-submitted draft loads — Review & convert to active
          </p>
        </div>
        <button
          onClick={() => navigate('/dispatch/loads/create')}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#111] text-[#FFCC00] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
        >
          <Plus size={16} /> New Manual Load
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2" />

      {/* ── Filters ── */}
      <div className="flex items-center gap-4 flex-wrap px-2">
        <div className="relative flex-1 max-w-sm group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" />
          <input
            type="text"
            placeholder="Search by ID, Driver, or Origin..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#FFCC00]/10 focus:border-[#FFCC00] transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner">
          {['All', 'Pending', 'High'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f ? 'bg-white text-gray-900 shadow-md border border-gray-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Inbox List ── */}
      <div className="flex flex-col gap-4 px-2">
        {drafts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-24 flex flex-col items-center text-center">
            <Inbox size={56} className="text-gray-200 mb-4" strokeWidth={1} />
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Inbox is Empty</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">No pending drafts from field drivers.</p>
          </div>
        ) : (
          drafts.map(draft => {
            const state    = getState(draft.id);
            const urgCfg   = URGENCY_STYLE[draft.urgency] || URGENCY_STYLE.Normal;
            const expanded = expandedId === draft.id;

            return (
              <div
                key={draft.id}
                className={`bg-white rounded-[2rem] border shadow-xl overflow-hidden transition-all ${
                  state === 'approved' ? 'border-emerald-100 opacity-70' :
                  state === 'rejected' ? 'border-red-100 opacity-50' :
                  'border-gray-100 hover:shadow-2xl'
                }`}
              >
                {/* Top bar indicator */}
                <div className={`h-1 w-full ${
                  draft.urgency === 'High' ? 'bg-red-400' : 'bg-amber-400'
                }`} />

                <div className="p-6">
                  {/* Row 1: id + status + time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
                        state === 'approved' ? 'bg-emerald-50 border-emerald-100' :
                        state === 'rejected' ? 'bg-red-50 border-red-100' :
                        'bg-amber-50 border-amber-100'
                      }`}>
                        {state === 'approved' ? <CheckCircle2 size={22} className="text-emerald-500" /> :
                         state === 'rejected'  ? <X size={22} className="text-red-500" /> :
                                                 <Clock size={22} className="text-amber-500" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-mono font-black text-gray-900 text-lg tracking-tight leading-none">{draft.id}</h3>
                          {draft.urgency === 'High' && (
                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-xl border ${urgCfg.badge} flex items-center gap-1`}>
                              <AlertCircle size={10} /> Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{draft.submittedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {state === 'pending' && (
                        <>
                          <button
                            onClick={() => setRejected(r => [...r, draft.id])}
                            className="p-3 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-all"
                          >
                            <X size={18} />
                          </button>
                          <button
                            onClick={() => setApproved(a => [...a, draft.id])}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FFCC00] text-black text-[10px] font-black uppercase tracking-[0.1em] shadow-lg hover:bg-yellow-400 active:scale-[0.97] transition-all"
                          >
                            <CheckCircle2 size={16} /> Approve & Convert
                          </button>
                        </>
                      )}
                      {state === 'approved' && (
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={16} /> Converted to Load
                        </span>
                      )}
                      {state === 'rejected' && (
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                          <X size={16} /> Draft Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: meta chips */}
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                      <User size={13} /> {draft.driver}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                      <Car size={13} /> {draft.vehicleCount} Vehicles
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-2 rounded-xl">
                      <MapPin size={13} /> {draft.origin}
                    </span>
                    <ArrowRight size={14} className="text-gray-300" />
                    <span className="flex items-center gap-2 text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl">
                      <MapPin size={13} /> {draft.dest}
                    </span>
                  </div>

                  {/* Expand / VINs */}
                  <button
                    onClick={() => setExpandedId(expanded ? null : draft.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    <span>View VIN Manifest ({draft.vins.length})</span>
                    <ChevronRight size={16} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
                  </button>

                  {expanded && (
                    <div className="mt-4 space-y-2">
                      {draft.vins.map((vin, i) => (
                        <div key={vin} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
                          <span className="text-[9px] font-black text-gray-300 uppercase w-5">#{i + 1}</span>
                          <span className="font-mono text-sm font-black text-gray-900 tracking-widest flex-1">{vin}</span>
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>
                      ))}
                      {draft.notes && (
                        <div className="mt-3 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4">
                          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">Driver Notes</p>
                          <p className="text-xs font-bold text-amber-900">{draft.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
