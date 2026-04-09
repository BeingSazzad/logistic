import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, Clock, CheckCircle2, 
  AlertCircle, DollarSign, ArrowUpRight, ArrowDownRight,
  FileCheck, Receipt, Download, Filter, Search, ChevronRight
} from 'lucide-react';

export default function AccountsDashboard() {
  const navigate = useNavigate();
  const financialSummary = [
    { label: 'Total Receivables', val: '$842,500', diff: '+12.4%', up: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Pending Payables', val: '$124,200', diff: '-2.1%', up: false, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Net Profit (MTD)', val: '$32.1k', diff: '+8.4%', up: true, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'POD Verification',  val: '42 Items', diff: 'Critical', up: false, icon: FileCheck, color: 'text-red-500', bg: 'bg-red-50' }
  ];

  const recentInvoices = [
    { id: 'INV-1021', customer: 'Acme Corp', amount: '$42,500', status: 'Draft', date: 'Today' },
    { id: 'INV-1020', customer: 'Tech Solutions', amount: '$12,800', status: 'Pending', date: '2h ago' },
    { id: 'INV-1019', customer: 'Global Traders', amount: '$8,400', status: 'Approved', date: '5h ago' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <DollarSign size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Accounts Intelligence</h1>
            <p className="text-sm text-gray-500 mt-1">Ledger overview, billing cycles, and payout management.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/accounts/reports')} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm">
             Audit Trail
          </button>
          <button onClick={() => navigate('/accounts/invoices')} className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
             <Receipt size={18}/> New Entry
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {financialSummary.map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between group">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">{k.label}</p>
              </div>
              <div className="flex items-end gap-2">
                 <p className="text-2xl font-black text-gray-900 leading-none">{k.val}</p>
                 <span className={`text-[10px] font-bold pb-0.5 ${k.up ? 'text-emerald-500' : 'text-red-500'}`}>{k.diff}</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-gray-50 ${k.bg} ${k.color}`}>
              <k.icon size={20}/>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Ledger Highlights */}
         <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-xl font-black tracking-tight text-gray-900 uppercase">Recent Billings</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Latest verified invoices for the current period</p>
               </div>
               <button onClick={() => navigate('/accounts/invoices')} className="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors shadow-sm">View All Ledger</button>
            </div>

            <div className="space-y-4">
               {recentInvoices.map((inv, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center font-bold text-[10px] text-gray-400 group-hover:text-black">
                         #LOG
                       </div>
                       <div>
                          <p className="text-sm font-black text-gray-900 uppercase">{inv.customer}</p>
                          <p className="text-[10px] font-bold text-gray-400">{inv.id} • {inv.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-8">
                       <div className="text-right">
                          <p className="text-sm font-black text-gray-900">{inv.amount}</p>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${inv.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>{inv.status}</p>
                       </div>
                       <ChevronRight size={16} className="text-gray-300 group-hover:text-black"/>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Actionable Alerts (Pro UX) */}
         <div className="flex flex-col gap-6">
            <div className="bg-gray-900 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-6 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <h3 className="text-xs font-black uppercase tracking-wider text-[#FFCC00] mb-8 flex items-center gap-2 leading-none">
                  <TrendingDown size={14} className="animate-bounce" /> Settlement Pulse
               </h3>
               
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                     <div>
                        <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Total Payouts Due</p>
                        <p className="text-2xl font-black">$18,400</p>
                     </div>
                     <span onClick={() => navigate('/accounts/settlements')} className="text-[9px] font-black text-[#FFCC00] uppercase underline cursor-pointer hover:text-yellow-300 transition-colors">Reconcile</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                     <div>
                        <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Unverified PODs</p>
                        <p className="text-2xl font-black">12 Items</p>
                     </div>
                     <span onClick={() => navigate('/accounts/pod-review')} className="text-[9px] font-black text-[#FFCC00] uppercase underline cursor-pointer hover:text-yellow-300 transition-colors">Verify Now</span>
                  </div>
               </div>

               <button onClick={() => navigate('/accounts/settlements')} className="w-full mt-6 py-2.5 bg-[#FFCC00] text-black rounded-lg font-bold text-sm shadow-sm hover:bg-[#E6B800] transition-all">
                  Process All Settlements
               </button>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 shadow-sm border border-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                     <TrendingUp size={20}/>
                  </div>
                  <div>
                     <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Tax Projection</h4>
                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Quarterly Forecast</p>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-gray-600 uppercase">
                     <span>GST (Estimated)</span>
                     <span className="text-gray-900">$4,120</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                     <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                  </div>
               </div>
            </div>
         </div>

      </div>

    </div>
  );
}
