import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeadphonesIcon, AlertCircle, CheckCircle2, MessageSquare, Search, Filter, ExternalLink } from 'lucide-react';

const initialTickets = [
  { id: 'TKT-041', tenant: 'HERO Logistics',  user: 'Sarah Mitchell', issue: 'Cannot create shipment — 500 error on submit', priority: 'High',   status: 'open',     created: '2 hrs ago', replies: [] },
  { id: 'TKT-040', tenant: 'FastMove AU',     user: 'James Brown',    issue: 'Dispatch page loads very slowly (>10s)',          priority: 'Medium', status: 'open',     created: '4 hrs ago', replies: [] },
  { id: 'TKT-039', tenant: 'OzFreight Co',    user: 'Lisa Park',      issue: 'Driver GPS not updating on map',                  priority: 'High',   status: 'resolved', created: '1 day ago', 
    replies: [
      { text: 'We have restarted the tracking service. Can you please check if it works now on your end?', sender: 'PO', time: '23 hrs ago' },
      { text: 'Yes, the map is loading properly now, but it took a few minutes to sync the historical pins.', sender: 'LP', time: '20 hrs ago' },
      { text: 'Thanks for confirming Lisa. The historical pin sync delay is expected after a soft reset. I will mark this as resolved.', sender: 'PO', time: '19 hrs ago' }
    ] 
  },
  { id: 'TKT-038', tenant: 'SunState',        user: 'Tom Wilson',     issue: 'Invoice PDF not downloading',                     priority: 'Low',    status: 'resolved', created: '2 days ago', replies: [] },
];

const priorityCfg = {
  High:   { bg: 'bg-red-100',    text: 'text-red-700' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Low:    { bg: 'bg-gray-100',   text: 'text-gray-600' },
};

export default function PlatformSupport() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('open');

  const resolveFast = (id) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.issue.toLowerCase().includes(search.toLowerCase()) || 
                          t.tenant.toLowerCase().includes(search.toLowerCase()) || 
                          t.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-sm text-gray-500 mt-1">{openTickets} open · {resolvedTickets} resolved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Open',           value: openTickets,      color: 'text-red-600' },
          { label: 'Resolved',       value: resolvedTickets,  color: 'text-emerald-600' },
          { label: 'Avg Response',   value: '1.4 hrs',        color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-semibold">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input w-full pl-9" 
            placeholder="Search by Tenant Name, Issue, or TKT ID..." 
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-gray-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input text-sm py-2 font-semibold text-gray-700 bg-gray-50 border-gray-200"
          >
            <option value="open">Open & Pending Tickets</option>
            <option value="resolved">Resolved Tickets</option>
            <option value="all">All Tickets</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filteredTickets.map(t => {
            const isResolved = t.status === 'resolved';
            const pCfg = priorityCfg[t.priority];
            return (
              <div key={t.id} className="group overflow-hidden">
                <div className={`p-5 flex items-start justify-between gap-4 ${isResolved ? 'opacity-50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isResolved ? 'bg-green-100' : 'bg-red-100'}`}>
                      {isResolved ? <CheckCircle2 size={18} className="text-green-600" /> : <AlertCircle size={18} className="text-red-500" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-xs text-gray-400">{t.id}</span>
                        <span className="font-bold text-sm text-gray-900">{t.tenant}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${pCfg.bg} ${pCfg.text}`}>{t.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{t.issue}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.user} · {t.created}</p>
                    </div>
                  </div>
                  {!isResolved && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => navigate(`/platform/support/${t.id}`)} className="btn btn-dark text-xs py-1.5 px-4 font-semibold">
                        <MessageSquare size={14} className="mr-1.5" /> Reply
                      </button>
                      <button onClick={() => resolveFast(t.id)} className="btn text-xs py-1.5 px-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-semibold border border-transparent">
                        <CheckCircle2 size={14} className="mr-1.5" /> Quick Resolve
                      </button>
                    </div>
                  )}
                </div>

                {t.replies && t.replies.length > 0 && (
                  <div className={`px-5 pb-4 ${isResolved ? 'opacity-50' : ''}`}>
                    <button 
                      onClick={() => navigate(`/platform/support/${t.id}`)} 
                      className="text-xs font-bold text-violet-600 hover:text-violet-800 hover:underline flex items-center gap-1 ml-11"
                    >
                      <ExternalLink size={12} />
                      Open Conversation ({t.replies.length} replies)
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {filteredTickets.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <CheckCircle2 size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-gray-900">No tickets found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
