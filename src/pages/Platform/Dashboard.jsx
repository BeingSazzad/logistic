import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, TrendingUp, Users, ArrowRight, UserPlus, UserMinus,
  Server, Database, ChevronDown, ArrowUpRight, ArrowDownRight, DollarSign,
  Crown, Zap, Rocket
} from 'lucide-react';

const yearlyData = {
  2026: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [8400, 9100, 10500, 11200, 12000, 12450, 13100, 14200, 15000, 16200, 17500, 18500],
    newClients: [5, 8, 12, 15, 10, 12, 14, 18, 20, 15, 22, 25],
    lostClients: [1, 2, 1, 3, 2, 1, 2, 4, 1, 2, 3, 2],
  },
  2025: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [2000, 2500, 3100, 3500, 4100, 4900, 5500, 6000, 6800, 7200, 7800, 8200],
    newClients: [2, 3, 5, 8, 7, 10, 12, 15, 14, 16, 18, 20],
    lostClients: [0, 1, 0, 1, 2, 1, 1, 2, 3, 1, 2, 1],
  }
};

const getYearData = (y) => {
  if (yearlyData[y]) return yearlyData[y];
  // Fallback for years without hardcoded data
  return {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: Array(12).fill(0).map((_, i) => Math.floor(Math.random() * 3000) + (i * 200)),
    newClients: Array(12).fill(0).map(() => Math.floor(Math.random() * 10)),
    lostClients: Array(12).fill(0).map(() => Math.floor(Math.random() * 3)),
  };
};

const tenants = [
  { id: 'T-001', name: 'HERO Logistics Pty Ltd',  status: 'active',    plan: 'Pro',       mrr: 149,  logo: 'HL' },
  { id: 'T-002', name: 'FastMove AU',              status: 'trial',     plan: 'Starter',   mrr: 0,    logo: 'FM' },
  { id: 'T-003', name: 'OzFreight Co',             status: 'active',    plan: 'Enterprise',mrr: 599,  logo: 'OZ' },
  { id: 'T-004', name: 'SunState Transport',       status: 'active',    plan: 'Pro',       mrr: 149,  logo: 'SS' },
];

