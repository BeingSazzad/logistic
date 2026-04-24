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
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="hero-h1">Load Inbox</h1>
            {pendingCount > 0 && (
              <span className="text-xs font-semibold bg-brand text-black px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse shadow-sm shadow-brand/30">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="hero-body text-gray-600 mt-1">
            Field-submitted draft loads — Review &amp; convert to active
          </p>
        </div>
        <button
          onClick={() => navigate('/dispatch/loads/create')}
          className="btn btn-dark"
        >
          <Plus size={16} /> New Manual Load
        </button>
      </div>

      <div className="w-full h-px bg-gray-100" />

      {/* ── Filters ── */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 lg:w-80 lg:flex-none">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, Driver, or Origin..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-hero-sm py-2 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-gray-50 p-1 rounded-hero-sm border border-gray-200 shadow-inner">
          {['All', 'Pending', 'High'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-widest transition-all ${
                filter === f ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Inbox List ── */}
      <div className="flex flex-col gap-5">
        {drafts.length === 0 ? (
          <div className="card p-16 flex flex-col items-center text-center">
            <Inbox size={48} className="text-gray-200 mb-4" strokeWidth={1.5} />
            <h3 className="text-base font-semibold text-gray-900">Inbox is Empty</h3>
            <p className="hero-body text-gray-600 mt-1">No pending drafts from field drivers.</p>
          </div>
        ) : (
          drafts.map(draft => {
            const state    = getState(draft.id);
            const urgCfg   = URGENCY_STYLE[draft.urgency] || URGENCY_STYLE.Normal;
            const expanded = expandedId === draft.id;

            return (
              <div
                key={draft.id}
                className={`card relative overflow-hidden transition-all ${
                  state === 'approved' ? 'border-emerald-100 opacity-80' :
                  state === 'rejected' ? 'border-red-100 opacity-60' :
                  'border-gray-100 hover:border-gray-300'
                }`}
              >
                {/* Top bar indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 w-full ${
                  draft.urgency === 'High' ? 'bg-red-400' : 'bg-brand'
                }`} />

                <div className="p-5 mt-1">
                  {/* Row 1: id + status + time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-hero-sm flex items-center justify-center border-2 ${
                        state === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-500' :
                        state === 'rejected' ? 'bg-red-50 border-red-100 text-red-500' :
                        'bg-brand/10 border-brand/20 text-brand'
                      }`}>
                        {state === 'approved' ? <CheckCircle2 size={18} /> :
                         state === 'rejected'  ? <X size={18} /> :
                                                 <Clock size={18} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-gray-900 text-lg tracking-tight leading-none">{draft.id}</h3>
                          {draft.urgency === 'High' && (
                            <span className={`text-xs font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm border ${urgCfg.badge} flex items-center gap-1`}>
                              <AlertCircle size={10} /> Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-gray-500 mt-1.5">{draft.submittedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {state === 'pending' && (
                        <>
                          <button
                            onClick={() => setRejected(r => [...r, draft.id])}
                            className="w-11 h-11 flex items-center justify-center rounded-hero-sm border border-red-100 text-red-400 hover:bg-red-50 transition-all"
                          >
                            <X size={18} />
                          </button>
                          <button
                            onClick={() => setApproved(a => [...a, draft.id])}
                            className="btn-sm bg-brand text-black uppercase tracking-widest shadow-sm hover:brightness-105"
                          >
                            <CheckCircle2 size={16} /> Approve
                          </button>
                        </>
                      )}
                      {state === 'approved' && (
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                          <CheckCircle2 size={14} /> Converted
                        </span>
                      )}
                      {state === 'rejected' && (
                        <span className="text-xs font-semibold text-red-500 uppercase tracking-widest flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
                          <X size={14} /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: meta chips */}
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-md">
                      <User size={12} className="text-gray-400" /> {draft.driver}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-md">
                      <Car size={12} className="text-gray-400" /> {draft.vehicleCount} Units
                    </span>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 border border-blue-100 rounded-md">
                      <span className="flex items-center gap-1 text-xs font-medium text-blue-700">
                         {draft.origin.split(' ')[0]}
                      </span>
                      <ArrowRight size={10} className="text-blue-300" />
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                         {draft.dest.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Expand / VINs */}
                  <button
                    onClick={() => setExpandedId(expanded ? null : draft.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-hero-sm bg-gray-50 border border-gray-100 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    <span>View VIN Manifest ({draft.vins.length})</span>
                    <ChevronRight size={14} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
                  </button>

                  {expanded && (
                    <div className="mt-3 space-y-2">
                      {draft.vins.map((vin, i) => (
                        <div key={vin} className="flex items-center gap-4 bg-white border border-gray-100 rounded-hero-sm px-4 py-2.5 shadow-sm">
                          <span className="text-xs font-medium text-gray-300 w-5">#{i + 1}</span>
                          <span className="font-mono text-xs font-semibold text-gray-900 tracking-widest flex-1">{vin}</span>
                          <CheckCircle2 size={14} className="text-emerald-400" />
                        </div>
                      ))}
                      {draft.notes && (
                        <div className="mt-2 bg-amber-50/50 border border-amber-100 rounded-hero-sm px-4 py-3">
                          <p className="text-xs font-semibold text-amber-600 mb-0.5">Driver Notes</p>
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


