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
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-hero-sm text-hero-dark shadow-sm">
            <DollarSign size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Accounts Intelligence</h1>
            <p className="hero-body mt-1">Ledger overview, billing cycles, and payout management.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/accounts/reports')} className="btn btn-outline">
             Audit Trail
          </button>
          <button onClick={() => navigate('/accounts/invoices')} className="btn btn-primary">
             <Receipt size={16}/> New Entry
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mb-6">
        {financialSummary.map((k, i) => (
          <div key={i} className="card p-5 flex items-center justify-between group">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="hero-metadata leading-tight text-gray-600">{k.label}</p>
              </div>
              <div className="flex items-end gap-2">
                 <p className="text-2xl font-semibold text-hero-dark leading-none">{k.val}</p>
                 <span className={`text-xs font-bold pb-0.5 ${k.up ? 'text-hero-success' : 'text-hero-danger'}`}>{k.diff}</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-hero-sm flex items-center justify-center border border-gray-50 ${k.bg} ${k.color}`}>
              <k.icon size={20}/>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Ledger Highlights */}
         <div className="lg:col-span-2 card p-6">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="hero-h1 text-xl">Recent Billings</h3>
                  <p className="hero-metadata text-gray-600 mt-2">Latest verified invoices for the current period</p>
               </div>
               <button onClick={() => navigate('/accounts/invoices')} className="btn btn-outline py-2 px-4">View All Ledger</button>
            </div>

            <div className="space-y-4">
               {recentInvoices.map((inv, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center font-bold text-xs text-gray-400 group-hover:text-black">
                         #LOG
                       </div>
                       <div>
                          <p className="text-sm font-semibold text-gray-900 uppercase">{inv.customer}</p>
                          <p className="text-xs font-bold text-gray-400">{inv.id} • {inv.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-8">
                       <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{inv.amount}</p>
                          <p className={`text-xs font-semibold uppercase tracking-widest ${inv.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>{inv.status}</p>
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
               <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FFCC00] mb-8 flex items-center gap-2 leading-none">
                  <TrendingDown size={14} className="animate-bounce" /> Settlement Pulse
               </h3>
               
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                     <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Total Payouts Due</p>
                        <p className="text-2xl font-semibold">$18,400</p>
                     </div>
                     <span onClick={() => navigate('/accounts/settlements')} className="text-xs font-semibold text-[#FFCC00] uppercase underline cursor-pointer hover:text-yellow-300 transition-colors">Reconcile</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                     <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Unverified PODs</p>
                        <p className="text-2xl font-semibold">12 Items</p>
                     </div>
                     <span onClick={() => navigate('/accounts/pod-review')} className="text-xs font-semibold text-[#FFCC00] uppercase underline cursor-pointer hover:text-yellow-300 transition-colors">Verify Now</span>
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
                     <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-tight">Tax Projection</h4>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quarterly Forecast</p>
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



