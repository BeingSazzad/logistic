import React, { useState } from 'react';
import { Package, MapPin, Clock, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_STYLES = {
  'Completed': 'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Assigned': 'bg-blue-100 text-blue-700',
  'Exception': 'bg-red-100 text-red-700',
};

const jobs = [
  {
    id: 'SHP-9081',
    customer: 'Woolworths',
    from: 'Sydney NSW',
    to: 'Melbourne VIC',
    date: 'Today, 08:00',
    items: '3 pallets · 850 kg',
    status: 'In Progress',
    earnings: '$796.30',
  },
  {
    id: 'SHP-9076',
    customer: 'Coles',
    from: 'Melbourne VIC',
    to: 'Adelaide SA',
    date: 'Yesterday',
    items: '6 pallets · 1,200 kg',
    status: 'Completed',
    earnings: '$620.50',
  },
  {
    id: 'SHP-9065',
    customer: 'Amazon AU',
    from: 'Brisbane QLD',
    to: 'Sydney NSW',
    date: '6 Apr',
    items: '2 pallets · 400 kg',
    status: 'Completed',
    earnings: '$510.00',
  },
  {
    id: 'SHP-9052',
    customer: 'IGA',
    from: 'Sydney NSW',
    to: 'Newcastle NSW',
    date: '4 Apr',
    items: '4 pallets · 960 kg',
    status: 'Exception',
    earnings: '$240.00',
  },
  {
    id: 'SHP-9099',
    customer: 'BigW',
    from: 'Sydney NSW',
    to: 'Canberra ACT',
    date: 'Tomorrow, 06:00',
    items: '1 pallet · 190 kg',
    status: 'Assigned',
    earnings: '$310.00',
  },
];

export default function DriverJobs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');

  const filtered = jobs.filter(j => {
    if (tab === 'active') return j.status === 'In Progress' || j.status === 'Assigned';
    if (tab === 'done') return j.status === 'Completed';
    return true;
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center pt-1">
        <h2 className="text-lg font-bold text-gray-900">Active Shipments</h2>
        <span className="text-xs text-gray-500">{jobs.length} total</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'done', label: 'Completed' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              tab === t.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map(job => (
          <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">{job.customer}</p>
                <p className="text-xs font-mono text-gray-400 mt-0.5">{job.id}</p>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_STYLES[job.status]}`}>
                {job.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <MapPin size={11} className="shrink-0" />
              <span className="font-medium text-gray-700">{job.from}</span>
              <span>→</span>
              <span className="font-medium text-gray-700">{job.to}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock size={11} />{job.date}</span>
              <span className="flex items-center gap-1"><Package size={11} />{job.items}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
              <span className="text-sm font-black text-gray-900">{job.earnings}</span>
              <button 
                onClick={() => navigate(`/driver/shipments/${job.id}`)}
                className="flex items-center gap-1 text-xs font-bold text-yellow-600 hover:text-yellow-700 active:scale-95 transition-all"
              >
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
