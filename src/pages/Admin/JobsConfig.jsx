import React from 'react';
import { Settings2, Plus, Info } from 'lucide-react';

export default function AdminJobsConfig() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Job & Process Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">Define how jobs behave, status flows, and Proof of Delivery (POD) requirements.</p>
        </div>
        <button className="btn btn-primary">Save Configurations</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Job Types */}
        <div className="card bg-white shadow-sm p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
             <h3 className="font-bold text-gray-900 flex items-center gap-2"><Settings2 size={16}/> Supported Job Types</h3>
             <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"><Plus size={14}/> Add Type</button>
          </div>
          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div><p className="font-bold text-sm text-gray-900">FTL (Full Truckload)</p><p className="text-xs text-gray-500">Dedicated vehicle routing</p></div>
                <input type="checkbox" defaultChecked className="toggle" />
             </div>
             <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div><p className="font-bold text-sm text-gray-900">LTL (Less Than Truckload)</p><p className="text-xs text-gray-500">Shared vehicle space</p></div>
                <input type="checkbox" defaultChecked className="toggle" />
             </div>
             <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div><p className="font-bold text-sm text-gray-900">Express / Courier</p><p className="text-xs text-gray-500">Point to point priority</p></div>
                <input type="checkbox" defaultChecked className="toggle" />
             </div>
          </div>
        </div>

        {/* Pricing & Logic */}
        <div className="card bg-white shadow-sm p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
             <h3 className="font-bold text-gray-900 flex items-center gap-2"><Settings2 size={16}/> Default Pricing Rules</h3>
          </div>
          <div className="flex flex-col gap-4">
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">Pricing Model Calculation</label>
               <select className="input"><option>Flat Fee + Extas</option><option>Per Kilometer (Distance)</option><option>Volume / Weight Based</option></select>
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">Default Base Rate (AUD)</label>
               <input type="number" defaultValue="250.00" className="input" />
             </div>
          </div>
        </div>

        {/* POD Requirements */}
        <div className="card bg-white shadow-sm p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">Proof of Delivery (POD) Logic</h3>
             <Info className="text-gray-400" size={16}/>
          </div>
          <div className="flex items-center gap-6">
             <label className="flex items-center gap-2 text-sm font-semibold text-gray-800"><input type="checkbox" defaultChecked /> Require Driver Photo Upload</label>
             <label className="flex items-center gap-2 text-sm font-semibold text-gray-800"><input type="checkbox" defaultChecked /> Require Receiver E-Signature</label>
             <label className="flex items-center gap-2 text-sm font-semibold text-gray-800"><input type="checkbox" /> Mandate GPS Geofence Check</label>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">If Geofence Check is mandated, the driver application will block the delivery completion status unless the device's exact coordinates match within a 50m radius of the drop-off location address.</p>
        </div>

      </div>
    </div>
  );
}
