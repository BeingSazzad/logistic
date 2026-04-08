import React from 'react';
import { 
  Box, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Barcode,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';

export default function WarehouseDashboard() {
  const tasks = [
    { id: 'RCV-102', type: 'Inbound',  items: 45, vehicle: 'Truck 12', time: '10:00 AM', status: 'Arriving Soon' },
    { id: 'RCV-103', type: 'Inbound',  items: 12, vehicle: 'Van 04',   time: '10:30 AM', status: 'Pending' },
    { id: 'LOD-044', type: 'Outbound', items: 88, vehicle: 'Truck 09', time: '11:15 AM', status: 'Loading' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto mx-auto pb-12">
      {/* ── Header ── */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Floor Operations</h1>
          <p className="text-gray-500 text-sm mt-1">Zone A-14 &bull; Capacity at 78%</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">11:42 AM</div>
          <div className="text-[11px] font-medium text-gray-500 mt-0.5">Shift 1 (Ends at 3:00 PM)</div>
        </div>
      </div>

      {/* ── Quick Action Tiles ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center gap-4 hover:border-yellow-400 hover:shadow-md transition-all group outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
          <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
            <ArrowDownToLine className="text-yellow-600 group-hover:text-black" size={28} strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-sm">Receive Goods</h3>
            <p className="text-xs text-gray-500 mt-1">Scan incoming items</p>
          </div>
        </button>

        <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:shadow-md transition-all group outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <ArrowUpFromLine className="text-blue-600 group-hover:text-white" size={28} strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-sm">Load Vehicle</h3>
            <p className="text-xs text-gray-500 mt-1">Assign to outbound</p>
          </div>
        </button>

        <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center gap-4 hover:border-gray-800 hover:shadow-md transition-all group outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
            <Box className="text-gray-600 group-hover:text-white" size={28} strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-sm">Move Inventory</h3>
            <p className="text-xs text-gray-500 mt-1">Change storage loc</p>
          </div>
        </button>

        <div className="bg-gray-900 text-white rounded-xl shadow-sm border border-black p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-300 text-sm">Scanner Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <CheckCircle2 className="text-green-400" size={18} />
              <span className="font-bold text-xl tracking-tight">Connected</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
            <span className="text-gray-400 font-medium">Bat: <span className="text-white">84%</span></span>
            <Barcode className="text-gray-500" size={24} />
          </div>
        </div>
      </div>

      {/* ── Task Queue ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
             <h3 className="font-bold text-lg text-gray-900">Active Task Queue</h3>
             <p className="text-xs text-gray-500 mt-0.5">Tasks assigned to your zone</p>
          </div>
          <span className="badge badge-orange font-bold px-3 py-1.5">2 Urgent Pending</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[11px] font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Manifest ID</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Volume</th>
                <th className="px-6 py-3.5">Vehicle</th>
                <th className="px-6 py-3.5">Time / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900">{task.id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 font-bold text-xs px-2.5 py-1.5 rounded-lg ${task.type === 'Inbound' ? 'text-yellow-700 bg-yellow-50' : 'text-blue-700 bg-blue-50'}`}>
                      {task.type === 'Inbound' ? <ArrowDownToLine size={14} /> : <ArrowUpFromLine size={14} />}
                      {task.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{task.items} units</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{task.vehicle}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{task.status}</div>
                    <div className="text-xs text-gray-500 mt-0.5 font-medium">{task.time}</div>
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
