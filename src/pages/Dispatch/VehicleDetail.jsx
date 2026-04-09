import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Truck, MapPin, CheckCircle2, AlertTriangle,
  Fuel, Calendar, Wrench, Shield, Clock, Activity,
  FileText, ChevronRight, Star, User, Phone
} from 'lucide-react';

const VEHICLE_DB = {
  'TRK-102': { id: 'TRK-102', make: 'Freightliner Cascadia', type: 'Semi Truck', plate: 'XQG-984', year: '2021', status: 'Active', fuel: '72%', mileage: '128,440 km', nextService: 'April 22, 2026', lastService: 'Jan 15, 2026', compliance: 'Valid', driver: 'Jack Taylor', driverInitials: 'JT', driverId: 'DRV-102', capacity: '28t', location: 'Hume Highway, Goulburn NSW', trips: 412, rating: 4.8 },
  'VAN-14':  { id: 'VAN-14',  make: 'Mercedes Sprinter 519', type: 'Cargo Van',  plate: 'VAN-14-SYD', year: '2022', status: 'Loading', fuel: '55%', mileage: '44,200 km', nextService: 'May 10, 2026', lastService: 'Feb 02, 2026', compliance: 'Valid', driver: 'Oliver Brown', driverInitials: 'OB', driverId: 'DRV-134', capacity: '3.5t', location: 'Warehouse A, Sydney NSW', trips: 198, rating: 4.5 },
  'BGT-221': { id: 'BGT-221', make: 'Isuzu FTR 900', type: 'Medium Truck', plate: 'BGT-221', year: '2020', status: 'Delay Alert', fuel: '31%', mileage: '89,100 km', nextService: 'April 15, 2026', lastService: 'Dec 12, 2025', compliance: 'Warning', driver: 'Liam Smith', driverInitials: 'LS', driverId: 'DRV-105', capacity: '9t', location: 'Pacific Highway, NSW', trips: 301, rating: 4.2 },
  'TRK-05':  { id: 'TRK-05',  make: 'Kenworth T610', type: 'Road Train', plate: 'TRK-05-MEL', year: '2019', status: 'Active', fuel: '88%', mileage: '204,000 km', nextService: 'June 01, 2026', lastService: 'Mar 01, 2026', compliance: 'Valid', driver: 'Noah Williams', driverInitials: 'NW', driverId: 'DRV-118', capacity: '42t', location: 'Pacific Highway, NSW', trips: 680, rating: 4.6 },
};

const statusStyle = (s) => {
  if (s === 'Active')       return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  if (s === 'Delay Alert')  return 'bg-red-50 text-red-600 border-red-100 animate-pulse';
  if (s === 'Loading')      return 'bg-amber-50 text-amber-600 border-amber-100';
  return 'bg-gray-100 text-gray-500 border-gray-200';
};

export default function DispatchVehicleDetail() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const v = VEHICLE_DB[vehicleId] || VEHICLE_DB['TRK-102'];

  const fuelColor = Number(v.fuel) > 50 ? 'bg-emerald-500' : Number(v.fuel) > 25 ? 'bg-amber-400' : 'bg-red-500';

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{v.id}</h1>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${statusStyle(v.status)}`}>{v.status}</span>
              {v.compliance === 'Warning' && (
                <span className="text-[10px] font-black px-2 py-1 rounded bg-red-50 text-red-600 border border-red-100 uppercase tracking-widest flex items-center gap-1">
                  <AlertTriangle size={10}/> Compliance Warning
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-medium">{v.make} · {v.type} · Reg: {v.plate}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2">
            <FileText size={16}/> Service Log
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
            <MapPin size={16}/> Track Live
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">

        {/* ── LEFT: Details ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Trips', val: v.trips, icon: Activity, color: 'text-blue-500' },
              { label: 'Mileage', val: v.mileage, icon: MapPin, color: 'text-gray-500' },
              { label: 'Capacity', val: v.capacity, icon: Truck, color: 'text-violet-500' },
              { label: 'Fleet Rating', val: `★ ${v.rating}`, icon: Star, color: 'text-amber-500' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                  <s.icon size={16} className={s.color} />
                </div>
                <p className="text-xl font-black text-gray-900 tracking-tight">{s.val}</p>
              </div>
            ))}
          </div>

          {/* Fuel & Compliance */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
              <Fuel size={18} className="text-gray-400" />
              <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide">Operational Status</h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Fuel */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fuel Level</p>
                  <p className="text-sm font-black text-gray-900">{v.fuel}</p>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${fuelColor} rounded-full transition-all`} style={{ width: v.fuel }}></div>
                </div>
              </div>

              {/* Service info grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Last Service', val: v.lastService, icon: Wrench, color: 'text-gray-400' },
                  { label: 'Next Service Due', val: v.nextService, icon: Calendar, color: 'text-amber-500' },
                  { label: 'Compliance', val: v.compliance, icon: Shield, color: v.compliance === 'Valid' ? 'text-emerald-500' : 'text-red-500' },
                ].map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border ${s.label === 'Compliance' && v.compliance === 'Warning' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                    <s.icon size={18} className={s.color} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                      <p className={`text-xs font-black mt-0.5 ${s.label === 'Compliance' && v.compliance === 'Warning' ? 'text-red-600' : 'text-gray-900'}`}>{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GPS Location */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
              <MapPin size={18} className="text-gray-400" />
              <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide">Last Known Location</h3>
            </div>
            <div className="p-6 flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center shrink-0">
                <MapPin size={28} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-lg font-black text-gray-900 leading-tight">{v.location}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GPS Signal Active · Updated 32 seconds ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Driver & Actions ── */}
        <div className="lg:col-span-1 space-y-6">

          {/* Vehicle Identity */}
          <div className="bg-[#111] rounded-xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-800/50 rounded-full blur-3xl"></div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-300 flex items-center gap-2 relative z-10">
              <Truck size={16}/> Asset Record
            </h3>
            <div className="space-y-4 relative z-10">
              {[
                { label: 'Registration', val: v.plate },
                { label: 'Year', val: v.year },
                { label: 'Make / Model', val: v.make },
                { label: 'Vehicle Type', val: v.type },
                { label: 'GVM Capacity', val: v.capacity },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{r.label}</span>
                  <span className="text-[11px] font-black text-white">{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Driver */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Assigned Operator</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center text-[#FFCC00] font-black text-sm shadow-lg">
                  {v.driverInitials}
                </div>
                <div className="flex-1">
                  <p className="font-black text-gray-900">{v.driver}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">{v.driverId}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/dispatch/drivers/${v.driverId}`)}
                className="mt-4 w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <User size={13}/> View Driver Profile <ChevronRight size={13}/>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Actions</h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <Wrench size={14}/> Schedule Service
              </button>
              <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <FileText size={14}/> View Service Log
              </button>
              <button className="w-full py-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 mt-1">
                <AlertTriangle size={14}/> Report Fault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
