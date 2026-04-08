import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileCheck, FileText, Receipt, Users, TrendingUp, 
  AlertTriangle, CheckCircle2, Clock, ArrowRight,
  DollarSign, BarChart3, ShieldAlert, Download,
  Banknote, WalletCards
} from 'lucide-react';

export default function AccountsDashboard() {
  const navigate = useNavigate();

  const financeTasks = [
    { id: 'ACT-90', label: '3 Invoices Overdue >60 Days', value: '$18,900', priority: 'Critical', action: 'Dunning Process', route: '/accounts/invoices' },
    { id: 'ACT-91', label: '12 PODs Awaiting Audit', value: '12 Units', priority: 'High', action: 'Review Queue', route: '/accounts/pod-review' },
    { id: 'ACT-92', label: 'Friday Driver Settlement', value: '$42,150', priority: 'Normal', action: 'Process Payout', route: '/accounts/settlements' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── 1. Executive Finance Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <Banknote className="text-emerald-500" size={24}/> Ledger Command
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
             Cycle: <span className="text-gray-900">Q2-APR-2026</span> • Status: <span className="text-emerald-600 font-black">Balanced</span>
          </p>
        </div>
        <div className="flex gap-2">
           <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm font-bold">
              <Download size={16}/> Export Ledger
           </button>
           <button onClick={() => navigate('/accounts/reports')} className="btn btn-primary shadow-lg font-bold flex items-center gap-2 px-6">
              <BarChart3 size={16}/> Full BI Analytics
           </button>
        </div>
      </div>

      {/* ── 2. The Big Numbers: Revenue Flow ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'PODs Pending Audit', val: '12', sub: 'Action required', color: 'amber', icon: FileCheck },
           { label: 'Unbilled Revenue', val: '$14.2K', sub: 'Ready for invoice', color: 'blue', icon: FileText },
           { label: 'Outstanding AR', val: '$127K', sub: 'Due in <30 days', color: 'emerald', icon: TrendingUp },
           { label: 'Critical Overdue', val: '$18.9K', sub: '4 Accounts impacted', color: 'red', icon: AlertTriangle },
         ].map((k, i) => (
           <div key={i} className="card bg-white p-6 border border-gray-100 shadow-sm hover:border-[#FACC15] transition-all group relative overflow-hidden">
              <div className="flex flex-col justify-between h-full relative z-10">
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{k.label}</span>
                    <div className={`p-2 rounded-xl bg-${k.color}-50 text-${k.color}-600`}>
                       <k.icon size={16} />
                    </div>
                 </div>
                 <h3 className={`text-2xl font-black mt-4 text-${k.color}-600`}>{k.val}</h3>
                 <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{k.sub}</p>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-${k.color}-400 opacity-5 rounded-full blur-2xl`}></div>
           </div>
         ))}
      </div>

      {/* ── 3. Operational Financials ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Live Action Queue */}
         <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden min-h-[400px]">
               <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/20 flex justify-between items-center">
                  <h3 className="font-black text-gray-900 text-xs tracking-[0.2em] uppercase flex items-center gap-3">
                     <ShieldAlert size={16} className="text-red-500" /> Administrative Priorities
                  </h3>
               </div>
               <div className="divide-y divide-gray-50">
                  {financeTasks.map(task => (
                     <div key={task.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer group">
                        <div className="flex items-center gap-6">
                           <div className={`w-1.5 h-10 rounded-full ${task.priority === 'Critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : task.priority === 'High' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                           <div className="min-w-0">
                              <h4 className="text-sm font-black text-gray-900 tracking-tight">{task.label}</h4>
                              <div className="flex items-center gap-3 mt-1.5">
                                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{task.value} Volume</span>
                                 <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                 <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${task.priority === 'Critical' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{task.priority} Priority</span>
                              </div>
                           </div>
                        </div>
                        <button onClick={() => navigate(task.route)} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-[#FACC15] rounded-xl text-[10px] font-black uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all shadow-xl active:scale-95">
                           {task.action} <ArrowRight size={14}/>
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Margin & Settlement Tracker */}
         <div className="flex flex-col gap-6">
            
            {/* Real-time Profitability */}
            <div className="bg-[#111] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl group-hover:bg-emerald-400/10 transition-all duration-700"></div>
               <h4 className="text-[11px] font-black uppercase text-gray-500 tracking-[0.2em] mb-6">Net Yield Efficiency</h4>
               <div className="flex items-end justify-between gap-4 mb-4">
                  <div className="flex flex-col">
                     <span className="text-4xl font-black text-white">35.8%</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Gross Profit Margin</span>
                  </div>
                  <div className="text-right">
                     <span className="text-xs font-black text-emerald-400">+2.4% vs LY</span>
                  </div>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" style={{ width: '35.8%' }}></div>
               </div>
               <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  {[
                    { label: 'Gross Revenue', val: '$486.5K', pos: true },
                    { label: 'Direct Costs', val: '-$312.4K', pos: false },
                    { label: 'Settlement Liability', val: '$42.1K', pos: false },
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between items-center px-1">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{x.label}</span>
                       <span className={`text-xs font-black ${x.pos ? 'text-white' : 'text-red-400'}`}>{x.val}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Payout Progress */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <WalletCards size={16} className="text-violet-500"/> Settlement Phase
               </h4>
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">Driver Payout Cycle</span>
                        <span className="text-xs font-black text-gray-400">75%</span>
                     </div>
                     <div className="w-full h-1.5 bg-gray-50 border border-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500" style={{ width: '75%' }}></div>
                     </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4 border border-gray-100">
                     <Clock size={18} className="text-violet-400 mt-1 shrink-0" />
                     <p className="text-[11px] font-bold text-gray-600 leading-relaxed uppercase tracking-tight">System is currently aggregating Friday's bank files for 142 drivers.</p>
                  </div>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
