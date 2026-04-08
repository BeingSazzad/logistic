import React from 'react';
import { Download, TrendingUp, PieChart as PieChartIcon, Activity, Map, Truck, DollarSign, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

export default function AdminReports() {
  const branchData = [
    { name: 'Sydney Central Hub', rev: '$1.2M', growth: '+12%', fleet: '94%', issues: 12 },
    { name: 'Melbourne North', rev: '$840K', growth: '+8%', fleet: '88%', issues: 5 },
    { name: 'Brisbane Port', rev: '$620K', growth: '-2%', fleet: '76%', issues: 19 },
    { name: 'Adelaide Depot', rev: '$310K', growth: '+15%', fleet: '91%', issues: 2 }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"><Activity className="text-[#FACC15]"/> Analytics & BI</h1>
          <p className="text-sm text-gray-500 mt-1">Company-wide operational efficiency and financial intelligence.</p>
        </div>
        <button className="btn btn-primary shadow-sm"><Download size={16}/> Export Full Report</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Gross Revenue (MTD)', val: '$2.97M', diff: '+8.4%', up: true, icon: DollarSign },
          { label: 'Avg Freight Cost', val: '$14.20/kg', diff: '-2.1%', up: true, icon: PieChartIcon }, /* Down cost is good */
          { label: 'Fleet Utilization', val: '89.2%', diff: '+4.0%', up: true, icon: Truck },
          { label: 'On-Time Delivery', val: '97.8%', diff: '-0.5%', up: false, icon: Package }
        ].map((k, i) => (
          <div key={i} className="card bg-white p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-full flex items-start justify-end p-3"><k.icon size={16} className="text-gray-300 group-hover:text-[#FACC15] transition-colors"/></div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{k.label}</p>
            <h3 className="text-2xl font-black tracking-tight text-gray-900 mt-1">{k.val}</h3>
            <p className={`text-xs font-bold flex items-center gap-1 mt-3 ${k.up ? 'text-green-600' : 'text-red-500'}`}>
              {k.up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {k.diff}
              <span className="text-gray-400 font-medium ml-1">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Main Chart */}
         <div className="lg:col-span-2 card bg-white shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18}/> Volume vs Revenue (QTD)</h3>
               <select className="input text-xs py-1.5"><option>This Quarter</option><option>Last Quarter</option></select>
            </div>
            <div className="h-72 flex items-end gap-3 justify-between mt-8 relative px-4">
               {/* Grid lines */}
               <div className="absolute inset-x-0 bottom-0 h-px bg-gray-100 z-0"></div>
               <div className="absolute inset-x-0 bottom-1/4 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
               <div className="absolute inset-x-0 bottom-2/4 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
               <div className="absolute inset-x-0 bottom-3/4 h-px bg-gray-50 z-0 border-dashed border-t border-gray-200"></div>
               
               {/* Interleaved Bars */}
               {[40, 60, 45, 65, 55, 75, 50, 70, 85, 95].reduce((acc, h, i) => {
                 if (i % 2 === 0) acc.push([h, [40, 60, 45, 65, 55, 75, 50, 70, 85, 95][i+1]]);
                 return acc;
               }, []).map((pair, idx) => (
                 <div key={idx} className="flex gap-1 h-full items-end z-10 w-full justify-center group relative">
                    <div className="w-1/3 bg-[#111] hover:bg-gray-800 rounded-t-md transition-all relative" style={{ height: `${pair[0]}%` }}></div>
                    <div className="w-1/3 bg-[#FACC15] hover:bg-yellow-300 rounded-t-md transition-all relative" style={{ height: `${pair[1]}%` }}></div>
                    <div className="absolute -bottom-6 text-[10px] font-bold text-gray-400">Wk {idx+1}</div>
                 </div>
               ))}
            </div>
         </div>

         {/* Cost Center Split */}
         <div className="card bg-white shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><PieChartIcon size={18}/> Opex Split Segment</h3>
            <div className="flex items-center justify-center p-6 mt-4">
               <div className="w-48 h-48 rounded-full border-[20px] border-[#111] border-r-[#FACC15] border-t-gray-100 relative shadow-inner">
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Out</span>
                    <span className="text-xl font-black text-gray-900">$1.8M</span>
                 </div>
               </div>
            </div>
            <div className="flex flex-col gap-3 mt-10">
               <div className="flex justify-between items-center text-sm"><span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-3 h-3 rounded bg-[#111]"></span> Fleet Fuel & Maint</span> <span>$920K</span></div>
               <div className="flex justify-between items-center text-sm"><span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-3 h-3 rounded bg-[#FACC15]"></span> Payroll (Drivers)</span> <span>$648K</span></div>
               <div className="flex justify-between items-center text-sm"><span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-3 h-3 rounded bg-gray-200"></span> Software & Insur.</span> <span>$232K</span></div>
            </div>
         </div>
         
         {/* Branch Metric Matrix */}
         <div className="lg:col-span-3 card bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><Map size={14}/> Network Branch Performance</h3>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                   <tr>
                     <th className="px-6 py-4">Branch Node</th>
                     <th className="px-6 py-4">YTD Revenue</th>
                     <th className="px-6 py-4">Growth</th>
                     <th className="px-6 py-4">Fleet Allocation</th>
                     <th className="px-6 py-4 text-right">Exception Rate</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {branchData.map((b, i) => (
                     <tr key={i} className="hover:bg-gray-50">
                       <td className="px-6 py-4 font-bold text-gray-900">{b.name}</td>
                       <td className="px-6 py-4 font-mono font-bold text-gray-600">{b.rev}</td>
                       <td className="px-6 py-4">
                         <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${b.growth.includes('-') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{b.growth}</span>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <span className="font-bold text-xs">{b.fleet}</span>
                           <div className="w-20 h-1.5 bg-gray-100 rounded-full flex-1 overflow-hidden"><div className="h-full bg-blue-500" style={{ width: b.fleet }}></div></div>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <span className={`font-bold ${b.issues > 10 ? 'text-red-500' : 'text-gray-500'}`}>{b.issues} critical</span>
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
