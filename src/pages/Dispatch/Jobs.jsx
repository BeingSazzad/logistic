import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, Search, Filter, Plus, Clock,
  MapPin, ChevronDown, AlertTriangle,
  CheckCircle2, UserCheck, Inbox, Zap,
  ArrowRight, AlertCircle, Users, Lock, ShieldCheck, X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const QUEUES = [
  { id: 'unassigned', label: 'Unassigned', icon: Inbox, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Booked – awaiting driver assignment' },
  { id: 'assigned', label: 'In Transit', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Assigned & physically moving' },
  { id: 'exception', label: 'Issues', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', desc: 'Delayed or delivery problems' },
  { id: 'completed', label: 'Received', icon: CheckCircle2, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', desc: 'Handover complete / Delivered' },
];

export default function DispatchJobs() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [queue, setQueue] = useState('unassigned');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOption, setSortOption] = useState('Latest');
  const [filterDate, setFilterDate] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [unassignedFilter, setUnassignedFilter] = useState('All');

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const rawJobs = [
    { id: 'SHP-9055', branchId: 'SYD-CENTRAL', customer: 'Acme Freight Co', origin: 'Sydney Depot', dest: 'Canberra Branch', queue: 'unassigned', unassignedType: 'Local Pickups', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: '11:00 AM', window: '12:00–14:00', load: '6.2t', notes: 'Temperature-controlled cargo' },
    { id: 'SHP-9054', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'unassigned', unassignedType: 'Local Pickups', driver: null, vehicle: null, priority: 'Medium', eta: '—', pickup: '12:30 PM', window: '13:00–15:00', load: '2.1t', notes: '' },
    { id: 'SHP-9060', branchId: 'SYD-CENTRAL', customer: 'Velocity Logistics', origin: 'Melbourne Depot', dest: 'Brisbane Depot', queue: 'unassigned', unassignedType: 'Branch Transfers', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: 'Awaiting Transit', window: '—', load: '14.5t', notes: 'Depot cross-dock completed' },
    { id: 'SHP-9061', branchId: 'SYD-CENTRAL', customer: 'Local Retailer', origin: 'Perth Depot', dest: 'Sydney Local', queue: 'unassigned', unassignedType: 'Local Deliveries', driver: null, vehicle: null, priority: 'Medium', eta: '—', pickup: 'Arrived at Staging', window: 'Before 17:00', load: '2.4t', notes: '' },
    { id: 'SHP-9042', branchId: 'SYD-CENTRAL', customer: 'Acme Corp Logistics', origin: 'Sydney Depot', dest: 'Melbourne Branch', queue: 'assigned', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', eta: '14:30', pickup: '06:00 AM', window: 'Deliver by 16:00', load: '18.4t', notes: '' },
    { id: 'SHP-9035', branchId: 'SYD-CENTRAL', customer: 'Southport Logistics', origin: 'Adelaide Depot', dest: 'Sydney Depot', queue: 'assigned', driver: 'Oliver Brown', vehicle: 'V-102', priority: 'High', eta: 'Arrived at Branch', pickup: '05:00 AM', window: 'Delivered by 11:00', load: '12.0t', notes: '' },
    { id: 'SHP-9041', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'exception', driver: 'Liam Smith', vehicle: 'BGT-221', priority: 'Medium', eta: 'Delayed', pickup: '07:00 AM', window: 'Deliver by 14:00', load: '9.5t', notes: 'Driver reports heavy traffic', exception: 'Delay' },
    { id: 'SHP-9039', branchId: 'SYD-CENTRAL', customer: 'Global Traders AU', origin: 'Brisbane Depot', dest: 'Gold Coast Branch', queue: 'completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', eta: 'Received', pickup: '03:00 AM', window: 'Deliver by 08:00', load: '5.5t', notes: '' },
  ];

  const counts = useMemo(() => ({
    unassigned: rawJobs.filter(j => j.queue === 'unassigned').length,
    assigned: rawJobs.filter(j => j.queue === 'assigned').length,
    exception: rawJobs.filter(j => j.queue === 'exception').length,
    completed: rawJobs.filter(j => j.queue === 'completed').length,
  }), []);

  const filtered = useMemo(() => {
    return rawJobs.filter(j => {
      const matchesQueue = j.queue === queue;
      const matchesSearch = !search || `${j.id} ${j.customer} ${j.driver || ''}`.toLowerCase().includes(search.toLowerCase());
      let matchesSub = true;
      if (queue === 'unassigned' && unassignedFilter !== 'All') {
        matchesSub = j.unassignedType === unassignedFilter;
      }
      return matchesQueue && matchesSearch && matchesSub;
    });
  }, [queue, search, unassignedFilter]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-hero-sm text-hero-dark shadow-sm">
            <Package size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Load Queue</h1>
            <p className="hero-body text-gray-600 mt-1 leading-none">{user?.branchName} · Dispatch Operations Command</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dispatch/loads/create')}
          className="btn btn-primary"
        >
          <Plus size={18} strokeWidth={3} /> Create Load
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Queue Selector Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {QUEUES.map(q => {
          const isActive = queue === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setQueue(q.id)}
              className={`card p-5 text-left flex flex-col gap-2 transition-all group overflow-hidden ${isActive ? 'ring-2 ring-brand border-brand shadow-lg ' + q.bg : 'hover:border-brand/40'}`}
            >
              <div className="flex justify-between items-center relative z-10">
                <q.icon size={20} className={isActive ? q.color : 'text-gray-600'} />
                <span className={`text-xl font-black ${isActive ? 'text-hero-dark' : 'text-gray-600'}`}>{counts[q.id]}</span>
              </div>
              <div className="relative z-10 mt-1">
                <p className={`hero-card-title ${isActive ? 'text-hero-dark' : 'text-gray-600'}`}>{q.label}</p>
                <p className="hero-metadata leading-tight text-gray-600 group-hover:text-hero-dark transition-colors">{q.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mx-2">

        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
          <div className="flex-1">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{QUEUES.find(q => q.id === queue)?.label} Queue</h3>
            <p className="text-xs font-medium text-gray-500 mt-0.5">{filtered.length} Load{filtered.length !== 1 ? 's' : ''} identified</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Reference..."
                className="w-full md:w-64 bg-white border border-gray-200 hover:border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm font-normal text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="btn-hero-secondary !py-2.5 !px-4 flex items-center gap-2"
            >
              <Filter size={14} /> Parameters
            </button>
          </div>
        </div>

        {/* Dynamic Segmentation Panel for Unassigned Queue */}
        {queue === 'unassigned' && (
          <div className="flex bg-gray-50 flex-wrap items-center gap-2 px-5 py-3 border-b border-gray-100">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1.5"><MapPin size={12} /> Global Task Segments</span>
            {['All', 'Local Pickups', 'Branch Transfers', 'Local Deliveries'].map(type => (
              <button
                key={type}
                onClick={() => setUnassignedFilter(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${unassignedFilter === type ? 'bg-[#111] text-[#FFCC00] shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-x-auto relative">
          {/* Floating Batch Action Bar */}
          {selectedIds.length > 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-hero-dark text-white px-6 py-4 rounded-hero-lg shadow-2xl flex items-center gap-6 animate-in slide-in-from-top-4 duration-300 border border-white/10">
              <div className="flex items-center gap-3 border-r border-white/20 pr-6">
                <div className="w-8 h-8 rounded-hero-sm bg-brand text-hero-dark flex items-center justify-center font-black">{selectedIds.length}</div>
                <div>
                  <span className="hero-metadata text-brand uppercase text-xs">Batch Operations</span>
                  <p className="text-xs text-gray-400 font-bold uppercase">Multi-unit synchronization</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-brand text-hero-dark px-4 py-2 rounded-hero-sm text-xs font-black uppercase tracking-widest transition-all">
                  Update Multi-Route
                </button>
              </div>
              <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={16} /></button>
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
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Routing</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Load</th>
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                    No active Loads in this terminal
                  </td>
                </tr>
              ) : filtered.map(job => (
                <tr
                  key={job.id}
                  className={`hover:bg-gray-50/80 transition-all cursor-pointer group border-l-4 ${selectedIds.includes(job.id) ? 'border-l-[#FFCC00] bg-yellow-50/20' : 'border-l-transparent'}`}
                  onClick={() => navigate(`/dispatch/loads/${job.id}`)}
                >
                  <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(job.id)}
                      onChange={() => toggleSelect(job.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-yellow-400 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-black text-[#111] text-sm tracking-tight">{job.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <span>{job.origin}</span>
                      <ArrowRight size={12} className="text-gray-300 shrink-0" />
                      <span>{job.dest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md border shadow-sm transition-all ${job.priority === 'High' ? 'bg-[#111] text-[#FFCC00] border-[#FFCC00]/30 shadow-[#FFCC00]/10 shadow-lg' :
                      job.priority === 'Medium' ? 'bg-[#FFCC00] text-black border-transparent shadow-sm' :
                        'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-700">{job.load}</td>
                  <td className="px-6 py-4">
                    {job.driver ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center font-black text-xs text-[#FFCC00] shrink-0">
                          {job.driver.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-[#111] text-xs">{job.driver}</div>
                          <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">{job.vehicle}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Awaiting Assignment</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/dispatch/loads/${job.id}`); }}
                      className="text-xs font-black border border-gray-200 px-4 py-1.5 rounded-lg transition-all uppercase tracking-widest hover:bg-gray-50 bg-white"
                    >
                      Details
                    </button>
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
