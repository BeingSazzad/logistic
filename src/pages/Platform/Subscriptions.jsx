import React, { useState } from 'react';
import { 
  TrendingUp, BarChart3, Users, Activity, 
  Settings2, Plus, CheckCircle2, X, Zap, Trash2, Edit2
} from 'lucide-react';

export default function Subscriptions() {
  const [planModal, setPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const stats = [
    { label: 'Monthly Revenue (MRR)', val: '$42,850', trend: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Yearly Revenue (ARR)', val: '$514.2k', trend: '+8%', icon: BarChart3, color: 'text-blue-500' },
    { label: 'Active Companies', val: '154', trend: '+4', icon: Users, color: 'text-[#FFCC00]' },
    { label: 'Churn Rate', val: '1.2%', trend: '-0.2%', icon: Activity, color: 'text-rose-500' },
  ];

  const plans = [
    { 
      id: 'str', name: 'Starter', price: '$0', billing: 'Free forever', users: '3 Users', fleet: '5 Vehicles', support: 'Email only',
      features: [true, false, false, false, false], color: 'bg-gray-300', tenants: 12,
      desc: 'For small operators just getting started.'
    },
    { 
      id: 'pro', name: 'Professional', price: '$149', billing: 'per month', users: '15 Users', fleet: '50 Vehicles', support: 'Priority Email',
      features: [true, true, true, false, false], color: 'bg-[#FFCC00]', tenants: 89, recommended: true,
      desc: 'Best for growing logistics businesses.'
    },
    { 
      id: 'biz', name: 'Business', price: '$349', billing: 'per month', users: '50 Users', fleet: '200 Vehicles', support: '24/7 Phone + Chat',
      features: [true, true, true, true, false], color: 'bg-blue-500', tenants: 53,
      desc: 'For multi-branch operations and large fleets.'
    },
    { 
      id: 'ent', name: 'Enterprise', price: 'Custom', billing: 'Annual contract', users: 'Unlimited', fleet: 'Unlimited', support: 'Dedicated Manager',
      features: [true, true, true, true, true], color: 'bg-black', tenants: 18,
      desc: 'Full-scale white-label deployments.'
    },
  ];

  const featureRows = [
    'Load Management',
    'Multi-Branch Support',
    'API & Integrations',
    'Custom Branding / White Label',
    'Dedicated Account Manager',
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12 px-2">
      
      {/* ── Page Header ── */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subscriptions & Plans</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform revenue tiers and configure packaging limits.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── KPI Matrix ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
         {stats.map((s, i) => (
          <div key={i} className="card p-5 flex flex-col justify-between group">
             <div>
                <p className="hero-metadata">{s.label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{s.val}</p>
             </div>
             <div className="flex items-center justify-between mt-4">
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${s.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>{s.trend}</span>
                <s.icon size={20} className={s.color} />
             </div>
          </div>
        ))}
      </div>

      {/* ── Main Tiers Section ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
         <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-[#FFCC00]">
                  <Settings2 size={20} />
               </div>
               <div>
                  <h3 className="text-sm font-semibold text-gray-800">Active Plan Tiers</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Design the pricing packages available to your companies</p>
               </div>
            </div>
            <button 
              onClick={() => { setEditingPlan(null); setPlanModal(true); }}
              className="btn btn-primary shadow-sm px-5"
            >
               <Plus size={16} strokeWidth={2.5}/> Add Plan
            </button>
         </div>
         
         <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {plans.map((p, i) => (
              <div key={i} className="flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-[#FFCC00] hover:shadow-xl transition-all group relative">
                 {p.recommended && (
                    <div className="absolute top-4 right-4 bg-[#FFCC00] text-orange-900 text-xs font-bold px-2.5 py-0.5 rounded shadow-sm">Popular</div>
                 )}
                 <div className={`h-1.5 w-full ${p.color}`}></div>
                 <div className="p-5 flex-1 flex flex-col">
                    <p className="hero-metadata mb-1.5">{p.tenants} Companies</p>
                    <h4 className="text-xl font-bold text-gray-900 mb-0.5">{p.name}</h4>
                    <p className="text-xs text-gray-400 font-medium mb-4 leading-relaxed">{p.desc}</p>
                    <div className="flex items-baseline gap-1 mb-1 text-2xl font-bold text-gray-900">
                       {p.price}
                       {p.price !== 'Custom' && <span className="text-xs text-gray-500 font-medium">/mo</span>}
                    </div>
                    <p className="text-xs text-gray-400 font-medium mb-5">{p.billing}</p>
                    <div className="space-y-2 mb-6">
                       <div className="flex items-center gap-2 text-xs font-medium text-gray-700"><CheckCircle2 size={14} className="text-emerald-500 shrink-0"/> {p.users}</div>
                       <div className="flex items-center gap-2 text-xs font-medium text-gray-700"><CheckCircle2 size={14} className="text-emerald-500 shrink-0"/> {p.fleet}</div>
                       <div className="flex items-center gap-2 text-xs font-medium text-gray-700"><CheckCircle2 size={14} className="text-emerald-500 shrink-0"/> {p.support}</div>
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-50">
                       <button onClick={() => { setEditingPlan(p); setPlanModal(true); }} className="flex-1 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2">
                         <Edit2 size={14}/> Edit
                       </button>
                       <button className="py-2 px-3 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-200 rounded-lg text-gray-500 transition-colors">
                         <Trash2 size={14}/>
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* ── Feature Comparison Table ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
         <div className="p-6 border-b border-gray-50 bg-[#FAFAFA]">
            <h3 className="text-sm font-semibold text-gray-800">Feature Comparison</h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">See exactly what's included in each plan</p>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="border-b border-gray-50">
                     <th className="text-left p-4 text-xs font-semibold text-gray-500 w-1/3">Feature</th>
                     {plans.map(p => (
                        <th key={p.id} className="p-4 text-center">
                           <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.recommended ? 'bg-[#FFCC00] text-black' : 'bg-gray-100 text-gray-700'}`}>{p.name}</span>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {featureRows.map((feat, fi) => (
                     <tr key={fi} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="p-4 text-sm font-medium text-gray-700">{feat}</td>
                        {plans.map(p => (
                           <td key={p.id} className="p-4 text-center">
                              {p.features[fi]
                                 ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
                                 : <X size={18} className="text-gray-200 mx-auto" />}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
      
      {/* ── Enterprise Upgrade Feature Box ── */}
      <div className="bg-[#111] rounded-xl p-8 border border-gray-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#FFCC00] opacity-[0.03] rounded-full blur-3xl"></div>
         <div>
            <h4 className="text-[#FFCC00] font-semibold text-lg tracking-tight mb-1">Enterprise Upgrade Triggers</h4>
            <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed">Automatically flag companies when they exceed plan limits and prompt them to upgrade to an enterprise agreement.</p>
         </div>
         <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm shrink-0">
           Configure Triggers
         </button>
      </div>

      {/* ── Plan Architect Modal ── */}
      {planModal && <PlanEditorModal onClose={() => setPlanModal(false)} editingPlan={editingPlan} />}
    </div>
  );
}

function PlanEditorModal({ onClose, editingPlan }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-gray-50 bg-[#FAFAFA] flex justify-between items-center">
           <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">Set pricing, limits, and features for this subscription tier.</p>
           </div>
           <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"><X size={20}/></button>
        </div>
        
        <div className="p-8 max-h-[70vh] overflow-y-auto hidden-scrollbar">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2 px-1">Plan Name</label>
                    <input type="text" defaultValue={editingPlan?.name || ''} placeholder="e.g. Professional" className="input w-full" />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2 px-1">Monthly Price ($)</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                       <input type="text" defaultValue={editingPlan ? editingPlan.price.replace('$', '') : ''} placeholder="149" className="input w-full pl-8 text-lg font-bold" />
                    </div>
                 </div>
                 
                 <div className="pt-6 border-t border-gray-100 space-y-4">
                    <label className="text-xs font-semibold text-gray-700 block px-1 flex items-center gap-2"><TrendingUp size={14}/> Plan Limits</label>
                    <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                       <div className="space-y-2">
                          <div className="flex justify-between px-1">
                             <span className="text-xs font-medium text-gray-500">Max Users</span>
                             <span className="text-xs font-bold text-gray-900">{editingPlan?.users || '10 Users'}</span>
                          </div>
                          <input type="range" className="w-full h-1 bg-gray-300 rounded-full appearance-none accent-[#FFCC00]" />
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between px-1">
                             <span className="text-xs font-medium text-gray-500">Max Fleet / Assets</span>
                             <span className="text-xs font-bold text-gray-900">{editingPlan?.fleet || '50 Assets'}</span>
                          </div>
                          <input type="range" className="w-full h-1 bg-gray-300 rounded-full appearance-none accent-[#FFCC00]" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <label className="text-xs font-semibold text-gray-700 block px-1 flex items-center gap-2"><Zap size={14} className="text-[#FFCC00]"/> Add-on Features</label>
                 <div className="space-y-3">
                    {[
                      { l: 'Priority Support', d: '24/7 dedicated account manager' },
                      { l: 'AI Route Optimization', d: 'Smart routing and auto-dispatch' },
                      { l: 'Cold Chain Monitoring', d: 'Temperature sensor tracking' },
                      { l: 'Custom Branding', d: 'Your logo and colors on driver app' }
                    ].map((mod, i) => (
                      <label key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#FFCC00]/10 hover:border-[#FFCC00]/30 transition-all cursor-pointer group">
                         <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FFCC00] focus:ring-[#FFCC00]" defaultChecked={i < 2} />
                         <div>
                            <p className="text-sm font-semibold text-gray-900 leading-none mb-1">{mod.l}</p>
                            <p className="text-xs font-medium text-gray-500 leading-tight">{mod.d}</p>
                         </div>
                      </label>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="px-8 py-5 bg-[#FAFAFA] border-t border-gray-100 flex justify-between items-center">
           {editingPlan ? (
               <button className="text-sm font-semibold text-red-500 hover:text-red-700 flex items-center gap-2 transition-colors">
                  <Trash2 size={16}/> Delete Plan
               </button>
           ) : (
               <button onClick={onClose} className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
           )}
           <div className="flex gap-3">
              <button onClick={onClose} className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm">Save Draft</button>
              <button onClick={onClose} className="btn btn-primary shadow-sm">Save & Publish</button>
           </div>
        </div>
      </div>
    </div>
  );
}

