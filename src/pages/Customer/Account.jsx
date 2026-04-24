import React from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export default function CustomerAccount() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        <p className="text-sm text-gray-500 mt-1">Woolworths Group Logistics</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-5">Company Details</h3>
        <div className="space-y-4">
          {[
            { label: 'Company Name', value: 'Woolworths Group Logistics', icon: Building2 },
            { label: 'Email',        value: 'logistics@woolworths.com.au', icon: Mail },
            { label: 'Phone',        value: '+61 2 8888 0000',            icon: Phone },
            { label: 'Address',      value: '1 Woolworths Way, Bella Vista NSW 2153', icon: MapPin },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <f.icon size={18} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold">{f.label}</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Credit Limit</p>
            <p className="font-semibold text-lg text-gray-900">$50,000 AUD</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Payment Terms</p>
            <p className="font-bold text-gray-900">Net 30 days</p>
          </div>
          <button className="btn btn-dark text-sm">Edit Details</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { label: 'Load status SMS', enabled: true },
            { label: 'Delivery confirmation email', enabled: true },
            { label: 'Invoice email', enabled: true },
            { label: 'Payment reminder email', enabled: false },
          ].map(n => (
            <div key={n.label} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{n.label}</span>
              <input type="checkbox" defaultChecked={n.enabled} className="toggle" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


