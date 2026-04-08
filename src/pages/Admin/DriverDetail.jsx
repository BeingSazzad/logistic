import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, MapPin, Phone, Mail, Edit3, Save, X,
  FileText, ShieldCheck, ShieldAlert, Truck, Clock,
  AlertTriangle, CheckCircle2, Package, Route, TrendingUp
} from 'lucide-react';

const driver = {
  id: 'DRV-102',
  name: 'Jack Taylor',
  avatar: 'JT',
  phone: '+61 412 000 102',
  email: 'jack.taylor@hero.com',
  address: '14 Parramatta Rd, Strathfield NSW 2135',
  status: 'On Trip',
  depot: 'Sydney Central Depot',
  shiftType: 'Full-time Permanent',
  license: { type: 'NSW HC (Heavy Combination)', number: 'HR-4412', expiry: '12 Sep 2026', status: 'Valid' },
  medical: { expiry: '15 Oct 2026', status: 'Valid' },
  vehicle: { id: 'TRK-102', reg: 'XQG-984', type: 'Heavy Truck' },
  currentJob: { id: 'JOB-20481', route: 'Sydney Port → Blacktown DC', progress: 65, eta: '3:45 PM', load: '18.4t' },
  stats: { completedJobs: 284, onTimeRate: '96.2%', avgRating: 4.8, delayedJobs: 11 },
  recentJobs: [
    { id: 'JOB-20481', route: 'Sydney Port → Blacktown DC', status: 'In Transit', date: 'Today' },
    { id: 'JOB-20477', route: 'Chullora DC → Richmond Depot', status: 'Delivered', date: 'Yesterday' },
    { id: 'JOB-20469', route: 'Port Botany → Penrith Hub', status: 'Delivered', date: '05 Apr' },
    { id: 'JOB-20461', route: 'Blacktown DC → Newcastle Depot', status: 'Delivered', date: '04 Apr' },
  ]
};

