import React from 'react';
import { Share2, Zap, CheckCircle2, AlertCircle, Plus, Terminal } from 'lucide-react';

export default function AdminIntegrations() {
  const integrations = [
    { id: 'INT-01', name: 'Mapbox GPS Tracking',  desc: 'Real-time vehicle movement and geofencing.', status: 'Connected', icon: '📍' },
    { id: 'INT-02', name: 'Stripe Payments',     desc: 'Automated credit card billing & link payments.', status: 'Pending Config', icon: '💳' },
    { id: 'INT-03', name: 'Twilio SMS API',     desc: 'Dispatch alerts and driver check-in texts.', status: 'Connected', icon: '💬' },
    { id: 'INT-04', name: 'AWS S3 Storage',      desc: 'Proof of Delivery (POD) photo document hosting.', status: 'Connected', icon: '☁️' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Integrations</h1>
          <p className="text-sm text-gray-500 mt-1">Connect third-party GPS providers, payment gateways, and communication APIs.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16}/> New Integration</button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(int => (
          <div key={int.id} className="card bg-white p-5 border shadow-sm border-gray-100 flex flex-col gap-4 relative overflow-hidden group hover:border-yellow-400 transition-all">
             <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity"><Terminal size={14} className="text-gray-300"/></div>
             
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-gray-100">{int.icon}</div>
                <div>
                   <h3 className="font-bold text-gray-900 leading-tight">{int.name}</h3>
                   <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-black mt-1.5 ${int.status === 'Connected' ? 'text-green-600' : 'text-red-500'}`}>
                      {int.status === 'Connected' ? <CheckCircle2 size={10}/> : <AlertCircle size={10}/> } {int.status}
                   </span>
                </div>
             </div>
             
             <p className="text-sm text-gray-500 font-medium leading-relaxed pr-6">{int.desc}</p>
             
             <div className="flex gap-2 mt-2 pt-2 border-t border-gray-50">
               <button className="btn btn-dark text-xs py-2 flex-1">Documentation</button>
               <button className={`btn  text-xs py-2 px-6 font-bold ${int.status === 'Connected' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-400 text-black'}`}>
                 {int.status === 'Connected' ? 'Configure' : 'Setup Now'}
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
