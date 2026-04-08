import React from 'react';
import { Search, MapPin, Phone, Star, AlertCircle, Filter } from 'lucide-react';

export default function DispatchDrivers() {
  const drivers = [
    { id: 'DRV-102', name: 'Jack Taylor',   phone: '+61 411 000 001', rank: 'Senior', status: 'On Duty', assigned: 'JOB-20481', rating: 4.8 },
    { id: 'DRV-105', name: 'Liam Smith',   phone: '+61 412 000 002', rank: 'Regular',status: 'On Duty', assigned: 'JOB-20482', rating: 4.5 },
    { id: 'DRV-118', name: 'Noah Williams',    phone: '+61 413 000 003', rank: 'Regular',status: 'Delay Alert', assigned: 'JOB-20483', rating: 4.2 },
    { id: 'DRV-134', name: 'Oliver Brown', phone: '+61 414 000 004', rank: 'Junior', status: 'Off Duty',  assigned: '-', rating: 4.0 },
    { id: 'DRV-145', name: 'Lucas Jones', phone: '+61 415 000 005', rank: 'Senior', status: 'On Leave',  assigned: '-', rating: 4.9 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Duty': return 'bg-green-100 text-green-700';
      case 'Delay Alert': return 'bg-red-100 text-red-700 font-bold';
      case 'Off Duty': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Driver Management</h1>
          <p className="text-sm text-gray-500 mt-1">Directory of all fleet operators</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
         <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search driver by name, ID or phone..." className="input pl-9" />
         </div>
         <button className="btn btn-dark">
            <Filter size={16} /> Filters
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {drivers.map(drv => (
          <div key={drv.id} className={`card p-5 border-l-4 ${drv.status === 'Delay Alert' ? 'border-l-red-500' : drv.status === 'On Duty' ? 'border-l-green-500' : 'border-l-gray-300'}`}>
            <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden font-bold">
                    {drv.name.split(' ').map(n=>n[0]).join('')}
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900 leading-tight">{drv.name}</h3>
                   <p className="text-xs text-gray-500 font-mono mt-0.5">{drv.id}</p>
                 </div>
               </div>
               <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(drv.status)}`}>
                 {drv.status}
               </span>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><Phone size={14}/> Phone</span>
                <span className="font-medium text-gray-900">{drv.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><MapPin size={14}/> Active Job</span>
                <span className="font-bold text-gray-900">{drv.assigned}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><Star size={14}/> Rating</span>
                <span className="font-semibold text-yellow-600">{drv.rating} / 5.0</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex gap-2">
              <button className="flex-1 btn btn-dark py-2 text-sm">Send Message</button>
              {drv.status === 'Delay Alert' && (
                <button className="btn bg-red-100 hover:bg-red-200 text-red-700 p-2"><AlertCircle size={18} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
