import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, RefreshCw, ExternalLink, Check,
  MapPin, Truck, User, Info, ChevronRight, CheckCircle, 
  ChevronDown, PackageX, RotateCcw, Trash2
} from 'lucide-react';

export default function AdminExceptions() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [issues, setIssues] = useState([
    { id: 'SHP-9039', title: 'Location Problem', detail: 'The driver is in the wrong place for this drop-off.', priority: 'High', category: 'GPS', driver: 'Liam Smith', time: '14 mins ago', icon: MapPin, color: 'text-red-500', bg: 'bg-red-50', status: 'Pending' },
    { id: 'SHP-9011', title: 'Temperature Alert', detail: 'The truck storage is too warm for the items.', priority: 'Critical', category: 'Sensor', driver: 'Oliver Brown', time: '41 mins ago', icon: Truck, color: 'text-orange-500', bg: 'bg-orange-50', status: 'Pending' },
    { id: 'SHP-8992', title: 'Customer Refusal', detail: 'The client did not want to take the items today.', priority: 'Medium', category: 'Customer', driver: 'Noah Williams', time: '2 hrs ago', icon: User, color: 'text-blue-500', bg: 'bg-blue-50', status: 'Pending' }
  ]);

  const updateStatus = (id, newStatus) => {
    setIssues(issues.map(i => i.id === id ? { ...i, status: newStatus } : i));
    setActiveDropdown(null);
  };

  const clearResolved = () => {
    setIssues(issues.filter(i => i.status === 'Pending'));
  };

  const resolvedCount = issues.filter(i => i.status !== 'Pending').length;

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Resolved': return { border: 'border-emerald-500', badge: 'bg-emerald-600', bg: 'bg-emerald-50/10', icon: CheckCircle, shadow: 'shadow-emerald-50' };
      case 'Redelivery': return { border: 'border-blue-500', badge: 'bg-blue-600', bg: 'bg-blue-50/10', icon: RefreshCw, shadow: 'shadow-blue-50' };
      case 'Returned': return { border: 'border-amber-500', badge: 'bg-amber-600', bg: 'bg-amber-50/10', icon: RotateCcw, shadow: 'shadow-amber-50' };
      case 'Damaged': return { border: 'border-red-500', badge: 'bg-red-600', bg: 'bg-red-50/10', icon: PackageX, shadow: 'shadow-red-50' };
      default: return { border: 'border-gray-100', badge: 'bg-gray-600', bg: 'bg-white', icon: AlertCircle, shadow: 'shadow-sm' };
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto pb-12 px-2">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-xl text-white shadow-sm">
            <AlertCircle size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 leading-none">Delivery Issues</h1>
            <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{issues.length} Items Pending Action</p>
          </div>
        </div>
        
        {resolvedCount > 0 && (
           <button 
             onClick={clearResolved}
             className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 shadow-inner"
           >
              <Trash2 size={14}/> Clear {resolvedCount} Resolved
           </button>
        )}
      </div>

      {issues.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
           </div>
           <h2 className="text-xl font-black text-gray-900 mb-1">Excellent! No active issues</h2>
           <p className="text-sm text-gray-500 font-medium">All deliveries are moving smoothly across the network.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {issues.map((item) => {
            const isResolved = item.status !== 'Pending';
            const config = getStatusConfig(item.status);
            const StatusIcon = config.icon;

            return (
              <div key={item.id} className={`bg-white rounded-2xl border transition-all overflow-visible group relative ${isResolved ? `${config.border} shadow-md ${config.shadow} ${config.bg}` : 'border-gray-100 shadow-sm hover:border-red-200'}`}>
                <div className="flex flex-col md:flex-row md:items-center relative">
                   
                   {/* Removed Top-Right Badge - Moving to middle */}

                   {/* Parcel ID */}
                   <div 
                     onClick={() => navigate(`/admin/shipments/${item.id}`)}
                     className={`p-4 md:w-48 flex flex-col items-center justify-center cursor-pointer transition-colors border-b md:border-b-0 md:border-r border-gray-100 group/id ${isResolved ? 'bg-transparent' : 'bg-gray-50/50 hover:bg-red-50'}`}
                   >
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.time}</span>
                      <div className="flex items-center gap-1.5 font-black text-gray-900 group-hover/id:text-red-500 transition-colors">
                         {item.id} <ChevronRight size={14}/>
                      </div>
                   </div>

                   {/* Details (Middle Section) */}
                   <div className="p-4 md:flex-1 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isResolved ? `${config.badge} text-white` : `${item.bg} ${item.color}`}`}>
                         {isResolved ? <StatusIcon size={20} strokeWidth={3}/> : <item.icon size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${item.priority === 'Critical' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                               {item.priority}
                            </span>
                            
                            {/* NEW: Status Badge in the middle */}
                            {isResolved && (
                               <span className={`${config.badge} text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm`}>
                                  <StatusIcon size={10} strokeWidth={4}/> {item.status}
                               </span>
                            )}

                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">{item.category}</span>
                         </div>
                         <h3 className="text-sm font-black text-gray-900 truncate">{item.title}</h3>
                         <p className="text-xs font-medium text-gray-400 leading-tight truncate">{item.detail} • Driver: {item.driver}</p>
                      </div>
                   </div>

                   {/* Action Dropdown */}
                   <div className="p-4 border-t md:border-t-0 md:border-l border-gray-100 flex items-center justify-end relative">
                      <div className="relative w-full md:w-48">
                         <button 
                           onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }}
                           className={`w-full flex items-center justify-between px-4 py-2.5 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all ${isResolved ? 'bg-white border border-gray-200 text-gray-900 shadow-sm' : 'bg-[#FFCC00] text-black hover:bg-[#E6B800]'}`}
                         >
                            {isResolved ? item.status : 'Update Status'} <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`}/>
                         </button>

                         {activeDropdown === item.id && (
                           <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
                              {[
                                { label: 'Mark Resolved', desc: 'Issue is fully fixed', status: 'Resolved', icon: Check, color: 'emerald', hover: 'hover:bg-emerald-50', iconBg: 'bg-emerald-50', iconCol: 'text-emerald-600', iconFull: 'bg-emerald-600' },
                                { label: 'Deliver Again', desc: 'Retry delivery attempt', status: 'Redelivery', icon: RefreshCw, color: 'blue', hover: 'hover:bg-blue-50', iconBg: 'bg-blue-50', iconCol: 'text-blue-600', iconFull: 'bg-blue-600' },
                                { label: 'Return to Hub', desc: 'Bring back to branch', status: 'Returned', icon: RotateCcw, color: 'amber', hover: 'hover:bg-amber-50', iconBg: 'bg-amber-50', iconCol: 'text-amber-600', iconFull: 'bg-amber-600' },
                                { label: 'Mark Damaged', desc: 'Report items broken', status: 'Damaged', icon: PackageX, color: 'red', hover: 'hover:bg-red-50', iconBg: 'bg-red-50', iconCol: 'text-red-600', iconFull: 'bg-red-600' },
                              ].map((opt) => (
                                <button 
                                  key={opt.status}
                                  onClick={() => updateStatus(item.id, opt.status)}
                                  className={`w-full px-4 py-3 text-left flex items-center gap-3 group/opt transition-colors border-b border-gray-50 last:border-0 ${opt.hover}`}
                                >
                                   <div className={`w-8 h-8 rounded-lg ${opt.iconBg} ${opt.iconCol} flex items-center justify-center group-hover/opt:${opt.iconFull} group-hover/opt:text-white transition-all`}>
                                      <opt.icon size={16}/>
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-black uppercase text-gray-900 leading-none">{opt.label}</p>
                                      <p className="text-[9px] text-gray-400 mt-1">{opt.desc}</p>
                                   </div>
                                </button>
                              ))}
                           </div>
                         )}
                      </div>
                   </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-gray-900 p-4 rounded-2xl text-white flex items-center gap-4">
         <div className="w-8 h-8 rounded-lg bg-[#FFCC00] flex items-center justify-center text-black shrink-0 shadow-sm">
            <Info size={18}/>
         </div>
         <p className="text-[11px] font-bold text-gray-400">
            Issues now display their status in the middle column next to the priority. Track and clear resolved issues using the top action bar.
         </p>
      </div>

    </div>
  );
}
