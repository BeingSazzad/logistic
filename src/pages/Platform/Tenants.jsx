import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Plus, Search, Building2, ChevronDown } from 'lucide-react';

const tenants = [
  { id: 'T-001', name: 'HERO Logistics Pty Ltd',  status: 'active',    plan: 'Pro',        users: 18, shipments: 342, mrr: 149,  joined: '12 Jan 2025' },
  { id: 'T-002', name: 'FastMove AU',              status: 'trial',     plan: 'Starter',    users: 3,  shipments: 47,  mrr: 0,    joined: '5 Apr 2026', trial: 3 },
  { id: 'T-003', name: 'QuickShip Pty Ltd',        status: 'suspended', plan: 'Basic',      users: 0,  shipments: 0,   mrr: 0,    joined: '3 Aug 2024' },
  { id: 'T-004', name: 'OzFreight Co',             status: 'active',    plan: 'Enterprise', users: 54, shipments: 1240,mrr: 599,  joined: '1 Mar 2024' },
  { id: 'T-005', name: 'SunState Transport',       status: 'active',    plan: 'Pro',        users: 11, shipments: 198, mrr: 149,  joined: '19 Sep 2025' },
];

export default function Tenants() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const showWizard = location.pathname.endsWith('/new');
  const [wizardStep, setWizardStep] = useState(1);

  const filtered = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  if (showWizard) {
    return (
      <div className="max-w-lg mx-auto pb-12">
        <button onClick={() => { setWizardStep(1); navigate('/platform/tenants'); }} className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-2 transition-colors border px-3 py-1.5 rounded-lg border-gray-200">← Back</button>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="flex gap-1 mb-8">
            {[1,2,3,4].map(s => <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= wizardStep ? 'bg-[#FFCC00]' : 'bg-gray-100'}`} />)}
          </div>
          <p className="text-xs text-yellow-600 font-bold uppercase tracking-widest mb-1 shadow-sm w-fit border border-yellow-100 px-2 py-0.5 rounded bg-yellow-50">Step {wizardStep} of 4</p>

          {wizardStep === 1 && <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
            <div className="space-y-4">
              {[['Company Name','HERO Logistics Pty Ltd'],['Industry','Logistics & Transport'],['Country','Australia'],['Company Email','admin@hero.com'],['Phone','+61 2 1234 5678']].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase">{label}</label>
                  <input className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" placeholder={placeholder} defaultValue={placeholder} />
                </div>
              ))}
            </div>
          </>}

          {wizardStep === 2 && <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Plan</h2>
            <div className="space-y-3">
              {[
                { plan: 'Starter', price: '$49/mo', desc: '1 branch · 3 users · 50 shipments/mo' },
                { plan: 'Pro',     price: '$149/mo',desc: '5 branches · 15 users · 500 shipments/mo', recommended: true },
                { plan: 'Enterprise', price: 'Custom', desc: 'Unlimited branches, users & shipments' },
              ].map(p => (
                <div key={p.plan} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${p.recommended ? 'border-[#FFCC00] bg-yellow-50/30' : 'border-gray-100 hover:border-gray-300'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{p.plan}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{p.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900">{p.price}</p>
                      {p.recommended && <span className="text-[10px] bg-[#FFCC00] text-black px-2 py-0.5 rounded font-bold uppercase tracking-widest mt-1 inline-block">Recommended</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase">Trial Period</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all cursor-pointer"><option>14 days free trial</option><option>7 days</option><option>30 days</option><option>No trial</option></select>
              </div>
            </div>
          </>}

          {wizardStep === 3 && <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assign Master Admin</h2>
            <p className="text-sm font-medium text-gray-500 mb-6">This person receives an invitation email to complete setup.</p>
            <div className="space-y-4">
              {[['Full Name','John Smith'],['Email','john.smith@hero.com.au'],['Phone (optional)','+61 423 456 789']].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase">{label}</label>
                  <input className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" placeholder={placeholder} defaultValue={placeholder} />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 font-bold flex items-center gap-2">
              <span className="text-lg">📧</span> Invitation will be sent after company account is created.
            </div>
          </>}

          {wizardStep === 4 && <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Create</h2>
            <div className="space-y-4 mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
              {[['Company','HERO Logistics Pty Ltd'],['Plan','Pro ($149/mo · 14-day trial)'],['Master Admin','John Smith (john.smith@hero.com.au)']].map(([k,v]) => (
                <div key={k} className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">{k}</span>
                  <span className="font-bold text-gray-900 text-sm">{v}</span>
                </div>
              ))}
            </div>
          </>}

          <div className="flex gap-3 mt-8">
            {wizardStep > 1 && <button onClick={() => setWizardStep(s => s-1)} className="px-6 py-3 font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg flex-1 transition-colors">By-pass ←</button>}
            <button onClick={() => { if(wizardStep < 4) setWizardStep(s=>s+1); else navigate('/platform/tenants'); }}
              className={`px-6 py-3 font-bold rounded-lg flex-1 transition-all ${wizardStep < 4 ? 'bg-[#111] hover:bg-black text-white' : 'bg-[#FFCC00] hover:bg-[#E6B800] text-black shadow-sm'}`}>
              {wizardStep < 4 ? 'Next Step →' : '✓ Create Account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Updated Header - Matching Reference Style */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="hero-h1">Companies</h1>
          <p className="hero-body text-hero-neutral mt-1">Manage all companies using the platform and their accounts.</p>
        </div>
        <button 
          onClick={() => navigate('/platform/tenants/new')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> Add Company
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
           <div className="relative w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search companies..." 
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all" 
              />
           </div>
           
           <div className="relative">
             <button 
               onClick={() => setShowSort(!showSort)}
               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
             >
                Sort By <ChevronDown size={16} className={`text-gray-400 transition-transform ${showSort ? 'rotate-180' : ''}`} />
             </button>

             {showSort && (
               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                 <div className="py-1">
                   {['Company Name', 'Status', 'Subscription Plan', 'Monthly Revenue'].map((opt) => (
                     <button
                       key={opt}
                       onClick={() => setShowSort(false)}
                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors font-medium"
                     >
                       {opt}
                     </button>
                   ))}
                 </div>
               </div>
             )}
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4">Company Details</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Subscription</th>
                 <th className="px-6 py-4">Monthly MRR</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filtered.map(t => (
                 <tr className="hover:bg-gray-50/50 transition-all cursor-pointer group" key={t.id} onClick={() => window.location.href = `/platform/tenants/${t.id}`}>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0">
                          <Building2 size={16} className="text-gray-400" />
                       </div>
                       <div>
                         <div className="font-bold text-[#111] text-[15px]">{t.name}</div>
                         <div className="text-[11px] text-gray-400 font-medium tracking-tight mt-0.5">{t.id} • {t.joined}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                     <span className={`text-[10px] font-bold px-3 py-1 rounded-md border inline-flex items-center gap-1 ${
                        t.status === 'active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                        t.status === 'trial' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                     }`}>
                        {t.status === 'trial' && <Clock size={10} />}
                        {t.status}
                        {t.status === 'trial' && ` (${t.trial}d)`}
                     </span>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-[#111]">{t.plan}</span>
                         <span className="text-[11px] text-gray-400 mt-0.5 font-medium">{t.shipments} shipments/mo</span>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <span className="text-sm font-black text-[#111]">{t.mrr ? `$${t.mrr}` : '—'}</span>
                   </td>
                   <td className="px-6 py-5 text-right">
                      <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest" onClick={(e) => { e.stopPropagation(); window.location.href = `/platform/tenants/${t.id}`}}>
                        Manage
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
