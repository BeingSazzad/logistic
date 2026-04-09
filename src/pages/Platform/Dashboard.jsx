import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, TrendingUp, Activity, Users, 
  ArrowRight, Download, Filter, Zap, 
  ShieldCheck, Globe, Server, Database, ChevronDown 
} from 'lucide-react';

const yearlyData = {
  2026: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [8400, 9100, 10500, 11200, 12000, 13400, 14000, 15100, 16000, 17200, 18000, 19500],
    users: [420, 480, 510, 580, 620, 690, 750, 810, 890, 960, 1050, 1120],
  },
  2025: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [2000, 2500, 3100, 3500, 4100, 4900, 5500, 6000, 6800, 7200, 7800, 8200],
    users: [110, 140, 190, 220, 260, 310, 340, 380, 420, 450, 480, 510],
  }
};

const tenants = [
  { id: 'T-001', name: 'HERO Logistics Pty Ltd',  status: 'active',    plan: 'Pro',       shipments: 342, mrr: 149,  logo: 'HL' },
  { id: 'T-002', name: 'FastMove AU',              status: 'trial',     plan: 'Starter',   shipments: 47,  mrr: 0,    logo: 'FM' },
  { id: 'T-003', name: 'OzFreight Co',             status: 'active',    plan: 'Enterprise',shipments: 1240,mrr: 599,  logo: 'OZ' },
  { id: 'T-004', name: 'SunState Transport',       status: 'active',    plan: 'Pro',       shipments: 198, mrr: 149,  logo: 'SS' },
];

export default function PlatformDashboard() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2026);
  
  const data = yearlyData[year];
  const maxIncome = Math.max(...data.income);
  const maxUsers = Math.max(...data.users);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Updated Header - Matching Reference Style */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Platform Overview</h1>
          <p className="hero-body text-hero-neutral mt-1 flex items-center gap-2">System Center • <span className="text-hero-success font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-hero-success animate-pulse"></span> All Systems Online</span></p>
        </div>
        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-hero-sm border border-gray-100 shadow-sm">
           <div className="flex flex-col items-center">
              <span className="hero-metadata text-hero-neutral flex items-center gap-1"><Server size={10}/> API Status</span>
              <span className="text-xs font-black text-hero-dark">99.9%</span>
           </div>
           <div className="w-px h-6 bg-gray-100"></div>
           <div className="flex flex-col items-center">
              <span className="hero-metadata text-hero-neutral flex items-center gap-1"><Database size={10}/> Load Speed</span>
              <span className="text-xs font-black text-hero-dark">14ms</span>
           </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards - Clean Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        <div className="card p-5 flex items-center justify-between group">
          <div><p className="hero-metadata text-hero-neutral">Registered Companies</p><p className="text-2xl font-black text-hero-dark mt-0.5 group-hover:text-brand transition-colors">124</p></div>
          <div className="w-10 h-10 rounded-hero-sm flex items-center justify-center bg-gray-50 text-hero-neutral"><Building2 size={20}/></div>
        </div>
        <div className="card p-5 flex items-center justify-between group">
          <div><p className="hero-metadata text-hero-neutral">Monthly Revenue (MRR)</p><p className="text-2xl font-black text-hero-dark mt-0.5 group-hover:text-hero-success transition-colors">$84.2K</p></div>
          <div className="w-10 h-10 rounded-hero-sm flex items-center justify-center bg-gray-50 text-hero-neutral"><TrendingUp size={20}/></div>
        </div>
        <div className="card p-5 flex items-center justify-between group">
          <div><p className="hero-metadata text-hero-neutral">Total Deliveries</p><p className="text-2xl font-black text-hero-dark mt-0.5 group-hover:text-indigo-500 transition-colors">4,120</p></div>
          <div className="w-10 h-10 rounded-hero-sm flex items-center justify-center bg-gray-50 text-hero-neutral"><Users size={20}/></div>
        </div>
        <div className="card p-5 flex items-center justify-between group">
          <div><p className="hero-metadata text-hero-neutral">Live Users</p><p className="text-2xl font-black text-hero-dark mt-0.5 group-hover:text-blue-500 transition-colors">942</p></div>
          <div className="w-10 h-10 rounded-hero-sm flex items-center justify-center bg-gray-50 text-hero-neutral"><Zap size={20}/></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
         
         {/* Growth Matrix */}
         <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
               <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Revenue & Growth Overview</h3>
               </div>
               <button onClick={() => setYear(year === 2026 ? 2025 : 2026)} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50">
                  FY-{year} <ChevronDown size={14} />
               </button>
            </div>
            
            <div className="p-8 flex-1 flex items-end gap-3 h-[300px] relative">
               {data.months.map((m, i) => {
                 const hIncome = Math.max(15, (data.income[i] / maxIncome) * 100);
                 const hUsers = Math.max(10, (data.users[i] / maxUsers) * 100);
                 return (
                   <div key={m} className="flex-1 flex flex-col items-center justify-end h-full group gap-2">
                      <div className="flex-1 w-full bg-gray-50 rounded bg-clip-padding border border-gray-50 relative flex items-end gap-[2px]">
                         <div className="w-1/2 bg-[#FFCC00] rounded-b-sm group-hover:bg-[#E6B800] transition-colors" style={{ height: `${hIncome}%` }}></div>
                         <div className="w-1/2 bg-blue-500 rounded-b-sm group-hover:bg-blue-600 transition-colors" style={{ height: `${hUsers}%` }}></div>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">{m}</span>
                   </div>
                 )
               })}
            </div>
         </div>

         {/* Tenant List */}
         <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col items-stretch h-full">
               <div className="px-6 py-5 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent Client Activity</h3>
               </div>
               <div className="divide-y divide-gray-50 flex-1">
                  {tenants.map(t => (
                    <div key={t.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer group" onClick={() => navigate('/platform/tenants')}>
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-gray-50 flex items-center justify-center font-bold text-gray-500 text-xs border border-gray-200">
                             {t.logo}
                          </div>
                          <div>
                             <p className="font-bold text-[#111] text-sm mb-0.5">{t.name}</p>
                             <div className="flex items-center gap-1.5">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${t.status === 'active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>{t.status}</span>
                                <span className="text-[10px] font-medium text-gray-400 uppercase">{t.plan} Plan</span>
                             </div>
                          </div>
                       </div>
                       <div className="text-right mt-2 md:mt-0 md:ml-4">
                          <span className="text-sm font-black text-[#111]">${t.mrr}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button onClick={() => navigate('/platform/tenants')} className="w-full py-3 bg-[#FAFAFA] text-blue-600 font-bold uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all border-t border-gray-100">View All Companies →</button>
            </div>
         </div>

      </div>

    </div>
  );
}
