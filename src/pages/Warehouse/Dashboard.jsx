import React from 'react';
import { 
  Box, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Barcode,
  AlertOctagon,
  CheckCircle2,
  Trash2,
  Move,
  History,
  Truck,
  Package,
  Clock,
  LayoutGrid
} from 'lucide-react';

export default function WarehouseDashboard() {
  const activeTasks = [
    { id: 'RCV-9042', type: 'Inbound', items: 45, vehicle: 'TRK-102', eta: '12:00 PM', gate: 'DOCK-4', priority: 'High' },
    { id: 'RCV-9043', type: 'Inbound', items: 12, vehicle: 'VAN-08',  eta: '12:45 PM', gate: 'DOCK-1', priority: 'Normal' },
    { id: 'LOD-8012', type: 'Outbound', items: 124, vehicle: 'TRK-05', eta: '01:30 PM', gate: 'DOCK-6', priority: 'Critical' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── 1. Strategic Operation Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <LayoutGrid className="text-yellow-500" size={24}/> Floor Command
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
             Zone: <span className="text-gray-900">SYD-CENTRAL-A14</span> • Station: <span className="text-gray-900">WH-SCAN-01</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Shift</span>
              <span className="text-sm font-black text-gray-900">06:00 → 15:00</span>
           </div>
           <div className="w-px h-8 bg-gray-100"></div>
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Scanner</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1"><span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span> Connected</span>
           </div>
        </div>
      </div>

      {/* ── 2. The Operational Block Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
         
         {/* Action: Receive */}
         <button className="lg:col-span-2 bg-yellow-400 p-6 rounded-[2rem] shadow-xl shadow-yellow-400/20 flex flex-col items-center justify-center text-center gap-4 group active:scale-95 transition-all">
            <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
               <ArrowDownToLine size={32} strokeWidth={3} className="text-black" />
            </div>
            <div>
               <h3 className="font-black text-black uppercase text-sm tracking-widest">Receive Load</h3>
               <p className="text-[10px] font-bold text-black/60 uppercase mt-1">Inbound Manifesting</p>
            </div>
         </button>

         {/* Action: Load */}
         <button className="lg:col-span-2 bg-[#111] p-6 rounded-[2rem] shadow-xl shadow-black/20 flex flex-col items-center justify-center text-center gap-4 group active:scale-95 transition-all">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform text-[#FACC15]">
               <ArrowUpFromLine size={32} strokeWidth={3} />
            </div>
            <div>
               <h3 className="font-black text-white uppercase text-sm tracking-widest">Dispatch Load</h3>
               <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Outbound Verification</p>
            </div>
         </button>

         {/* Misc Actions */}
         <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors group">
               <Move size={20} className="text-gray-400 group-hover:text-blue-500" />
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Relocate</span>
            </button>
            <button className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors group">
               <Barcode size={20} className="text-gray-400 group-hover:text-black" />
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Label Print</span>
            </button>
            <button className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors group">
               <History size={20} className="text-gray-400 group-hover:text-violet-500" />
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Audit</span>
            </button>
            <button className="bg-red-50 p-4 rounded-3xl border border-red-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-red-100 transition-colors group">
               <AlertOctagon size={20} className="text-red-400 group-hover:text-red-600" />
               <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Discrepancy</span>
            </button>
         </div>

      </div>

      {/* ── 3. Heavy Intelligence ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Live Task Feed */}
         <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden min-h-[400px]">
               <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/20 flex justify-between items-center">
                  <h3 className="font-black text-gray-900 text-xs tracking-[0.2em] uppercase flex items-center gap-3">
                     <Clock size={16} className="text-blue-500" /> Current Flow Queue
                  </h3>
                  <div className="flex gap-2">
                     <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900">All Nodes →</button>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                        <tr>
                           <th className="px-8 py-4">Reference</th>
                           <th className="px-8 py-4">Type / Flow</th>
                           <th className="px-8 py-4">Vehicle Point</th>
                           <th className="px-8 py-4">ETA Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {activeTasks.map(task => (
                           <tr key={task.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                              <td className="px-8 py-6">
                                 <div className="font-black text-gray-900 text-sm">{task.id}</div>
                                 <div className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{task.items} Manifested Units</div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${task.type === 'Inbound' ? 'bg-yellow-400' : 'bg-blue-500'}`}></span>
                                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{task.type}</span>
                                 </div>
                                 <span className={`text-[9px] font-black uppercase tracking-widest mt-2 px-2 py-0.5 rounded border inline-block ${task.priority === 'Critical' ? 'bg-red-50 text-red-500 border-red-200 shadow-sm animate-pulse' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                    {task.priority}
                                 </span>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-[10px] font-black text-[#FACC15] shadow-lg">
                                       {task.vehicle.split('-')[0]}
                                    </div>
                                    <div>
                                       <div className="text-xs font-black text-gray-900 uppercase">{task.vehicle}</div>
                                       <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mt-0.5">{task.gate} Assigned</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="flex flex-col">
                                    <span className="text-xs font-black text-gray-900">{task.eta}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">Scheduled Window</span>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Floor Intelligence Panel */}
         <div className="flex flex-col gap-6">
            
            {/* Inventory Capacity */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-all duration-700"></div>
               <h4 className="text-[11px] font-black uppercase text-gray-500 tracking-[0.2em] mb-6">Zone Storage Capacity</h4>
               <div className="flex items-end justify-between gap-4 mb-4">
                  <div className="flex flex-col">
                     <span className="text-4xl font-black text-white">78%</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Utilized Area</span>
                  </div>
                  <div className="text-right">
                     <span className="text-xs font-black text-yellow-400">22% FREE</span>
                  </div>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000" style={{ width: '78%' }}></div>
               </div>
               <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div>
                     <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Pallet Slots</span>
                     <span className="text-sm font-black text-white">412 / 600</span>
                  </div>
                  <div>
                     <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Cold Chain</span>
                     <span className="text-sm font-black text-white">84 / 100</span>
                  </div>
               </div>
            </div>

            {/* Quick Gate View */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Primary Docks Status</h4>
               {[
                 { gate: 'DOCK-1', vehicle: 'VAN-08', status: 'Occupied', color: 'text-amber-500' },
                 { gate: 'DOCK-2', vehicle: '-', status: 'Empty', color: 'text-emerald-500' },
                 { gate: 'DOCK-3', vehicle: '-', status: 'Empty', color: 'text-emerald-500' },
                 { gate: 'DOCK-4', vehicle: 'TRK-102', status: 'Arriving', color: 'text-blue-500 animate-pulse' },
               ].map((g, i) => (
                 <div key={i} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                    <div>
                       <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{g.gate}</span>
                       <p className="text-[10px] font-bold text-gray-400 mt-0.5">{g.vehicle}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${g.color}`}>{g.status}</span>
                 </div>
               ))}
            </div>

         </div>

      </div>

    </div>
  );
}
