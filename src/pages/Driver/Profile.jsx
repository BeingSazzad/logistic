import React from 'react';
import { User, Phone, Mail, Shield, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverProfile() {
  const navigate = useNavigate();
  const docs = [
    { name: 'Heavy Vehicle License',  expiry: '14 Jun 2027', ok: true },
    { name: 'Medical Certificate',    expiry: '1 Feb 2027',  ok: true },
    { name: 'Police Check',           expiry: '8 Apr 2025',  ok: false },
    { name: 'Forklift License',       expiry: '30 Sep 2026', ok: true },
  ];

  return (
    <div className="p-4 flex flex-col gap-4 pb-24">
      {/* Profile Card */}
      <div className="bg-black text-white rounded-2xl p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center font-black text-black text-2xl shrink-0">
          JM
        </div>
        <div>
          <h2 className="text-xl font-bold">James Mitchell</h2>
          <p className="text-yellow-400 text-sm font-semibold">Heavy Vehicle Driver</p>
          <p className="text-gray-400 text-xs mt-1">EMP-DRV-001 · Sydney Branch</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Contact Info</h3>
        <div className="space-y-3">
          {[
            { icon: Phone, label: 'Mobile', value: '+61 412 345 678' },
            { icon: Mail,  label: 'Email',  value: 'j.mitchell@hero.com.au' },
            { icon: User,  label: 'Bank',   value: 'BSB 062-000 | Acc 12345678' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <item.icon size={15} className="text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Documents */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Compliance Documents</h3>
        <div className="space-y-2">
          {docs.map(doc => (
            <div key={doc.name} className={`flex items-center justify-between p-3 rounded-xl ${doc.ok ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-2">
                {doc.ok
                  ? <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  : <AlertCircle size={16} className="text-red-500 shrink-0" />}
                <div>
                  <p className="text-xs font-semibold text-gray-900">{doc.name}</p>
                  <p className={`text-xs ${doc.ok ? 'text-gray-500' : 'text-red-600 font-bold'}`}>
                    {doc.ok ? `Expires ${doc.expiry}` : `EXPIRED ${doc.expiry}`}
                  </p>
                </div>
              </div>
              {!doc.ok && (
                <span className="text-[10px] font-black bg-red-200 text-red-800 px-2 py-0.5 rounded-full uppercase">
                  Action Required
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Performance Stats</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Trips', value: '128' },
            { label: 'On-Time', value: '94%' },
            { label: 'KM Total', value: '24,180' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/login')}
        className="btn w-full py-3.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}
