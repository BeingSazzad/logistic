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
  { id: 'exception',  label: 'Issues',     icon: AlertCircle,  color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    desc: 'Delayed or delivery problems' },
  { id: 'completed',  label: 'Received',       icon: CheckCircle2, color: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-200',   desc: 'Handover complete / Delivered' },
];

export default function AdminShipments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [queue, setQueue] = useState('unassigned');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOption, setSortOption] = useState('Latest'); // Latest, Oldest, Priority
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
    { id: 'SHP-9060', branchId: 'SYD-CENTRAL', customer: 'Velocity Logistics', origin: 'Melbourne Hub', dest: 'Brisbane Hub', queue: 'unassigned', unassignedType: 'Branch Transfers', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: 'Awaiting Transit', window: '—', load: '14.5t', notes: 'Hub cross-dock completed' },
    { id: 'SHP-9061', branchId: 'SYD-CENTRAL', customer: 'Local Retailer', origin: 'Perth Depot', dest: 'Sydney Local', queue: 'unassigned', unassignedType: 'Local Deliveries', driver: null, vehicle: null, priority: 'Medium', eta: '—', pickup: 'Arrived at Staging', window: 'Before 17:00', load: '2.4t', notes: '' },
    { id: 'SHP-9042', branchId: 'SYD-CENTRAL', customer: 'Acme Corp Logistics', origin: 'Sydney Depot', dest: 'Melbourne Branch', queue: 'assigned', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', eta: '14:30', pickup: '06:00 AM', window: 'Deliver by 16:00', load: '18.4t', notes: '' },
    { id: 'SHP-9035', branchId: 'SYD-CENTRAL', customer: 'Southport Logistics', origin: 'Adelaide Depot', dest: 'Sydney Depot', queue: 'assigned', driver: 'Oliver Brown', vehicle: 'V-102', priority: 'High', eta: 'Arrived at Branch', pickup: '05:00 AM', window: 'Delivered by 11:00', load: '12.0t', notes: '' },
    { id: 'SHP-9041', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'exception', driver: 'Liam Smith', vehicle: 'BGT-221', priority: 'Medium', eta: 'Delayed', pickup: '07:00 AM', window: 'Deliver by 14:00', load: '9.5t', notes: 'Driver reports heavy traffic', exception: 'Delay' },
    { id: 'SHP-9039', branchId: 'SYD-CENTRAL', customer: 'Global Traders AU', origin: 'Brisbane Depot', dest: 'Gold Coast Branch', queue: 'completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', eta: 'Received', pickup: '03:00 AM', window: 'Deliver by 08:00', load: '5.5t', notes: '' },
  ];

  const branchJobs = useMemo(() => {
    if (user.role === 'Super Admin' || user.role === 'Platform Admin') return rawJobs;
    return rawJobs.filter(j => j.branchId === user.branchId);
  }, [user.role, user.branchId]);

  const counts = useMemo(() => ({
    unassigned: branchJobs.filter(j => j.queue === 'unassigned').length,
    assigned:   branchJobs.filter(j => j.queue === 'assigned').length,
    exception:  branchJobs.filter(j => j.queue === 'exception').length,
    completed:  branchJobs.filter(j => j.queue === 'completed').length,
  }), [branchJobs]);

  const filtered = useMemo(() => {
    let result = branchJobs.filter(j => {
      const matchesQueue  = j.queue === queue;
      const matchesSearch = !search || `${j.id} ${j.customer} ${j.driver || ''}`.toLowerCase().includes(search.toLowerCase());
      let matchesSub = true;
      if (queue === 'unassigned' && unassignedFilter !== 'All') {
        matchesSub = j.unassignedType === unassignedFilter;
      }
      const matchesBranch = filterBranch === 'All' || j.branchId === filterBranch;
      return matchesQueue && matchesSearch && matchesSub && matchesBranch;
    });

    if (sortOption === 'Priority') {
      const pLevel = { 'High': 3, 'Medium': 2, 'Low': 1 };
      result.sort((a, b) => (pLevel[b.priority] || 0) - (pLevel[a.priority] || 0));
    } else if (sortOption === 'Latest') {
      // Mock Latest
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOption === 'Oldest') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [branchJobs, queue, search, unassignedFilter, sortOption, filterBranch]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-hero-sm text-hero-dark shadow-sm">
            <Package size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Shipments</h1>
            <p className="hero-body text-hero-neutral mt-1">{user.role === 'Super Admin' ? 'Global network' : user.branchName} · Operational Hub</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin/shipments/create')} className="btn btn-primary">
          <Plus size={18} strokeWidth={3} /> Create Shipment
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {QUEUES.map(q => {
          const isActive = queue === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setQueue(q.id)}
              className={`card p-5 text-left flex flex-col gap-2 transition-all group ${isActive ? 'ring-2 ring-brand border-brand ' + q.bg : 'hover:border-brand/40'}`}
            >
              <div className="flex justify-between items-center">
                <q.icon size={20} className={isActive ? q.color : 'text-hero-neutral'} />
                <span className={`text-xl font-black ${isActive ? 'text-hero-dark' : 'text-hero-neutral'}`}>{counts[q.id]}</span>
              </div>
              <div className="mt-1">
                <p className={`hero-card-title ${isActive ? 'text-hero-dark' : 'text-hero-neutral'}`}>{q.label}</p>
                <p className="hero-metadata leading-tight text-hero-neutral">{q.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="card mx-2 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
          <div className="flex-1">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{QUEUES.find(q=>q.id===queue)?.label} Queue</h3>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5">{filtered.length} units identified</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search sequence..."
                className="w-full md:w-64 bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm transition-all"
              />
            </div>
            <div className="relative">
              <button onClick={() => { setShowFilter(!showFilter); setShowSort(false); }} className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-all">
                <Filter size={14} /> Filter
              </button>
              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl p-3 z-20 animate-in fade-in slide-in-from-top-2">
                  <div className="mb-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Branch</label>
                    <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded p-1.5 focus:outline-none">
                      <option value="All">All Branches</option>
                      <option value="SYD-CENTRAL">Sydney Central</option>
                      <option value="MEL-HUB">Melbourne Hub</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Date</label>
                    <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded p-1.5 focus:outline-none" />
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setShowSort(!showSort); setShowFilter(false); }} className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-all">
                Sort: {sortOption} <ChevronDown size={12}/>
              </button>
              {showSort && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl rounded-xl py-1 z-20 animate-in fade-in slide-in-from-top-2">
                  {['Latest', 'Oldest', 'Priority'].map(opt => (
                    <button key={opt} onClick={() => { setSortOption(opt); setShowSort(false); }} className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 ${sortOption === opt ? 'text-brand' : 'text-gray-700'}`}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {queue === 'unassigned' && (
           <div className="flex bg-gray-50 flex-wrap items-center gap-2 px-5 py-3 border-b border-gray-100">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1.5"><MapPin size={12}/> TASK SEGMENT</span>
             {['All', 'Local Pickups', 'Branch Transfers', 'Local Deliveries'].map(type => (
                <button 
                  key={type}
                  onClick={() => setUnassignedFilter(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                     unassignedFilter === type ? 'bg-hero-dark text-brand' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
             ))}
           </div>
        )}

        <div className="overflow-x-auto relative min-h-[400px]">
          {selectedIds.length > 0 && (
             <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-hero-dark text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 border border-white/10">
               <span className="text-xs font-black uppercase tracking-widest"><span className="text-brand">{selectedIds.length}</span> Selected Units</span>
               <button className="bg-brand text-hero-dark px-6 py-2 rounded-full text-[10px] font-black uppercase">Assign Fleet</button>
               <button onClick={() => setSelectedIds([])} className="text-gray-400 hover:text-white"><X size={18}/></button>
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
                <th className="px-6 py-4">Route Info</th>
                <th className="px-6 py-4">Load</th>
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">No active shipments in this terminal</td>
                </tr>
              ) : filtered.map(job => (
                <tr
                  key={job.id}
                  className={`hover:bg-gray-50/50 transition-all cursor-pointer group ${selectedIds.includes(job.id) ? 'bg-brand/5' : ''}`}
                  onClick={() => navigate(`/admin/shipments/${job.id}`)}
                >
                  <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(job.id)}
                      onChange={() => toggleSelect(job.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-brand cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-black text-hero-dark text-sm tracking-tight">{job.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <span>{job.origin}</span>
                      <ArrowRight size={10} className="text-gray-300"/>
                      <span>{job.dest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-700">{job.load}</td>
                  <td className="px-6 py-4">
                    {job.driver ? (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-hero-dark flex items-center justify-center font-black text-[9px] text-brand uppercase">
                          {job.driver.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <span className="text-[11px] font-bold text-hero-dark">{job.driver}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Awaiting Assignment</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black border border-gray-200 px-4 py-1.5 rounded-lg transition-all uppercase tracking-widest hover:bg-gray-50 bg-white">Details</button>
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