export default function PlatformDashboard() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2026);
  
  const data = getYearData(year);
  const maxIncome = Math.max(...data.income, 100);
  const maxNewClients = Math.max(...data.newClients, 1);
  const maxLostClients = Math.max(...data.lostClients, 1);
  const maxClientsScale = Math.max(maxNewClients, maxLostClients);

  // Dynamically generate years from 2024 up to the current year
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i).reverse();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Platform Overview</h1>
          <p className="hero-body text-gray-600 mt-1 flex items-center gap-2">System Center • <span className="text-hero-success font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-hero-success animate-pulse"></span> All Systems Online</span></p>
        </div>
        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-lg border border-gray-100 shadow-sm">
           <div className="flex flex-col items-center">
              <span className="hero-metadata text-gray-600 flex items-center gap-1"><Server size={10}/> API Status</span>
              <span className="text-sm font-semibold text-hero-dark">99.9%</span>
           </div>
           <div className="w-px h-6 bg-gray-100"></div>
           <div className="flex flex-col items-center">
              <span className="hero-metadata text-gray-600 flex items-center gap-1"><Database size={10}/> Load Speed</span>
              <span className="text-sm font-semibold text-hero-dark">14ms</span>
           </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── KPI Row (Summary Tiles) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 mb-2">
        
        {/* Active Companies */}
        <div onClick={() => navigate('/platform/tenants')} className="card p-5 flex flex-col justify-between group cursor-pointer hover:border-[#FFCC00] hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="hero-metadata">Active Companies</p>
              <p className="text-2xl font-semibold text-hero-dark mt-1 group-hover:text-[#FFCC00] transition-colors">78</p>
            </div>
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-50 text-gray-500 group-hover:bg-[#FFCC00]/10 group-hover:text-[#FFCC00] transition-colors">
              <Building2 size={20}/>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 border-t border-gray-50 pt-3">
             <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
               <ArrowUpRight size={12} className="mr-0.5"/> 5%
             </span>
             <span className="text-xs text-gray-500 font-medium">companies are using your platform</span>
          </div>
        </div>

        {/* New Companies */}
        <div onClick={() => navigate('/platform/tenants?filter=new')} className="card p-5 flex flex-col justify-between group cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="hero-metadata">New Companies</p>
              <p className="text-2xl font-semibold text-hero-dark mt-1 group-hover:text-emerald-500 transition-colors">12</p>
            </div>
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-50 text-gray-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <UserPlus size={20}/>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 border-t border-gray-50 pt-3">
             <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
               <ArrowUpRight size={12} className="mr-0.5"/> 20%
             </span>
             <span className="text-xs text-gray-500 font-medium">new companies joined this month</span>
          </div>
        </div>

        {/* Companies Churned */}
        <div onClick={() => navigate('/platform/tenants?filter=churned')} className="card p-5 flex flex-col justify-between group cursor-pointer hover:border-red-500 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="hero-metadata">Companies Lost</p>
              <p className="text-2xl font-semibold text-hero-dark mt-1 group-hover:text-red-500 transition-colors">3%</p>
            </div>
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-50 text-gray-500 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
              <UserMinus size={20}/>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 border-t border-gray-50 pt-3">
             <span className="flex items-center text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
               <ArrowDownRight size={12} className="mr-0.5"/> 1%
             </span>
             <span className="text-xs text-gray-500 font-medium">of companies canceled this month</span>
          </div>
        </div>

        {/* Income This Month */}
        <div onClick={() => navigate('/platform/transactions')} className="card p-5 flex flex-col justify-between group cursor-pointer hover:border-blue-500 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="hero-metadata">Income This Month</p>
              <p className="text-2xl font-semibold text-hero-dark mt-1 group-hover:text-blue-500 transition-colors">$12,450</p>
            </div>
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <DollarSign size={20}/>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 border-t border-gray-50 pt-3">
             <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
               <ArrowUpRight size={12} className="mr-0.5"/> 14%
             </span>
             <span className="text-xs text-gray-500 font-medium">earned this month</span>
          </div>
        </div>

      </div>

      {/* ── Visual Growth Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 mb-6">
         
         {/* Left Chart: Company Growth */}
         <div className="card flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="text-sm font-semibold text-gray-800">Company Growth</h3>
               <div className="relative">
                  <select 
                    value={year} 
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="appearance-none cursor-pointer bg-white border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-xs font-medium text-gray-600 shadow-sm outline-none hover:bg-gray-50 transition-colors"
                  >
                    {availableYears.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
               <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-500"></span><span className="text-xs text-gray-600">New Companies</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-red-400"></span><span className="text-xs text-gray-600">Lost Companies</span></div>
               </div>
               <div className="flex items-end gap-2 h-[240px] mt-auto">
                  {data.months.map((m, i) => {
                    const hNew = Math.max(2, (data.newClients[i] / maxClientsScale) * 100);
                    const hLost = Math.max(2, (data.lostClients[i] / maxClientsScale) * 100);
                    return (
                      <div key={m} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                         <div className="w-full h-full flex flex-col justify-end items-center gap-1 group-hover:opacity-80 transition-opacity">
                            {/* Stacked visually: new on top or side-by-side. We use a stacked bar column. 
                                Wait, stacked is usually total, let's do simple side by side for each month inside the column */}
                            <div className="flex w-full items-end gap-[1px] h-full justify-center">
                               <div className="w-full bg-emerald-500 rounded-t-sm transition-all" style={{ height: `${hNew}%` }}></div>
                               <div className="w-full bg-red-400 rounded-t-sm transition-all" style={{ height: `${hLost}%` }}></div>
                            </div>
                         </div>
                         <span className="text-xs font-medium text-gray-500 mt-1">{m}</span>
                      </div>
                    )
                  })}
               </div>
            </div>
         </div>

         {/* Right Chart: Income Growth */}
         <div className="card flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="text-sm font-semibold text-gray-800">Income Growth</h3>
               <div className="relative">
                  <select 
                    value={year} 
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="appearance-none cursor-pointer bg-white border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-xs font-medium text-gray-600 shadow-sm outline-none hover:bg-gray-50 transition-colors"
                  >
                    {availableYears.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
               <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-500"></span><span className="text-xs text-gray-600">Monthly Revenue</span></div>
               </div>
               <div className="flex items-end gap-3 h-[240px] mt-auto">
                  {data.months.map((m, i) => {
                    const hInc = Math.max(5, (data.income[i] / maxIncome) * 100);
                    return (
                      <div key={m} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative">
                         {/* Tooltip */}
                         <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded transition-all pointer-events-none whitespace-nowrap z-10 shadow-lg">
                           ${data.income[i].toLocaleString()}
                         </div>
                         <div className="w-full bg-blue-100 group-hover:bg-blue-200 rounded-t-sm transition-all flex items-end justify-center relative" style={{ height: `${hInc}%` }}>
                            {/* Inner line/fill aesthetic */}
                            <div className="w-full bg-blue-500 absolute bottom-0 rounded-t-sm opacity-90 group-hover:opacity-100" style={{ height: '100%' }}></div>
                         </div>
                         <span className="text-xs font-medium text-gray-500 mt-1">{m}</span>
                      </div>
                    )
                  })}
               </div>
            </div>
         </div>

      </div>

      {/* ── Bottom Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
         
         {/* ── Recent Company List ── */}
         <div className="card flex flex-col lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="text-sm font-semibold text-gray-800">Recent Company Activity</h3>
            </div>
            <div className="divide-y divide-gray-50">
               {tenants.map(t => (
                 <div key={t.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer group" onClick={() => navigate('/platform/tenants')}>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded shadow-sm bg-white flex items-center justify-center font-bold text-gray-500 text-sm border border-gray-200">
                          {t.logo}
                       </div>
                       <div>
                          <p className="font-semibold text-gray-900 text-sm mb-0.5">{t.name}</p>
                          <div className="flex items-center gap-2">
                             <span className={`badge ${t.status === 'active' ? 'badge-green' : 'badge-yellow'}`}>{t.status}</span>
                             <span className="text-xs font-medium text-gray-500">{t.plan} Plan</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right mt-2 md:mt-0 md:ml-4 flex items-center gap-4">
                       <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400 font-medium">MRR</span>
                          <span className="text-sm font-bold text-gray-900">${t.mrr}</span>
                       </div>
                       <ChevronDown size={16} className="-rotate-90 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
            <button onClick={() => navigate('/platform/tenants')} className="w-full py-3 bg-gray-50 text-blue-600 font-medium text-xs hover:bg-gray-100 transition-all border-t border-gray-100 rounded-b-md">
              View All Companies <ArrowRight size={14} className="inline ml-1" />
            </button>
         </div>

         {/* ── Revenue by Plan ── */}
         <div className="card flex flex-col h-full border hover:border-blue-100 transition-colors">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="text-sm font-semibold text-gray-800">Revenue by Plan</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
               {[
                 { plan: 'Enterprise', price: '$599', pct: 67, color: 'bg-[#FFCC00]', icon: Crown, bg: 'bg-yellow-50', text: 'text-yellow-600' },
                 { plan: 'Pro',        price: '$298', pct: 33, color: 'bg-emerald-500', icon: Zap, bg: 'bg-emerald-50', text: 'text-emerald-600' },
                 { plan: 'Starter',    price: '$0',   pct: 0,  color: 'bg-gray-300', icon: Rocket, bg: 'bg-gray-100', text: 'text-gray-500' },
               ].map((item) => (
                 <div key={item.plan} className="group flex flex-col relative w-full">
                     <div className="flex justify-between items-end mb-2">
                         <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.bg} ${item.text}`}>
                                 <item.icon size={20} strokeWidth={2.5} />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-gray-900 leading-tight">{item.plan}</p>
                                 <p className="text-xs font-medium text-gray-500 mt-0.5">{item.pct}% of total</p>
                             </div>
                         </div>
                         <p className="text-lg font-semibold text-gray-900 tracking-tight">{item.price}<span className="text-xs font-semibold text-gray-600">/mo</span></p>
                     </div>
                     <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full rounded-full transition-all duration-1000 ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                     </div>
                 </div>
               ))}
            </div>
         </div>

      </div>

    </div>
  );
}


