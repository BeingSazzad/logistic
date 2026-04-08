import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, RefreshCw, Hand, ExternalLink, ShieldAlert } from 'lucide-react';

export default function AdminExceptions() {
  const navigate = useNavigate();
  const alerts = [
    { id: 'SHP-9039', issue: 'Geofence Breach', detail: 'Driver confirmed arrival but GPS mismatch > 2km from drop location.', severity: 'High', type: 'Compliance', driver: 'Liam Smith', time: '14 mins ago' },
    { id: 'SHP-9011', issue: 'Temperature Drop', detail: 'Reefer trailer temp fell below 2°C threshold for > 15 mins.', severity: 'Critical', type: 'Sensors/IoT', driver: 'Oliver Brown', time: '41 mins ago' },
    { id: 'SHP-8992', issue: 'Failed Delivery (POD)', detail: 'Receiver refused to sign digital glass. Rejected goods marked.', severity: 'Medium', type: 'Customer', driver: 'Noah Williams', time: '2 hrs ago' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"><AlertOctagon className="text-red-500"/> Exception Management</h1>
          <p className="text-sm text-gray-500 mt-1">Mission-critical operational blocks that require manual Super Admin overrides.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert, idx) => (
          <div key={idx} className="card bg-white shadow-sm border-l-4 border-l-red-500 p-0 overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center">
               
               {/* Metadata Section */}
               <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
                 <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${alert.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-orange-100 text-orange-700'}`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-xs font-bold text-gray-400">{alert.time}</span>
                 </div>
                 <div className="flex items-center gap-2 group-hover:underline cursor-pointer" onClick={() => navigate(`/admin/shipments/${alert.id}`)}>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">{alert.id}</h2>
                    <ExternalLink size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
                 </div>
                 <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">{alert.type} Alert</p>
                 <div className="mt-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center font-black text-[10px]">{alert.driver.substring(0,2).toUpperCase()}</div>
                    <span className="text-sm font-semibold text-gray-700">{alert.driver}</span>
                 </div>
               </div>

               {/* Issue & Resolution Section */}
               <div className="p-6 md:w-2/3 flex flex-col justify-between">
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{alert.issue}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{alert.detail}</p>
                 </div>
                 <div className="mt-6 flex flex-wrap gap-3">
                    <button className="btn bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs py-2 px-4 flex items-center gap-2 font-bold shadow-sm">
                      <ShieldAlert size={14}/> Override Security Protocol
                    </button>
                    <button className="btn btn-dark text-xs py-2 px-4 flex items-center gap-2 font-bold focus:ring focus:ring-gray-300">
                      <RefreshCw size={14}/> Re-Dispatch / Recall
                    </button>
                    <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs py-2 px-4 flex items-center gap-2 font-bold shadow-sm">
                      <Hand size={14}/> Hold Shipment
                    </button>
                 </div>
               </div>
               
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
