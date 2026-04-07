import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Edit3, Save, X, Truck, Gauge, Wrench,
  Droplet, MapPin, User, AlertTriangle, CheckCircle2,
  Clock, Route, TrendingUp, Package, Settings
} from 'lucide-react';

const vehicle = {
  id: 'TRK-102',
  reg: 'XQG-984',
  type: 'Heavy Truck (Semi)',
  make: 'Kenworth T610',
  vin: '1XKDP4TX8EJ123456',
  cap: '20t',
  fuelType: 'Diesel',
  status: 'Active',
  depot: 'Sydney Central Depot',
  assignedDriver: { id: 'DRV-102', name: 'Jack Taylor' },
  currentJob: { id: 'JOB-20481', route: 'Sydney Port → Blacktown DC', progress: 65 },
  odometer: '184,220 km',
  fuelLog: [
    { date: 'Today 09:14', litres: '120L', cost: '$228.00', station: 'Caltex Chullora' },
    { date: '06 Apr 07:30', litres: '95L',  cost: '$180.50', station: 'BP Matraville' },
    { date: '04 Apr 14:00', litres: '108L', cost: '$205.20', station: 'Shell Penrith' },
  ],
  service: {
    lastService: '18 Feb 2026 @ 180,000 km',
    nextService: 'In 4,500 km (~188,720 km)',
    nextServiceStatus: 'OK',
    history: [
      { date: '18 Feb 2026', type: 'Full Service', km: '180,000 km', cost: '$1,850' },
      { date: '10 Nov 2025', type: 'Brake Inspection', km: '164,000 km', cost: '$420' },
      { date: '28 Jul 2025', type: 'Oil & Filters', km: '149,000 km', cost: '$280' },
    ]
  }
};

export default function AdminVehicleDetail() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(vehicle.status);
  const [editedDepot, setEditedDepot] = useState(vehicle.depot);

  return (
    <div className="max-w-[1100px] pb-16">
      <button onClick={() => navigate('/admin/fleet')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Fleet
      </button>

      {/* Hero Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shadow-xl">
            <Truck size={32} className="text-yellow-400"/>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{vehicle.id} — {vehicle.make}</h1>
              <span className={`badge font-bold ${editedStatus === 'Active' ? 'badge-green' : 'bg-red-100 text-red-700 border border-red-200'}`}>● {editedStatus}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 font-mono">{vehicle.reg} · {vehicle.type} · {vehicle.cap} cap</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} className="btn bg-gray-100 text-gray-600 hover:bg-gray-200"><X size={16}/> Cancel</button>
              <button onClick={() => setEditing(false)} className="btn btn-primary"><Save size={16}/> Save Changes</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="btn btn-dark"><Edit3 size={16}/> Edit Vehicle</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* Specs */}
          <div className="card bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Settings size={12}/> Vehicle Specs</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Make & Model', value: vehicle.make },
                { label: 'Category', value: vehicle.type },
                { label: 'VIN', value: vehicle.vin, mono: true },
                { label: 'Fuel Type', value: vehicle.fuelType },
                { label: 'Payload Cap.', value: `${vehicle.cap}` },
                { label: 'Odometer', value: vehicle.odometer },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 col-span-2">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.label}</p>
                  <p className={`text-sm font-bold text-gray-900 mt-0.5 ${item.mono ? 'font-mono text-xs' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Config */}
          <div className="card bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Operational Config</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">Status</label>
                {editing
                  ? <select className="input" value={editedStatus} onChange={e => setEditedStatus(e.target.value)}><option>Active</option><option>Maintenance</option><option>Out of Service</option></select>
                  : <span className={`badge ${editedStatus === 'Active' ? 'badge-green' : 'bg-red-100 text-red-700'} text-xs font-bold`}>{editedStatus}</span>
                }
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">Home Depot</label>
                {editing
                  ? <select className="input" value={editedDepot} onChange={e => setEditedDepot(e.target.value)}><option>Sydney Central Depot</option><option>Melbourne North Hub</option><option>Brisbane Port Facility</option></select>
                  : <p className="text-sm font-bold text-gray-800">{editedDepot}</p>
                }
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 block flex items-center gap-1"><User size={10}/> Assigned Driver</label>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:bg-yellow-50 hover:border-yellow-300 transition-colors" onClick={() => navigate('/admin/drivers/DRV-102')}>
                  <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-black text-[10px] font-black">JT</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{vehicle.assignedDriver.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold">{vehicle.assignedDriver.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Current Job / Live Route */}
          <div className="card bg-white p-5 shadow-sm border-l-4 border-l-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Route size={16}/> Current Assignment</h3>
              <span className="badge badge-green font-bold">● In Transit</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-3">
              <MapPin size={16} className="text-yellow-500 shrink-0"/>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Route</p>
                <p className="font-bold text-gray-900 text-sm">{vehicle.currentJob.route}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-bold text-gray-500">Route Completion</span>
                <span className="text-xs font-bold text-green-600">{vehicle.currentJob.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${vehicle.currentJob.progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Service Status */}
          <div className="card bg-white shadow-sm">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Wrench size={16}/> Maintenance Schedule</h3>
              <span className="badge badge-green text-[10px] font-bold">✓ On Schedule</span>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Last Service</p>
                <p className="font-bold text-gray-900 text-sm">{vehicle.service.lastService}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest mb-1">Next Service Due</p>
                <p className="font-bold text-gray-900 text-sm">{vehicle.service.nextService}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Service Type</th>
                    <th className="px-5 py-3">Odometer</th>
                    <th className="px-5 py-3 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vehicle.service.history.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-700">{s.date}</td>
                      <td className="px-5 py-3 font-bold text-gray-900">{s.type}</td>
                      <td className="px-5 py-3 text-gray-600 font-mono text-xs">{s.km}</td>
                      <td className="px-5 py-3 font-bold text-gray-900 text-right">{s.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fuel Log */}
          <div className="card bg-white shadow-sm">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Droplet size={16}/> Recent Fuel Logs</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {vehicle.fuelLog.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                      <Droplet size={18}/>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{f.station}</p>
                      <p className="text-xs text-gray-500 font-medium">{f.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{f.cost}</p>
                    <p className="text-xs text-gray-500 font-bold">{f.litres}</p>
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
