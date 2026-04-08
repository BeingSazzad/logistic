import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, TrendingUp, Activity, Users, 
  ArrowRight, Download, Filter, Zap, 
  ShieldCheck, Globe, Server, Database 
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
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-16">
      
      {/* ── 1. Strategic Platform Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
             <Globe className="text-blue-500" size={32}/> Platform Architecture
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-2">
             Global Hub • <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Systems Nominal</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-[2rem] border border-gray-100 shadow-sm">
           <div className="flex flex-col items-center">
              <Server size={14} className="text-gray-400 mb-1"/>
              <span className="text-[10px] font-black uppercase text-gray-900">API 99.9%</span>
           </div>
           <div className="w-px h-6 bg-gray-100"></div>
           <div className="flex flex-col items-center">
              <Database size={14} className="text-gray-400 mb-1"/>
              <span className="text-[10px] font-black uppercase text-gray-900">DB 14ms</span>
           </div>
        </div>
      </div>

      {/* ── 2. Growth Intelligence Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Active Ecosystems', val: '124', sub: '+12 this month', color: 'blue', icon: Building2 },
          { label: 'Global MRI (MRR)', val: '$84,200', sub: 'Target: $100K', color: 'emerald', icon: TrendingUp },
          { label: 'Total Fleet Ops', val: '4,120', sub: 'Across all nodes', color: 'violet', icon: Users },
          { label: 'Active Sessions', val: '942', sub: 'Peak: 1,240', color: 'amber', icon: Zap },
        ].map((k, i) => (
          <div key={i} className="card bg-white p-6 border border-gray-100 shadow-sm hover:border-[#FACC15] transition-all group relative overflow-hidden">
             <div className="flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-start">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{k.label}</span>
                   <div className={`p-2.5 rounded-2xl bg-${k.color}-50 text-${k.color}-600`}>
                      <k.icon size={18} />
                   </div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mt-5">{k.val}</h3>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{k.sub}</p>
             </div>
             <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-${k.color}-400 opacity-5 rounded-full blur-2xl`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* ── 3. Unified Global Statistics ── */}
         <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden min-h-[450px] flex flex-col">
            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
               <div>
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-1">Global Velocity Matrix</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-400">
                     <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FACC15]"></span> Revenue</span>
                     <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-300"></span> Users</span>
                  </div>
               </div>
               <select className="input py-1.5 px-4 text-xs font-black bg-white border-gray-200 rounded-xl outline-none" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                  <option value={2026}>FY-2026</option>
                  <option value={2025}>FY-2025</option>
               </select>
            </div>
            
            <div className="p-8 flex-1 flex items-end gap-3 h-full pb-10">
               {data.months.map((m, i) => {
                 const hIncome = Math.max(15, (data.income[i] / maxIncome) * 100);
                 const hUsers = Math.max(10, (data.users[i] / maxUsers) * 100);
                 return (
                   <div key={m} className="flex-1 flex flex-col items-center gap-4 group">
                      <div className="flex-1 w-full bg-gray-50/50 rounded-2xl relative overflow-hidden p-1 flex items-end gap-1">
                         <div className="flex-1 bg-[#FACC15] rounded-xl group-hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/10" style={{ height: `${hIncome}%` }}></div>
                         <div className="flex-1 bg-blue-200 rounded-xl group-hover:bg-blue-400 transition-colors" style={{ height: `${hUsers}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m}</span>
                   </div>
                 )
               })}
            </div>
         </div>

         {/* ── 4. Ecosystem Activity Feed ── */}
         <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col">
               <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/20 flex justify-between items-center">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Tenant Nodes</h3>
                  <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">View Map Mode</button>
               </div>
               <div className="divide-y divide-gray-50">
                  {tenants.map(t => (
                    <div key={t.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center font-black text-[#FACC15] text-xs shadow-lg group-hover:scale-105 transition-transform">
                             {t.logo}
                          </div>
                          <div>
                             <p className="font-black text-gray-900 text-sm tracking-tight leading-none mb-1.5">{t.name}</p>
                             <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${t.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{t.status}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t.plan} Plan</span>
                             </div>
                          </div>
                       </div>
                       <div className="text-right flex flex-col items-end gap-1">
                          <span className="text-xs font-black text-gray-900">${t.mrr}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase">{t.shipments} Manifests</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button onClick={() => navigate('/platform/tenants')} className="w-full py-5 bg-gray-50 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 hover:text-gray-900 transition-all">Open Directory Architecture →</button>
            </div>
            
            {/* Quick Status Pill */}
            <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                  <ShieldCheck size={24}/>
               </div>
               <div>
                  <p className="text-xs font-black text-emerald-900 uppercase tracking-tight">Security Hardening Level: Max</p>
                  <p className="text-[9px] font-bold text-emerald-700 uppercase mt-0.5">Isolated Multi-Tenant Clusters Encrypted</p>
               </div>
            </div>
         </div>

      </div>

    </div>
  );
}
