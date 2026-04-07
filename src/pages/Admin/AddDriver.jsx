import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, FileText, Save } from 'lucide-react';

export default function AdminAddDriver() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[800px]">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
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
