import React, { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';

const logs = [
  { id: 'AL-1205', time: '2026-04-08 14:30:22', actor: 'System Admin (admin@hero.com.au)', action: 'Impersonate End', tenant: 'FastMove AU', details: 'Duration: 45 min, Ticket: SUP-12345' },
  { id: 'AL-1204', time: '2026-04-08 13:45:00', actor: 'System Admin (admin@hero.com.au)', action: 'Impersonate Start', tenant: 'FastMove AU', details: 'Reason: Login issue, Ticket: SUP-12345' },
  { id: 'AL-1203', time: '2026-04-08 12:15:00', actor: 'John Doe (john@hero.com.au)',     action: 'Suspend Tenant', tenant: 'QuickShip Pty Ltd', details: 'Reason: Non-payment' },
  { id: 'AL-1202', time: '2026-04-07 09:10:00', actor: 'System Admin (admin@hero.com.au)', action: 'Activate Tenant', tenant: 'OzFreight Co', details: 'Reason: Payment cleared' },
  { id: 'AL-1201', time: '2026-04-06 16:22:15', actor: 'John Doe (john@hero.com.au)',     action: 'Create Tenant', tenant: 'SunState Transport', details: 'Plan: Pro' },
  { id: 'AL-1200', time: '2026-04-05 10:05:00', actor: 'System Admin (admin@hero.com.au)', action: 'Login', tenant: '—', details: 'IP: 121.200.12.5' },
];

const actionColors = {
  'Create Tenant': 'bg-green-100 text-green-800',
  'Suspend Tenant': 'bg-red-100 text-red-800',
  'Activate Tenant': 'bg-emerald-100 text-emerald-800',
  'Impersonate Start': 'bg-blue-100 text-blue-800',
  'Impersonate End': 'bg-gray-100 text-gray-800',
  'Login': 'bg-gray-100 text-gray-800',
};

export default function AuditLogs() {
  const [search, setSearch] = useState('');
  
  const filtered = logs.filter(l => 
    l.actor.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.tenant.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-1">Compliance & security event tracking</p>
        </div>
        <button className="btn btn-dark"><Download size={15} /> Export CSV</button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-9" placeholder="Search actor, action, tenant..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn bg-white border border-gray-200 text-gray-700 shadow-sm"><Filter size={16} /> Filters</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5 font-mono text-gray-600 text-xs whitespace-nowrap">{log.time}</td>
                <td className="px-6 py-3.5 font-medium text-gray-900">{log.actor}</td>
                <td className="px-6 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${actionColors[log.action] || 'bg-gray-100 text-gray-800'}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-gray-700 font-semibold">{log.tenant}</td>
                <td className="px-6 py-3.5 text-gray-500 text-xs max-w-sm truncate" title={log.details}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 font-medium">No activity found. Try adjusting your filters.</p>
            <button onClick={() => setSearch('')} className="text-blue-600 font-bold mt-2 hover:underline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
