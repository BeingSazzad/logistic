import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowDownToLine, ArrowUpFromLine, Barcode,
  AlertOctagon, Move, History, Clock, 
  Package, Truck, LayoutGrid
} from 'lucide-react';

export default function WarehouseDashboard() {
  const navigate = useNavigate();
  const activeTasks = [
    { id: 'RCV-9042', type: 'Inbound',  items: 45,  vehicle: 'TRK-102', eta: '12:00 PM', gate: 'DOCK-4', priority: 'High' },
    { id: 'RCV-9043', type: 'Inbound',  items: 12,  vehicle: 'VAN-08',  eta: '12:45 PM', gate: 'DOCK-1', priority: 'Normal' },
    { id: 'LOD-8012', type: 'Outbound', items: 124, vehicle: 'TRK-05',  eta: '01:30 PM', gate: 'DOCK-6', priority: 'Critical' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Overview</h1>
          <p className="hero-body text-gray-600 mt-1">
            Zone: <span className="font-bold text-hero-dark">SYD-CENTRAL-A14</span> &nbsp;·&nbsp; Station: <span className="font-bold text-hero-dark">WH-SCAN-01</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Shift</span>
            <span className="text-sm font-semibold text-gray-900">06:00 → 15:00</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scanner</span>
            <span className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Connected
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
        
        {/* Receive */}
        <button onClick={() => navigate('/warehouse/inbound')} className="lg:col-span-2 bg-[#FFCC00] hover:bg-[#E6B800] p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-3 group active:scale-95 transition-all">
          <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowDownToLine size={26} strokeWidth={2.5} className="text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-black uppercase text-sm tracking-widest">Receive Load</h3>
            <p className="text-xs font-bold text-black/60 uppercase mt-0.5">Incoming Handover Scan</p>
          </div>
        </button>

        {/* Inventory Lookup */}
        <button onClick={() => navigate('/warehouse/inventory')} className="lg:col-span-2 bg-white border border-gray-200 hover:border-[#FFCC00] hover:shadow-md p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-3 group transition-all">
          <div className="w-12 h-12 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-[#FFFBEB] group-hover:text-[#F59E0B] transition-colors">
            <Barcode size={26} strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Inventory Lookup</h3>
            <p className="text-xs font-bold text-gray-400 uppercase mt-0.5">Scan to locate parcel</p>
          </div>
        </button>

        {/* Dispatch */}
        <button onClick={() => navigate('/warehouse/outbound')} className="lg:col-span-2 bg-[#111] hover:bg-black p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-3 group active:scale-95 transition-all">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform text-[#FFCC00]">
            <ArrowUpFromLine size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-semibold text-white uppercase text-sm tracking-widest">Dispatch Load</h3>
            <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">Outbound Verification</p>
          </div>
        </button>

        {/* Misc Actions */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {[
            { icon: Move, label: 'Relocate', hoverColor: 'group-hover:text-blue-500' },
            { icon: Barcode, label: 'Label Print', hoverColor: 'group-hover:text-black' },
            { icon: History, label: 'Audit', hoverColor: 'group-hover:text-violet-500' },
            { icon: AlertOctagon, label: 'Discrepancy', hoverColor: 'text-red-400 group-hover:text-red-600', bg: 'bg-red-50 border-red-100 hover:bg-red-100' },
          ].map((a, i) => (
            <button key={i} className={`p-4 rounded-xl border shadow-sm flex flex-col items-center justify-center gap-2 transition-colors group ${a.bg || 'bg-white border-gray-100 hover:bg-gray-50'}`}>
              <a.icon size={20} className={`text-gray-400 ${a.hoverColor}`} />
              <span className="hero-metadata">{a.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        
        {/* Live Task Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} className="text-blue-500"/> Current Flow Queue
              </h3>
              <button className="text-xs font-bold text-blue-600 uppercase tracking-widest">All Nodes →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FAFAFA] text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Type / Flow</th>
                    <th className="px-6 py-4">Vehicle Point</th>
                    <th className="px-6 py-4">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-5">
                        <div className="font-bold text-[#111] text-[15px]">{task.id}</div>
                        <div className="text-xs text-gray-400 font-medium mt-0.5">{task.items} Listed Items</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-2 h-2 rounded-full ${task.type === 'Inbound' ? 'bg-[#FFCC00]' : 'bg-blue-500'}`}></span>
                          <span className="text-sm font-bold text-[#111]">{task.type}</span>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                          task.priority === 'Critical' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2] animate-pulse' :
                          task.priority === 'High'     ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                         'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-gray-50 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
                            {task.vehicle.split('-')[0]}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#111] uppercase">{task.vehicle}</div>
                            <div className="text-xs text-gray-400 font-medium mt-0.5">{task.gate} Assigned</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-[#111] text-sm">{task.eta}</div>
                        <div className="text-xs text-gray-400 font-medium mt-0.5 uppercase">Scheduled</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-4">
          
          {/* Capacity */}
          <div className="bg-[#111] rounded-xl p-6 text-white border border-gray-800 shadow-sm">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-6">Zone Storage Capacity</h4>
            <div className="flex items-end justify-between gap-4 mb-3">
              <div>
                <span className="text-4xl font-semibold text-white">78%</span>
                <span className="text-xs font-bold text-gray-400 uppercase mt-1 tracking-widest block">Utilized Area</span>
              </div>
              <span className="text-xs font-semibold text-[#FFCC00]">22% FREE</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFCC00] transition-all duration-1000" style={{ width: '78%' }}></div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Pallet Slots</span>
                <span className="text-sm font-semibold text-white">412 / 600</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Cold Chain</span>
                <span className="text-sm font-semibold text-white">84 / 100</span>
              </div>
            </div>
          </div>

          {/* Dock Status */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Dock Status</h4>
            {[
              { gate: 'DOCK-1', vehicle: 'VAN-08',  status: 'Occupied', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
              { gate: 'DOCK-2', vehicle: '—',       status: 'Empty',    cls: 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' },
              { gate: 'DOCK-3', vehicle: '—',       status: 'Empty',    cls: 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' },
              { gate: 'DOCK-4', vehicle: 'TRK-102', status: 'Arriving', cls: 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]' },
            ].map((g, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                <div>
                  <span className="text-xs font-semibold text-[#111] uppercase">{g.gate}</span>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{g.vehicle}</p>
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${g.cls}`}>{g.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}