export default function AdminDriverDetail() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(driver.name);
  const [editedPhone, setEditedPhone] = useState(driver.phone);
  const [editedShift, setEditedShift] = useState(driver.shiftType);
  const [editedDepot, setEditedDepot] = useState(driver.depot);

  return (
    <div className="w-full max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/drivers')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to Drivers
        </button>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-black text-2xl shadow-lg">
            {driver.avatar}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{editedName}</h1>
              <span className={`badge ${driver.status === 'On Trip' ? 'badge-green' : 'badge-gray'} font-bold`}>
                ● {driver.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{driver.id} — {driver.vehicle.type} • {driver.vehicle.reg}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} className="btn bg-gray-100 text-gray-600 hover:bg-gray-200"><X size={16}/> Cancel</button>
              <button onClick={() => setEditing(false)} className="btn btn-primary"><Save size={16}/> Save Changes</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="btn btn-dark"><Edit3 size={16}/> Edit Profile</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT: Profile & Edit */}
        <div className="flex flex-col gap-5">
          {/* Contact Info */}
          <div className="card bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Details</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Full Name</label>
                {editing ? <input className="input" value={editedName} onChange={e => setEditedName(e.target.value)}/> : <p className="text-sm font-bold text-gray-800">{editedName}</p>}
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block flex items-center gap-1"><Phone size={10}/> Phone</label>
                {editing ? <input className="input" value={editedPhone} onChange={e => setEditedPhone(e.target.value)}/> : <p className="text-sm font-medium text-gray-700">{editedPhone}</p>}
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block flex items-center gap-1"><Mail size={10}/> Email</label>
                <p className="text-sm font-medium text-gray-700">{driver.email}</p>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block flex items-center gap-1"><MapPin size={10}/> Address</label>
                <p className="text-sm font-medium text-gray-700">{driver.address}</p>
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="card bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Operational Assignment</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Assigned Depot</label>
                {editing
                  ? <select className="input" value={editedDepot} onChange={e => setEditedDepot(e.target.value)}><option>Sydney Central Depot</option><option>Melbourne North Hub</option><option>Brisbane Port Facility</option></select>
                  : <p className="text-sm font-bold text-gray-800">{editedDepot}</p>
                }
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Shift Type</label>
                {editing
                  ? <select className="input" value={editedShift} onChange={e => setEditedShift(e.target.value)}><option>Full-time Permanent</option><option>Casual</option><option>Contractor (Subby)</option></select>
                  : <p className="text-sm font-bold text-gray-800">{editedShift}</p>
                }
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Current Vehicle</label>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <Truck size={14} className="text-gray-500"/>
                  <span className="text-sm font-bold text-gray-800">{driver.vehicle.id}</span>
                  <span className="text-xs text-gray-500 font-mono">{driver.vehicle.reg}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Docs */}
          <div className="card bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><FileText size={12}/> Legal & Compliance</h3>
            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-xl border border-green-200 bg-green-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-green-700 uppercase tracking-widest">Driver's License</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">{driver.license.type}</p>
                    <p className="text-xs font-mono text-gray-500 mt-0.5">{driver.license.number}</p>
                  </div>
                  <ShieldCheck size={22} className="text-green-500"/>
                </div>
                <div className="mt-2 pt-2 border-t border-green-200 flex justify-between">
                  <span className="text-[10px] text-green-600 font-bold uppercase">Expires</span>
                  <span className="text-[10px] font-bold text-gray-700">{driver.license.expiry}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-green-200 bg-green-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-green-700 uppercase tracking-widest">Medical Certificate</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">Fitness for Duty (Dept. Transport)</p>
                  </div>
                  <ShieldCheck size={22} className="text-green-500"/>
                </div>
                <div className="mt-2 pt-2 border-t border-green-200 flex justify-between">
                  <span className="text-[10px] text-green-600 font-bold uppercase">Expires</span>
                  <span className="text-[10px] font-bold text-gray-700">{driver.medical.expiry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Status, Route, Jobs */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Performance KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4 bg-white shadow-sm text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Completed</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{driver.stats.completedJobs}</p>
              <p className="text-[10px] text-gray-500 font-bold">Total Jobs</p>
            </div>
            <div className="card p-4 bg-white shadow-sm text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">On-Time Rate</p>
              <p className="text-2xl font-black text-green-600 mt-1">{driver.stats.onTimeRate}</p>
              <p className="text-[10px] text-gray-500 font-bold">Delivery SLA</p>
            </div>
            <div className="card p-4 bg-white shadow-sm text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Avg Rating</p>
              <p className="text-2xl font-black text-yellow-500 mt-1 flex items-center justify-center gap-1">{driver.stats.avgRating} <Star size={16} className="fill-yellow-500"/></p>
              <p className="text-[10px] text-gray-500 font-bold">Customer Score</p>
            </div>
            <div className="card p-4 bg-white shadow-sm text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Delays</p>
              <p className="text-2xl font-black text-orange-500 mt-1">{driver.stats.delayedJobs}</p>
              <p className="text-[10px] text-gray-500 font-bold">Late Deliveries</p>
            </div>
          </div>

          {/* Current Active Job / Live Route */}
          <div className="card bg-white p-5 shadow-sm border-l-4 border-l-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Route size={16}/> Current Active Job</h3>
              <span className="badge badge-green font-bold">● Live</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Job Reference</p>
                  <p className="text-lg font-black text-gray-900">{driver.currentJob.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">ETA</p>
                  <p className="text-lg font-black text-gray-900 flex items-center gap-1"><Clock size={14}/> {driver.currentJob.eta}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <MapPin size={16} className="text-yellow-500 shrink-0"/>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Route</p>
                  <p className="font-bold text-gray-900 text-sm">{driver.currentJob.route}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Package size={16} className="text-blue-500 shrink-0"/>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Load Weight</p>
                  <p className="font-bold text-gray-900 text-sm">{driver.currentJob.load}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500">Route Progress</span>
                  <span className="text-xs font-bold text-green-600">{driver.currentJob.progress}% Complete</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${driver.currentJob.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Jobs History */}
          <div className="card bg-white shadow-sm">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={16}/> Recent Job History</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All Jobs</button>
            </div>
            <div className="divide-y divide-gray-50">
              {driver.recentJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${job.status === 'In Transit' ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{job.id}</p>
                      <p className="text-xs text-gray-500 font-medium">{job.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge text-[10px] ${job.status === 'In Transit' ? 'badge-yellow' : 'badge-green'}`}>{job.status}</span>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">{job.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
