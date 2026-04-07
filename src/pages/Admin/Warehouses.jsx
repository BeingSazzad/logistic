import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Warehouse, MapPin, Package, Layers } from 'lucide-react';

export default function AdminWarehouses() {
  const navigate = useNavigate();
  const warehouses = [
    { id: 'WH-01', name: 'Sydney Central Depot', location: 'Chullora, NSW', zones: 12, storage: '85%', capacity: 'High' },
    { id: 'WH-02', name: 'Melbourne North Hub',  location: 'Tullamarine, VIC', zones: 8,  storage: '42%', capacity: 'Medium' },
    { id: 'WH-03', name: 'Brisbane Port Facility', location: 'Lytton, QLD', zones: 15, storage: '92%', capacity: 'Critical' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Warehouse & Depot Setup</h1>
          <p className="text-sm text-gray-500 mt-1">Configure storage locations, zones, and inventory hubs across regions.</p>
        </div>
        <button onClick={() => navigate('/admin/warehouses/add')} className="btn btn-primary"><Plus size={16}/> Add Warehouse</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {warehouses.map(wh => (
          <div key={wh.id} className="card bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                 <Warehouse size={24} />
               </div>
               <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded ${wh.capacity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                 {wh.capacity} Load
               </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">{wh.name}</h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12}/> {wh.location}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Zones</p>
                <p className="text-lg font-bold text-gray-800">{wh.zones}</p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Utilization</p>
                <p className="text-lg font-bold text-gray-800">{wh.storage}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="flex-1 btn bg-gray-900 text-white text-xs py-2">Manage Layout</button>
              <button className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><Package size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
