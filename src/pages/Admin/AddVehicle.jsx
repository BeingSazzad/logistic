import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Save } from 'lucide-react';

export default function AdminAddVehicle() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/admin/fleet')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Fleet
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Vehicle</h1>
          <p className="text-sm text-gray-500 mt-1">Register a new truck, trailer or van to the global fleet.</p>
        </div>
        <button className="btn btn-primary"><Save size={16}/> Save Vehicle</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 md:col-span-2">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Vehicle Identification</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Registration Number (Plate)</label>
                <input type="text" className="input" placeholder="e.g. XQG-984" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Type</label>
                <select className="input">
                  <option>Heavy Truck (Semi)</option>
                  <option>B-Double</option>
                  <option>Rigid Truck</option>
                  <option>Delivery Van</option>
                  <option>Trailer (Flatbed)</option>
                  <option>Trailer (Refrigerated)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">VIN / Chassis Number</label>
                <input type="text" className="input" placeholder="17-digit identification" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Make & Model</label>
                <input type="text" className="input" placeholder="e.g. Kenworth T610" />
              </div>
           </div>
        </div>

        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Specs & Capacity</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payload Capacity (Tonnes)</label>
                <input type="number" className="input" placeholder="e.g. 22" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fuel Type</label>
                <select className="input">
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>LNG</option>
                </select>
              </div>
           </div>
        </div>

        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Operational Status</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Initial Status</label>
                <select className="input">
                  <option>Active / Available</option>
                  <option>In Maintenance</option>
                  <option>Out of Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Default Depot Assignment</label>
                <select className="input">
                  <option>Sydney Central Depot</option>
                  <option>Melbourne North Hub</option>
                  <option>Brisbane Port Facility</option>
                </select>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
