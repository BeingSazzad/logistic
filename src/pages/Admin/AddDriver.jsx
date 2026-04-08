import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, FileText, Save, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminAddDriver() {
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
        onClick={() => navigate('/admin/drivers')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Drivers
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Register New Driver</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new operator with license verification and document compliance.</p>
        </div>
        <button className="btn btn-primary"><Save size={16}/> Save Profile</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        {/* Personal Details */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 md:col-span-2">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Personal & Contact Details</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Legal Name</label>
                <input type="text" className="input" placeholder="e.g. Jack Taylor" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input type="email" className="input" placeholder="driver@hero.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Phone (Emergency Contact)</label>
                <input type="text" className="input" placeholder="+61 412 000 000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Home Residence (Regional Area)</label>
                <input type="text" className="input" placeholder="City, State" />
              </div>
           </div>
        </div>

        {/* Driver Photo */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 md:col-span-1 md:row-span-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Driver Photo</h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group min-h-[220px]">
            {photo ? (
              <>
                <img src={photo} alt="Driver preview" className="absolute inset-0 w-full h-full object-cover" />
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
        </div>

        {/* License & Compliance */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><FileText size={14}/> License Details</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">License Type (State Issued)</label>
                <select className="input">
                  <option>NSW - HC (Heavy Combination)</option>
                  <option>NSW - MC (Multi Combination)</option>
                  <option>VIC - HC (Heavy Combination)</option>
                  <option>VIC - MC (Multi Combination)</option>
                  <option>QLD - HR (Heavy Rigid)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">License Number</label>
                <input type="text" className="input" placeholder="e.g. HR-4412" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">License Expiry Date</label>
                <input type="date" className="input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Medical Cert Expiry</label>
                <input type="date" className="input" />
              </div>
           </div>
        </div>

        {/* Profile Settings */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Operational Assignment</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assigned Depot</label>
                <select className="input">
                  <option>Sydney Central Depot</option>
                  <option>Melbourne North Hub</option>
                  <option>Brisbane Port Facility</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Shift Type</label>
                <select className="input">
                  <option>Full-time Permanent</option>
                  <option>Casual</option>
                  <option>Contractor (Subby)</option>
                </select>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
