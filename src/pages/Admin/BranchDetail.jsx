import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Building2, MapPin, Users, Truck, Package,
  Settings, CheckCircle2, AlertTriangle, UserCog, Power,
  Shield, Clock, Phone, Zap, BarChart3, ChevronRight,
  UserPlus, Star, AlertCircle, Lock, Globe, Inbox
} from 'lucide-react';

// ── Mock DB ──────────────────────────────────────────────────────────────────
const BRANCH_DB = {
  'SYD-CENTRAL': {
    id: 'SYD-CENTRAL', name: 'Sydney Central Hub', type: 'Primary Hub',
    location: 'Strathfield, NSW 2135', manager: 'Michael Adams',
    phone: '+61 2 9111 2222', operatingHours: '24/7', status: 'Online',
    capacity: 92, dockCount: 18, capacity_label: '92%',
    kpi: { staff: 42, drivers: 18, fleet: 24, activeJobs: 18, delivered: 412, exceptions: 3 },
    authority: [
      { id: 'USR-05', name: 'Michael Adams',  role: 'Branch Manager',  email: 'mike.a@hero.com', access: 'Full Admin',     status: 'Active', initials: 'MA', since: 'Jan 2023' },
      { id: 'USR-01', name: 'Sarah Mitchell', role: 'Dispatcher',      email: 'sarah.m@hero.com',access: 'Operations',    status: 'Active', initials: 'SM', since: 'Mar 2023' },
      { id: 'USR-11', name: 'Emma Thompson',  role: 'Dispatcher',      email: 'emma.t@hero.com', access: 'Operations',    status: 'Active', initials: 'ET', since: 'Jun 2023' },
      { id: 'USR-14', name: 'Chris Lee',      role: 'Accounts',        email: 'chris.l@hero.com',access: 'Finance View',  status: 'Active', initials: 'CL', since: 'Aug 2023' },
      { id: 'USR-16', name: 'Anna Park',      role: 'Warehouse',       email: 'anna.p@hero.com', access: 'Floor Devices', status: 'Offline',initials: 'AP', since: 'Nov 2023' },
    ],
    drivers: [
      { id: 'DRV-01', name: 'Jack Taylor',   vehicle: 'XQG-984', type: 'Semi-Trailer', status: 'On Trip',  load: '18.4t', eta: '14:30', rating: 4.9 },
      { id: 'DRV-02', name: 'Liam Smith',    vehicle: 'KLY-004', type: 'Pantech',      status: 'On Trip',  load: '5.5t',  eta: '08:00', rating: 4.7 },
      { id: 'DRV-03', name: 'Lucas Jones',   vehicle: 'TRK-08',  type: 'Semi-Trailer', status: 'Offline',  load: '—',     eta: '—',     rating: 4.5 },
      { id: 'DRV-04', name: 'Ben Carter',    vehicle: 'FLT-22',  type: 'Refrigerated', status: 'At Base',  load: '—',     eta: '—',     rating: 4.8 },
    ],
    fleet: [
      { id: 'XQG-984', type: 'Semi-Trailer',  status: 'In Service', lastService: '2 wks ago' },
      { id: 'KLY-004', type: 'Pantech Van',    status: 'In Service', lastService: '1 mo ago'  },
      { id: 'TRK-08',  type: 'Semi-Trailer',  status: 'Parked',     lastService: '3 days ago' },
      { id: 'FLT-22',  type: 'Refrigerated',  status: 'Parked',     lastService: '5 days ago' },
      { id: 'BGT-221', type: 'Courier Van',    status: 'Maintenance',lastService: '1 wk ago'  },
    ],
    recentJobs: [
      { id: 'SHP-9042', customer: 'Acme Corp',     status: 'In Transit', driver: 'Jack Taylor',  eta: '14:30' },
      { id: 'SHP-9055', customer: 'Acme Freight',  status: 'Unassigned', driver: '—',            eta: '—' },
      { id: 'SHP-9039', customer: 'Global Traders',status: 'Received',   driver: 'Liam Smith',   eta: 'Done' },
      { id: 'SHP-9041', customer: 'Tech Solutions', status: 'Issue', driver: 'Lucas Jones',  eta: 'Delayed' },
    ],
  },
  'MEL-HUB': {
    id: 'MEL-HUB', name: 'Melbourne Hub', type: 'Primary Hub',
    location: 'Tullamarine, VIC 3043', manager: 'Sarah Mitchell',
    phone: '+61 3 8111 2222', operatingHours: '06:00 – 22:00', status: 'Online',
    capacity: 45, dockCount: 6, capacity_label: '45%',
    kpi: { staff: 14, drivers: 6, fleet: 8, activeJobs: 6, delivered: 89, exceptions: 1 },
    authority: [
      { id: 'USR-03', name: 'Oliver Brown',  role: 'Branch Manager', email: 'oliver.b@hero.com', access: 'Full Admin',  status: 'Offline', initials: 'OB', since: 'Feb 2024' },
      { id: 'USR-07', name: 'Emma Stevens',  role: 'Warehouse',      email: 'emma.s@hero.com',   access: 'Floor Devices',status: 'Offline',initials: 'ES', since: 'Apr 2024' },
    ],
    drivers: [
      { id: 'DRV-05', name: 'Noah Williams', vehicle: 'V-102',  type: 'Pantech', status: 'On Trip', load: '12t',  eta: '11:00', rating: 4.6 },
    ],
    fleet: [
      { id: 'V-102', type: 'Pantech Van', status: 'In Service', lastService: '1 wk ago' },
    ],
    recentJobs: [
      { id: 'SHP-9035', customer: 'Southport Logistics', status: 'In Transit', driver: 'Noah Williams', eta: '11:00' },
    ],
  },
  'BNE-PORT': {
    id: 'BNE-PORT', name: 'Brisbane Port Branch', type: 'Local Branch',
    location: 'Lytton, QLD 4178', manager: 'Liam Smith',
    phone: '+61 7 7111 2222', operatingHours: '04:00 – 20:00', status: 'Offline',
    capacity: 78, dockCount: 12, capacity_label: '78%',
    kpi: { staff: 28, drivers: 12, fleet: 15, activeJobs: 12, delivered: 178, exceptions: 2 },
    authority: [],
    drivers: [],
    fleet: [],
    recentJobs: [],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const roleColor = (r) => {
  if (r === 'Branch Manager') return 'bg-[#111] text-[#FFCC00] border-gray-800';
  if (r === 'Dispatcher')     return 'bg-blue-50 text-blue-600 border-blue-100';
  if (r === 'Accounts')       return 'bg-amber-50 text-amber-700 border-amber-100';
  if (r === 'Warehouse')      return 'bg-violet-50 text-violet-600 border-violet-100';
  return 'bg-gray-100 text-gray-600 border-gray-200';
};

const jobStatusStyle = (s) => {
  if (s === 'In Transit')  return 'bg-blue-50 text-blue-600 border-blue-100';
  if (s === 'Received')    return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (s === 'Issue')   return 'bg-red-50 text-red-600 border-red-100';
  if (s === 'Unassigned')  return 'bg-amber-50 text-amber-600 border-amber-100';
  return 'bg-gray-100 text-gray-500 border-gray-200';
};

const driverStatusStyle = (s) => {
  if (s === 'On Trip')  return 'bg-blue-50 text-blue-600 border-blue-100';
  if (s === 'At Base')  return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (s === 'Offline')  return 'bg-gray-100 text-gray-500 border-gray-200';
  return 'bg-gray-100 text-gray-500 border-gray-200';
};

// ── Component ────────────────────────────────────────────────────────────────
export default function AdminBranchDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const b = BRANCH_DB[id] || BRANCH_DB['SYD-CENTRAL'];
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const TABS = [
    { id: 'overview',   label: 'Overview' },
    { id: 'authority',  label: `Authority (${b.authority.length})` },
    { id: 'drivers',    label: `Drivers (${b.drivers.length})` },
    { id: 'fleet',      label: `Fleet (${b.fleet.length})` },
    { id: 'jobs',       label: `Recent Jobs` },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-start mb-2 px-2 flex-wrap gap-4">
        <div className="flex items-start gap-4">
          <button onClick={() => navigate('/admin/branches')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-all shadow-sm shrink-0 mt-1">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{b.name}</h1>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${b.type === 'Primary Hub' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{b.type}</span>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest flex items-center gap-1 ${b.status === 'Online' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${b.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                {b.status}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5 uppercase tracking-widest font-bold flex items-center gap-2">
              <MapPin size={11} className="text-gray-300"/> {b.location}
              <span className="text-gray-200">·</span>
              <Phone size={11} className="text-gray-300"/> {b.phone}
              <span className="text-gray-200">·</span>
              <Clock size={11} className="text-gray-300"/> {b.operatingHours}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate(`/admin/users/add`)}
            className="btn btn-outline py-2.5 px-5 flex items-center gap-2">
            <UserPlus size={15}/> Add Staff
          </button>
          <button onClick={() => setEditing(!editing)}
            className={`px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm border text-sm ${editing ? 'bg-[#111] text-[#FFCC00] border-gray-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <Settings size={15}/> {editing ? 'Cancel' : 'Configure'}
          </button>
          {editing && (
            <button onClick={() => setEditing(false)}
              className="btn btn-primary py-2.5 px-5">
              <CheckCircle2 size={15}/> Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60"></div>

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
        {[
          { label: 'Total Staff',    val: b.kpi.staff,      icon: Users,       color: 'text-blue-500',    bg: 'bg-blue-50',    border: 'border-blue-100' },
          { label: 'Drivers',        val: b.kpi.drivers,    icon: UserCog,     color: 'text-indigo-500',  bg: 'bg-indigo-50',  border: 'border-indigo-100' },
          { label: 'Fleet Assets',   val: b.kpi.fleet,      icon: Truck,       color: 'text-violet-500',  bg: 'bg-violet-50',  border: 'border-violet-100' },
          { label: 'Active Jobs',    val: b.kpi.activeJobs, icon: Zap,         color: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-100' },
          { label: 'Delivered Today',val: b.kpi.delivered,  icon: CheckCircle2,color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Issues',     val: b.kpi.exceptions, icon: AlertCircle, color: 'text-red-500',     bg: 'bg-red-50',     border: 'border-red-100' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{s.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-1.5 leading-none">{s.val}</p>
            </div>
            <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.border} border flex items-center justify-center ${s.color} shrink-0`}>
              <s.icon size={16}/>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dock Capacity Bar ── */}
      <div className="mx-2 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 flex items-center gap-6">
        <div className="shrink-0">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Dock Capacity</p>
          <p className="text-lg font-black text-gray-900 mt-0.5">{b.capacity}%</p>
        </div>
        <div className="flex-1">
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${b.capacity > 80 ? 'bg-red-400' : b.capacity > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`}
              style={{ width: `${b.capacity}%` }}
            />
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{b.dockCount} Active Docks</p>
          <p className={`text-[10px] font-black mt-0.5 ${b.capacity > 80 ? 'text-red-500' : b.capacity > 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
            {b.capacity > 80 ? '⚠ Near Capacity' : b.capacity > 60 ? 'Moderate Load' : 'Low Load'}
          </p>
        </div>
      </div>

      {/* ── Tab Nav ── */}
      <div className="px-2">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 w-fit shadow-inner">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Overview ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
          <div className="lg:col-span-2 space-y-6">

            {/* Branch Profile */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Building2 size={14} className="text-gray-400"/>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Branch Profile</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Branch Manager', val: b.manager },
                  { label: 'Contact Phone',  val: b.phone },
                  { label: 'Operating Hours',val: b.operatingHours },
                  { label: 'Facility Type',  val: b.type },
                  { label: 'Location',       val: b.location },
                  { label: 'Branch ID',      val: b.id },
                ].map((f, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</p>
                    {editing ? (
                      <input defaultValue={f.val} className="w-full border border-[#FFCC00] bg-[#FFFBEB] rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    ) : (
                      <p className="text-sm font-bold text-gray-900">{f.val}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-gray-400"/>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Shipments</h3>
                </div>
                <button onClick={() => setActiveTab('jobs')} className="text-[10px] font-black text-gray-400 hover:text-gray-700 uppercase tracking-widest flex items-center gap-1">
                  View All <ChevronRight size={12}/>
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="hero-table-header">
                  <tr>
                    <th className="px-5 py-3">Shipment</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Driver</th>
                    <th className="px-5 py-3">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {b.recentJobs.map(j => (
                    <tr key={j.id} onClick={() => navigate(`/admin/shipments/${j.id}`)}
                      className="hover:bg-gray-50/80 cursor-pointer transition-all">
                      <td className="px-5 py-3.5">
                        <div className="font-black text-sm text-gray-900">{j.id}</div>
                        <div className="text-[10px] text-gray-400 font-bold mt-0.5">{j.customer}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${jobStatusStyle(j.status)}`}>{j.status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-gray-600">{j.driver}</td>
                      <td className="px-5 py-3.5 text-xs font-bold text-gray-600">{j.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Operations Control */}
            <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none"/>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-5 text-[#FFCC00] flex items-center gap-2 relative z-10">
                <Settings size={14}/> Operations Control
              </h3>
              <div className="space-y-3 relative z-10">
                {b.status === 'Online' ? (
                  <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <Power size={14}/> Force Offline
                  </button>
                ) : (
                  <button className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <Power size={14}/> Bring Online
                  </button>
                )}
                <button onClick={() => setActiveTab('authority')} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                  <Shield size={14}/> View Authority Roster
                </button>
                <button onClick={() => navigate('/admin/users/add')} className="w-full py-3 bg-[#FFCC00]/10 hover:bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/20 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                  <UserPlus size={14}/> Add Staff to Branch
                </button>
              </div>
            </div>

            {/* Authority Summary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Shield size={14} className="text-gray-400"/>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authority</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {b.authority.slice(0, 4).map(u => (
                  <div key={u.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/60 cursor-pointer" onClick={() => navigate(`/admin/users/${u.id}`)}>
                    <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-[10px] shrink-0">{u.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{u.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{u.role}</p>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest shrink-0 ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>{u.status}</span>
                  </div>
                ))}
                {b.authority.length === 0 && (
                  <div className="px-5 py-8 text-center text-gray-400">
                    <Users size={24} strokeWidth={1} className="mx-auto mb-2"/>
                    <p className="text-xs font-bold">No staff assigned</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Authority ── */}
      {activeTab === 'authority' && (
        <div className="px-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-gray-400"/>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authority & Access Roster — {b.name}</h3>
              </div>
              <button onClick={() => navigate('/admin/users/add')} className="btn btn-primary py-2 px-4 text-xs">
                <UserPlus size={13}/> Add Member
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="hero-table-header">
                <tr>
                  <th className="px-6 py-4">Operator</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Access Level</th>
                  <th className="px-6 py-4">Member Since</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {b.authority.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <Users size={36} strokeWidth={1} className="mx-auto mb-3"/>
                    <p className="text-sm font-bold">No authority members assigned to this branch</p>
                    <button onClick={() => navigate('/admin/users/add')} className="mt-3 btn btn-primary py-2 px-5 text-xs">Add First Member</button>
                  </td></tr>
                ) : b.authority.map(u => (
                  <tr key={u.id} onClick={() => navigate(`/admin/users/${u.id}`)}
                    className="hover:bg-gray-50/80 cursor-pointer transition-all group border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-[10px] shrink-0 border-2 border-transparent group-hover:border-[#FFCC00] transition-colors">{u.initials}</div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{u.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold mt-0.5">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${roleColor(u.role)}`}>{u.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Lock size={12} className="text-gray-300"/>
                        {u.access}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{u.since}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{u.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={e => { e.stopPropagation(); navigate(`/admin/users/${u.id}`); }}
                        className="text-[10px] font-black border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 uppercase tracking-widest transition-all">
                        Manage →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Drivers ── */}
      {activeTab === 'drivers' && (
        <div className="px-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCog size={14} className="text-gray-400"/>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Driver Roster — {b.name}</h3>
              </div>
              <button onClick={() => navigate('/admin/drivers/add')} className="btn btn-primary py-2 px-4 text-xs">
                <UserPlus size={13}/> Add Driver
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="hero-table-header">
                <tr>
                  <th className="px-6 py-4">Driver</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Current Load</th>
                  <th className="px-6 py-4">ETA</th>
                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {b.drivers.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400">
                    <Truck size={36} strokeWidth={1} className="mx-auto mb-3"/>
                    <p className="text-sm font-bold">No drivers assigned to this branch</p>
                  </td></tr>
                ) : b.drivers.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/80 cursor-pointer transition-all group border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-[10px] shrink-0 border-2 border-transparent group-hover:border-[#FFCC00] transition-colors">
                          {d.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div className="font-bold text-gray-900 text-sm">{d.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-700 text-sm">{d.vehicle}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{d.type}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${driverStatusStyle(d.status)}`}>{d.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-700">{d.load}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600">{d.eta}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-500">
                        <Star size={12} className="fill-amber-400 text-amber-400"/> {d.rating}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Fleet ── */}
      {activeTab === 'fleet' && (
        <div className="px-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
              <Truck size={14} className="text-gray-400"/>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fleet Assets — {b.name}</h3>
            </div>
            <table className="w-full text-left">
              <thead className="hero-table-header">
                <tr>
                  <th className="px-6 py-4">Vehicle ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Service</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {b.fleet.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                    <Truck size={36} strokeWidth={1} className="mx-auto mb-3"/>
                    <p className="text-sm font-bold">No fleet assets assigned</p>
                  </td></tr>
                ) : b.fleet.map(v => (
                  <tr key={v.id} onClick={() => navigate(`/dispatch/vehicles/${v.id}`)}
                    className="hover:bg-gray-50/80 cursor-pointer transition-all border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                    <td className="px-6 py-4 font-black text-gray-900 text-sm">{v.id}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{v.type}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${
                        v.status === 'In Service'  ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        v.status === 'Parked'      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>{v.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{v.lastService}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={e => { e.stopPropagation(); navigate(`/admin/fleet/${v.id}`); }}
                        className="text-[10px] font-black border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 uppercase tracking-widest transition-all">
                        Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Recent Jobs ── */}
      {activeTab === 'jobs' && (
        <div className="px-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
              <Package size={14} className="text-gray-400"/>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Jobs — {b.name}</h3>
            </div>
            <table className="w-full text-left">
              <thead className="hero-table-header">
                <tr>
                  <th className="px-6 py-4">Shipment</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Driver</th>
                  <th className="px-6 py-4">ETA</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {b.recentJobs.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <Inbox size={36} strokeWidth={1} className="mx-auto mb-3"/>
                    <p className="text-sm font-bold">No recent jobs for this branch</p>
                  </td></tr>
                ) : b.recentJobs.map(j => (
                  <tr key={j.id} onClick={() => navigate(`/admin/shipments/${j.id}`)}
                    className="hover:bg-gray-50/80 cursor-pointer transition-all border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                    <td className="px-6 py-4 font-black text-gray-900 text-sm">{j.id}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600">{j.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${jobStatusStyle(j.status)}`}>{j.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600">{j.driver}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600">{j.eta}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={e => { e.stopPropagation(); navigate(`/admin/shipments/${j.id}`); }}
                        className="text-[10px] font-black border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 uppercase tracking-widest transition-all">
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
