import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Filter, Plus, Clock, CheckCircle2, AlertTriangle, Truck, ArrowDownUp } from 'lucide-react';

export default function AdminShipments() {
  const navigate = useNavigate();
  
  const shipments = [
    { id: 'SHP-9042', origin: 'Sydney Central Hub', dest: 'Melbourne North Hub', customer: 'Acme Corp Logistics', status: 'In Transit', progress: 45, type: 'FTL', driver: 'Jack Taylor', est: 'Today 4:00 PM' },
    { id: 'SHP-9041', origin: 'Port Botany', dest: 'Penrith Drop', customer: 'Tech Solutions Ltd', status: 'At Pickup', progress: 15, type: 'LTL', driver: 'Sarah Mitchell', est: 'Today 6:30 PM' },
    { id: 'SHP-9039', origin: 'Brisbane Port Facility', dest: 'Gold Coast DC', customer: 'Global Traders', status: 'Exception', progress: 60, type: 'Express', driver: 'Liam Smith', est: 'Delayed' },
    { id: 'SHP-9035', origin: 'Adelaide Depot', dest: 'Sydney Central Hub', customer: 'Acme Corp Logistics', status: 'Delivered', progress: 100, type: 'FTL', driver: 'Noah Williams', est: 'Completed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'In Transit': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Exception': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Active Shipments</h1>
          <p className="text-sm text-gray-500 mt-1">Company-wide view of all physical freight movement and lifecycle states.</p>
        </div>
        <button onClick={() => navigate('/dispatch/jobs/create')} className="btn btn-primary"><Plus size={16}/> New Shipment</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume (24h)', value: '1,204', icon: Package, border: 'border-l-blue-500' },
          { label: 'On Road Now', value: '84', icon: Truck, border: 'border-l-indigo-500' },
          { label: 'Exceptions / Delays', value: '3', icon: AlertTriangle, border: 'border-l-red-500', isAlert: true },
          { label: 'Delivered Today', value: '412', icon: CheckCircle2, border: 'border-l-emerald-500' },
        ].map((kpi, i) => (
          <div key={i} className={`card p-4 flex items-center justify-between border-l-4 ${kpi.border} bg-white shadow-sm hover:shadow transition-shadow`}>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">{kpi.label}</p>
              <p className={`text-2xl font-black mt-0.5 ${kpi.isAlert ? 'text-red-600' : 'text-gray-900'}`}>{kpi.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.isAlert ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="card bg-white mt-2 shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
           <div className="relative w-full sm:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search SHP- ID, Origin, or Customer..." className="input pl-9 w-full bg-white border-gray-200" />
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <ArrowDownUp size={14}/> 
               <span className="text-xs font-bold">Sort</span>
             </button>
             <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 flex-1 sm:flex-none">
               <Filter size={14}/> 
               <span className="text-xs font-bold">Filters <span className="bg-[#FACC15] text-black text-[9px] px-1.5 py-0.5 rounded ml-1">Active</span></span>
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-gray-50/80 text-[11px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Reference</th>
                 <th className="px-6 py-4">Route / Location</th>
                 <th className="px-6 py-4">State</th>
                 <th className="px-6 py-4">Assignment</th>
                 <th className="px-6 py-4 text-right">ETA</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {shipments.map(shp => (
                 <tr className="hover:bg-gray-50 transition-colors cursor-pointer group" key={shp.id} onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                   <td className="px-6 py-5">
                     <div className="font-black text-gray-900 text-sm tracking-tight group-hover:text-[#FACC15] transition-colors">{shp.id}</div>
                     <div className="text-xs font-semibold text-gray-500 mt-0.5">{shp.customer}</div>
                   </td>
                   <td className="px-6 py-5">
                     <div className="font-bold text-gray-800 text-xs mb-1">{shp.origin}</div>
                     <div className="flex items-center gap-2">
                       <span className="w-px h-3 bg-gray-300 ml-1"></span>
                     </div>
                     <div className="font-bold text-gray-800 text-xs mt-1">{shp.dest}</div>
                   </td>
                   <td className="px-6 py-5">
                     <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded border ${getStatusColor(shp.status)} mb-2 inline-block`}>
                       {shp.status}
                     </span>
                     <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div className={`h-full ${shp.status === 'Exception' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${shp.progress}%` }}></div>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                     <div className="font-bold text-gray-800 text-sm flex items-center gap-2">{shp.driver}</div>
                     <div className="text-[10px] font-black uppercase text-gray-400 mt-1">{shp.type}</div>
                   </td>
                   <td className="px-6 py-5 text-right font-medium text-gray-600 flex flex-col items-end gap-1">
                     <div className="flex items-center gap-1.5 font-bold text-gray-900"><Clock size={14} className="text-gray-400"/> {shp.est}</div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
