import React from 'react';
import {
  Users, Truck, Package, TrendingUp, ArrowUpRight,
  AlertTriangle, Blocks, Plus, Activity, Globe,
  Zap, Navigation, CheckCircle, ShieldCheck, DollarSign, ChevronRight
} from 'lucide-react';

export default function DashboardUI({
  LoadYear,
  setLoadYear,
  revenueYear,
  setRevenueYear,
  recentActivities,
  LoadData,
  incomeData,
  metrics,
  distData,
  navigate
}) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-12">
      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-2 gap-4">
        <div>
          <h1 className="hero-h1 mb-1">Command Center</h1>
          <p className="text-sm text-gray-400 font-medium">Operational HQ</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-sm btn-primary px-8">
            Export Data
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 mb-2 px-2"></div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 px-2">
        {[
          { label: 'Loads', period: 'Monthly MTD', val: metrics.totalLoads, trend: '+14%', color: 'blue', icon: Package },
          { label: 'Vehicles', period: 'Active Fleet', val: metrics.activeVehicles, trend: '+2%', color: 'emerald', icon: Truck },
          { label: 'Revenue', period: 'Monthly Gross', val: metrics.totalRevenue, trend: '+4.5%', color: 'indigo', icon: DollarSign },
          { label: 'Branches', period: 'Total Depots', val: metrics.totalBranches, trend: '+1', color: 'orange', icon: Globe },
          { label: 'Drivers', period: 'Active Roster', val: metrics.totalDrivers, trend: '98%', color: 'violet', icon: Users },
        ].map((m, i) => (
          <div key={i} className="card p-5 border-transparent hover:border-gray-200 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-9 h-9 rounded-hero-sm flex items-center justify-center bg-${m.color}-50 text-${m.color}-500 border border-${m.color}-100`}>
                <m.icon size={18} />
              </div>
              <span className={`text-xs font-semibold uppercase text-${m.color}-600 bg-${m.color}-50/50 px-2 py-1 rounded-full`}>{m.trend}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <p className="hero-metadata">{m.label}</p>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <p className="text-xs font-bold text-gray-400/80 uppercase tracking-tighter">{m.period}</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900 leading-none">{m.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Performance Stage (Side-by-Side Graphs) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
        {/* Load Throughput */}
        <div className="card overflow-hidden flex flex-col min-h-[440px] shadow-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Load Throughput</h3>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Monthly Analytics (Volume)</p>
            </div>
            <select value={LoadYear} onChange={e => setLoadYear(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none shadow-sm cursor-pointer hover:border-brand">
              <option value="2026">2026</option><option value="2025">2025</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-3 px-8 pt-12 pb-8 bg-white overflow-hidden">
            {LoadData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-3 group/bar h-full">
                <div className="relative flex-1 flex flex-col justify-end">
                  <div
                    className="w-full bg-gradient-to-t from-brand to-yellow-300 transition-all relative cursor-pointer rounded-t-hero-sm shadow-[0_-4px_10px_-2px_rgba(250,204,21,0.3)]"
                    style={{ height: `${Math.max((v / 140) * 100, 5)}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-brand text-xs font-semibold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 shadow-xl z-20 transition-all">
                      {v}k
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 text-center uppercase tracking-tighter">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Flow */}
        <div className="card overflow-hidden flex flex-col min-h-[440px] shadow-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Financial Performance</h3>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Monthly Revenue Flow ($USD)</p>
            </div>
            <select value={revenueYear} onChange={e => setRevenueYear(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none shadow-sm cursor-pointer hover:border-emerald-500">
              <option value="2026">2026</option><option value="2025">2025</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-3 px-8 pt-12 pb-8 bg-white overflow-hidden">
            {incomeData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-3 group/bar h-full">
                <div className="relative flex-1 flex flex-col justify-end">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-300 transition-all relative cursor-pointer rounded-t-hero-sm shadow-[0_-4px_10px_-2px_rgba(16,185,129,0.2)]"
                    style={{ height: `${Math.max((v / 450) * 100, 5)}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-emerald-400 text-xs font-semibold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 shadow-xl z-20 transition-all">
                      ${v}k
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 text-center uppercase tracking-tighter">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Operational Intelligence Depot ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">

        {/* Command Center (Navigation) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card h-full flex flex-col overflow-hidden bg-white border-2 border-brand/20 shadow-lg shadow-brand/5">
            <div className="p-6 border-b border-brand/10 bg-brand/[0.03] flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={16} className="text-brand fill-brand/20" strokeWidth={3} /> Quick Control
                </h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3 flex-1">
              {[
                { label: 'Loads', path: '/admin/loads', icon: Package, color: 'blue', desc: 'Monitor queue' },
                { label: 'Fleet Control', path: '/admin/fleet', icon: Truck, color: 'emerald', desc: 'Vehicle logs' },
                { label: 'Staff Roster', path: '/admin/users', icon: Users, color: 'violet', desc: 'Manage access' },
                { label: 'Network', path: '/admin/settings', icon: Globe, color: 'orange', desc: 'Global config' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col p-4 rounded-xl border border-gray-100 hover:border-brand/40 hover:bg-brand/[0.02] transition-all group text-left"
                >
                  <div className={`w-8 h-8 rounded-lg bg-${item.color}-50 text-${item.color}-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <item.icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-gray-900 uppercase tracking-widest">{item.label}</span>
                  <p className="text-xs text-gray-400 font-bold uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                </button>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
              <button onClick={() => navigate('/admin/audit')} className="hero-metadata hover:text-brand transition-colors flex items-center gap-2">
                View Full Audit Terminal <ChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* Network Distribution */}
        <div className="lg:col-span-4 card p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Network Distribution</h3>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-tighter bg-gray-50 px-3 py-1 rounded">Daily Mix</span>
            </div>
            <div className="h-4 w-full flex rounded-full overflow-hidden mb-10 shadow-inner bg-gray-100">
              {distData.map((d, i) => (
                <div key={i} style={{ width: `${d.val}%` }} className={`h-full ${d.color} hover:brightness-110 transition-all`} title={`${d.label} (${d.val}%)`}></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8">
              {distData.map((d, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${d.color} shadow-sm shadow-${d.color}/30`}></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{d.label}</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{d.val}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Network Activity */}
        <div className="lg:col-span-4 card flex flex-col shadow-sm max-h-[420px]">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <Activity size={12} className="text-blue-500 animate-pulse" /> Activity Monitor
            </h3>
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-blue-300"></span><span className="w-1 h-1 rounded-full bg-blue-200"></span>
            </div>
          </div>
          <div className="p-6 flex-1 overflow-y-auto hidden-scrollbar">
            <div className="space-y-6">
              {recentActivities.slice(0, 4).map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-glow ${act.status === 'Success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                    {i < 3 && <div className="w-px h-full bg-gray-100 my-1"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate uppercase tracking-wide leading-none mb-1">{act.action}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">{act.time} • Operator {act.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


