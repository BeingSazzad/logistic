import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Edit3, Save, Gauge, Wrench, Droplet, MapPin, User,
  CheckCircle2, Clock, Route, TrendingUp, Settings, Camera, AlignLeft, Plus, X
} from 'lucide-react';

const vehicle = {
  id: 'TRK-102',
  reg: 'XQG-984',
  type: 'Heavy Truck (Semi)',
  make: 'Kenworth T610',
  year: '2023',
  vin: '1XKDP4TX8EJ123456',
  cap: '20t',
  fuelType: 'Diesel',
  status: 'Active',
  depot: 'Sydney Central Depot',
  assignedDriver: { id: 'DRV-102', name: 'Jack Taylor' },
  currentLoad: { id: 'SHP-20481', route: 'Sydney Port → Blacktown DC', progress: 65 },
  odometer: '184,220 km',
  fuelLog: [
    { date: 'Today 09:14', litres: '120L', cost: '$228.00', station: 'Caltex Chullora' },
    { date: '06 Apr 07:30', litres: '95L', cost: '$180.50', station: 'BP Matraville' },
    { date: '04 Apr 14:00', litres: '108L', cost: '$205.20', station: 'Shell Penrith' },
  ],
  notes: 'Vehicle primarily used for long-haul routes. No smoking in cabin.',
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

const availableDrivers = [
  { id: 'DRV-102', name: 'Jack Taylor',  status: 'Available', depot: 'Sydney Central Depot' },
  { id: 'DRV-087', name: 'Maria Santos', status: 'Available', depot: 'Sydney Central Depot' },
  { id: 'DRV-091', name: 'Chris Nguyen', status: 'On Leave',  depot: 'Melbourne Depot' },
  { id: 'DRV-044', name: 'Devon Clarke', status: 'Available', depot: 'Sydney Central Depot' },
  { id: 'DRV-058', name: 'Priya Mehta',  status: 'On Shift',  depot: 'Brisbane Port' },
];

// Utility: generate initials from full name
const initials = name => name.split(' ').map(n => n[0]).join('');

export default function AdminVehicleDetail() {
  const navigate = useNavigate();
  const [editing, setEditing]           = useState(false);
  const [editedStatus, setEditedStatus] = useState(vehicle.status);
  const [photo, setPhoto]               = useState(null);
  const [notes, setNotes]               = useState(vehicle.notes);
  const [activeTab, setActiveTab]       = useState('Overview');
  const [selectedDriver, setSelectedDriver] = useState(vehicle.assignedDriver);
  const [showDriverPicker, setShowDriverPicker] = useState(false);

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* ── PAGE HEADER ── */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/fleet')}
            className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Fleet Asset / {vehicle.id}</p>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{vehicle.make}</h1>
            <p className="text-sm text-gray-400">{vehicle.reg} · {vehicle.year}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Status badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border
            ${editedStatus === 'Active'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
              : 'bg-red-50 text-red-600 border-red-100'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
            {editedStatus}
          </div>
          {/* Edit / Save */}
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="h-9 px-4 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg font-semibold transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditing(false)}
                className="h-9 px-4 bg-[#FFCC00] hover:bg-[#E6B800] text-black rounded-lg font-semibold flex items-center gap-2 transition-all text-sm"
              >
                <Save size={15} /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="h-9 px-4 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold flex items-center gap-2 transition-all text-sm"
            >
              <Edit3 size={15} /> Edit
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-100"></div>

      {/* ── GALLERY + KPI PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">

        {/* Left: Vehicle Image */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-lg group">
            <img
              src={photo || '/assets/truck_front.png'}
              alt={vehicle.make}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all"
            />
            {/* Edit mode: photo upload overlay */}
            {editing && (
              <label className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                <div className="w-12 h-12 rounded-full bg-[#FFCC00] text-black flex items-center justify-center mb-2 shadow-xl">
                  <Camera size={20} />
                </div>
                <span className="text-xs font-semibold text-white">Update Photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            )}
            {/* VIN chip — always visible */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
              <p className="text-xs font-semibold text-[#FFCC00] uppercase tracking-widest mb-0.5">VIN</p>
              <p className="text-xs font-bold text-white font-mono tracking-tight">{vehicle.vin}</p>
            </div>
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-2">
            {['/assets/truck_front.png', '/assets/truck_side.png', '/assets/truck_cabin.png'].map((img, i) => (
              <button
                key={i}
                onClick={() => setPhoto(img)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all
                  ${photo === img ? 'border-[#FFCC00]' : 'border-transparent opacity-50 hover:opacity-80'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
            <button className="w-16 h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:text-gray-500 hover:border-gray-300 transition-all">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Right: KPI + Driver */}
        <div className="lg:col-span-5 flex flex-col gap-3">

          {/* Current Driver — dark card */}
          <div className="bg-[#111] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-16 h-16 bg-white/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex justify-between items-center mb-3 relative z-10">
              <span className="text-xs font-medium text-gray-500">Current Driver</span>
              <button
                onClick={() => setShowDriverPicker(true)}
                className="text-xs font-bold text-black bg-[#FFCC00] hover:bg-[#E6B800] transition-colors px-2.5 py-1.5 rounded-lg"
              >
                Change Driver
              </button>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {initials(selectedDriver.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight truncate">{selectedDriver.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <p className="text-xs text-gray-400">{selectedDriver.id} · On Shift</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/admin/drivers/${selectedDriver.id}`)}
                className="text-xs font-medium text-white/50 hover:text-white transition-colors shrink-0"
              >
                View →
              </button>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Gauge size={14} />,       label: 'Odometer',      value: '184,220', unit: 'km' },
              { icon: <TrendingUp size={14} />,   label: 'Avg Efficiency', value: '18.4',   unit: 'L/100km' },
              { icon: <Droplet size={14} />,      label: 'Fuel Level',    value: '68',      unit: '%' },
              { icon: <Clock size={14} />,        label: 'Engine Hours',  value: '4,120',   unit: 'hrs' },
            ].map(kpi => (
              <div key={kpi.label} className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-[#FFCC00] hover:shadow-md transition-all cursor-default">
                <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-[#FFCC00] transition-colors">
                  {kpi.icon}
                  <p className="text-xs font-semibold uppercase tracking-wider">{kpi.label}</p>
                </div>
                <p className="text-xl font-bold text-gray-900">{kpi.value} <span className="text-xs text-gray-400 font-medium">{kpi.unit}</span></p>
              </div>
            ))}
          </div>

          {/* Home Depot */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
              <MapPin size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Home Depot</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{vehicle.depot}</p>
            </div>
          </div>

          {/* Next Service */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Next Service</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.service.nextService}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg
              ${vehicle.service.nextServiceStatus === 'OK'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-600'}`}>
              {vehicle.service.nextServiceStatus === 'OK' ? 'On Track' : 'Urgent'}
            </span>
          </div>
        </div>
      </div>

      {/* ── TABBED SECTION ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mx-2 overflow-hidden">
        {/* Tab Bar */}
        <div className="flex border-b border-gray-100 px-6">
          {['Overview', 'Specs', 'Maintenance', 'Logs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 mr-8 text-xs font-semibold uppercase tracking-wider transition-all relative
                ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFCC00] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 lg:p-8">

          {/* ── OVERVIEW ── */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 flex flex-col gap-6">

                {/* Specs */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Settings size={14} className="text-gray-300" /> Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { label: 'Make',         value: 'Kenworth' },
                      { label: 'Model',        value: 'T610' },
                      { label: 'Year',         value: vehicle.year },
                      { label: 'Engine',       value: 'PACCAR MX-13' },
                      { label: 'Transmission', value: 'Eaton Fuller' },
                      { label: 'VIN',          value: vehicle.vin },
                    ].map(spec => (
                      <div key={spec.label} className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-xs font-medium text-gray-500">{spec.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Load */}
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Route size={14} className="text-gray-400" /> Active Load
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      In Transit
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                      <p className="text-sm font-semibold text-gray-900">{vehicle.currentLoad.route}</p>
                    </div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-gray-400">Route progress</span>
                      <span className="text-xs font-semibold text-emerald-600">{vehicle.currentLoad.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${vehicle.currentLoad.progress}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                    <AlignLeft size={13} className="text-gray-400" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</span>
                  </div>
                  <div className="p-4">
                    {editing
                      ? <textarea
                          className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-900 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/30"
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                          placeholder="Add notes about this vehicle…"
                        />
                      : <p className="text-sm text-gray-600 leading-relaxed">{notes || '—'}</p>
                    }
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-4">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">Recent Activity</h3>
                <div className="relative pl-5 space-y-6 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gray-100">
                  {[
                    { label: 'Telematics Pulse', meta: 'Today 14:20 · Optimal',  dot: 'bg-emerald-500' },
                    { label: 'Refueled',          meta: 'Yesterday · 240L Added', dot: 'bg-[#FFCC00]' },
                    { label: 'Driver Swap',        meta: 'Oct 24 · Mitchell AM',  dot: 'bg-gray-400' },
                  ].map((act, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow ${act.dot}`}></div>
                      <p className="text-sm font-semibold text-gray-900">{act.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{act.meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SPECS ── */}
          {activeTab === 'Specs' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Registration',  value: vehicle.reg },
                { label: 'Make & Model',  value: vehicle.make },
                { label: 'Year',          value: vehicle.year },
                { label: 'Category',      value: vehicle.type },
                { label: 'VIN',           value: vehicle.vin },
                { label: 'Fuel Type',     value: vehicle.fuelType },
                { label: 'Payload',       value: vehicle.cap },
                { label: 'Odometer',      value: vehicle.odometer },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── MAINTENANCE ── */}
          {activeTab === 'Maintenance' && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                  <Wrench size={14} /> Service Schedule
                </h3>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={12} /> On Schedule
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Last Service</p>
                  <p className="text-sm font-semibold text-gray-900">{vehicle.service.lastService}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">Next Due</p>
                  <p className="text-sm font-semibold text-gray-900">{vehicle.service.nextService}</p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Type</th>
                      <th className="px-5 py-3">Odometer</th>
                      <th className="px-5 py-3 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {vehicle.service.history.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 py-3 text-gray-500 text-xs">{s.date}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{s.type}</td>
                        <td className="px-5 py-3 text-gray-500 font-mono text-xs">{s.km}</td>
                        <td className="px-5 py-3 font-semibold text-gray-900 text-right">{s.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── LOGS ── */}
          {activeTab === 'Logs' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <Droplet size={14} /> Fuel Logs
              </h3>
              <div className="divide-y divide-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                {vehicle.fuelLog.map((f, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <Droplet size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{f.station}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{f.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{f.cost}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{f.litres}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── DRIVER PICKER MODAL ── */}
      {showDriverPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDriverPicker(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">Change Driver</h2>
                <p className="text-xs text-gray-400 mt-0.5">Select a driver to assign to this vehicle</p>
              </div>
              <button
                onClick={() => setShowDriverPicker(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
              >
                <X size={16} />
              </button>
            </div>
            {/* List */}
            <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
              {availableDrivers.map(driver => {
                const isSelected    = selectedDriver.id === driver.id;
                const isUnavailable = driver.status === 'On Leave';
                return (
                  <button
                    key={driver.id}
                    disabled={isUnavailable}
                    onClick={() => {
                      setSelectedDriver({ id: driver.id, name: driver.name });
                      setShowDriverPicker(false);
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3.5 text-left transition-all
                      ${isUnavailable ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}
                      ${isSelected ? 'bg-amber-50' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {initials(driver.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
                      <p className="text-xs text-gray-400">{driver.id} · {driver.depot}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg shrink-0
                      ${driver.status === 'Available' ? 'bg-emerald-50 text-emerald-700' :
                        driver.status === 'On Shift'  ? 'bg-blue-50 text-blue-600' :
                                                        'bg-gray-100 text-gray-500'}`}>
                      {driver.status}
                    </span>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFCC00] shrink-0"></div>}
                  </button>
                );
              })}
            </div>
            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowDriverPicker(false)}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


