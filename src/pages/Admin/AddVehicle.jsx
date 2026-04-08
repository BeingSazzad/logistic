import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Save, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminAddVehicle() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Vehicle Identification */}
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Year of Manufacture</label>
              <input type="number" className="input" placeholder="e.g. 2024" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Initial Odometer (km)</label>
              <input type="number" className="input" placeholder="e.g. 12500" />
            </div>
          </div>
        </div>

        {/* Vehicle Photo & Other Info */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 md:col-span-1 md:row-span-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Vehicle Photo</h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group min-h-[220px]">
            {photo ? (
              <>
                <img src={photo} alt="Vehicle preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                  <p className="text-white text-sm font-bold flex items-center gap-2"><Upload size={16}/> Change Photo</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                  <ImageIcon size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-600">Upload Photo</p>
                  <p className="text-xs mt-1">JPEG, PNG up to 5MB</p>
                </div>
              </div>
            )}
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
          </div>

          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 mt-4">Other Information</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Notes</label>
            <textarea className="input min-h-[100px] resize-y" placeholder="Any special requirements, history, or notes about this vehicle..."></textarea>
          </div>
        </div>

        {/* Specs & Capacity */}
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

        {/* Operational Status */}
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
