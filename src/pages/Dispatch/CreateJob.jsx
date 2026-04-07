import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building, MapPin, Truck, Package, Clock, DollarSign } from 'lucide-react';

export default function DispatchCreateJob() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-[1000px] mx-auto pb-12">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create New Job</h1>
            <p className="text-sm text-gray-500 mt-1">Draft a new delivery manifest and assign resources.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/dispatch/jobs')}
            className="px-4 py-2 border border-gray-200 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-sm transition">
            <Save size={16} /> Save & Assign
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      <form className="flex flex-col gap-6">
        
        {/* ── Customer Info ── */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Building className="text-gray-400" size={18} />
            <h2 className="font-bold text-gray-900">Customer Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Customer / Company Name *</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition bg-white">
                <option value="">Select an existing customer...</option>
                <option value="acme">Acme Corp</option>
                <option value="tech">Tech Solutions Ltd</option>
                <option value="global">Global Traders</option>
                <option value="new">+ Add New Customer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Person *</label>
              <input type="text" placeholder="e.g. Hasan Mahmud" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Phone</label>
              <input type="tel" placeholder="+880 1..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Billing Reference (PO)</label>
              <input type="text" placeholder="PO-XXXX" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition" />
            </div>
          </div>
        </section>

        {/* ── Routing Info ── */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <MapPin className="text-gray-400" size={18} />
            <h2 className="font-bold text-gray-900">Route & Scheduling</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 relative">
            <div className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pickup Location *</label>
                <input type="text" placeholder="Full address or warehouse identifier" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition mb-2" />
                <div className="flex gap-3">
                  <input type="date" className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 outline-none transition uppercase text-gray-600" />
                  <input type="time" className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 outline-none transition uppercase text-gray-600" />
                </div>
              </div>
            </div>

            {/* Connecting visual line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-11 bottom-11 w-px bg-gray-200 -translate-x-1/2">
               <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
                 <ArrowLeft size={12} className="text-gray-400 rotate-180" />
               </div>
            </div>

            <div className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Drop-off Location *</label>
                <input type="text" placeholder="Destination full address" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition mb-2" />
                <div className="flex gap-3">
                  <input type="date" className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 outline-none transition uppercase text-gray-600" />
                  <input type="time" className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 outline-none transition uppercase text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Freight & Financial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
              <Package className="text-gray-400" size={18} />
              <h2 className="font-bold text-gray-900">Freight Properties</h2>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Load Type</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 bg-white">
                    <option>FTL (Full Truckload)</option>
                    <option>LTL (Less Than Truckload)</option>
                    <option>Express Envelope</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Weight (KG)</label>
                  <input type="number" placeholder="500" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Commodity Details</label>
                <textarea rows="3" placeholder="Description of goods..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition resize-none"></textarea>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
              <Truck className="text-gray-400" size={18} />
              <h2 className="font-bold text-gray-900">Assignment & Finance</h2>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign Driver</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-yellow-400 bg-white mb-1.5">
                  <option value="">Leave Unassigned (Queue)</option>
                  <optgroup label="Available Now">
                    <option>Jamal Bhuiyan (Van 08)</option>
                    <option>Sujon Mia (Truck 12)</option>
                  </optgroup>
                  <optgroup label="Busy but acceptable">
                    <option>Nasir Khan (TRK-05)</option>
                  </optgroup>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <DollarSign size={16} className="text-green-600" /> Expected Revenue Setup
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Base Rate (৳)</label>
                    <input type="number" defaultValue="3500" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm font-semibold text-right" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Tolls / Extras (৳)</label>
                    <input type="number" defaultValue="450" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm font-semibold text-right" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </form>
    </div>
  );
}
