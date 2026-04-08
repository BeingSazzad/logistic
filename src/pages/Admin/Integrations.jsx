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
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"><Blocks className="text-[#FACC15]"/> Hub Integrations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage API handshakes, external Webhooks, and third-party SaaS connections.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-dark shadow-sm"><RefreshCw size={14}/> Sync All Webhooks</button>
          <button className="btn btn-primary shadow-sm"><Plus size={16}/> Add Webhook</button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="flex flex-col gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-4">
             <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">{cat.label}</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {cat.items.map(int => (
                  <div key={int.id} className={`card bg-white p-6 shadow-sm border transition-all relative overflow-hidden group ${int.status ? 'border-gray-200 hover:border-gray-300' : 'border-dashed border-gray-200 opacity-70 hover:opacity-100'}`}>
                    {/* Status Pip */}
                    <div className={`absolute top-0 right-0 w-10 h-10 ${int.status ? 'bg-green-50' : 'bg-gray-50'} rounded-bl-full flex justify-end items-start p-2.5`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${int.status ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shrink-0 text-gray-400">
                        <Network size={20}/>
                      </div>
                      <div className="flex-1 pr-6">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight flex items-center gap-2">
                          {int.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-medium">{int.desc}</p>
                        
                        <div className="mt-5 flex items-center justify-between">
                          <code className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                            {int.id} • {int.version}
                          </code>
                          <button className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md transition-colors ${int.status ? 'text-red-500 hover:bg-red-50' : 'text-[#111] hover:bg-[#FACC15] bg-gray-100 border border-gray-200'}`}>
                            {int.status ? <Power size={12}/> : <Plus size={12}/>}
                            {int.status ? 'Disconnect' : 'Connect'}
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
