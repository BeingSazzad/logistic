import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Edit3, Save, X, Truck, Gauge, Wrench,
  Droplet, MapPin, User, AlertTriangle, CheckCircle2,
  Clock, Route, TrendingUp, Package, Settings, Camera, Upload, AlignLeft, Plus
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
  currentShipment: { id: 'SHP-20481', route: 'Sydney Port → Blacktown DC', progress: 65 },
  odometer: '184,220 km',
  fuelLog: [
    { date: 'Today 09:14', litres: '120L', cost: '$228.00', station: 'Caltex Chullora' },
    { date: '06 Apr 07:30', litres: '95L',  cost: '$180.50', station: 'BP Matraville' },
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

export default function AdminVehicleDetail() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(vehicle.status);
  const [editedDepot, setEditedDepot] = useState(vehicle.depot);
  const [photo, setPhoto] = useState(null);
  const [notes, setNotes] = useState(vehicle.notes);

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Back Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/fleet')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Fleet Asset Details</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Manage specifications, status, and maintenance for {vehicle.reg}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm">
                Cancel
              </button>
              <button onClick={() => setEditing(false)} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
                <Save size={18} strokeWidth={2.5}/> Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
              <Edit3 size={18} /> Edit Vehicle
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Asset Gallery & Identity ── */}
      <div className="flex flex-col lg:flex-row gap-8 px-2 mb-4">
        {/* Gallery Selector */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-[#111] overflow-hidden shadow-xl border-4 border-white group">
            <img 
              src={photo || "/assets/truck_front.png"} 
              alt="Fleet Asset" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {editing && (
              <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={32} className="text-white mb-2" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Update Primary Photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
               <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                 <p className="text-[10px] font-black text-[#FFCC00] uppercase tracking-widest">Asset Serial</p>
                 <p className="text-sm font-bold text-white uppercase font-mono">{vehicle.vin}</p>
               </div>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-3">
            {[
              { src: "/assets/truck_front.png", label: 'Front' },
              { src: "/assets/truck_side.png", label: 'Side' },
              { src: "/assets/truck_cabin.png", label: 'Cabin' }
            ].map((img, i) => (
              <button 
                key={i} 
                onClick={() => setPhoto(img.src)}
                className={`w-24 h-16 rounded-lg border-2 overflow-hidden transition-all shadow-sm ${photo === img.src ? 'border-[#FFCC00] scale-105 shadow-md' : 'border-white hover:border-gray-200'}`}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              </button>
            ))}
            <button className="w-24 h-16 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#111] hover:border-[#111] transition-all bg-gray-50/50">
              <Plus size={16}/>
              <span className="text-[8px] font-black uppercase tracking-tight">Add View</span>
            </button>
          </div>
        </div>

        {/* Identity Details */}
        <div className="lg:w-1/3 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border text-center flex items-center gap-1.5 ${editedStatus === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div> {editedStatus}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md border border-gray-200 text-gray-500 uppercase tracking-widest">{vehicle.type}</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-2">{vehicle.id}</h2>
          <h3 className="text-xl font-bold text-gray-500 tracking-tight mb-4">{vehicle.make}</h3>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Gauge size={12}/> Odometer</p>
               <p className="text-lg font-black text-gray-900 leading-none">{vehicle.odometer}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><TrendingUp size={12} className="text-emerald-500"/> Efficiency</p>
               <p className="text-lg font-black text-gray-900 leading-none">18.4<span className="text-xs text-gray-400">L</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* Vehicle Specs */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <Settings className="text-gray-500" size={16} />
               <h3 className="text-xs font-bold text-[#111] uppercase tracking-wide">Vehicle Specs</h3>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {[
                { label: 'Registration', value: vehicle.reg },
                { label: 'Make & Model', value: vehicle.make },
                { label: 'Year', value: vehicle.year },
                { label: 'Category', value: vehicle.type },
                { label: 'VIN / Chassis', value: vehicle.vin, mono: true },
                { label: 'Fuel Type', value: vehicle.fuelType },
                { label: 'Payload Cap.', value: vehicle.cap },
                { label: 'Odometer', value: vehicle.odometer },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.label}</p>
                  <p className={`text-sm font-bold text-gray-900 mt-0.5 ${item.mono ? 'font-mono text-xs' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Config */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl group-hover:bg-gray-700/50 transition-all"></div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2 relative z-10">
               <MapPin size={16}/> Operational Config
            </h3>
            
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                {editing
                  ? <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-white/40 leading-tight" value={editedStatus} onChange={e => setEditedStatus(e.target.value)}><option className="text-black">Active</option><option className="text-black">Maintenance</option><option className="text-black">Out of Service</option></select>
                  : <span className="text-sm font-bold text-green-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div> {editedStatus}</span>
                }
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Home Depot</label>
                {editing
                  ? <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-white/40 leading-tight" value={editedDepot} onChange={e => setEditedDepot(e.target.value)}><option className="text-black">Sydney Central Depot</option><option className="text-black">Melbourne North Hub</option><option className="text-black">Brisbane Port Facility</option></select>
                  : <p className="text-sm font-bold text-white">{editedDepot}</p>
                }
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><User size={12}/> Assigned Driver</label>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden group">
                  <div className="w-8 h-8 rounded shrink-0 bg-[#FFCC00] flex items-center justify-center text-black text-[10px] font-black">
                    {vehicle.assignedDriver.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{vehicle.assignedDriver.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{vehicle.assignedDriver.id}</p>
                  </div>
                  {editing ? (
                    <button className="text-[10px] font-black text-[#FFCC00] border border-[#FFCC00]/40 px-2.5 py-1.5 rounded bg-[#FFCC00]/10 hover:bg-[#FFCC00] hover:text-black transition-all uppercase tracking-tighter">
                      Change Operator
                    </button>
                  ) : (
                    <button onClick={() => navigate(`/admin/drivers/${vehicle.assignedDriver.id}`)} className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                      View Profile →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Other Info */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
               <AlignLeft className="text-gray-500" size={16} />
               <h3 className="text-xs font-bold text-[#111] uppercase tracking-wide">Additional Notes</h3>
            </div>
            <div className="p-5">
              {editing ? (
                <textarea
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Additional notes about this vehicle..."
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100/50">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{notes || 'No additional notes provided.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Current Job */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
            <div className="p-5 border-b border-gray-100 flex justify-between items-center ml-1">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Route size={16}/> Current Assignment</h3>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] uppercase tracking-widest">In Transit</span>
            </div>
            <div className="p-5 ml-1">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                <MapPin size={18} className="text-[#FFCC00] shrink-0"/>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Active Route</p>
                  <p className="font-bold text-gray-900 text-[15px]">{vehicle.currentShipment.route}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Route Completion</span>
                  <span className="text-xs font-black text-green-600">{vehicle.currentShipment.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${vehicle.currentShipment.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide flex items-center gap-2"><Wrench className="text-gray-400" size={16}/> Maintenance Schedule</h3>
              <span className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> On Schedule</span>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Last Service</p>
                <p className="font-bold text-gray-900 text-sm">{vehicle.service.lastService}</p>
              </div>
              <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
                <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest mb-1.5">Next Service Due</p>
                <p className="font-bold text-gray-900 text-sm">{vehicle.service.nextService}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Service Type</th>
                    <th className="px-5 py-4">Odometer</th>
                    <th className="px-5 py-4 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vehicle.service.history.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-500">{s.date}</td>
                      <td className="px-5 py-3.5 font-bold text-gray-900">{s.type}</td>
                      <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{s.km}</td>
                      <td className="px-5 py-3.5 font-bold text-gray-900 text-right">{s.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fuel Log */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide flex items-center gap-2"><Droplet className="text-blue-400" size={16}/> Recent Fuel Logs</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {vehicle.fuelLog.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded shrink-0 bg-blue-50 flex items-center justify-center text-blue-500">
                      <Droplet size={18}/>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{f.station}</p>
                      <p className="text-[11px] text-gray-400 font-medium tracking-tight mt-0.5">{f.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{f.cost}</p>
                    <p className="text-[11px] text-gray-400 font-bold tracking-tight uppercase tracking-widest mt-0.5">{f.litres}</p>
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
