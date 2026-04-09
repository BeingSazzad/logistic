import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ArrowLeft, CheckCircle2, MapPin, 
  UserCog, Phone, Clock, ShieldCheck, Info
} from 'lucide-react';

export default function AdminAddBranch() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Local Station',
    location: '',
    manager: '',
    phone: '',
    hours: '08:00 - 18:00',
    capacity: '1000'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/branches');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center gap-4 px-2">
        <button onClick={() => navigate('/admin/branches')} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-all shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Branch</h1>
          <p className="text-sm text-gray-500 mt-1">Register a new hub or delivery center in the network.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 my-2"></div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        
        {/* Basic Identification */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#FFCC00]/10 flex items-center justify-center text-[#FFCC00]">
                 <Info size={18}/>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Branch Details</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Branch Name</label>
                 <input 
                   required
                   placeholder="e.g. Sydney West Hub"
                   className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Branch Type</label>
                 <select 
                   className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all appearance-none"
                   value={formData.type}
                   onChange={e => setFormData({...formData, type: e.target.value})}
                 >
                    <option>Primary Hub</option>
                    <option>Secondary Hub</option>
                    <option>Local Station</option>
                    <option>Distribution Center</option>
                 </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Address</label>
                 <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                    <input 
                      required
                      placeholder="123 Industrial Dr, Suburb, VIC 3000"
                      className="w-full border border-gray-200 rounded-xl pl-12 pr-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Administration & Ops */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <UserCog size={18}/>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Management</h3>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manager Name</label>
                 <input 
                   required
                   placeholder="Enter full name"
                   className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all"
                   value={formData.manager}
                   onChange={e => setFormData({...formData, manager: e.target.value})}
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                 <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                    <input 
                      placeholder="+61 400 000 000"
                      className="w-full border border-gray-200 rounded-xl pl-12 pr-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Logistical Specs */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                 <Clock size={18}/>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Capacity & Hours</h3>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Working Hours</label>
                 <input 
                   placeholder="e.g. 24/7 or 06:00 - 22:00"
                   className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all"
                   value={formData.hours}
                   onChange={e => setFormData({...formData, hours: e.target.value})}
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Storage Space (SQM)</label>
                 <input 
                   type="number"
                   placeholder="Total square meters"
                   className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all"
                   value={formData.capacity}
                   onChange={e => setFormData({...formData, capacity: e.target.value})}
                 />
              </div>
           </div>
        </div>

        {/* Submission */}
        <div className="md:col-span-2 flex justify-end gap-3 pt-4 px-2">
           <button 
             type="button"
             onClick={() => navigate('/admin/branches')}
             className="px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-all active:scale-95"
           >
              Cancel
           </button>
           <button 
             type="submit"
             disabled={loading}
             className={`px-10 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 ${loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#FFCC00] text-black shadow-lg shadow-[#FFCC00]/20 hover:shadow-[#FFCC00]/40 hover:bg-[#E6B800]'}`}
           >
              {loading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : <CheckCircle2 size={16}/>}
              Save Branch
           </button>
        </div>
      </form>
    </div>
  );
}
