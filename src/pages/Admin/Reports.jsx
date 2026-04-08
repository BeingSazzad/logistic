import React from 'react';
import { Download, TrendingUp, PieChart as PieChartIcon, Activity, Map, Truck, DollarSign, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

export default function AdminReports() {
  const [chartPeriod, setChartPeriod] = useState('This Quarter');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const branchDataRaw = [
    { name: 'Sydney Central Hub', rev: 1200000, revStr: '$1.2M', growth: '+12%', fleet: 94, issues: 12 },
    { name: 'Melbourne North',    rev: 840000,  revStr: '$840K', growth: '+8%',  fleet: 88, issues: 5 },
    { name: 'Brisbane Port',      rev: 620000,  revStr: '$620K', growth: '-2%',  fleet: 76, issues: 19 },
    { name: 'Adelaide Depot',     rev: 310000,  revStr: '$310K', growth: '+15%', fleet: 91, issues: 2 }
  ];

  const branchData = [...branchDataRaw].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const chartData = chartPeriod === 'This Quarter' 
    ? [40, 60, 45, 65, 55, 75, 50, 70, 85, 95] 
    : [30, 50, 40, 55, 45, 65, 40, 60, 70, 80];

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics & BI</h1>
          <p className="text-sm text-gray-500 mt-1">Company-wide operational efficiency and financial intelligence.</p>
        </div>
        <button className="bg-gray-900 hover:bg-black text-[#FFCC00] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Download size={16}/> Export Full Report
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'Gross Revenue (MTD)', val: '$2.97M', diff: '+8.4%', up: true,  icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Freight Cost',    val: '$14.20/kg', diff: '-2.1%', up: true,  icon: PieChartIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Fleet Utilization',   val: '89.2%',  diff: '+4.0%', up: true,  icon: Truck, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'On-Time Delivery',    val: '97.8%',  diff: '-0.5%', up: false, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.bg} ${k.color}`}>
                <k.icon size={20}/>
              </div>
              <p className={`text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-md border ${k.up ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'}`}>
                {k.up ? <ArrowUpRight size={14} strokeWidth={3}/> : <ArrowDownRight size={14} strokeWidth={3}/>} {k.diff}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{k.label}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{k.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
         
         {/* Main Chart Card */}
         <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide">
                 <TrendingUp size={16} className="text-[#FFCC00]"/> Volume vs Revenue
               </h3>
               <select 
                 value={chartPeriod}
                 onChange={(e) => setChartPeriod(e.target.value)}
                 className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 rounded-md py-1.5 px-3 focus:outline-none"
               >
                 <option value="This Quarter">This Quarter</option>
                 <option value="Last Quarter">Last Quarter</option>
               </select>
            </div>
            <div className="flex-1 min-h-[280px] flex items-end gap-3 justify-between relative mt-4">
               {/* Grid lines */}
               <div className="absolute inset-x-0 bottom-0 h-px bg-gray-100 z-0"></div>
               <div className="absolute inset-x-0 bottom-[25%] h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
               <div className="absolute inset-x-0 bottom-[50%] h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
               <div className="absolute inset-x-0 bottom-[75%] h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
               
               {/* Interleaved Bars */}
               {chartData.reduce((acc, h, i) => {
                 if (i % 2 === 0) acc.push([h, chartData[i+1]]);
                 return acc;
               }, []).map((pair, idx) => (
                 <div key={idx} className="flex gap-1 h-full items-end z-10 w-full justify-center group relative pb-6">
                    <div className="w-1/3 bg-[#111] hover:bg-gray-800 rounded-t-sm transition-all" style={{ height: `${pair[0]}%` }}></div>
                    <div className="w-1/3 bg-[#FFCC00] hover:bg-[#E6B800] rounded-t-sm transition-all" style={{ height: `${pair[1]}%` }}></div>
                    <div className="absolute bottom-0 text-[10px] font-bold text-gray-400">Wk {idx+1}</div>
                 </div>
               ))}
            </div>
         </div>

         {/* Cost Center Split */}
         <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide mb-6">
              <PieChartIcon size={16} className="text-[#FFCC00]"/> Opex Split Segment
            </h3>
            
            <div className="flex-1 flex items-center justify-center py-6">
               <div className="w-48 h-48 rounded-full border-[24px] border-[#111] border-r-[#FFCC00] border-t-gray-100 relative">
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Out</span>
                    <span className="text-xl font-black text-gray-900">$1.8M</span>
                 </div>
               </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-6 border-t border-gray-100 pt-6">
               <div className="flex justify-between items-center text-sm">
                 <span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-2.5 h-2.5 rounded-sm bg-[#111]"></span> Fleet Fuel & Maint</span> 
                 <span className="font-black text-gray-900">$920K</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-2.5 h-2.5 rounded-sm bg-[#FFCC00]"></span> Payroll (Drivers)</span> 
                 <span className="font-black text-gray-900">$648K</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-2.5 h-2.5 rounded-sm bg-gray-200"></span> Software & Insur.</span> 
                 <span className="font-black text-gray-900">$232K</span>
               </div>
            </div>
         </div>
         
         {/* Branch Metric Matrix - Spans bottom */}
         <div className="lg:col-span-3 bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                 <Map size={14}/> Network Branch Performance
               </h3>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                   <tr>
                     <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleSort('name')}>Branch Node</th>
                     <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleSort('rev')}>YTD Revenue</th>
                     <th className="px-6 py-4">Growth</th>
                     <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleSort('fleet')}>Fleet Allocation</th>
                     <th className="px-6 py-4 text-right cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleSort('issues')}>Exception Rate</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {branchData.map((b, i) => (
                     <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                       <td className="px-6 py-5 font-bold text-[#111] text-[15px]">{b.name}</td>
                       <td className="px-6 py-5 font-black text-[#111]">{b.revStr}</td>
                       <td className="px-6 py-5">
                         <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                           b.growth.includes('-') ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' : 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]'
                         }`}>
                           {b.growth}
                         </span>
                       </td>
                       <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                           <span className="font-bold text-sm text-[#111] w-8">{b.fleet}%</span>
                           <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500" style={{ width: `${b.fleet}%` }}></div>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-5 text-right">
                         <span className={`text-xs font-bold px-3 py-1 rounded-md border ${
                           b.issues > 10 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-600 border-gray-200'
                         }`}>
                           {b.issues} critical
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
         </div>
         
      </div>
    </div>
  );
}
