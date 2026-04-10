import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, ImageIcon } from 'lucide-react';

const pods = [
  { id: 'J-2026-1260', customer: 'Woolworths', route: 'SYD → MEL', value: '$2,037.20', driver: 'James Mitchell', delivered: '8 Apr, 17:23', window: '14:00–18:00', toll: 45, status: 'pending', photos: 2, signed: true },
  { id: 'J-2026-1253', customer: 'Coles',      route: 'MEL → ADL', value: '$1,450.00', driver: 'Sarah Chen',    delivered: '8 Apr, 13:10', window: '11:00–15:00', toll: 0,  status: 'exception', photos: 2, signed: true },
  { id: 'J-2026-1248', customer: 'Amazon AU',  route: 'BNE → SYD', value: '$980.50',  driver: 'Michael Wong',  delivered: '8 Apr, 09:45', window: '08:00–12:00', toll: 28, status: 'pending', photos: 2, signed: true },
  { id: 'J-2026-1244', customer: 'IGA',        route: 'SYD → CBR', value: '$620.00',  driver: 'David Lee',     delivered: '7 Apr, 16:30', window: '14:00–18:00', toll: 0,  status: 'pending', photos: 2, signed: true },
];

export default function PODReview() {
  const [selected, setSelected] = useState(null);
  const [approved, setApproved] = useState([]);

  const pod = pods.find(p => p.id === selected);

  if (selected && pod) {
    const isApproved = approved.includes(pod.id);
    return (
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-semibold text-hero-neutral hover:text-hero-dark transition-colors">
            ← Back to Queue
          </button>
          <h1 className="hero-h1">POD Review — {pod.id}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Shipment Details */}
          <div className="card p-6">
            <h3 className="hero-card-title mb-4">Shipment Details</h3>
            <div className="space-y-4">
              {[
                ['Customer', pod.customer], ['Route', pod.route], ['Driver', pod.driver],
                ['Invoice Value', pod.value], ['Delivery Window', pod.window], ['Actual Delivery', pod.delivered],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="hero-metadata text-hero-neutral">{k}</span>
                  <span className="text-sm font-bold text-hero-dark">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">GPS Variance</span>
                <span className="text-green-600 font-semibold">+6 km (+0.7%) ✓</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Delivery status</span>
                <span className={`font-semibold ${pod.window.includes(pod.delivered.split(', ')[1]?.split(':')[0]) ? 'text-green-600' : 'text-green-600'}`}>Within window ✓</span>
              </div>
            </div>
          </div>

          {/* Right: POD Verification */}
          <div className="card p-6">
            <h3 className="hero-card-title mb-4">Delivery Proof</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[1, 2].map(n => (
                <div key={n} className="aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200 hover:border-emerald-400 cursor-pointer transition-colors">
                  <ImageIcon size={24} />
                  <span className="text-xs mt-1 font-medium">Photo {n}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 font-semibold mb-1">Receiver Signature</p>
              <div className="h-16 bg-white rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-400 italic text-sm">Jane Doe — digitally signed</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">17:23 · GPS: -37.8142, 144.9632</p>
            </div>
            <div className="space-y-2">
              {[`${pod.photos} delivery photos`, 'Receiver signature', 'GPS timestamp'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charges & Toll */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Charges & Reimbursements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { label: 'Base Charge', value: '$1,275.00' },
              { label: 'Fuel Surcharge (8%)', value: '$102.00' },
              { label: 'Insurance', value: '$450.00' },
              { label: 'Tailgate', value: '$25.00' },
            ].map(c => (
              <div key={c.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">{c.label}</p>
                <p className="font-bold text-gray-900 mt-1">{c.value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-3 border-t border-b border-gray-100 mb-4">
            <span className="font-semibold text-gray-700">Total Invoice (inc. GST)</span>
            <span className="font-black text-lg text-gray-900">{pod.value}</span>
          </div>

          {pod.toll > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm font-bold text-yellow-800 mb-2">🧾 Toll Reimbursement Claim</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Driver claimed: <strong>${pod.toll}.00</strong></p>
                  <p className="text-xs text-yellow-600 mt-0.5">Receipt photo attached</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn text-xs py-2 bg-emerald-500 text-white hover:bg-emerald-600">Approve ${pod.toll}</button>
                  <button className="btn text-xs py-2 bg-red-100 text-red-700 hover:bg-red-200">Reject</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decision */}
        {!isApproved ? (
          <div className="flex gap-4">
            <button
              onClick={() => { setApproved(a => [...a, pod.id]); }}
              className="btn btn-primary flex-1 py-4 text-base">
              <CheckCircle2 size={18} /> Approve POD & Generate Invoice
            </button>
            <button className="btn btn-outline border-hero-neutral/20 text-hero-neutral px-8">
              Hold for Review
            </button>
          </div>
        ) : (
          <div className="bg-hero-success/10 border border-hero-success/20 rounded-hero-md p-6 text-center">
            <CheckCircle2 size={32} className="text-hero-success mx-auto mb-2" />
            <p className="font-bold text-hero-dark">POD Approved — Invoice Generated</p>
            <p className="hero-body text-hero-neutral mt-1">Invoice sent to {pod.customer} · Driver notified</p>
            <button onClick={() => setSelected(null)} className="btn btn-primary mt-6">Back to Queue</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="hero-h1">POD Review Queue</h1>
          <p className="hero-metadata text-hero-neutral mt-1">{pods.length - approved.length} pending · {approved.length} approved today</p>
        </div>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {pods.map(pod => {
            const isDone = approved.includes(pod.id);
            return (
              <div key={pod.id} className={`p-6 flex items-center justify-between hover:bg-brand/5 transition-all ${isDone ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-hero-sm flex items-center justify-center shrink-0 border ${
                    isDone ? 'bg-hero-success/10 text-hero-success border-hero-success/20' : 
                    pod.status === 'exception' ? 'bg-hero-danger/10 text-hero-danger border-hero-danger/20 animate-pulse' : 
                    'bg-brand/10 text-hero-dark border-brand/20'
                  }`}>
                    {isDone ? <CheckCircle2 size={20} /> :
                     pod.status === 'exception' ? <AlertCircle size={20} /> :
                     <AlertCircle size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="hero-card-title text-sm">{pod.id}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm font-bold text-hero-dark">{pod.customer}</span>
                      {pod.toll > 0 && <span className="badge badge-blue">TOLL ${pod.toll}</span>}
                    </div>
                    <p className="hero-metadata text-hero-neutral lowercase">{pod.route} · {pod.driver} · {pod.delivered}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-black text-hero-dark">{pod.value}</span>
                  {!isDone ? (
                    <button onClick={() => setSelected(pod.id)} className="btn btn-outline py-2 border-hero-neutral/20 text-xs">
                      Review <ChevronRight size={14} />
                    </button>
                  ) : (
                    <span className="badge badge-green">✓ Approved</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
