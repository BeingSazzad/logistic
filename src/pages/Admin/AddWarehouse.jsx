import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Warehouse, Layers, Save, MapPin } from 'lucide-react';

export default function AdminAddWarehouse() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/admin/warehouses')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Warehouses
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Warehouse / Depot</h1>
          <p className="text-sm text-gray-500 mt-1">Initialize a new storage facility with zone mapping and regional association.</p>
        </div>
        <button className="btn btn-primary"><Save size={16}/> Save Facility</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Basic Facility Identification */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 md:col-span-2">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><Warehouse size={16}/> Facility Identification</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Facility Name (ID)</label>
                <input type="text" className="input" placeholder="e.g. Sydney Central Depot" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Operational Region</label>
                <select className="input">
                  <option>NSW - New South Wales</option>
                  <option>VIC - Victoria</option>
                  <option>QLD - Queensland</option>
                  <option>WA - Western Australia</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Physical Hub Address</label>
                <div className="relative"><MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" className="input pl-9" placeholder="Street Address, City, State, Postcode" /></div>
              </div>
           </div>
        </div>

        {/* Technical Specs */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><Layers size={14}/> Zone Configuration</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Initial Number of Zones</label>
                <input type="number" className="input" placeholder="e.g. 12" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Storage Capacity (Units)</label>
                <input type="number" className="input" placeholder="e.g. 50000" />
              </div>
              <p className="text-[10px] text-gray-400 font-medium">Define zones now. You will be able to map each specific storage location within these zones in the spatial manager later.</p>
           </div>
        </div>

        {/* Manager & Access */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 bg-gray-50/20">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Facility Governance</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Site Manager</label>
                <select className="input"><option>Select existing admin...</option><option>Assign later</option></select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Scanner Tech Required</label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-xs"><input type="checkbox" className="toggle" defaultChecked /> Barcode Scanning</label>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
