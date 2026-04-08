import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, Plus, Bell, Shield, Users, Package, AlertTriangle, CheckCircle2, Factory, Globe, MapPin } from 'lucide-react';

export default function TenantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Active');
  const [modal, setModal] = useState(null);

  const company = {
    name: 'HERO Logistics Pty Ltd',
    abn: '12 345 678 901',
    address: { street: '1 Woolworths Way', suburb: 'Bella Vista', state: 'NSW', postcode: '2153' },
    email: 'admin@hero.com.au',
    phone: '+61 412 345 678',
    industry: 'Retail & FMCG',
    country: 'Australia',
    plan: 'Professional',
    joined: '12 Jan 2025',
    stats: { admins: 2, dispatchers: 5, drivers: 18, shipments: 342 }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div>
        <button onClick={() => navigate('/platform/tenants')} className="text-sm font-medium text-blue-600 hover:underline mb-4 flex items-center gap-1">← Back to Tenants</button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center shrink-0">
             <Building2 size={32} className="text-gray-400" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{company.name}</h1>
              <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${status === 'Active' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>{status}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Tenant ID: {id || 'T-001'} · Joined {company.joined}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Company Profile</h3>
            
            <div className="grid grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Industry</label>
                <div className="relative">
                  <Factory size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="input pl-10" defaultValue={company.industry}>
                    <option>Retail & FMCG</option>
                    <option>3PL Logistics</option>
                    <option>Manufacturing</option>
                    <option>Agriculture</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Country</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="input pl-10" defaultValue={company.country}>
                    <option>Australia</option>
                    <option>New Zealand</option>
                    <option>Singapore</option>
                  </select>
                </div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Headquarters Address</h4>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Street Address</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="input pl-10 bg-white" defaultValue={company.address.street} />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Suburb</label>
                <input className="input bg-white" defaultValue={company.address.suburb} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 font-semibold mb-1.5 block">State</label>
                  <select className="input bg-white" defaultValue={company.address.state}>
                    <option>NSW</option><option>VIC</option><option>QLD</option><option>WA</option><option>SA</option><option>TAS</option><option>ACT</option><option>NT</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Postcode</label>
                  <input className="input bg-white" defaultValue={company.address.postcode} />
                </div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-6 mb-3">Primary Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Email</label>
                <input className="input bg-white" defaultValue={company.email} />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1.5 block">Phone</label>
                <input className="input bg-white" defaultValue={company.phone} />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary px-6">Save Changes</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">Tenant Actions</p>
            <div className="space-y-2.5">
              <button onClick={() => setModal('impersonate')} className="w-full btn bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 justify-start h-11"><Shield size={18} className="mr-2" /> Impersonate for Support</button>
              {status === 'Active' ? (
                <button onClick={() => setModal('suspend')} className="w-full btn bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 justify-start h-11"><AlertTriangle size={18} className="mr-2" /> Suspend Tenant</button>
              ) : (
                <button onClick={() => setModal('activate')} className="w-full btn bg-green-500 hover:bg-green-600 text-gray-900 justify-start h-11"><CheckCircle2 size={18} className="mr-2 text-gray-900" /> Activate Tenant</button>
              )}
              <button onClick={() => navigate('/platform/settings/audit')} className="w-full btn bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 justify-start h-11">View Audit Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
