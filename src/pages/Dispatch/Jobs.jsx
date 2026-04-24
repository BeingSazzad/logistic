import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, Search, Filter, Plus, Clock,
  MapPin, ChevronDown, AlertTriangle,
  CheckCircle2, UserCheck, Inbox, Zap,
  ArrowRight, AlertCircle, Users, Lock, ShieldCheck, X, Building2
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
  const [unassignedFilter, setUnassignedFilter] = useState('All');

  const rawJobs = [
    { id: 'SHP-9055', branchId: 'SYD-CENTRAL', customer: 'Acme Freight Co', origin: 'Sydney Depot', dest: 'Canberra Branch', queue: 'unassigned', unassignedType: 'Local Pickups', driver: null, vehicle: null, priority: 'High', load: '6.2t' },
    { id: 'SHP-9054', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'unassigned', unassignedType: 'Local Pickups', driver: null, vehicle: null, priority: 'Medium', load: '2.1t' },
    { id: 'SHP-9060', branchId: 'SYD-CENTRAL', customer: 'Velocity Logistics', origin: 'Melbourne Depot', dest: 'Brisbane Depot', queue: 'unassigned', unassignedType: 'Branch Transfers', driver: null, vehicle: null, priority: 'High', load: '14.5t' },
    { id: 'SHP-9042', branchId: 'SYD-CENTRAL', customer: 'Acme Corp Logistics', origin: 'Sydney Depot', dest: 'Melbourne Branch', queue: 'assigned', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', load: '18.4t' },
    { id: 'SHP-9041', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Sydney Depot', dest: 'Penrith Branch', queue: 'exception', driver: 'Liam Smith', vehicle: 'BGT-221', priority: 'Medium', load: '9.5t', exception: 'Delay' },
    { id: 'SHP-9039', branchId: 'SYD-CENTRAL', customer: 'Global Traders AU', origin: 'Brisbane Depot', dest: 'Gold Coast Branch', queue: 'completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', load: '5.5t' },
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
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-10">

      {/* ── Refined Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="hero-h1 mb-1">Load Queue</h1>
          <p className="hero-body text-gray-600 flex items-center gap-2">
            <Building2 size={14} className="text-brand" />
            {user?.branchName || 'Global Terminal'} • Command View
          </p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Reference, Client..." 
              className="w-full bg-white border border-gray-200 rounded-hero-sm py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all shadow-sm" 
            />
          </div>
          <button 
            onClick={() => navigate('/dispatch/loads/create')} 
            className="btn btn-primary"
          >
            Create Load
          </button>
        </div>
      </div>

      {/* ── Queue Selector (Clean Cards) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {QUEUES.map(q => {
          const isActive = queue === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setQueue(q.id)}
              className={`p-5 rounded-hero-md border text-left flex flex-col gap-4 transition-all relative overflow-hidden group shadow-sm ${isActive ? 'bg-gray-900 border-gray-900 shadow-md scale-[1.02]' : 'bg-white border-gray-100 hover:border-brand/40 hover:bg-brand/[0.02]'}`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-hero-sm flex items-center justify-center ${isActive ? 'bg-white/10 text-brand' : 'bg-gray-50 text-gray-500 group-hover:bg-brand/10 group-hover:text-brand'}`}>
                   <q.icon size={20} />
                </div>
                <span className={`text-2xl font-semibold ${isActive ? 'text-white' : 'text-hero-dark'}`}>{counts[q.id]}</span>
              </div>
              <div>
                <p className={`hero-metadata mb-1 ${isActive ? 'text-brand' : ''}`}>{q.label}</p>
                <p className={`text-xs font-medium leading-snug ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>{q.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Table Container ── */}
      <div className="card shadow-sm flex flex-col min-h-[500px]">
        
        {/* Sub-filtering for Unassigned */}
        {queue === 'unassigned' && (
          <div className="flex flex-wrap items-center gap-2 px-6 py-4 bg-[#FAFAFA] border-b border-gray-100">
            {['All', 'Local Pickups', 'Branch Transfers', 'Local Deliveries'].map(type => (
              <button
                key={type}
                onClick={() => setUnassignedFilter(type)}
                className={`px-4 py-1.5 rounded-hero-sm text-xs font-semibold transition-all ${unassignedFilter === type ? 'bg-gray-900 text-brand shadow-sm' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Routing</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Load</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(job => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50/50 transition-all cursor-pointer group"
                  onClick={() => navigate(`/dispatch/loads/${job.id}`)}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{job.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                      <span>{job.origin.split(' ')[0]}</span>
                      <ArrowRight size={10} className="text-gray-300" />
                      <span>{job.dest.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-hero-sm border shadow-sm ${
                      job.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                      job.priority === 'Medium' ? 'bg-brand/10 text-gray-900 border-brand/20' :
                      'bg-gray-50 text-gray-400 border-gray-200'
                    }`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{job.load}</td>
                  <td className="px-6 py-4">
                    {job.driver ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-hero-sm bg-gray-900 text-brand flex items-center justify-center font-semibold text-xs shadow-sm">
                          {job.driver.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900">{job.driver}</div>
                          <div className="text-xs font-medium text-gray-500 mt-0.5">{job.vehicle}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 italic">Pending Assignment</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/dispatch/loads/${job.id}`); }}
                      className="btn-sm btn-outline hover:bg-gray-900 hover:text-white transition-all"
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


