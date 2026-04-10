import React, { useState } from 'react';
import { 
  Download, ArrowUpRight, ArrowDownRight, DollarSign, 
  BarChart3, Calendar, Layers, TrendingUp, Globe, ChevronDown
} from 'lucide-react';

export default function AdminReports() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const stats = [
    { label: 'Total Booking Income', val: '$14.2M', diff: '+12.4%', up: true, icon: DollarSign, color: 'text-[#111]', bg: 'bg-[#FFCC00]' },
    { label: 'Avg Monthly Revenue',  val: '$1.18M', diff: '+8.1%',  up: true, icon: BarChart3,  color: 'text-sky-600',     bg: 'bg-sky-50' },
    { label: 'Successful Shipments', val: '142.5K', diff: '+15.5%', up: true, icon: Layers,     color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Annual Growth',        val: '1.8x',   diff: '+5.5%',  up: true, icon: TrendingUp, color: 'text-violet-600',  bg: 'bg-violet-50' }
  ];

  const monthlyRevenue = [
    { m: 'Jan', v: 45 }, { m: 'Feb', v: 52 }, { m: 'Mar', v: 62 }, 
    { m: 'Apr', v: 58 }, { m: 'May', v: 69 }, { m: 'Jun', v: 75 },
    { m: 'Jul', v: 82 }, { m: 'Aug', v: 78 }, { m: 'Sep', v: 88 },
    { m: 'Oct', v: 94 }, { m: 'Nov', v: 98 }, { m: 'Dec', v: 91 }
  ];

  const maxVal = Math.max(...monthlyRevenue.map(d => d.v));

  const branchPerformance = [
    { name: 'Sydney Central Hub',  revenue: '$2.4M', efficiency: 98 },
    { name: 'Melbourne Depot',     revenue: '$1.8M', efficiency: 92 },
    { name: 'Brisbane Port',       revenue: '$1.2M', efficiency: 86 },
    { name: 'Perth Terminal',      revenue: '$1.1M', efficiency: 89 }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <BarChart3 size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Revenue Insights</h1>
            <p className="text-sm text-gray-500 mt-1">Annual income performance and hub contribution tracking.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 pl-9 pr-10 py-2.5 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all cursor-pointer shadow-sm uppercase tracking-widest"
            >
              <option value="2026">Year 2026</option>
              <option value="2025">Year 2025</option>
              <option value="2024">Year 2024</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
          </div>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm text-sm">
            <Download size={16}/> Export
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
        {stats.map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">{k.label}</p>
              <div className="flex items-end gap-2 mt-1.5">
                <p className="text-2xl font-black text-gray-900 leading-none">{k.val}</p>
                <span className={`text-[10px] font-bold pb-0.5 flex items-center gap-0.5 ${k.up ? 'text-emerald-500' : 'text-red-500'}`}>
                  {k.up ? <ArrowUpRight size={10} strokeWidth={3}/> : <ArrowDownRight size={10} strokeWidth={3}/>}{k.diff}
                </span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-gray-50 ${k.bg} ${k.color} shrink-0`}>
              <k.icon size={20}/>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Hub Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">

        {/* White Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden">
          
          {/* Chart Header */}
          <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="text-[#FFCC00]" />
              <div>
                <h3 className="text-sm font-bold text-[#111] uppercase tracking-wide">Monthly Revenue</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Fiscal Year {selectedYear}</p>
              </div>
            </div>
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 pl-3 pr-8 py-1.5 rounded-md text-[11px] font-bold focus:outline-none transition-all cursor-pointer shadow-sm uppercase tracking-widest"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12}/>
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-6 pl-12 flex-1 mt-4">
            <div className="flex items-end justify-between gap-3 h-[280px] relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-full h-px bg-gray-100 relative">
                    <span className="absolute -left-8 -top-2 text-[10px] font-bold text-gray-400">{(5-i)}M</span>
                  </div>
                ))}
              </div>

              {monthlyRevenue.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full group relative z-10">
                  {/* Tooltip */}
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-[#111] text-white text-[9px] font-bold px-2 py-1 rounded z-30 pointer-events-none shadow-lg whitespace-nowrap">
                    ${(d.v * 0.032).toFixed(1)}M
                  </div>
                  {/* Bar */}
                  <div 
                    className="w-full bg-[#FFCC00] hover:bg-[#111] rounded-t transition-all duration-300 cursor-pointer" 
                    style={{ height: `${(d.v / maxVal) * 230}px`, minHeight: 8 }}
                  />
                  <span className="text-[10px] font-bold text-gray-500 uppercase group-hover:text-[#111] transition-colors">{d.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">YTD Growth</p>
                <p className="text-base font-black text-emerald-600 mt-0.5">+14.2%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Peak Month</p>
                <p className="text-base font-black text-gray-900 mt-0.5">November</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top Revenue</p>
              <p className="text-base font-black text-gray-900 mt-0.5">$3.2M</p>
            </div>
          </div>
        </div>

        {/* Hub Ranking */}
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-[#FAFAFA]">
            <div className="w-8 h-8 bg-[#111] rounded-lg flex items-center justify-center text-[#FFCC00]">
              <Globe size={16}/>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Hub Ranking</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedYear} Performance</p>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-gray-50">
            {branchPerformance.map((hub, i) => (
              <div key={i} className="p-5 group hover:bg-gray-50/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold text-gray-900">{hub.name}</p>
                  <p className="text-sm font-black text-gray-900">{hub.revenue}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FFCC00] rounded-full group-hover:bg-[#111] transition-all duration-700" 
                      style={{ width: `${hub.efficiency}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{hub.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 mt-auto border-t border-gray-100">
            <button className="w-full py-2.5 bg-[#FFCC00] hover:bg-[#E6B800] text-black rounded-lg font-bold text-sm transition-all shadow-sm">
              View Full Network
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
