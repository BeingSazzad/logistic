import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, Plus, Package, Truck, DollarSign, AlertCircle,
  Clock, TrendingUp, MapPin, Search, MoreVertical,
  ArrowUpRight, Navigation, Zap, ShieldAlert, CheckCircle2, ChevronDown,
  Activity, ChevronRight
} from 'lucide-react';

const jobs = [
  { id: 'SHP-20481', customer: 'Acme Corp',          route: 'Sydney Depot → Melbourne Depot',  driver: 'Jack Taylor',  vehicle: 'TRK-102', status: 'In Transit', progress: 65, eta: '2:45 PM', nextStop: 'Melbourne Terminal' },
  { id: 'SHP-20482', customer: 'Tech Solutions Ltd',  route: 'Brisbane Depot → Sydney Depot',      driver: 'Liam Smith',  vehicle: 'VAN-08',   status: 'Arriving Soon',  progress: 85, eta: '4:30 PM', nextStop: 'Sydney Central Depot' },
  { id: 'SHP-20483', customer: 'Global Traders',      route: 'Perth Depot → Adelaide Depot',   driver: 'Noah Williams',   vehicle: 'TRK-05',   status: 'In Sorting',   progress: 100, eta: 'Done', nextStop: 'Adelaide Terminal' },
  { id: 'SHP-20484', customer: 'Express Goods',       route: 'Sydney Depot → Newcastle Depot',  driver: 'Unassigned',   vehicle: '-',        status: 'Unassigned',   progress: 0, eta: '-', nextStop: 'Newcastle Depot' },
];

function StatusBadge({ status }) {
  const map = {
    'In Transit': 'badge-blue',
    'Arriving Soon': 'bg-amber-100 text-amber-700 border-amber-200',
    'In Sorting': 'bg-violet-100 text-violet-700 border-violet-200',
    'Unassigned': 'badge-gray',
  };
  return <span className={`badge ${map[status] ?? 'badge-gray'} text-xs font-semibold uppercase tracking-widest px-2 py-0.5`}>{status}</span>;
}

export default function DispatchDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Filtering Logic
  const filteredAndSortedJobs = useMemo(() => {
    return jobs.filter(job => {
      const searchStr = `${job.id} ${job.customer} ${job.route} ${job.driver} ${job.nextStop}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    });
  }, [search]);

  const handleRowClick = (id) => navigate(`/dispatch/loads/${id}`);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-10">
      
      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="hero-h1 mb-1">Command Center</h1>
          <p className="hero-body text-gray-600">Fleet Intelligence HQ</p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, Driver, Client..." 
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

      <div className="w-full h-px bg-gray-100"></div>

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Loads', val: '42', icon: Package, color: 'blue', trend: '+12%' },
          { label: 'Drivers Online', val: '18', icon: Truck, color: 'emerald', trend: 'LIVE' },
          { label: 'Pending Assignment', val: '04', icon: Clock, color: 'orange', trend: 'URGENT' },
          { label: 'Critical Alerts', val: '02', icon: ShieldAlert, color: 'red', trend: 'FIX NOW' },
        ].map((kpi, i) => (
          <div key={i} className="card p-5 border-transparent hover:border-gray-100 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-9 h-9 rounded-hero-sm flex items-center justify-center bg-${kpi.color}-50 text-${kpi.color}-500 border border-${kpi.color}-100`}>
                <kpi.icon size={18} />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-${kpi.color}-50 text-${kpi.color}-600`}>{kpi.trend}</span>
            </div>
            <div>
              <p className="hero-metadata mb-1">{kpi.label}</p>
              <p className="text-2xl font-semibold text-hero-dark leading-none">{kpi.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Operations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Table Area (8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="card shadow-sm">
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Activity size={14} className="text-blue-500" /> Active Movements
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FAFAFA] text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Load ID</th>
                    <th className="px-6 py-3">Route / Status</th>
                    <th className="px-6 py-3">Resource</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAndSortedJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50/50 transition-all group cursor-pointer" onClick={() => handleRowClick(job.id)}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{job.id}</div>
                        <div className="text-xs font-medium text-gray-500 mt-0.5">{job.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                          {job.route.split(' → ')[0]} <ArrowUpRight size={10} className="text-gray-300" /> {job.route.split(' → ')[1]}
                        </p>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={job.status} />
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <MapPin size={10}/> {job.nextStop}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded bg-gray-900 text-brand flex items-center justify-center font-semibold text-xs shadow-sm`}>
                            {job.driver === 'Unassigned' ? '?' : job.driver[0]}
                          </div>
                          <div>
                            <div className={`text-xs font-semibold ${job.driver === 'Unassigned' ? 'text-red-500' : 'text-gray-900'}`}>{job.driver}</div>
                            <div className="text-xs font-medium text-gray-500 mt-0.5">{job.vehicle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="btn-sm btn-outline">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Intelligence Side (4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <button 
            onClick={() => navigate('/dispatch/tracking')}
            className="card p-6 bg-brand/[0.03] border-2 border-brand/20 group transition-all hover:border-brand shadow-lg shadow-brand/5"
          >
            <div className="flex flex-col gap-4 text-left">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin size={14} className="text-brand fill-brand/20" strokeWidth={3} /> Fleet Map
                </h4>
                <p className="hero-body text-gray-600 mt-2">Live Network Monitor</p>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-2xl font-semibold text-hero-dark">18</span>
                 <ChevronRight size={16} className="text-brand group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </button>

          <div className="card shadow-sm border border-red-100 bg-red-50/10">
            <div className="p-5 border-b border-red-50 flex justify-between items-center">
               <h4 className="text-sm font-semibold text-red-600 flex items-center gap-2">
                 <ShieldAlert size={14} strokeWidth={3} /> Critical Logs
               </h4>
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </div>
            <div className="p-4 space-y-3">
              {[
                { msg: 'SHP-20483 geofence breach.', time: '4m ago' },
                { msg: 'Unassigned SHP-20484 timeout.', time: '12m ago' }
              ].map((a, i) => (
                <div key={i} className="p-3 bg-white rounded-hero-sm border border-red-100 flex flex-col gap-1 shadow-sm">
                  <p className="text-xs font-semibold text-gray-900 leading-snug">{a.msg}</p>
                  <p className="text-xs font-medium text-gray-500">{a.time}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}


