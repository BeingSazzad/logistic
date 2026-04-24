import React from 'react';
import { Network, Search, Plus, Blocks, Terminal, RefreshCw, Power } from 'lucide-react';

export default function AdminIntegrations() {
  const categories = [
    {
      label: 'Telematics & GPS',
      items: [
        { id: 'INT-01', name: 'Mapbox Navigation Matrix', desc: 'Real-time vehicle movement API and geofencing vector maps.', status: true, version: 'v2.4.1' },
        { id: 'INT-02', name: 'Samsara Fleet IoT', desc: 'Reefer temperature monitoring and engine diagnostics.', status: false, version: 'v1.0.0' }
      ]
    },
    {
      label: 'Financial Clearing',
      items: [
        { id: 'INT-03', name: 'Stripe Connect', desc: 'Automated credit card billing, invoicing, and driver pay splits.', status: true, version: 'v4.1.2' },
        { id: 'INT-04', name: 'Xero Accounting', desc: 'General ledger sync and tax compliance exports.', status: true, version: 'v3.8.0' }
      ]
    },
    {
      label: 'Communications',
      items: [
        { id: 'INT-05', name: 'Twilio Cloud SMS', desc: 'Programmable SMS for customer ETA alerts and driver pins.', status: true, version: 'v2.0.1' },
        { id: 'INT-06', name: 'SendGrid Email API', desc: 'Transactional mass-mailer for POD documents and reports.', status: false, version: 'v1.4.4' }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-hero-sm text-hero-dark shadow-sm">
            <Blocks size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Depot Integrations</h1>
            <p className="hero-body text-gray-600 mt-1">Manage API handshakes, external Webhooks, and ecosystem connections</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"><RefreshCw size={14}/> Sync All Webhooks</button>
          <button className="bg-hero-dark hover:bg-black text-brand px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"><Plus size={16}/> Add Webhook</button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="flex flex-col gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-4">
             <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-widest pl-1">{cat.label}</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 {cat.items.map(int => (
                  <div key={int.id} className={`bg-white p-8 rounded-3xl border transition-all relative overflow-hidden group shadow-sm ${int.status ? 'border-gray-100 hover:border-brand/40' : 'border-dashed border-gray-200 opacity-60 hover:opacity-100'}`}>
                    {/* Status Pip */}
                    <div className={`absolute top-0 right-0 w-12 h-12 ${int.status ? 'bg-emerald-50' : 'bg-gray-50'} rounded-bl-3xl flex justify-end items-start p-3`}>
                      <span className={`w-3 h-3 rounded-full ${int.status ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-300'}`}></span>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shrink-0 text-gray-400 group-hover:scale-110 transition-transform">
                        <Network size={24}/>
                      </div>
                      <div className="flex-1 pr-4">
                        <h4 className="text-sm font-semibold text-hero-dark uppercase tracking-widest leading-tight">
                          {int.name}
                        </h4>
                        <p className="text-xs font-bold text-gray-400 uppercase mt-2 leading-relaxed tracking-tight">{int.desc}</p>
                        
                        <div className="mt-6 flex items-center justify-between">
                          <code className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 uppercase tracking-widest">
                            {int.id} • {int.version}
                          </code>
                          <button className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2 rounded-xl border transition-all ${int.status ? 'text-red-500 border-red-100 hover:bg-red-50' : 'bg-hero-dark text-brand border-hero-dark shadow-md'}`}>
                            {int.status ? <Power size={12} strokeWidth={3}/> : <Plus size={12} strokeWidth={3}/>}
                            {int.status ? 'Term Terminal' : 'Establish Connect'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}



