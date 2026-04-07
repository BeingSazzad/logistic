import React from 'react';
import { Download, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

export default function AdminReports() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Financial and operational performance analytics.</p>
        </div>
        <button className="btn btn-primary"><Download size={16}/> Export Full Report</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="card bg-white shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp size={18}/> Revenue Trends</h3>
            <div className="h-64 flex items-end gap-2 justify-between mt-8 relative">
               {/* 10 mock bars representing months/weeks */}
               {[40, 60, 55, 70, 85, 75, 90, 95, 80, 100].map((h, i) => (
                 <div key={i} className="w-full bg-blue-100 rounded-t-sm hover:bg-blue-300 transition-colors relative group" style={{ height: `${h}%` }}>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     ${h}K
                   </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="card bg-white shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><PieChartIcon size={18}/> Cost Breakdown</h3>
            <div className="flex items-center justify-center p-8">
               <div className="w-48 h-48 rounded-full border-[16px] border-yellow-400 border-r-blue-500 border-t-green-500 relative">
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase">Total Exp</span>
                    <span className="text-xl font-bold text-gray-900">$2.4M</span>
                 </div>
               </div>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-xs font-semibold text-gray-600">
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Fuel</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Maintenance</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Wages</span>
            </div>
         </div>
      </div>
    </div>
  );
}
