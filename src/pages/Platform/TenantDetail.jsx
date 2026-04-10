import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, Plus, Bell, Shield, Users, Package, AlertTriangle, 
  CheckCircle2, Factory, Globe, MapPin, X, LogIn, Lock, Unlock 
} from 'lucide-react';

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
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      <div>
        <button onClick={() => navigate('/platform/tenants')} className="text-sm font-medium text-blue-600 hover:underline mb-4 flex items-center gap-1">← Back to Companies</button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center shrink-0">
             <Building2 size={32} className="text-gray-400" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{company.name}</h1>
              <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${status === 'Active' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>{status}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Account ID: {id || 'T-001'} · Joined {company.joined}</p>
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
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">Account Actions</p>
            <div className="space-y-2.5">
              <button onClick={() => setModal('impersonate')} className="w-full btn bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 justify-start h-11"><Shield size={18} className="mr-2" /> Impersonate for Support</button>
              {status === 'Active' ? (
                <button onClick={() => setModal('suspend')} className="w-full btn bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 justify-start h-11"><AlertTriangle size={18} className="mr-2" /> Suspend Company</button>
              ) : (
                <button onClick={() => setModal('activate')} className="w-full btn bg-green-500 hover:bg-green-600 text-gray-900 justify-start h-11"><CheckCircle2 size={18} className="mr-2 text-gray-900" /> Activate Company</button>
              )}
              <button onClick={() => setModal('activity')} className="w-full btn bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 justify-start h-11">View Company User Activity</button>
            </div>
          </div>
        </div>
      </div>
      {/* ── Action Modals ── */}
      
      {/* Impersonate Modal */}
      {modal === 'impersonate' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <LogIn size={24} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Impersonate {company.name}?</h3>
               <p className="text-sm text-gray-500 mb-6">
                 You are about to log in as an administrator for this company. Any actions you take while impersonating will be logged under your SaaS Owner identity.
               </p>
               <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 flex-1">Cancel</button>
                  <button onClick={() => { setModal(null); navigate('/admin'); }} className="btn bg-blue-600 hover:bg-blue-700 text-white flex-1">Start Session</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {modal === 'suspend' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6">
               <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <Lock size={24} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Suspend {company.name}?</h3>
               <p className="text-sm text-gray-500 mb-4">
                 They will immediately lose access to their dispatch dashboard, routing, and mobile apps. All active drivers will be signed out.
               </p>
               <textarea className="input w-full mb-6 resize-none" rows="3" placeholder="Reason for suspension (optional)..."></textarea>
               <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 flex-1">Cancel</button>
                  <button onClick={() => { setStatus('Suspended'); setModal(null); }} className="btn bg-red-600 hover:bg-red-700 text-white flex-1">Enforce Suspension</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Activate Modal */}
      {modal === 'activate' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Unlock size={24} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Reactivate {company.name}?</h3>
               <p className="text-sm text-gray-500 mb-6">
                 This will immediately restore full platform access for all their administrators, dispatchers, and drivers based on their Professional plan limits.
               </p>
               <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 flex-1">Cancel</button>
                  <button onClick={() => { setStatus('Active'); setModal(null); }} className="btn bg-emerald-600 hover:bg-emerald-700 text-white flex-1">Reactivate Now</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Log Modal */}
      {modal === 'activity' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Internal User Activity</h3>
                  <p className="text-sm text-gray-500 font-medium">Recorded actions taken by {company.name} employees.</p>
               </div>
               <button onClick={() => setModal(null)} className="w-8 h-8 flex flex-col items-center justify-center hover:bg-gray-200 rounded-lg text-gray-400 transition-colors"><X size={18}/></button>
            </div>
            <div className="p-0 max-h-[60vh] overflow-y-auto">
               <div className="divide-y divide-gray-50">
                  <div className="p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                     <div className="w-10 h-10 bg-red-50 text-red-600 flex items-center justify-center rounded-lg shrink-0">
                        <Package size={18} />
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-900 border-b border-gray-50 pb-1 mb-1.5"><span className="text-red-600">Deleted</span> Shipment #SHD-9021</p>
                        <p className="text-xs text-gray-500">Action performed by <span className="font-semibold text-gray-700">Dispatcher John</span> from IP 192.168.1.4</p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5">Today, 10:15 AM</p>
                     </div>
                  </div>
                  <div className="p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                     <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-lg shrink-0">
                        <Users size={18} />
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-900 border-b border-gray-50 pb-1 mb-1.5"><span className="text-emerald-600">Invited User</span> Mike (Driver)</p>
                        <p className="text-xs text-gray-500">Action performed by <span className="font-semibold text-gray-700">Company Admin</span> from IP 192.168.1.4</p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5">Yesterday, 4:30 PM</p>
                     </div>
                  </div>
                  <div className="p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                     <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-lg shrink-0">
                        <CheckCircle2 size={18} />
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-900 border-b border-gray-50 pb-1 mb-1.5"><span className="text-blue-600">Completed Trip</span> Sydney Route #4</p>
                        <p className="text-xs text-gray-500">Action performed by <span className="font-semibold text-gray-700">Driver Sam</span> via Mobile App (iOS 17)</p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5">Yesterday, 9:00 AM</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-50 bg-[#FAFAFA] flex justify-end">
               <button onClick={() => setModal(null)} className="btn bg-white border border-gray-200 text-gray-700">Close Window</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
