import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CreditCard, Save } from 'lucide-react';

export default function AdminAddCustomer() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/admin/customers')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Customers
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">New B2B Customer Setup</h1>
          <p className="text-sm text-gray-500 mt-1">Configure a new client organization, billing contact, and shipping terms.</p>
        </div>
        <button className="btn btn-primary"><Save size={16}/> Save Customer</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Company Identity */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 md:col-span-2">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><Building2 size={14}/> Company Identity</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Legal Name</label>
                <input type="text" className="input" placeholder="e.g. Acme Corp Logistics" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">ABN (Australian Business Number)</label>
                <input type="text" className="input" placeholder="11-digit ABN" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Invoicing Address</label>
                <input type="text" className="input" placeholder="Billing Street Address" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Billing Email</label>
                <input type="email" className="input" placeholder="accounts@company.com" />
              </div>
           </div>
        </div>

        {/* Credit & Terms */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2"><CreditCard size={14}/> Credit & Terms</h3>
           <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Credit Limit (AUD)</label>
                <input type="number" className="input" placeholder="e.g. 50000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment Terms</label>
                <select className="input">
                  <option>Net 30 Days</option>
                  <option>Net 14 Days</option>
                  <option>Net 7 Days</option>
                  <option>COD (Cash On Delivery)</option>
                  <option>EOM + 30 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency Selection</label>
                <select className="input"><option>AUD ($)</option><option>USD ($)</option></select>
              </div>
           </div>
        </div>

        {/* Contact Logic */}
        <div className="card p-6 bg-white shadow-sm flex flex-col gap-5 text-gray-500 text-xs">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Operational Setup</h3>
           <p className="leading-relaxed mb-2 font-medium">By registering this customer, they will be enabled for selection in the main Dispatch "Create Job" window. You can also optionally invite their team to the Customer Portal later.</p>
           <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700"><input type="checkbox" className="toggle" defaultChecked /> Auto-generate Customer ID</label>
        </div>
      </div>
    </div>
  );
}
