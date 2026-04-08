import React from 'react';
import { Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminDashboard() {
  const recentActivities = [
    { id: 'JOB-902', action: 'Delivery Completed', user: 'Driver: Jack Taylor', time: '12 mins ago', amount: '+$45.00' },
    { id: 'JOB-901', action: 'Route Optimized', user: 'Dispatcher: Sarah Mitchell', time: '1 hr ago', amount: null },
    { id: 'JOB-899', action: 'New Load Assigned', user: 'Driver: Liam Smith', time: '2 hrs ago', amount: '+$120.50' },
    { id: 'USR-042', action: 'New Customer Added', user: 'Admin: Michael Adams', time: '4 hrs ago', amount: null },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-8">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fleet Intelligence</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time operational summary for your company</p>
        </div>
        <div className="flex gap-3">
          <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm px-4 py-2 text-sm font-semibold rounded-xl transition">
            Export Logs
          </button>
          <button className="btn btn-primary shadow-sm px-4 py-2 text-sm font-bold rounded-xl transition">
            New Shipment
          </button>
        </div>
      </div>

      {/* ── Operational KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: '42', trend: '+12%', up: true, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'On-Road Fleet', value: '18', trend: '+2', up: true, icon: Truck, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Revenue (MTD)', value: '$12.4k', trend: '+8.4%', up: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Idle Drivers', value: '3', trend: '-1', up: false, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-yellow-200 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {kpi.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.trend}
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 leading-none">{kpi.value}</div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* ── Main Layout Splits ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        
        {/* Left: Operational activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
            <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900 text-lg">Live Shipment Activity</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">Track All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-50">
                  <tr>
                    <th className="px-6 py-4">Status & Reference</th>
                    <th className="px-6 py-4">Action Taken</th>
                    <th className="px-6 py-4">Operator</th>
                    <th className="px-6 py-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentActivities.map((act) => (
                    <tr key={act.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                          <span className="font-bold text-gray-900 text-sm tracking-tight">{act.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800">{act.action}</p>
                        {act.amount && <p className="text-xs text-emerald-600 font-bold">{act.amount}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 font-medium">{act.user}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-400">
                        {act.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
              <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">View All Transactions</button>
            </div>
          </div>
        </div>

        {/* Right: Insights/Health */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0f172a] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all"></div>
            <h3 className="font-bold text-lg mb-1">Company Fleet Health</h3>
            <p className="text-xs text-slate-400 mb-6">Aggregate performance scores</p>
            
            <div className="space-y-6 relative z-10">
              {[
                { label: 'On-Time Performance', value: 94, color: 'bg-yellow-400' },
                { label: 'Driver Safety Score', value: 88, color: 'bg-sky-400' },
                { label: 'Fuel Efficiency', value: 72, color: 'bg-emerald-400' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-300">{stat.label}</span>
                    <span className="text-white">{stat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all">
              Download Performance Report
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-yellow-500" /> Regional Hotspots
            </h3>
            <div className="space-y-4">
              {[
                { loc: 'Sydney Metro', load: 'High', color: 'text-red-500', bg: 'bg-red-50' },
                { loc: 'Melbourne SE', load: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { loc: 'Brisbane Port', load: 'Normal', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((loc, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <span className="text-sm font-bold text-gray-700">{loc.loc}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${loc.bg} ${loc.color}`}>{loc.load}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
