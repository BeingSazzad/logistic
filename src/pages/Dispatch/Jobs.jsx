import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Plus, Clock,
  MapPin, ChevronDown, AlertTriangle,
  CheckCircle2, UserCheck, Inbox, Zap,
  ArrowRight, AlertCircle, Users, Lock, ShieldCheck, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const QUEUES = [
  { id: 'unassigned', label: 'Unassigned',     icon: Inbox,       color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200', desc: 'Booked – awaiting driver assignment' },
  { id: 'assigned',   label: 'In Transit',     icon: Zap,          color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Assigned & physically moving' },
  { id: 'exception',  label: 'Exceptions',     icon: AlertCircle,  color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    desc: 'Delayed or arrival issues' },
  { id: 'completed',  label: 'Received',       icon: CheckCircle2, color: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-200',   desc: 'Handover complete / Delivered' },
];

export default function DispatchJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [queue, setQueue] = useState('unassigned');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const rawJobs = [
    // Unassigned (confirmed, no driver yet)
    { id: 'SHP-9055', branchId: 'SYD-CENTRAL', customer: 'Acme Freight Co', origin: 'Sydney Depot', dest: 'Canberra Branch', queue: 'unassigned', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: '11:00 AM', window: '12:00–14:00', load: '6.2t', notes: 'Temperature-controlled cargo' },
    { id: 'SHP-9054', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'unassigned', driver: null, vehicle: null, priority: 'Medium', eta: '—', pickup: '12:30 PM', window: '13:00–15:00', load: '2.1t', notes: '' },
    { id: 'SHP-9053', branchId: 'SYD-CENTRAL', customer: 'Fresh Markets AU', origin: 'Sydney Depot', dest: 'Randwick Branch', queue: 'unassigned', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: '09:00 AM', window: '10:00–11:30', load: '4.8t', notes: 'Perishables — strict window' },

    // Assigned (active trips)
    { id: 'SHP-9042', branchId: 'SYD-CENTRAL', customer: 'Acme Corp Logistics', origin: 'Sydney Depot', dest: 'Melbourne Branch', queue: 'assigned', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', eta: '14:30', pickup: '06:00 AM', window: 'Deliver by 16:00', load: '18.4t', notes: '' },
    { id: 'SHP-9035', branchId: 'SYD-CENTRAL', customer: 'Southport Logistics', origin: 'Adelaide Depot', dest: 'Sydney Depot', queue: 'assigned', driver: 'Oliver Brown', vehicle: 'V-102', priority: 'High', eta: 'Arrived at Branch', pickup: '05:00 AM', window: 'Delivered by 11:00', load: '12.0t', notes: '' },

    // Exception
    { id: 'SHP-9041', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'exception', driver: 'Liam Smith', vehicle: 'BGT-221', priority: 'Medium', eta: 'Delayed', pickup: '07:00 AM', window: 'Deliver by 14:00', load: '9.5t', notes: 'Driver reports heavy traffic — ETA +1h', exception: 'Delay' },
    { id: 'SHP-9048', branchId: 'SYD-CENTRAL', customer: 'Blue River Exports', origin: 'Sydney Depot', dest: 'Sydney Depot', queue: 'exception', driver: 'Lucas Jones', vehicle: 'TRK-08', priority: 'High', eta: 'GPS Lost', pickup: '04:00 AM', window: 'Deliver by 09:00', load: '14.2t', notes: 'No GPS update for 18 minutes', exception: 'GPS Lost' },

    // Completed
    { id: 'SHP-9039', branchId: 'SYD-CENTRAL', customer: 'Global Traders AU', origin: 'Brisbane Depot', dest: 'Gold Coast Branch', queue: 'completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', eta: 'Received at Branch', pickup: '03:00 AM', window: 'Deliver by 08:00', load: '5.5t', notes: '' },
  ];

  const branchJobs = useMemo(() =>
    rawJobs.filter(j => j.branchId === user.branchId),
  [user.branchId]);

  const counts = useMemo(() => ({
    unassigned: branchJobs.filter(j => j.queue === 'unassigned').length,
    assigned:   branchJobs.filter(j => j.queue === 'assigned').length,
    exception:  branchJobs.filter(j => j.queue === 'exception').length,
    completed:  branchJobs.filter(j => j.queue === 'completed').length,
  }), [branchJobs]);

  const filtered = useMemo(() => {
    return branchJobs.filter(j => {
      const matchesQueue  = j.queue === queue;
      const matchesSearch = !search || `${j.id} ${j.customer} ${j.driver || ''}`.toLowerCase().includes(search.toLowerCase());
      return matchesQueue && matchesSearch;
    });
  }, [branchJobs, queue, search]);

  const priorityStyle = (p) => {
    if (p === 'High')   return 'bg-red-50 text-red-600 border-red-100';
    if (p === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-gray-50 text-gray-500 border-gray-100';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-hero-sm text-hero-dark shadow-sm">
            <Package size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Shipment Queue</h1>
            <p className="hero-body text-hero-neutral mt-1">{user.branchName} · Live dispatch operations and exception management</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dispatch/jobs/create')}
          className="btn btn-primary"
        >
          <Plus size={18} strokeWidth={3} /> Create Shipment
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Queue Selector Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUEUES.map(q => {
          const isActive = queue === q.id;
          const count = counts[q.id];
          return (
            <button
              key={q.id}
              onClick={() => setQueue(q.id)}
              className={`flex flex-col items-start p-5 rounded-xl border-2 transition-all text-left ${
            <button key={q.id} onClick={() => setQueue(q.id)}
              className={`card p-5 text-left flex flex-col gap-2 transition-all group overflow-hidden ${isActive ? 'ring-2 ring-brand border-brand shadow-lg ' + q.bg : 'hover:border-brand/40'}`}>
              <div className="flex justify-between items-center relative z-10">
                <q.icon size={20} className={isActive ? q.color : 'text-hero-neutral'} />
                <span className={`text-xl font-black ${isActive ? 'text-hero-dark' : 'text-hero-neutral'}`}>{counts[q.id]}</span>
              </div>
              <div className="relative z-10 mt-1">
                <p className={`hero-card-title ${isActive ? 'text-hero-dark' : 'text-hero-neutral'}`}>{q.label}</p>
                <p className="hero-metadata leading-tight text-hero-neutral group-hover:text-hero-dark transition-colors">{q.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
          <div className="flex-1">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{QUEUES.find(q=>q.id===queue)?.label}</h3>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5">{filtered.length} shipment{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full md:w-64 bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gr          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="btn btn-outline py-2.5 px-4"
              >
                <Filter size={14} /> Filter <ChevronDown size={14} className={`transition-transform ${showFilter ? 'rotate-180' : ''}`} />
              </button>
              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-hero-md shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1">
                    {['All Priorities', 'High Priority', 'Medium Priority', 'Critical Only'].map((opt) => (
                      <button key={opt} onClick={() => setShowFilter(false)} className="w-full text-left px-4 py-2 text-sm text-hero-dark hover:bg-brand/5 hover:text-hero-dark transition-colors font-medium border-b border-gray-50 last:border-0">{opt}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowSort(!showSort)}
                className="btn btn-outline py-2.5 px-4"
              >
                <ChevronDown size={14} className={`mr-2 transition-transform ${showSort ? 'rotate-180' : ''}`} /> Sort
              </button>
              {showSort && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-hero-md shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1">
                    {['ID (Asc)', 'ID (Desc)', 'Customer Name', 'Earliest Pickup'].map((opt) => (
                      <button key={opt} onClick={() => setShowSort(false)} className="w-full text-left px-4 py-2 text-sm text-hero-dark hover:bg-brand/5 hover:text-hero-dark transition-colors font-medium border-b border-gray-50 last:border-0">{opt}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>   </div>
          </div>
        </div>

        <div className="overflow-x-auto relative">
          {/* Floating Batch Action Bar */}
          {/* Floating Batch Action Bar */}
          {selectedIds.length > 0 && (
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-hero-dark text-white px-6 py-4 rounded-hero-lg shadow-2xl flex items-center gap-6 animate-in slide-in-from-top-4 duration-300 border border-white/10">
               <div className="flex items-center gap-3 border-r border-white/20 pr-6">
                  <div className="w-8 h-8 rounded-hero-sm bg-brand text-hero-dark flex items-center justify-center font-black">{selectedIds.length}</div>
                  <div>
                    <span className="hero-metadata text-brand">Operations Ready</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Ready for inter-branch transfer</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button className="bg-white/10 hover:bg-brand hover:text-hero-dark text-white px-4 py-2 rounded-hero-sm text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                     <Lock size={12} className="inline"/> Dispatch &amp; Lock IDs
                  </button>
                  <button className="btn btn-primary py-2 px-4 !rounded-hero-sm text-[10px]">
                     Create Dispatch List
                  </button>
               </div>
               <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={16}/></button>
            </div>
          )}

          <table className="w-full text-left">
            <thead className="hero-table-header">
              <tr>
                <th className="px-6 py-4 w-4">
                   <input 
                      type="checkbox" 
                      onChange={(e) => setSelectedIds(e.target.checked ? filtered.map(j => j.id) : [])}
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      className="w-4 h-4 rounded-hero-sm border-gray-300 accent-brand cursor-pointer"
                   />
                </th>
                <th className="px-6 py-4">Shipment Reference</th>
                <th className="px-6 py-4">Route Info</th>
                <th className="px-6 py-4">Weight/Load</th>
                <th className="px-6 py-4">Assigned Driver</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <Package size={36} strokeWidth={1} />
                      <p className="text-sm font-bold">No shipments in this queue</p>
                      <p className="text-[11px] font-medium">All clear for this terminal</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(job => (
                <tr
                  key={job.id}
                  className={`hover:bg-gray-50/80 transition-all cursor-pointer group border-l-4 ${selectedIds.includes(job.id) ? 'border-l-[#FFCC00] bg-yellow-50/20' : 'border-l-transparent'}`}
                  onClick={() => toggleSelect(job.id)}
                >
                  <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(job.id)}
                      onChange={() => toggleSelect(job.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-yellow-400 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-black text-[#111] text-sm tracking-tight">{job.id}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 truncate max-w-[160px]">{job.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <span>{job.origin}</span>
                      <ArrowRight size={12} className="text-gray-300 shrink-0"/>
                      <span>{job.dest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-gray-700">{job.load}</div>
                  </td>
                  <td className="px-6 py-4">
                    {job.driver ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center font-black text-[10px] text-[#FFCC00] shrink-0 group-hover:border-[#FFCC00] border-2 border-transparent transition-colors">
                          {job.driver.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-[#111] text-xs">{job.driver}</div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{job.vehicle}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waiting Assignment</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {job.queue !== 'unassigned' && (
                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shadow-inner" title="Locked for Transit">
                            <Lock size={14} />
                         </div>
                      )}
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/dispatch/jobs/${job.id}`); }}
                        className="text-[10px] font-black border border-gray-200 px-4 py-1.5 rounded-lg transition-all uppercase tracking-widest hover:bg-gray-50 bg-white"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
