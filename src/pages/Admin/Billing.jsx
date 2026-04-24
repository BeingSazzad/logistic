import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, CheckCircle2, ShieldCheck, 
  ExternalLink, Zap, Clock, ArrowRight
} from 'lucide-react';

export default function AdminBilling() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-900 shadow-sm">
            <CreditCard size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Subscription & Billing</h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">Manage your HERO SaaS subscription and payment methods.</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
        
        {/* Current Plan Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="bg-gradient-to-r from-gray-900 to-black p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
                  <Zap size={140} />
                </div>
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="bg-[#FFCC00] text-black text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Active Plan</span>
                    <h2 className="text-3xl font-semibold mb-1">Enterprise Fleet</h2>
                    <p className="text-gray-400 text-sm font-medium">Billed annually at $12,000/yr</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase font-bold text-gray-400 tracking-widest mb-1">Next Billing Date</p>
                    <p className="text-lg font-bold">14 Sep 2026</p>
                  </div>
                </div>
             </div>
             <div className="p-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">Plan Inclusions</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    'Unlimited Branches & Warehouses',
                    'Advanced Driver Routing (AI)',
                    'Predictive Fleet Maintenance',
                    '24/7 Priority Hotline Support',
                    'Dedicated Success Manager',
                    'API & ERP Access Keys'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      <span className="text-sm font-bold text-gray-700">{feat}</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="p-6 bg-[#FAFAFA] border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                   <Clock size={16} /> Subscription active since Sep 2024
                </div>
                <button 
                  onClick={() => navigate('/admin/billing/plans')}
                  className="text-sm font-bold text-gray-900 flex items-center gap-2 hover:underline decoration-2 underline-offset-4"
                >
                  Compare available plans <ArrowRight size={16} />
                </button>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex justify-between items-center">
             <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Cancellation</h3>
                <p className="text-sm font-medium text-gray-500">You can cancel or pause your subscription at any time.</p>
             </div>
             <button className="btn bg-white border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-200 px-6 font-bold shadow-sm">
                Cancel Plan
             </button>
          </div>
        </div>

        {/* Payment Method & Invoices */}
        <div className="space-y-6">
           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
              <h3 className="hero-metadata mb-6">Payment Method</h3>
              
              <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6 relative hover:scale-[1.02] transition-transform cursor-pointer shadow-xl border border-gray-800">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-8 bg-gradient-to-br from-gray-200 to-white rounded flex items-center justify-center font-bold text-[#111] italic text-xs tracking-tighter">
                     VISA
                   </div>
                   <ShieldCheck size={20} className="text-[#FFCC00]" />
                </div>
                <div className="flex justify-between items-end">
                   <div className="font-mono text-lg tracking-[0.2em] font-medium text-gray-200">
                     •••• 4122
                   </div>
                   <div className="text-xs font-bold text-gray-400 font-mono">08/28</div>
                </div>
              </div>

              <button className="w-full btn bg-[#635BFF] hover:bg-[#5249E5] text-white py-3 rounded-xl shadow-md flex items-center justify-center gap-2 mb-2 font-bold transition-colors">
                Manage in Stripe <ExternalLink size={16} />
              </button>
              <p className="text-xs font-medium text-gray-500 text-center leading-tight">Secure billing portal provided by Stripe, Inc.</p>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="hero-metadata mb-4">Billing History</h3>
              <div className="space-y-3">
                 {[
                   { date: '14 Sep 2025', amt: '$12,000.00', stat: 'Paid' },
                   { date: '14 Sep 2024', amt: '$10,500.00', stat: 'Paid' }
                 ].map((inv, i) => (
                   <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 cursor-pointer transition-colors group">
                     <div>
                       <p className="text-sm font-bold text-gray-900">{inv.amt}</p>
                       <p className="text-xs font-medium text-gray-500">{inv.date}</p>
                     </div>
                     <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                       {inv.stat}
                     </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}



