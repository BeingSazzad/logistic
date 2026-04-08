import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Plus, Search, Building2 } from 'lucide-react';

const tenants = [
  { id: 'T-001', name: 'HERO Logistics Pty Ltd',  status: 'active',    plan: 'Pro',        users: 18, shipments: 342, mrr: 149,  joined: '12 Jan 2025' },
  { id: 'T-002', name: 'FastMove AU',              status: 'trial',     plan: 'Starter',    users: 3,  shipments: 47,  mrr: 0,    joined: '5 Apr 2026', trial: 3 },
  { id: 'T-003', name: 'QuickShip Pty Ltd',        status: 'suspended', plan: 'Basic',      users: 0,  shipments: 0,   mrr: 0,    joined: '3 Aug 2024' },
  { id: 'T-004', name: 'OzFreight Co',             status: 'active',    plan: 'Enterprise', users: 54, shipments: 1240,mrr: 599,  joined: '1 Mar 2024' },
  { id: 'T-005', name: 'SunState Transport',       status: 'active',    plan: 'Pro',        users: 11, shipments: 198, mrr: 149,  joined: '19 Sep 2025' },
];

const statusCfg = {
  active:    { label: 'Active',    icon: CheckCircle2, cls: 'bg-emerald-100 text-emerald-700' },
  trial:     { label: 'Trial',     icon: Clock,        cls: 'bg-yellow-100 text-yellow-700'  },
  suspended: { label: 'Suspended', icon: XCircle,      cls: 'bg-red-100 text-red-700'        },
};

export default function Tenants() {
  const [search, setSearch] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  const filtered = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  if (showWizard) {
    return (
      <div className="max-w-lg mx-auto">
        <button onClick={() => { setShowWizard(false); setWizardStep(1); }} className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1">← Back to Tenants</button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex gap-1 mb-8">
            {[1,2,3,4].map(s => <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= wizardStep ? 'bg-yellow-500' : 'bg-gray-200'}`} />)}
          </div>
          <p className="text-xs text-yellow-600 font-black uppercase tracking-wider mb-1">Step {wizardStep} of 4</p>

          {wizardStep === 1 && <>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Company Information</h2>
            <div className="space-y-4">
              {[['Company Name','HERO Logistics Pty Ltd'],['Industry','Logistics & Transport'],['Country','Australia'],['Company Email','admin@hero.com'],['Phone','+61 2 1234 5678']].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">{label}</label>
                  <input className="input" placeholder={placeholder} defaultValue={placeholder} />
                </div>
              ))}
            </div>
          </>}

          {wizardStep === 2 && <>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription Plan</h2>
            <div className="space-y-3">
              {[
                { plan: 'Starter', price: '$49/mo', desc: '1 branch · 3 users · 50 shipments/mo' },
                { plan: 'Pro',     price: '$149/mo',desc: '5 branches · 15 users · 500 shipments/mo', recommended: true },
                { plan: 'Enterprise', price: 'Custom', desc: 'Unlimited branches, users & shipments' },
              ].map(p => (
                <div key={p.plan} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${p.recommended ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{p.plan}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900">{p.price}</p>
                      {p.recommended && <span className="text-[10px] bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full font-bold">Recommended</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Trial Period</label>
                <select className="input"><option>14 days free trial</option><option>7 days</option><option>30 days</option><option>No trial</option></select>
              </div>
            </div>
          </>}

          {wizardStep === 3 && <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Assign Master Admin</h2>
            <p className="text-sm text-gray-500 mb-6">This person receives an invitation email to complete setup.</p>
            <div className="space-y-4">
              {[['Full Name','John Smith'],['Email','john.smith@hero.com.au'],['Phone (optional)','+61 423 456 789']].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">{label}</label>
                  <input className="input" placeholder={placeholder} defaultValue={placeholder} />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 font-medium">
              📧 Invitation will be sent after tenant is created.
            </div>
          </>}

          {wizardStep === 4 && <>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Create</h2>
            <div className="space-y-3 mb-6">
              {[['Company','HERO Logistics Pty Ltd'],['Plan','Pro ($149/mo · 14-day trial)'],['Master Admin','John Smith (john.smith@hero.com.au)']].map(([k,v]) => (
                <div key={k} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold text-gray-900">{v}</span>
                </div>
              ))}
            </div>
          </>}

          <div className="flex gap-3 mt-8">
            {wizardStep > 1 && <button onClick={() => setWizardStep(s => s-1)} className="btn bg-gray-100 text-gray-700 flex-1">← Back</button>}
            <button onClick={() => { if(wizardStep < 4) setWizardStep(s=>s+1); else setShowWizard(false); }}
              className="btn btn-primary flex-1 py-3">
              {wizardStep < 4 ? 'Next Step →' : '✓ Create Tenant'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
          <p className="text-sm text-gray-500 mt-1">{tenants.length} companies · {tenants.filter(t=>t.status==='active').length} active</p>
        </div>
        <button onClick={() => setShowWizard(true)} className="btn btn-primary"><Plus size={16} /> New Tenant</button>
      </div>

      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className="input pl-9" placeholder="Search tenants..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4 text-right">Shipments/mo</th>
              <th className="px-6 py-4 text-right">MRR</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(t => {
              const cfg = statusCfg[t.status];
              return (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center"><Building2 size={15} className="text-yellow-600" /></div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.cls}`}>
                      <cfg.icon size={11} /> {cfg.label}
                      {t.trial && ` (${t.trial}d left)`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{t.plan}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700">{t.shipments}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{t.mrr ? `$${t.mrr}` : '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => window.location.href = `/platform/tenants/${t.id}`} className="btn btn-dark text-xs py-1.5 px-2.5">View</button>
                      {t.status === 'trial' && <button className="btn btn-primary text-xs py-1.5 px-2.5">Convert</button>}
                      {t.status === 'suspended' && <button disabled className="btn text-xs py-1.5 px-2.5 bg-gray-100 text-gray-400 cursor-not-allowed">Suspended</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
